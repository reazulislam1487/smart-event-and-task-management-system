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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await userModel.create(name, email, hashedPassword);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res, userModel) => {
  const { email, password } = req.body;
  // try {
  const user = await userModel.findByEmail(email);

  if (user && user.length > 0) {
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (isValidPassword) {
      // generate token
      const token = jwt.sign(
        { email: user[0].email, userId: user[0].id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        accessToken: token,
        message: "Login Successfully",
      });
    } else {
      res.status(401).json("authentication Failed");
    }
  }
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
};

// is parser
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
