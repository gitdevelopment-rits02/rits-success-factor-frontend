// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import {
//   HiUsers,
//   HiUserPlus,
//   HiCalendarDays,
// } from "react-icons/hi2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// export default function HRDashboardRedesign() {
//   return (
//     <div className="min-h-screen bg-slate-100 px-10 py-8 text-slate-800 font-sans">
//       {/* PAGE TITLE */}
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold tracking-tight">HR Dashboard</h1>
//         <p className="text-sm text-slate-500">
//           Workforce overview & approvals
//         </p>
//       </header>

//       <div className="grid grid-cols-12 gap-8">
//         {/* LEFT SIDEBAR */}
//         <aside className="col-span-3 space-y-6">
//           <Stat
//             icon={HiUserPlus}
//             label="New today"
//             value="5"
//             delta="+1"
//           />
//           <Stat
//             icon={HiUsers}
//             label="This week"
//             value="32"
//             delta="+2"
//           />
//           <Stat
//             icon={HiUsers}
//             label="Total employees"
//             value="1,204"
//           />

//           <Card title="Upcoming leave">
//             <Leave name="John Doe" sub="Half day · Apr 3" active />
//             <Leave name="Jane Smith" sub="Vacation · Apr 8–12" />
//             <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
//               View all →
//             </button>
//           </Card>
//         </aside>

//         {/* MAIN */}
//         <main className="col-span-6 space-y-8">
//           <Card>
//             <Calendar />
//           </Card>

//           <Card title="Department distribution">
//             <div className="h-52">
//               <Bar
//                 data={{
//                   labels: ["Sales", "Marketing", "Engineering", "Support"],
//                   datasets: [
//                     {
//                       data: [80, 45, 70, 60],
//                       backgroundColor: "#2563eb",
//                       borderRadius: 6,
//                       barThickness: 28,
//                     },
//                   ],
//                 }}
//                 options={{
//                   maintainAspectRatio: false,
//                   plugins: {
//                     tooltip: {
//                       callbacks: {
//                         label: (ctx) => `${ctx.raw} employees`,
//                       },
//                     },
//                   },
//                   scales: {
//                     x: { grid: { display: false } },
//                     y: { display: false },
//                   },
//                 }}
//               />
//             </div>
//           </Card>
//         </main>

//         {/* RIGHT */}
//         <aside className="col-span-3">
//           <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
//             <h3 className="font-semibold mb-6">Pending actions</h3>

//             <div className="space-y-5">
//               <Metric value="2" label="Timesheets" />
//               <Metric value="9" label="Leave approvals" />
//             </div>

//             <button className="mt-8 w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50">
//               Review now
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

// /* ---------------- UI BLOCKS ---------------- */

// const Card = ({ title, children }) => (
//   <div className="bg-white rounded-xl p-6 border border-slate-200">
//     {title && (
//       <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
//     )}
//     {children}
//   </div>
// );

// const Stat = ({ icon: Icon, label, value, delta }) => (
//   <div className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4">
//     <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
//       <Icon className="text-slate-600" size={20} />
//     </div>
//     <div>
//       <p className="text-xs uppercase font-medium text-slate-500">
//         {label}
//       </p>
//       <div className="flex items-end gap-2">
//         <span className="text-2xl font-bold">{value}</span>
//         {delta && (
//           <span className="text-xs font-semibold text-green-600">
//             {delta}
//           </span>
//         )}
//       </div>
//     </div>
//   </div>
// );

// const Leave = ({ name, sub, active }) => (
//   <div className="flex items-center gap-3 mb-4">
//     <div
//       className={`w-9 h-9 rounded-full flex items-center justify-center ${
//         active
//           ? "bg-blue-600 text-white"
//           : "bg-slate-100 text-slate-600"
//       }`}
//     >
//       <HiCalendarDays size={18} />
//     </div>
//     <div>
//       <p className="text-sm font-semibold">{name}</p>
//       <p className="text-xs text-slate-500">{sub}</p>
//     </div>
//   </div>
// );

