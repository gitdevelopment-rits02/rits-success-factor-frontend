// import React, { useState, useMemo } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// import { Doughnut, Bar } from "react-chartjs-2";
// import {
//   HiUsers,
//   HiArrowTrendingUp,
//   HiArrowTrendingDown,
//   HiUserPlus,
//   HiBuildingOffice2,
//   HiCalendar,
//   HiAdjustmentsHorizontal,
// } from "react-icons/hi2";

// /* ---------------- CHART REGISTER ---------------- */
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// /* ---------------- THEME & STYLES ---------------- */

// const KPI_STYLES = {
//   blue: { bg: "bg-orange-200", text: "text-white-600", border: "border-blue-100" },
//   info: { bg: "bg-yellow-100", text: "text-black-700", border: "border-sky-200" },
//   positive: { bg: "bg-green-100", text: "text-blue-700", border: "border-blue-200" },
//   negative: { bg: "bg-red-100", text: "text-indigo-700", border: "border-indigo-200" },
// };

// /* ---------------- EXPANDED DUMMY DATA (30 Entries) ---------------- */
// const employees = [
//   { id: 1, dept: "sales", status: "active", gender: "female", tenure: 2.3 },
//   { id: 2, dept: "sales", status: "active", gender: "male", tenure: 1.1 },
//   { id: 3, dept: "marketing", status: "active", gender: "female", tenure: 3.6 },
//   { id: 4, dept: "marketing", status: "exited", gender: "male", tenure: 2.4 },
//   { id: 5, dept: "engineering", status: "active", gender: "male", tenure: 4.8 },
//   { id: 6, dept: "engineering", status: "active", gender: "female", tenure: 3.2 },
//   { id: 7, dept: "engineering", status: "exited", gender: "male", tenure: 1.4 },
//   { id: 8, dept: "sales", status: "active", gender: "female", tenure: 0.9 },
//   { id: 9, dept: "marketing", status: "active", gender: "male", tenure: 2.7 },
//   { id: 10, dept: "engineering", status: "active", gender: "female", tenure: 5.1 },
//   { id: 11, dept: "sales", status: "active", gender: "male", tenure: 0.5 },
//   { id: 12, dept: "engineering", status: "active", gender: "female", tenure: 6.2 },
//   { id: 13, dept: "marketing", status: "active", gender: "female", tenure: 1.8 },
//   { id: 14, dept: "engineering", status: "exited", gender: "male", tenure: 0.8 },
//   { id: 15, dept: "sales", status: "active", gender: "female", tenure: 4.1 },
//   { id: 16, dept: "marketing", status: "active", gender: "male", tenure: 3.3 },
//   { id: 17, dept: "engineering", status: "active", gender: "male", tenure: 2.9 },
//   { id: 18, dept: "sales", status: "exited", gender: "female", tenure: 5.5 },
//   { id: 19, dept: "engineering", status: "active", gender: "female", tenure: 1.2 },
//   { id: 20, dept: "marketing", status: "active", gender: "male", tenure: 0.4 },
//   { id: 21, dept: "sales", status: "active", gender: "male", tenure: 2.2 },
//   { id: 22, dept: "engineering", status: "active", gender: "female", tenure: 3.9 },
//   { id: 23, dept: "marketing", status: "exited", gender: "female", tenure: 2.1 },
//   { id: 24, dept: "engineering", status: "active", gender: "male", tenure: 7.0 },
//   { id: 25, dept: "sales", status: "active", gender: "female", tenure: 1.5 },
//   { id: 26, dept: "marketing", status: "active", gender: "male", tenure: 4.4 },
//   { id: 27, dept: "engineering", status: "active", gender: "female", tenure: 0.6 },
//   { id: 28, dept: "sales", status: "active", gender: "male", tenure: 3.1 },
//   { id: 29, dept: "engineering", status: "exited", gender: "female", tenure: 1.9 },
//   { id: 30, dept: "marketing", status: "active", gender: "male", tenure: 2.5 },
// ];

