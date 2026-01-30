import React, { useState, useMemo } from "react";
import {
  FaCalendarAlt,
  FaUserCheck,
  FaUserTimes,
  FaStopwatch,
  FaClock,
} from "react-icons/fa";

import timesheetBg from "../../../assets/background.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const holidays = [
  "2026-01-14", // Example holiday
  "2026-01-26", // Republic Day
];

/* ================== DATA ================== */

const records = [
  {
    employee: "Shashank",
    empId: "EMP001",
    department: "IT",
    location: "Office",
    date: "01/01/2026",
    in: "09:00 AM",
    out: "06:15 PM",
    break: "45 min",
    hours: "9.15",
    status: "Present",
    approval: "Pending",
  },
  
];
const getWorkingDaysInMonth = (year, month) => {
  let count = 0;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
    const isoDate = date.toISOString().split("T")[0];

    if (
      dayOfWeek !== 0 &&
      dayOfWeek !== 6 &&
      !holidays.includes(isoDate)
    ) {
      count++;
    }
  }

  return count;
};

/* ================== COMPONENT ================== */

export default function TimesheetManagement() {
  const LOGGED_IN_EMP_ID = "EMP001";
   const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 1));
   const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  // ✅ 1️⃣ activeRecords FIRST
  const activeRecords = useMemo(() => {
  return records.filter((r) => {
    // 🔒 ONLY logged-in employee
    if (r.empId !== LOGGED_IN_EMP_ID) return false;

    const [dd, mm, yyyy] = r.date.split("/");

    return (
      Number(mm) - 1 === selectedMonth &&
      Number(yyyy) === selectedYear
    );
  });
}, [selectedMonth, selectedYear]);
 // ✅ 2️⃣ summary AFTER activeRecords
