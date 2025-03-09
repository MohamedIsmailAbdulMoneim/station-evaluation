const { pool } = require("../connection");

const { logMessage } = require("../utils/system.utils");

const getStationsController = async (req, res) => {
  const { govId } = req.query;

  let client;

  logMessage("Hit get stations endpoint", "Success", "Info");

  try {
    client = await pool.connect();
    const query = `select station_id as id, station_name as name from stations where governorate_id = ${govId}`;
    const result = await client.query(query);

    logMessage("stations was fetched successfuly", "Success", "Info");
    return res.json({ data: result.rows, status: "success" });
  } catch (error) {
    logMessage(
      "Faild to get questions",
      `Error: data fetching faild`,
      "Error",
      { error }
    );
    return res.status(500).json({ data: [], status: "failed" });
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  getStationsController,
};
