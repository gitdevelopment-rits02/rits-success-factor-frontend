import React from 'react';
import {
    HiUsers,
    HiUserPlus,
    HiEnvelope,
    HiPlus,
    HiChevronRight,
    HiCheckBadge
} from "react-icons/hi2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

/* ---------- REUSABLE COMPONENTS ---------- */
const Card = ({ title, children, extra, className = "" }) => (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col ${className}`}>
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">{title}</h3>
            {extra}
        </div>
        {children}
    </div>
);

const StatCard = ({ label, value, trend, icon: Icon }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 w-full">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-black text-slate-800">{value}</h2>
                {trend && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">+{trend}</span>}
            </div>
        </div>
    </div>
);

export default function HRCommandCenter() {
    const [announcements, setAnnouncements] = React.useState([
        {
            title: "Policy Update: PTO Rev. 2.0",
            details: "Published by John Doe",
            date: "2024-06-01",
            type: "blue",
        },
        {
            title: "Holiday Schedule Released",
            details: "Check the portal for details.",
            date: "2024-06-05",
            type: "amber",
        },
    ]);

    const [showForm, setShowForm] = React.useState(false);

    const [formData, setFormData] = React.useState({
        title: "",
        details: "",
        date: "",
    });

    const doughnutData = {

        labels: ['Male', 'Female'],
        datasets: [{
            data: [725, 484],
            backgroundColor: ['#3b82f6', '#93c5fd'],
            borderWidth: 0,
        }],
    };

    const barData = {
        labels: ['Sales', 'Marketing', 'Engineering', 'Support'],
        datasets: [{
            label: 'Employees',
            data: [320, 180, 290, 260],
            backgroundColor: '#3b82f6',
            borderRadius: 8,
        }],
    };

    const approvalData = {
        labels: ['Approved', 'Pending'],
        datasets: [{
            data: [18, 8],
            backgroundColor: ['#bfdbfe', '#ffffff'],
            borderWidth: 0,
        }],
    };
    const holidays = [
        { date: "2024-07-17", name: "Muharram" },
        { date: "2024-08-15", name: "Independence Day" },
        { date: "2024-10-02", name: "Gandhi Jayanti" },
    ];

    const [selectedHoliday, setSelectedHoliday] = React.useState(null);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const getHolidayForDay = (day) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return holidays.find((h) => h.date === dateStr);
    };


    return (
        <div className="min-h-screen bg-[#F0F7FF] p-4 sm:p-6 lg:p-8">
            {/* HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
                {/* <h1 className="text-3xl font-black text-slate-900 tracking-tight">HR Command Center</h1> */}
                <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                     <HiChevronRight className="rotate-90 text-slate-400" />
                </button>
            </div>

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-4 items-start">
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <StatCard label="New Joining Today" value="05" trend="1" icon={HiUserPlus} />
                    <StatCard label="New Joining This Week" value="32" trend="2" icon={HiUsers} />
                    <StatCard label="Total Employees" value="1,204" icon={HiUsers} />
                </div>

                <Card
                    title="Announcements"
                    extra={
                        // <button className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-700 shadow-lg shadow-blue-200">
                        //     <HiPlus /> +
                        // </button>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
                        >
                            <HiPlus />
                        </button>
                    }
                >
                    {showForm && (
                        <div className="space-y-2 mb-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Details"
                                value={formData.details}
                                onChange={(e) =>
                                    setFormData({ ...formData, details: e.target.value })
                                }
                                className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                            />

                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                            />

                            {/* <button
                                className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700"
                            >
                                Add Announcement
                            </button> */}
                            <button
                                onClick={() => {
                                    if (!formData.title) return;

                                    setAnnouncements([
                                        {
                                            ...formData,
                                            type: "blue",
                                        },
                                        ...announcements,
                                    ]);

                                    setFormData({ title: "", details: "", date: "" });
                                    setShowForm(false);
                                }}
                                className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700"
                            >
                                Add Announcement
                            </button>

                        </div>
                    )}

                    {/* <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded-xl border-l-4 border-blue-500">
                            <p className="text-xs font-bold text-slate-800">Policy Update: PTO Rev. 2.0</p>
                            <p className="text-[10px] text-slate-500 mt-1 italic">Published by John Doe</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border-l-4 border-amber-400">
                            <p className="text-xs font-bold text-slate-800">Holiday Schedule Released</p>
                            <p className="text-[10px] text-slate-500 mt-1 italic">Check the portal for details.</p>
                        </div>
                    </div> */}
                    <div className="space-y-3">
                        {announcements.map((item, i) => (
                            <div
                                key={i}
                                className={`p-3 bg-slate-50 rounded-xl border-l-4 ${item.type === "amber" ? "border-amber-400" : "border-blue-500"
                                    }`}
                            >
                                <p className="text-xs font-bold text-slate-800">{item.title}</p>
                                <p className="text-[10px] text-slate-500 mt-1 italic">
                                    {item.details} {item.date && `• ${item.date}`}
                                </p>
                            </div>
                        ))}
                    </div>

                </Card>
                
            </div>

            {/* MIDDLE SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card title="Offline Employee Log">
                    <div className="space-y-4">
                        {[
                            { name: "John Doe", time: "8:30", email: "john@company.com" },
                            { name: "Jane Smith", time: "4:15", email: "jane@company.com" },
                            { name: "Mike Johnson", time: "1:50", email: "mike@company.com" }
                        ].map((emp, i) => (
                            <div key={i} className="flex items-center justify-between p-2 hover:bg-blue-50/50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-[10px]">JD</div>
                                    <span className="text-xs font-bold text-slate-700">{emp.name}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-xs font-mono text-slate-500">{emp.time} H:M</span>
                                    <a href={`mailto:${emp.email}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                        <HiEnvelope size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Approval Pending">
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-600 rounded-2xl text-white flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-bold opacity-70 uppercase">Pending Requests</p>
                                <h4 className="text-2xl font-black">8 Requests</h4>
                            </div>
                            <div className="w-20 h-20">
                                <Doughnut
                                    data={approvalData}
                                    options={{
                                        cutout: '70%',
                                        plugins: { legend: { display: false } },
                                        maintainAspectRatio: false
                                    }}
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center font-bold tracking-widest uppercase">
                            Leave approval status overview
                        </p>
                    </div>
                </Card>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Attendance Validations">
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-600 rounded-2xl text-white flex justify-between items-center group cursor-pointer hover:bg-blue-700 transition-all">
                            <div>
                                <p className="text-[10px] font-bold opacity-70 uppercase">Pending Validation</p>
                                <h4 className="text-2xl font-black">12 Validations</h4>
                            </div>
                            <HiCheckBadge size={32} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[10px] text-slate-400 text-center font-bold tracking-widest uppercase">
                            Click to view approval page
                        </p>
                    </div>
                </Card>

                <Card title="Gender Distribution">
                    <div className="h-[180px] flex justify-center">
                        <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
                    </div>
                </Card>

                <Card title="Departmental Split">
                    <div className="h-[180px]">
                        <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }} />
                    </div>
                </Card>
            </div>
        </div>
    );
}
