import axios from "axios";
const baseUrl = "https://sectorconnectdb.onrender.com/api/sectors";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};



export default { getAll };