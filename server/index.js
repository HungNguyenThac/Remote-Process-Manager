import express from "express";
import applicationsRouter from "./src/routes/applications.routes.js";
import processesRouter from "./src/routes/processes.routes.js";
import killAppRouter from "./src/routes/killapp.routes.js";
import bodyParser from "body-parser";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/procman/applications", applicationsRouter);
app.use("/procman/processes", processesRouter);
app.use("/procman/killapp", killAppRouter);

const port = process.env.port || 9527;
app.listen({ port }, () => {
  console.log(` Server ready at http://localhost:${port}/procman`);
});
