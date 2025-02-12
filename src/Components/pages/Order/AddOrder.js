import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiGetMethod } from "../../../api";
import { apiRoute } from "../../../api/route";
import { Form, Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
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
});
export const AddOrder = () => {
  const [cards, setCards] = useState([{ id: 1, values: {} }]);
  const [filter, setFilter] = useState([]);
  const handleAddCard = () => {
    const newCard = { id: cards.length + 1, values: {} };
    setCards([...cards, newCard]);
  };
  const handleRemoveCard = (cardId) => {
    if (cards.length > 1) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
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
        setFilter(array);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiGetProduct();
  }, []);
  return (
    <Box>
      {cards?.map((card) => (
        <Card sx={{ p: 3, m: 2 }} key={card.id}>
          <Formik
            initialValues={{
              filterId: null,
              quantity: "",
              price: "",
              amount: "",
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => console.log(values)}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form>
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
                        name="filterId"
                        disablePortal
                        options={filter}
                        value={values.filterId || null} //
                        getOptionLabel={(option) => option?.label}
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Search..."
                            variant="outlined"
                            sx={{ fontSize: "14px" }}
                          />
                        )}
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Search..."
                            variant="outlined"
                            sx={{ fontSize: "14px" }}
                          />
                        )}
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
                      <TextField fullWidth />
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
                      <TextField fullWidth />
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
                      <TextField fullWidth />
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
                        Order Status
                      </Typography>
                      <Autocomplete
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Search..."
                            variant="outlined"
                            sx={{ fontSize: "14px" }}
                          />
                        )}
                      />
                    </Box>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>

          <Grid2
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              className="blueButton cancel"
              onClick={() => handleRemoveCard(card.id)}
            >
              Remove
            </Button>
          </Grid2>
        </Card>
      ))}

      <Grid2 container columnSpacing={2} rowSpacing={0}>
        <Grid2 size={12} sx={{ mt: 3 }} textAlign="end">
          <Button
            className="blueButton"
            color="primary"
            variant="contained"
            sx={{ mr: "10px" }}
            loadingPosition="start"
            onClick={handleAddCard}
          >
            Add More Items
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};
