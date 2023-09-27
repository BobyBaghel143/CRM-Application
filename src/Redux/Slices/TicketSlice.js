import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  downloadedTickets: [],
  ticketList: [],
  ticketDistribution:{
    open: 0,
    inProgress: 0,
    resolved: 0,
    onHold: 0,
    cancelled: 0
  }
};


    // get all Tickets   (AsyncThunk)
export const getAllTicketsforTheUser = createAsyncThunk("tickets/getAllTicketsforTheUser", async () => {
  try {
    const response = axiosInstance.get("getMyAssignedTickets", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    toast.promise(response, {
      loading: "Fetching tickets belonging to you",
      success: "Succesfully loaded all the tickets",
      error: "Somthing went wrong",
    });
    return await response;
    
  } catch (error) {
    console.log("error :", error);
  }
});


    // Create ticket
export const createTicket = createAsyncThunk('tickets/createTicket', async (ticket) => {
  try {
    const response = axiosInstance.post(`ticket`,
      ticket,   // req body
      {
      headers: {
        "x-access-token": localStorage.getItem('token'),
      },
    });
    toast.promise(response, {
      loading: "Creating the ticket",
      success: "Succesfully created the ticket",
      error: "Somthing went wrong",
    });
    return await response;
    
  } catch (error) {
    console.log("error :", error);
  }
});
  

   // Update the tickets   (AsyncThunk)
export const updateTicket = createAsyncThunk('tickets/updateTicket', async (ticket) => {
  try {
    const response = axiosInstance.patch(`ticket/${ticket._id}`,
      ticket,   // req body
      {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    toast.promise(response, {
      loading: "Updating the ticket",
      success: "Succesfully updated the tickets",
      error: "Somthing went wrong",
    });
    return await response;
    
  } catch (error) {
    console.log("error :", error);
  }
});


   // tickets slice
const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    filterTickets: (state, action) => {
      console.log(action.payload);
      let status = action.payload.status.toLowerCase();
      if (status == "in progress") status = "inProgress";
      if (status == "on Hold") status = "onHold";
      state.ticketList = state.downloadedTickets.filter((ticket) => ticket.status === status);
    },
    resetTicketList: (state) => {
      state.ticketList = state.downloadedTickets;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTicketsforTheUser.fulfilled, (state, action) => {
      if (!action?.payload?.data) return;
      state.ticketList = action?.payload?.data?.result;
      state.downloadedTickets = action?.payload?.data?.result;
      const tickets = action?.payload?.data?.result;
      state.ticketDistribution = {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0,
      };
      tickets.forEach(ticket => {
        state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
      });
    })
       // creating the tickets
    .addCase(createTicket.fulfilled, (state, action) => {
      if (action?.payload?.data == undefined) return;  
      const newTicket = action.payload.data;
      state.downloadedTickets.push(newTicket);
      state.ticketList = state.downloadedTickets;    
      state.ticketDistribution = {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0,
      };
      state.downloadedTickets.forEach(ticket => {
        state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
      });
    })
        
      // updating the tickets 
    .addCase(updateTicket.fulfilled, (state, action) => {
      const updatedTicket = action.payload.data.result;
      state.ticketList = state.ticketList.map((ticket) => {
        if (ticket._id == updatedTicket._id) {
          return updatedTicket;
        }
        return ticket;
      });
      state.downloadedTickets = state.downloadedTickets.map((ticket) => {
        if (ticket._id == updatedTicket._id) {
          return updatedTicket;
        }
        return ticket;
      });
      state.ticketDistribution = {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0,
      };
      state.downloadedTickets.forEach(ticket => {
        state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
      });
    });
  },
});

export const { filterTickets, resetTicketList } = ticketSlice.actions;

export default ticketSlice.reducer;
