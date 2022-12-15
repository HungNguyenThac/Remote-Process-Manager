import express from "express";
import mongoose from "mongoose";

import child_process from "child_process";
import psList from "ps-list";
import currentProcesses from "current-processes";
import fs from "fs";
const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/procman")
  .then(() => console.log("database Connected!"));

const processNameList = new Promise((resolve, reject) => {
  let command = `osascript -e 'tell application "System Events" to return name of processes whose background only is false'`;
  child_process.exec(command, (err, stdout) => {
    if (err) throw err;
    const processList = stdout.split(", ");
    resolve(processList);
  });
});

const processes = new Promise((resolve, reject) => {
  currentProcesses.get(function (err, processes) {
    resolve(processes);
  });
});

app.get("/procman/getprocess", (req, res) => {
  Promise.all([processNameList, processes]).then(([processNameList, processes]) => {
    const response = [];
    for (let name of processNameList) {
      for (let process of processes) {
        name = name.replace(/(\r\n|\n|\r)/gm, "");
        if (process.name === name) {
          response.push(process);
        }
      }
    }
    res.send(response);
  });
});

app.get("/procman/killapp/:pid", (req, res) => {
  const pid = req.params.pid;
  console.log(pid);
  if (!pid) res.send("No pid");
  const killAppActin = new Promise((resolve, rej) => {
    resolve(process.kill(pid));
  });
  killAppActin.then(() => res.send("kill app success")).catch();
});

const port = process.env.port || 9527;

app.listen({ port }, () => {
  console.log(` Server ready at http://localhost:${port}/procman`);
});
