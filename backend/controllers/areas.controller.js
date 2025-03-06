const { pool } = require("../connection");

const { logMessage } = require("../utils/system.utils");

const getAreasController = async (req, res) => {
  let client;

  logMessage("Hit get areas endpoint", "Success", "Info");

  try {
    client = await pool.connect();
    const query = `select area_id as id, area_name as name from areas`;
    const result = await client.query(query);

    logMessage("areas was fetched successfuly", "Success", "Info");
    return res.json({ data: result.rows, status: "success" });
  } catch (error) {
    logMessage("Faild to get areas", `Error: data fetching faild`, "Error", {
      error,
    });
    return res.status(500).json({ data: [], status: "failed" });
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  getAreasController,
};
