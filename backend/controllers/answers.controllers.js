const { pool } = require("../connection");

const insertAnswers = async (req, res) => {
  let client;

  const { data, stationName } = req.body;

  try {
    client = await pool.connect();
    const finalData = Object.entries(data).map(([key, val]) => {
      return [key, val, stationName];
    });

    console.log(finalData);

    const placeholders = finalData
      .map(
        (_, index) =>
          `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`
      )
      .join(", ");

    const insertQuery = `insert into data (question_id, data, station_id) values ${placeholders}`;

    const queryParams = finalData.flat();

    await client.query(insertQuery, queryParams);

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: "failed" });
  } finally {
    if (client) client.release();
  }
};

const getAnswers = async (req, res) => {
  let client;

  const { stationName, date } = req.query;

  try {
    client = await pool.connect();
    const query =
      "select * from data d join questions q on d.question_id = q.question_id where station_id = $1 and created_at = $2";
    const result = await client.query(query, [stationName, date]);

    return res.json({ data: result.rows, status: "success" });
  } catch (error) {
    console.error(error);
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  insertAnswers,
  getAnswers,
};
