import { Autocomplete, Box, Card, Grid2, TextField, Typography } from "@mui/material";
import React from "react";

export const Addorder = () => {
    return (
        <Card>
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
                            IPRD Reference Number
                        </Typography>
                        <Autocomplete renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                                sx={{ fontSize: "14px" }}
                            />
                        )} />
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
                            IPRD Reference Number
                        </Typography>
                        <Autocomplete renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                                sx={{ fontSize: "14px" }}
                            />
                        )} />
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
                            IPRD Reference Number
                        </Typography>
                        <Autocomplete renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                                sx={{ fontSize: "14px" }}
                            />
                        )} />
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
                            IPRD Reference Number
                        </Typography>
                        <Autocomplete renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                                sx={{ fontSize: "14px" }}
                            />
                        )} />
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
                            IPRD Reference Number
                        </Typography>
                        <Autocomplete renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                                sx={{ fontSize: "14px" }}
                            />
                        )} />
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
                            IPRD Reference Number
                        </Typography>
                        <Autocomplete renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search..."
                                variant="outlined"
                                sx={{ fontSize: "14px" }}
                            />
                        )} />
                    </Box>
                </Grid2>
            </Grid2>
        </Card>
    )
}