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
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Tooltip } from "@mui/material";
import {
  setOpenEditProductModal,
  setEditProductInfo,
  useMaterialUIController,
  setAddQuantityProductId,
  setOpenAddQuantityProductModal,
  setDeleteProductId,
  setOpenDeleteProductModal,
} from "context";
import { useEffect, useState } from "react";
import axios from "customizeAxios";

export default function data() {
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const result = await axios.get("/api/order/get");
      console.log(result);
      if (result?.data?.errCode === 0) {
        setOrderHistoryList(result.data.data);
      }
    };
    getProduct();
  }, []);

  const dispatch = useMaterialUIController()[1];
  const handleClickEditProduct = (product) => {
    setOpenEditProductModal(dispatch, true);
    setEditProductInfo(dispatch, product);
  };
  const handleClickAddQuantity = (productId) => {
    setAddQuantityProductId(dispatch, productId);
    setOpenAddQuantityProductModal(dispatch, true);
  };
  const handleClickDelete = (productId) => {
    setDeleteProductId(dispatch, productId);
    setOpenDeleteProductModal(dispatch, true);
  };
  return {
    columns: [
      { Header: "Time", accessor: "createdAt", align: "center" },
      { Header: "Total Price", accessor: "totalPrice", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: orderHistoryList.map((product) => {
      const row = {
        name: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {product.name}
          </MDTypography>
        ),
        image: <MDAvatar src={product.image} name={product.name} size="lg" />,
        type: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={product.type} variant="square" color="success" size="sm" />
          </MDBox>
        ),
        price: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {`${product.price} $`}
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {product.total}
          </MDTypography>
        ),
        booked: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {product.booked}
          </MDTypography>
        ),
        action: (
          <MDBox>
            <Stack direction="row">
              <Tooltip title="Add Quantity">
                <IconButton
                  onClick={() => {
                    handleClickAddQuantity(product.id);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    handleClickEditProduct(product);
                  }}
                >
                  <BorderColorIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    handleClickDelete(product.id);
                  }}
                >
                  <DeleteIcon />
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
