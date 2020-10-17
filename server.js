const app = require("express")(),
  server = require("http").Server(app);

const bodyParser = require("body-parser");
const ip = require("ip");
const port = process.env.PORT || 8888;
const data = require("./src/api/route");
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "*");

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
server.listen(port, () => {
  console.log("Server starting...");
  console.log(`http://${ip.address()}:${port}`);
});

app.use(data);
