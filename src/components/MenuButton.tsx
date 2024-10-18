import * as React from "react";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Avatar } from "@mui/material";

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
}

export default function MenuButton({
  showBadge = false,
  ...props
}: any) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <Avatar
        sizes="small"
        alt={"user"}
        src="/images/avatar-5.jpg" 
        sx={{ width: 36, height: 36 }}
        {...props}
      />
    </Badge>
  );
}
