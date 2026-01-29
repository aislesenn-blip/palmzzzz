
const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

async function main() {
  const url = process.env.TURSO_CONNECTION_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("Missing TURSO credentials");
    process.exit(1);
  }

  const client = createClient({
    url,
    authToken,
  });

  try {
    console.log("Checking invites table...");
    const res = await client.execute("SELECT * FROM invites LIMIT 1");
    console.log("Columns:", res.columns);

    if (!res.columns.includes("status")) {
        console.log("Adding status column...");
        await client.execute("ALTER TABLE invites ADD COLUMN status TEXT DEFAULT 'active'");
        console.log("Success!");
    } else {
        console.log("Status column already exists.");
    }

  } catch (e) {
    console.error("Error:", e);
  }
}

main();
