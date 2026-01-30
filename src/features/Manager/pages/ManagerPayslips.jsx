import { useState, useMemo } from "react";
import { FaDownload, FaEye, FaListUl } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaCalendarAlt } from "react-icons/fa";
import bgWave from "../../../assets/background.png";
import manpng from "../../../assets/man.png";
import companyLogo from "../../../assets/companyLogo.png";;

/*  Payroll Engine  */
const PF_BASE_LOW = 8000;
const PF_BASE_HIGH = 15000;

function calculatePayroll(ctc) {
  const annualCTC = Number(ctc);
  const isLowSlab = annualCTC <= 300000;
  const pfBase = isLowSlab ? PF_BASE_LOW : PF_BASE_HIGH;

  const employerPF = pfBase * 0.13;
  const employeePF = pfBase * 0.12;

  const grossAnnual = annualCTC - (employerPF * 12);

  const basicRatio = isLowSlab ? 0.5 : 0.4;
  const basicAnnual = grossAnnual * basicRatio;
  const hraAnnual = basicAnnual * 0.5;
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

/* Data  */

const employeeProfile = {
  id: "EMP-003",
  name: "Rahul Sharma",
  designation: "Senior Software Engineer",
  department: "Product Engineering",
  salaryHistory: {
    "2025-11": 600000,
    "2025-12": 600000,
    "2026-01": 800000,
  },
  defaultCTC: 800000,
};

const monthMap = {
  January: "01",
  November: "11",
  December: "12",
  February: "02",
  March : "03",

};
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

function getCTCByDate(year, month) {
  const key = `${year}-${monthMap[month]}`;
  return employeeProfile.salaryHistory[key] || employeeProfile.defaultCTC;
}

/* Component  */
export default function EmployeePayrollUI() {
  const [selectedMonth] = useState("January");
  const [selectedYear] = useState("2026");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [historyYear, setHistoryYear] = useState("All");
  const [modalData, setModalData] = useState(null);

  const currentCTC = useMemo(
    () => getCTCByDate(selectedYear, selectedMonth),
    [selectedMonth, selectedYear]
  );

  const structure = useMemo(
    () => calculatePayroll(currentCTC),
    [currentCTC]
  );

  const history = [
    { month: "January", year: "2026", status: "Paid" },
    { month: "December", year: "2025", status: "Paid" },
    { month: "November", year: "2025", status: "Paid" },
  ].map(h => {
    const ctc = getCTCByDate(h.year, h.month);
    const s = calculatePayroll(ctc);
    return { ...h, gross: s.gross, net: s.netPay, struct: s };
  });

  const filteredHistory =
    historyYear === "All"
      ? history
      : history.filter(h => h.year === historyYear);

  /* PDF  */
const downloadPDF = async (data) => {
const doc = new jsPDF();
const logoImg = await loadImage(companyLogo);
doc.addImage(logoImg, "PNG", 7, -3, 48, 34);
doc.setFont("helvetica", "bold");
doc.setFontSize(16);  
doc.text("Revappayya IT Services Pvt Ltd", 64, 12);

doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("HO: Shree Shaila Nilaya, 13th Cross, 22nd Main Road,", 14, 22);
    doc.text("Virat Nagar, Bommanahalli, Bangalore, KA 560068, India", 14, 27);
    doc.text("RO: Unit no-2201A, 22nd floor, WTC Bangalore, Brigade Gateway, Bangalore - 560055", 14, 32);
    doc.text("Email: support@revappayyaitservices.com | www.revappayyaitservices.com", 14, 37);
    doc.line(14, 40, 196, 40);
    doc.setFontSize(11);
    doc.text(`Salary Slip for the month of ${data.month} ${data.year}`, 105, 48, { align: "center" });

    doc.setFontSize(9);
    autoTable(doc, {
      startY: 52,
      theme: "grid",
      styles: { fontSize: 8 },
      body: [
        ["Name", employeeProfile.name, "Period", `${data.month} ${data.year}`],
        ["Designation", employeeProfile.designation, "Employee ID", employeeProfile.id],
        ["Department", employeeProfile.department, "Bank A/C", "XXXX1234"],
        ["Payment Mode", "Bank Transfer", "No of Days", "30"],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid",
      styles: { fontSize: 8 },
      head: [["Earnings", "Amount (Rs)", "Deductions", "Amount (Rs)"]],
      body: [
        ["Basic", Math.round(data.struct.basic), "PF - Employee", Math.round(data.struct.employeePF)],
        ["HRA", Math.round(data.struct.hra), "Professional Tax", 200],
        ["Conveyance", Math.round(data.struct.conveyance), "Medical Insurance", 500],
        ["Special Allowance", Math.round(data.struct.specialAllowance), "", ""],
        ["Gross Salary", Math.round(data.gross), "Total Deductions", Math.round(data.struct.employeePF + 700)],
      ],
    });

   const netY = doc.lastAutoTable.finalY + 10;

doc.setFontSize(11);
doc.text(
  `Net Salary : Rs ${Math.round(data.net).toLocaleString()}`,
  14,
  netY
);

doc.setFontSize(11);
doc.text(
  `Total CTC (Per Year) : Rs ${Math.round(getCTCByDate(data.year, data.month)).toLocaleString()}`,
  130,   
  netY
);
    doc.setFontSize(7);
    doc.text("This is a computer generated slip and does not require signature.", 14, doc.lastAutoTable.finalY + 20);
    doc.text("This document contains confidential information. If you are not the intended recipient you are not authorised to use or disclose it.", 14, doc.lastAutoTable.finalY + 25);
    doc.save(`Payslip_${data.month}_${data.year}.pdf`);
  };

  /* Year-wise PDF Download  */
const downloadYearPDF = async (year) => {
const doc = new jsPDF();
const yearData =
    year === "All"
      ? history
      : history.filter(h => h.year === year);
const logoImg = await loadImage(companyLogo);
yearData.forEach((data, index) => {
    if (index !== 0) doc.addPage();   

    /* HEADER */
doc.addImage(logoImg, "PNG", 7, -3, 48, 34);
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Revappayya IT Services Pvt Ltd", 64, 12);

// address 
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
 doc.text("HO: Shree Shaila Nilaya, 13th Cross, 22nd Main Road,", 14, 22);
    doc.text("Virat Nagar, Bommanahalli, Bangalore, KA 560068, India", 14, 27);
    doc.text("RO: Unit no-2201A, 22nd floor, WTC Bangalore, Brigade Gateway, Bangalore - 560055", 14, 32);
    doc.text("Email: support@revappayyaitservices.com | www.revappayyaitservices.com", 14, 37);
    doc.line(14, 40, 196, 40);


    /* TITLE  */
    doc.setFontSize(11);
    doc.text(`Salary Slip for the month of ${data.month} ${data.year}`, 105, 48, { align: "center" });

    /*  EMPLOYEE INFO TABLE  */
    doc.setFontSize(9);
    autoTable(doc, {
      startY: 52,
      theme: "grid",
      styles: { fontSize: 8 },
      body: [
        ["Name", employeeProfile.name, "Period", `${data.month} ${data.year}`],
        ["Designation", employeeProfile.designation, "Employee ID", employeeProfile.id],
        ["Department", employeeProfile.department, "Bank A/C", "XXXX1234"],
        ["Payment Mode", "Bank Transfer", "No of Days", "30"],
      ],
    });

    /*  SALARY TABLE */
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      theme: "grid",
      styles: { fontSize: 8 },
      head: [["Earnings", "Amount (Rs)", "Deductions", "Amount (Rs)"]],
      body: [
        ["Basic", Math.round(data.struct.basic), "PF - Employee", Math.round(data.struct.employeePF)],
        ["HRA", Math.round(data.struct.hra), "Professional Tax", 200],
        ["Conveyance", Math.round(data.struct.conveyance), "Medical Insurance", 500],
        ["Special Allowance", Math.round(data.struct.specialAllowance), "", ""],
        ["Gross Salary", Math.round(data.gross), "Total Deductions", Math.round(data.struct.employeePF + 700)],
      ],
    });

    /*  NET + CTC  */
    const netY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(
      `Net Salary : Rs ${Math.round(data.net).toLocaleString()}`,
      14,
      netY
    );

    doc.text(
      `Total CTC (Per Year) : Rs ${Math.round(getCTCByDate(data.year, data.month)).toLocaleString()}`,
      130,
      netY
    );

    /*  FOOTER  */
    doc.setFontSize(7);
    doc.text(
      "This is a computer generated slip and does not require signature.",
      14,
      netY + 12
    );
    doc.text(
      "This document contains confidential information. If you are not the intended recipient you are not authorised to use or disclose it.",
      14,
      netY + 17
    );
  });

  doc.save(`Payslips_${year === "All" ? "All_Years" : year}.pdf`);
};
  return (
     <div
      className="min-h-screen p-6 font-sans text-slate-800"
      style={{
        backgroundImage: `url(${bgWave})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
       <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-8">
  <div className="flex items-center gap-6">
    <img
      src={manpng}
      className="w-20 h-20 rounded-2xl ring-2 ring-indigo-300"
    />
    <div>
      <h1 className="text-2xl font-semibold text-slate-800">{employeeProfile.name}</h1>
      <p className="text-base text-slate-500">{employeeProfile.designation}</p>
      <p className="text-sm text-slate-400">{employeeProfile.id}</p>
    </div>
  </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-slate-400">Payroll Period</p>
            <p className="text-2xl font-bold text-indigo-600">{selectedMonth} {selectedYear}</p>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPI className="bg-slate-50" title="Gross Salary" value={structure.gross} />
          <KPI className="bg-slate-50" title="Deductions" value={structure.employeePF + 700} />
          <KPI className="bg-slate-50" title="Net Pay" value={structure.netPay}  />
          <KPI className="bg-slate-50" title="Total CTC" value={currentCTC} annual />
        </div>

        {/* Salary Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Salary Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Earnings</p>
              <Row label="Basic" value={structure.basic} />
              <Row label="HRA" value={structure.hra} />
              <Row label="Conveyance" value={structure.conveyance} />
              <Row label="Special Allowance" value={structure.specialAllowance} />
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                <span>Total Gross</span>
                <span>₹{Math.round(structure.gross).toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-red-50/40 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Deductions</p>
              <Row label="Provident Fund" value={structure.employeePF} neg />
              <Row label="Professional Tax" value={200} neg />
              <Row label="Medical Insurance" value={500} neg />
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-red-600">
                <span>Total Deductions</span>
                <span>- ₹{Math.round(structure.employeePF + 700).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-sm text-slate-500">Net Pay = Gross − Deductions</span>
            <span className="text-2xl font-bold text-indigo-600">₹{Math.round(structure.netPay).toLocaleString()}</span>
          </div>
        </div>

{/* Attendance Summary */}
<div className="bg-white rounded-3xl p-6 shadow-lg">
  <h3 className="text-lg font-semibold text-slate-700 mb-6">
    Attendance Summary
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
    <div className="bg-slate-50 rounded-2xl p-4 text-center">
      <p className="text-semibold text-slate-400">Working Days</p>
      <p className="text-xl font-bold text-slate-800">30</p>
    </div>

    <div className="bg-green-50 rounded-2xl p-4 text-center">
      <p className="text-semibold text-slate-400">Days Present</p>
      <p className="text-xl font-bold text-green-600">28</p>
    </div>

    <div className="bg-yellow-50 rounded-2xl p-4 text-center">
      <p className="text-semibold text-slate-400">Leaves Taken</p>
      <p className="text-xl font-bold text-yellow-600">2</p>
    </div>

    <div className="bg-red-50 rounded-2xl p-4 text-center">
      <p className="text-semibold text-slate-400">Leave Without Pay</p>
      <p className="text-xl font-bold text-red-600">0</p>
    </div>

    <div className="bg-indigo-50 rounded-2xl p-4 text-center">
      <p className="text-semibold text-slate-400">Overtime Hours</p>
      <p className="text-xl font-bold text-indigo-600">12</p>
    </div>
  </div>
</div>

        {/* History */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
   <div className="flex items-center mb-4">
  <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-700">
    <FaListUl className="text-indigo-500" /> Payment History
  </h3>


  <div className="ml-auto flex items-center gap-6">
    {/* Year dropdown */}
    <div className="relative">
      <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
      <select
        value={historyYear}
        onChange={(e)=>setHistoryYear(e.target.value)}
        className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
      >
        <option value="All">All Years</option>
        {[...new Set(history.map(h=>h.year))].map(y=> (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>

    {/* Download button */}
    <button
      onClick={()=>downloadYearPDF(historyYear)}
      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
      title={`Download ${historyYear} payslips`}
    >
      <FaDownload className="text-xl" />
      <span className="text-sm font-medium">
        {historyYear === "All" ? "Download All" : `Download ${historyYear}`}
      </span>
    </button>

  </div>
</div>
  {/* Desktop Table */}
<div className="hidden md:block overflow-x-auto">
  <table className="w-full text-sm table-fixed border-separate border-spacing-y-2">
    <thead className="text-slate-500 text-[15px] font-semibold">
      <tr>
        <th className="text-center px-4 w-[15%]">Month</th>
        <th className="text-center px-4 w-[20%]">Net Pay</th>
        <th className="text-center px-4 w-[15%]">Status</th>
        <th className="text-center px-4 w-[15%]">View</th>
        <th className="text-center px-4 w-[15%]">Download</th>
      </tr>
    </thead>

    <tbody>
      {filteredHistory.map((h,i)=> (
        <tr
          key={i}
          className="bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition">
          
          <td className="px-4 py-3 text-center rounded-l-xl">
            <div className="font-medium">{h.month}</div>
            <div className="text-xs text-slate-400">{h.year}</div>
          </td>

          <td className="px-4 py-3 text-center font-semibold">
            ₹{Math.round(h.net).toLocaleString()}
          </td>

          <td className="px-4 py-3 text-center text-green-600 font-medium">
            {h.status}
          </td>

          <td className="px-4 py-3 text-center">
            <button
              onClick={()=>{setModalData(h);setShowBreakdown(true);}}
              className="text-indigo-600 hover:scale-110 transition">
              <FaEye />
            </button>
          </td>

          <td className="px-4 py-3 text-center rounded-r-xl">
            <button
              onClick={()=>downloadPDF(h)}
              className="text-slate-400 hover:text-indigo-600 hover:scale-110 transition" >
              <FaDownload />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Mobile Cards */}
<div className="md:hidden space-y-4">
  {filteredHistory.map((h, i) => (
    <div
      key={i}
      className="bg-white rounded-2xl p-4 shadow-md border border-slate-100"
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-semibold text-slate-800">{h.month}</p>
          <p className="text-xs text-slate-400">{h.year}</p>
        </div>
        <span className="text-green-600 text-sm font-medium">{h.status}</span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-slate-500 text-sm">Net Pay</span>
        <span className="font-bold text-indigo-600">
          ₹{Math.round(h.net).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between items-center pt-2 border-t">
        <button
          onClick={()=>{setModalData(h);setShowBreakdown(true);}}
          className="flex items-center gap-2 text-indigo-600 text-sm font-medium"
        >
          <FaEye /> View
        </button>

        <button
          onClick={()=>downloadPDF(h)}
          className="flex items-center gap-2 text-slate-600 text-sm font-medium"
        >
          <FaDownload /> Download
        </button>
      </div>
    </div>
  ))}
</div>
 </div>
        {/* Modal */}
        {showBreakdown && modalData && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-xl shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Payslip Breakdown</h3>
                <button onClick={()=>setShowBreakdown(false)} className="text-slate-400 hover:text-red-500">✕</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="bg-slate-50 rounded-xl p-3">
                  <h4 className="font-medium mb-2">Earnings</h4>
                  <ModalRow label="Basic" value={modalData.struct.basic} />
                  <ModalRow label="HRA" value={modalData.struct.hra} />
                  <ModalRow label="Conveyance" value={modalData.struct.conveyance} />
                  <ModalRow label="Special Allowance" value={modalData.struct.specialAllowance} />
                </div>
                <div className="bg-red-50/40 rounded-xl p-3">
                  <h4 className="font-medium mb-2">Deductions</h4>
                  <ModalRow label="PF" value={modalData.struct.employeePF} red />
                  <ModalRow label="Prof. Tax" value={200} red />
                  <ModalRow label="Insurance" value={500} red />
                </div>
              </div>

   <div className="mt-6 flex items-center justify-between gap-6">
  <div className="flex items-center gap-10">

    {/* Monthly net pay */}
    <div>
      <p className="text-xs text-slate-400">Net Pay (Monthly)</p>
      <p className="text-xl font-bold text-indigo-600">
        ₹{Math.round(modalData.net).toLocaleString()}
      </p>
    </div>

    {/* CTC */}
    <div>
      <p className="text-xs text-slate-400">CTC (Per Year)</p>
      <p className="text-xl font-bold text-indigo-600">
        ₹{Math.round(getCTCByDate(modalData.year, modalData.month)).toLocaleString()}
      </p>
    </div>

  </div>

  {/*  Download */}
  <button
    onClick={()=>downloadPDF(modalData)}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md"
  >
    <FaDownload /> Download
  </button>
</div>
</div>
 </div>
        )}

      </div>
    </div>
  );
}

/* Components */
function KPI({ title, value, main, annual, className="" }) {
  return (
    <div className={`rounded-2xl p-5 shadow-md ${main ? "ring-2 ring-indigo-400 scale-[1.02]" : ""}${className}`}>
      <p className="text-semibold text-slate-400">{title}</p>
      <p className={`font-bold ${main ? "text-indigo-600 text-2xl" : "text-slate-800 text-lg"}`}>
        ₹{Math.round(value).toLocaleString()}
        {annual && <span className="text-xs text-slate-400"> /yr</span>}
      </p>
    </div>
  );
}

function Row({ label, value, neg }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-slate-600">{label}</span>
      <span className={`${neg ? "text-red-500" : "text-slate-800"} font-medium`}>
        {neg && "- "}₹{Math.round(value).toLocaleString()}
      </span>
    </div>
  );
}

function ModalRow({ label, value, red }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-slate-500">{label}</span>
      <span className={`${red ? "text-red-500" : "text-slate-800"} font-semibold`}>
        {red && "- "}₹{Math.round(value).toLocaleString()}
      </span>
    </div>
  );
}