// const Metric = ({ value, label }) => (
//   <div>
//     <span className="text-3xl font-bold">{value}</span>
//     <span className="ml-2 text-blue-200">{label}</span>
//   </div>
// );

// /* ---------------- CALENDAR ---------------- */

// const Calendar = () => {
//   const [date, setDate] = React.useState(new Date());
//   const year = date.getFullYear();
//   const month = date.getMonth();

//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const today = new Date();

//   const days = [];
//   for (let i = 0; i < firstDay; i++) days.push(null);
//   for (let d = 1; d <= daysInMonth; d++)
//     days.push(new Date(year, month, d));

//   const isToday = (d) =>
//     d &&
//     d.getDate() === today.getDate() &&
//     d.getMonth() === today.getMonth() &&
//     d.getFullYear() === today.getFullYear();

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-5">
//         <h3 className="font-semibold">
//           {date.toLocaleString("default", {
//             month: "long",
//             year: "numeric",
//           })}
//         </h3>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setDate(new Date(year, month - 1, 1))}
//             className="px-2 py-1 border rounded hover:bg-slate-100"
//           >
//             ‹
//           </button>
//           <button
//             onClick={() => setDate(new Date(year, month + 1, 1))}
//             className="px-2 py-1 border rounded hover:bg-slate-100"
//           >
//             ›
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-7 text-xs text-slate-400 mb-2 text-center">
//         {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
//           <div key={d}>{d}</div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-2 text-center">
//         {days.map((d, i) => (
//           <div
//             key={i}
//             className={`h-10 flex items-center justify-center rounded-lg cursor-pointer
//               ${
//                 d
//                   ? isToday(d)
//                     ? "bg-blue-600 text-white font-semibold shadow"
//                     : "hover:bg-slate-100 text-slate-700"
//                   : ""
//               }`}
//           >
//             {d ? d.getDate() : ""}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import {
//   HiUsers,
//   HiUserPlus,
//   HiCalendarDays,
//   HiCheckBadge,
//   HiArrowTrendingUp,
// } from "react-icons/hi2";
// import { Link } from "react-router-dom";
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// export default function HRDashboardMain() {
//   return (
//     <div className="flex-1 min-h-screen bg-blue-50/50 p-8 font-sans">
//       {/* HEADER SECTION */}
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
//           <p className="text-blue-500 font-medium">Metrics for April 2024</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-white border border-blue-100 text-blue-600 rounded-xl font-semibold shadow-sm hover:bg-blue-50 transition-all">
//             Download Report
//           </button>
//           {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
//             + Add Employee
//           </button> */}
//           <Link
//             to="/superadmin/adminmanagement"
//             className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all inline-block"
//           >
//             + Add Employee
//           </Link>
//         </div>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         {/* TOP STATS - Full Width */}
//         <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
//           <StatCard icon={HiUsers} label="Total Staff" value="1,284"  color="blue" />
//           <StatCard icon={HiUserPlus} label="New Hires" value="24"  color="sky" />
//           <StatCard icon={HiCalendarDays} label="On Leave" value="12" sub="Currently out" color="indigo" />
//           <StatCard icon={HiCheckBadge} label="Retention" value="98.2%"  color="blue" />
//         </div>

//         {/* LEFT: MAIN ANALYTICS */}
//         <div className="col-span-12 lg:col-span-8 space-y-6">
//           <Card title="Department Headcount">
//             <div className="h-[300px] w-full mt-4">
//               <Bar
//                 data={{
//                   labels: ["Design", "Dev", "Marketing", "Sales", "Ops"],
//                   datasets: [{
//                     data: [45, 110, 65, 85, 30],
//                     backgroundColor: "#60a5fa", // sky-400
//                     borderRadius: 12,
//                     hoverBackgroundColor: "#2563eb",
//                     barThickness: 40,
//                   }],
//                 }}
//                 options={{
//                   maintainAspectRatio: false,
//                   plugins: { legend: { display: false } },
//                   scales: {
//                     y: { border: { display: false }, grid: { color: "#f1f5f9" } },
//                     x: { border: { display: false }, grid: { display: false } }
//                   }
//                 }}
//               />
//             </div>
//           </Card>

