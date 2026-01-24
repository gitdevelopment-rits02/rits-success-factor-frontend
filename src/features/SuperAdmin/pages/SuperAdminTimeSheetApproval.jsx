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
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
 import * as XLSX from "xlsx";
//import timesheetBg from "./timesheet-bg.png";

export default function SuperAdminPersonalTimeSheet() {

  const [filter, setFilter] = useState("Today");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bulkApproved, setBulkApproved] = useState(false);
useEffect(() => {
  const timer = setInterval(() => {
    setNow(new Date());
  }, 60000); // every 1 minute

  return () => clearInterval(timer);
}, []);

 const [records, setRecords] = useState([
  {
    name: "John Doe",
    id: "1023",
    designation: "COO",
    date: "2026-01-22",
    clockIn: "09:00",
    clockOut: "17:30",
    break: "00:30",
    status: "Approved",
  },
  {
    name: "Jane Smith",
    id: "1024",
    designation: "CMO",
    date: "2026-01-22",
    clockIn: "09:10",
    clockOut: "17:15",
    break: "00:30",
    status: "Pending",
  },
  {
    name: "Mike Brown",
    id: "1025",
    designation: "CFO",
    date: "2026-01-22",
    clockIn: "09:20",
    clockOut: "17:00",
    break: "00:30",
    status: "Late",
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
    const matchSearch = `${r.name} ${r.id}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || r.status === statusFilter;

    const matchDate = matchDateFilter(r.date);

    return matchSearch && matchStatus && matchDate;
  });
}, [records, search, statusFilter, filter]);


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
    setRecords(
      records.map((r) =>
        r.status === "Absent" ? r : { ...r, status: "Approved" }
      )
    );
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
      rec.id === r.id &&
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
    ID: r.id,
    Designation: r.designation,
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
      "Designation",
      "Date",
      "Clock In",
      "Clock Out",
      "Break",
      "Hours",
      "Status",
    ]],
    body: filteredRecords.map((r) => [
      r.name,
      r.id,
      r.designation,
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

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
     // style={{ backgroundImage: `url(${timesheetBg})` }}
    >
      <div className="absolute inset-0 bg-blue-70/90" />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
        <div className="mt-4">
  <h1 className="text-2xl font-semibold">Time Sheet Dashboard</h1>
  <p className="text-sm text-gray-500 mt-1">
    Manage and approve attendance records
  </p>
</div>


          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow w-[220px]">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white" size={18} />
              </div>
              <p className="text-sm font-semibold">Super Admin</p>
            </div>

            <div className="flex gap-3 mt-2">
              <button
  onClick={bulkApprove}
  className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
    bulkApproved
      ? "bg-green-600 text-white"
      : "bg-blue-600 text-white"
  }`}
>
  {bulkApproved && <FaCheckCircle size={16} className="mt-[1px]" />}

  {bulkApproved ? "Approved" : "Bulk Approve"}
</button>


              <button
                onClick={exportPDF}
                className="border px-4 py-2 rounded-lg text-sm flex gap-2"
              >
               <FaFileAlt size={17} className="mt-0.5" /> PDF
              </button>

              <button
                onClick={exportExcel}
                className="border px-4 py-2 rounded-lg text-sm flex gap-2"
              >
                <FaFileExcel size={17} className="mt-0.5" /> Excel
              </button>
            </div>
          </div>
        </div>

    


        


        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-3 mb-4">
          {["Today", "This Week", "This Month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm ${
                filter === f ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {f}
            </button>
          ))}

          

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Late">Late</option>
            <option value="On Time">On Time</option>
            <option value="Absent">Absent</option>
          </select>

          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              placeholder="Search employee or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow border flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={s.color} size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.title}</p>
                <h2 className="text-2xl font-semibold">
                  {s.value} <span className="text-sm text-gray-400">{s.unit}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
  <tr>
    <th className="px-4 py-3 text-left font-medium">Employee</th>
    <th className="px-4 py-3 text-center font-medium">Designation</th>
    <th className="px-4 py-3 text-center font-medium">Date</th>
    <th className="px-4 py-3 text-center font-medium">Clock In</th>
    <th className="px-4 py-3 text-center font-medium">Clock Out</th>
    <th className="px-4 py-3 text-center font-medium">Break</th>
    <th className="px-4 py-3 text-center font-medium">Total Hrs</th>
    <th className="px-4 py-3 text-center font-medium">Status</th>
    <th className="px-4 py-3 text-center font-medium">Actions</th>
  </tr>
</thead>

          <tbody>
  {filteredRecords.map((r, i) => (
    <tr key={i} className="border-t hover:bg-gray-50 transition">

      {/* Employee (Name + ID) */}
      <td className="px-4 py-3">
        <p className="font-medium">{r.name}</p>
        <p className="text-xs text-gray-400">ID: {r.id}</p>
      </td>

      {/* Designation (COO / CMO / CFO) */}
      <td className="px-4 py-3 text-center font-medium">
        {r.designation}
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-center tabular-nums">
        {r.date}
      </td>

      {/* Clock In */}
      <td className="px-4 py-3 text-center tabular-nums">
        {r.clockIn}
      </td>

      {/* Clock Out */}
      <td className="px-4 py-3 text-center tabular-nums">
        {r.clockOut}
      </td>

      {/* Break */}
      <td className="px-4 py-3 text-center tabular-nums">
        {r.break}
      </td>

      {/* Total Hours */}
     <td className="px-4 py-3 text-center font-medium tabular-nums">
  {calcHours(r.clockIn, r.clockOut, r.break, r.date).toFixed(2)}
</td>


      {/* Status */}
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs ${statusStyle[r.status]}`}
        >
          {r.status}
        </span>
      </td>

      {/* Actions */}
     {/* Actions */}
<td className="px-4 py-3 text-center">
  <div className="flex justify-center gap-3">

    {/* Approve */}
    <FaCheckCircle
      size={18}
      className="text-green-600 cursor-pointer"
      onClick={() => updateStatus(i, "Approved")}
    />

    {/* Mark Pending */}
    <FaTimesCircle
      size={18}
      className="text-orange-500 cursor-pointer"
      onClick={() => updateStatus(i, "Pending")}
    />

    {/* Download PDF */}
    <FaFileAlt

      size={18}
      className="text-blue-600 cursor-pointer"
      title="Download PDF"
      onClick={() => exportSinglePDF(r)}
    />

    {/* Download Excel */}
    <FaFileExcel
      size={18}
      className="text-green-700 cursor-pointer"
      title="Download Excel"
      onClick={() => exportSingleExcel(r)}
    />

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