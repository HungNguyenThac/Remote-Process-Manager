const killApp = (pid) => new Promise((res, rej) => res(process.kill(pid)));

export const killAppService = async (pid) => {
  return await killApp(pid);
};
