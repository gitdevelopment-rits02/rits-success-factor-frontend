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
  },

  
 MANAGER: {
    TIMESHEETAPPROVAL: "/manager/timesheetapproval",
    CLOCKMYTIME: "/manager/clockmytime",
    REQUESTTIMEOFF: "/manager/requesttimeoff",
    PROFILE: "/manager/profile",
    // MANAGEMYTEAM: "/manager/managemyteam",
    ORGCHART: "/manager/orgchart",
    GROWTHPORTFOLIO:"/manager/growthportfolio",
    FEEDBACK: "/manager/feedback",
    LEARNING: "/manager/learning",
    PAYSLIPS: "/manager/payslips",
    TEAMABSENCE: "/manager/teamabsence",
    MANAGEMYTEAM: "/manager/managemyteam",
    MANAGELEAVE: "/manager/manageleave",
    TIMESHEET:"/manager/timesheet"
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
    PROFILE: "/employee/profile",
    ORGCHART: "/employee/orgchart",
    GROWTHPORTFOLIO:"/employee/growthportfolio",
    FEEDBACK: "/employee/feedback",
    LEARNING: "/employee/learning",
    PAYSLIPS: "/employee/payslips",
    TIMESHEET:"/employee/timesheet"
},


 
};
