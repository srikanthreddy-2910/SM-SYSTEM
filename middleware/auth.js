const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const verifyToken = (roles = []) => {
  return async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // If roles are provided, check if user role matches any of them
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Fetch user from database to ensure they exist 
      let result;
      if (decoded.role === "admin") {
        result = await pool.query("SELECT * FROM admin WHERE email = $1", [decoded.email]);
      } else if (decoded.role === "teacher") {
        result = await pool.query("SELECT * FROM teachers WHERE email = $1", [decoded.email]);
      } else if (decoded.role === "student") {
        result = await pool.query("SELECT * FROM students WHERE email = $1", [decoded.email]);
      }

      if (!result || !result.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      // Attach the user data to the request object for further use
      req.userData = result.rows[0];
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = verifyToken;
