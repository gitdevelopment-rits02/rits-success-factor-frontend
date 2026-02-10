// import React, { useState, useMemo } from "react";
// import {
//   FiUsers,
//   FiHome,
//   FiXCircle,
//   FiClock,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiSearch,
//   FiFilter
// } from "react-icons/fi";

// // --- Extended Dummy Data ---
// const INITIAL_DATA = [
//   { id: 1, name: "John Smith", dept: "Sales", time: "9:05 AM", status: "In Office", color: "text-blue-600" },
//   { id: 2, name: "Emily Davis", dept: "Marketing", time: "—", status: "WFH", color: "text-cyan-500" },
//   { id: 3, name: "Michael Lee", dept: "HR", time: "—", status: "Absent", color: "text-slate-400" },
//   { id: 4, name: "Sarah Johnson", dept: "IT", time: "8:55 AM", status: "In Office", color: "text-blue-600" },
//   { id: 5, name: "David Chen", dept: "IT", time: "9:15 AM", status: "In Office", color: "text-blue-600" },
//   { id: 6, name: "Angela Moss", dept: "Finance", time: "—", status: "On Leave", color: "text-indigo-400" },
//   { id: 7, name: "Chris Evans", dept: "Sales", time: "—", status: "WFH", color: "text-cyan-500" },
//   { id: 8, name: "Jessica Alba", dept: "Marketing", time: "9:02 AM", status: "In Office", color: "text-blue-600" },
//   { id: 9, name: "Robert Fox", dept: "Finance", time: "—", status: "Absent", color: "text-slate-400" },
//   { id: 10, name: "Linda Blair", dept: "IT", time: "8:30 AM", status: "In Office", color: "text-blue-600" },
// ];

// export default function Dashboard() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDept, setSelectedDept] = useState("All");
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   // --- Logic: Filtering ---
//   const filteredEmployees = useMemo(() => {
//     return INITIAL_DATA.filter((emp) => {
//       const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesDept = selectedDept === "All" || emp.dept === selectedDept;
//       const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
//       return matchesSearch && matchesDept && matchesStatus;
//     });
//   }, [searchTerm, selectedDept, selectedStatus]);

//   // --- Logic: Stats Calculation ---
//   const stats = {
//     total: INITIAL_DATA.length,
//     inOffice: INITIAL_DATA.filter(e => e.status === "In Office").length,
//     wfh: INITIAL_DATA.filter(e => e.status === "WFH").length,
//     absent: INITIAL_DATA.filter(e => e.status === "Absent").length,
//   };

//   return (
//     <div className="min-h-screen bg-blue-50/50 p-4 md:p-8 text-slate-700 font-sans">
//       {/* Header */}
//       <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
       
        
//         <div className="relative group">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
//           <input 
//             type="text"
//             placeholder="Search employees..."
//             className="pl-10 pr-4 py-2 rounded-xl border border-blue-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-64 transition-all"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </header>

//       <div className="grid grid-cols-12 gap-6">
//         {/* Sidebar Filters */}
//         <aside className="col-span-12 lg:col-span-3 space-y-6">
//           <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50">
//             <div className="flex items-center gap-2 mb-6 text-blue-900 font-bold">
//               <FiFilter />
//               <h2>Filters</h2>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Department</label>
//                 <select 
//                   className="mt-2 w-full rounded-lg border border-blue-100 bg-blue-50/30 p-2.5 text-sm outline-none focus:border-blue-400"
//                   value={selectedDept}
//                   onChange={(e) => setSelectedDept(e.target.value)}
//                 >
//                   <option>All</option>
//                   <option>Sales</option>
//                   <option>Marketing</option>
//                   <option>IT</option>
//                   <option>Finance</option>
//                   <option>HR</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Quick Status</label>
//                 <div className="mt-3 space-y-1">
//                   <FilterButton 
//                     label="All" 
//                     active={selectedStatus === "All"} 
//                     onClick={() => setSelectedStatus("All")} 
//                   />
//                   <FilterButton 
//                     icon={FiCheckCircle} 
//                     label="In Office" 
//                     active={selectedStatus === "In Office"} 
//                     onClick={() => setSelectedStatus("In Office")} 
//                     color="text-blue-600" 
//                   />
//                   <FilterButton 
//                     icon={FiHome} 
//                     label="WFH" 
//                     active={selectedStatus === "WFH"} 
//                     onClick={() => setSelectedStatus("WFH")} 
//                     color="text-cyan-500" 
//                   />
//                   <FilterButton 
//                     icon={FiXCircle} 
//                     label="Absent" 
//                     active={selectedStatus === "Absent"} 
//                     onClick={() => setSelectedStatus("Absent")} 
//                     color="text-slate-400" 
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="col-span-12 lg:col-span-9 space-y-6">
//           {/* KPI Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             <Stat title="Total Staff" value={stats.total} icon={FiUsers} color="text-blue-600" />
//             <Stat title="Present" value={stats.inOffice} icon={FiCheckCircle} color="text-blue-500" />
//             <Stat title="Remote" value={stats.wfh} icon={FiHome} color="text-cyan-500" />
//             <Stat title="Absence" value={stats.absent} icon={FiXCircle} color="text-slate-400" />
//           </div>

