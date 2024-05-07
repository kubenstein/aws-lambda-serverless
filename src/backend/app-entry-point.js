const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient(
  process.env.IS_OFFLINE && {
    endpoint: "http://localhost:8001"
  }
);

exports.handler = async _event => {
  const response = { statusCode: 200 };
  try {
    const itemParams = { ID: "test", data: "hello world" };
    const putParams = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(itemParams),
    };
    const createResult = await db.send(new PutItemCommand(putParams));

    response.body = JSON.stringify({
      message: "Successfully created item!",
      createResult,
    });
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to create post.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }

  return response;
};
