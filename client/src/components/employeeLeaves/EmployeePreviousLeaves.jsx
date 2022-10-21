import * as React from "react";
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,ExpandMoreIcon}  from "../../utlis/materialUIComponents";


import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const columns = [
    { id: "count", label: "#", minWidth: 20, align: "left" },
    { id: "name", label: "Name", minWidth: 120, align: "left" },
    { id: "reason", label: "Reason", minWidth: 20, align: "left" },
    {
      id: "fromDate",
      label: "From",
      minWidth: 40,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "toDate",
      label: "To",
      minWidth: 40,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "days",
      label: "Days",
      minWidth: 20,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
        id: "unpaid",
        label: "Unpaid Leaves",
        minWidth: 20,
        align: "left",
        format: (value) => value.toFixed(2),
      },
      {
        id: "approved",
        label: "Approves",
        minWidth: 50,
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

const EmployeePreviousLeaves = ({data}) => {
    return (
        <Paper sx={{ width: "95%", overflow: "hidden" }}>
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
                {data.leaveRequests&&data.leaveRequests.map((val, ind) => { 
                  return (
                    <TableRow>
                      <TableCell id="count" label="#" sx={{ minWidth: 80 }}>
                         {ind + 1} 
                      </TableCell>
                      <TableCell id="name" label="Name" sx={{ minWidth: 170 }}>
                         {data.name} 
                      </TableCell>
                      <TableCell
                        id="reason"
                        label="From"
                        sx={{ minWidth: 80, textAlign: "left" }}
                      >
                        <div>
                          <CustomWidthTooltip 
                          title={val.reason}
                        >
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
                        id="Total"
                        label="Total Days"
                        sx={{ minWidth: 80, textAlign: "left" }}
                      >
                        {val.totalDays}
                      </TableCell>
                      <TableCell
                        id="Unpaid"
                        label="unpaid"
                        sx={{ minWidth: 80, textAlign: "left" }}
                      >
                        {val.unpaid}
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
                 })} 
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
    };

export default EmployeePreviousLeaves