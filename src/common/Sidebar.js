import { Drawer, Grid2, ListItem, Typography, List } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { SidebarData } from "./sidebarData";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <Drawer anchor="left"
            variant="permanent" sx={{
                width: 240,
                transition: "all 0.3s ease-in-out",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "black",
                },

            }} >
            <Grid2 container direction={"row"} height={"100%"}>
                <Grid2 size={12}
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column", // Items stack vertically
                    }}>
                    <div>
                        <Typography color="#ca5cdd" fontWeight={600}
                            fontSize={{ xs: "24px", sm: "24px", md: "24px" }} sx={{ mt: 3, mb: 3 }}  >𝕻𝖘 𝕴𝖓𝖉𝖚𝖙𝖗𝖎𝖊𝖘</Typography>
                        <List sx={{ width: "100%" }}>
                            {SidebarData?.length > 0 && SidebarData?.map((item, idx) => {
                                return (
                                    <ListItem
                                        button
                                        sx={{
                                            cursor: "pointer",
                                            mb: 3,
                                            // backgroundColor: "black",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "#D4AF37",
                                                color: "white"
                                            },
                                        }}
                                        onClick={() => navigate(item?.path)}
                                    >
                                        <Typography
                                            title="STANDARD SETTING ORGANIZATION"
                                            variant="h6"
                                            fontWeight={600}
                                            fontSize={{ xs: "16px", sm: "16px", md: "16px" }}
                                            sx={{
                                                fontFamily: "Inter, sans-serif",

                                            }}
                                        >
                                            {item?.name}
                                        </Typography>
                                        <ArrowForwardIosIcon
                                            sx={{
                                                ml: "auto",
                                                color: "white"
                                            }}
                                        />
                                    </ListItem>
                                )
                            })}

                        </List>
                    </div>
                </Grid2>
            </Grid2>
        </Drawer>
    );
};

export default Sidebar;
