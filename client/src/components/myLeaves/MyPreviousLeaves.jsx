import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  ExpandMoreIcon,
} from "../../utlis/materialUIComponents";

import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
    backgroundColor: "#0A1833",
    padding: "20px",
  },
});

const MyPreviousLeaves = ({ myPreviousLeaves, userName }) => {


  return (
    <Paper sx={{ width: "80%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
          <TableBody>
            {myPreviousLeaves.length>=0?myPreviousLeaves.map((val, ind) => {
              return (
                <TableRow>
                  <TableCell id="count" label="#" sx={{ minWidth: 80 }}>
                    {ind + 1}
                  </TableCell>
                  <TableCell id="name" label="Name" sx={{ minWidth: 170 }}>
                    {userName}
                  </TableCell>
                  <TableCell
                    id="reason"
                    label="From"
                    sx={{ minWidth: 80, textAlign: "left" }}
                  >
                    <div>
                      <CustomWidthTooltip title={val.reason}>
                        <Button sx={{ color: "black" }}>
                          Detail <ExpandMoreIcon />
                        </Button>
                      </CustomWidthTooltip>
                    </div>
                  </TableCell>
                  <TableCell
                    id="fromDate"
                    label="#"
                    sx={{ minWidth: 80, textAlign: "left" }}
                  >
                    {val.fromDate}
                  </TableCell>
                  <TableCell
                    id="toDate"
                    label="To"
                    sx={{ minWidth: 80, textAlign: "left" }}
                  >
                    {val.toDate}
                  </TableCell>
                  <TableCell
                    id="status"
                    label="Status"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: 600,
                      minWidth: 100,
                      textAlign: "left",
                      color:
                        val.status === "approved"
                          ? "green"
                          : val.status === "pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {val.status}
                  </TableCell>
                </TableRow>
              );
            }):"No Data Found"}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MyPreviousLeaves;
