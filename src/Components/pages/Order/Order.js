import { Box, Button, Card, Grid2, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TableBar } from "@mui/icons-material";
import TableToolbar from "../../../Tableui/TableToolbar";
import Scrollbar from "../../../Scrollbar/scrollbar";
import TableHeadCell from "../../../Tableui/TableHeadCell";
import Loader from "../../../Tableui/Loader";
import { ProductHeader } from "../../../common/HeadCell";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { BootstrapTooltipUi } from "../../../Tableui/BootstrapToolTip";
import { useNavigate } from "react-router-dom";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 475,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
export const Order = () => {
    const headLabel = [
        "Carbon", "Sediment"
    ];
    const navigate = useNavigate()
    return (
        <Box>
            <div className="flexTop">
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<AddIcon />}
                    className="blueButton ms-2"
                    onClick={() => navigate("/add-order")}
                >
                    Add Order
                </Button>
            </div>
            <Card className="cardFix">
                <div className="allocation">
                    <TableToolbar title="Order" />
                </div>
                <Scrollbar>
                    <TableContainer className="tableResponsive">
                        <Table sx={{
                            minWidth: 800,
                        }}>
                            <TableHeadCell headLabel={ProductHeader} />
                            <TableBody>
                                {headLabel?.map((item, idx) => {
                                    return (
                                        <TableRow>
                                            <TableCell
                                            >
                                                {item}
                                            </TableCell>
                                            <TableCell align="center"
                                            >
                                                <BootstrapTooltipUi title="Edit" placement="top">
                                                    <IconButton
                                                        className="outerborder"
                                                        aria-label="Edit"
                                                    // onClick={() => editUser(id)}
                                                    >
                                                        <DriveFileRenameOutlineIcon />
                                                    </IconButton>
                                                </BootstrapTooltipUi>
                                                <BootstrapTooltipUi title="Edit" placement="top">
                                                    <IconButton
                                                        className="outerborder"
                                                        aria-label="Edit"
                                                    // onClick={() => editUser(id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </BootstrapTooltipUi>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </Box>
    )
}