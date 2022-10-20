import Cookies from "universal-cookie";

const cookies = new Cookies();

const get = (key) => cookies.get(key);

const set = (key, value) => {
  cookies.set(key, value, { path: "/" });
};

const remove = (key) => {
  cookies.remove(key);
};

export default {
  get,
  set,
  remove,
};
