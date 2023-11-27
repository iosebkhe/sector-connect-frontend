import axios from "axios";
const baseUrl = import.meta.env.VITE_SECTOR_API_URI;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};



export default { getAll };