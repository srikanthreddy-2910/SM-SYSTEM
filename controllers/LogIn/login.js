const bcrypt = require("bcrypt");
const pool = require("../../config/db");
const { generateToken } = require("../../utils/jwt");

const login = async (req, res) => {
  const { role, email, password } = req.body;

  try {
    let result;
    let user;

    // Check user by role
    switch (role) {
      case "admin":
        result = await pool.query("SELECT * FROM admin WHERE email = $1", [
          email,
        ]);
        break;
      case "teacher":
        result = await pool.query("SELECT * FROM teacher WHERE email = $1", [
          email,
        ]);
        break;
      case "student":
        result = await pool.query("SELECT * FROM student WHERE email = $1", [
          email,
        ]);
        break;
      default:
        throw new Error("Invalid role");
    }

    user = result.rows[0];

    if (!user) throw new Error("Invalid credentials");

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    // Generate token
    const token = generateToken({ email: user.email, role: user.role });

    // Set JWT token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Redirection based on role
    let redirectTo = `/${role}/dashboard`;

    res
      .status(200)
      .json({ success: true, token, message: "Login successful", redirectTo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = login;
