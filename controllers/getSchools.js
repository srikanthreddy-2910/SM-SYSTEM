const pool = require("../config/db");

const getSchools = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT school_name, registration_number, city, photo FROM registration ORDER BY school_name ASC"
    );
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ status: "error", message: "Failed to retrieve school names" });
  }
};

module.exports = getSchools;
