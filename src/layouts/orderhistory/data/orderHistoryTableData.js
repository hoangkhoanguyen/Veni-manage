/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "customizeAxios";
import { useDispatch } from "react-redux";
import { setSelectedOrder, setOpenOrderDetails } from "redux/reducers/orderReducer";

export default function data() {
  const dispatch = useDispatch();
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const result = await axios.get("/api/order/get");
      console.log(result);
      if (result?.errCode === 0) {
        setOrderHistoryList(result.data);
      }
    };
    getOrders();
  }, []);

  const handleShowMoreDetails = (order) => {
    console.log(order);
    dispatch(setSelectedOrder(order));
    dispatch(setOpenOrderDetails(true));
  };

  return {
    columns: [
      { Header: "Time", accessor: "createdAt", align: "center" },
      { Header: "Total Price", accessor: "totalPrice", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: orderHistoryList.map((order) => {
      const row = {
        createdAt: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {order.createdAt}
          </MDTypography>
        ),
        totalPrice: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {`${order.totalPrice} $`}
          </MDTypography>
        ),
        action: (
          <MDBox>
            <Stack direction="row">
              <Tooltip title="See more">
                <IconButton
                  onClick={() => {
                    handleShowMoreDetails(order);
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </MDBox>
        ),
      };
      return row;
    }),
  };
}
