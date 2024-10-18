import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress
} from "@mui/material";
import { FaEdit, FaTrash, FaDollarSign } from "react-icons/fa";
import axios from "axios";
import UpdatedAddressForm from "./UpdatedAddressForm";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import TransactionsForm from "./TransactionsForm"; // Import the TransactionsForm
import { MdOutlineDelete } from "react-icons/md";

export default function AdminCustomizedTable({ submissionStatus, resetSubmissionStatus }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [updatesubmissionStatus, setSubmissionStatus] = useState("");

  const handleFormSuccess = () => {
    setSubmissionStatus("Form submitted successfully!");
    console.log("Form was submitted successfully");
  };

  
  React.useEffect(() => {
    console.log("in useEffect")
    if (updatesubmissionStatus) {
    console.log("in condition")

      fetchData();
    }
  }, [updatesubmissionStatus]);
  
  React.useEffect(() => {
    console.log("in useEffect")
    if (submissionStatus) {
    console.log("in condition")

      fetchData();
    }
  }, [submissionStatus]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchTransactions = async (projectId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/transaction/getTransactionByProjectId?projectId=${projectId}`);
      return response.data.response || [];
    } catch (error) {
      console.error(`Error fetching transactions for projectId: ${projectId}`, error);
      return [];
    }
  };
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

      const response = await axios.get(`${apiUrl}/api/project/getAllProjects`);
      if (response.data && response.data.response) {
        const rowsWithId = await Promise.all(
          response.data.response.map(async (row) => {
            const clientName = await fetchClientName(row.clientId);
            const userName = await fetchBDName(row.userId);
            const members = await fetchMembers(row.projectId);
            const memberNames = Array.isArray(members) ? members.map(member => member.name).join(', ') : '';
            const transactionsData = await fetchTransactions(row.projectId); // Fetch transactions for the project


            return {
              ...row,
              id: row.projectId || row.id,
              BusinessDeveloper: userName,
              clientName: clientName.clientName,
              clientUrl: clientName.clientUrl,
              clientLocation: clientName.clientLocation,
              clientEmail: clientName.clientEmail,
              clientSource: clientName.clientSource,
              clientPhoneNumber: clientName.clientPhoneNumber,
              transactions: transactionsData,

              memberNames,
              date: {
                contractDate: row.contractDate,
                deadline: row.deadline
              }
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
      setSubmissionStatus("")
    }
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete dialog
  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`${apiUrl}/api/project/deleteProject?projectId=${projectId}`);
      setOpenDeleteDialog(false); // Close the delete confirmation dialog
      setRows((prevRows) => prevRows.filter((row) => row.projectId !== projectId));
    } catch (error) {
      console.error(`Error: deleting project with projectId: ${projectId}`, error);
    }
  };


  const fetchClientName = async (clientId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/clients/getClientByClientId?clientId=${clientId}`);
      return response.data.response || "Unknown Client";
    } catch (error) {
      console.error(`Error fetching client name for clientId: ${clientId}`, error);
      return "Unknown Client";
    }
  };

  const fetchBDName = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/getUserById?userId=${userId}`);
      return response.data.response.name || "Unknown User";
    } catch (error) {
      console.error(`Error fetching user name for userId: ${userId}`, error);
      return "Unknown User";
    }
  };

  const fetchMembers = async (projectId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/members/getMembersByProjectId?projectId=${projectId}`);
      return response.data.response;
    } catch (error) {
      console.error(`Error fetching members for projectId: ${projectId}`, error);
      return "No Data";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TableContainer sx={{ marginBottom: '20px', border: '1px solid lightgray' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ebeced" }}>
              <TableCell sx={{ fontWeight: "bold", width: "5%" }}>Project Title</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Client Information</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Dates</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "8%" }}>Payment Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Pricing</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Transactions</TableCell> {/* New column for transactions */}
              <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Team Members</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "25%" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "5%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ backgroundColor: index % 2 === 0 ? "#F9FAFB" : "#ffffff" }}
                >
                  <TableCell>
                    <div>{row.title || "N/A"}</div>
                  </TableCell>
                  <TableCell>
                    <div><strong>Client Name:</strong> {row.clientName || "N/A"}</div>
                    {row.location && <div><strong>Project Location:</strong> {row.location || "N/A"}</div>}
                    {row.clientUrl && <div><strong>Client Url:</strong> {row.clientUrl || "N/A"}</div>}
                    {row.clientEmail && <div><strong>Client Email:</strong> {row.clientEmail || "N/A"}</div>}
                    {row.clientPhoneNumber && <div><strong>Client Phone Number:</strong> {row.clientPhoneNumber || "N/A"}</div>}
                    {row.clientSource && <div><strong>Client Source:</strong> {row.clientSource || "N/A"}</div>}
                    {row.clientLocation && <div><strong>Client Location:</strong> {row.clientLocation || "N/A"}</div>}
                  </TableCell>
                  <TableCell>
                    <div><strong>Contract Date:</strong> {new Date(row.date.contractDate).toLocaleDateString() || "N/A"}</div>
                    <div><strong>Deadline:</strong> {new Date(row.date.deadline).toLocaleDateString() || "N/A"}</div>
                  </TableCell>
                  <TableCell>
                    {row.paymentType === 'fixed' && <div className='border rounded-full bg-[#6941C6] border-[#6941C6] capitalize text-[#6941C6] bg-opacity-15 px-2 flex justify-center'>{row.paymentType || "N/A"}</div>}
                    {row.paymentType === 'hourly' && <div className='border rounded-full bg-[#04d91a] border-[#04d91a] capitalize text-[#04d91a] bg-opacity-15 px-2 flex justify-center'>{row.paymentType || "N/A"}</div>}
                  </TableCell>
                  
                  <TableCell>
                    {row.price && <div><strong>Total Price:</strong> ${row.price || "N/A"}</div>}
                    {row.hourlyRate && <div><strong>Hourly Rate:</strong> ${row.hourlyRate || "N/A"}</div>}
                    {row.estimatedHours && <div><strong>Est. Hours:</strong> {row.estimatedHours || "N/A"}</div>}
                    {row.estimatedHours && row.hourlyRate && <div><strong>Total Price:</strong> ${row.estimatedHours * row.hourlyRate || "N/A"}</div>}
                  </TableCell>
                  <TableCell>
        <div>
          {row.transactions ? (
            <>
            <div>
          <strong>Total Price:</strong> 

               ${row.transactions.totalPrice}
            </div>
            <div>
          <strong>Received Amount:</strong> 

               ${row.transactions.receivedAmount}
            </div> <div>
          <strong>Remaining amount:</strong> 

               ${row.transactions.remainingAmount}
            </div>
            </>
          ) : (
            <span>No Transaction Details</span>
          )}
        </div>
      </TableCell>
                  <TableCell>
                    <div><strong>Business Developer:</strong> {row.BusinessDeveloper}</div>
                    <div><strong>Development Team:</strong> {row.memberNames || "No team assigned yet"}</div>
                  </TableCell>
                  <TableCell>
                  {row.status === 'lead' && (
  <div className='border rounded-full bg-[#FFC107] border-[#FFC107] capitalize text-[#FFC107] bg-opacity-15 px-2 flex justify-center'>
    {"Lead" || "N/A"}
  </div>
)}
{row.status === 'notsecured' && (
  <div className='border rounded-full bg-[#FF5722] border-[#FF5722] capitalize text-[#FF5722] bg-opacity-15 px-2 flex justify-center'>
    {"Not Secured" || "N/A"}
  </div>
)}
{row.status === 'ongoingproject' && (
  <div className='border rounded-full bg-[#04d91a] border-[#04d91a] capitalize text-[#04d91a] bg-opacity-15 px-2 flex justify-center'>
    {"Ongoing Project" || "N/A"}
  </div>
)}
{row.status === 'projectcancelled' && (
  <div className='border rounded-full bg-[#FF0000] border-[#FF0000] capitalize text-[#FF0000] bg-opacity-15 px-2 flex justify-center'>
    {"Project Cancelled" || "N/A"}
  </div>
)}
{row.status === 'successfullycompleted' && (
  <div className='border rounded-full bg-[#6941C6] border-[#6941C6] capitalize text-[#6941C6] bg-opacity-15 px-2 flex justify-center'>
    <div className='flex justify-center'>
    {"Completed" || "N/A"}
    </div>
  </div>
)}
{row.status === 'maintenance' && (
  <div className='border rounded-full bg-[#2196F3] border-[#2196F3] capitalize text-[#2196F3] bg-opacity-15 px-2 flex justify-center'>
    {"Maintenance" || "N/A"}
  </div>
)}

                  </TableCell>
                  <TableCell>
                    <div className='flex gap-1 items-center'>
                    <FaEdit onClick={() => { setOpen(true); setProjectId(row.projectId); }} style={{ cursor: "pointer" }} />
                    <FaDollarSign  onClick={() => {
                        setProjectId(row.projectId);
                        setOpenTransactionModal(true);
                      }} style={{ cursor: "pointer" , color:"#04d91a"}} />
                    <MdOutlineDelete onClick={() => { setOpenDeleteDialog(true); setProjectId(row.projectId); }} style={{ cursor: "pointer", color: "red" }} fontSize='15px' />
                  
                      </div>
                   
                  </TableCell>
                </TableRow>

              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
       {/* Confirmation Dialog */}
       <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this project? This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteProject(projectId)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <UpdatedAddressForm open={open} onClose={() => setOpen(false)} projectId={projectId}         onSuccess={handleFormSuccess}
 />
      <TransactionsForm projectId={projectId} open={openTransactionModal} onClose={() => setOpenTransactionModal(false)}  onSuccess={handleFormSuccess}/>

    </>
  );
}