//           {/* Attendance Table */}
//           <section className="rounded-2xl bg-white shadow-sm border border-blue-50 overflow-hidden">
//             <div className="p-6 border-b border-blue-50 flex justify-between items-center">
//               <h2 className="font-bold text-blue-900">Attendance Roster</h2>
//               <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
//                 {filteredEmployees.length} Results
//               </span>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-blue-50/50 text-left text-blue-400 uppercase text-[10px] font-bold tracking-widest">
//                   <tr>
//                     <th className="px-6 py-4">Employee</th>
//                     <th className="px-6 py-4">Status</th>
//                     <th className="px-6 py-4">Department</th>
//                     <th className="px-6 py-4">Check-In</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-blue-50">
//                   {filteredEmployees.map((emp) => (
//                     <TableRow key={emp.id} {...emp} />
//                   ))}
//                   {filteredEmployees.length === 0 && (
//                     <tr>
//                       <td colSpan="4" className="py-12 text-center text-slate-400">
//                         No employees found matching those filters.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// // --- Sub-Components ---

// function Stat({ title, value, icon: Icon, color }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
//       <div className="flex justify-between items-start">
//         <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
//         <Icon className={`text-xl ${color}`} />
//       </div>
//       <p className="mt-3 text-3xl font-bold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function TableRow({ name, status, dept, time, color }) {
//   const getIcon = () => {
//     if (status === "In Office") return FiCheckCircle;
//     if (status === "WFH") return FiHome;
//     if (status === "Absent") return FiXCircle;
//     return FiAlertTriangle;
//   };
//   const Icon = getIcon();

//   return (
//     <tr className="hover:bg-blue-50/30 transition-colors group">
//       <td className="px-6 py-4 font-semibold text-slate-700">{name}</td>
//       <td className="px-6 py-4">
//         <div className={`flex items-center gap-2 font-medium ${color}`}>
//           <Icon />
//           {status}
//         </div>
//       </td>
//       <td className="px-6 py-4 text-slate-500">{dept}</td>
//       <td className="px-6 py-4 text-slate-400 font-mono">{time}</td>
//     </tr>
//   );
// }

// function FilterButton({ icon: Icon, label, active, onClick, color = "text-slate-600" }) {
//   return (
//     <button 
//       onClick={onClick}
//       className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
//         active 
//           ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
//           : "text-slate-600 hover:bg-blue-50"
//       }`}
//     >
//       {Icon && <Icon className={active ? "text-white" : color} />}
//       <span className={active ? "font-bold" : "font-medium"}>{label}</span>
//     </button>
//   );
// }

import { useState, useMemo } from 'react';
import { FiUsers, FiHome, FiXCircle, FiCheckCircle, FiAlertTriangle, FiSearch, FiFilter, FiCalendar, FiLogOut, FiBell, FiChevronLeft, FiBriefcase } from 'react-icons/fi';

