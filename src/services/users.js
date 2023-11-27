import axios from "axios";
const baseUrl = import.meta.env.VITE_USER_API_URI;


const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newUpdatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newUpdatedObject);
  return response.data;
};

export default { getAll, create, update };