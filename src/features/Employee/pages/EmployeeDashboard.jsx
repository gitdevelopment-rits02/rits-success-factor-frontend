import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import employeeDashboardThunk from "../Redux/thunks/EmployeeDashboardThunk";
import EmployeeDashboardSkeleton from "./EmployeeDashboardSkeleton";
import { toast } from "react-toastify";
import {
  LuCalendar as Calendar,
  LuClock as Clock,
  LuMapPin as MapPin,
  LuCircleCheck as CheckCircle,
  LuCircleX as XCircle,
  LuLogOut as LogOut,
  LuHouse as Home,
  LuUser as User,
  LuUsers as Users,
  LuFileText as FileText,
  LuMessageSquare as MessageSquare,
  LuAward as Award,
  LuSearch as Search,
  LuChevronRight as ChevronRight,
  LuChevronLeft as ChevronLeft,
  LuBell as Bell,
  LuBookOpen as BookOpen,
  LuDollarSign as DollarSign,
  LuFileCheck as FileCheck,
  LuBuilding as Building,
  LuCake as Cake,
  LuPartyPopper as PartyPopper,
  LuFileDown as FileDown,
  LuIdCard as IdCard,
} from "react-icons/lu";
const EmployeeLearning = () => {
  // State Management
  const [checkedIn, setCheckedIn] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [previousAnnouncementsCount, setPreviousAnnouncementsCount] =
    useState(0);

  const dispatch = useDispatch();
  const {
    dashboardData,
    announcementsData,
    attendanceData,
    getDashboardDataLoading,
  } = useSelector((state) => state.employee?.dashboard || {});
  const attendanceSummary = dashboardData?.attendanceSummary;
  const leaveBalances = dashboardData?.leaveBalances || [];
  const announcements = announcementsData || [];
  console.log("Attendance Data:", attendanceData);
  useEffect(() => {
    dispatch(employeeDashboardThunk.getDashboardDataThunk());
    dispatch(employeeDashboardThunk.getAnnouncementsThunk());
  }, [dispatch]);

  useEffect(() => {
    const month = currentMonth.toISOString().slice(0, 7);
    dispatch(employeeDashboardThunk.getAttendanceDataThunk(month));
  }, [currentMonth, dispatch]);
  useEffect(() => {
    if (getDashboardDataLoading) {
      setShowSkeleton(true);
    } else {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [getDashboardDataLoading]);

  const [latestAnnouncementId, setLatestAnnouncementId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!announcements || announcements.length === 0) return;

    const newest = announcements[0];

    if (isInitialLoad) {
      setLatestAnnouncementId(newest._id);
      setIsInitialLoad(false);
      return;
    }

    if (newest._id !== latestAnnouncementId) {
      toast.info(`New Announcement: ${newest.title} 🔔`);
      setLatestAnnouncementId(newest._id);
    }
  }, [announcements]);

  // Now we can calculate notificationCount
  const notificationCount = announcements?.length || 0;
  // Company Info
  const companyInfo = {
    name: "SUCCESS FACTOR",
    tagline: "Revappayya IT Services Pvt Ltd",
  };

  // Calendar functionality
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthYearString = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Generate calendar for current month
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Previous month's days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        currentMonth: false,
        type: "prev",
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayType = getDayType(i);
      days.push({
        date: i,
        currentMonth: true,
        type: dayType.type,
        label: dayType.label,
        color: dayType.color,
        textColor: dayType.textColor,
      });
    }

    // Next month's days
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: i,
        currentMonth: false,
        type: "next",
      });
    }

    return days;
  };
  const attendanceMap = React.useMemo(() => {
    const map = {};

    if (attendanceData && Array.isArray(attendanceData)) {
      attendanceData.forEach((item) => {
        const day = new Date(item.date).getDate();
        map[day] = item.status;
      });
    }

    return map;
  }, [attendanceData]);

  const getDayType = (date) => {
    const dayOfWeek = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      date,
    ).getDay();

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const today = new Date();
    const isToday =
      date === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear();

    if (isToday) {
      return {
        type: "today",
        color: "bg-blue-50 border-blue-200",
        textColor: "text-blue-700",
      };
    }

    const status = attendanceMap[date];

    if (status === "PRESENT") {
      return {
        type: "present",
        color: "bg-green-50 border-green-200",
        textColor: "text-green-700",
      };
    }

    if (status === "ABSENT") {
      return {
        type: "absent",
        color: "bg-gray-50 border-gray-200",
        textColor: "text-gray-700",
      };
    }

    if (status === "LATE") {
      return {
        type: "late",
        color: "bg-yellow-50 border-yellow-200",
        textColor: "text-yellow-700",
      };
    }

    if (status === "LEAVE") {
      return {
        type: "leave",
        color: "bg-purple-50 border-purple-200",
        textColor: "text-purple-700",
      };
    }
    if (isWeekend) {
      return {
        type: "holiday",
        color: "bg-red-50 border-red-200",
        textColor: "text-red-700",
      };
    }

    if (status === "HOLIDAY") {
      return {
        type: "holiday",
        color: "bg-red-50 border-red-200",
        textColor: "text-red-700",
      };
    }

    return {
      type: "default",
      color: "bg-white border-gray-100",
      textColor: "text-gray-700",
    };
  };
  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  // Handle date click
  const handleDateClick = (day) => {
    if (day.currentMonth) {
      const clickedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day.date,
      );
      setSelectedDate(clickedDate);
    }
  };

  // Handle calendar icon click
  const handleCalendarIconClick = () => {
    setShowYearMonthPicker(!showYearMonthPicker);
    setSelectedYear(currentMonth.getFullYear());
    setSelectedMonth(currentMonth.getMonth());
  };

  // Handle year/month selection
  const handleYearMonthSelect = (year, month) => {
    const newDate = new Date(year, month, 1);
    setCurrentMonth(newDate);
    setShowYearMonthPicker(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <div className="w-2 h-2 rounded-full bg-green-400" />;
      case "absent":
        return <div className="w-2 h-2 rounded-full bg-gray-400" />;
      case "leave":
        return <div className="w-2 h-2 rounded-full bg-purple-400" />;
      case "late":
        return <div className="w-2 h-2 rounded-full bg-yellow-400" />;
      case "weekend":
        return <div className="w-2 h-2 rounded-full bg-gray-300" />;
      case "holiday":
        return <div className="w-2 h-2 rounded-full bg-red-400" />;

      default:
        return null;
    }
  };

  // Calendar days
  const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarData = generateCalendar();

  // Months list
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate years list (current year ± 2)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // Profile Details Component
  // const ProfileDetails = () => (
  //     <div className="absolute top-16 right-4 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
  //         <div className="flex items-start mb-4">
  //             <img
  //                 src={employeeData.avatar}
  //                 alt="Profile"
  //                 className="w-10 h-10 rounded-full border-2 border-blue-200"
  //             />
  //             <div className="ml-3 flex-1">
  //                 <h3 className="font-bold text-gray-800 text-sm">{employeeData.name}</h3>
  //                 <p className="text-xs text-gray-600">{employeeData.position}</p>
  //                 <div className="flex items-center mt-1">
  //                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
  //                     <span className="text-xs text-green-600 font-medium">Active</span>
  //                 </div>
  //             </div>
  //         </div>

  //         <div className="space-y-3 text-xs">
  //             <div className="flex items-center">
  //                 <User className="w-3.5 h-3.5 text-gray-400 mr-3" />
  //                 <div>
  //                     <p className="text-gray-500">Employee ID</p>
  //                     <p className="font-medium text-gray-800">{employeeData.employeeId}</p>
  //                 </div>
  //             </div>
  //             <div className="flex items-center">
  //                 <Building className="w-3.5 h-3.5 text-gray-400 mr-3" />
  //                 <div>
  //                     <p className="text-gray-500">Department</p>
  //                     <p className="font-medium text-gray-800">{employeeData.department}</p>
  //                 </div>
  //             </div>
  //             <div className="flex items-center">
  //                 <Users className="w-3.5 h-3.5 text-gray-400 mr-3" />
  //                 <div>
  //                     <p className="text-gray-500">Manager</p>
  //                     <p className="font-medium text-gray-800">{employeeData.manager}</p>
  //                 </div>
  //             </div>
  //             <div className="flex items-center">
  //                 <Calendar className="w-3.5 h-3.5 text-gray-400 mr-3" />
  //                 <div>
  //                     <p className="text-gray-500">Join Date</p>
  //                     <p className="font-medium text-gray-800">{employeeData.joiningDate}</p>
  //                 </div>
  //             </div>
  //         </div>

  //         <button
  //             onClick={() => setShowProfileDetails(false)}
  //             className="w-full mt-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium"
  //         >
  //             Close
  //         </button>
  //     </div>
  // );

  // YearMonth Picker Component
  const YearMonthPicker = () => (
    <div className="absolute top-16 right-4 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Select Month & Year
        </h3>

        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-1.5">Year</p>
          <div className="grid grid-cols-3 gap-1">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`p-1.5 text-xs rounded border ${selectedYear === year
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-1.5">Month</p>
          <div className="grid grid-cols-3 gap-1">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(index)}
                className={`p-1.5 text-xs rounded border ${selectedMonth === index
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
              >
                {month.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowYearMonthPicker(false)}
            className="flex-1 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleYearMonthSelect(selectedYear, selectedMonth)}
            className="flex-1 py-2 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
  // Notification Component
  const NotificationComponent = () => (
    <div className="absolute top-16 right-4 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Notifications ({notificationCount})
        </h3>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {/* Announcements in notifications */}
          {announcements?.map((announcement) => (
            <div
              key={announcement._id}
              className="flex items-start p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors"
            >
              <div
                className={`p-1.5 rounded mr-2 ${announcement.type === "meeting"
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-green-50 border border-green-200"
                  }`}
              >
                <Bell
                  className={`w-3 h-3 ${announcement.type === "meeting"
                      ? "text-blue-600"
                      : "text-green-600"
                    }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 text-xs mb-0.5">
                  {announcement.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {announcement.description}
                </p>
                <span className="text-xs text-gray-400 mt-0.5 block">
                  {" "}
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

          {/* Work Anniversaries in notifications */}
          {workAnniversaries?.map((anniversary) => (
            <div
              key={anniversary.id}
              className="flex items-start p-2 border border-gray-100 rounded hover:bg-yellow-50 transition-colors"
            >
              <div className="p-1.5 rounded mr-2 bg-yellow-50 border border-yellow-200">
                <PartyPopper className="w-3 h-3 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 text-xs mb-0.5">
                  Work Anniversary: {anniversary.name}
                </h3>
                <p className="text-xs text-gray-600">{anniversary.thought}</p>
                <span className="text-xs text-gray-400 mt-0.5 block">
                  {anniversary.date} • {anniversary.years} year
                  {anniversary.years > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}

          {/* Birthdays in notifications */}
          {birthdays?.map((birthday) => (
            <div
              key={birthday.id}
              className="flex items-start p-2 border border-gray-100 rounded hover:bg-pink-50 transition-colors"
            >
              <div className="p-1.5 rounded mr-2 bg-pink-50 border border-pink-200">
                <Cake className="w-3 h-3 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 text-xs mb-0.5">
                  Birthday: {birthday.name}
                </h3>
                <p className="text-xs text-gray-600">{birthday.thought}</p>
                <span className="text-xs text-gray-400 mt-0.5 block">
                  {birthday.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setNotificationCount(0);
        }}
        className="w-full py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Mark All as Read
      </button>
    </div>
  );
  // Bottom Navigation - Updated order: Home, ID Card, Logout
  const bottomNavItems = [
    { name: "Home", icon: Home },
    { name: "ID Card", icon: IdCard },
    { name: "Log Out", icon: LogOut },
  ];
  // Handle notification click
  const [showNotifications, setShowNotifications] = useState(false);
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  // Handle check in/out
  const handleCheckOut = () => {
    setCheckedIn(false);
    alert("Successfully checked out for the day!");
  };
  const handleCheckIn = () => {
    setCheckedIn(true);
    alert("Successfully checked in for the day!");
  };
  // Handle quick action
  const handleQuickAction = (actionName) => {
    if (actionName === "Download CTC") {
      alert("CTC document download started!");
    } else {
      alert(`Opening ${actionName} page...`);
      setCurrentView(actionName.toLowerCase().replace(" ", "-"));
    }
  };
  // Render Dashboard
  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-start">
        {/* Attendance Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 relative shadow-sm hover:shadow-md transition-shadow duration-300 self-start">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-4 bg-emerald-600 rounded-full"></div>
                Attendance Calendar
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-medium italic">
                {getMonthYearString(currentMonth)}
              </p>
            </div>
            <button
              onClick={handleCalendarIconClick}
              className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-emerald-100 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>

          {showYearMonthPicker && <YearMonthPicker />}

          <div className="flex items-center justify-between mb-4 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1.5 bg-white hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-lg transition-all duration-300 border border-gray-100 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-extrabold text-gray-700 text-xs tracking-widest uppercase">
              {currentMonth.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>

            <button
              onClick={() => navigateMonth(1)}
              className="p-1.5 bg-white hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-lg transition-all duration-300 border border-gray-100 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-4">
            {calendarDays.map((day) => (
              <div
                key={day}
                className="text-center font-bold text-gray-400 text-[10px] py-2 uppercase tracking-tighter"
              >
                {day}
              </div>
            ))}

            {calendarData.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                                    p-1.5 rounded-xl text-xs transition-all duration-300
                                    ${day.currentMonth ? day.color : "bg-gray-50/50 text-gray-300 border-transparent"}
                                    ${day.currentMonth ? "hover:scale-105 hover:shadow-sm cursor-pointer border" : "cursor-default opacity-40"}
                                    flex flex-col items-center justify-center min-h-[3rem] relative overflow-hidden group
                                `}
              >
                <span
                  className={`text-[11px] font-bold ${day.textColor} ${day.type === "today" ? "scale-110" : ""}`}
                >
                  {day.date}
                </span>
                {day.currentMonth && (
                  <div className="mt-1 transition-transform group-hover:scale-125">
                    {getStatusIcon(day.type)}
                  </div>
                )}
                {day.type === "today" && (
                  <div className="absolute top-1 right-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Calendar Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 bg-green-50/50 px-2 py-1.5 rounded-lg border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">
                Present
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                Absent
              </span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50/50 px-2 py-1.5 rounded-lg border border-yellow-100">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
              <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-tighter">
                Late
              </span>
            </div>
            <div className="flex items-center gap-2 bg-red-50/50 px-2 py-1.5 rounded-lg border border-red-100">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-tighter">
                Holiday
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Leave Overview */}
        <div className="space-y-4">
          {/* Attendance Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                Monthly Summary
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-medium italic">
                Overview for this month
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-white to-green-50/20 rounded-xl p-3 border border-gray-100 hover:border-green-200 transition-all shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-green-100/50 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-green-600">
                    {attendanceSummary?.present || 0}d
                  </span>
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">
                  Present
                </p>
                <p className="text-lg font-black text-gray-800">
                  {attendanceSummary?.present || 0}
                </p>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                  {/* <div className="h-full bg-green-500 rounded-full" style={{ width: `${(attendanceData.presentDays / attendanceData.totalDays) * 100}%` }}></div> */}
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50/20 rounded-xl p-3 border border-gray-100 hover:border-blue-200 transition-all shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-blue-100/50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-600">
                    {attendanceSummary?.leave || 0}d
                  </span>
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">
                  Leave
                </p>
                {/* <p className="text-lg font-black text-gray-800">{attendanceData.leaveDays}</p> */}
                <p className="text-lg font-black text-gray-800">
                  {attendanceSummary?.leave || 0}
                </p>

                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-yellow-50/20 rounded-xl p-3 border border-gray-100 hover:border-yellow-200 transition-all shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-yellow-100/50 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                    <Clock className="w-3.5 h-3.5 text-yellow-600 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-yellow-600">
                    {attendanceSummary?.late || 0}d
                  </span>
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">
                  Late
                </p>
                <p className="text-lg font-black text-gray-800">
                  {attendanceSummary?.late || 0}
                </p>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-red-50/20 rounded-xl p-3 border border-gray-100 hover:border-red-200 transition-all shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-red-100/50 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                    <XCircle className="w-3.5 h-3.5 text-red-600 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-red-600">
                    {attendanceSummary?.absent || 0}d
                  </span>{" "}
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">
                  Absent
                </p>
                <p className="text-lg font-black text-gray-800">
                  {attendanceSummary?.absent || 0}
                </p>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* Leave Overview */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                Entitlement Overview
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-medium italic">
                Your available leave balances
              </p>
            </div>
            {/* <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
{leaveBalances?.map((leave) => (
<div key={key} className="bg-white rounded-xl p-3 border border-gray-100 hover:border-indigo-100/50 transition-all duration-300">
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 border border-gray-100">
<data.icon className="w-3.5 h-3.5 text-indigo-600" />
</div>
<div>
<p className="font-bold text-gray-900 text-xs">{data.label}</p>
<p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{data.description}</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-black text-gray-900">{data.pending}</p>
<p className="text-[9px] text-gray-400 font-bold uppercase">Left</p>
</div>
</div>
                                    <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                                        <span className="text-gray-400">USED: {data.used}</span>
                                        <span className="text-indigo-600">TOTAL: {data.total}</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                                        <div
                                            className={`h-full ${data.color} rounded-full transition-all duration-500 shadow-sm`}
                                            style={{ width: `${(data.used / data.total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div> */}

            {leaveBalances.map((leave, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 border border-gray-100"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-bold text-gray-900 text-xs">
                    {leave.type}
                  </p>
                  <p className="text-xs text-gray-600">
                    Available: {leave.available}
                  </p>
                </div>

                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-gray-400">USED: {leave.used}</span>
                  <span className="text-indigo-600">TOTAL: {leave.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Anniversaries & Birthdays Row */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                Work Anniversaries
                            </h2>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Celebrating career milestones</p>
                        </div>
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
                            <PartyPopper className="w-4 h-4" />
                        </div>
                    </div> */}

      {/* <div className="space-y-4">
                        {workAnniversaries.map((anniversary, index) => (
                            <div key={index} className="group relative flex items-center p-3 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                                        <img
                                            src={anniversary.avatar}
                                            alt={anniversary.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <Award className="w-2 h-2 text-white" />
                                    </div>
                                </div> */}
      {/* <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="text-xs font-bold text-gray-900 truncate tracking-tight">{anniversary.name}</h3>
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/50 px-2 py-0.5 rounded-full border border-indigo-100/30">
                                            {anniversary.years}Y
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1.5">{anniversary.department}</p>
                                    <p className="text-[11px] text-gray-600 line-clamp-1 italic font-medium">"{anniversary.thought}"</p>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-400 ml-2 transition-colors" />
                            </div>
                        ))}
                    </div> */}

      {/* <button className="w-full mt-5 py-2.5 text-center text-indigo-600 text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-indigo-100/50 active:scale-[0.98]">
                        Full Milestones List
                    </button>
                </div>

              
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                Birthday Highlights
                            </h2>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Special day celebrations</p>
                        </div>
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
                            <Cake className="w-4 h-4" />
                        </div>
                    </div> */}

      {/* <div className="space-y-4">
                        {birthdays.map((birthday, index) => (
                            <div key={index} className="group relative flex items-center p-3 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                                        <img
                                            src={birthday.avatar}
                                            alt={birthday.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <Cake className="w-2 h-2 text-white" />
                                    </div>
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="text-xs font-bold text-gray-900 truncate tracking-tight">{birthday.name}</h3>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                            {birthday.date}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-2">{birthday.department}</p>
                                    <button className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all shadow-sm">
                                        <MessageSquare className="w-2.5 h-2.5" />
                                        Wish Joy
                                    </button>
                                </div> */}
      {/* </div>
                        ))}
                    </div>

                    <button className="w-full mt-5 py-2.5 text-center text-indigo-600 text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-indigo-100/50 active:scale-[0.98]">
                        View Birthday Calendar
                    </button>
                </div>
            </div> */}

      {/* Announcements Row */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
            Company Announcements
          </h2>
          <p className="text-xs text-gray-500 mt-1 font-medium italic">
            Stay updated with the latest news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements?.map((announcement, index) => (
            <div
              key={announcement._id}
              className="group relative flex items-start p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all duration-300"
            >
              <div
                className={`p-3 rounded-xl mr-4 flex-shrink-0 transition-all duration-300 ${announcement.type === "meeting"
                    ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                  }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-xs truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                    {announcement.title}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-2">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2 font-medium">
                  {announcement.description}
                </p>
              </div>
              <div className="ml-2 flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-5 py-3 text-center text-indigo-600 text-[11px] font-black uppercase tracking-widest hover:text-white hover:bg-indigo-600 rounded-xl transition-all duration-300 border border-indigo-200 shadow-sm">
          View Comprehensive Archive
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-3">
        {currentView === "dashboard" ? (
          showSkeleton ? (
            <EmployeeDashboardSkeleton />
          ) : (
            renderDashboard()
          )
        ) : (
          <div className="bg-white rounded-lg border border-gray-100 p-4 text-center">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              {quickActions.find(
                (a) => a.name.toLowerCase().replace(" ", "-") === currentView,
              )?.name || currentView}{" "}
              Page
            </h2>
            <p className="text-xs text-gray-600 mb-3">
              This page would open with full details when implemented.
            </p>
            <button
              onClick={() => setCurrentView("dashboard")}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>




      {/* Footer */}
      <footer className="pb-16 pt-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0 text-xs text-gray-500">
            <div>
              <p>© 2024 {companyInfo.name}. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-3">
              <span>ENG</span>
              <span>
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
              <span>IN</span>
              <span>
                {new Date().toLocaleDateString("en-GB").split("/").join("-")}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeLearning;
