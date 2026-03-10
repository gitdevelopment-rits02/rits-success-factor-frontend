import { useState, useEffect } from "react";
import { FaCalendarAlt, FaRegCalendar } from "react-icons/fa";
import { FaDownload, FaEye, FaListUl } from "react-icons/fa";
import bgWave from "../../../assets/background.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerPayslip, fetchManagerPayslipHistory } from "../Redux/thunks/ManagerPayslipsThunk";
import ManagerPayslipSkeleton from "./ManagerPayslipsSkeleton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyLogo from "../../../assets/companyLogo.png";

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

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
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
export default function ManagerPayslips() {

const dispatch = useDispatch();

const {
  data: payslip,
  loading,
  error,
  historyData,
} = useSelector((state) => state.manager.payslips);



const [showBreakdown, setShowBreakdown] = useState(false);
const currentMonth = 2;
const currentYear = 2026;
// const today = new Date();
// const currentMonth = today.getMonth() + 1;   
// const currentYear = today.getFullYear();

useEffect(() => {
  dispatch(fetchManagerPayslip({
    month: currentMonth,
    year: currentYear
  }));
}, [dispatch, currentMonth, currentYear]);



// useEffect(() => {
//   console.log("HISTORY FROM REDUX:", historyData);
// }, [historyData]);


const [historyYear, setHistoryYear] = useState("All");
const [historyMonth, setHistoryMonth] = useState("All");
const [initialLoading, setInitialLoading] = useState(true);
const [allHistory, setAllHistory] = useState([]);

useEffect(() => {
  const timer = setTimeout(() => {
    setInitialLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

const [modalPayslip, setModalPayslip] = useState(null);

const [modalData, setModalData] = useState(null);
const currentCTC = payslip?.earnings?.totalCTC ?? 0;



const structure = payslip?.earnings && payslip?.deductions
  ? {
      basic: payslip.earnings.basic ?? 0,
      hra: payslip.earnings.hra ?? 0,
      conveyance: payslip.earnings.conveyance ?? 0,
      specialAllowance: payslip.earnings.specialAllowance ?? 0,
      gross: payslip.earnings.gross ?? 0,

      employeePF: payslip.deductions.employeePF ?? 0,
      professionalTax: payslip.deductions.professionalTax ?? 0,
      medicalInsurance: payslip.deductions.medicalInsurance ?? 0,

      totalDeductions:
        (payslip.deductions.employeePF ?? 0) +
        (payslip.deductions.professionalTax ?? 0) +
        (payslip.deductions.medicalInsurance ?? 0),

      netPay: payslip.netPay ?? 0,
    }
  : null;



const history = (historyData ?? []).filter((item) => {
  const yearMatch = historyYear === "All" || Number(historyYear) === item.year;
  const monthMatch = historyMonth === "All" || Number(monthNumberMap[historyMonth]) === Number(item.month)

  return yearMatch && monthMatch;
});

useEffect(() => {
  dispatch(fetchManagerPayslipHistory({
    year: historyYear === "All" ? currentYear : historyYear
  }));
}, [historyYear, dispatch, currentYear]);

useEffect(() => {
  if (historyData?.length && allHistory.length === 0) {
    setAllHistory(historyData);
  }
}, [historyData, allHistory.length]);



  /* PDF  */
const downloadPDF = async (data) => {
  try {

    const result = await dispatch(
      fetchManagerPayslip({
        month: data.month,
        year: Number(data.year)
      })
    ).unwrap();

    const { employee, payrollPeriod, earnings, deductions, netPay } =
      result.data ?? result;

    const monthName = monthNames[payrollPeriod.month];
    const periodText = `${monthName} ${payrollPeriod.year}`;

    const doc = new jsPDF();

    const logoImg = await loadImage(companyLogo);

    doc.addImage(logoImg, "PNG", 7, -3, 48, 34);

    doc.setFont("helvetica","bold");
    doc.setFontSize(16);
    doc.text("Revappayya IT Services Pvt Ltd",64,12);

    doc.setFont("helvetica","normal");
    doc.setFontSize(9);

    doc.text("HO: Shree Shaila Nilaya, 13th Cross, 22nd Main Road,",14,22);
    doc.text("Virat Nagar, Bommanahalli, Bangalore, KA 560068, India",14,27);
    doc.text("RO: Unit no-2201A, 22nd floor, WTC Bangalore, Brigade Gateway, Bangalore - 560055",14,32);

    doc.text("Email: support@revappayyaitservices.com | www.revappayyaitservices.com",14,37);

    doc.line(14,40,196,40);

    doc.setFontSize(11);
    doc.text(`Salary Slip for the month of ${periodText}`,105,48,{align:"center"});

    autoTable(doc,{
      startY:52,
      theme:"grid",
      styles:{fontSize:8},
      body:[
        ["Name",employee.employeeName,"Period",periodText],
        ["Designation",employee.designation,"Employee ID",employee.employeeNo],
        ["Department","","Bank A/C",""],
        ["Payment Mode","Bank Transfer","No of Days",""],
      ]
    });

    autoTable(doc,{
      startY:doc.lastAutoTable.finalY + 5,
      theme:"grid",
      styles:{fontSize:8},
      head:[["Earnings","Amount (Rs)","Deductions","Amount (Rs)"]],
      body:[
        ["Basic",earnings.basic,"PF - Employee",deductions.employeePF],
        ["HRA",earnings.hra,"Professional Tax",deductions.professionalTax],
        ["Conveyance",earnings.conveyance,"Medical Insurance",deductions.medicalInsurance],
        ["Special Allowance",earnings.specialAllowance,"",""],
        [
          "Gross Salary",
          earnings.gross,
          "Total Deductions",
          (deductions.employeePF ?? 0) +
          (deductions.professionalTax ?? 0) +
          (deductions.medicalInsurance ?? 0)
        ],
      ]
    });

    const netY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(11);
    doc.text(`Net Salary : Rs ${netPay.toLocaleString()}`,14,netY);

    doc.text(`Total CTC (Per Year) : Rs ${(earnings.totalCTC ?? 0).toLocaleString()}`,130,netY);

    doc.setFontSize(7);

    doc.text("This is a computer generated slip and does not require signature.",14,netY + 12);
    doc.text("This document contains confidential information.",14,netY + 17);

    doc.save(`Payslip_${employee.employeeName}_${periodText}.pdf`);

  } catch (err) {
    console.error("PDF generation failed:",err);
  }
};



if (initialLoading) {
  return <ManagerPayslipSkeleton />;
}

const safePayslipReady =
  payslip?.employee &&
  payslip?.earnings &&
  payslip?.deductions &&
  payslip?.payrollPeriod;


if (!safePayslipReady && loading) {
  return <ManagerPayslipSkeleton />;
}


if (!safePayslipReady && error) {
  return (
    <div className="p-10 text-center text-red-600 font-semibold">
      Failed to load payslip. Please refresh.
    </div>
  );
}

if (!safePayslipReady && !loading) {
  return <div className="p-10 text-center">No payslip available</div>;
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

   {/* <div className="min-h-screen bg-blue-50 p-6"> */}


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
      {[...new Set((allHistory ?? []).map(h => h.year))]


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
     {[...new Set((allHistory ?? []).map(h => monthNames[h.month]))]
.map(m => (
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
            <div className="font-medium">{monthNames[h.month]}</div>

            <div className="text-xs text-slate-400">{h.year}</div>
          </td>

          <td className="px-4 py-3 text-center font-semibold">
            ₹{Math.round(h.salary?.netPay ?? 0).toLocaleString()}

          </td>

          <td className="px-4 py-3 text-center text-green-600 font-medium">
            {h.status}
          </td>

          <td className="px-4 py-3 text-center">
            <button
           onClick={async () => {
  try {
    const result = await dispatch(
      fetchManagerPayslip({ month: h.month, year: Number(h.year) })
    ).unwrap();

    setModalPayslip(result.data ?? result);

    setModalData(h);
    setShowBreakdown(true);
  } catch {
    alert("Unable to load payslip");
  }
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
          <p className="font-semibold text-slate-800">{monthNames[h.month]}</p>
          <p className="text-xs text-slate-400">{h.year}</p>
        </div>
        <span className="text-green-600 text-sm font-medium">{h.status}</span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-slate-500 text-sm">Net Pay</span>
        <span className="font-bold text-indigo-600">
         ₹{Math.round(h.salary?.netPay ?? 0).toLocaleString()}

        </span>
      </div>

      <div className="flex justify-between items-center pt-2 border-t">
        <button
   onClick={async () => {
  try {
    const result = await dispatch(
      fetchManagerPayslip({ month: h.month, year: Number(h.year) })
    ).unwrap();

    setModalPayslip(result.data ?? result);
    setModalData(h);
    setShowBreakdown(true);
  } catch {
    alert("Unable to load payslip");
  }
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
       {showBreakdown && modalPayslip && (



          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-xl shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Payslip Breakdown</h3>
                <button onClick={()=>setShowBreakdown(false)} className="text-slate-400 hover:text-red-500">✕</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="bg-slate-50 rounded-xl p-3">
                  <h4 className="font-medium mb-2">Earnings</h4>
                 <ModalRow label="Basic" value={modalPayslip?.earnings?.basic ?? 0} />
                 <ModalRow label="HRA" value={modalPayslip?.earnings?.hra ?? 0} />
                 <ModalRow label="Conveyance" value={modalPayslip?.earnings?.conveyance ?? 0} />
                 <ModalRow label="Special Allowance" value={modalPayslip?.earnings?.specialAllowance ?? 0} />

                </div>
                <div className="bg-red-50/40 rounded-xl p-3">
                  <h4 className="font-medium mb-2">Deductions</h4>
                  <ModalRow label="PF" value={modalPayslip?.deductions?.employeePF ?? 0} red />
                  <ModalRow label="Prof. Tax" value={modalPayslip?.deductions?.professionalTax ?? 0} red />
                  <ModalRow label="Insurance" value={modalPayslip?.deductions?.medicalInsurance ?? 0} red />

                </div>
              </div>
   <div className="mt-6 flex items-center justify-between gap-6">
   <div className="flex items-center gap-10">

    {/* Monthly net pay */}
    <div>
      <p className="text-xs text-slate-400">Net Pay (Monthly)</p>
      <p className="text-xl font-bold text-indigo-600">
       ₹{Math.round(modalPayslip?.netPay ?? 0).toLocaleString()}
      </p>
    </div>

    {/* CTC */}
    <div>
      <p className="text-xs text-slate-400">CTC (Per Year)</p>
      <p className="text-xl font-bold text-indigo-600">
      ₹{Math.round(modalPayslip?.earnings?.totalCTC ?? 0).toLocaleString()}


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
        ₹{Math.round(value ?? 0).toLocaleString()}
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
        {neg && "- "}₹{Math.round(value ?? 0).toLocaleString()}
      </span>
    </div>
  );
}

function ModalRow({ label, value, red }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-slate-500">{label}</span>
      <span className={`${red ? "text-red-500" : "text-slate-800"} font-semibold`}>
        {red && "- "}₹{Math.round(value ?? 0).toLocaleString()}
      </span>
    </div>
  );
}

 