class User {
  constructor(db) {
    this.db = db;
  }

  async create(name, email, password) {
    return this.db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
  }

  async findAll() {
    return this.db.query("SELECT * FROM users");
  }

  async findById(id) {
    return this.db.query("SELECT * FROM users WHERE id = ?", [id]);
  }

  async delete(id) {
    return this.db.query("DELETE FROM users WHERE id = ?", [id]);
  }
  async update(newPassword,userId){
    return this.db.query( "UPDATE users SET password = ? WHERE id = ?",
      [newPassword, userId])
  }
}

export default User;
