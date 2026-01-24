import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  HiUsers,
  HiUserPlus,
  HiCalendarDays,
} from "react-icons/hi2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function HRDashboardRedesign() {
  return (
    <div className="min-h-screen bg-slate-100 px-10 py-8 text-slate-800 font-sans">
      {/* PAGE TITLE */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">HR Dashboard</h1>
        <p className="text-sm text-slate-500">
          Workforce overview & approvals
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-3 space-y-6">
          <Stat
            icon={HiUserPlus}
            label="New today"
            value="5"
            delta="+1"
          />
          <Stat
            icon={HiUsers}
            label="This week"
            value="32"
            delta="+2"
          />
          <Stat
            icon={HiUsers}
            label="Total employees"
            value="1,204"
          />

          <Card title="Upcoming leave">
            <Leave name="John Doe" sub="Half day · Apr 3" active />
            <Leave name="Jane Smith" sub="Vacation · Apr 8–12" />
            <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
              View all →
            </button>
          </Card>
        </aside>

        {/* MAIN */}
        <main className="col-span-6 space-y-8">
          <Card>
            <Calendar />
          </Card>

          <Card title="Department distribution">
            <div className="h-52">
              <Bar
                data={{
                  labels: ["Sales", "Marketing", "Engineering", "Support"],
                  datasets: [
                    {
                      data: [80, 45, 70, 60],
                      backgroundColor: "#2563eb",
                      borderRadius: 6,
                      barThickness: 28,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (ctx) => `${ctx.raw} employees`,
                      },
                    },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { display: false },
                  },
                }}
              />
            </div>
          </Card>
        </main>

        {/* RIGHT */}
        <aside className="col-span-3">
          <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-semibold mb-6">Pending actions</h3>

            <div className="space-y-5">
              <Metric value="2" label="Timesheets" />
              <Metric value="9" label="Leave approvals" />
            </div>

            <button className="mt-8 w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50">
              Review now
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- UI BLOCKS ---------------- */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 border border-slate-200">
    {title && (
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
    )}
    {children}
  </div>
);

const Stat = ({ icon: Icon, label, value, delta }) => (
  <div className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4">
    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
      <Icon className="text-slate-600" size={20} />
    </div>
    <div>
      <p className="text-xs uppercase font-medium text-slate-500">
        {label}
      </p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {delta && (
          <span className="text-xs font-semibold text-green-600">
            {delta}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Leave = ({ name, sub, active }) => (
  <div className="flex items-center gap-3 mb-4">
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center ${
        active
          ? "bg-blue-600 text-white"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      <HiCalendarDays size={18} />
    </div>
    <div>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  </div>
);

const Metric = ({ value, label }) => (
  <div>
    <span className="text-3xl font-bold">{value}</span>
    <span className="ml-2 text-blue-200">{label}</span>
  </div>
);

/* ---------------- CALENDAR ---------------- */

const Calendar = () => {
  const [date, setDate] = React.useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    days.push(new Date(year, month, d));

  const isToday = (d) =>
    d &&
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold">
          {date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setDate(new Date(year, month - 1, 1))}
            className="px-2 py-1 border rounded hover:bg-slate-100"
          >
            ‹
          </button>
          <button
            onClick={() => setDate(new Date(year, month + 1, 1))}
            className="px-2 py-1 border rounded hover:bg-slate-100"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-xs text-slate-400 mb-2 text-center">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((d, i) => (
          <div
            key={i}
            className={`h-10 flex items-center justify-center rounded-lg cursor-pointer
              ${
                d
                  ? isToday(d)
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "hover:bg-slate-100 text-slate-700"
                  : ""
              }`}
          >
            {d ? d.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

