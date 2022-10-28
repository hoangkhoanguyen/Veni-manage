import axios from "customizeAxios";

const addNewProduct = async (body) => {
  try {
    const result = await axios.post("/api/product/add-product-info", body);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllProductsFromMyStore = async () => {
  try {
    const result = await axios.get("/api/product/get-product-from-my-store");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addQuantityToInventory = async (data) => {
  try {
    const result = await axios.post("/api/product/add-quantity-to-inventory", data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteProduct = async (data) => {
  try {
    const result = await axios.post("/api/product/delete-product", data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProductInfo = async (data) => {
  try {
    const result = await axios.post("/api/product/update-product-info", data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  addNewProduct,
  getAllProductsFromMyStore,
  addQuantityToInventory,
  deleteProduct,
  updateProductInfo,
};
