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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
// import colors from "assets/theme/base/colors";
// import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, action, shadow }) {
  const labels = [];
  const values = [];
  const [isEditting, setIsEditting] = useState(false);
  const [editedInfo, setEditedInfo] = useState([]);
  // const { socialMediaColors } = colors;
  // const { size } = typography;

  const field = Object.keys(info);

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

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  const handleChangeEditedInfo = (key, value) => {
    setEditedInfo(editedInfo.map((data, index) => (key === index ? value : data)));
  };
  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;
        {isEditting ? (
          <Input
            value={editedInfo[key]}
            onChange={(e) => {
              handleChangeEditedInfo(key, e.target.value);
            }}
          />
        ) : (
          values[key]
        )}
      </MDTypography>
    </MDBox>
  ));

  const handleClickEditBtn = () => {
    setEditedInfo(values);
    setIsEditting(true);
  };

  const handleSaveEditedInfo = () => {
    console.log(editedInfo);
    const body = editedInfo.reduce(
      (result, value, index) => ({
        ...result,
        [field[index]]: value,
      }),
      {}
    );
    console.log(body);
  };

  const handleCancelEditMode = () => {
    setIsEditting(false);
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
        {isEditting && (
          <MDBox>
            <MDButton variant="gradient" color="info" onClick={handleSaveEditedInfo}>
              Save
            </MDButton>
            <MDButton onClick={handleCancelEditMode}>Cancel</MDButton>
          </MDBox>
        )}
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
