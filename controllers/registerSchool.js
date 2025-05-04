const pool = require("../config/db");

const registerSchool = async (req, res) => {
  const {
    schoolName, registrationNumber, schoolType, affiliation,
    state, district, city, pincode, photo
  } = req.body; 

  if (!schoolName || !registrationNumber) {
    return res.status(400).json({
      error: "School name and registration number are required",
    });
  }

  try {
    const checkQuery = "SELECT * FROM registration WHERE registration_number = $1";
    const checkResult = await pool.query(checkQuery, [registrationNumber]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "School with this registration number already exists.",
        existingSchool: checkResult.rows[0], 
      });
    }

    const insertQuery = `
      INSERT INTO registration (
        school_name, registration_number, school_type, affiliation, state,
        district, city, pincode, photo
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;
     
    const values = [schoolName, registrationNumber, schoolType, affiliation, state, district, city, pincode, photo];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      success: true,
      message: "School registered successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error registering school:", err);
    res.status(500).json({ error: "Failed to register school" });
  }
};

module.exports = registerSchool;