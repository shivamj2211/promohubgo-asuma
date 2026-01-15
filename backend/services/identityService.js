const pool = require("../db");

async function findUserByEmail(email) {
  if (!email) return null;
  const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1 LIMIT 1`, [email.toLowerCase()]);
  return rows[0] || null;
}

async function findUserByPhone(phone) {
  if (!phone) return null;
  const { rows } = await pool.query(`SELECT * FROM users WHERE phone=$1 LIMIT 1`, [phone]);
  return rows[0] || null;
}

async function findIdentity(provider, providerUserId) {
  const { rows } = await pool.query(
    `SELECT * FROM user_identities WHERE provider=$1 AND provider_user_id=$2 LIMIT 1`,
    [provider, providerUserId]
  );
  return rows[0] || null;
}

async function createUser({ full_name, email, phone, country_code, password_hash }) {
  const { rows } = await pool.query(
    `
    INSERT INTO users(full_name, email, phone, country_code, password_hash)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      full_name || null,
      email ? email.toLowerCase() : null,
      phone || null,
      country_code || null,
      password_hash || null,
    ]
  );
  return rows[0];
}

async function upsertIdentity({ userId, provider, providerUserId, email, phone }) {
  await pool.query(
    `
    INSERT INTO user_identities(user_id, provider, provider_user_id, email, phone)
    VALUES($1,$2,$3,$4,$5)
    ON CONFLICT (provider, provider_user_id)
    DO UPDATE SET user_id=EXCLUDED.user_id, email=EXCLUDED.email, phone=EXCLUDED.phone
    `,
    [userId, provider, providerUserId, email || null, phone || null]
  );
}

async function linkOrCreateUser({ provider, providerUserId, email, phone, full_name, country_code, password_hash }) {
  // 1) If identity already exists → same user
  const identity = await findIdentity(provider, providerUserId);
  if (identity) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id=$1`, [identity.user_id]);
    return rows[0];
  }

  // 2) Try match existing user by email/phone
  let user = (email && (await findUserByEmail(email))) || (phone && (await findUserByPhone(phone)));

  // 3) If no user → create
  if (!user) {
    user = await createUser({ full_name, email, phone, country_code, password_hash });
  } else {
    // keep user updated with new email/phone/name if missing
    await pool.query(
      `
      UPDATE users
      SET full_name = COALESCE(full_name, $1),
          email = COALESCE(email, $2),
          phone = COALESCE(phone, $3),
          country_code = COALESCE(country_code, $4),
          updated_at = now()
      WHERE id=$5
      `,
      [
        full_name || null,
        email ? email.toLowerCase() : null,
        phone || null,
        country_code || null,
        user.id,
      ]
    );
  }

  // 4) Upsert identity link
  await upsertIdentity({ userId: user.id, provider, providerUserId, email, phone });

  // return fresh user
  const { rows } = await pool.query(`SELECT * FROM users WHERE id=$1`, [user.id]);
  return rows[0];
}

module.exports = { linkOrCreateUser };
