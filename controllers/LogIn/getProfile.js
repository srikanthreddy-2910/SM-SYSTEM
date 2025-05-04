const pool = require("../../config/db");

const getProfile = async (req, res) => {
  try {
    const user = req.userData;
    // Send profile data based on the role
    res.status(200).json({
      email: user.email,
      role: user.role,
      message: "Profile data accessed",
    });

  } catch (err) {
    res.status(401).json({ error: "Unauthorized or Invalid token" });
  }
};

module.exports = getProfile;
