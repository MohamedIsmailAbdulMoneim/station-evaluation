const { pool } = require("../connection");

const { logMessage } = require("../utils/system.utils");

const getQuestionsController = async (req, res) => {
  let client;

  logMessage("Hit get questions endpoint", "Success", "Info");

  try {
    client = await pool.connect();
    const query = `
      select * from questions ORDER BY question_id DESC
      `;

    logMessage("Creating query to get questions", "Success", "Info", {
      query,
    });

    const response = await client.query(query);

    logMessage("questions was fetched successfuly", "Success", "Info");
    return res.json({ data: response.rows, status: "success" });
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
  getQuestionsController,
};
