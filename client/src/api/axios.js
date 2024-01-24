import axios from "axios";
export default axios.create({
  baseURL: "https://task-manager-api-fawn.vercel.app/",
});