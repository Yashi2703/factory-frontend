import {
    Box, Button, Card, IconButton, Modal, Table, TableBody, TableCell, 
    TableContainer, TableRow, TextField,Grid2
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import TableToolbar from "../Tableui/TableToolbar";
import Scrollbar from "../Scrollbar/scrollbar";
import TableHeadCell from "../Tableui/TableHeadCell";
import { BootstrapTooltipUi } from "../Tableui/BootstrapToolTip";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { apiGetMethod, apiPostMethod } from "../api";
import { apiRoute } from "../api/route";
import { ProductHeader } from "./Header";

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

const initialValues = {
    filter: "",
};

const validationSchema = Yup.object().shape({
    filter: Yup.string().required("Filter is required"),
});

export const Product = () => {
    const [addProduct, setAddProduct] = useState(false);
    const [data,setData] = useState([])
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const obj = { name: values.filter };
            const response = await apiPostMethod(`${apiRoute.product}`, obj);
            console.log(response);
            apiGetProduct()
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
            setAddProduct(false);
        }
    };
const apiGetProduct = async() =>{
     try{
        await apiGetMethod(`${apiRoute.getProduct}`).then((res)=>{
            setData(res?.data)
        })
     }catch(err){
        console.log(err)
     }
}
useEffect(()=>{
    apiGetProduct()
},[])
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
                        <Table sx={{ minWidth: 800 }}>
                            <TableHeadCell headLabel={ProductHeader} />
                            <TableBody>
                                {data.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{item?.name}</TableCell>
                                        <TableCell align="center">
                                            <BootstrapTooltipUi title="Edit" placement="top">
                                                <IconButton className="outerborder" aria-label="Edit">
                                                    <DriveFileRenameOutlineIcon />
                                                </IconButton>
                                            </BootstrapTooltipUi>
                                            <BootstrapTooltipUi title="Delete" placement="top">
                                                <IconButton className="outerborder" aria-label="Delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </BootstrapTooltipUi>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
            {addProduct && (
                <Modal
                    open={addProduct}
                    onClose={() => setAddProduct(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="confirmModal">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Grid2 container spacing={2}>
                                        <Grid2 xs={12}>
                                            <h4 style={{ textAlign: "center", fontWeight: 600 }}>
                                                Add Product
                                            </h4>
                                        </Grid2>
                                        <Grid2 xs={12}>
                                            <Field
                                                as={TextField}
                                                className="inputText"
                                                autoComplete="off"
                                                name="filter"
                                                label="Filter"
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid2>
                                    </Grid2>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                                        <Button type="submit" className="blueButton" sx={{ p: "8px 25px" }} disabled={isSubmitting}>
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
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};