// Sample data - in a real app this would come from an API
const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Smith', dept: 'Sales', time: '9:05 AM', status: 'In Office', color: 'text-blue-600' },
  { id: 2, name: 'Emily Davis', dept: 'Marketing', time: '—', status: 'WFH', color: 'text-cyan-500' },
  { id: 3, name: 'Michael Lee', dept: 'HR', time: '—', status: 'Absent', color: 'text-slate-400' },
  { id: 4, name: 'Sarah Johnson', dept: 'IT', time: '8:55 AM', status: 'In Office', color: 'text-blue-600' },
  { id: 5, name: 'David Chen', dept: 'IT', time: '9:15 AM', status: 'In Office', color: 'text-blue-600' },
  { id: 6, name: 'Angela Moss', dept: 'Finance', time: '—', status: 'On Leave', color: 'text-indigo-400' },
  { id: 7, name: 'Chris Evans', dept: 'Sales', time: '—', status: 'WFH', color: 'text-cyan-500' },
  { id: 8, name: 'Jessica Alba', dept: 'Marketing', time: '9:02 AM', status: 'In Office', color: 'text-blue-600' },
  { id: 9, name: 'Robert Fox', dept: 'Finance', time: '—', status: 'Absent', color: 'text-slate-400' },
  { id: 10, name: 'Linda Blair', dept: 'IT', time: '8:30 AM', status: 'In Office', color: 'text-blue-600' },
];

