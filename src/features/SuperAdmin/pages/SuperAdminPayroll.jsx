import { useState, useMemo, Fragment } from "react";
import { FaBuilding, FaCalendarAlt, FaSearch, FaLayerGroup } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* Payroll Rules */
const PF_BASE_LOW = 8000;
const PF_BASE_HIGH = 15000;

function calculatePayroll(ctc) {
  const annualCTC = ctc;
  const isLowSlab = annualCTC <= 300000;
  const pfBase = isLowSlab ? PF_BASE_LOW : PF_BASE_HIGH;
  const employerPF = pfBase * 0.13;
  const employeePF = pfBase * 0.12;
  const grossAnnual = annualCTC - employerPF * 12;
  const basicRatio = isLowSlab ? 0.5 : 0.4;
  const hraRatio = 0.5;
  const basicAnnual = grossAnnual * basicRatio;
  const hraAnnual = basicAnnual * hraRatio;
  const conveyanceAnnual = 19200;
  const specialAllowanceAnnual =
  grossAnnual - (basicAnnual + hraAnnual + conveyanceAnnual);
  const grossMonthly = grossAnnual / 12;
  const professionalTax = 200;
  const medicalInsurance = 500;
  const netPay = grossMonthly - (employeePF + professionalTax + medicalInsurance);

  return {
    employerPF,
    employeePF,
    basic: basicAnnual / 12,
    hra: hraAnnual / 12,
    conveyance: conveyanceAnnual / 12,
    specialAllowance: specialAllowanceAnnual / 12,
    professionalTax,
    medicalInsurance,
    gross: grossMonthly,
    netPay,
  };
}

