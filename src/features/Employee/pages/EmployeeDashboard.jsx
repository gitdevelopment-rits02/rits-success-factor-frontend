import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import employeeDashboardThunk from "../Redux/thunks/EmployeeDashboardThunk";
import EmployeeDashboardSkeleton from "./EmployeeDashboardSkeleton";
import { toast } from "react-toastify";
import {
  LuCalendar as Calendar,
  LuClock as Clock,
  LuCircleCheck as CheckCircle,
  LuCircleX as XCircle,
  LuChevronRight as ChevronRight,
  LuChevronLeft as ChevronLeft,
  LuBell as Bell,
  LuCake as Cake,
  LuPartyPopper as PartyPopper,
} from "react-icons/lu";

const EmployeeLearning = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const dispatch = useDispatch();
  const {
    dashboardData,
    announcementsData,
    attendanceData,
    getDashboardDataLoading,
  } = useSelector((state) => state.employee.dashboard);

  const attendanceSummary = dashboardData?.attendanceSummary;
  const leaveBalances = dashboardData?.leaveBalances || [];
  const announcements = announcementsData || [];

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
      const timer = setTimeout(() => setShowSkeleton(false), 1600);
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

  const notificationCount = announcements?.length || 0;

  const companyInfo = {
    name: "SUCCESS FACTOR",
    tagline: "Revappayya IT Services Pvt Ltd",
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthYearString = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, currentMonth: false, type: "prev" });
    }

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

    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ date: i, currentMonth: false, type: "next" });
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
      date
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

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const handleDateClick = (day) => {
    if (day.currentMonth) {
      const clickedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day.date
      );
      setSelectedDate(clickedDate);
    }
  };

  const handleCalendarIconClick = () => {
    setShowYearMonthPicker(!showYearMonthPicker);
    setSelectedYear(currentMonth.getFullYear());
    setSelectedMonth(currentMonth.getMonth());
  };

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

  const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarData = generateCalendar();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const YearMonthPicker = () => (
    <div className="absolute top-16 right-4 w-64 bg-white rounded-xl border border-gray-200 shadow-lg z-50 p-4">
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
                className={`p-1.5 text-xs rounded border ${
                  selectedYear === year
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
                className={`p-1.5 text-xs rounded border ${
                  selectedMonth === index
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

  const NotificationComponent = () => (
    <div className="absolute top-16 right-4 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Notifications ({notificationCount})
        </h3>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {announcements?.map((announcement) => (
            <div
              key={announcement._id}
              className="flex items-start p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors"
            >
              <div
                className={`p-1.5 rounded mr-2 ${
                  announcement.type === "meeting"
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <Bell
                  className={`w-3 h-3 ${
                    announcement.type === "meeting"
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
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setShowNotifications(false)}
        className="w-full py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Mark All as Read
      </button>
    </div>
  );

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Attendance Calendar
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {getMonthYearString(currentMonth)}
              </p>
            </div>
            <button
              onClick={handleCalendarIconClick}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>

          {showYearMonthPicker && <YearMonthPicker />}

          <div className="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded-lg">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1.5 hover:bg-white text-gray-600 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-gray-700 text-sm">
              {currentMonth.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1.5 hover:bg-white text-gray-600 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-4">
            {calendarDays.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-500 text-xs py-2"
              >
                {day}
              </div>
            ))}

            {calendarData.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`p-2 rounded-lg text-xs transition-all ${
                  day.currentMonth
                    ? day.color
                    : "bg-gray-50 text-gray-300 border-transparent"
                } ${
                  day.currentMonth
                    ? "hover:scale-105 cursor-pointer border"
                    : "cursor-default opacity-40"
                } flex flex-col items-center justify-center min-h-[3rem]`}
              >
                <span className={`text-xs font-medium ${day.textColor}`}>
                  {day.date}
                </span>
                {day.currentMonth && (
                  <div className="mt-1">{getStatusIcon(day.type)}</div>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-green-50 px-2 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium text-green-700">Present</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <span className="text-xs font-medium text-gray-600">Absent</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-2 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <span className="text-xs font-medium text-yellow-700">Late</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-2 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium text-red-700">Holiday</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Monthly Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-800">
                Monthly Summary
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Overview for this month
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-medium text-green-600">
                    {attendanceSummary?.present || 0}d
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">Present</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {attendanceSummary?.present || 0}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">
                    {attendanceSummary?.leave || 0}d
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">Leave</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {attendanceSummary?.leave || 0}
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-600">
                    {attendanceSummary?.late || 0}d
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">Late</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {attendanceSummary?.late || 0}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">
                    {attendanceSummary?.absent || 0}d
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">Absent</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {attendanceSummary?.absent || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Leave Balances */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-gray-800">
                Leave Balances
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your available leave balances
              </p>
            </div>

            <div className="space-y-3">
              {leaveBalances.map((leave, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-800 text-sm">
                      {leave.type}
                    </p>
                    <p className="text-xs text-gray-600">
                      Available: {leave.available}
                    </p>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Used: {leave.used}</span>
                    <span className="text-blue-600 font-medium">
                      Total: {leave.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800">
            Company Announcements
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Stay updated with the latest news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements?.map((announcement) => (
            <div
              key={announcement._id}
              className="flex items-start p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div
                className={`p-3 rounded-lg mr-4 ${
                  announcement.type === "meeting"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">
                    {announcement.title}
                  </h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {announcement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-6">
        {currentView === "dashboard" ? (
          showSkeleton ? (
            <EmployeeDashboardSkeleton />
          ) : (
            renderDashboard()
          )
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              {currentView} Page
            </h2>
            <button
              onClick={() => setCurrentView("dashboard")}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>

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