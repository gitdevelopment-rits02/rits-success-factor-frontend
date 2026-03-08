import { useState, useMemo, useEffect, useRef, useCallback, Fragment } from "react";
import { FaBuilding, FaCalendarAlt, FaSearch, FaLayerGroup } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayrollListThunk,
  fetchPayrollBreakdownThunk,
  fetchPayslipPdfThunk,
  fetchPayrollReportThunk,
} from "../Redux/thunks/superAdminPayrollThunk";
import SuperAdminPayrollSkeleton from "../SuperAdminSkeleton/SuperAdminPayrollSkeleton";

const PAGE_SIZE = 10;

export default function SuperAdminPayroll() {
  const dispatch = useDispatch();

  const [pageLoading, setPageLoading] = useState(true);

  /* Redux selectors */
  const payrollList = useSelector(
    (state) => state.superAdmin?.payroll?.payrollList || []
  );
  const loading = useSelector(
    (state) => state.superAdmin?.payroll?.loading || false
  );
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (loading && payrollList.length === 0) {
      setShowSkeleton(true);
    } else {
      const timer = setTimeout(() => setShowSkeleton(false), 800);
      return () => clearTimeout(timer);
    }
  }, [loading, payrollList]);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [selectedDept, setSelectedDept] = useState("Select Department");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* ── Infinite scroll state ── */
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const sentinelRef = useRef(null);

  const monthMap = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };

  const getPayrollList = () => {
    if (selectedMonth === "Select Month" || selectedYear === "Select Year") return;
    dispatch(fetchPayrollListThunk({ month: monthMap[selectedMonth], year: selectedYear }));
  };

  useEffect(() => {
    if (selectedMonth !== "Select Month" && selectedYear !== "Select Year") {
      getPayrollList();
    }
  }, [selectedMonth, selectedYear]);

  const payrollData = useMemo(() => {
    if (!Array.isArray(payrollList)) return [];
    return payrollList.map((emp) => ({
      payrollId: emp.payrollId,
      id: emp.employeeId,
      name: emp.employeeName,
      designation: emp.designation,
      department: emp.department,
      ctc: emp.ctc,
      netPay: emp.netPay,
      month: selectedMonth,
      year: selectedYear,
    }));
  }, [payrollList, selectedMonth, selectedYear]);

  const breakdownMap = useSelector(
    (state) => state.superAdmin?.payroll?.breakdownMap || {}
  );

  const handleViewBreakdown = (emp) => {
    setExpandedId(expandedId === emp.id ? null : emp.id);
    if (!breakdownMap[emp.payrollId]) {
      dispatch(fetchPayrollBreakdownThunk(emp.payrollId));
    }
  };

  const filteredData = useMemo(() => {
    if (
      selectedDept === "Select Department" ||
      selectedYear === "Select Year" ||
      selectedMonth === "Select Month"
    ) {
      return payrollData;
    }
    return payrollData.filter((emp) => {
      const deptMatch = selectedDept === "All" || emp.department === selectedDept;
      const searchMatch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(emp.id || "").toLowerCase().includes(searchTerm.toLowerCase());
      return deptMatch && searchMatch;
    });
  }, [payrollData, selectedDept, searchTerm]);

  /* Reset visible count whenever filters / search change */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedDept, selectedMonth, selectedYear, searchTerm]);

  /* Slice only what should be visible */
  const visibleData = useMemo(
    () => filteredData.slice(0, visibleCount),
    [filteredData, visibleCount]
  );

  const hasMore = visibleCount < filteredData.length;

  /* ── IntersectionObserver – load more when sentinel enters viewport ── */
  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingMore) return;
    setIsFetchingMore(true);
    // Small artificial delay so the spinner is visible (remove if undesired)
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsFetchingMore(false);
    }, 400);
  }, [hasMore, isFetchingMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  /* PDF functions */
  const generateIndividualPayslip = async (emp) => {
    try {
      const result = await dispatch(fetchPayslipPdfThunk(emp.payrollId));
      if (fetchPayslipPdfThunk.rejected.match(result)) {
        alert("Failed to generate payslip from backend");
        return;
      }
      const pdfBlob = result.payload.pdfBlob;
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Payslip_${emp.id}_${emp.month}_${emp.year}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Error downloading payslip");
    }
  };

  const handleDownloadReport = async () => {
    if (selectedMonth === "Select Month" || selectedYear === "Select Year") {
      alert("Please select month and year first.");
      return;
    }
    const monthNumber = monthMap[selectedMonth];
    try {
      const result = await dispatch(
        fetchPayrollReportThunk({ month: monthNumber, year: selectedYear })
      ).unwrap();
      const url = window.URL.createObjectURL(result.fileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Payroll_Report_${selectedMonth}_${selectedYear}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Report download failed:", err);
      alert("Failed to download report.");
    }
  };

  if (pageLoading) return <SuperAdminPayrollSkeleton />;

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative border border-blue-100">
        <div className="absolute top-5 right-5">
          <span className="text-[11px] px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg tracking-wide">
            Super Admin
          </span>
        </div>

        <h1 className="text-[28px] font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Payroll Overview
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">Employee Payroll Engine</p>

        {/* <div className="flex items-center gap-4 mt-7 w-full">
          <div className="flex gap-3 items-center shrink-0"> */}
        <div className="flex flex-col gap-3 mt-7 w-full">
          <div className="flex flex-wrap gap-3 items-center w-full">

            {/* Department */}
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              >
                <option value="Select Department">Select Department</option>
                <option value="All">All Departments</option>
                <option value="IT">IT</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            {/* Year */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              >
                <option value="Select Year">Select Year</option>
                <option value="All">All Years</option>
                {yearRange.map((year) => (
                  <option key={year} value={String(year)}>{year}</option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div className="relative">
              <FaLayerGroup className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              >
                <option value="Select Month">Select Month</option>
                {["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-100 text-sm" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] w-[280px] sm:w-[320px] min-w-[220px] font-medium placeholder:text-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleDownloadReport}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition-all text-[13px] w-full sm:w-auto"
          >
            ⬇ Download Report
          </button>
        </div>
      </div>

      {/* TABLE */}
      {/* <div className="mt-10 bg-white/95 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-blue-100">
        <table className="w-full text-[13.5px] table-fixed"> */}
      <div className="mt-10 bg-white/95 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-x-auto border border-blue-100">
        <table className="w-full text-[13.5px] min-w-[640px]">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <tr>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[12%]">Employee ID</th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[22%]">Employee Name</th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">Designation</th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">CTC</th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">Net Pay</th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">View Breakdown</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton while fetching from API */}
            {showSkeleton && (
              <>
                <PayrollSkeletonRow />
                <PayrollSkeletonRow />
                <PayrollSkeletonRow />
                <PayrollSkeletonRow />
                <PayrollSkeletonRow />
              </>
            )}

            {!showSkeleton &&
              visibleData.map((emp) => {
                const structure = breakdownMap[emp.payrollId];

                return (
                  <Fragment key={emp.payrollId}>
                    <tr className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 font-semibold text-indigo-600 text-center">{emp.id}</td>
                      <td className="p-4 font-medium text-gray-900 text-center">{emp.name}</td>
                      <td className="p-4 text-gray-600 text-center">{emp.designation}</td>
                      <td className="p-4 font-medium text-center">₹ {emp.ctc.toLocaleString()}</td>
                      <td className="p-4 font-bold text-emerald-700 text-center">
                        ₹ {Math.round(emp.netPay).toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleViewBreakdown(emp)}
                          className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-indigo-100 hover:scale-105 transition-all shadow-sm"
                          title="View Payroll Details"
                        >
                          <FaEye size={14} />
                        </button>
                      </td>
                    </tr>

                    {/* Breakdown row */}
                    {expandedId === emp.id && structure && (
                      <tr className="bg-indigo-50/40">
                        <td colSpan={6} className="p-6">
                          <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-[12.5px]">
                            <PayRow label="Basic" value={structure.basic} />
                            <PayRow label="HRA" value={structure.hra} />
                            <PayRow label="Conveyance" value={structure.conveyance} />
                            <PayRow label="Special Allowance" value={structure.specialAllowance} />
                            <PayRow label="Employer PF" value={structure.employerPF} />
                            <PayRow label="Employee PF" value={structure.employeePF} />
                            <PayRow label="Professional Tax" value={structure.professionalTax} />
                            <PayRow label="Medical Insurance" value={structure.medicalInsurance} />
                            <PayRow label="Gross" value={structure.gross} highlight />
                            <PayRow label="Net Pay" value={structure.netPay} highlight />

                            <div className="col-span-full flex justify-between items-center pt-4 border-t">
                              <span className="text-gray-500 text-[12px] font-medium">
                                CTC: ₹ {emp.ctc.toLocaleString()}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  generateIndividualPayslip(emp);
                                }}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-[12px] font-semibold shadow hover:scale-[1.03] transition"
                              >
                                ⬇ Generate Payslip
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* ── Infinite scroll sentinel & spinner ── */}
      <div ref={sentinelRef} className="flex justify-center items-center py-6">
        {isFetchingMore && (
          <div className="flex items-center gap-2 text-indigo-500 text-[13px] font-medium">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Loading more…
          </div>
        )}
        {!hasMore && !showSkeleton && filteredData.length > 0 && (
          <p className="text-[12px] text-gray-400 font-medium">
            Showing all {filteredData.length} records
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Helper components (unchanged) ── */

function PayrollSkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div></td>
      <td className="p-4"><div className="h-8 bg-gray-200 rounded w-8 mx-auto"></div></td>
    </tr>
  );
}

function PayRow({ label, value, highlight }) {
  return (
    <div
      className={`flex justify-between items-center px-3 py-2.5 rounded-lg border ${highlight ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
        }`}
    >
      <span className="text-gray-600 font-medium">{label}</span>
      <span className={`font-bold ${highlight ? "text-emerald-700" : "text-gray-800"}`}>
        ₹ {Math.round(value).toLocaleString()}
      </span>
    </div>
  );
}