import { createAsyncThunk } from "@reduxjs/toolkit";
import managerTaskAssignmentApi from "../../../../api/managerApi/ManagerTaskAssignmentApi";

export const fetchHeaderThunk = createAsyncThunk(
  "manager/header",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTaskAssignmentApi.getHeader();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchTeamThunk = createAsyncThunk(
  "manager/team",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTaskAssignmentApi.getTeam();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchCurrentTasksThunk = createAsyncThunk(
  "manager/currentTasks",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await managerTaskAssignmentApi.getCurrentTasks(employeeId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  "manager/createTask",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await managerTaskAssignmentApi.createTask(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const completeTaskThunk = createAsyncThunk(
  "manager/completeTask",
  async ({ taskId, action }, { rejectWithValue }) => {
    try {
      await managerTaskAssignmentApi.completeTask(taskId, action);

      return { taskId, action };   // 👈 return what UI needs
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


export const fetchHistoryThunk = createAsyncThunk(
  "manager/history",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await managerTaskAssignmentApi.getHistory(employeeId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  "manager/updateTask",
  async ({ taskId, payload }, { rejectWithValue }) => {
    try {
      const res = await managerTaskAssignmentApi.updateTask(taskId, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "manager/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await managerTaskAssignmentApi.deleteTask(taskId);
      return taskId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
 