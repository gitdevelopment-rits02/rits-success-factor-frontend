import { combineReducers } from "@reduxjs/toolkit";

import hrClockMyTimeReducer from "./slices/HrClockMyTimeSlice";
import hrDashboardReducer from "./slices/HrDashboardSlice";
import hrInsuranceReducer from "./slices/HrInsuranceSlice";
import hrLeaveApprovalReducer from "./slices/HrLeaveApprovalSlice";
import hrNotificationReducer from "./slices/HrNotificationSlice";
import hrOffBoardingReducer from "./slices/HrOffBoardingSlice";
import hrOnboardingReducer from "./slices/HrOnboardingSlice";
import hrOrgChartReducer from "./slices/HrOrgChartSlice";
import hrPayslipsReducer from "./slices/HrPayslipsSlice";
import hrPolicyAndInsuranceCreationReducer from "./slices/HrPolicyAndInsuranceCreationSlice";
import hrPolicyDocumentsReducer from "./slices/HrPolicyDocumentsSlice";
import hrRequestTimeOffReducer from "./slices/HrRequestTimeOffSlice";
import hrSalaryCreationReducer from "./slices/HrSalaryCreationSlice";
import hrTimeSheetReducer from "./slices/HrTimeSheetSlice";
import hrViewMyProfileReducer from "./slices/HrViewMyProfileSlice";
import hrAnnouncementsReducer from "./slices/HrAnnouncementsSlice";
import hrCalenderReducer from "./slices/HrCalenderSlice";
import hrSalStatusReducer from "./slices/HrSalStatusSlice";
import hrOurOrganizationReducer from "./slices/HrOurOrganizationSlice";

const hrRootReducer = combineReducers({
    clockMyTime: hrClockMyTimeReducer,
    dashboard: hrDashboardReducer,
    insurance: hrInsuranceReducer,
    leaveApproval: hrLeaveApprovalReducer,
    notification: hrNotificationReducer,
    offBoarding: hrOffBoardingReducer,
    onboarding: hrOnboardingReducer,
    orgChart: hrOrgChartReducer,
    payslips: hrPayslipsReducer,
    policyAndInsuranceCreation: hrPolicyAndInsuranceCreationReducer,
    policyDocuments: hrPolicyDocumentsReducer,
    requestTimeOff: hrRequestTimeOffReducer,
    salaryCreation: hrSalaryCreationReducer,
    timesheet: hrTimeSheetReducer,
    viewMyProfile: hrViewMyProfileReducer,
    announcements: hrAnnouncementsReducer,
    calender: hrCalenderReducer,
    salStatus: hrSalStatusReducer,
    ourOrganization: hrOurOrganizationReducer,
});

export default hrRootReducer;
