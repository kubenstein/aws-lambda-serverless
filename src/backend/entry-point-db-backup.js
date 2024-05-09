const createDbBackup = require("./usecases/createDbBackup.js");

exports.handler = async () => {
  const { successful, payload = {}, errors = [] } = await createDbBackup();
  if (successful) {
    console.log("ok", payload);
  } else {
    console.error({ errors });
  }
};
