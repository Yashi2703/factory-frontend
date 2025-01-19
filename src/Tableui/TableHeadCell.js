import React from "react";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";

const TableHeadCell = (props) => {
    const {
        headLabel,
    } = props;
    return (
        <TableHead className="sticky">
            <TableRow className="tableHead">
                {headLabel?.length > 0 &&
                    headLabel.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align || "left"}
                            sx={{
                                width: headCell.width,
                                minWidth: headCell.minWidth,
                                textAlign: headCell.center,
                            }}
                        >
                            {headCell.label}
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeadCell;
