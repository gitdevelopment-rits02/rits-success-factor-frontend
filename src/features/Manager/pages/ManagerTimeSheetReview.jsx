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

export default function SuperAdminPersonalTimeSheet() {
  const [filter, setFilter] = useState("Today");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bulkApproved, setBulkApproved] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAction, setOpenAction] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);
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

  const calcHours = (inTime, outTime, breakTime, date) => {
    if (inTime === "--") return 0;

    const [ih, im] = inTime.split(":").map(Number);
    const [bh, bm] = breakTime.split(":").map(Number);

    const start = new Date(date);
    start.setHours(ih, im, 0, 0);

    let end;
    if (outTime === "--" || new Date(date).toDateString() === now.toDateString()) {
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
      .reduce((sum, r) => sum + calcHours(r.clockIn, r.clockOut, r.break, r.date), 0)
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
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    }
    return true;
  };

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSearch = `${r.name} ${r.role} ${r.department}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      const matchDepartment = departmentFilter === "All Departments" || r.department === departmentFilter;
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
      const hrs = calcHours(r.clockIn, r.clockOut, r.break, r.date);
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
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
      {
        title: "Active Discrepancies",
        value: discrepancies,
        unit: "Days",
        icon: FaExclamationTriangle,
        bg: "bg-orange-50",
        color: "text-orange-600",
      },
      {
        title: "Overtime Hours",
        value: overtime.toFixed(1),
        unit: "hrs",
        icon: FaBolt,
        bg: "bg-green-50",
        color: "text-green-600",
      },
      {
        title: "Pending Approvals",
        value: pending,
        unit: "Tasks",
        icon: FaClipboardCheck,
        bg: "bg-purple-50",
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
        selectedRows.includes(idx) && r.status !== "Absent" ? { ...r, status: "Approved" } : r
      )
    );

    setSelectedRows([]);
    setBulkApproved(true);
    setTimeout(() => setBulkApproved(false), 2000);
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
      "Total Hours": calcHours(r.clockIn, r.clockOut, r.break, r.date).toFixed(2),
      Status: r.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");
    XLSX.writeFile(workbook, "timesheet.xlsx");
  };

  const exportSinglePDF = (r) => {
    const doc = new jsPDF();

    const employeeMonthRecords = records.filter(
      (rec) =>
        rec.role === r.role &&
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
        calcHours(rec.clockIn, rec.clockOut, rec.break, rec.date).toFixed(2),
        rec.status,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Grand Total Hours (${monthName}): ${totalMonthHours} hrs`, 14, finalY);

    doc.save(`${r.name}_Monthly_Timesheet.pdf`);
  };

  const exportSingleExcel = (r) => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        Name: r.name,
        Role: r.role,
        Department: r.department,
        Date: r.date,
        "Clock In": r.clockIn,
        "Clock Out": r.clockOut,
        Break: r.break,
        "Total Hours": calcHours(r.clockIn, r.clockOut, r.break, r.date).toFixed(2),
        Status: r.status,
      },
    ]);

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
      head: [
        ["Name", "ID", "Department", "Date", "Clock In", "Clock Out", "Break", "Hours", "Status"],
      ],
      body: filteredRecords.map((r) => [
        r.name,
        r.role,
        r.department,
        r.date,
        r.clockIn,
        r.clockOut,
        r.break,
        calcHours(r.clockIn, r.clockOut, r.break, r.date).toFixed(2),
        r.status,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Grand Total Hours (${monthName}): ${totalMonthHours} hrs`, 14, finalY);

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
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* header section */}
        <div className="mb-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Time Sheet Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and approve attendance records</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-lg border shadow-sm flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="font-medium text-sm">Super Admin</span>
              </div>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex items-center gap-3 justify-end">
            {isMonthlyView && (
              <button
                onClick={bulkApprove}
                disabled={selectedRows.length === 0}
                className={`px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                  bulkApproved
                    ? "bg-green-600 text-white"
                    : selectedRows.length > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaCheckCircle />
                {bulkApproved ? "Approved!" : `Bulk Approve (${selectedRows.length})`}
              </button>
            )}

            <button onClick={exportPDF} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileAlt className="text-red-600" />
              <span className="font-medium text-sm">PDF</span>
            </button>

            <button onClick={exportExcel} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FaFileExcel className="text-green-600" />
              <span className="font-medium text-sm">Excel</span>
            </button>
          </div>
        </div>

        {/* filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            {["Today", "This Week", "This Month"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map((dep) => (
                <option key={dep}>{dep}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Late">Late</option>
              <option value="On Time">On Time</option>
              <option value="Absent">Absent</option>
            </select>

            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search employee or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${s.bg}`}>
                  <s.icon className={s.color} size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{s.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{s.value}</span>
                    <span className="text-xs text-gray-500">{s.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {isMonthlyView && (
                    <th className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === filteredRecords.length && filteredRecords.length > 0}
                        onChange={(e) =>
                          setSelectedRows(e.target.checked ? filteredRecords.map((_, i) => i) : [])
                        }
                        className="w-4 h-4"
                      />
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-sm font-semibold">Employee</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>

                  {showTimeColumns && (
                    <>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Clock In</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Clock Out</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Break</th>
                    </>
                  )}

                  <th className="px-6 py-3 text-center text-sm font-semibold">Total Hrs</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    {isMonthlyView && (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(i)}
                          onChange={() =>
                            setSelectedRows((prev) =>
                              prev.includes(i) ? prev.filter((id) => id !== i) : [...prev, i]
                            )
                          }
                          className="w-4 h-4"
                        />
                      </td>
                    )}

                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.role}</div>
                    </td>

                    <td className="px-6 py-3 text-sm text-gray-700">{r.department}</td>

                    <td className="px-6 py-3 text-sm text-gray-700">{r.date}</td>

                    {showTimeColumns && (
                      <>
                        <td className="px-6 py-3 text-center text-sm text-gray-700">{r.clockIn}</td>
                        <td className="px-6 py-3 text-center text-sm text-gray-700">{r.clockOut}</td>
                        <td className="px-6 py-3 text-center text-sm text-gray-700">{r.break}</td>
                      </>
                    )}

                    <td className="px-6 py-3 text-center">
                      <span className="font-medium text-gray-900 text-sm">
                        {r.clockIn === "--" ? "--" : calcHours(r.clockIn, r.clockOut, r.break, r.date).toFixed(2)}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[r.status]}`}>
                        {r.status}
                      </span>
                    </td>

                    <td className="px-6 py-3 relative">
                      <div className="flex items-center justify-center gap-3">
                        <FaCheckCircle
                          size={18}
                          className={
                            isMonthlyView
                              ? "text-green-600 cursor-pointer hover:text-green-700"
                              : "text-gray-300 cursor-not-allowed"
                          }
                          onClick={() => isMonthlyView && updateStatus(i, "Approved")}
                        />

                        <FaTimesCircle
                          size={18}
                          className={
                            isMonthlyView
                              ? "text-red-500 cursor-pointer hover:text-red-600"
                              : "text-gray-300 cursor-not-allowed"
                          }
                          onClick={() => isMonthlyView && updateStatus(i, "Pending")}
                        />

                        <FaEllipsisV
                          size={16}
                          className={
                            isMonthlyView
                              ? "text-gray-600 cursor-pointer hover:text-gray-800"
                              : "text-gray-300 cursor-not-allowed"
                          }
                          onClick={() => isMonthlyView && setOpenAction(openAction === i ? null : i)}
                        />

                        {openAction === i && isMonthlyView && (
                          <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg w-32 z-50">
                            <button
                              onClick={() => {
                                exportSinglePDF(r);
                                setOpenAction(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                            >
                              📄 PDF
                            </button>
                            <button
                              onClick={() => {
                                exportSingleExcel(r);
                                setOpenAction(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-t"
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
                    <td colSpan="10" className="px-6 py-10 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}