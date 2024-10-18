import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { columns } from "../internals/data/AdminGridData";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaEdit, FaSave } from "react-icons/fa";
import ModalAdminAddressForm from "./ModalAdminAddressForm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function AdminCustomizedDataGrid({ submissionStatus, resetSubmissionStatus }) {

  const [open,setOpen] = React.useState(false);
  
  const renderCell = (params) => {

    // Manually set "Business Developer" for all rows in the role column
    const cellValue = params.value ||  <span style={{ color: "lightgray" }}>Not Provided</span>;

    if (params.field === "date") {
      return cellValue;
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
  
    return cellValue;
  };
  const modifiedColumns = [
    ...columns,
  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "left",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            height: "100%",
          }}
        >
          <span>{params.value}</span>
          {
          // editRowId === params.row.id ? (
            
          //   <FaSave
          //     fontSize={"15px"}
          //     style={{
          //       marginLeft: 8,
          //       cursor: "pointer",
          //       color: "#04d91a",
          //       selfAlign: "right",
          //     }}
          //     onClick={() => handleSave(params.row)}
          //     aria-label="Save changes"
          //   />
          // ) :
           
          (
            <FaEdit
              fontSize={"15px"}
              style={{
                marginLeft: 8,
                cursor: "pointer",
                color: "#6941C6",
                selfAlign: "right",
              }}
              onClick={() => setOpen(true)}
              aria-label="Edit row"
            />
          )}
        </div>
      ),
    },
  ];
  

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editRowId, setEditRowId] = React.useState(null);
  const [originalRowData, setOriginalRowData] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [pendingRowData, setPendingRowData] = React.useState(null);

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
     
      const response = await axios.get(
        `${apiUrl}/api/clients/getAllClients`
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.response) {
        const rowsWithId = response.data.response.map((row) => ({
          ...row,
          id: row.clientId || row.id,

        }));

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
    <div style={{ height: 400, width: "100%" }}>
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

        // Remove or set checkboxSelection to false to disable row selection checkboxes
      />

      {/* Confirmation Dialog */}
      {/* <Dialog
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
      </Dialog> */}

<Dialog open={open} 
        // onClose={handleClose}
        >
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
        <ModalAdminAddressForm />
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={()=> setOpen(false)} 
          color="">
            Cancel
          </Button>
          <Button
          
          //  onClick={handleAddClient} 
           color="" 
          //  disabled={loading}
           >
            {/* {loading ? <CircularProgress size={20} /> : "Add Client"} */}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
