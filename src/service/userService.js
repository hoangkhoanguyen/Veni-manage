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

export default {
  login,
};