const summary = useMemo(() => {
  const totalWorkingDays = getWorkingDaysInMonth(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  const presentDays = activeRecords.filter(
    (r) => r.status === "Present"
  ).length;

  const leaveDays = activeRecords.filter(
    (r) => r.status === "Leave"
  ).length;

  const totalHoursWorked = activeRecords.reduce(
    (sum, r) => sum + Number(r.hours || 0),
    0
  );

  let overtimeHours = 0;

  activeRecords.forEach((r) => {
    let expected = 0;
    if (r.status === "Present") expected = 8;
    if (r.status === "Half Day") expected = 4;

    overtimeHours += Math.max(0, Number(r.hours) - expected);
  });

  return {
    totalWorkingDays,
    presentDays,
    leaveDays: leaveDays.toString().padStart(2, "0"),
    overtimeHours: overtimeHours.toFixed(1),
    totalHoursWorked: totalHoursWorked.toFixed(1),
  };
}, [activeRecords, selectedDate]);
const monthPickerStyles = {
  caption: {
    textAlign: "center",
    fontWeight: 600,
    marginBottom: "10px",
  },
  months: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    textAlign: "center",
  },
  month: {
    padding: "8px 0",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
  },
};


 return (
    <div
      className="min-h-screen bg-cover bg-center sm:bg-fixed"

      
      style={{ backgroundImage: `url(${timesheetBg})` }}
    >
      <div className="min-h-screen bg-white/40 p-3 sm:p-6 space-y-4">

<h1 className="text-3xl font-semibold text-gray-900">
  Timesheet Overview
</h1>

        {/* SUMMARY (UI UNTOUCHED, VALUES DYNAMIC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <SummaryCard
            title="Total Working Days"
            value={summary.totalWorkingDays}
            icon={<FaCalendarAlt size={28} />}
            accent="border-blue-500"
            iconBg="bg-blue-100 text-blue-600"
          />

          <SummaryCard
            title="Present Days"
            value={summary.presentDays}
            icon={<FaUserCheck size={28} />}
            accent="border-green-500"
            iconBg="bg-green-100 text-green-600"
          />

          <SummaryCard
            title="Leave Days"
            value={summary.leaveDays}
            icon={<FaUserTimes size={28} />}
            accent="border-red-500"
            iconBg="bg-red-100 text-red-600"
          />

          <SummaryCard
            title="Overtime Hours"
            value={summary.overtimeHours}
            unit="hrs"
            icon={<FaStopwatch size={28} />}
            accent="border-orange-500"
            iconBg="bg-orange-100 text-orange-600"
          />

          <SummaryCard
            title="Total Hours Worked"
            value={summary.totalHoursWorked}
            unit="hrs"
            icon={<FaClock size={26} />}
            accent="border-indigo-500"
            iconBg="bg-indigo-100 text-indigo-600"
          />
        </div>

        {/* FILTER ROW — UNTOUCHED */}
        <div className="bg-white rounded-xl border p-3 inline-block">
  <div className="flex">
    <div className="border rounded-md px-3 py-2 text-sm flex items-center gap-2">
      <FaCalendarAlt className="text-blue-600" />
     <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="MM/yyyy"
  showMonthYearPicker
  inline={false}
  calendarClassName="!p-4"
  monthClassName={() => "block text-left px-4 py-2 rounded hover:bg-blue-100"}
 className="outline-none cursor-pointer text-sm w-[140px] sm:w-[110px]"

/>


    </div>
  </div>
</div>

 {/* TABLE */}
        <div className="bg-white rounded-xl border overflow-x-auto p-3">
          <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-1">

            <thead>
  <tr className="bg-slate-100">
    {[
      "Date",
      "Employee",
      "Department",
      "Location",
      "Log In",
      "Log Out",
      "Break",
      "Total Hours",
      "Status",
      "Approval",
    ].map((h, i, a) => (
      <th
        key={h}
        className={`
          px-4 py-4 
          text-base font-bold 
          text-gray-800 
          ${
            ["Department", "Location", "Total Hours", "Status", "Approval"].includes(h)
              ? "text-center"
              : "text-left"
          }
          ${i === 0 ? "rounded-l-xl" : ""}
          ${i === a.length - 1 ? "rounded-r-xl" : ""}
        `}
      >
        {h}
      </th>
    ))}
  </tr>
</thead>

<tbody>
  {activeRecords.map((r, i) => (

             <tr
  key={i}
  className="bg-white shadow-sm"
>
  <td className="px-4 py-3">{r.date}</td>

                  <td className="px-4 py-3 font-medium">
                    {r.employee}
                    <div className="text-xs text-gray-400">{r.empId}</div>
                  </td>

                  <td className="px-4 py-3 text-center">{r.department}</td>

                  <td className="hidden sm:table-cell px-4 py-3 text-center">
  <LocationBadge>{r.location}</LocationBadge>
</td>


                  <td className="px-4 py-3">{r.in}</td>
                  <td className="px-4 py-3">{r.out}</td>
                  <td className="px-4 py-3">{r.break}</td>
                  <td className="px-4 py-3 text-center">{r.hours}</td>

                  <td className="px-4 py-3 text-center">
                    <Badge type="status">{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center rounded-r-xl">
                    <Badge type="approval">{r.approval}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* ================== SMALL COMPONENTS ================== */

const SummaryCard = ({ title, value, unit, icon, accent, iconBg }) => (
  <div className={`bg-white rounded-xl p-5 border-b-4 ${accent}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-end gap-1 mt-1">
          <p className="text-3xl font-bold">{value}</p>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
    </div>
  </div>
);

const LocationBadge = ({ children }) => {
  const styles = {
    Office: "bg-blue-100 text-blue-700",
    Hybrid: "bg-purple-100 text-purple-700",
    "Work From Home": "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[children]}`}>
      {children}
    </span>
  );
};

const Badge = ({ children, type }) => {
  const styles = {
    status: {
      Present: "bg-green-100 text-green-700",
      "Half Day": "bg-orange-100 text-orange-700",
      Leave: "bg-blue-100 text-blue-700",
    },
    approval: {
      Pending: "bg-yellow-100 text-yellow-700",
    },
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[type][children]}`}>
      {children}
    </span>
);
}; 