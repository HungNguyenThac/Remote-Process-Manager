import { processesService } from "../services/getProcessRunning.js";

export const processesControl = async (req, res) => {
  try {
    const response = await processesService();
    if (response) return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
