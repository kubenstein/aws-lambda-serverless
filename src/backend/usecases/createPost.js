const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { v4: uuid } = require("uuid");

const db = new DynamoDBClient(
  process.env.IS_OFFLINE && {
    endpoint: "http://localhost:8000",
  }
);

module.exports = async params => {
  try {
    const item = {
      ...params,
      ID: uuid(),
      createdAt: new Date().getTime(),
    };

    await db.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: marshall(item),
      })
    );
    return { successful: true };
  } catch (e) {
    console.error(e);
    return { successful: false, errors: [e] };
  }
};
