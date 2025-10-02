// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// export default connection;

// db/Database.js
import mysql from "mysql2/promise";

class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection(this.config);
      console.log("✅ MySQL Connected");
    }
    return this.connection;
  }

  async query(sql, params) {
    const conn = await this.connect();
    const [rows] = await conn.execute(sql, params);
    return rows;
  }
}

export default Database;
