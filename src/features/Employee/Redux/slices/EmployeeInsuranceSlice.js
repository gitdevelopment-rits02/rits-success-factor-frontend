import { createSlice } from "@reduxjs/toolkit";
import employeeInsuranceThunk from "../thunks/EmployeeInsuranceThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeInsuranceSlice = createSlice({
  name: "employeeInsurance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeInsuranceSlice.reducer;
