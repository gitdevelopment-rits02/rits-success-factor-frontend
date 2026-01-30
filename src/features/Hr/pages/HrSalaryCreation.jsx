import { useState } from "react";
import { FiSearch } from "react-icons/fi";
 
/* Payroll Engine */
const PF_BASE_LOW = 8000;
const PF_BASE_HIGH = 15000;
 
function calculatePayroll(ctc) {
  const annualCTC = Number(ctc);
  if (!annualCTC) return null;
 
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
 
export default function HrPayrollFormat() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
 
 const [employees, setEmployees] = useState([
 
    { id: "EMP001", name: "Rahul Sharma", designation: "Software Engineer", department: "Engineering", ctc: 700000 },
    { id: "EMP002", name: "Anita Verma", designation: "HR Executive", department: "HR", ctc: 420000 },
    { id: "EMP003", name: "Karan Patel", designation: "Finance Analyst", department: "Finance", ctc: 550000 },
    { id: "EMP004", name: "Rohit Singh", designation: "Intern", department: "Engineering", ctc: null },
    { id: "EMP005", name: "Neha Joshi", designation: "Trainee HR", department: "HR", ctc: null },
    { id: "EMP005", name: "Neha Joshi", designation: "Trainee Analyst", department: "Finance", ctc: null },
  ]);
 
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.id.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.designation.toLowerCase().includes(search.toLowerCase())
  );
 
  const [salaryData, setSalaryData] = useState({
    annualCTC: "",
    components: [],
    gross: "",
    net: ""
  });
 
  const [enableVariablePay, setEnableVariablePay] = useState(false);
  const [enableDeductions, setEnableDeductions] = useState(false);
  const [enableBenefits, setEnableBenefits] = useState(false);
 
  const [variablePay, setVariablePay] = useState({ type: "", amount: "", frequency: "" });
const [saveSuccess, setSaveSuccess] = useState(false);
 
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
 
    if (emp.ctc) {
      const s = calculatePayroll(emp.ctc);
 
      setSalaryData({
        annualCTC: emp.ctc,
        components: [
          { name: "Basic", monthly: s.basic },
          { name: "HRA", monthly: s.hra },
          { name: "Conveyance", monthly: s.conveyance },
          { name: "Special Allowance", monthly: s.specialAllowance },
          { name: "PF - Employee", monthly: s.employeePF },
          { name: "PF - Employer", monthly: s.employerPF },
          { name: "Professional Tax", monthly: s.professionalTax },
          { name: "Medical Insurance", monthly: s.medicalInsurance },
        ],
        gross: s.gross,
        net: s.netPay
      });
    } else {
      setSalaryData({ annualCTC: "", components: [], gross: "", net: "" });
    }
 
    setEnableVariablePay(false);
    setEnableDeductions(false);
    setEnableBenefits(false);
    setSaveSuccess(false);
 
  };
