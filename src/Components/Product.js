import { Box, Button, Card, Grid2, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TableBar } from "@mui/icons-material";
import TableToolbar from "../Tableui/TableToolbar";
import Scrollbar from "../Scrollbar/scrollbar";
import TableHeadCell from "../Tableui/TableHeadCell";
import Loader from "../Tableui/Loader";
import { ProductHeader } from "./Header";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { BootstrapTooltipUi } from "../Tableui/BootstrapToolTip";
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
export const Product = () => {
    const headLabel = [
        "Carbon", "Sediment"
    ];
    const [addProduct, setAddProduct] = useState(false)
    return (
        <Box>
            <div className="flexTop">
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<AddIcon />}
                    className="blueButton ms-2"
                    onClick={() => setAddProduct(true)}
                >
                    Add Product
                </Button>
            </div>
            <Card className="cardFix">
                <div className="allocation">
                    <TableToolbar title="Product" />
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
                            {addProduct && <Modal open={addProduct}
                                onClose={() => setAddProduct(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={style} className="confirmModal">
                                    <Grid2 container columnSpacing={2} rowSpacing={3}>
                                        <Grid2 xs={12}>
                                            <h4
                                                style={{
                                                    marginBottom: "20px",
                                                    fontWeight: "600",
                                                    textAlign: "center", // Center align text
                                                }}
                                            >
                                                Add Product
                                            </h4>
                                            <Grid2 size={12}>
                                                <TextField placeholder="Add Product" fullWidth sx={{ width: "100%" }}/> {/* Full width input */}
                                            </Grid2>
                                        </Grid2>
                                    </Grid2>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginTop: "50px",
                                            justifyContent: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Button className="blueButton" sx={{ p: "8px 25px" }}>
                                            Save
                                        </Button>
                                        <Button
                                            className="blueButton cancel"
                                            sx={{ p: "8px 25px" }}
                                            onClick={() => setAddProduct(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>}
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </Box>
    )
}