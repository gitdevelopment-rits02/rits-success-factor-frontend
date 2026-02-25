import { useState, useEffect } from "react";
import { FaCalendarAlt, FaRegCalendar } from "react-icons/fa";
import { FaDownload, FaEye, FaListUl } from "react-icons/fa";
import bgWave from "../../../assets/background.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPayslip, fetchMyPayslipHistory, fetchMyPayslipPdf } from "../Redux/thunks/EmployeePaySlipsThunk";
import EmployeePayslipSkeleton from "./EmployeePayslipsSkeleton";


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

const monthNumberMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

/* Component  */
export default function EmployeePayrollUI() {
const dispatch = useDispatch();

const {
  data: payslip,
  loading,
  error,
  historyData,
} = useSelector((state) => state.employee.paySlips);

const [allHistory, setAllHistory] = useState([]);
const [showBreakdown, setShowBreakdown] = useState(false);
const today = new Date();
const currentMonth = today.getMonth() + 1;   
const currentYear = today.getFullYear();

useEffect(() => {
  dispatch(fetchMyPayslip({ 
    month: currentMonth, 
    year: currentYear 
  }));



dispatch(fetchMyPayslipHistory({ 
  year: currentYear 
}));

}, [dispatch]);

useEffect(() => {
  console.log("HISTORY FROM REDUX:", historyData);
}, [historyData]);

useEffect(() => {
  if (historyData?.length && allHistory.length === 0) {
    setAllHistory(historyData);
  }
}, [historyData, allHistory.length]);

const [historyYear, setHistoryYear] = useState("All");
const [historyMonth, setHistoryMonth] = useState("All");
const [initialLoading, setInitialLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setInitialLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

const [modalData, setModalData] = useState(null);
const currentCTC = payslip?.totalCTC ?? 0;


  const structure = payslip
  ? {
      basic: payslip.earnings.basic,
      hra: payslip.earnings.hra,
      conveyance: payslip.earnings.conveyance,
      specialAllowance: payslip.earnings.specialAllowance,
      gross: payslip.earnings.gross,

      employeePF: payslip.deductions.providentFund,
      professionalTax: payslip.deductions.professionalTax,
      medicalInsurance: payslip.deductions.medicalInsurance,

      totalDeductions: payslip.deductions.totalDeductions,
      netPay: payslip.netPay,
    }
  : null;


const history = allHistory
  .filter(item => {
    const yearMatch =
      historyYear === "All" || Number(historyYear) === item.year;

    const monthMatch =
      historyMonth === "All" || monthNumberMap[historyMonth] === item.month;

    return yearMatch && monthMatch;
  })
  .map(item => ({
    monthNum: item.month,
    month: monthNames[item.month],
    year: String(item.year),
    status: item.status,
    net: item.salary?.netPay ?? 0,
    gross: item.salary?.gross ?? 0
  }));




  /* PDF  */
const downloadPDF = async (data) => {
  try {
    const pdfBlob = await dispatch(
      fetchMyPayslipPdf({
        month: data.monthNum,
        year: Number(data.year),
      })
    ).unwrap();

    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payslip_${data.month}_${data.year}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error("PDF download failed:", err);
    alert("Failed to download payslip");
  }
};





const modalStructure = payslip
  ? {
      basic: payslip.earnings.basic,
      hra: payslip.earnings.hra,
      conveyance: payslip.earnings.conveyance,
      specialAllowance: payslip.earnings.specialAllowance,

      employeePF: payslip.deductions.providentFund,
      professionalTax: payslip.deductions.professionalTax,
      medicalInsurance: payslip.deductions.medicalInsurance,

      netPay: payslip.netPay,
      ctc: currentCTC,
    }
  : null;

if (initialLoading) {
  return <EmployeePayslipSkeleton />;
}

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



<div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">

  <div className="flex flex-col justify-center">
  {/*  Name */}
  <h1 className="text-3xl font-bold text-slate-800">
    {payslip.employee.employeeName}
  </h1>

  {/* Designation with label */}
  <p className="text-sm text-slate-600 mt-1">
    <span className="font-semibold">Designation :</span>{" "}
    {payslip.employee.designation}
  </p>

  {/* Employee ID with label */}
  <p className="text-sm text-slate-600">
    <span className="font-semibold">Employee ID :</span>{" "}
    {payslip.employee.employeeNo}
  </p>
</div>


  {/* Right side payroll period */}
  <div className="text-center md:text-right">
    <p className="text-sm text-slate-400">Payroll Period</p>
    <p className="text-2xl font-bold text-indigo-600">
      {monthNames[payslip.payrollPeriod.month]} / {payslip.payrollPeriod.year}
    </p>
  </div>
</div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPI className="bg-slate-50" title="Gross Salary" value={structure.gross} />
        <KPI className="bg-slate-50" title="Deductions" value={structure.totalDeductions} />
        <KPI className="bg-slate-50" title="Net Pay" value={structure.netPay} />
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
             <Row label="Professional Tax" value={structure.professionalTax} neg />
             <Row label="Medical Insurance" value={structure.medicalInsurance} neg />

              <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-red-600">
                <span>Total Deductions</span>
                <span> - ₹{Math.round(structure.totalDeductions).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-sm text-slate-500">Net Pay = Gross − Deductions</span>
            <span className="text-2xl font-bold text-indigo-600">₹{Math.round(structure.netPay).toLocaleString()}</span>
          </div>
        </div>



        {/* History */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
       <div className="flex items-center mb-4">
       <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-700">
      <FaListUl className="text-indigo-500" /> Payment History
      </h3>


  <div className="ml-auto flex items-center gap-6">
<div className="ml-auto flex items-center gap-4">
  {/* YEAR DROPDOWN */}
  <div className="relative">
    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
    <select
      value={historyYear}
      onChange={(e) => setHistoryYear(e.target.value)}
      className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all">
      <option value="All">All Years</option>
      {[...new Set(allHistory.map(h => h.year))]
.map(y => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  </div>

  {/* MONTH DROPDOWN */}
  <div className="relative">
    <FaRegCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
    <select
      value={historyMonth}
      onChange={(e) => setHistoryMonth(e.target.value)}
      className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm text-[13px] font-medium outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all" >
      <option value="All">Months</option>
      {[...new Set(allHistory.map(h => monthNames[h.month]))].map(m => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  </div>
</div>
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
     {history.map((h,i)=> (
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
             onClick={async () => {
            await dispatch(
            fetchMyPayslip({ month: h.monthNum, year: Number(h.year) })
            );
          setModalData(h);
          setShowBreakdown(true);
        }}
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
  {history.map((h,i)=> (
    <div
      key={i}
      className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
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
          onClick={async () => {
  await dispatch(
    fetchMyPayslip({ month: h.monthNum, year: Number(h.year) })
  );
  setModalData(h);
  setShowBreakdown(true);
}}
          className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
          <FaEye /> View
        </button>

        <button
          onClick={()=>downloadPDF(h)}
          className="flex items-center gap-2 text-slate-600 text-sm font-medium">
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
                 <ModalRow label="Basic" value={modalStructure.basic} />
                 <ModalRow label="HRA" value={modalStructure.hra} />
                 <ModalRow label="Conveyance" value={modalStructure.conveyance} />
                 <ModalRow label="Special Allowance" value={modalStructure.specialAllowance} />
                </div>
                <div className="bg-red-50/40 rounded-xl p-3">
                  <h4 className="font-medium mb-2">Deductions</h4>
                  <ModalRow label="PF" value={modalStructure.employeePF} red />
                  <ModalRow label="Prof. Tax" value={modalStructure.professionalTax} red />
                  <ModalRow label="Insurance" value={modalStructure.medicalInsurance} red />
                </div>
              </div>
   <div className="mt-6 flex items-center justify-between gap-6">
   <div className="flex items-center gap-10">

    {/* Monthly net pay */}
    <div>
      <p className="text-xs text-slate-400">Net Pay (Monthly)</p>
      <p className="text-xl font-bold text-indigo-600">
        ₹{Math.round(modalStructure.netPay).toLocaleString()}
      </p>
    </div>

    {/* CTC */}
    <div>
      <p className="text-xs text-slate-400">CTC (Per Year)</p>
      <p className="text-xl font-bold text-indigo-600">
       ₹{Math.round(payslip.totalCTC).toLocaleString()}
      </p>
    </div>
  </div>

  {/*  Download */}
  <button
    onClick={()=>downloadPDF(modalData)}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md">
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





 