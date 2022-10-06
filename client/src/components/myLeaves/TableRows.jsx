import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

const columns = [
  { id: "count", label: "#", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "reason", label: "Reason", minWidth: 80, align: "left" },
  {
    id: "fromDate",
    label: "From",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "toDate",
    label: "To",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

function createData(count, name, reason, fromDate, toDate, status) {
  //   const density = population / size;
  return { count, name, reason, fromDate, toDate, status };
}

const rows = [
  createData(
    "1",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "2",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "3",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "approved"
  ),
  createData(
    "4",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "approved"
  ),
  createData(
    "5",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "approved"
  ),
  createData(
    "6",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "rejected"
  ),
  createData(
    "7",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "rejected"
  ),
  createData(
    "8",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "rejected"
  ),
  createData(
    "9",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "10",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "11",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "12",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "13",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "14",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "15",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
  createData(
    "16",
    "syed Abuzar zaidi",
    "detail",
    "05/10/2022",
    "05/10/2022",
    "pending"
  ),
];

const TableRows = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "80%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        {/* <Box  sx={{
                    border: 1,
                    borderColor: "text.primary",
                    borderRadius: 1,
                  }}> */}
                 
          <TableHead>
        
            <TableRow sx={{backgroundColor:"green"}}>
             
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                 
                >
                  {column.label}
                </TableCell>
              ))}
             
            </TableRow>
           
          </TableHead>
        
          {/* </Box> */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "status"
                            ? <Typography sx={{color:value==='approved'?"green":"red",fontSize:"18px"}}>{value}</Typography>
                            : `${value==="detail"?"Detail":value}`}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
   
    </Paper>
  );
};

export default TableRows;
