class Task {
  constructor(db) {
    this.db = db;
  }
  async create(title, description, status, priority, due_date, user_id) {
    return this.db.query(
      "INSERT INTO tasks (title, description, status,priority, due_date, user_id) VAlUES (?,?,?,?,?,?)",
      [title, description, status, priority, due_date, user_id]
    );
  }
}
export default Task;
