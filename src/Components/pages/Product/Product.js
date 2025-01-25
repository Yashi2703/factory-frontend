import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Grid2,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import TableToolbar from "../../../Tableui/TableToolbar";
import Scrollbar from "../../../Scrollbar/scrollbar";
import TableHeadCell from "../../../Tableui/TableHeadCell";
import { BootstrapTooltipUi } from "../../../Tableui/BootstrapToolTip";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { apiDeleteMethod, apiGetMethod, apiPostMethod, apiPutMethod } from "../../../api";
import { apiRoute } from "../../../api/route";
import { ProductHeader } from "../../../common/HeadCell";
import { style } from "../../../common/Modelui";
import DeleteModal from "../../../common/DeleteModal";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  filter: Yup.string().required("Filter is required"),
});

export const Product = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [initialValues, setInitialValue] = useState({
    filter: "",
  });
  const [getId, setGetId] = useState("");
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const obj = { filter: values.filter };
      let url = getId ? apiPutMethod(`${apiRoute.editProduct}/${getId}`,obj) : await apiPostMethod(`${apiRoute.product}`, obj);
      const response = url
      console.log(response);
      toast.success(response?.message)
      apiGetProduct();
    } catch (err) {
      toast.error(err?.data?.message)
      console.log(err);
    } finally {
      setSubmitting(false);
      setAddProduct(false);
    }
  };
  const apiGetProduct = async () => {
    try {
      await apiGetMethod(`${apiRoute.getProduct}`).then((res) => {
        setData(res?.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    apiGetProduct();
  }, []);
  useEffect(() => {
    if (addProduct == false) {
      setGetId("");
    }
  }, [addProduct]);
  const deleteData = () => {
    if (!getId) {
      toast.error("Error: Product ID is missing!");
      return;
    }

    const url = `/filter/delete-filter/${getId}`;
    console.log("Deleting from URL:", url);

    apiDeleteMethod(url)
      .then((response) => {
        console.log("Delete Response:", response); // Debugging response
        setDeleteModal(false);
        toast.success(response?.message || "Deleted successfully!");
        apiGetMethod(); // Refresh data
      })
      .catch((err) => {
        console.error("Delete Error:", err);
        toast.error(err?.data?.message || "An error occurred while deleting.");
      });
  };

  const editById = () => {
    apiGetMethod(`${apiRoute.editProductyId}/${getId}`).then((res) => {
      setInitialValue({
        filter: res?.data?.filter || "",
      });
    }).catch((err) => {
      console.error("Delete Error:", err);
      toast.error(err?.data?.message || "An error occurred while deleting.");
    })
  }
  useEffect(() => {
    if (getId !== "" && addProduct == true) {
      editById()
    }
  }, [getId])
  console.log(initialValues)
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
                    <TableCell>{item?.filter}</TableCell>
                    <TableCell align="center">
                      <BootstrapTooltipUi title="Edit" placement="top">
                        <IconButton
                          className="outerborder"
                          aria-label="Edit"
                          onClick={() => {
                            {
                              setGetId(item?._id);
                              setAddProduct(true);
                            }
                          }}
                        >
                          <DriveFileRenameOutlineIcon />
                        </IconButton>
                      </BootstrapTooltipUi>
                      <BootstrapTooltipUi title="Delete" placement="top">
                        <IconButton
                          className="outerborder"
                          aria-label="Delete"
                          onClick={() => {
                            {
                              setGetId(item?._id);
                              setDeleteModal(true);
                            }
                          }}
                        >
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
                  <Grid2 container columnSpacing={2} rowSpacing={2}>
                    <Grid2 size={12}>
                      <h4 style={{ textAlign: "center", fontWeight: 600, fontSize: 24 }}>
                        {getId ? "Edit" : "Add"} Product
                      </h4>
                    </Grid2>
                    {/* <Grid2 xs={12}> */}
                    <Field
                      as={TextField}
                      className="inputText"
                      autoComplete="off"
                      name="filter"
                      label="Filter"
                      fullWidth
                      variant="outlined"
                    />
                    {/* </Grid2> */}
                  </Grid2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="submit"
                      className="blueButton"
                      sx={{ p: "8px 25px" }}
                      disabled={isSubmitting}
                    >
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
      {deleteModal && (
        <DeleteModal isModalOpen={deleteModal} setIsModalOpen={setDeleteModal} deleteData={deleteData} />
      )}
    </Box>
  );
};
