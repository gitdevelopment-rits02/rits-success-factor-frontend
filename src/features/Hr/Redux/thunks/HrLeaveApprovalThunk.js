import { createAsyncThunk } from "@reduxjs/toolkit";
import hrLeaveApi from "../../../../api/hrApi/HrLeaveApprovalApi";

const formatLeave = (item = {}) => {

  const normalizeStatus = (status = "") => {
    const s = status.toLowerCase();
    if (s === "approved") return "Approved";
    if (s === "rejected") return "Rejected";
    if (s === "pending") return "Pending";
    return "Pending";
  };

  return {
    _id: item._id || item.id || "",

    employee: {
      name:
        item.employee?.employeeName ||
        item.employeeName ||
        "Unknown",

      employeeId:
        item.employee?.employeeNo ||
        item.employeeNo ||
        "-",
    },

    startDate: item.startDate || item.date || "",
    endDate: item.endDate || item.date || "",
    type: item.leaveType?.replace(" Leave", "") || "",
    // reason: item.reason || "",
    reason:
      item.reason ||
      item.attendanceStatus ||
      item.status ||
      "Working",

    approvalStatus: normalizeStatus(
      item.approvalStatus || item.status
    ),

    rejectionReason: item.rejectionReason || "",
  };
};

// GET All Leaves
export const fetchHrLeaves = createAsyncThunk(
  "hrLeaveApproval/fetchLeaves",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await hrLeaveApi.getAllLeaves(params);
      const leaves = res.data?.data || [];
      console.log("FIRST OBJECT:", leaves[0]);
      return leaves.map(formatLeave);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET Out Today
export const fetchOutToday = createAsyncThunk(
  "hrLeaveApproval/fetchOutToday",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await hrLeaveApi.getOutToday(params);
      const leaves = res.data?.data || [];
      return leaves.map(formatLeave);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET Summary
export const fetchHrSummary = createAsyncThunk(
  "hrLeaveApproval/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await hrLeaveApi.getSummary();

      const raw = res.data?.data || [];
      const leaves = raw.map(formatLeave);

      const today = new Date().toISOString().split("T")[0];

      return {
        pending: leaves.filter(l => l.approvalStatus === "Pending").length,
        approved: leaves.filter(l => l.approvalStatus === "Approved").length,
        rejected: leaves.filter(l => l.approvalStatus === "Rejected").length,
        outToday: leaves.filter(l => l.startDate === today).length,
      };

    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update leave status (Approve / Reject / Pending)
export const updateLeaveStatus = createAsyncThunk(
  "hrLeaveApproval/updateStatus",
  async ({ leaveId, payload }, { rejectWithValue }) => {
    try {
      let res;
      if (payload.status === "Approved") {
        res = await hrLeaveApi.approveLeave(leaveId);
      }
      else if (payload.status === "Rejected") {
        if (!payload.rejectionReason) {
          throw new Error("Rejection reason missing");
        }

        res = await hrLeaveApi.rejectLeave(
          leaveId,
          payload.rejectionReason
        );
      }
      else if (payload.status === "Pending") {
        res = await hrLeaveApi.pendingLeave(leaveId);
      }

      const item = res.data?.data;
      if (!item) return null;

      return formatLeave(item);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);