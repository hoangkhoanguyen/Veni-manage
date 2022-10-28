/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { styled } from "@mui/material/styles";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
// Data
import productsTableData from "layouts/tables/data/productsTableData";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import { ProductModalProvider } from "customeContext/ProductModalContext";
import {
  useMaterialUIController,
  setOpenEditProductModal,
  setEditProductInfo,
  setOpenAddQuantityProductModal,
  setOpenDeleteProductModal,
} from "context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validateService from "service/validateService";
import {
  setOpenErrorSnackbar,
  setNotiTitle,
  setNotiContent,
  setNotiInfo,
  setOpenSuccessSnackbar,
} from "redux/reducers/uiReducer";
import productService from "service/productService";
import { setReloadProductFromStore } from "redux/reducers/productReducer";

const CustomedButton = styled(Button)({
  border: "1px solid",
});

function Tables() {
  const { columns, rows } = productsTableData();

  const isLogin = useSelector((state) => state.user.isLogin);
  const reloadProductFromStore = useSelector((state) => state.product.reloadProductFromStore);

  const navigate = useNavigate();
  const distp = useDispatch();

  useEffect(() => {
    if (!isLogin) navigate("/authentication/sign-in");
  }, [isLogin]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const initNewProductInfo = {
    name: "",
    price: "",
    type: "",
    image: "",
    summary: "",
    detailsDescription: "",
  };

  const [controller, dispatch] = useMaterialUIController();
  const {
    isOpenEditProductModal,
    editProductInfo,
    addQuantityProductId,
    isOpenAddQuantityModal,
    isOpenDeleteProductModal,
    deleteProductId,
  } = controller;
  const [isOpenNewProductModal, setIsOpenNewProductModal] = useState(false);
  const [newProductInfo, setNewProductInfo] = useState(initNewProductInfo);
  const [quan, setQuan] = useState();
  // const { isOpenEditProductModal } = useContext(ProductModalContext);

  // add new product
  const handleOpenNewProductModal = () => {
    setIsOpenNewProductModal(true);
  };
  const handleCloseNewProductModal = () => {
    setIsOpenNewProductModal(false);
    setNewProductInfo(initNewProductInfo);
  };

  const handleChangeNewProductInfo = (key, value) => {
    setNewProductInfo({
      ...newProductInfo,
      [key]: value,
    });
  };
  const handleSubmitNewProductForm = async (e) => {
    e.preventDefault();
    if (!validateService.isNormalName(newProductInfo.name)) {
      distp(setNotiTitle("Name of product must not contain special characters!"));
      distp(setNotiContent("Please check!"));
      distp(setOpenErrorSnackbar(true));
      return;
    }
    const data = { ...newProductInfo };
    const result = await productService.addNewProduct(data);
    console.log(result);
    if (result?.errCode === 0) {
      distp(
        setNotiInfo({
          notiContent: "Congratulations!",
          notiTitle: result.errMsg,
        })
      );
      distp(setOpenSuccessSnackbar(true));
      distp(setReloadProductFromStore(!reloadProductFromStore));
      handleCloseNewProductModal();
    } else {
      distp(
        setNotiInfo({
          notiContent: "Please check!",
          notiTitle: result?.errMsg ? result.errMsg : "Something went wrong!",
        })
      );
      distp(setOpenErrorSnackbar(true));
    }
  };

  // edit product
  const handleChangeEditProductInfo = (key, value) => {
    setEditProductInfo(dispatch, {
      ...editProductInfo,
      [key]: value,
    });
  };

  const handleCloseEditProductModal = () => {
    setOpenEditProductModal(dispatch, false);
  };
  const handleSubmitEditProductForm = async (e) => {
    e.preventDefault();
    if (!validateService.isNormalName(editProductInfo.name)) {
      distp(
        setNotiInfo({
          notiContent: "Please check!",
          notiTitle: "Name of product must not contain special characters!",
        })
      );
      distp(setOpenErrorSnackbar(true));
      return;
    }
    const data = { ...editProductInfo };
    const response = await productService.updateProductInfo(data);
    console.log(response);
    if (response?.errCode === 0) {
      distp(
        setNotiInfo({
          notiContent: "Congratulations!",
          notiTitle: response.errMsg,
        })
      );
      distp(setOpenSuccessSnackbar(true));
      distp(setReloadProductFromStore(!reloadProductFromStore));
      handleCloseEditProductModal();
    } else {
      distp(
        setNotiInfo({
          notiContent: "Please check!",
          notiTitle: response?.errMsg ? response.errMsg : "Something went wrong!",
        })
      );
      distp(setOpenErrorSnackbar(true));
    }
  };

  // add quantity
  const handleCloseAddQuantityModal = () => {
    setOpenAddQuantityProductModal(dispatch, false);
    setQuan();
  };
  const changeQuantity = (value) => {
    setQuan(value);
  };
  const handleSubmitAddQuantityProductForm = async (e) => {
    e.preventDefault();
    const data = { productId: addQuantityProductId, quantity: quan };
    const response = await productService.addQuantityToInventory(data);
    console.log(response);
    if (response?.errCode === 0) {
      distp(
        setNotiInfo({
          notiContent: "Congratulations!",
          notiTitle: response.errMsg,
        })
      );
      distp(setOpenSuccessSnackbar(true));
      distp(setReloadProductFromStore(!reloadProductFromStore));
      handleCloseAddQuantityModal();
    } else {
      distp(
        setNotiInfo({
          notiContent: "Please check!",
          notiTitle: response?.errMsg ? response.errMsg : "Something went wrong!",
        })
      );
      distp(setOpenErrorSnackbar(true));
    }
  };

  // Delete Product
  const handleCloseDeleteProductModal = () => {
    setOpenDeleteProductModal(dispatch, false);
  };
  const handleSubmitDeleteProductForm = async (e) => {
    e.preventDefault();
    const data = { id: deleteProductId };
    const response = await productService.deleteProduct(data);
    console.log(response);
    if (response?.errCode === 0) {
      distp(
        setNotiInfo({
          notiContent: "Congratulations!",
          notiTitle: response.errMsg,
        })
      );
      distp(setOpenSuccessSnackbar(true));
      distp(setReloadProductFromStore(!reloadProductFromStore));
      handleCloseDeleteProductModal();
    } else {
      distp(
        setNotiInfo({
          notiContent: "Please check!",
          notiTitle: response?.errMsg ? response.errMsg : "Something went wrong!",
        })
      );
      distp(setOpenErrorSnackbar(true));
    }
  };

  return (
    <ProductModalProvider>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Your Products
                  </MDTypography>
                </MDBox>
                <MDBox pl={2} mt={2}>
                  <CustomedButton onClick={handleOpenNewProductModal} startIcon={<AddIcon />}>
                    Add new product
                  </CustomedButton>
                  <Modal open={isOpenNewProductModal} onClose={handleCloseNewProductModal}>
                    <MDBox style={style}>
                      <Card>
                        <CardHeader title="Create new product" />
                        <CardContent>
                          <Stack
                            component="form"
                            flexDirection="column"
                            onSubmit={handleSubmitNewProductForm}
                          >
                            <FormControl sx={{ mb: 2 }}>
                              <InputLabel htmlFor="name-new-product">Name</InputLabel>
                              <Input
                                id="name-new-product"
                                fullWidth
                                value={newProductInfo.name}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("name", e.target.value);
                                }}
                                required
                              />
                            </FormControl>
                            <FormControl sx={{ mb: 2 }}>
                              <InputLabel htmlFor="price-new-product">Price</InputLabel>
                              <Input
                                id="price-new-product"
                                fullWidth
                                type="number"
                                value={newProductInfo.price}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("price", e.target.value);
                                }}
                                required
                              />
                            </FormControl>
                            <FormControl sx={{ mb: 2 }}>
                              <FormLabel id="type-new-product">Type</FormLabel>
                              <RadioGroup
                                aria-labelledby="type-new-product"
                                row
                                value={newProductInfo.type}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("type", e.target.value);
                                }}
                                required
                              >
                                <FormControlLabel
                                  value="vegetable"
                                  control={<Radio />}
                                  label="Vegetable"
                                />
                                <FormControlLabel value="fruit" control={<Radio />} label="Fruit" />
                                <FormControlLabel value="meat" control={<Radio />} label="Meat" />
                                <FormControlLabel
                                  value="fastfood"
                                  control={<Radio />}
                                  label="Fastfood"
                                />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                              </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ mb: 2 }}>
                              <InputLabel htmlFor="img-url-new-product">Image url</InputLabel>
                              <Input
                                id="img-url-new-product"
                                fullWidth
                                value={newProductInfo.image}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("image", e.target.value);
                                }}
                                required
                              />
                            </FormControl>
                            <FormControl sx={{ mb: 2 }}>
                              <TextField
                                multiline
                                minRows={3}
                                id="summary-new-product"
                                fullWidth
                                placeholder="Summary"
                                value={newProductInfo.summary}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("summary", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormControl sx={{ mb: 2 }}>
                              <TextField
                                multiline
                                minRows={5}
                                id="description-new-product"
                                fullWidth
                                placeholder="Description"
                                value={newProductInfo.detailsDescription}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("detailsDescription", e.target.value);
                                }}
                              />
                            </FormControl>
                            <Box>
                              <MDButton
                                variant="gradient"
                                color="info"
                                sx={{ mr: "8px" }}
                                type="submit"
                                startIcon={<DataSaverOnIcon />}
                              >
                                Create
                              </MDButton>
                              <MDButton
                                variant="outlined"
                                color="info"
                                startIcon={<HighlightOffIcon />}
                                onClick={handleCloseNewProductModal}
                              >
                                Cancel
                              </MDButton>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </MDBox>
                  </Modal>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                    // openEditProductModal={handleOpenEditProductModal}
                  />
                </MDBox>
                <Modal open={isOpenEditProductModal} onClose={handleCloseEditProductModal}>
                  <MDBox style={style}>
                    <Card>
                      <CardHeader title="Edit product" />
                      <CardContent>
                        <Stack
                          component="form"
                          flexDirection="column"
                          onSubmit={handleSubmitEditProductForm}
                        >
                          <FormControl sx={{ mb: 2 }}>
                            <InputLabel htmlFor="name-new-product">Name</InputLabel>
                            <Input
                              id="name-new-product"
                              fullWidth
                              value={editProductInfo.name}
                              onChange={(e) => {
                                handleChangeEditProductInfo("name", e.target.value);
                              }}
                              required
                            />
                          </FormControl>
                          <FormControl sx={{ mb: 2 }}>
                            <InputLabel htmlFor="price-new-product">Price</InputLabel>
                            <Input
                              id="price-new-product"
                              type="number"
                              fullWidth
                              value={editProductInfo.price}
                              onChange={(e) => {
                                handleChangeEditProductInfo("price", e.target.value);
                              }}
                              required
                            />
                          </FormControl>
                          <FormControl sx={{ mb: 2 }}>
                            <FormLabel id="type-new-product">Type</FormLabel>
                            <RadioGroup
                              aria-labelledby="type-new-product"
                              row
                              value={editProductInfo.type}
                              onChange={(e) => {
                                handleChangeEditProductInfo("type", e.target.value);
                              }}
                              required
                            >
                              <FormControlLabel
                                value="vegetable"
                                control={<Radio />}
                                label="Vegetable"
                              />
                              <FormControlLabel value="fruit" control={<Radio />} label="Fruit" />
                              <FormControlLabel value="meat" control={<Radio />} label="Meat" />
                              <FormControlLabel
                                value="fastfood"
                                control={<Radio />}
                                label="Fastfood"
                              />
                              <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl sx={{ mb: 2 }}>
                            <InputLabel htmlFor="img-url-new-product">Image url</InputLabel>
                            <Input
                              id="img-url-new-product"
                              fullWidth
                              value={editProductInfo.image}
                              onChange={(e) => {
                                handleChangeEditProductInfo("image", e.target.value);
                              }}
                              required
                            />
                          </FormControl>
                          <FormControl sx={{ mb: 2 }}>
                            <TextField
                              multiline
                              minRows={3}
                              id="summary-new-product"
                              fullWidth
                              placeholder="Summary"
                              value={editProductInfo.summary}
                              onChange={(e) => {
                                handleChangeEditProductInfo("summary", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormControl sx={{ mb: 2 }}>
                            <TextField
                              multiline
                              minRows={5}
                              id="description-new-product"
                              fullWidth
                              placeholder="Description"
                              value={editProductInfo.detailsDescription}
                              onChange={(e) => {
                                handleChangeEditProductInfo("detailsDescription", e.target.value);
                              }}
                            />
                          </FormControl>
                          <Box>
                            <MDButton
                              variant="gradient"
                              color="info"
                              sx={{ mr: "8px" }}
                              type="submit"
                              startIcon={<SystemUpdateAltIcon />}
                            >
                              Update
                            </MDButton>
                            <MDButton
                              variant="outlined"
                              color="info"
                              startIcon={<HighlightOffIcon />}
                              onClick={handleCloseEditProductModal}
                            >
                              Cancel
                            </MDButton>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </MDBox>
                </Modal>
                <Modal open={isOpenAddQuantityModal} onClose={handleCloseAddQuantityModal}>
                  <MDBox style={style}>
                    <Card>
                      <CardHeader title="Add quantity" />
                      <CardContent>
                        <Stack
                          component="form"
                          flexDirection="column"
                          onSubmit={handleSubmitAddQuantityProductForm}
                        >
                          <FormControl sx={{ mb: 2 }}>
                            <InputLabel htmlFor="quantity-new-product">Quantity</InputLabel>
                            <Input
                              id="quantity-new-product"
                              type="number"
                              fullWidth
                              value={quan}
                              onChange={(e) => {
                                changeQuantity(e.target.value);
                              }}
                              required
                            />
                          </FormControl>

                          <Box>
                            <MDButton
                              variant="gradient"
                              color="info"
                              sx={{ mr: "8px" }}
                              type="submit"
                              startIcon={<DataSaverOnIcon />}
                            >
                              Add
                            </MDButton>
                            <MDButton
                              variant="outlined"
                              color="info"
                              startIcon={<HighlightOffIcon />}
                              onClick={handleCloseAddQuantityModal}
                            >
                              Cancel
                            </MDButton>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </MDBox>
                </Modal>
                <Modal open={isOpenDeleteProductModal} onClose={handleCloseDeleteProductModal}>
                  <MDBox style={style}>
                    <Card>
                      <CardHeader title="Are you sure to delete this product?" />
                      <CardContent>
                        <Stack
                          component="form"
                          flexDirection="column"
                          onSubmit={handleSubmitDeleteProductForm}
                        >
                          <Typography variant="p">This action can not be undone</Typography>

                          <Box>
                            <MDButton
                              variant="gradient"
                              color="error"
                              sx={{ mr: "8px" }}
                              type="submit"
                              startIcon={<DataSaverOnIcon />}
                            >
                              Delete
                            </MDButton>
                            <MDButton
                              variant="outlined"
                              color="secondary"
                              startIcon={<HighlightOffIcon />}
                              onClick={handleCloseDeleteProductModal}
                            >
                              Cancel
                            </MDButton>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </MDBox>
                </Modal>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </ProductModalProvider>
  );
}

export default Tables;
