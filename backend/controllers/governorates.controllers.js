const { pool } = require("../connection");

const { logMessage } = require("../utils/system.utils");

const getGovernoratesController = async (req, res) => {
  const { areaId } = req.query;

  let client;

  logMessage("Hit get governorates endpoint", "Success", "Info");

  try {
    client = await pool.connect();
    const query = `select governorate_id as id, governorate_name as name from governorates where area_id = $1`;
    const result = await client.query(query, [areaId]);

    logMessage("governorates was fetched successfuly", "Success", "Info");
    return res.json({ data: result.rows, status: "success" });
  } catch (error) {
    logMessage(
      "Faild to get governorates",
      `Error: data fetching faild`,
      "Error",
      {
        error,
      }
    );
    return res.status(500).json({ data: [], status: "failed" });
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  getGovernoratesController,
};
