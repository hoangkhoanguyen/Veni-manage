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
// import AddIcon from "@mui/icons-material/Add";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
// Data
import orderHistoryTableData from "layouts/orderhistory/data/orderHistoryTableData";
import {
  Box,
  // Button,
  CardContent,
  CardHeader,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // Input,
  // InputLabel,
  Modal,
  // Radio,
  // RadioGroup,
  Stack,
  // TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import MDButton from "components/MDButton";
import { ProductModalProvider } from "customeContext/ProductModalContext";
// import {
// useMaterialUIController,
// setOpenEditProductModal,
// setEditProductInfo,
// setOpenAddQuantityProductModal,
// setOpenDeleteProductModal,
// } from "context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOpenOrderDetails } from "redux/reducers/orderReducer";

function Tables() {
  const dispatch = useDispatch();
  const { columns, rows } = orderHistoryTableData();
  const isLogin = useSelector((state) => state.user.isLogin);
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const isOpenOrderDetails = useSelector((state) => state.order.isOpenOrderDetails);

  const navigate = useNavigate();

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

  const handleCloseOrderDetailsModal = () => {
    dispatch(setOpenOrderDetails(false));
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
                    Your Orders History
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
                <Modal open={isOpenOrderDetails} onClose={handleCloseOrderDetailsModal}>
                  <MDBox style={style}>
                    <Card>
                      <CardHeader title="Are you sure to delete this product?" />
                      <CardContent>
                        <Stack flexDirection="column">
                          <Typography variant="p">This action can not be undone</Typography>
                          {console.log(selectedOrder)}
                          <Box>
                            <MDButton
                              variant="gradient"
                              color="info"
                              sx={{ mr: "8px" }}
                              startIcon={<DataSaverOnIcon />}
                              onClick={handleCloseOrderDetailsModal}
                            >
                              Ok
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
