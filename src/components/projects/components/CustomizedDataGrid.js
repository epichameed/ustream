import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { columns } from "../internals/data/gridData";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaEdit, FaSave } from "react-icons/fa";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function CustomizedDataGrid({ submissionStatus, resetSubmissionStatus }) {
  
  const renderCell = (params) => {
    if (params.field === "date" && params.value) {
      const { contractDate, deadline } = params.value;
      const formattedContractDate = contractDate ? new Date(contractDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) : "N/A";
      const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) : "N/A";
  
      return (
        <div style={{flexDirection: "column" }}>
          <div>
            <strong>Contract Date:</strong> {formattedContractDate || "N/A"}
          </div>
          <div>
            <strong>Deadline:</strong> {formattedDeadline || "N/A"}
          </div>
        </div>
      );
    }
    // Manually set "Business Developer" for all rows in the role column
    if (params.field === "role") {
      const isBusinessDeveloper = params.value === "Business Developer";
      
      return (
        <div
        style={{
          display: "flex", // Makes the container flexible
          alignItems: "center", // Vertically centers the capsule within the cell
          // justifyContent: "center", // Horizontally centers the capsule
          height: "100%", // Ensures the parent div takes the full height of the cell
          width: "100%", // Ensures the parent div takes the full width of the cell
          padding: '3px',
          boxSizing: "border-box",

        }}
      >
        <div
          style={{
            backgroundColor: isBusinessDeveloper ? "rgba(4, 217, 26, 0.1)" : "#f0f0f0", // Capsule background
            color: isBusinessDeveloper ? "rgba(4, 217, 26)" : "rgba(4, 217, 26, 0.5)", // Text color
            padding: "4px 12px", // Padding inside the capsule
            borderRadius: "20px", // Rounded corners for capsule shape
            fontSize: "12px", // Small text size for the capsule
            display: "inline-block", // Prevents the capsule from taking full cell size
            whiteSpace: "nowrap", // Prevents the text from wrapping
            // height:'80%',
            display:'flex',
            alignItems:'center',
            border:'1px solid rgba(4, 217, 26)'
          }}
        >
          <p>
          {params.value}

          </p>
        </div>
      </div>
      );
    }

    if (params.field === "pricing" && params.row.paymentType) {
      if (params.row.paymentType === "fixed") {
        return (
          <div>
            <strong>Total Price:</strong> ${params.row.price || "N/A"}
          </div>
        );
      } else if (params.row.paymentType === "hourly") {
        return (
          <div style={{ flexDirection: "column" }}>
            <div>
              <strong>Hourly Rate:</strong> ${params.row.hourlyRate || "N/A"}
            </div>
            <div>
              <strong>Est. Hours:</strong> {params.row.estimatedHours || "N/A"}
            </div>
          </div>
        );
      }
    }
  
    if (editRowId === params.row.id) {
      return (
        <input
          type="number"
          value={params.value}
          onChange={(event) =>
            handleInputChange(event, params.row.id, params.field)
          }
          style={{ width: "100%" }}
          className="px-2 rounded-lg"
          aria-label={`Edit ${params.field}`}
        />
      );
    }
    
  
    return params.value;
  };
  const modifiedColumns = [
    // First, find and add the title column from gridData.tsx
    columns.find((col) => col.field === "title"), // Adjust this according to your title field name
  
    // Now add clientName column
    {
      field: "clientName", // Define the clientName column
      headerName: "Client Name",
      width: 200,
      renderCell, // Optionally, use renderCell for custom styling
    },
  
    // Find and add the location column
    columns.find((col) => col.field === "location"), // Adjust this according to your location field name
  
    // Now add dates column
    columns.find((col) => col.field === "date"), // Adjust this according to your date field name
    
    // Add paymentType column
    columns.find((col) => col.field === "paymentType"), // Adjust this according to your payment type field name
    
    // Add pricing column
    columns.find((col) => col.field === "pricing"), // Adjust this according to your pricing field name
    
    // Lastly, add the role column
    {
      field: "role", // Define the role column
      headerName: "Role",
      width: 200,
      renderCell, // Use the custom renderCell for styling
    },
  ];
  

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editRowId, setEditRowId] = React.useState(null);
  const [originalRowData, setOriginalRowData] = React.useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [pendingRowData, setPendingRowData] = React.useState(null);
  const fetchClientName = async (clientId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/clients/getClientByClientId?clientId=${clientId}`);
      console.log("Result", response)
      return response.data.response.clientName || "Unknown Client";
    } catch (error) {
      console.error(`Error fetching client name for clientId: ${clientId}`, error);
      return "Unknown Client";
    }
  };
  
  React.useEffect(() => {
    console.log("submissionStatus", submissionStatus)
    if (submissionStatus) {
      fetchData();
      resetSubmissionStatus();
    }
  }, [submissionStatus]);
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

    const response = await axios.get(
      `${apiUrl}/api/project/getProjectsByUserId?userId=${userId}`
    );

    console.log("API Response:", response.data);

    if (response.data && response.data.response) {
      const rowsWithId = await Promise.all(
        response.data.response.map(async (row) => {
          const clientName = await fetchClientName(row.clientId);  // Fetch the client name by clientId
          
          return {
            ...row,
            id: row.projectId || row.id,
            role: "Business Developer", // Manually set the role to "Business Developer"
            clientName,  // Add the client name to the row
            date: { 
              contractDate: row.contractDate, 
              deadline: row.deadline 
            } // Combine the contractDate and deadline into the date field
          };
        })
      );

      setRows(rowsWithId);
    } else {
      console.warn("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};


  React.useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (rowData) => {
    setOriginalRowData({ ...rowData });
    setEditRowId(rowData.id);
  };

  const handleSave = (rowData) => {
    const isChanged = Object.keys(rowData).some(
      (key) => rowData[key] !== originalRowData[key]
    );

    if (isChanged) {
      setPendingRowData(rowData);
      setOpenConfirmDialog(true);
    } else {
      // No changes were made, so exit the edit mode
      console.log("No changes made.");
      setEditRowId(null); // Exit edit mode and revert back to table display
    }
  };

  const updateRowData = async (rowData) => {
    try {
      // Create a copy of rowData without the 'id' field
      const { id, createdAt, updatedAt, deletedAt, ...dataToUpdate } = rowData; // Destructuring to remove the 'id'

      const response = await axios.put(
        `${apiUrl}/api/updateReport`,
        dataToUpdate
      );
      console.log("Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleConfirmSave = async () => {
    console.log("Updated values:", pendingRowData);
    try {
      setOpenConfirmDialog(false);

      await updateRowData(pendingRowData);
      await fetchData(); // Refetch the reports after the update
      setEditRowId(null);
      setPendingRowData(null);
    } catch (error) {
      setOpenConfirmDialog(false);

      console.error("Failed to save changes:", error);
      // Handle error state as needed (e.g., show a notification)
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

 
  
  const getColumnDefinitions = () => {
    return modifiedColumns.map((column) => ({
      ...column,
      renderCell:
        column.field === "action"
          ? modifiedColumns.find((col) => col.field === "action").renderCell
          : renderCell,
    }));
  };

  return (
    <div style={{  width: "100%" }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={getColumnDefinitions()}
        loading={loading}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        checkboxSelection={false} // Explicitly disable row selection checkboxes
        disableColumnMenu={true} // Disable column header menu (sorting, filtering, etc.)
        sortingOrder={[]} // Disable sorting icons for all columns
        getRowHeight={() => 'auto'} // Set row height to auto for content-based height


        // Remove or set checkboxSelection to false to disable row selection checkboxes
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelSave}
        aria-labelledby="confirm-update-dialog-title"
        aria-describedby="confirm-update-dialog-description"
      >
        <DialogTitle id="confirm-update-dialog-title">
          Confirm Update
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-update-dialog-description">
            Are you sure you want to update the values?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSave} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
