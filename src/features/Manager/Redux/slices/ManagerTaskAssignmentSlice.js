import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHeaderThunk,
  fetchTeamThunk,
  fetchCurrentTasksThunk,
  fetchHistoryThunk,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
  completeTaskThunk,
} from "../thunks/ManagerTaskAssignmentThunk";

const initialState = {
  header: {},
  team: [],
  currentTasks: [],
  history: [],
  loading: false,
  error: null,
};

const managerTaskAssignmentSlice = createSlice({
  name: "managerTaskAssignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeaderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.header = action.payload;
      })

      .addCase(fetchTeamThunk.fulfilled, (state, action) => {
        state.team = action.payload;
      })

      .addCase(fetchCurrentTasksThunk.fulfilled, (state, action) => {
        state.currentTasks = action.payload;
      })

      .addCase(fetchHistoryThunk.fulfilled, (state, action) => {
        state.history = action.payload;
      })

      .addCase(createTaskThunk.fulfilled, (state, action) => {
  state.currentTasks.push(action.payload);
})

.addCase(updateTaskThunk.fulfilled, (state, action) => {
  const index = state.currentTasks.findIndex(
    (t) => t._id === action.payload._id
  );
  if (index !== -1) {
    state.currentTasks[index] = action.payload;
  }
})

.addCase(deleteTaskThunk.fulfilled, (state, action) => {
  state.currentTasks = state.currentTasks.filter(
    (t) => t._id !== action.payload
  );
})

.addCase(completeTaskThunk.fulfilled, (state, action) => {
  const { taskId, action: type } = action.payload;

  const taskIndex = state.currentTasks.findIndex(
    (t) => t._id === taskId
  );

  if (taskIndex !== -1) {
    const task = state.currentTasks[taskIndex];

    state.currentTasks.splice(taskIndex, 1);

    if (type === "store") {
      state.history.unshift(task);
    }
  }
})


      .addCase(fetchHeaderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerTaskAssignmentSlice.reducer;
 