import mongoose from "mongoose";

const appSchema = mongoose.Schema({
  name: { type: String, default: "" },
  PID: { type: String, default: "" },
  pathFull: { type: String, default: "" },
  MD5: { type: String, default: "" },
});

const appModel = mongoose.model("appModel", appSchema);
export default appModel;
