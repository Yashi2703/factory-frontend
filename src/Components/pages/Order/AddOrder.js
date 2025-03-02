import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, Typography, Autocomplete, Grid2 } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { apiGetMethod, apiPostMethod } from "../../../api";
import { apiRoute } from "../../../api/route";

const validationSchema = Yup.object().shape({
  orders: Yup.array().of(
    Yup.object().shape({
      filterId: Yup.object()
        .shape({
          value: Yup.string().required("Filter is required"),
          label: Yup.string(),
        })
        .nullable()
        .required("Filter is required"),
      quantity: Yup.string().required("Quantity is required"),
      price: Yup.string().required("Price is required"),
      amount: Yup.string().required("Amount is required"),
    })
  ),
});

export const AddOrder = () => {
  const [filter, setFilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState()
  const [filterType, setFilterType] = useState([])
  const initialValues = { orders: [{ filterId: null, filterModelId: null, polythene: null, quantity: "", price: "", amount: "" }],orderStatus:null };

  useEffect(() => {
    const apiGetProduct = async () => {
      try {
        const res = await apiGetMethod(`${apiRoute.getProduct}`);
        const array = res?.data?.map((item) => ({ value: item?._id, label: item?.filter })) || [];
        setFilter(array);
      } catch (err) {
        console.log(err);
      }
    };
    apiGetProduct();
  }, []);
  useEffect(() => {
    const apiGetFilterModal = async () => {
      try {
        const res = await apiGetMethod(`${apiRoute.getParticularFilter}/${selectedFilter.value}`);
        console.log(res, "resrererererere")
        const array = res?.data?.map((item) => ({ value: item?._id, label: item?.name })) || [];
        setFilterType(array);
      } catch (err) {
        console.log(err);
      }
    };
    apiGetFilterModal();
  }, [selectedFilter]);
  const polythene = [{ value: "dhef", label: "dhef" }, { value: "hef", label: "hef" }, { value: "ef", label: "ef" }]
  const orderStatus = [{ value: "Recived", label: "recived" }, { value: "Processig", label: "processig" }, { value: "Delevired", label: "delevired" }]
  console.log(selectedFilter, "uuuuuuuuu")
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      
      // Orders array ko iterate karke FormData mein add karein
      values.orders.forEach((order, index) => {
        formData.append(`orders[${index}][filterId]`, order.filterId?.value);
        formData.append(`orders[${index}][filterModelId]`, order.filterModelId?.value);
        formData.append(`orders[${index}][polythene]`, order.polythene?.value);
        formData.append(`orders[${index}][quantity]`, order.quantity);
        formData.append(`orders[${index}][pricePerPiece]`, order.price);
        formData.append(`orders[${index}][amount]`, order.amount);
      });
  
      // Order status
      formData.append("orderStatus", values.orderStatus?.value);
  
      // API call
      // const response = await fetch("http://your-api-url/orders", {
      //   method: "POST",
      //   body: formData,
      // });
      const response = apiPostMethod(`${apiRoute.addOrder}`,formData) 
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting, values, handleChange, setFieldValue }) => (

        <Form>
          {console.log(values, "----------")}
          <FieldArray name="orders">
            {({ push, remove }) => (
              <Box>
                {values.orders.map((order, index) => (
                  <Card key={index} sx={{ p: 3, m: 2 }}>
                    <Grid2 container spacing={3}>
                      <Grid2 size={4}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
                            color="#333333"
                            fontWeight={600}
                          >
                            Filter
                          </Typography>
                          <Autocomplete
                            name={`orders.${index}.filterId`}
                            disablePortal
                            options={filter}
                            value={values.orders[index].filterId || null} // Use correct index
                            getOptionLabel={(option) => option?.label}
                            isOptionEqualToValue={(option, value) => option?.value === value?.value}
                            onChange={(event, newValue) => {
                              setFieldValue(`orders.${index}.filterId`, newValue);
                              setSelectedFilter(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Product" />}
                          />
                        </Box>
                      </Grid2>
                      <Grid2 size={4}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
                            color="#333333"
                            fontWeight={600}
                          >
                            Filter Model
                          </Typography>
                          <Autocomplete
                            name={`orders.${index}.filterModelId`}
                            disablePortal
                            options={filterType}
                            value={values.orders[index].filterModelId || null} // Use correct index
                            getOptionLabel={(option) => option?.label}
                            isOptionEqualToValue={(option, value) => option?.value === value?.value}
                            onChange={(event, newValue) => {
                              setFieldValue(`orders.${index}.filterModelId`, newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Product Model" />}
                          />

                        </Box>
                      </Grid2>
                      <Grid2 size={4}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
                            color="#333333"
                            fontWeight={600}
                          >
                            polythene
                          </Typography>
                          <Autocomplete
                            name={`orders.${index}.polythene`}
                            disablePortal
                            options={polythene}
                            value={values.orders[index].polythene || null} // Use correct index
                            getOptionLabel={(option) => option?.label}
                            isOptionEqualToValue={(option, value) => option?.value === value?.value}
                            onChange={(event, newValue) => {
                              setFieldValue(`orders.${index}.polythene`, newValue);
                              setSelectedFilter(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Polythene" />}
                          />
                        </Box>
                      </Grid2>
                      <Grid2 size={4}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
                            color="#333333"
                            fontWeight={600}
                          >
                            Quantity
                          </Typography>
                          <TextField
                            name={`orders.${index}.quantity`}
                            value={values.orders[index].quantity}
                            onChange={(e) => {
                              const quantity = e.target.value;
                              const price = values.orders[index].price || 0;
                              const amount = quantity * price; // Calculate amount
                              setFieldValue(`orders.${index}.quantity`, quantity);
                              setFieldValue(`orders.${index}.amount`, amount); // Update amount
                            }}
                            fullWidth
                          />


                        </Box>
                      </Grid2>
                      <Grid2 size={4}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
                            color="#333333"
                            fontWeight={600}
                          >
                            Price Per Piece
                          </Typography>
                          <TextField
                            name={`orders.${index}.price`}
                            value={values.orders[index].price}
                            onChange={(e) => {
                              const price = e.target.value;
                              const quantity = values.orders[index].quantity || 0;
                              const amount = quantity * price; // Calculate amount
                              setFieldValue(`orders.${index}.price`, price);
                              setFieldValue(`orders.${index}.amount`, amount); // Update amount
                            }}
                            fullWidth
                          />
                        </Box>
                      </Grid2>
                      <Grid2 size={4}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
                            color="#333333"
                            fontWeight={600}
                          >
                            Amount
                          </Typography>
                          <TextField
                            name={`orders.${index}.amount`}
                            value={values.orders[index].amount}
                            disabled // Prevent manual editing, only calculated value allowed
                            fullWidth
                          />
                        </Box>
                      </Grid2>
                     
                    </Grid2>

                    {values.orders.length > 1 && (
                      <Button onClick={() => remove(index)} color="secondary">Remove</Button>
                    )}
                  </Card>
                ))}

                {/* Add More Items */}
                <Button
                 sx={{ display: "flex", justifyContent: "flex-end", mt: 2 ,ml:2}}
                  variant="contained"
                  onClick={() => push({ filterId: null, filterModelId: null, polythene: null, quantity: "", price: "", amount: "" })}
                >
                  Add More Items
                </Button>
              </Box>
            )}
          </FieldArray>
          <Box sx={{ mb: 1, mt: 2 }}>
  <Typography
    variant="subtitle1"
    gutterBottom
    fontSize={{ xs: "12px", sm: "12px", md: "12px" }}
    color="#333333"
    fontWeight={600}
  >
    Order Status
  </Typography>
  <Autocomplete
    name="orderStatus"
    disablePortal
    options={orderStatus}
    value={values.orderStatus || null} // Use correct value
    getOptionLabel={(option) => option?.label}
    isOptionEqualToValue={(option, value) => option?.value === value?.value}
    onChange={(event, newValue) => {
      setFieldValue("orderStatus", newValue); // Set value at root level
    }}
    renderInput={(params) => <TextField {...params} label="Order Status" />}
  />
</Box>
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
                      onClick={()=>{}}
                    >
                      Cancel
                    </Button>
                  </div>
        </Form>
      )}
    </Formik>
  );
};
