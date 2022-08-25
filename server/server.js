const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Routes
const health = require("./src/routes/health");
const projects = require("./src/routes/projects");
const channels = require("./src/routes/channels");
const events = require("./src/routes/events");

const port = 5001;

// Express server libraries
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: true }));
app.use(cookieParser());

// Express server api routes
app.use("/api/v1/health", health);
app.use("/api/v1/projects", projects);
app.use("/api/v1/channels", channels);
app.use("/api/v1/events", events);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
