const { Hono } = require("hono/tiny");
const { logger } = require("hono/logger");
const { cors } = require("hono/cors");
const getAllPosts = require("./usecases/getAllPosts.js");
const createPost = require("./usecases/createPost.js");

const app = new Hono();
app.use(logger());
app.use("*", cors());

app.get("/posts", async c => {
  const { succesful, payload = {}, errors = [] } = await getAllPosts();
  if (succesful) {
    return c.json(payload);
  } else {
    return c.json(errors, { status: 422 });
  }
});

app.post("/posts", async c => {
  const params = await c.req.json();
  const { succesful, payload = {}, errors = [] } = await createPost(params);
  if (succesful) {
    return c.json(payload);
  } else {
    return c.json(errors, { status: 422 });
  }
});

module.exports = app;
