import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import employeeClockMyTimeThunk from "../Redux/thunks/EmployeeClockMyTimeThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiCalendar,
  FiClock,
  FiLogOut,
  FiPlay,
  FiTrendingUp,
  FiUser,
  FiZap,
} from "react-icons/fi";

const DEPARTMENTS = [
  "IT - Information Technology",
  "Finance",
  "Sales",
  "Human Resources",
];
const STANDARD_WORK_MINUTES = 8 * 60;

function formatMinutes(m) {
  const mm = Math.max(0, m);
  return `${Math.floor(mm / 60)}h ${Math.floor(mm % 60)}m`;
}

function formatSeconds(s) {
  const ss = Math.max(0, s);
  return `${String(Math.floor(ss / 3600)).padStart(2, "0")}:${String(
    Math.floor((ss % 3600) / 60)
  ).padStart(2, "0")}:${String(ss % 60).padStart(2, "0")}`;
}

export default function App() {
  const [location, setLocation] = useState("Office");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [status, setStatus] = useState("loading");
  const [userName, setUserName] = useState("");
  const [timeLogs, setTimeLogs] = useState([]);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [canClockOut, setCanClockOut] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.employee.clockMyTime
  );

  const employeeName = data?.data?.employeeName || "Employee";

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    dispatch(employeeClockMyTimeThunk.getCalendar(today));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedDate) return;
    setTimeLogs([]);
    dispatch(employeeClockMyTimeThunk.getCalendar(selectedDate));
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (data?.data?.employeeName) {
      setUserName(data.data.employeeName);
    }
  }, [data]);

  useEffect(() => {
    if (!data?.data) return;

    const sheet = data.data;
    const logs = [];

    if (sheet.timeLogs && sheet.timeLogs.length > 0) {
      sheet.timeLogs.forEach((log) => {
        if (log.clockIn) {
          logs.push({
            type: "Clock In",
            time: new Date(log.clockIn),
            location: "Office",
            department,
          });
        }
        if (log.clockOut) {
          logs.push({
            type: "Clock Out",
            time: new Date(log.clockOut),
            location: "Office",
            department,
          });
        }
      });
    }

    setTimeLogs(logs);

    const lastLog = sheet.timeLogs?.[sheet.timeLogs.length - 1];
    if (lastLog && lastLog.clockIn && !lastLog.clockOut) {
      setStatus("clockedIn");
      const diff = Math.floor(
        (Date.now() - new Date(lastLog.clockIn).getTime()) / 1000
      );
      setLiveSeconds(diff);
    } else {
      setStatus("clockedOut");
      setLiveSeconds(0);
    }
  }, [data, department]);

  useEffect(() => {
    if (!data?.data?.timeLogs?.length) {
      setCanClockOut(false);
      return;
    }

    const lastLog = data.data.timeLogs[data.data.timeLogs.length - 1];
    if (!lastLog.clockIn || lastLog.clockOut) {
      setCanClockOut(false);
      return;
    }

    const clockInTime = new Date(lastLog.clockIn).getTime();
    const timer = setInterval(() => {
      const diffSeconds = Math.floor((Date.now() - clockInTime) / 1000);
      if (diffSeconds >= 60) {
        setCanClockOut(true);
      } else {
        setCanClockOut(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    if (status !== "clockedIn") return;
    const interval = window.setInterval(() => setLiveSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(interval);
  }, [status]);

  const clockIn = async () => {
    if (status !== "clockedOut") return;
    try {
      await dispatch(employeeClockMyTimeThunk.clockIn()).unwrap();
      const today = new Date().toLocaleDateString("en-CA");
      dispatch(employeeClockMyTimeThunk.getCalendar(today));
      setStatus("clockedIn");
      setLiveSeconds(0);
      toast.success("Clocked In Successfully ✅");
    } catch (err) {
      toast.error(err?.message || "Clock In Failed ❌");
    }
  };

  const clockOut = async () => {
    if (status === "clockedOut") return;
    try {
      await dispatch(employeeClockMyTimeThunk.clockOut()).unwrap();
      const today = new Date().toLocaleDateString("en-CA");
      dispatch(employeeClockMyTimeThunk.getCalendar(today));
      setStatus("clockedOut");
      setLiveSeconds(0);
      toast.success("Clocked Out Successfully ✅");
    } catch (err) {
      toast.error(err?.message || "Clock Out Failed ❌");
    }
  };

  const lastLogTime = timeLogs.length
    ? timeLogs[timeLogs.length - 1].time
    : null;

  const dailySummary = useMemo(() => {
    const days = {};
    for (const log of timeLogs) {
      const day = log.time.toISOString().split("T")[0];
      if (!days[day]) days[day] = { work: 0, overtime: 0, events: [] };
      days[day].events.push(log);
    }

    for (const day of Object.keys(days)) {
      const events = [...days[day].events].sort(
        (a, b) => a.time.getTime() - b.time.getTime()
      );
      let work = 0;
      let start = null;

      for (const e of events) {
        if (e.type === "Clock In") start = e.time;
        if (e.type === "Clock Out" && start) {
          work += (e.time.getTime() - start.getTime()) / 60000;
          start = null;
        }
      }

      const todayKey = new Date().toISOString().split("T")[0];
      const isToday = day === todayKey;
      if (isToday && status === "clockedIn" && start) {
        work += liveSeconds / 60;
      }

      days[day].events = events;
      days[day].work = work;
      days[day].overtime = Math.max(work - STANDARD_WORK_MINUTES, 0);
    }
    return days;
  }, [timeLogs, liveSeconds, status]);

  const todayKey = new Date().toISOString().split("T")[0];
  const workedToday = dailySummary[todayKey]?.work || 0;
  const overtimeToday = dailySummary[todayKey]?.overtime || 0;
  const efficiency = Math.min(
    Math.round((workedToday / STANDARD_WORK_MINUTES) * 100),
    100
  );

  const getEventIcon = (type) => {
    if (type === "Clock In" || type === "Break Out")
      return <FiPlay size={18} />;
    if (type === "Clock Out") return <FiLogOut size={18} />;
    return null;
  };

  const getEventBg = (type) => {
    if (type === "Clock In") return "bg-green-50 text-green-600";
    if (type === "Clock Out") return "bg-red-50 text-red-600";
    return "bg-amber-50 text-amber-600";
  };

  const days = Object.entries(dailySummary).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );

  const filteredDays = selectedDate
    ? days.filter(([date]) => date === selectedDate)
    : days;

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">
            Welcome, {userName || "Employee"}
          </h1>
          <p className="text-gray-500 text-sm">
            Track your attendance and work hours
          </p>
        </div>
      </header>

      <div className="w-full max-w-[1400px] mx-auto space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Session Control Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 relative">
            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${
                  status === "clockedIn"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === "clockedIn" ? "bg-green-600 animate-pulse" : "bg-gray-400"
                  }`}
                />
                {status === "clockedIn" ? "ONLINE" : "OFFLINE"}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 pt-8 lg:pt-2">
              {/* Circular Progress Timer */}
              <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 224 224" className="w-full h-full -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="104"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r="104"
                    fill="none"
                    stroke={status === "clockedOut" ? "#10b981" : "#3b82f6"}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 104}
                    strokeDashoffset={
                      2 * Math.PI * 104 * (1 - efficiency / 100)
                    }
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={status === "clockedOut" ? clockIn : undefined}
                    disabled={status !== "clockedOut" || loading}
                    className={`w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all transform ${
                      status === "clockedOut"
                        ? "bg-gradient-to-br from-green-400 to-green-600 text-white hover:scale-105 active:scale-95 shadow-lg"
                        : "bg-white border-2 border-gray-200 text-gray-600 shadow-inner"
                    }`}
                  >
                    <FiPlay
                      size={20}
                      className={
                        status === "clockedOut" ? "text-white" : "text-gray-400"
                      }
                    />
                    <span
                      className={`font-medium text-xs ${
                        status === "clockedOut" ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {status === "clockedOut" ? "Clock In" : "Clocked In"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Session Info */}
              <div className="flex-1 w-full space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-gray-200">
                  <div className="space-y-2 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          status === "clockedIn" ? "bg-blue-600" : "bg-gray-400"
                        }`}
                      />
                      <h3 className="text-xs font-medium text-gray-600">
                        Session Duration
                      </h3>
                    </div>

                    <div className="text-4xl font-semibold tabular-nums text-gray-800">
                      {formatSeconds(liveSeconds)}
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                      <div className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-xs font-medium text-gray-700">
                          Today: {formatMinutes(workedToday)}
                        </span>
                      </div>
                      {status === "clockedIn" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                          </span>
                          <span className="text-xs font-medium text-blue-700">
                            Live
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={clockOut}
                    disabled={status === "clockedOut" || loading || !canClockOut}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm ${
                      status === "clockedOut" || !canClockOut
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600"
                    }`}
                  >
                    <FiLogOut size={14} />
                    {canClockOut ? "Clock Out" : "Wait 1 min"}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-medium text-gray-600">
                      Shift Progress
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {lastLogTime
                        ? `${lastLogTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        : "No Activity"}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <MetricCard
            title="WORKED TODAY"
            value={formatMinutes(workedToday)}
            icon={<FiClock size={18} />}
            color="blue"
          />
          <MetricCard
            title="OVERTIME"
            value={formatMinutes(overtimeToday)}
            icon={<FiZap size={18} />}
            color="amber"
          />
          <MetricCard
            title="STATUS"
            value={status === "clockedIn" ? "Online" : "Offline"}
            icon={<FiUser size={18} />}
            color="slate"
            statusMode
            status={status}
          />
        </div>

        {/* Timesheet Section */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <FiClock size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Timesheet Summary
                </h2>
                <p className="text-sm text-gray-500">
                  Review your daily work logs
                </p>
              </div>
            </div>

            {/* Date Picker */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-gray-200 shadow-sm">
              <FiCalendar size={16} className="text-blue-600" />
              <input
                type="date"
                value={selectedDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-gray-700 text-sm font-medium focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {filteredDays.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-300 mx-auto mb-4">
                <FiClock size={32} />
              </div>
              <p className="text-gray-500 font-medium mb-4">
                {selectedDate
                  ? "No activity for selected date"
                  : "No activity records yet"}
              </p>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate("")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all dates
                </button>
              )}
            </div>
          ) : (
            filteredDays.map(([date, d]) => (
              <div
                key={date}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-blue-600 border border-blue-200">
                    Total: {formatMinutes(d.work)}
                  </div>
                </div>

                <div className="p-6 divide-y divide-gray-100">
                  {d.events.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventBg(
                            e.type
                          )}`}
                        >
                          {getEventIcon(e.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{e.type}</p>
                          <p className="text-xs text-gray-500">
                            {e.time.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">
                            Location
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {e.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">
                            Department
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {e.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="text-center py-8">
          <p className="text-xs text-gray-400">
            © 2024 RevAppayya IT Services (RitsHRConnect). All rights reserved.
          </p>
        </footer>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, statusMode, status }) {
  const colors = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-600" },
    emerald: { bg: "bg-green-50", text: "text-green-600" },
    slate: { bg: "bg-gray-100", text: "text-gray-600" },
  };

  const c = colors[color];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>

      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center ${c.bg} ${c.text}`}
      >
        {statusMode ? (
          status === "clockedIn" ? (
            <FiTrendingUp size={20} className="text-green-500" />
          ) : (
            <FiUser size={20} className="text-gray-400" />
          )
        ) : (
          icon
        )}
      </div>
    </div>
  );
}