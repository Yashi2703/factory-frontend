import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
export const Addorder = () => {
  const [cards, setCards] = useState([{ id: 1, values: {} }]);
  const handleAddCard = () => {
    const newCard = { id: cards.length + 1, values: {} };
    setCards([...cards, newCard]);
  };
  const handleRemoveCard = (cardId) => {
    if (cards.length > 1) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    }
  };
  return (
    <Box>
      {cards?.map((card) => (
        <Card sx={{ p: 3, m: 2 }} key={card.id}>
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
            {/* <IconButton
                onClick={() => handleRemoveCard(card.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton> */}
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
