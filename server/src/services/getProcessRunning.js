import child_process from "child_process";
import currentProcesses from "current-processes";

const processNameList = () =>
  new Promise((resolve, reject) => {
    let command = `osascript -e 'tell application "System Events" to return name of processes whose background only is false'`;
    child_process.exec(command, (err, stdout) => {
      if (err) throw err;
      const processList = stdout.split(", ");
      resolve(processList);
    });
  });

const processes = () =>
  new Promise((resolve, reject) => {
    currentProcesses.get(function (err, processes) {
      resolve(processes);
    });
  });

export const applicationService = async () => {
  const [processNames, processList] = await Promise.all([processNameList(), processes()]);
  const response = [];
  for (let name of processNames) {
    for (let process of processList) {
      name = name.replace(/(\r\n|\n|\r)/gm, "");
      if (process.name === name) {
        response.push(process);
      }
    }
  }
  return response;
};

export const processesService = async () => {
  return await processes();
};
