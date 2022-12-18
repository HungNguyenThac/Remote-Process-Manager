import { killAppService } from "../services/killapp.js";

export const killAppControl = async (req, res) => {
  const pid = req.body.pid;
  try {
    const response = await killAppService(pid);
    if (response) return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
