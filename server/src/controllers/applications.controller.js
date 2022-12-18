import { applicationService } from "../services/getProcessRunning.js";

export const applicationsControl = async (req, res) => {
  try {
    const response = await applicationService();
    if (response) return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