// Calendar data generator
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  const announcements = [
    {
      id: 1,
      title: 'Company Townhall This Friday',
      description: 'Join us for Q4 review and 2026 roadmap discussion at 3 PM in the main auditorium.',
      date: '2 hours ago',
      type: 'meeting',
      read: false
    },
    {
      id: 2,
      title: 'New Health Insurance Benefits',
      description: 'Enhanced coverage effective from March 1st. Please review the updated policy documents.',
      date: '1 day ago',
      type: 'benefits',
      read: false
    },
    {
      id: 3,
      title: 'Annual Performance Reviews',
      description: 'Please schedule your 1-on-1 with your manager before February 15th.',
      date: '2 days ago',
      type: 'hr',
      read: true
    }
  ];

  const leaveData = [
    { label: 'Casual Leave', used: 4, total: 12, pending: 8, color: 'bg-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { label: 'Sick Leave', used: 2, total: 10, pending: 8, color: 'bg-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { label: 'Earned Leave', used: 3, total: 15, pending: 12, color: 'bg-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { label: 'Maternity Leave', used: 0, total: 180, pending: 180, color: 'bg-rose-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' }
  ];

  const filteredEmployees = useMemo(() => {
    return INITIAL_EMPLOYEES.filter((emp) => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === 'All' || emp.dept === selectedDept;
      const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [searchTerm, selectedDept, selectedStatus]);

  const stats = {
    total: INITIAL_EMPLOYEES.length,
    inOffice: INITIAL_EMPLOYEES.filter(e => e.status === 'In Office').length,
    wfh: INITIAL_EMPLOYEES.filter(e => e.status === 'WFH').length,
    absent: INITIAL_EMPLOYEES.filter(e => e.status === 'Absent').length,
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, currentMonth: false, type: 'prev' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i).getDay();
      const isWeekend = day === 0 || day === 6;
      const today = new Date();
      const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      
      let dayType = 'present';
      if (isToday) dayType = 'today';
      else if (i === 15 || i === 26) dayType = 'holiday';
      else if (i === 13 || i === 20 || i === 27 || i === 28) dayType = 'absent';
      else if (i === 7 || i === 14) dayType = 'late';
      else if (isWeekend) dayType = 'weekend';
      
      days.push({ date: i, currentMonth: true, type: dayType });
    }

    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ date: i, currentMonth: false, type: 'next' });
    }

    return days;
  };

  const calendarData = generateCalendar();
  const calendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDayStyle = (day) => {
    if (!day.currentMonth) return 'bg-gray-50/50 text-gray-300 cursor-default opacity-40';
    
    const baseStyle = 'cursor-pointer border hover:scale-105 transition-transform';
    switch (day.type) {
      case 'today':
        return `${baseStyle} bg-blue-100 border-blue-300 text-blue-800 font-bold`;
      case 'holiday':
        return `${baseStyle} bg-red-50 border-red-200 text-red-700`;
      case 'absent':
        return `${baseStyle} bg-gray-50 border-gray-200 text-gray-700`;
      case 'late':
        return `${baseStyle} bg-yellow-50 border-yellow-200 text-yellow-700`;
      case 'weekend':
        return `${baseStyle} bg-gray-50 border-gray-200 text-gray-500`;
      default:
        return `${baseStyle} bg-green-50 border-green-200 text-green-700`;
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const handleQuickAction = (action) => {
    if (action === 'notifications') {
      setShowNotifications(!showNotifications);
    } else if (action === 'profile') {
      setShowProfileDetails(!showProfileDetails);
    } else {
      alert(`Opening ${action}...`);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 p-4 md:p-6 text-slate-700">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FiUsers className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Team Dashboard</h1>
            <p className="text-xs text-blue-500">Real-time attendance overview</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick actions */}
          <button 
            onClick={() => handleQuickAction('notifications')}
            className="relative p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100"
          >
            <FiBell className="w-4 h-4" />
            {announcements.filter(a => !a.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {announcements.filter(a => !a.read).length}
              </span>
            )}
          </button>
          
          {/* <button 
            onClick={() => handleQuickAction('profile')}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100"
          >
            <FiUsers className="w-4 h-4" />
          </button> */}
          
          <button 
            onClick={() => handleQuickAction('logout')}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100"
          >
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="mb-6 bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <FiBell className="text-blue-600" />
            Notifications ({announcements.length})
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {announcements.map(announcement => (
              <div key={announcement.id} className="p-3 bg-blue-50/30 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-blue-900 text-sm">{announcement.title}</h4>
                  <span className="text-xs text-blue-500">{announcement.date}</span>
                </div>
                <p className="text-xs text-blue-700">{announcement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Filters */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50">
            <div className="flex items-center gap-2 mb-6 text-blue-900 font-bold">
              <FiFilter />
              <h2>Filters</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Department</label>
                <select 
                  className="mt-2 w-full rounded-lg border border-blue-100 bg-blue-50/30 p-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option>All</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>HR</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Quick Status</label>
                <div className="mt-3 space-y-1">
                  <FilterButton 
                    icon={FiUsers}
                    label="All" 
                    active={selectedStatus === "All"} 
                    onClick={() => setSelectedStatus("All")} 
                  />
                  <FilterButton 
                    icon={FiCheckCircle} 
                    label="In Office" 
                    active={selectedStatus === "In Office"} 
                    onClick={() => setSelectedStatus("In Office")} 
                    color="text-blue-600" 
                  />
                  <FilterButton 
                    icon={FiHome} 
                    label="WFH" 
                    active={selectedStatus === "WFH"} 
                    onClick={() => setSelectedStatus("WFH")} 
                    color="text-cyan-500" 
                  />
                  <FilterButton 
                    icon={FiXCircle} 
                    label="Absent" 
                    active={selectedStatus === "Absent"} 
                    onClick={() => setSelectedStatus("Absent")} 
                    color="text-slate-400" 
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Stat title="Total Staff" value={stats.total} icon={FiUsers} color="text-blue-600" />
            <Stat title="Present" value={stats.inOffice} icon={FiCheckCircle} color="text-blue-500" />
            <Stat title="Remote" value={stats.wfh} icon={FiHome} color="text-cyan-500" />
            <Stat title="Absent" value={stats.absent} icon={FiXCircle} color="text-slate-400" />
          </div>

          {/* Calendar and Leave Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Calendar */}
            <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    <FiCalendar className="text-blue-600" />
                    Attendance Calendar
                  </h2>
                  <p className="text-xs text-blue-500 mt-1">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={() => setShowYearMonthPicker(!showYearMonthPicker)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-blue-100"
                >
                  <FiCalendar className="w-4 h-4" />
                </button>
              </div>

              {/* Year/Month Picker */}
              {showYearMonthPicker && (
                <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[2023, 2024, 2025, 2026, 2027].map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`p-2 text-xs rounded border ${selectedYear === year
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-blue-700 border-blue-200'
                          }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedMonth(index);
                          setCurrentMonth(new Date(selectedYear, index, 1));
                          setShowYearMonthPicker(false);
                        }}
                        className={`p-2 text-xs rounded border ${selectedMonth === index
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-blue-700 border-blue-200'
                          }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-lg transition-colors border border-blue-100"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-blue-900">
                  {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-lg transition-colors border border-blue-100"
                >
                  <FiChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5 mb-4">
                {calendarDays.map((day, index) => (
                  <div key={`day-${index}`} className="text-center font-bold text-blue-400 text-[10px] py-2 uppercase">
                    {day}
                  </div>
                ))}
                {calendarData.map((day, idx) => (
                  <button
                    key={`cal-${day.date}-${day.currentMonth ? 'curr' : 'oth'}-${idx}`}
                    className={`p-2 rounded-lg text-xs transition-all ${getDayStyle(day)}`}
                  >
                    <span className="font-semibold">{day.date}</span>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-blue-50">
                <div className="flex items-center gap-2 bg-green-50 px-2 py-1.5 rounded-lg border border-green-100">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-green-700">Present</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="text-[10px] font-bold text-gray-600">Absent</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-2 py-1.5 rounded-lg border border-yellow-100">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-[10px] font-bold text-yellow-700">Late</span>
                </div>
                <div className="flex items-center gap-2 bg-red-50 px-2 py-1.5 rounded-lg border border-red-100">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-[10px] font-bold text-red-700">Holiday</span>
                </div>
              </div>
            </div>

            {/* Leave Overview */}
            <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                  <FiBriefcase className="text-blue-600" />
                  Leave Entitlement
                </h2>
                <p className="text-xs text-blue-500 mt-1">Your available balances</p>
              </div>

              <div className="space-y-4">
                {leaveData.map((leave, index) => {
                  const percentage = (leave.used / leave.total) * 100;
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 border border-blue-50 hover:border-blue-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 ${leave.bgColor} rounded-lg flex items-center justify-center mr-3 border ${leave.borderColor}`}>
                            <FiCalendar className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-blue-900 text-sm">{leave.label}</p>
                            <p className="text-xs text-blue-500">{leave.total - leave.used} days left</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-blue-900">{leave.pending || leave.total - leave.used}</p>
                          <p className="text-[9px] text-blue-400 font-bold uppercase">Left</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                        <span className="text-blue-400">USED: {leave.used}</span>
                        <span className="text-blue-600">TOTAL: {leave.total}</span>
                      </div>
                      <div className="h-1.5 bg-blue-50 rounded-full overflow-hidden border border-blue-100">
                        <div
                          className={`h-full ${leave.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <section className="rounded-2xl bg-white shadow-sm border border-blue-50 overflow-hidden">
            <div className="p-6 border-b border-blue-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="font-bold text-blue-900 flex items-center gap-2">
                <FiUsers className="text-blue-600" />
                Attendance Roster
              </h2>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                  <input 
                    type="text"
                    placeholder="Search employees..."
                    className="pl-10 pr-4 py-2 rounded-xl border border-blue-100 bg-blue-50/30 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {filteredEmployees.length} Results
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50/50 text-left text-blue-400 uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Check-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {filteredEmployees.map((emp) => (
                    <TableRow key={emp.id} {...emp} />
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-blue-400">
                        No employees found matching those filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Sub-components
function Stat({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-400">{title}</p>
        <Icon className={`text-xl ${color}`} />
      </div>
      <p className="mt-3 text-3xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

function TableRow({ name, status, dept, time, color }) {
  const getIcon = () => {
    if (status === 'In Office') return FiCheckCircle;
    if (status === 'WFH') return FiHome;
    if (status === 'Absent') return FiXCircle;
    return FiAlertTriangle;
  };
  const Icon = getIcon();

  return (
    <tr className="hover:bg-blue-50/30 transition-colors">
      <td className="px-6 py-4 font-semibold text-blue-900">{name}</td>
      <td className="px-6 py-4">
        <div className={`flex items-center gap-2 font-medium ${color}`}>
          <Icon className="w-4 h-4" />
          {status}
        </div>
      </td>
      <td className="px-6 py-4 text-blue-500">{dept}</td>
      <td className="px-6 py-4 text-blue-400 font-mono text-xs">{time}</td>
    </tr>
  );
}

function FilterButton({ icon: Icon, label, active, onClick, color = 'text-slate-600' }) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
          : 'text-blue-600 hover:bg-blue-50'
      }`}
    >
      {Icon && <Icon className={active ? 'text-white' : color} />}
      <span className={active ? 'font-bold' : 'font-medium'}>{label}</span>
    </button>
  );
}
