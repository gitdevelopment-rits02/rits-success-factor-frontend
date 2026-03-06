import { useState, useMemo, useEffect, Fragment } from "react";
import { FaBuilding, FaCalendarAlt, FaSearch, FaLayerGroup } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayrollListThunk,  fetchPayrollBreakdownThunk,  fetchPayslipPdfThunk, fetchPayrollReportThunk  } from "../Redux/thunks/superAdminPayrollThunk";
import SuperAdminPayrollSkeleton from "../SuperAdminSkeleton/SuperAdminPayrollSkeleton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyLogo from "../../../assets/companyLogo.png";

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};
const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
export default function SuperAdminPayroll() {
  const dispatch = useDispatch();

  const [pageLoading, setPageLoading] = useState(true);

  /*  Redux selectors  */
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
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 800);

    return () => clearTimeout(timer);
  }
}, [loading, payrollList]);

useEffect(() => {
  const timer = setTimeout(() => {
    setPageLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);




  const [selectedDept, setSelectedDept] = useState("Select Department");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;



  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const getPayrollList = () => {
    if (
      selectedMonth === "Select Month" ||
      selectedYear === "Select Year"
    )
      return;

    const monthNumber = monthMap[selectedMonth];

    dispatch(
      fetchPayrollListThunk({
        month: monthNumber,
        year: selectedYear,
      })
    );
  };

  useEffect(() => {
    if (
      selectedMonth !== "Select Month" &&
      selectedYear !== "Select Year"
    ) {
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
    const deptMatch =
      selectedDept === "All" || emp.department === selectedDept;

    const searchMatch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(emp.id || "").toLowerCase()
  .includes(searchTerm.toLowerCase());


    return deptMatch && searchMatch;
  });
}, [payrollData, selectedDept,  searchTerm]);


useEffect(() => {
  if (currentPage !== 1) {
    setCurrentPage(1);
  }
}, [selectedDept, selectedMonth, selectedYear, searchTerm]);



const paginatedData = useMemo(() => {
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return filteredData.slice(startIndex, endIndex);
}, [filteredData, currentPage]);


const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);



useEffect(() => {
  if (totalPages > 0 && currentPage > totalPages) {
    setCurrentPage(prev =>
      prev > totalPages ? totalPages : prev
    );
  }
}, [totalPages]);


  const currentYear = new Date().getFullYear();
  const yearRange = Array.from(
    { length: 11 },
    (_, i) => currentYear - 5 + i
  );

 const generateIndividualPayslip = async (emp) => {
  try {

    const result = await dispatch(fetchPayslipPdfThunk(emp.payrollId)).unwrap();

    const { employee, payrollPeriod, earnings, deductions, netPay } = result;

    const doc = new jsPDF();
    const monthName = monthNames[payrollPeriod.month];
const periodText = `${monthName} ${payrollPeriod.year}`;
    /* LOAD LOGO */
    const logoImg = await loadImage(companyLogo);

    doc.addImage(logoImg, "PNG", 7, -3, 48, 34);

    /* COMPANY NAME */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Revappayya IT Services Pvt Ltd", 64, 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text(
      "HO: Shree Shaila Nilaya, 13th Cross, 22nd Main Road,",
      14,
      22
    );

    doc.text(
      "Virat Nagar, Bommanahalli, Bangalore, KA 560068, India",
      14,
      27
    );

    doc.text(
      "RO: Unit no-2201A, 22nd floor, WTC Bangalore, Brigade Gateway, Bangalore - 560055",
      14,
      32
    );
    doc.text(
      "Email: support@revappayyaitservices.com | www.revappayyaitservices.com",
      14,37);

    doc.line(14, 40, 196, 40);

    doc.setFontSize(11);

    doc.text(
      `Salary Slip for the month of ${periodText}`,
      105,
      48,
      { align: "center" }
    );

    /* EMPLOYEE TABLE */

    autoTable(doc, {
      startY: 52,
      theme: "grid",
      styles: { fontSize: 8 },
      body: [
        ["Name", employee.employeeName, "Period", periodText],
        ["Designation", employee.designation, "Employee ID", employee.employeeNo],
        ["Department", "", "Bank A/C", ""],
        ["Payment Mode", "Bank Transfer", "No of Days", ""],
      ],
    });

    /* SALARY TABLE */

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid",
      styles: { fontSize: 8 },
      head: [["Earnings", "Amount (Rs)", "Deductions", "Amount (Rs)"]],
      body: [
        ["Basic", earnings.basic, "PF - Employee", deductions.employeePF],
        ["HRA", earnings.hra, "Professional Tax", deductions.professionalTax],
        ["Conveyance", earnings.conveyance, "Medical Insurance", deductions.medicalInsurance],
        ["Special Allowance", earnings.specialAllowance, "", ""],
        [
          "Gross Salary",
          earnings.gross,
          "Total Deductions",
          deductions.employeePF +
            deductions.professionalTax +
            deductions.medicalInsurance,
        ],
      ],
    });

    const netY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(11);

    doc.text(
      `Net Salary : Rs ${netPay.toLocaleString()}`,
      14,
      netY
    );

    doc.text(
      `Total CTC (Per Year) : Rs ${earnings.totalCTC.toLocaleString()}`,
      130,
      netY
    );

    doc.setFontSize(7);

    doc.text(
      "This is a computer generated slip and does not require signature.",
      14,
      netY + 12
    );

    doc.text(
      "This document contains confidential information.",
      14,
      netY + 17
    );

    doc.save(
      `Payslip_${employee.employeeName}_${periodText}.pdf`
    );

  } catch (err) {
    console.error("PDF generation error:", err);
  }
};