//           {/* <div className="grid grid-cols-2 gap-6">
//              <Card title="Quick Tasks">
//                 <div className="space-y-3">
//                   <TaskItem label="Verify payroll batch #42" urgent />
//                   <TaskItem label="Approve Q1 Bonus structure" />
//                   <TaskItem label="Review 12 pending resumes" />
//                 </div>
//              </Card>
//              <Card title="Upcoming Birthdays">
//                 <div className="flex -space-x-3 overflow-hidden p-2">
//                   {[1, 2, 3, 4, 5].map(i => (
//                     <img key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white" src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
//                   ))}
//                   <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 text-xs font-bold ring-4 ring-white">+3</div>
//                 </div>
//                 <p className="text-sm text-slate-500 mt-4">5 birthdays this week!</p>
//              </Card>
//           </div> */}
//         </div>

//         {/* RIGHT: APPROVALS & LEAVE */}
//         <div className="col-span-12 lg:col-span-4 space-y-6">
//           <Card title="Pending Approvals" highlight>
//             <div className="space-y-4">
//               <ApprovalRow name="Marcus Finn" type="Annual Leave" days="3 Days" />
//               <ApprovalRow name="Elena Rodriguez" type="Sick Leave" days="1 Day" />
//               <ApprovalRow name="Kevin Vark" type="Maternity" days="4 Months" />
//               <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors mt-2">
//                 Go to Approval Center
//               </button>
//             </div>
//           </Card>

//           {/* <Card title="Recent Activity">
//             <div className="space-y-6 relative">
//               <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-blue-50"></div>
//               <ActivityItem text="New employee 'Sarah J' onboarded" time="2h ago" />
//               <ActivityItem text="Payroll successfully processed" time="5h ago" />
//               <ActivityItem text="Policy update sent to all staff" time="Yesterday" />
//             </div>
//           </Card> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- HELPER COMPONENTS ---------------- */

// const StatCard = ({ icon: Icon, label, value, growth, sub, color }) => (
//   <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
//     <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-600 mb-4 group-hover:scale-110 transition-transform`}>
//       <Icon size={24} />
//     </div>
//     <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
//     <div className="flex items-baseline justify-between mt-1">
//       <h3 className="text-2xl font-black text-slate-800">{value}</h3>
//       {growth && (
//         <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
//           <HiArrowTrendingUp className="mr-1" /> {growth}
//         </span>
//       )}
//       {sub && <span className="text-xs text-slate-400">{sub}</span>}
//     </div>
//   </div>
// );

// const Card = ({ title, children, highlight }) => (
//   <div className={`bg-white p-6 rounded-3xl shadow-sm border ${highlight ? 'border-blue-200' : 'border-blue-100/50'}`}>
//     <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
//     {children}
//   </div>
// );

// const ApprovalRow = ({ name, type, days }) => (
//   <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 hover:border-blue-100 transition-colors group cursor-pointer">
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white overflow-hidden">
//         <img src={`https://i.pravatar.cc/100?u=${name}`} alt="" />
//       </div>
//       <div>
//         <p className="text-sm font-bold text-slate-800">{name}</p>
//         <p className="text-[11px] text-slate-400 font-medium">{type}</p>
//       </div>
//     </div>
//     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{days}</span>
//   </div>
// );

// const TaskItem = ({ label, urgent }) => (
//   <div className="flex items-center gap-3 p-2 group cursor-pointer">
//     <div className={`w-2 h-2 rounded-full ${urgent ? 'bg-red-400 animate-pulse' : 'bg-blue-300'}`}></div>
//     <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors font-medium">{label}</span>
//   </div>
// );

// const ActivityItem = ({ text, time }) => (
//   <div className="flex gap-4 relative z-10">
//     <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-50 flex-shrink-0"></div>
//     <div>
//       <p className="text-sm font-medium text-slate-700 leading-tight">{text}</p>
//       <p className="text-[11px] text-slate-400 font-semibold">{time}</p>
//     </div>
//   </div>
// );
