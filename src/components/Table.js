import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatToBrl } from '../helpers/format-numbers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TableComponent({ columns, rows }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {
                            columns.map((item) => <StyledTableCell>{item}</StyledTableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                {
                                    Object.entries(row).map((item, index) => (
                                        <StyledTableCell key={index} component="th" scope="row">
                                            {
                                                item[0] === "price" || item[0] === "sum" ? formatToBrl(item[1]) : item[1]
                                            }
                                        </StyledTableCell>
                                    ))
                                }
                            </StyledTableRow>
                        ))
                    }

                    <StyledTableRow >
                        <StyledTableCell component="th" scope="row">
                            Total: R${
                                formatToBrl(rows.reduce((prevValue, current) => prevValue + (current.quantity * current.price), 0))
                            }
                        </StyledTableCell>

                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}