// /* ---------------- KPI CARD COMPONENT ---------------- */
// const KpiCard = ({ label, sub, value, icon: Icon, type = "blue" }) => {
//   const style = KPI_STYLES[type];
//   return (
//     <div className={`bg-white rounded-xl p-5 border ${style.border} shadow-sm transition-all hover:shadow-md`}>
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
//           {sub && <p className="text-[10px] text-blue-400 font-medium">{sub}</p>}
//         </div>
//         <div className={`p-2.5 rounded-lg ${style.bg} ${style.text}`}>
//           <Icon size={20} />
//         </div>
//       </div>
//       <p className="text-2xl font-bold text-slate-800">{value}</p>
//     </div>
//   );
// };

// /* ---------------- MAIN DASHBOARD ---------------- */
// export default function WorkforceWithHRAnalytics() {
//   const [filters, setFilters] = useState({
//     department: "all",
//     status: "all",
//   });

//   /* ---------- SELECTIVE DATA FILTERING ---------- */
//   const filteredEmployees = useMemo(() => {
//     return employees.filter((e) => {
//       const deptMatch = filters.department === "all" || e.dept === filters.department;
//       const statusMatch = filters.status === "all" || e.status === filters.status;
//       return deptMatch && statusMatch;
//     });
//   }, [filters]);

//   /* ---------- CALCULATED METRICS ---------- */
//   const totalCount = filteredEmployees.length;
//   const exitedCount = filteredEmployees.filter(e => e.status === 'exited').length;
//   const activeCount = filteredEmployees.filter(e => e.status === 'active').length;
  
//   const attritionRate = totalCount > 0 
//     ? ((exitedCount / totalCount) * 100).toFixed(1) 
//     : 0;

//   const avgTenure = totalCount > 0 
//     ? (filteredEmployees.reduce((acc, e) => acc + e.tenure, 0) / totalCount).toFixed(1)
//     : 0;

//   /* ---------- CHART CONFIGURATION (BLUE THEME) ---------- */
//   const genderData = {
//     labels: ["Female", "Male"],
//     datasets: [{
//       data: [
//         filteredEmployees.filter(e => e.gender === 'female').length,
//         filteredEmployees.filter(e => e.gender === 'male').length
//       ],
//       backgroundColor: ["#FFD700", "#1e3a8a"], // Blue and Dark Blue
//       hoverOffset: 4,
//       borderWidth: 2,
//       borderColor: '#ffffff'
//     }]
//   };

//   const deptCounts = {
//     sales: filteredEmployees.filter(e => e.dept === 'sales').length,
//     marketing: filteredEmployees.filter(e => e.dept === 'marketing').length,
//     engineering: filteredEmployees.filter(e => e.dept === 'engineering').length,
//   };

//   const departmentData = {
//     labels: ["Sales", "Marketing", "Engineering"],
//     datasets: [{
//       label: 'Headcount',
//       data: [deptCounts.sales, deptCounts.marketing, deptCounts.engineering],
//       backgroundColor: "#60a5fa",
//       hoverBackgroundColor: "#2563eb",
//       borderRadius: 6,
//       barThickness: 40,
//     }]
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">Workforce Analytics</h1>
//         <p className="text-slate-500 font-medium">Real-time personnel monitoring & retention insights</p>
//       </div>

//       {/* INTERACTIVE FILTERS */}
//       <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-wrap gap-6 mb-8 items-center">
//         <div className="flex items-center gap-3">
//           <div className="bg-blue-50 p-2 rounded-md text-blue-600">
//             <HiBuildingOffice2 size={20} />
//           </div>
//           <select
//             className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
//             value={filters.department}
//             onChange={(e) => setFilters({ ...filters, department: e.target.value })}
//           >
//             <option value="all">All Departments</option>
//             <option value="sales">Sales Dept</option>
//             <option value="marketing">Marketing Dept</option>
//             <option value="engineering">Engineering Dept</option>
//           </select>
//         </div>

