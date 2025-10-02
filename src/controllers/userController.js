// import connection from "../config/db.js";

// export const getAllUsers = async (req, res) => {
//   try {
//     const [rows] = await connection.execute("SELECT * FROM users");
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// // CREATE a new user
// export const createUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const [result] = await connection.execute(
//       "INSERT INTO users (name, email,password) VALUES (?, ?,?)",
//       [name, email, password]
//     );
//     res.status(201).json({ id: result.insertId, name, email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// controllers/userController.js
export const getAllUsers = async (req, res, userModel) => {
  try {
    const users = await userModel.findAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res, userModel) => {
  const { name, email, password } = req.body;
  try {
    const result = await userModel.create(name, email, password);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const parseId = (id) => {
  const parsed = parseInt(id, 10);
  if (isNaN(parsed)) throw new Error("Invalid ID");
  return parsed;
};
export const findUserById = async (req, res, userModel) => {
  console.log(req);
  const id = parseId(req.params.id);
  try {
    const result = await userModel.findById(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//

// Controller: delete user by ID
export const userDeleteController = async (req, res, userModel) => {
  try {
    const id = parseId(req.params.id); // URL param e ID

    // Find user first (optional, to check existence)
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user
    await userModel.delete(id); // method depends on your ORM
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const userUpdate = async (req, res, userModel) => {
  const { newPassword, userId } = req.body;
  try {
    const updatedUser = await userModel.update(newPassword, userId);
    res.json({ message: "User deleted successfully", updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
