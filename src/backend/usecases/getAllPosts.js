const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient(
  process.env.IS_OFFLINE && {
    endpoint: "http://localhost:8000",
  }
);

module.exports = async () => {
  try {
    const data = await db.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME })
    );
    const payload = data.Items.map(item => unmarshall(item)).sort(
      (a, b) => b.createdAt - a.createdAt
    );
    return { succesful: true, payload };
  } catch (e) {
    console.error(e);
    return { succesful: false, errors: [e] };
  }
};