//         <div className="h-8 w-px bg-slate-200 hidden md:block" />

//         <div className="flex items-center gap-3">
//           <div className="bg-blue-50 p-2 rounded-md text-blue-600">
//             <HiAdjustmentsHorizontal size={20} />
//           </div>
//           <select
//             className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           >
//             <option value="all">Employment Status</option>
//             <option value="active">Active Members</option>
//             <option value="exited">Former Members</option>
//           </select>
//         </div>
//       </div>

//       {/* KPI GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <KpiCard label="Total Staff" value={totalCount} icon={HiUsers} type="blue" />
//         <KpiCard label="Active" value={activeCount} icon={HiUserPlus} type="positive" />
//         <KpiCard label="Attrition" value={`${attritionRate}%`} icon={HiArrowTrendingDown} type="negative" />
//         <KpiCard label="Avg. Tenure" value={`${avgTenure} Yrs`} icon={HiCalendar} type="info" />
//       </div>

//       {/* VISUAL ANALYTICS SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
//           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//             <span className="w-2 h-6 bg-blue-600 rounded-full" />
//             Gender Distribution
//           </h3>
//           <div className="h-[300px] flex justify-center">
//             <Doughnut data={genderData} options={{ cutout: "75%", maintainAspectRatio: false }} />
//           </div>
//         </div>

