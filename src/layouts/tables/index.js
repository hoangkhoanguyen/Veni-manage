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
import { useState } from "react";
import MDButton from "components/MDButton";
import { ProductModalProvider } from "customeContext/ProductModalContext";
import {
  useMaterialUIController,
  setOpenEditProductModal,
  setEditProductInfo,
  setOpenAddQuantityProductModal,
  setOpenDeleteProductModal,
} from "context";

function Tables() {
  const { columns, rows } = productsTableData();

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
  const [quan, setQuan] = useState(0);
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
  const handleSubmitNewProductForm = (e) => {
    e.preventDefault();
    const data = { newProductInfo };
    console.log(data);
  };

  // edit product
  const handleChangeEditProductInfo = (key, value) => {
    setEditProductInfo(dispatch, {
      ...newProductInfo,
      [key]: value,
    });
  };

  const handleCloseEditProductModal = () => {
    setOpenEditProductModal(dispatch, false);
  };
  const handleSubmitEditProductForm = (e) => {
    e.preventDefault();
    const data = { editProductInfo };
    console.log(data);
  };

  // add quantity
  const handleCloseAddQuantityModal = () => {
    setOpenAddQuantityProductModal(dispatch, false);
    setQuan(0);
  };
  const changeQuantity = (value) => {
    setQuan(value);
  };
  const handleSubmitAddQuantityProductForm = (e) => {
    e.preventDefault();
    const data = { addQuantityProductId, quan };
    console.log(data);
  };

  // Delete Product
  const handleCloseDeleteProductModal = () => {
    setOpenDeleteProductModal(dispatch, false);
    setQuan(0);
  };
  const handleSubmitDeleteProductForm = (e) => {
    e.preventDefault();
    const data = { deleteProductId };
    console.log(data);
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
                  <Button onClick={handleOpenNewProductModal} startIcon={<AddIcon />}>
                    Add new product
                  </Button>
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
                              />
                            </FormControl>
                            <FormControl sx={{ mb: 2 }}>
                              <InputLabel htmlFor="price-new-product">Price</InputLabel>
                              <Input
                                id="price-new-product"
                                fullWidth
                                value={newProductInfo.price}
                                onChange={(e) => {
                                  handleChangeNewProductInfo("price", e.target.value);
                                }}
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
                            />
                          </FormControl>
                          <FormControl sx={{ mb: 2 }}>
                            <InputLabel htmlFor="price-new-product">Price</InputLabel>
                            <Input
                              id="price-new-product"
                              fullWidth
                              value={editProductInfo.price}
                              onChange={(e) => {
                                handleChangeEditProductInfo("price", e.target.value);
                              }}
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
                              color="info"
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
