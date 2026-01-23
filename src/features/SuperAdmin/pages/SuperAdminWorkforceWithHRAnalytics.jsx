import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  HiUsers,
  HiUserPlus,
  HiCalendarDays,
  HiMagnifyingGlass,
  HiBell,
  HiChevronDown,
} from "react-icons/hi2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function PerfectHRDashboard() {
  /* ---------------- CHART DATA ---------------- */
  const departmentData = {
    labels: ["Sales", "Marketing", "Engineering", "Support"],
    datasets: [
      {
        data: [80, 45, 70, 60],
        backgroundColor: "#3b82f6",
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 font-sans text-slate-800">

      {/* ================= TOP NAV ================= */}
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">HR Dashboard</h1>
        <div className="flex items-center gap-6">
          <HiMagnifyingGlass className="text-slate-400 text-xl cursor-pointer" />
          <div className="relative">
            <HiBell className="text-slate-400 text-xl cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/150?u=hr-admin"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              alt="profile"
            />
            <HiChevronDown className="text-slate-400" />
          </div>
        </div>
      </div> */}

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT COLUMN */}
        <div className="col-span-3 space-y-6">
          <StatCard icon={HiUserPlus} title="New Joining Today" value="05" sub="+1" />
          <StatCard icon={HiUsers} title="New Joining This Week" value="32" sub="+2" />
          <StatCard icon={HiUsers} title="Total Employees" value="1,204" />

          <Card title="Upcoming Leave">
            <div className="space-y-4">
              <LeaveRow name="John Doe" sub="Half Day · April 3" active />
              <LeaveRow name="Jane Smith" sub="Vacation · April 8–12" />
              <ActionLink label="Show all" />
            </div>
          </Card>
        </div>

        {/* CENTER COLUMN */}
        <div className="col-span-6 space-y-6">

          {/* CALENDAR */}
          <Card
            title="April 2024"
            headerAction={
              <div className="flex gap-2">
                <button className="px-2 py-1 border rounded">+</button>
                <button className="px-2 py-1 border rounded">{"<"}</button>
                <button className="px-2 py-1 border rounded">{">"}</button>
              </div>
            }
          >
            <Calendar />
          </Card>

          {/* ✅ DEPARTMENT SPLIT — MOVED HERE */}
          <Card title="Departmental Split">
            <div className="h-48">
              <Bar
                data={departmentData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false }, border: { display: false } },
                    y: { display: false },
                  },
                }}
              />
            </div>
          </Card>

        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-3 space-y-6">

          <div className="bg-blue-500 text-white rounded-[2rem] p-8 shadow-xl">
            <h3 className="font-semibold text-lg mb-6">Pending Actions</h3>
            <div className="space-y-4">
              <div>
                <span className="text-4xl font-bold">2</span>
                <span className="ml-2 text-blue-200">Timesheets</span>
              </div>
              <div>
                <span className="text-4xl font-bold">9</span>
                <span className="ml-2 text-blue-200">Leave Approvals</span>
              </div>
            </div>
            <button className="mt-8 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl text-sm w-full">
              View all
            </button>
          </div>

          {/* <Card title="Offline Employee Log">
            <div className="space-y-5">
              <LogRow name="John Doe" time="8:30 H:M" />
              <LogRow name="Jane Smith" time="4:15 H:M" />
              <LogRow name="Mike Johnson" time="1:50 H:M" />
            </div>
          </Card> */}

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Card = ({ title, children, headerAction }) => (
  <div className="bg-white/80 backdrop-blur rounded-[2rem] p-6 shadow-sm border border-blue-50">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      {headerAction}
    </div>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, title, value, sub }) => (
  <div className="bg-white rounded-[1.5rem] p-5 flex items-center gap-4 shadow-sm border border-blue-50">
    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
      <Icon className="text-blue-600" size={26} />
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {sub && <span className="text-sm font-bold text-green-500">{sub}</span>}
      </div>
    </div>
  </div>
);

const LeaveRow = ({ name, sub, active }) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        active ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
      }`}
    >
      <HiCalendarDays size={20} />
    </div>
    <div>
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  </div>
);

const LogRow = ({ name, time }) => (
  <div className="flex justify-between text-sm">
    <span className="font-semibold">{name}</span>
    <span className="text-slate-400 font-mono">{time}</span>
  </div>
);

const ActionLink = ({ label }) => (
  <button className="text-sm text-blue-600 font-bold hover:underline">
    {label} →
  </button>
);

const Calendar = () => (
  <div>
    <div className="grid grid-cols-7 text-[10px] font-bold text-slate-400 uppercase mb-4 text-center">
      {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
        <div key={d}>{d}</div>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`h-10 flex items-center justify-center rounded-lg ${
            i === 20
              ? "bg-blue-100 text-blue-600 ring-1 ring-blue-200"
              : "text-slate-400"
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);
