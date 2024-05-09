const {
  DynamoDBClient,
  CreateBackupCommand,
} = require("@aws-sdk/client-dynamodb");

const db = new DynamoDBClient(
  process.env.IS_OFFLINE && {
    endpoint: "http://localhost:8000",
  }
);

module.exports = async () => {
  try {
    const date = new Date();
    const BackupName = `${process.env.DYNAMODB_TABLE_NAME}-${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    await db.send(
      new CreateBackupCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        BackupName,
      })
    );
    return { successful: true };
  } catch (e) {
    console.error(e);
    return { successful: false, errors: [e] };
  }
};
