const { Hono } = require("hono/tiny");
const { logger } = require("hono/logger");
const { cors } = require("hono/cors");
const getAllPosts = require("./usecases/getAllPosts.js");
const createPost = require("./usecases/createPost.js");

const app = new Hono();
app.use(logger());
app.use("*", cors());
app.onError(err => { throw err });

app.get("/posts", async c => {
  const { successful, payload = {}, errors = [] } = await getAllPosts();
  if (successful) {
    return c.json(payload);
  } else {
    return c.json(errors, { status: 422 });
  }
});

app.get("/error-me", async c => {
  throw new Error("demo-error");
});

app.post("/posts", async c => {
  const params = await c.req.json();
  const { successful, payload = {}, errors = [] } = await createPost(params);
  if (successful) {
    return c.json(payload);
  } else {
    return c.json(errors, { status: 422 });
  }
});

module.exports = app;