export default function SuperAdminPayroll() {
  /* Dummy Data */
  const employees = [
    { id: "ENG-001", name: "Amit Sharma", designation: "Senior Engineer", department: "Engineering", month: "January", year: "2026", ctc: 500000 },
    { id: "ENG-002", name: "Rohit Kulkarni", designation: "Software Engineer", department: "Engineering", month: "February", year: "2026", ctc: 420000 },
    { id: "ENG-003", name: "Sneha Patil", designation: "Frontend Dev", department: "Engineering", month: "March", year: "2026", ctc: 380000 },
    { id: "ENG-004", name: "Arjun Rao", designation: "Backend Dev", department: "Engineering", month: "January", year: "2025", ctc: 460000 },
    { id: "HR-001", name: "Neha Verma", designation: "HR Manager", department: "HR", month: "January", year: "2026", ctc: 1000000 },
    { id: "HR-002", name: "Kiran Joshi", designation: "HR Executive", department: "HR", month: "February", year: "2026", ctc: 320000 },
    { id: "HR-003", name: "Megha Desai", designation: "Recruiter", department: "HR", month: "March", year: "2025", ctc: 350000 },
    { id: "HR-004", name: "Anjali Singh", designation: "HR Ops", department: "HR", month: "January", year: "2025", ctc: 300000 },
    { id: "SAL-001", name: "Rahul Mehta", designation: "Sales Lead", department: "Sales", month: "January", year: "2026", ctc: 350006 },
    { id: "SAL-002", name: "Nikhil Gupta", designation: "Sales Exec", department: "Sales", month: "February", year: "2026", ctc: 300000 },
    { id: "SAL-003", name: "Pooja Malhotra", designation: "Account Manager", department: "Sales", month: "March", year: "2026", ctc: 390000 },
    { id: "SAL-004", name: "Deepak Yadav", designation: "BD Executive", department: "Sales", month: "January", year: "2025", ctc: 310000 },
    { id: "FIN-001", name: "Pooja Iyer", designation: "Junior Analyst", department: "Finance", month: "January", year: "2026", ctc: 300000 },
    { id: "FIN-002", name: "Suresh Nair", designation: "Finance Analyst", department: "Finance", month: "February", year: "2026", ctc: 420000 },
    { id: "FIN-003", name: "Ritika Shah", designation: "Accounts Officer", department: "Finance", month: "March", year: "2025", ctc: 360000 },
    { id: "FIN-004", name: "Manoj Pillai", designation: "Auditor", department: "Finance", month: "January", year: "2025", ctc: 390000 },
  ];

  const [selectedDept, setSelectedDept] = useState("Select Department");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const payrollData = useMemo(
    () =>
      employees.map((emp) => ({
        ...emp,
        structure: calculatePayroll(emp.ctc),
      })),
    []
  );

  const filteredData = useMemo(() => {
    if (
      selectedDept === "Select Department" ||
      selectedYear === "Select Year" ||
      selectedMonth === "Select Month"
    ) {
      return [];
    }

    return payrollData.filter((emp) => {
      const deptMatch =
        selectedDept === "All" || emp.department === selectedDept;
      const yearMatch = selectedYear === "All" || emp.year === selectedYear;
      const monthMatch = emp.month === selectedMonth;
      const searchMatch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase());

      return deptMatch && yearMatch && monthMatch && searchMatch;
    });
  }, [payrollData, selectedDept, selectedYear, selectedMonth, searchTerm]);

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from(
    { length: 11 },
    (_, i) => currentYear - 5 + i
  );

  /* PDF Generation Functions */
  const generateGlobalReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Payroll Report: ${selectedMonth} ${selectedYear}`, 14, 20);
    doc.setFontSize(11);
    doc.text(`Department: ${selectedDept}`, 14, 30);

    const tableRows = filteredData.map((emp) => [
      emp.id,
      emp.name,
      emp.designation,
      `INR ${emp.ctc.toLocaleString()}`,
      `INR ${Math.round(emp.structure.netPay).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["ID", "Name", "Designation", "CTC", "Net Pay"]],
      body: tableRows,
      theme: "striped",
    });

    doc.save(
      `Payroll_Report_${selectedMonth}_${selectedYear}.pdf`
    );
  };

  const generateIndividualPayslip = (emp) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Revappayya IT Services Pvt Ltd", 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Employee Name: ${emp.name}`, 14, 40);
    doc.text(`Employee ID: ${emp.id}`, 14, 47);
    doc.text(`Designation: ${emp.designation}`, 14, 54);
    doc.text(`Period: ${emp.month} ${emp.year}`, 140, 40);

    const earnings = [
      [
        "Basic Salary",
        Math.round(emp.structure.basic).toLocaleString(),
      ],
      ["HRA", Math.round(emp.structure.hra).toLocaleString()],
      [
        "Conveyance",
        Math.round(emp.structure.conveyance).toLocaleString(),
      ],
      [
        "Special Allowance",
        Math.round(emp.structure.specialAllowance).toLocaleString(),
      ],
    ];

    const deductions = [
      [
        "Employee PF",
        Math.round(emp.structure.employeePF).toLocaleString(),
      ],
      [
        "Professional Tax",
        Math.round(emp.structure.professionalTax).toLocaleString(),
      ],
      [
        "Medical Insurance",
        Math.round(emp.structure.medicalInsurance).toLocaleString(),
      ],
    ];

    autoTable(doc, {
      startY: 65,
      head: [["Earnings", "Amount (INR)"]],
      body: earnings,
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Deductions", "Amount (INR)"]],
      body: deductions,
    });

    doc.setFontSize(14);
    doc.text(
      `Net Pay: INR ${Math.round(
        emp.structure.netPay
      ).toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    doc.save(`Payslip_${emp.name}_${emp.month}.pdf`);
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
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
                {[ "January", "February", "March","April", "May", "June", "July", "August", "September", "October","November","December",
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
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] w-[280px] max-w-[320px] min-w-[220px] font-medium placeholder:text-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"/>
            </div>
          </div>

          <button
            onClick={generateGlobalReport}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition-all text-[13px] whitespace-nowrap">
            ⬇ Download Report
          </button>
        </div>
      </div>

      {/* Table */}
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
            {filteredData.map((emp) => (
              <Fragment key={emp.id + emp.month + emp.year}>
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
                    ₹{" "}
                    {Math.round(
                      emp.structure.netPay
                    ).toLocaleString()}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === emp.id ? null : emp.id
                        )
                      }
                      className="p-2 rounded-lg bg-grey-50 text-grey-600 hover:bg-indigo-100 hover:scale-105 transition-all shadow-sm"
                      title="View Payroll Details"
                    >
                      <FaEye size={14} />
                    </button>
                  </td>
                </tr>

                {expandedId === emp.id && (
                  <tr className="bg-indigo-50/40">
                    <td colSpan={6} className="p-6">
                      <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-[12.5px]">
                        <PayRow
                          label="Basic"
                          value={emp.structure.basic}
                        />
                        <PayRow
                          label="HRA"
                          value={emp.structure.hra}
                        />
                        <PayRow
                          label="Conveyance"
                          value={emp.structure.conveyance}
                        />
                        <PayRow
                          label="Special Allowance"
                          value={
                            emp.structure.specialAllowance
                          }
                        />
                        <PayRow
                          label="Employer PF"
                          value={emp.structure.employerPF}
                        />
                        <PayRow
                          label="Employee PF"
                          value={emp.structure.employeePF}
                        />
                        <PayRow
                          label="Professional Tax"
                          value={
                            emp.structure.professionalTax
                          }
                        />
                        <PayRow
                          label="Medical Insurance"
                          value={
                            emp.structure.medicalInsurance
                          }
                        />
                        <PayRow
                          label="Gross"
                          value={emp.structure.gross}
                          highlight
                        />
                        <PayRow
                          label="Net Pay"
                          value={emp.structure.netPay}
                          highlight
                        />

                        <div className="col-span-full flex justify-between items-center pt-4 border-t">
                          <span className="text-gray-500 text-[12px] font-medium">
                            CTC: ₹{" "}
                            {emp.ctc.toLocaleString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              generateIndividualPayslip(emp);
                            }}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-[12px] font-semibold shadow hover:scale-[1.03] transition">
                            ⬇ Generate Payslip
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
          highlight
            ? "text-emerald-700"
            : "text-gray-800"
        }`}
      >
        ₹ {Math.round(value).toLocaleString()}
      </span>
    </div>
  );
}