const handleDownloadReport = async () => {
  if (
    selectedMonth === "Select Month" ||
    selectedYear === "Select Year"
  ) {
    alert("Please select month and year first.");
    return;
  }

  const monthNumber = monthMap[selectedMonth];

  try {
    const result = await dispatch(
      fetchPayrollReportThunk({
        month: monthNumber,
        year: selectedYear,
      })
    ).unwrap();

    // Convert blob to downloadable file
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


if (pageLoading) {
  return <SuperAdminPayrollSkeleton />;
}

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">



      {/*  Header  */}
      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative border border-blue-100">
        <div className="absolute top-5 right-5">
          <span className="text-[11px] px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg tracking-wide">
            Super Admin
          </span>
        </div>

        <h1 className="text-[28px] font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Payroll Overview
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">
          Employee Payroll Engine
        </p>

        <div className="flex items-center gap-4 mt-7 w-full">
          <div className="flex gap-3 items-center shrink-0">

            {/* Department */}
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              >
                <option value="Select Department">
                  Select Department
                </option>
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
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all">
                <option value="Select Year">Select Year</option>
                <option value="All">All Years</option>
                {yearRange.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div className="relative">
              <FaLayerGroup className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all">
                <option value="Select Month">Select Month</option>
                {[
                  "January","February","March","April","May","June",
                  "July","August","September","October","November","December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
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
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] w-[280px] max-w-[320px] min-w-[220px] font-medium placeholder:text-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <button      
  onClick={handleDownloadReport}

            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition-all text-[13px] whitespace-nowrap">
            ⬇ Download Report
          </button>
        </div>
      </div>

      {/*  TABLE  */}
      <div className="mt-10 bg-white/95 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-blue-100">
        <table className="w-full text-[13.5px] table-fixed">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <tr>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[12%]">
                Employee ID
              </th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[22%]">
                Employee Name
              </th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">
                Designation
              </th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">
                CTC
              </th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">
                Net Pay
              </th>
              <th className="p-4 text-center font-bold text-gray-700 text-[14px] tracking-wide w-[18%]">
                View Breakdown
              </th>
            </tr>
          </thead>
<tbody>

  {/* Skeleton while fetching */}
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
    paginatedData.map((emp) => {
      const structure = breakdownMap[emp.payrollId];

      return (
        <Fragment key={emp.payrollId}>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="p-4 font-semibold text-indigo-600 text-center">
              {emp.id}
            </td>

            <td className="p-4 font-medium text-gray-900 text-center">
              {emp.name}
            </td>

            <td className="p-4 text-gray-600 text-center">
              {emp.designation}
            </td>

            <td className="p-4 font-medium text-center">
              ₹ {emp.ctc.toLocaleString()}
            </td>

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



          {/* Breakdown row when data is available */}
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
      {totalPages > 1 && (
  <div className="flex justify-center items-center gap-3 mt-4 mb-2">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(p => p - 1)}
      className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50"
    >
      ◀ Prev
    </button>

    <span className="text-sm font-medium">
      Page {currentPage} of {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(p => p + 1)}
      className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50"
    >
      Next ▶
    </button>
  </div>
)}

    </div>

  );
}

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
      className={`flex justify-between items-center px-3 py-2.5 rounded-lg border ${
        highlight
          ? "bg-emerald-50 border-emerald-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <span className="text-gray-600 font-medium">{label}</span>
      <span
        className={`font-bold ${
          highlight ? "text-emerald-700" : "text-gray-800"
        }`}
      >
        ₹ {Math.round(value).toLocaleString()}
      </span>
    </div>
  );
}
 