import { createAsyncThunk } from "@reduxjs/toolkit";
import hrOnboardingApi from "../../../../api/hrApi/HrOnboardingApi";

// const normalizeEmployee = (emp = {}) => ({
//     ...emp,
//     name: emp.employeeName || "",
//     email: emp.officialEmail || "",
//     employeeNo: emp.employeeNo || "",
//     phone: emp.phoneNumber || "",
//     status: emp.status || "inactive",
//     department: emp.workDetails?.department || "",
//     designation: emp.workDetails?.designation || "",
//     joiningDate: emp.workDetails?.dateOfJoining || "",
//     created: emp.createdAt || "",
// });

const normalizeEmployee = (emp = {}) => ({
    _id: emp._id,

    employeeName: emp.employeeName ?? "",
    officialEmail: emp.officialEmail ?? "",
    employeeNo: emp.employeeNo ?? "",
    phoneNumber: emp.phoneNumber ?? "",
    status: emp.status ?? "inactive",

    workDetails: {
        department: emp.workDetails?.department ?? "",
        designation: emp.workDetails?.designation ?? "",
        dateOfJoining: emp.workDetails?.dateOfJoining ?? "",
        workType: emp.workDetails?.workType ?? "",
    },

    personalDetails: {
        bloodGroup: emp.personalDetails?.bloodGroup ?? "",
        city: emp.personalDetails?.city ?? "",
        pincode: emp.personalDetails?.pincode ?? "",
    },

    salary: emp.salary ?? {
        annualCTC: 0,
        components: [],
    },

    assets: emp.assets ?? [],
    documents: emp.documents ?? [],
    qualifications: emp.qualifications ?? [],
    leaves: emp.leaves ?? {},

    createdAt: emp.createdAt ?? null,
});

const hrOnboardingThunk = {
    // GET ALL EMPLOYEES
    getEmployeesThunk: createAsyncThunk(
        "hrOnboarding/getEmployees",
        async (params, { rejectWithValue }) => {
            try {
                const response = await hrOnboardingApi.getEmployees(params);
                // Based on sample: { success: true, employees: [], pagination: {} }
                return {
                    employees: (response.data.employees || []).map(normalizeEmployee),
                    pagination: response.data.pagination || {},
                };
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch employees"
                );
            }
        }
    ),

    // GET EMPLOYEE BY ID
    getEmployeeByIdThunk: createAsyncThunk(
        "hrOnboarding/getEmployeeById",
        async (id, { rejectWithValue }) => {
            try {
                const response = await hrOnboardingApi.getEmployeeById(id);
                // Sample: { success: true, data: {} }
                return normalizeEmployee(response.data.data);
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch employee details"
                );
            }
        }
    ),

    // ADD EMPLOYEE
    addEmployeeThunk: createAsyncThunk(
        "hrOnboarding/addEmployee",
        async (data, { rejectWithValue }) => {
            try {
                const response = await hrOnboardingApi.addEmployee(data);
                return normalizeEmployee(response.data.data);
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to add employee"
                );
            }
        }
    ),

    // UPDATE EMPLOYEE
    updateEmployeeThunk: createAsyncThunk(
        "hrOnboarding/updateEmployee",
        async ({ id, data }, { rejectWithValue }) => {
            try {
                const response = await hrOnboardingApi.updateEmployee(id, data);
                // return response.data.data;
                return normalizeEmployee(response.data.data);
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to update employee"
                );
            }
        }
    ),

    // DELETE EMPLOYEE
    deleteEmployeeThunk: createAsyncThunk(
        "hrOnboarding/deleteEmployee",
        async (id, { rejectWithValue }) => {
            try {
                await hrOnboardingApi.deleteEmployee(id);
                return id;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to delete employee"
                );
            }
        }
    ),

    // DASHBOARD CARDS
    getDashboardCardsThunk: createAsyncThunk(
        "hrOnboarding/getDashboardCards",
        async (_, { rejectWithValue }) => {
            try {
                const response = await hrOnboardingApi.getDashboardCards();
                return response.data.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch dashboard cards"
                );
            }
        }
    ),
};

export default hrOnboardingThunk;
