import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TableToolbar from "../../../Tableui/TableToolbar";
import Scrollbar from "../../../Scrollbar/scrollbar";
import TableHeadCell from "../../../Tableui/TableHeadCell";
import { ProductHeader, ProductTypeHeader } from "../../../common/HeadCell";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { BootstrapTooltipUi } from "../../../Tableui/BootstrapToolTip";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  apiDeleteMethod,
  apiGetMethod,
  apiPostMethod,
  apiPutMethod,
} from "../../../api";
import { apiRoute } from "../../../api/route";
import { toast } from "react-toastify";
import DeleteModal from "../../../common/DeleteModal";
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
const validationSchema = Yup.object().shape({
  filter: Yup.string().required("Filter Type is required"),
  filterId: Yup.object()
    .shape({
      value: Yup.string().required("Filter is required"), // Ensure `value` exists
      label: Yup.string(),
    })
    .nullable()
    .required("Filter is required"),
});
export const ProductType = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [getId, setGetId] = useState("");
  const [initialValues, setInitialValue] = useState({
    filter: "",
    filterId: [],
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const obj = { name: values.filter, modelId: values.filterId?.value };
      let response = getId
        ? await apiPutMethod(`${apiRoute.editFilterType}/${getId}`, obj)
        : await apiPostMethod(`${apiRoute.filterType}`, obj);
      if (response) {
        if (getId) {
          setData((prevData) => {
            const _tempData = [...prevData];
            const updatedIndex = _tempData.findIndex(
              (fi) => fi._id === response.data._id
            );
            _tempData[updatedIndex] = response.data;
            return _tempData;
          });
          toast.success("FilterType Updated Successfully");
        } else {
          setData((prevData) => {
            return [...prevData, response.data];
          });
          toast.success("FilterType Added Successfully");
        }
        apiGetAllData();
      } else {
        toast.error(`Error: Failed to ${getId ? "Update" : "Add"} filter!`);
      }
    } catch (err) {
      toast.error(err?.data?.message);
    } finally {
      setSubmitting(false);
      setAddProduct(false);
    }
  };
  const apiGetProduct = async () => {
    try {
      let array = [];
      await apiGetMethod(`${apiRoute.getProduct}`).then((res) => {
        res?.data?.map((item) => {
          let obj = {
            value: item?._id,
            label: item?.filter,
          };
          array.push(obj);
        });
        setFilterData(array);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (addProduct == true) {
      apiGetProduct();
    }
    if (addProduct == false) {
      setGetId("");
    }
  }, [addProduct]);
  const apiGetAllData = async () => {
    try {
      await apiGetMethod(`${apiRoute.getProductType}`).then((res) => {
        setData(res?.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    apiGetAllData();
  }, []);
  const deleteData = () => {
    if (!getId) {
      toast.error("Error: Product ID is missing!");
      return;
    }

    const url = `/filter-type/delete-filter/${getId}`;

    apiDeleteMethod(url)
      .then((response) => {
        setDeleteModal(false);
        setData((prevData) => {
          return prevData.filter((item) => item._id !== getId);
        });
        toast.success(response?.message || "Deleted successfully!");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "An error occurred while deleting.");
      });
  };

  const editById = () => {
    apiGetMethod(`${apiRoute.editFilterTypeId}/${getId}`)
      .then((res) => {
        const selectedFilter = res?.data?.modelId
          ? {
              value: res?.data?.modelId?._id,
              label: res?.data?.modelId?.filter,
            }
          : null; // Agar modelId null ho toh empty

        setInitialValue({
          filter: res?.data?.name || "",
          filterId: selectedFilter, // ✅ Correct format
        });

        setFilterData((prevData) => {
          if (
            selectedFilter &&
            !prevData.some((item) => item.value === selectedFilter.value)
          ) {
            return [...prevData, selectedFilter];
          }
          return prevData;
        });
      })
      .catch((err) => {
        toast.error(err?.data?.message || "An error occurred while fetching.");
      });
  };
  useEffect(() => {
    if (getId !== "" && addProduct == true) {
      editById();
    }
  }, [getId]);
  return (
    <Box>
      <div className="flexTop">
        <Button
          variant="contained"
          color="inherit"
          startIcon={<AddIcon />}
          className="blueButton ms-2"
          onClick={() => {
            setAddProduct(true);
            setInitialValue({ filter: "", filterId: [] });
          }}
        >
          Add Product Type
        </Button>
      </div>
      <Card className="cardFix">
        <div className="allocation">
          <TableToolbar title="Product Type" />
        </div>
        <Scrollbar>
          <TableContainer className="tableResponsive">
            <Table
              sx={{
                minWidth: 800,
              }}
            >
              <TableHeadCell headLabel={ProductTypeHeader} />
              <TableBody>
                {data?.length > 0 ? (
                  data?.map((item, idx) => {
                    return (
                      <TableRow>
                        <TableCell>{item?.modelname || "-"}</TableCell>
                        <TableCell>{item?.name}</TableCell>
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
                          <BootstrapTooltipUi title="Edit" placement="top">
                            <IconButton
                              className="outerborder"
                              aria-label="Edit"
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
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={ProductHeader?.length}
                      style={{ textAlign: "center", fontWeight: 700 }}
                    >
                      No Data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
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
                      enableReinitialize
                    >
                      {({
                        isSubmitting,
                        values,
                        handleChange,
                        setFieldValue,
                      }) => (
                        <Form>
                          <Grid2 container rowSpacing={2}>
                            <Grid2 size={12}>
                              <h4
                                style={{
                                  textAlign: "center",
                                  fontWeight: 600,
                                  fontSize: 24,
                                }}
                              >
                                Product
                              </h4>
                            </Grid2>
                            <Grid2 size={12} mb={2}>
                              <Autocomplete
                                name="filterId"
                                disablePortal
                                options={filterData}
                                value={values.filterId || null} // ✅ Ensure correct selection
                                getOptionLabel={(option) => option.label || ""}
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value
                                }
                                onChange={(event, newValue) =>
                                  setFieldValue("filterId", newValue)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} label="Product" />
                                )}
                              />
                              <ErrorMessage
                                name="filterId"
                                component="div"
                                className="error"
                              />
                            </Grid2>
                            <Field
                              as={TextField}
                              className="inputText"
                              autoComplete="off"
                              name="filter"
                              label="Filter"
                              fullWidth
                              variant="outlined"
                              onChange={handleChange} // Formik ka handleChange use karein
                            />
                            <ErrorMessage
                              name="filter"
                              component="div"
                              className="error"
                            />
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
                <DeleteModal
                  isModalOpen={deleteModal}
                  setIsModalOpen={setDeleteModal}
                  deleteData={deleteData}
                />
              )}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Box>
  );
};
