import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import managerTimeSheetReviewThunk from "../Redux/thunks/ManagerTimeSheetReviewThunk";
import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
  FaBolt,
  FaClipboardCheck,
  FaFileAlt,
  FaFilePdf,
  FaFileExcel,
  FaUser,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const {
  fetchManagerDashboard,
  approveTimeSheet,
  rejectTimeSheet,
  bulkApproveTimeSheet,
  downloadExcel,
  downloadPdf,
} = managerTimeSheetReviewThunk;




export default function SuperAdminPersonalTimeSheet() {
  const [filter, setFilter] = useState("Today");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [localRecords, setLocalRecords] = useState([]);

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.manager?.timeSheetReview || {
      data: [],
      loading: false,
      error: null,
    }

  );
  // console.log("Dashboard API Data:", data);

  const [bulkApproved, setBulkApproved] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    dispatch(fetchManagerDashboard());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const apiRecords = useMemo(() => {
    return data?.data?.table || [];
  }, [data]);
  useEffect(() => {
    setLocalRecords(apiRecords);
  }, [apiRecords]);




  const formatTime = (iso) => {
    if (!iso) return "--";
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalHoursFromRecords = (records) => {
    return records
      .reduce((sum, r) => sum + (r.totalHours || 0), 0)
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
    return localRecords.filter((r) => {

      const matchSearch = `${r.employee?.employeeName || ""} ${r.employee?.workDetails?.department || ""
        }`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || r.approvalStatus === statusFilter;

      const matchDate = matchDateFilter(r.date);
      return matchSearch && matchStatus && matchDate;
    });
  }, [localRecords, search, statusFilter, filter]);


  const stats = useMemo(() => {
    let totalHours = 0;
    let overtime = 0;
    let discrepancies = 0;
    let pending = 0;

    filteredRecords.forEach((r) => {
      const hrs = r.totalHours || 0;

      totalHours += hrs;

      if (hrs > 8) overtime += hrs - 8;

      if (["Late", "Absent"].includes(r.attendanceStatus)) discrepancies++;

      if (r.approvalStatus === "Pending") pending++;

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
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
      {
        title: "Pending Approvals",
        value: pending,
        unit: "Tasks",
        icon: FaClipboardCheck,
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
    ];
  }, [filteredRecords]);

  const updateStatus = async (index, newStatus) => {
    try {
      const record = filteredRecords[index];

      if (!record?._id) return;

      if (newStatus === "Approved") {
        await dispatch(approveTimeSheet(record._id)).unwrap();

        toast.success("Timesheet Approved Successfully ");
      }

      if (newStatus === "Rejected") {
        await dispatch(rejectTimeSheet(record._id)).unwrap();

        toast.error("Timesheet Rejected ");
      }

      dispatch(fetchManagerDashboard());

    } catch (err) {
      console.error("Update failed", err);

      toast.error("Action Failed. Try Again ");
    }
  };




  const bulkApprove = async () => {
    if (!isMonthlyView || selectedRows.length === 0) return;

    try {
      // ✅ Only Pending / Rejected IDs
      const ids = selectedRows
        .map((i) => filteredRecords[i])
        .filter(
          (r) =>
            r?.approvalStatus === "Pending" ||
            r?.approvalStatus === "Rejected"
        )
        .map((r) => r._id);

      // ❌ If nothing valid
      if (ids.length === 0) {
        toast.info("No Pending or Rejected records to approve ");
        return;
      }

      await dispatch(bulkApproveTimeSheet(ids)).unwrap();

      toast.success("Bulk Approved Successfully ");

      dispatch(fetchManagerDashboard());

      setSelectedRows([]);
      setBulkApproved(true);

      setTimeout(() => setBulkApproved(false), 2000);

    } catch (err) {
      console.error("Bulk approve failed:", err);

      toast.error("Bulk Approve Failed ");
    }
  };


  const handleDownloadExcel = async () => {
    try {
      const res = await dispatch(downloadExcel()).unwrap();

      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "manager_timesheet.xlsx";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Download failed:", err);
    }
  };
  const handleDownloadPdf = async () => {
    try {
      const res = await dispatch(downloadPdf()).unwrap();

      const blob = new Blob([res], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "manager_timesheet.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("PDF download failed:", err);
    }
  };


  const exportExcel = () => {
    const worksheetData = filteredRecords.map((r) => ({
      Employee: r.name,
      Department: r.department,
      Location: r.location,
      Date: r.date,
      "Clock In": r.clockIn,
      "Clock Out": r.clockOut,
      "Total Hours": r.totalHours?.toFixed(2) || "0.00",

      Status: r.approvalStatus
      ,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");
    XLSX.writeFile(workbook, "timesheet.xlsx");
  };

  const exportSinglePDF = (r) => {
    const doc = new jsPDF();
    const employeeMonthRecords = localRecords.filter(

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
      head: [["Date", "Clock In", "Clock Out", "Hours", "Status"]],
      body: employeeMonthRecords.map((rec) => [
        rec.date,
        rec.clockIn,
        rec.clockOut,
        rec.totalHours?.toFixed(2) || "0.00",

        rec.status,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] },
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

  const exportSingleExcel = (r) => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        Name: r.name,
        Role: r.role,
        Department: r.department,
        Date: r.date,
        "Clock In": r.clockIn,
        "Clock Out": r.clockOut,
        "Total Hours": r.totalHours?.toFixed(2) || "0.00",

        Status: r.approvalStatus,

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
        ? new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
        : filter;
    const totalMonthHours = getTotalHoursFromRecords(filteredRecords);

    doc.setFontSize(14);
    doc.text("Employee Timesheet Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Period: ${monthName}`, 14, 22);
    doc.text(
      `Total Hours (Entire Period): ${totalMonthHours} hrs`,
      14,
      28
    );

    autoTable(doc, {
      startY: 35,
      head: [
        [
          "Name",
          "ID",
          "Department",
          "Date",
          "Clock In",
          "Clock Out",
          "Hours",
          "Status",
        ],
      ],
      body: filteredRecords.map((r) => [
        r.name,
        r.role,
        r.department,
        r.date,
        r.clockIn,
        r.clockOut,
        r.totalHours?.toFixed(2) || "0.00",

        r.approvalStatus,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-7xl mx-auto space-y-6">
        {loading && (
          <p className="text-center text-blue-600 font-medium">
            Loading timesheet...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </p>
        )}


        {/* header section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Time Sheet Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Manage and approve attendance records
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                <FaUser />
                Super Admin
              </div>
            </div>
          </div>
        </div>
        {/* action buttons */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-blue-100 flex gap-3 items-center flex-wrap">

          {isMonthlyView && (
            <button
              onClick={bulkApprove}
              disabled={selectedRows.length === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${selectedRows.length > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <FaCheckCircle />
              {bulkApproved
                ? "Approved!"
                : `Bulk Approve (${selectedRows.length})`}
            </button>
          )}

          {/* ✅ Show PDF & Excel ONLY for This Month */}
          {isMonthlyView && (
            <>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <FaFilePdf />
                PDF
              </button>

              <button
                onClick={handleDownloadExcel}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <FaFileExcel />
                Excel
              </button>
            </>
          )}

        </div>


        {/* filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-blue-100 space-y-4">
          <div className="flex gap-3 flex-wrap">
            {["Today", "This Week", "This Month"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
              >
                {f}
              </button>
            ))}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Late">Late</option>
              <option value="On Time">On Time</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`${s.bg} rounded-xl p-5 border border-blue-100 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{s.title}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>
                    {s.value}{" "}
                    <span className="text-sm font-normal">{s.unit}</span>
                  </p>
                </div>
                <s.icon className={`text-3xl ${s.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* table */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {isMonthlyView && (
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === filteredRecords.length &&
                          filteredRecords.length > 0
                        }
                        onChange={(e) =>
                          setSelectedRows(
                            e.target.checked
                              ? filteredRecords.map((_, i) => i)
                              : []
                          )
                        }
                        className="w-4 h-4"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  {showTimeColumns && (
                    <>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Clock In
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Clock Out
                      </th>
                    </>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Total Hrs
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {Array.isArray(filteredRecords) &&
                  filteredRecords.map((r, i) => (

                    <tr
                      key={i}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      {isMonthlyView && (
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            disabled={r.approvalStatus === "Approved"}
                            checked={selectedRows.includes(i)}
                            onChange={(e) =>
                              setSelectedRows((prev) =>
                                prev.includes(i)
                                  ? prev.filter((id) => id !== i)
                                  : [...prev, i]
                              )
                            }
                            className="w-4 h-4 disabled:cursor-not-allowed disabled:opacity-50"
                          />

                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-800">
                            {r.employee?.employeeName}

                          </div>
                          <div className="text-xs text-gray-500">
                            {r.employee?.role}
                          </div>

                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {r.employee?.workDetails?.department}

                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {r.date}
                      </td>
                      {showTimeColumns && (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {formatTime(r.clockIn)}

                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {formatTime(r.clockOut)}

                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {r.totalHours?.toFixed(2) || "0.00"}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[r.approvalStatus]
                            }`}
                        >
                          {r.approvalStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center relative">
                          <button
                            onClick={() => isMonthlyView && updateStatus(i, "Approved")}
                            disabled={
                              !isMonthlyView || r.approvalStatus === "Approved"
                            }
                            className={`p-1.5 rounded ${isMonthlyView && r.approvalStatus !== "Approved"
                              ? "text-green-600 hover:bg-green-50"
                              : "text-gray-300 cursor-not-allowed"
                              }`}
                          >
                            <FaCheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => isMonthlyView && updateStatus(i, "Rejected")}
                            disabled={
                              !isMonthlyView || r.approvalStatus === "Rejected"
                            }
                            className={`p-1.5 rounded ${isMonthlyView && r.approvalStatus !== "Rejected"
                              ? "text-orange-600 hover:bg-orange-50"
                              : "text-gray-300 cursor-not-allowed"
                              }`}
                          >
                            <FaTimesCircle size={18} />
                          </button>


                        </div>
                      </td>
                    </tr>
                  ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={isMonthlyView ? 9 : 7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
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