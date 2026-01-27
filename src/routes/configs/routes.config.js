export const ROUTES = {
  LANDING: '/',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOTPASSWORD: '/forgotpassword',
    RESET: '/reset',
    OTP: '/otpvalidation',
    PRIVACYPOLICY: '/privacypolicy',
    CONTACTUS: '/contactus',
    ABOUT:"/aboutus",
    DUMMY:"/dummy",
  },

  SUPERADMIN: {
     TIMESHEETAPPROVAL: "/superadmin/timesheetapproval",//correct
    REQUESTTIMEOFF: '/superadmin/requesttimeoff',//correct
    PROFILE: '/superadmin/profile',//profile
    MANAGEMYTEAM: '/superadmin/managemyteam',//manage my team
    ORGCHART: '/superadmin/orgchart',//org chart
    GROWTHPORTFOLIO: '/superadmin/growthportfolio',//corrct
    MANAGELEAVE: '/superadmin/manageleave',//correct
    PERSONALTIMESHEET: '/superadmin/personaltimesheet',//correct
    DASHBOARD:'/superadmin/dashboard',
    ADMINCREATION:'/superadmin/admincreation',
    ADMINMANAGEMENT:'/superadmin/adminmanagement',
    ORG:'/superadmin/org',
    POLICIES:'/superadmin/policies',
    PAYROLL:'/superadmin/payroll',
    APPROVALFLOW:'/superadmin/approvalflow',
    FEEDBACK:'/superadmin/feedback',

  },

  
 MANAGER: {
    CLOCKMYTIME: "/manager/clockmytime",//(not w)
    REQUESTTIMEOFF: "/manager/requesttimeoff",
    PROFILE: "/manager/profile",
    // MANAGEMYTEAM: "/manager/managemyteam",
    ORGCHART: "/manager/orgchart",
  
    FEEDBACK: "/manager/feedback",
    LEARNING: "/manager/learning",
    PAYSLIPS: "/manager/payslips",
    MANAGELEAVE: "/manager/manageleave",
    TIMESHEET:"/manager/timesheet",
    DASHBOARD:"/manager/dashboard",
    NOTIFICATION:"/manager/notification",
    TIMESHEETREVIEW:"/manager/timesheetreview",
    TASKANDPROJECT:"/manager/taskandproject",
    PERFORMANCEMANAGEMENT:"/manager/performancereview",
    POLICIES:"/manager/policies",
    INSURANCE:"/manager/insurance",
    LEAVEAPPROVAL:"/manager/leaveapproval",

},



HR: {
    TIMESHEETAPPROVAL: "/hr/timesheetapproval",
    CLOCKMYTIME: "/hr/clockmytime",
    REQUESTTIMEOFF: "/hr/requesttimeoff",
    PROFILE: "/hr/profile",
    ORGCHART: "/hr/orgchart",
    GROWTHPORTFOLIO:"/hr/growthportfolio",
    FEEDBACK: "/hr/feedback",
    LEARNING: "/hr/learning",
    PAYSLIPS: "/hr/payslips",
    TEAMABSENCE: "/hr/teamabsence",
    MANAGEMYTEAM: "/hr/managemyteam",
    MANAGELEAVE: "/hr/manageleave",
    TIMESHEET:"/hr/timesheet"
},

EMPLOYEE: {
    CLOCKMYTIME: "/employee/clockmytime",
    REQUESTTIMEOFF: "/employee/requesttimeoff",
    VIEWMYPROFILE: "/employee/profile",
    ORGCHART: "/employee/orgchart",
    GROWTHPORTFOLIO:"/employee/growthportfolio",
    INSURANCE: "/employee/insurance",
    LEARNING: "/employee/learning",
    PAYSLIPS: "/employee/payslips",
    TIMESHEET:"/employee/timesheet",
    DASHBOARD:"/employee/dashboard",
    NOTIFICATION:"/employee/notification",
    POLICYDOCUMENTS:"/employee/policydocuments"


},


 
};

