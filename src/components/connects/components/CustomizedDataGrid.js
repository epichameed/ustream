import * as React from "react";
import axios from "axios";
import { columns } from "../internals/data/gridData";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa"; // Import FaTrash for delete icon
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import UpdateAddressForm from './UpdateAddressForm';

export default function CustomizedTable({ submissionStatus }) {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editRowId, setEditRowId] = React.useState(null);
  const [originalRowData, setOriginalRowData] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [pendingRowData, setPendingRowData] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false); // New state for delete dialog
  const [selectedConnectsID, setSelectedConnectsID] = React.useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [updatesubmissionStatus, setSubmissionStatus] = useState("");

  const handleFormSuccess = () => {
    setSubmissionStatus("Form submitted successfully!");
    console.log("Form was submitted successfully");
  };

  React.useEffect(() => {
    if (submissionStatus) {
      fetchData();
    }
  }, [submissionStatus]);
  
  React.useEffect(() => {
    console.log("in useEffect")
    if (updatesubmissionStatus) {
    console.log("in condition")

      fetchData();
    }
  }, [updatesubmissionStatus]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;

      const response = await axios.get(`${apiUrl}/api/connects/getAllConnects`);

      if (response.data && response.data.response) {
        const rowsWithId = response.data.response.map((row) => ({
          ...row,
          id: row.connectsID || row.id,
        }));

        setRows(rowsWithId);
      } else {
        console.warn("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    setSubmissionStatus("")

    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSave = (rowData) => {
    const isChanged = Object.keys(rowData).some(
      (key) => rowData[key] !== originalRowData[key]
    );

    if (isChanged) {
      setPendingRowData(rowData);
      setOpenConfirmDialog(true);
    } else {
      console.log("No changes made.");
      setEditRowId(null); // Exit edit mode and revert back to table display
    }
  };

  const updateRowData = async (rowData) => {
    try {
      const { id, createdAt, updatedAt, deletedAt, ...dataToUpdate } = rowData;

      const response = await axios.put(
        `${apiUrl}/api/updateReport`,
        dataToUpdate
      );
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleConfirmSave = async () => {
    try {
      setOpenConfirmDialog(false);
      await updateRowData(pendingRowData);
      await fetchData(); // Refetch the reports after the update
      setEditRowId(null);
      setPendingRowData(null);
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelSave = () => {
    setOpenConfirmDialog(false);
    setEditRowId(null);
  };

  const handleInputChange = (event, rowId, field) => {
    const newValue = Number(event.target.value);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: newValue } : row
      )
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // hour12: true,
    });
  };

  const handleEdit = (rowData) => {
    setSelectedConnectsID(rowData.connectsID); // Save the connectsID
    setOpenUpdateAddressForm(true); // Open the UpdateAddressForm modal
  };

  const handleDelete = (connectsID) => {
    setSelectedConnectsID(connectsID);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  };
  const [openUpdateAddressForm, setOpenUpdateAddressForm] = React.useState(false);
  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/connects/deleteConnect?connectsID=${selectedConnectsID}`);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setOpenDeleteDialog(false);
      fetchData(); // Refetch data after deletion
    }
  };

  return (
    <>
      <TableContainer sx={{ marginBottom: '20px', border: '1px solid lightgray' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ebeced" }}>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? "#F9FAFB" : "#ffffff" }}>
                  {columns.map((column) => (
                    <TableCell key={column.field} className='capitalize'>
                      {editRowId === row.id ? (
                        <input
                          type="number"
                          value={row[column.field]}
                          onChange={(event) => handleInputChange(event, row.id, column.field)}
                          style={{ width: "100%" }}
                          className="px-2 rounded-lg"
                          aria-label={`Edit ${column.field}`}
                        />
                      ) : column.field === "date" ? (
                        formatDateTime(row[column.field])
                      ) : column.field === "cost" ? (
                        `$${row[column.field]}`
                      ) : column.field === "sourceOfPayment" ? (
                        row[column.field] === "upwork" ? (
                          <div className='border rounded-full bg-[#04d91a] border-[#04d91a] capitalize text-[#04d91a] bg-opacity-15 px-6 flex justify-center !inline-block'>
                            {row[column.field]}
                          </div>
                        ) : row[column.field] === "card" ? (
                          <div className='border rounded-full bg-[#6941C6] border-[#6941C6] capitalize text-[#6941C6] bg-opacity-15 px-6 flex justify-center !inline-block'>
                            {row[column.field]}
                          </div>
                        ) : (
                          row[column.field]
                        )
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className='flex gap-2'>
                    <FaEdit
                      fontSize={"15px"}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(row)}
                      aria-label="Edit row"
                    />
                    <MdOutlineDelete
                      fontSize={"18px"}
                      style={{ cursor: "pointer", color: "red",  }}
                      onClick={() => handleDelete(row.connectsID)}
                      aria-label="Delete row"
                    />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* UpdateAddressForm */}
      <UpdateAddressForm 
        open={openUpdateAddressForm} 
        onClose={() => setOpenUpdateAddressForm(false)} 
        connectsId={selectedConnectsID} 
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this entry? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