const handleSaveSalary = () => {
  if (!selectedEmployee || !salaryData.annualCTC) return;
 
  setEmployees(prev =>
    prev.map(emp =>
      emp.id === selectedEmployee.id
        ? { ...emp, ctc: Number(salaryData.annualCTC) }
        : emp
    )
  );
 
  setSaveSuccess(true);
 
  setTimeout(() => {
    setSaveSuccess(false);
  }, 2000);
};
 
  const handleCTCCalculate = (ctcValue) => {
    if (!ctcValue || isNaN(ctcValue)) return;
 
    const s = calculatePayroll(ctcValue);
    if (!s) return;
 
    setSalaryData({
      annualCTC: ctcValue,
      components: [
        { name: "Basic", monthly: s.basic },
        { name: "HRA", monthly: s.hra },
        { name: "Conveyance", monthly: s.conveyance },
        { name: "Special Allowance", monthly: s.specialAllowance },
        { name: "PF - Employee", monthly: s.employeePF },
        { name: "PF - Employer", monthly: s.employerPF },
        { name: "Professional Tax", monthly: s.professionalTax },
        { name: "Medical Insurance", monthly: s.medicalInsurance },
      ],
      gross: s.gross,
      net: s.netPay
    });
  };
 
  const addComponent = () => {
    setSalaryData({
      ...salaryData,
      components: [...salaryData.components, { name: "", monthly: "" }],
    });
  };
 
  const updateComponent = (i, field, value) => {
    const updated = [...salaryData.components];
    updated[i][field] = value;
    setSalaryData({ ...salaryData, components: updated });
  };
 
  const removeComponent = (i) => {
    setSalaryData({
      ...salaryData,
      components: salaryData.components.filter((_, index) => index !== i),
    });
  };
 
  /*  UI Utility Classes  */
  const inputBase = "w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition";
 
  const toggleBase = "flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 hover:shadow transition";
 
  const card = "bg-white rounded-2xl shadow-lg border border-slate-200";
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto w-full">
 
        {/* EMPLOYEE LIST */}
        {!selectedEmployee && (
          <div className={`${card} p-4 sm:p-5 md:p-6`}>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">HR Employee Payroll Panel</h1>
                <p className="text-sm text-slate-500">Manage employee salary structures</p>
              </div>
            </div>
 
            {/* Search */}
            <div className="relative mb-5">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                placeholder="Search by name, ID, department or designation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
 
            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 w-full">
              <table className="w-full text-xs sm:text-sm table-auto min-w-[720px]">
                <thead className="bg-slate-100 text-slate-600 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 text-center">ID</th>
                    <th className="p-3 text-center">Name</th>
                    <th className="p-3 text-center">Designation</th>
                    <th className="p-3 text-center">Department</th>
                    <th className="p-3 text-center">CTC</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
 
                <tbody>
                  {filteredEmployees.map((emp, idx) => (
                    <tr key={emp.id} className={`border-b transition ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-indigo-50/40`}>
                      <td className="p-3 text-center text-slate-700">{emp.id}</td>
                      <td className="p-3 text-center font-semibold text-slate-800">{emp.name}</td>
                      <td className="p-3 text-center text-slate-600">{emp.designation}</td>
                      <td className="p-3 text-center text-slate-600">{emp.department}</td>
                      <td className="p-3 text-center font-medium">
                        {emp.ctc ? `₹${emp.ctc.toLocaleString()}` : "—"}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="px-4 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs font-semibold transition">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
 
        {/* SALARY PANEL */}
        {selectedEmployee && (
          <div className={`${card} p-4 sm:p-5 md:p-6`}>
 
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selectedEmployee.name}</h2>
                <p className="text-sm text-slate-500">{selectedEmployee.designation} • {selectedEmployee.department}</p>
              </div>
              <button onClick={()=>setSelectedEmployee(null)} className="text-indigo-600 text-sm font-semibold hover:underline">← Back to list</button>
            </div>
     
 
            {/* CTC */}
            <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-200">
              <label className="text-sm font-semibold text-slate-600">Annual CTC</label>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <input
                  className={`${inputBase} bg-gray-50`}
                  value={salaryData.annualCTC}
                  onChange={(e)=>setSalaryData({...salaryData, annualCTC:e.target.value})}
                  onKeyDown={(e)=>{ if(e.key === "Enter") handleCTCCalculate(e.target.value); }}
                />
                <button onClick={()=>handleCTCCalculate(salaryData.annualCTC)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold shadow transition">Calculate</button>
              </div>
            </div>
 
            {/* Components */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-700">Salary Breakdown</h3>
              <button onClick={addComponent} className="text-indigo-600 text-sm font-semibold hover:underline">+ Add Component</button>
            </div>
 
            <div className="space-y-3 mb-6">
              {salaryData.components.map((comp,i)=>(
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <input className={`${inputBase} font-semibold text-slate-800`} value={comp.name} placeholder="Component"  onChange={(e)=>updateComponent(i,"name",e.target.value)} />
                  <input className={inputBase} value={comp.monthly} placeholder="Monthly Amount" onChange={(e)=>updateComponent(i,"monthly",e.target.value)} />
                  <button onClick={()=>removeComponent(i)} className="text-red-600 text-sm font-semibold hover:underline">Remove</button>
                </div>
              ))}
            </div>
 
            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <label className={toggleBase}>
                <input type="checkbox" className="accent-indigo-600 scale-110" checked={enableVariablePay} onChange={()=>setEnableVariablePay(!enableVariablePay)} />
                <span>Variable Pay</span>
              </label>
              <label className={toggleBase}>
                <input type="checkbox" className="accent-indigo-600 scale-110" checked={enableDeductions} onChange={()=>setEnableDeductions(!enableDeductions)} />
                <span>Additional Deductions</span>
              </label>
              <label className={toggleBase}>
                <input type="checkbox" className="accent-indigo-600 scale-110" checked={enableBenefits} onChange={()=>setEnableBenefits(!enableBenefits)} />
                <span>Additional Benefits</span>
              </label>
            </div>
 
            {/* Variable Pay */}
            {enableVariablePay && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Variable Pay</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <input className={inputBase} placeholder="Type (Bonus / Incentive)" />
                  <input className={inputBase} placeholder="Amount / %" />
                  <input className={inputBase} placeholder="Frequency (Monthly / Quarterly)" />
                </div>
              </div>
            )}
 
            {/* Deductions */}
            {enableDeductions && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Additional Deductions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className={inputBase} placeholder="ESI" />
                  <input className={inputBase} placeholder="TDS" />
                  <input className={inputBase} placeholder="Professional Tax" />
                  <input className={inputBase} placeholder="Other Deduction" />
                </div>
              </div>
            )}
 
            {/* Benefits */}
            {enableBenefits && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Additional Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className={inputBase} placeholder="LTA" />
                  <input className={inputBase} placeholder="Insurance" />
                  <input className={inputBase} placeholder="Bonus" />
                  <input className={inputBase} placeholder="Other Benefit" />
                </div>
              </div>
            )}
 
            {/* Totals */}
            {salaryData.gross && (
              <div className="bg-indigo-50 rounded-2xl p-4 mb-6 border border-indigo-200 text-sm sm:text-base">
                <p className="text-slate-800 font-semibold"><b>Gross:</b> ₹{Math.round(salaryData.gross).toLocaleString()}</p>
                <p className="text-indigo-700 font-bold text-lg"><b>Net Pay:</b> ₹{Math.round(salaryData.net).toLocaleString()}</p>
              </div>
            )}
 
    {/* Actions */}
    {saveSuccess && (
     <div className="mb-3 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm flex justify-center">
      Salary saved successfully
  </div>
)}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button onClick={() => setSelectedEmployee(null)} className="w-full sm:w-auto px-5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">Cancel</button>
              <button onClick={handleSaveSalary} className="w-full sm:w-auto px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow transition">
              Save Salary
             </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
 
 
 