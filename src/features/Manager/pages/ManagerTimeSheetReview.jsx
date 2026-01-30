import { useState, useEffect, useMemo } from "react";

import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
  FaBolt,
  FaClipboardCheck,
  FaFileAlt,
  FaFileExcel,
  FaUser,
  FaEllipsisV,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
// import timesheetBg from "./timesheet-bg.png";

export default function SuperAdminPersonalTimeSheet() {

  const [filter, setFilter] = useState("Today");
  const [search, setSearch] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("All Departments");

  const [statusFilter, setStatusFilter] = useState("All");
  const [bulkApproved, setBulkApproved] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

  const [openAction, setOpenAction] = useState(null);

useEffect(() => {
  const timer = setInterval(() => {
    setNow(new Date());
  }, 60000); // every 1 minute

  return () => clearInterval(timer);
}, []);

  const [records, setRecords] = useState([
    {
      name: "John Doe",
      role: "Sales (ID: 1023)",
      department: "Sales",
      location: "Office",
      date: "2026-01-28",
      clockIn: "09:05",
      clockOut: "17:30",
      break: "00:30",
      status: "Late",
    },
    {
      name: "Jane Smith",
      role: "Sales (ID: 1024)",
      department: "Sales",
      location: "Remote",
      date: "2026-01-28",
      clockIn: "09:00",
      clockOut: "17:15",
      break: "00:30",
      status: "Approved",
    },
    {
      name: "Mike Brown",
      role: "HR (ID: 1025)",
      department: "HR",
      location: "Office",
      date: "2026-01-26",
      clockIn: "--",
      clockOut: "--",
      break: "--",
      status: "Absent",
    },
    {
      name: "Anna Lee",
      role: "IT (ID: 1026)",
      department: "IT",
      location: "On-Site",
      date: "2026-01-27",
      clockIn: "08:45",
      clockOut: "19:35",
      break: "01:00",
      status: "Pending",
    },
    {
      name: "David Clark",
      role: "IT (ID: 1027)",
      department: "IT",
      location: "Remote",
      date: "2026-01-28",
      clockIn: "09:00",
      clockOut: "18:00",
      break: "00:30",
      status: "On Time",
    },
    {
      name: "Sophia Wilson",
      role: "HR (ID: 1028)",
      department: "HR",
      location: "Office",
      date: "2026-01-22",
      clockIn: "09:10",
      clockOut: "17:10",
      break: "00:30",
      status: "Approved",
    },
    {
      name: "Robert King",
      role: "Finance (ID: 1029)",
      department: "Finance",
      location: "Office",
      date: "2026-01-22",
      clockIn: "09:25",
      clockOut: "17:00",
      break: "00:30",
      status: "Late",
    },
    {
      name: "Emily Davis",
      role: "Marketing (ID: 1030)",
      department: "Marketing",
      location: "Remote",
      date: "2026-01-27",
      clockIn: "09:00",
      clockOut: "16:45",
      break: "00:30",
      status: "Pending",
    },
  ]);


const [now, setNow] = useState(new Date());

  /* ---------------- HELPERS ---------------- */

const calcHours = (inTime, outTime, breakTime, date) => {
  if (inTime === "--") return 0;

  const [ih, im] = inTime.split(":").map(Number);
  const [bh, bm] = breakTime.split(":").map(Number);

  const start = new Date(date);
  start.setHours(ih, im, 0, 0);

  let end;

  // ✅ LIVE calculation for TODAY
  if (
    outTime === "--" ||
    new Date(date).toDateString() === now.toDateString()
  ) {
    end = now;
  } else {
    const [oh, om] = outTime.split(":").map(Number);
    end = new Date(date);
    end.setHours(oh, om, 0, 0);
  }

  const workedMs = end - start;
  const workedHrs = workedMs / (1000 * 60 * 60);

  const breakHrs = bh + bm / 60;

  return Math.max(workedHrs - breakHrs, 0);
};

const getTotalHoursFromRecords = (records) => {
  return records
    .reduce(
      (sum, r) => sum + calcHours(r.clockIn, r.clockOut, r.break,r.date),
      0
    )
    .toFixed(2);
};

  const matchDateFilter = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();

    if (filter === "Today") return d.toDateString() === today.toDateString();

    if (filter === "This Week") {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return d >= start && d <= end;
    }

    if (filter === "This Month") {
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }
    return true;
  };