//         <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
//           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//             <span className="w-2 h-6 bg-blue-400 rounded-full" />
//             Departmental Split
//           </h3>
//           <div className="h-[300px]">
//             <Bar
//               data={departmentData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false } },
//                 scales: {
//                   x: { grid: { display: false }, ticks: { font: { weight: '600' } } },
//                   y: { beginAtZero: true, grid: { color: "#f1f5f9" } },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* DETAILED DATA TABLE */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-slate-50 bg-slate-50/50">
//           <h3 className="font-bold text-slate-800 text-lg">Employee Census</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left bg-white border-b border-slate-100">
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ID</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Department</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Gender</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Tenure</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredEmployees.map((e) => (
//                 <tr key={e.id} className="hover:bg-blue-50/30 transition-colors">
//                   <td className="px-6 py-4 font-bold text-blue-600">#{String(e.id).padStart(3, '0')}</td>
//                   <td className="px-6 py-4 text-slate-600 capitalize font-medium">{e.dept}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
//                       e.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
//                     }`}>
//                       {e.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 capitalize">{e.gender}</td>
//                   <td className="px-6 py-4 text-right font-mono font-semibold text-slate-700">{e.tenure} yrs</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {filteredEmployees.length === 0 && (
//             <div className="p-20 text-center text-slate-400 italic">
//               No personnel records found matching these filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useMemo } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// import { Doughnut, Bar } from "react-chartjs-2";
// import {
//   HiUsers,
//   HiArrowTrendingDown,
//   HiUserPlus,
//   HiBuildingOffice2,
//   HiCalendar,
//   HiAdjustmentsHorizontal,
// } from "react-icons/hi2";

// /* ---------------- CHART REGISTER ---------------- */
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// /* ---------------- UPDATED BLUE THEME STYLES ---------------- */
// // Corrected from orange/yellow to a professional Blue Scale
// const KPI_STYLES = {
//   blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
//   info: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-100" },
//   positive: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
//   negative: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" },
// };

// /* ---------------- EXPANDED DUMMY DATA ---------------- */
// const employees = [
//   { id: 1, dept: "sales", status: "active", gender: "female", tenure: 2.3 },
//   { id: 2, dept: "sales", status: "active", gender: "male", tenure: 1.1 },
//   { id: 3, dept: "marketing", status: "active", gender: "female", tenure: 3.6 },
//   { id: 4, dept: "marketing", status: "exited", gender: "male", tenure: 2.4 },
//   { id: 5, dept: "engineering", status: "active", gender: "male", tenure: 4.8 },
//   { id: 6, dept: "engineering", status: "active", gender: "female", tenure: 3.2 },
//   { id: 7, dept: "engineering", status: "exited", gender: "male", tenure: 1.4 },
//   { id: 8, dept: "sales", status: "active", gender: "female", tenure: 0.9 },
//   { id: 9, dept: "marketing", status: "active", gender: "male", tenure: 2.7 },
//   { id: 10, dept: "engineering", status: "active", gender: "female", tenure: 5.1 },
//   { id: 11, dept: "sales", status: "active", gender: "male", tenure: 0.5 },
//   { id: 12, dept: "engineering", status: "active", gender: "female", tenure: 6.2 },
//   { id: 13, dept: "marketing", status: "active", gender: "female", tenure: 1.8 },
//   { id: 14, dept: "engineering", status: "exited", gender: "male", tenure: 0.8 },
//   { id: 15, dept: "sales", status: "active", gender: "female", tenure: 4.1 },
//   { id: 16, dept: "marketing", status: "active", gender: "male", tenure: 3.3 },
//   { id: 17, dept: "engineering", status: "active", gender: "male", tenure: 2.9 },
//   { id: 18, dept: "sales", status: "exited", gender: "female", tenure: 5.5 },
//   { id: 19, dept: "engineering", status: "active", gender: "female", tenure: 1.2 },
//   { id: 20, dept: "marketing", status: "active", gender: "male", tenure: 0.4 },
//   { id: 21, dept: "sales", status: "active", gender: "male", tenure: 2.2 },
//   { id: 22, dept: "engineering", status: "active", gender: "female", tenure: 3.9 },
//   { id: 23, dept: "marketing", status: "exited", gender: "female", tenure: 2.1 },
//   { id: 24, dept: "engineering", status: "active", gender: "male", tenure: 7.0 },
//   { id: 25, dept: "sales", status: "active", gender: "female", tenure: 1.5 },
//   { id: 26, dept: "marketing", status: "active", gender: "male", tenure: 4.4 },
//   { id: 27, dept: "engineering", status: "active", gender: "female", tenure: 0.6 },
//   { id: 28, dept: "sales", status: "active", gender: "male", tenure: 3.1 },
//   { id: 29, dept: "engineering", status: "exited", gender: "female", tenure: 1.9 },
//   { id: 30, dept: "marketing", status: "active", gender: "male", tenure: 2.5 },
// ];

// /* ---------------- KPI CARD COMPONENT ---------------- */
// const KpiCard = ({ label, sub, value, icon: Icon, type = "blue" }) => {
//   const style = KPI_STYLES[type];
//   return (
//     <div className={`bg-white rounded-xl p-5 border ${style.border} shadow-sm transition-all hover:shadow-md`}>
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
//           {sub && <p className="text-[10px] text-blue-400 font-medium">{sub}</p>}
//         </div>
//         <div className={`p-2.5 rounded-lg ${style.bg} ${style.text}`}>
//           <Icon size={20} />
//         </div>
//       </div>
//       <p className="text-2xl font-bold text-slate-800">{value}</p>
//     </div>
//   );
// };

// /* ---------------- MAIN DASHBOARD ---------------- */
// export default function WorkforceWithHRAnalytics() {
//   const [filters, setFilters] = useState({
//     department: "all",
//     status: "all",
//   });

//   const filteredEmployees = useMemo(() => {
//     return employees.filter((e) => {
//       const deptMatch = filters.department === "all" || e.dept === filters.department;
//       const statusMatch = filters.status === "all" || e.status === filters.status;
//       return deptMatch && statusMatch;
//     });
//   }, [filters]);

//   const totalCount = filteredEmployees.length;
//   const exitedCount = filteredEmployees.filter(e => e.status === 'exited').length;
//   const activeCount = filteredEmployees.filter(e => e.status === 'active').length;
//   const attritionRate = totalCount > 0 ? ((exitedCount / totalCount) * 100).toFixed(1) : 0;
//   const avgTenure = totalCount > 0 ? (filteredEmployees.reduce((acc, e) => acc + e.tenure, 0) / totalCount).toFixed(1) : 0;

//   const genderData = {
//     labels: ["Female", "Male"],
//     datasets: [{
//       data: [
//         filteredEmployees.filter(e => e.gender === 'female').length,
//         filteredEmployees.filter(e => e.gender === 'male').length
//       ],
//       backgroundColor: ["#3b82f6", "#1e3a8a"],
//       borderWidth: 2,
//       borderColor: '#ffffff'
//     }]
//   };

//   const departmentData = {
//     labels: ["Sales", "Marketing", "Engineering"],
//     datasets: [{
//       label: 'Headcount',
//       data: [
//         filteredEmployees.filter(e => e.dept === 'sales').length,
//         filteredEmployees.filter(e => e.dept === 'marketing').length,
//         filteredEmployees.filter(e => e.dept === 'engineering').length,
//       ],
//       backgroundColor: "#60a5fa",
//       borderRadius: 6,
//       barThickness: 40,
//     }]
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      
//       {/* 1. HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">Workforce Analytics</h1>
//         <p className="text-slate-500 font-medium">Real-time personnel monitoring & retention insights</p>
//       </div>

//       {/* 2. MODERN DROPDOWNS (THE NEW PART) */}
//       <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-wrap gap-8 mb-8 items-center">
//         <div className="flex flex-col gap-1.5 min-w-[220px] flex-1 md:flex-none">
//           <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Department</label>
//           <div className="relative group">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none group-focus-within:text-blue-700 transition-colors">
//               <HiBuildingOffice2 size={18} />
//             </div>
//             <select
//               className="w-full appearance-none bg-blue-50/40 border border-blue-100 text-slate-700 font-semibold py-2.5 pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer hover:bg-blue-50"
//               value={filters.department}
//               onChange={(e) => setFilters({ ...filters, department: e.target.value })}
//             >
//               <option value="all">All Departments</option>
//               <option value="sales">Sales Team</option>
//               <option value="marketing">Marketing Team</option>
//               <option value="engineering">Engineering Team</option>
//             </select>
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
//             </div>
//           </div>
//         </div>

//         <div className="h-10 w-px bg-slate-100 hidden md:block" />

//         <div className="flex flex-col gap-1.5 min-w-[220px] flex-1 md:flex-none">
//           <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Status</label>
//           <div className="relative group">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none group-focus-within:text-blue-700 transition-colors">
//               <HiAdjustmentsHorizontal size={18} />
//             </div>
//             <select
//               className="w-full appearance-none bg-blue-50/40 border border-blue-100 text-slate-700 font-semibold py-2.5 pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer hover:bg-blue-50"
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//             >
//               <option value="all">Every Status</option>
//               <option value="active">Active Members</option>
//               <option value="exited">Former Members</option>
//             </select>
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3. KPI GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <KpiCard label="Total Staff" value={totalCount} icon={HiUsers} type="blue" />
//         <KpiCard label="Active" value={activeCount} icon={HiUserPlus} type="positive" />
//         <KpiCard label="Attrition" value={`${attritionRate}%`} icon={HiArrowTrendingDown} type="negative" />
//         <KpiCard label="Avg. Tenure" value={`${avgTenure} Yrs`} icon={HiCalendar} type="info" />
//       </div>

//       {/* 4. CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
//           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//             <span className="w-2 h-6 bg-blue-600 rounded-full" /> Gender Distribution
//           </h3>
//           <div className="h-[300px] flex justify-center">
//             <Doughnut data={genderData} options={{ cutout: "75%", maintainAspectRatio: false }} />
//           </div>
//         </div>
//         <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
//           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//             <span className="w-2 h-6 bg-blue-400 rounded-full" /> Departmental Split
//           </h3>
//           <div className="h-[300px]">
//             <Bar data={departmentData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
//           </div>
//         </div>
//       </div>

//       {/* 5. TABLE */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-slate-50 bg-slate-50/50 font-bold text-slate-800">Employee Census</div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left bg-white border-b border-slate-100">
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">ID</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Department</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Gender</th>
//                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Tenure</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredEmployees.map((e) => (
//                 <tr key={e.id} className="hover:bg-blue-50/30 transition-colors">
//                   <td className="px-6 py-4 font-bold text-blue-600">#{String(e.id).padStart(3, '0')}</td>
//                   <td className="px-6 py-4 text-slate-600 capitalize">{e.dept}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${e.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
//                       {e.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-slate-600 capitalize">{e.gender}</td>
//                   <td className="px-6 py-4 text-right font-semibold text-slate-700">{e.tenure} yrs</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useMemo } from "react";
// import {
//   HiUsers,
//   HiArrowTrendingDown,
//   HiUserPlus,
//   HiBuildingOffice2,
//   HiCalendar,
//   HiAdjustmentsHorizontal,
//   HiCheckCircle,
//   HiExclamationTriangle,
//   HiClock,
//   HiShieldCheck,
//   HiCog6Tooth,
//   HiChevronRight,
// } from "react-icons/hi2";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// import { Doughnut, Bar } from "react-chartjs-2";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// /* ---------------------------------------------------------------- */
// /* ------------------------- DUMMY DATA ---------------------------- */
// /* ---------------------------------------------------------------- */

// const employees = [ /* SAME ARRAY YOU ALREADY HAVE */ 
//   { id: 1, dept: "sales", status: "active", gender: "female", tenure: 2.3 },
//   { id: 2, dept: "sales", status: "active", gender: "male", tenure: 1.1 },
//   { id: 3, dept: "marketing", status: "active", gender: "female", tenure: 3.6 },
//   { id: 4, dept: "marketing", status: "exited", gender: "male", tenure: 2.4 },
//   { id: 5, dept: "engineering", status: "active", gender: "male", tenure: 4.8 },
//   { id: 6, dept: "engineering", status: "active", gender: "female", tenure: 3.2 },
//   { id: 7, dept: "engineering", status: "exited", gender: "male", tenure: 1.4 },
// ];

// /* ---------------------------------------------------------------- */
// /* --------------------- SYSTEM DASHBOARD -------------------------- */
// /* ---------------------------------------------------------------- */

// const Card = ({ title, children }) => (
//   <div className="bg-white/80 backdrop-blur rounded-2xl border border-blue-100 shadow-sm">
//     <div className="flex items-center justify-between px-6 py-4 border-b border-blue-50">
//       <h3 className="font-semibold text-slate-800">{title}</h3>
//       <span className="text-slate-400">•••</span>
//     </div>
//     <div className="px-6">{children}</div>
//   </div>
// );

// const Row = ({ icon: Icon, label, value, valueClass = "", pill }) => (
//   <div className="flex items-center justify-between py-3 border-b border-blue-50 last:border-b-0">
//     <div className="flex items-center gap-3">
//       <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
//         <Icon className="text-blue-500" size={16} />
//       </div>
//       <span className="text-sm text-slate-700">{label}</span>
//     </div>
//     <div className="flex items-center gap-3">
//       {pill ? (
//         <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md">
//           {value}
//         </span>
//       ) : (
//         <span className={`text-sm font-semibold ${valueClass}`}>
//           {value}
//         </span>
//       )}
//       <HiChevronRight className="text-slate-300" />
//     </div>
//   </div>
// );

// const SystemDashboard = () => (
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//     <Card title="System Status">
//       <Row icon={HiCheckCircle} label="System Status" value="Healthy" valueClass="text-green-600" />
//       <Row icon={HiExclamationTriangle} label="Failed Jobs" value="0" />
//       <Row icon={HiCog6Tooth} label="Background Queue" value="OK" pill />
//       <Row icon={HiClock} label="Last Incident" value="2 days ago" />
//     </Card>

//     <Card title="Admin Overview">
//       <Row icon={HiUsers} label="Total Admins" value="10" />
//       <Row icon={HiUsers} label="Active Admins" value="8 (+1%)" valueClass="text-green-600" />
//       <Row icon={HiUsers} label="Disabled Admins" value="2" />
//       <Row icon={HiExclamationTriangle} label="Recent Access Resets" value="1" valueClass="text-amber-600" />
//     </Card>

//     <Card title="Security & Audit">
//       <Row icon={HiShieldCheck} label="Failed Admin Logins" value="2" />
//       <Row icon={HiExclamationTriangle} label="Security Violations" value="1 (+1)" valueClass="text-red-600" />
//       <Row icon={HiExclamationTriangle} label="Org Structure Issues" value="Yes" valueClass="text-red-600" />
//     </Card>
//   </div>
// );

// /* ---------------------------------------------------------------- */
// /* -------------------- WORKFORCE ANALYTICS ------------------------ */
// /* ---------------------------------------------------------------- */

// const WorkforceAnalytics = () => {
//   const total = employees.length;
//   const active = employees.filter(e => e.status === "active").length;
//   const exited = total - active;

//   const genderData = {
//     labels: ["Female", "Male"],
//     datasets: [{
//       data: [
//         employees.filter(e => e.gender === "female").length,
//         employees.filter(e => e.gender === "male").length,
//       ],
//       backgroundColor: ["#3b82f6", "#1e3a8a"],
//     }]
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <Kpi label="Total Staff" value={total} icon={HiUsers} />
//         <Kpi label="Active" value={active} icon={HiUserPlus} />
//         <Kpi label="Attrition" value={`${((exited/total)*100).toFixed(1)}%`} icon={HiArrowTrendingDown} />
//         <Kpi label="Avg Tenure" value="2.8 yrs" icon={HiCalendar} />
//       </div>

//       <div className="bg-white p-8 rounded-2xl shadow-sm w-[400px]">
//         <h3 className="font-bold mb-4">Gender Distribution</h3>
//         <Doughnut data={genderData} />
//       </div>
//     </>
//   );
// };

// const Kpi = ({ label, value, icon: Icon }) => (
//   <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
//     <div className="flex justify-between mb-2">
//       <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
//       <Icon className="text-blue-500" size={20} />
//     </div>
//     <p className="text-2xl font-bold">{value}</p>
//   </div>
// );

// /* ---------------------------------------------------------------- */
// /* ------------------------- MAIN PAGE ----------------------------- */
// /* ---------------------------------------------------------------- */

// export default function Dashboard() {
//   const [view, setView] = useState("workforce");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className="text-slate-500">
//             {view === "workforce"
//               ? "Workforce analytics & insights"
//               : "System health & admin overview"}
//           </p>
//         </div>

//         {/* TOGGLE */}
//         <div className="flex bg-white border border-blue-100 rounded-xl overflow-hidden">
//           <button
//             onClick={() => setView("workforce")}
//             className={`px-5 py-2 text-sm font-semibold ${
//               view === "workforce" ? "bg-blue-600 text-white" : "text-slate-600"
//             }`}
//           >
//             Workforce
//           </button>
//           <button
//             onClick={() => setView("system")}
//             className={`px-5 py-2 text-sm font-semibold ${
//               view === "system" ? "bg-blue-600 text-white" : "text-slate-600"
//             }`}
//           >
//             System
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       {view === "workforce" ? <WorkforceAnalytics /> : <SystemDashboard />}
//     </div>
//   );
// }

// import React, { useState } from "react";

// /*
// ====================================================
// DASHBOARD WRAPPER (ONLY TOGGLE + PLACEHOLDERS)
// ====================================================
// */

// export default function Dashboard() {
//   const [view, setView] = useState("workforce");

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10">

//       {/* ============================================
//           HEADER + TOGGLE BUTTONS
//           ============================================ */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold text-blue-900">
//             {view === "workforce"
//               ? "Workforce Analytics"
//               : "System Dashboard"}
//           </h1>

//           <p className="text-slate-500 font-medium">
//             {view === "workforce"
//               ? "Real-time personnel monitoring & retention insights"
//               : "Monitor platform health & admin activity"}
//           </p>
//         </div>

//         {/* TOGGLE BUTTONS */}
//         <div className="flex bg-white border border-blue-100 rounded-xl overflow-hidden">
//           <button
//             onClick={() => setView("workforce")}
//             className={`px-5 py-2 text-sm font-semibold ${
//               view === "workforce"
//                 ? "bg-blue-600 text-white"
//                 : "text-slate-600"
//             }`}
//           >
//             Workforce
//           </button>

//           <button
//             onClick={() => setView("system")}
//             className={`px-5 py-2 text-sm font-semibold ${
//               view === "system"
//                 ? "bg-blue-600 text-white"
//                 : "text-slate-600"
//             }`}
//           >
//             System
//           </button>
//         </div>
//       </div>

//       {/* ============================================
//           CONTENT AREA
//           ============================================ */}

//       {view === "workforce" && (
//         <>
          
//         </>
//       )}

//       {view === "system" && (
//         <>
//           {/* ========================================
//               👇 PASTE YOUR SECOND DASHBOARD CODE HERE
//               System / Superadmin Dashboard
//               ======================================== */}
//         </>
//       )}

//     </div>
//   );
// }

// import React, { useState } from "react";
// import SuperAdminWorkforceWithHRAnalytics from "./SuperAdminWorkforceWithHRAnalytics";
// later you will import system dashboard here

// export default function SuperAdminDashboard() {
//   const [view, setView] = useState("workforce");

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10">

//       {/* HEADER + TOGGLE */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold text-blue-900">
//             {view === "workforce"
//               ? "Workforce Analytics"
//               : "System Dashboard"}
//           </h1>

//           <p className="text-slate-500 font-medium">
//             {view === "workforce"
//               ? "Real-time personnel monitoring & retention insights"
//               : "Monitor platform health & admin activity"}
//           </p>
//         </div>

//         {/* TOGGLE */}
//         <div className="flex bg-white border border-blue-100 rounded-xl overflow-hidden">
//           <button
//             onClick={() => setView("workforce")}
//             className={`px-5 py-2 text-sm font-semibold ${
//               view === "workforce"
//                 ? "bg-blue-600 text-white"
//                 : "text-slate-600"
//             }`}
//           >
//             Workforce
//           </button>

//           <button
//             onClick={() => setView("system")}
//             className={`px-5 py-2 text-sm font-semibold ${
//               view === "system"
//                 ? "bg-blue-600 text-white"
//                 : "text-slate-600"
//             }`}
//           >
//             System
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       {view === "workforce" && <SuperAdminWorkforceWithHRAnalytics />}

//       {/* {view === "system" && (
//         <>
        

//         </>
//       )} */}
//       {/* {view === "system" && <SuperAdminSystemDashboard />} */}
//     </div>
//   );
// }

import React, { useState } from "react";
import SuperAdminWorkforceWithHRAnalytics from "./SuperAdminWorkforceWithHRAnalytics";
import SuperAdminSystemDashboard from "./SuperAdminSystemDashboard";

export default function SuperAdminDashboard() {
  const [view, setView] = useState("workforce");

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">

      {/* HEADER + TOGGLE */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900">
            {view === "workforce"
              ? "Workforce Analytics"
              : "System Dashboard"}
          </h1>

          <p className="text-slate-500 font-medium">
            {view === "workforce"
              ? "Real-time personnel monitoring & retention insights"
              : "Monitor the health of your platform and company activity"}
          </p>
        </div>

        {/* TOGGLE BUTTON */}
        <div className="flex bg-white border border-blue-100 rounded-xl overflow-hidden">
          <button
            onClick={() => setView("workforce")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              view === "workforce"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-blue-50"
            }`}
          >
            Workforce
          </button>

          <button
            onClick={() => setView("system")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              view === "system"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-blue-50"
            }`}
          >
            System
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {view === "workforce" && <SuperAdminWorkforceWithHRAnalytics />}

      {view === "system" && <SuperAdminSystemDashboard />}
    </div>
  );
}
