import { Box, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

export const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingInline: 5,
              fontSize: { xs: "14px", sm: "14px", md: "14px" },
              color: "#aeb5bd",
              gap: 2,
              cursor:"pointer"
            }}
            onClick={() => window.open("https://patentskart.com/")}
          >
            Powered By
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100px",
                objectFit: "contain",
                imageRendering: "crisp-edges",
              }}
            />
          </Typography>
          {/* <Navbar /> */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"-10px"}}>
            {children}
          </Box>
          {/* <Footer /> */}
        </Box>
      </Box>
    </Box>
  );
};
