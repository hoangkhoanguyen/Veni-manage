import axios from "customizeAxios";

async function login(body) {
  try {
    const response = await axios.post("/api/user/login", body);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function signUp(body) {
  try {
    const response = await axios.post("/api/user/addNew", body);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const updateInfo = async (data) => {
  try {
    const result = await axios.post("/api/user/update-info", data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  login,
  signUp,
  updateInfo,
};
