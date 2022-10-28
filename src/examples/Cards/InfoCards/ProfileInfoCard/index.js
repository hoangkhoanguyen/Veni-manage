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

// react-routers components
// import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Stack,
} from "@mui/material";
import { useState } from "react";
import MDButton from "components/MDButton";
import userService from "service/userService";
import {
  setNotiInfo,
  setOpenSuccessSnackbar,
  setOpenErrorSnackbar,
} from "redux/reducers/uiReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "redux/reducers/userReducer";

// Material Dashboard 2 React base styles
// import colors from "assets/theme/base/colors";
// import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, action, shadow }) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const labels = [];
  const values = [];
  const [isEditting, setIsEditting] = useState(false);
  const [editedInfo, setEditedInfo] = useState([]);
  // const { socialMediaColors } = colors;
  // const { size } = typography;

  // const field = Object.keys(info);

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

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

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  const handleChangeEditedInfo = (key, value) => {
    if (key === "phoneNumber" && value.length > 10) return;
    setEditedInfo({
      ...editedInfo,
      [key]: value,
    });
  };
  // Render the card info items
  const renderItems = labels.map((label, index) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp; {values[index]}
      </MDTypography>
    </MDBox>
  ));

  const handleClickEditBtn = () => {
    setEditedInfo({
      phoneNumber: info?.mobile,
      address: info?.location,
    });
    setIsEditting(true);
  };
  const handleCancelEditMode = () => {
    setIsEditting(false);
  };

  const handleSaveEditedInfo = async (e) => {
    e.preventDefault();
    const body = editedInfo;
    const response = await userService.updateInfo(body);
    console.log(response);
    if (response?.errCode === 0) {
      dispatch(
        setNotiInfo({
          notiContent: "Congratulations!",
          notiTitle: response.errMsg,
        })
      );
      dispatch(setOpenSuccessSnackbar(true));
      dispatch(
        setUserInfo({
          ...userInfo,
          ...editedInfo,
        })
      );
      handleCancelEditMode();
    } else {
      dispatch(
        setNotiInfo({
          notiContent: "Please check!",
          notiTitle: response?.errMsg ? response.errMsg : "Something went wrong!",
        })
      );
      dispatch(setOpenErrorSnackbar(true));
    }
  };

  // Render the card social media icons
  // const renderSocial = social.map(({ link, icon, color }) => (
  //   <MDBox
  //     key={color}
  //     component="a"
  //     href={link}
  //     target="_blank"
  //     rel="noreferrer"
  //     fontSize={size.lg}
  //     color={socialMediaColors[color].main}
  //     pr={1}
  //     pl={0.5}
  //     lineHeight={1}
  //   >
  //     {icon}
  //   </MDBox>
  // ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none", flex: 1 }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        {!isEditting && (
          <MDTypography variant="body2" color="secondary">
            <Tooltip title={action.tooltip} placement="top">
              <Button onClick={handleClickEditBtn}>
                <Icon>edit</Icon>
              </Button>
            </Tooltip>
          </MDTypography>
        )}
        <Modal open={isEditting} onClose={handleCancelEditMode}>
          <MDBox style={style}>
            <Card>
              <CardHeader title="Add quantity" />
              <CardContent>
                <Stack component="form" flexDirection="column" onSubmit={handleSaveEditedInfo}>
                  <FormControl sx={{ mb: 2 }}>
                    <InputLabel htmlFor="phone-number">Phone number</InputLabel>
                    <Input
                      id="phone-number"
                      type="number"
                      fullWidth
                      value={editedInfo.phoneNumber}
                      onChange={(e) => {
                        handleChangeEditedInfo("phoneNumber", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl sx={{ mb: 2 }}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input
                      id="address"
                      type="text"
                      fullWidth
                      value={editedInfo.address}
                      onChange={(e) => {
                        handleChangeEditedInfo("address", e.target.value);
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
                      onClick={handleCancelEditMode}
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
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          {/* <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  // social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
