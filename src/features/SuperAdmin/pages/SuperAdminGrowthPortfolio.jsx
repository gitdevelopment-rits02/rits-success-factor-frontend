import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell, 
} from "recharts";


import {
  FiGrid,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiSettings,
  FiTrendingUp,
  FiAward,
  FiHome,
  FiSend,
} from "react-icons/fi";


import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/*  CONSTANTS  */

const TOTAL_EMPLOYEES = 542;
const COLORS = ["#2563eb", "#3b82f6", "#facc15", "#9ca3af"];

/*  DATA  */

const metrics = [
  { title: "Total Revenue", value: "$4,280,500", change: "+12.5%" },
  { title: "Employee Growth", value: "542 Employees", change: "+8.2%" },
  { title: "Retention Rate", value: "94.8%", change: "+1.8%" },
];

const headcountData = [
  { label: "Jan", count: 390 },
  { label: "Feb", count: 405 },
  { label: "Mar", count: 395 },
  { label: "Apr", count: 425 },
  { label: "May", count: 438 },
  { label: "Jun", count: 450 },
  { label: "Jul", count: 470 },
  { label: "Aug", count: 468 },
  { label: "Sep", count: 500 },
  { label: "Oct", count: 515 },
  { label: "Nov", count: 528 },
  { label: "Dec", count: 542 },
];

const departmentDistribution = [
  { name: "Engineering", value: 35 },
  { name: "Sales & Marketing", value: 20 },
  { name: "Operations", value: 15 },
  { name: "Other", value: 30 },
];

const departmentPerformance = [
  { department: "Engineering", employees: 189, efficiency: 82, trend: "+4.2%" },
  { department: "Product", employees: 42, efficiency: 76, trend: "+2.1%" },
  { department: "Marketing", employees: 76, efficiency: 68, trend: "-0.8%" },
];

const milestones = [
  {
    title: "Reached 500 Employees",
    description: "Global headcount reached a new milestone",
    time: "2 days ago",
    icon: <FiTrendingUp className="text-green-600" />,
  },
  {
    title: "New Office Opened",
    description: "Berlin regional headquarters operational",
    time: "1 week ago",
    icon: <FiHome className="text-blue-600" />,
  },
  {
    title: "Industry Excellence Award",
    description: "Top 10 Best Places to Work",
    time: "2 weeks ago",
    icon: <FiAward className="text-yellow-500" />,
  },
  {
    title: "Q3 Strategy Launch",
    description: "Annual alignment completed",
    time: "1 month ago",
    icon: <FiSend className="text-purple-600" />,
  },
];


/* ---------- COMPONENT ---------- */

export default function SuperAdminGrowthPortfolio() {
  const pdfRef = useRef(null);

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("l", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Company_Performance_Report.pdf");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 font-bold text-blue-600 text-lg">HR Portal</div>
        <nav className="flex-1 px-4 space-y-2 text-sm">
          <SidebarItem icon={<FiGrid size={18} />} label="Dashboard" active />
          <SidebarItem icon={<FiClock size={18} />} label="Timesheets" />
          <SidebarItem icon={<FiCheckCircle size={18} />} label="Approvals" />
          <SidebarItem icon={<FiUser size={18} />} label="My Profile" />
          <SidebarItem icon={<FiSettings size={18} />} label="Settings" />
        </nav>
      </aside> */}

      {/* MAIN */}
      <main ref={pdfRef} className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Company Performance</h1>
            <p className="text-sm text-gray-500">
              Real-time executive overview of organizational health
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Q3 2024</option>
            </select>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>Annual</option>
            </select>
            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Download Report
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-gray-500">{m.title}</p>
              <h2 className="text-2xl font-semibold">{m.value}</h2>
              <p className="text-sm text-green-600">{m.change}</p>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADCOUNT SECTION */}
            <div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Headcount Growth</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={headcountData}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="count" stroke="#2563eb" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PERFORMANCE SECTION */}
            <div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Performance by Department</h3>
                <table className="w-full text-sm">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="text-left py-2">Department</th>
                      <th>Employees</th>
                      <th>Efficiency</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentPerformance.map((d, i) => (
                      <tr key={i} className="border-b last:border-none">
                        <td className="py-3">{d.department}</td>
                        <td className="text-center">{d.employees}</td>
                        <td>
                          <div className="bg-gray-200 h-2 rounded-full">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${d.efficiency}%` }}
                            />
                          </div>
                        </td>
                        <td
                          className={`text-center ${
                            d.trend.startsWith("-")
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {d.trend}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* DISTRIBUTION SECTION */}
            <div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Department Distribution</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={departmentDistribution} dataKey="value" innerRadius={70} outerRadius={100}>
                    {departmentDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>

                    <text
                      x="50%"
                      y="48%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-800 text-xl font-semibold"
                    >
                      {TOTAL_EMPLOYEES}
                    </text>
                    <text
                      x="50%"
                      y="58%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-500 text-xs"
                    >
                      TOTAL EMPLOYEE
                    </text>
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-2 text-sm">
                  {departmentDistribution.map((d, i) => {
                    const count = Math.round((d.value / 100) * TOTAL_EMPLOYEES);
                    return (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[i] }}
                          />
                          <span>{d.name}</span>
                        </div>
                        <span className="text-gray-600">
                          {count} ({d.value}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MILESTONES SECTION */}
            <div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Recent Milestones</h3>
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-3 border-b pb-3 last:border-none">
                    <div>{m.icon}</div>
                    <div>
                      <p className="font-medium">{m.title}</p>
                      <p className="text-sm text-gray-500">{m.description}</p>
                      <p className="text-xs text-gray-400">{m.time}</p>
                    </div>
                  </div>
                ))}
                <button className="mt-4 w-full text-sm text-blue-600 border rounded-md py-2">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}