const filteredRecords = useMemo(() => {
  return records.filter((r) => {
    const matchSearch = `${r.name} ${r.role} ${r.department}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || r.status === statusFilter;

   const matchDepartment =
  departmentFilter === "All Departments" ||
  r.department === departmentFilter;


    const matchDate = matchDateFilter(r.date);

    return matchSearch && matchStatus && matchDepartment && matchDate;
  });
}, [records, search, statusFilter, departmentFilter, filter]);

const departments = useMemo(() => {
  return ["All Departments", ...new Set(records.map((r) => r.department))];
}, [records]);

  const stats = useMemo(() => {
    let totalHours = 0;
    let overtime = 0;
    let discrepancies = 0;
    let pending = 0;

    filteredRecords.forEach((r) => {
      const hrs = calcHours(r.clockIn, r.clockOut, r.break,r.date);
      totalHours += hrs;
      if (hrs > 8) overtime += hrs - 8;
      if (["Late", "Absent"].includes(r.status)) discrepancies++;
      if (r.status === "Pending") pending++;
    });

    return [
      {
        title: "Total Hours Worked",
        value: totalHours.toFixed(1),
        unit: "hrs",
        icon: FaClock,
        bg: "bg-blue-100",
        color: "text-blue-600",
      },
      {
        title: "Active Discrepancies",
        value: discrepancies,
        unit: "Days",
        icon: FaExclamationTriangle,
        bg: "bg-orange-100",
        color: "text-orange-600",
      },
      {
        title: "Overtime Hours",
        value: overtime.toFixed(1),
        unit: "hrs",
        icon: FaBolt,
        bg: "bg-green-100",
        color: "text-green-600",
      },
      {
        title: "Pending Approvals",
        value: pending,
        unit: "Tasks",
        icon: FaClipboardCheck,
        bg: "bg-purple-100",
        color: "text-purple-600",
      },
    ];
  }, [filteredRecords]);

  const updateStatus = (index, status) => {
    const updated = [...records];
    updated[index].status = status;
    setRecords(updated);
  };

const bulkApprove = () => {
  if (!isMonthlyView || selectedRows.length === 0) return;

  setRecords((prev) =>
    prev.map((r, idx) =>
      selectedRows.includes(idx) && r.status !== "Absent"
        ? { ...r, status: "Approved" }
        : r
    )
  );

  setSelectedRows([]);
  setBulkApproved(true);
};

const exportExcel = () => {
  const worksheetData = filteredRecords.map((r) => ({
    Employee: r.name,
    Department: r.department,
    Location: r.location,
    Date: r.date,
    "Clock In": r.clockIn,
    "Clock Out": r.clockOut,
    Break: r.break,
    "Total Hours": calcHours(r.clockIn, r.clockOut, r.break).toFixed(2),
    Status: r.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");

  XLSX.writeFile(workbook, "timesheet.xlsx");
};


// ✅ Single PDF
const exportSinglePDF = (r) => {
  const doc = new jsPDF();

  // Filter only this employee & current month
  const employeeMonthRecords = records.filter(
    (rec) =>
      rec.role === r.role
&&
      new Date(rec.date).getMonth() === new Date().getMonth() &&
      new Date(rec.date).getFullYear() === new Date().getFullYear()
  );

  const monthName = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const totalMonthHours = getTotalHoursFromRecords(employeeMonthRecords);

  doc.setFontSize(14);
  doc.text(`Timesheet - ${r.name}`, 14, 15);

  doc.setFontSize(10);
  doc.text(`Month: ${monthName}`, 14, 22);
  doc.text(`Total Hours (This Month): ${totalMonthHours} hrs`, 14, 28);

  autoTable(doc, {
    startY: 35,
    head: [["Date", "Clock In", "Clock Out", "Break", "Hours", "Status"]],
    body: employeeMonthRecords.map((rec) => [
      rec.date,
      rec.clockIn,
      rec.clockOut,
      rec.break,
      calcHours(rec.clockIn, rec.clockOut, rec.break).toFixed(2),
      rec.status,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.text(
    `Grand Total Hours (${monthName}): ${totalMonthHours} hrs`,
    14,
    finalY
  );

  doc.save(`${r.name}_Monthly_Timesheet.pdf`);
};


// ✅ Single Excel
const exportSingleExcel = (r) => {
  const worksheet = XLSX.utils.json_to_sheet([{
    Name: r.name,
   Role: r.role,
Department: r.department,

    Date: r.date,
    "Clock In": r.clockIn,
    "Clock Out": r.clockOut,
    Break: r.break,
    "Total Hours": calcHours(r.clockIn, r.clockOut, r.break,r.date).toFixed(2),
    Status: r.status,
  }]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");
  XLSX.writeFile(workbook, `${r.name}_Timesheet.xlsx`);
};



const exportPDF = () => {
  const doc = new jsPDF();

  const monthName =
    filter === "This Month"
      ? new Date().toLocaleString("default", { month: "long", year: "numeric" })
      : filter;

  const totalMonthHours = getTotalHoursFromRecords(filteredRecords);

  doc.setFontSize(14);
  doc.text("Employee Timesheet Report", 14, 15);

  doc.setFontSize(10);
  doc.text(`Period: ${monthName}`, 14, 22);
  doc.text(`Total Hours (Entire Period): ${totalMonthHours} hrs`, 14, 28);

  autoTable(doc, {
    startY: 35,
    head: [[
      "Name",
      "ID",
     "Department",
      "Date",
      "Clock In",
      "Clock Out",
      "Break",
      "Hours",
      "Status",
    ]],
    body: filteredRecords.map((r) => [
      r.name,
     r.role,
r.department,
      r.date,
      r.clockIn,
      r.clockOut,
      r.break,
      calcHours(r.clockIn, r.clockOut, r.break,r.date).toFixed(2),
      r.status,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.text(
    `Grand Total Hours (${monthName}): ${totalMonthHours} hrs`,
    14,
    finalY
  );

  doc.save("Timesheet_Monthly_Report.pdf");
};

  const statusStyle = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-600",
    Late: "bg-yellow-100 text-yellow-700",
    "On Time": "bg-green-100 text-green-600",
    Absent: "bg-red-100 text-red-600",
  };
  const showTimeColumns = filter === "Today";
const isMonthlyView = filter === "This Month";

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      // style={{ backgroundImage: `url(${timesheetBg})` }}
    >
      <div className="absolute inset-0 bg-blue-60/90" />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* HEADER */}
       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">

      <div className="mt-10 md:mt-6">

  {/* Title */}
  <h1 className="text-[28px] font-bold tracking-wide text-gray-900">
    Time Sheet Dashboard
  </h1>

  {/* Subtitle */}
  <p className="text-[15px] font-semibold tracking-wide text-gray-500 mt-1">
    Manage and approve attendance records
  </p>
</div>



          <div className="flex flex-col items-end gap-3">
           <div
  className="flex items-center gap-4 bg-white px-6 py-3
             rounded-2xl shadow-sm border
             w-[240px]"
>
  {/* Icon */}
  <div
    className="w-11 h-11 bg-blue-600 rounded-2xl
               flex items-center justify-center"
  >
    <FaUser className="text-white" size={18} />
  </div>

  {/* Text */}
  <div>
    <p className="text-[15px] font-semibold tracking-wide text-gray-800">
      Super Admin
    </p>

  </div>
</div>


           <div className="flex flex-wrap gap-3 mt-2 justify-end">

         <button
  onClick={bulkApprove}
  disabled={!isMonthlyView || selectedRows.length === 0}
  className={`px-6 py-2.5 rounded-xl flex items-center gap-2
    text-[15px] font-semibold tracking-wide transition-all
    ${
      bulkApproved
        ? "bg-green-600 text-white"
        : isMonthlyView && selectedRows.length > 0
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }`}
>
  <FaCheckCircle size={16} />
  {bulkApproved ? "Approved" : "Bulk Approve"}
</button>

            <div className="flex gap-4">
  {/* PDF */}
  <button
    onClick={exportPDF}
    className="flex items-center gap-3
               px-7 py-3
               rounded-2xl
               border border-gray-300
               bg-transparent
               hover:bg-gray-100
               transition"
  >
    <FaFileAlt className="text-black text-xl" />
    <span className="text-lg font-medium text-gray-900">PDF</span>
  </button>

  {/* Excel */}
  <button
    onClick={exportExcel}
    className="flex items-center gap-3
               px-7 py-3
               rounded-2xl
               border border-gray-300
               bg-transparent
               hover:bg-gray-100
               transition"
  >
    <FaFileExcel className="text-black text-xl" />
    <span className="text-lg font-medium text-gray-900">Excel</span>
  </button>
</div>

            </div>
          </div>
        </div>







        {/* FILTER BAR */}
       <div className="flex flex-wrap items-center gap-4 mb-6
                bg-white/70 backdrop-blur-md
                p-4 rounded-2xl shadow-sm">

          {["Today", "This Week", "This Month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
             className={`px-6 py-2 rounded-xl border transition
  text-[15px] font-semibold tracking-wide
  ${
    filter === f
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-gray-800 hover:bg-gray-50"
  }`}

            >
              {f}
            </button>
          ))}
<select
  value={departmentFilter}
  onChange={(e) => setDepartmentFilter(e.target.value)}
className="px-5 py-2 rounded-xl border bg-white
           text-[15px] font-semibold tracking-wide
           text-gray-800
           focus:outline-none focus:ring-2 focus:ring-blue-500"

>
  {departments.map((dep) => (
    <option key={dep} value={dep}>
      {dep}
    </option>
  ))}
</select>



          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
           className="px-5 py-2 rounded-xl border bg-white
           text-[15px] font-semibold tracking-wide
           text-gray-800
           focus:outline-none focus:ring-2 focus:ring-blue-500"

          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Late">Late</option>
            <option value="On Time">On Time</option>
            <option value="Absent">Absent</option>
          </select>

        <div className="relative">
  <FaSearch
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    size={16}
  />

  <input
    type="text"
    placeholder="Search employee or ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="pl-11 pr-5 py-2 rounded-xl border bg-white
               text-[15px] font-semibold tracking-wide
               text-gray-800
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

        </div>

        {/* STATS */}
       {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
  {stats.map((s, i) => (
    <div
      key={i}
      className="bg-white rounded-2xl p-6 shadow-sm border flex items-center gap-5"
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg}`}
      >
        <s.icon className={s.color} size={24} />
      </div>

      {/* Text */}
      <div>
        {/* Title */}
        <p className="text-[15px] font-semibold text-gray-500 tracking-wide">
          {s.title}
        </p>

        {/* Value */}
        <div className="flex items-end gap-1 mt-1">
          <span className="text-3xl font-bold text-gray-900">
            {s.value}
          </span>
          <span className="text-sm font-semibold text-gray-400 mb-1">
            {s.unit}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* TABLE */}
       <div className="bg-white rounded-xl shadow border overflow-x-auto md:overflow-visible">

         <table className="w-full table-fixed">

           <thead className="bg-gray-50">
  <tr>
     {isMonthlyView && (
      <th className="px-4 py-4 text-center">
        <input
          type="checkbox"
          checked={
            selectedRows.length === filteredRecords.length &&
            filteredRecords.length > 0
          }
          onChange={(e) =>
            setSelectedRows(
              e.target.checked ? filteredRecords.map((_, i) => i) : []
            )
          }
        />
      </th>
    )}
    <th className="px-4 py-4 text-left text-[16px] font-bold">Employee</th>
    <th className="px-0 py-4 text-left text-[16px] font-bold">Department</th>
    <th className="px-7 py-4 text-left text-[16px] font-bold">Date</th>

    {showTimeColumns && (
      <>
        <th className="px-4 py-4 text-center text-[16px] font-bold">Clock In</th>
<th className="px-4 py-4 text-center text-[16px] font-bold">Clock Out</th>
<th className="px-4 py-4 text-center text-[16px] font-bold">Break</th>

      </>
    )}

    <th className="px-4 py-4 text-center text-[16px] font-bold">Total Hrs</th>
    <th className="px-4 py-4 text-center text-[16px] font-bold">Status</th>
    <th className="px-4 py-4 text-center text-[16px] font-bold">Actions</th>
  </tr>
</thead>




          <tbody>
  {filteredRecords.map((r, i) => (
    <tr key={i} className="border-t hover:bg-gray-50 transition">
{isMonthlyView && (
        <td className="px-4 py-3 text-center">
          <input
            type="checkbox"
            checked={selectedRows.includes(i)}
            onChange={() =>
              setSelectedRows((prev) =>
                prev.includes(i)
                  ? prev.filter((id) => id !== i)
                  : [...prev, i]
              )
            }
          />
        </td>
      )}
  {/* Employee (Name + ID) */}
  <td className="px-4 py-3 text-left">
<div className="font-medium text-gray-900 leading-tight">
  {r.name}
</div>

  <div className="text-xs text-gray-400">
    {r.role}
  </div>
</td>





  {/* Department */}
<td className="px-15 py-3 text-left">
  {r.department}
</td>




{/* Date */}
<td className="px-6 py-3 text-left tabular-nums">{r.date}</td>

{showTimeColumns && (
  <>
    <td className="px-10 py-3 text-left tabular-nums">{r.clockIn}</td>
    <td className="px-8 py-3 text-left tabular-nums">{r.clockOut}</td>
    <td className="px-12 py-3 text-left tabular-nums">{r.break}</td>
  </>
)}


  {/* Total Hours */}
<td className="px-4 py-3 text-center">
  <div className="font-medium text-gray-900 leading-tight tabular-nums">
    {r.clockIn === "--"
      ? "--"
      : calcHours(r.clockIn, r.clockOut, r.break, r.date).toFixed(2)}
  </div>
</td>


  {/* Status */}
  <td className="px-4 py-3 text-center">
    <span className={`inline-flex px-3 py-1 rounded-full text-xs ${statusStyle[r.status]}`}>
      {r.status}
    </span>
  </td>



      {/* Actions */}
     {/* Actions */}
<td className="px-4 py-3 relative">
  <div className="flex items-center justify-center gap-4">

    {/* ✅ APPROVE */}
    <FaCheckCircle
      size={18}
      className={
        isMonthlyView
          ? "text-green-600 cursor-pointer hover:text-green-700"
          : "text-gray-300 cursor-not-allowed"
      }
      onClick={() => isMonthlyView && updateStatus(i, "Approved")}
    />

    {/* ❌ REJECT */}
    <FaTimesCircle
      size={18}
      className={
        isMonthlyView
          ? "text-red-500 cursor-pointer hover:text-red-600"
          : "text-gray-300 cursor-not-allowed"
      }
      onClick={() => isMonthlyView && updateStatus(i, "Pending")}
    />

    {/* ⋮ THREE DOT MENU */}
    <FaEllipsisV
      size={16}
      className={
        isMonthlyView
          ? "text-gray-700 cursor-pointer hover:text-black"
          : "text-gray-300 cursor-not-allowed"
      }
      onClick={() =>
        isMonthlyView &&
        setOpenAction(openAction === i ? null : i)
      }
    />

    {/* DROPDOWN */}
    {openAction === i && isMonthlyView && (
      <div className="absolute right-6 top-10 bg-white border rounded-xl shadow-lg w-32 z-50">
        <button
          onClick={() => {
            exportSinglePDF(r);
            setOpenAction(null);
          }}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        >
          📄 PDF
        </button>

        <button
          onClick={() => {
            exportSingleExcel(r);
            setOpenAction(null);
          }}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        >
          📊 Excel
        </button>
      </div>
    )}

  </div>
</td>


    </tr>
  ))}

  {filteredRecords.length === 0 && (
    <tr>
      <td colSpan="9" className="px-4 py-6 text-center text-gray-400">
        No records found
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>
      </div>
    </div>
  );
}