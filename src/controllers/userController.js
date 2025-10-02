import connection from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// CREATE a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await connection.execute(
      "INSERT INTO users (name, email,password) VALUES (?, ?,?)",
      [name, email, password]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
