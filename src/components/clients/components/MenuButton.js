import * as React from "react";
import PropTypes from "prop-types";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";

function MenuButton({ showBadge = false, ...props }) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <Avatar
        sizes="small"
        alt="Riley Carter"
        src="/images/avatar-5.jpg"
        sx={{ width: 36, height: 36 }}
        {...props}
      />
    </Badge>
  );
}

MenuButton.propTypes = {
  showBadge: PropTypes.bool,
};

export default MenuButton;
