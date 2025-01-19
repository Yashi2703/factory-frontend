import {styled} from "@mui/material";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import React from "react";

export const BootstrapTooltipUi = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));