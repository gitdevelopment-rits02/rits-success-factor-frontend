import { useEffect, useMemo, useState } from "react";
import {
    FiBarChart2,
    FiBriefcase,
    FiClock,
    FiCoffee,
    FiLogOut,
    FiPlay,
    FiTrendingUp,
    FiUser,
    FiZap,
} from "react-icons/fi";

/* CONFIG */
const EMPLOYEE_NAME = "Akshata";
const DEPARTMENTS = [
    "IT - Information Technology",
    "Finance",
    "Sales",
    "Human Resources",
];
const STANDARD_WORK_MINUTES = 8 * 60;

function safeParseJSON(value) {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

function formatMinutes(m) {
    const mm = Math.max(0, m);
    return `${Math.floor(mm / 60)}h ${Math.floor(mm % 60)}m`;
}

function formatSeconds(s) {
    const ss = Math.max(0, s);
    return `${String(Math.floor(ss / 3600)).padStart(2, "0")}:${String(
        Math.floor((ss % 3600) / 60)
    ).padStart(2, "0")}:${String(ss % 60).padStart(2, "0")}`;
}

/* APP */
export default function App() {
    const [view, setView] = useState("clockin");
    const [location, setLocation] = useState("Office");
    const [department, setDepartment] = useState(DEPARTMENTS[0]);
    const [status, setStatus] = useState("clockedOut");
    const [timeLogs, setTimeLogs] = useState([]);
    const [liveSeconds, setLiveSeconds] = useState(0);

    /* LIVE TIMER */
    useEffect(() => {
        if (status !== "clockedIn") return;
        const interval = window.setInterval(() => setLiveSeconds((s) => s + 1), 1000);
        return () => window.clearInterval(interval);
    }, [status]);

    /* STORAGE & STATE RESTORATION */
    useEffect(() => {
        const saved = safeParseJSON(localStorage.getItem("timeLogs"));
        if (!saved) return;
        const logs = saved.map((l) => ({ ...l, time: new Date(l.time) }));
        setTimeLogs(logs);

        // Logic Fix: Restore status based on last log
        if (logs.length > 0) {
            const last = logs[logs.length - 1];
            if (last.type === "Clock In" || last.type === "Break Out") {
                setStatus("clockedIn");
                // Restore live seconds for the current session ONLY
                const secondsSinceStart = Math.floor((new Date().getTime() - last.time.getTime()) / 1000);
                setLiveSeconds(Math.max(0, secondsSinceStart));
            } else if (last.type === "Break In") {
                setStatus("onBreak");
                setLiveSeconds(0); // No active work session during break
            } else {
                setStatus("clockedOut");
                setLiveSeconds(0);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
    }, [timeLogs]);

    /* HELPERS */
    const addLog = (type) =>
        setTimeLogs((p) => [...p, { type, time: new Date(), location, department }]);

    /* ACTIONS */
    const clockIn = () => {
        if (status !== "clockedOut") return;
        setLiveSeconds(0);
        setStatus("clockedIn");
        addLog("Clock In");
    };

    const breakIn = () => {
        if (status !== "clockedIn") return;
        setStatus("onBreak");
        setLiveSeconds(0);
        addLog("Break In");
    };

    const breakOut = () => {
        if (status !== "onBreak") return;
        setLiveSeconds(0);
        setStatus("clockedIn");
        addLog("Break Out");
    };

    const clockOut = () => {
        if (status === "clockedOut") return;
        addLog("Clock Out");
        setStatus("clockedOut");
        setLiveSeconds(0);
    };

    const lastLogTime = timeLogs.length ? timeLogs[timeLogs.length - 1].time : null;

    /* DAILY SUMMARY */
    const dailySummary = useMemo(() => {
        const days = {};

        for (const log of timeLogs) {
            const day = log.time.toDateString();
            if (!days[day]) days[day] = { work: 0, overtime: 0, events: [] };
            days[day].events.push(log);
        }

        for (const day of Object.keys(days)) {
            const events = [...days[day].events].sort(
                (a, b) => a.time.getTime() - b.time.getTime()
            );

            let work = 0;
            let start = null;

            for (const e of events) {
                if (e.type === "Clock In" || e.type === "Break Out") start = e.time;
                if ((e.type === "Break In" || e.type === "Clock Out") && start) {
                    work += (e.time.getTime() - start.getTime()) / 60000;
                    start = null;
                }
            }

            const isToday = day === new Date().toDateString();
            if (isToday && status === "clockedIn" && start) {
                work += liveSeconds / 60;
            }

            days[day].events = events;
            days[day].work = work;
            days[day].overtime = Math.max(work - STANDARD_WORK_MINUTES, 0);
        }

        return days;
    }, [timeLogs, liveSeconds, status]);

    const todayKey = new Date().toDateString();
    const workedToday = dailySummary[todayKey]?.work || 0;
    const overtimeToday = dailySummary[todayKey]?.overtime || 0;
    const efficiency = Math.min(
        Math.round((workedToday / STANDARD_WORK_MINUTES) * 100),
        100
    );

    /* WEEKLY SUMMARY */
    const weeklySummary = useMemo(() => {
        const week = {};
        const today = new Date();
        const start = new Date(today);
        start.setHours(0, 0, 0, 0);
        start.setDate(today.getDate() - today.getDay());

        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const key = d.toDateString();
            week[key] = dailySummary[key] || { work: 0, overtime: 0, events: [] };
        }

        return week;
    }, [dailySummary]);

    const maxWeekMinutes = Math.max(
        STANDARD_WORK_MINUTES,
        ...Object.values(weeklySummary).map((d) => d.work)
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8 pt-0 font-sans text-slate-800 antialiased">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Welcome, {EMPLOYEE_NAME}
                </h1>

                <div className="flex p-1 bg-slate-100/80 rounded-2xl shadow-inner backdrop-blur-sm">
                    {[
                        { key: "clockin", label: "Work Time Tracker" },
                        { key: "timesheet", label: "Timesheet" },
                        { key: "weekly", label: "Weekly Tracking" },
                    ].map((t) => (
                        <button
                            type="button"
                            key={t.key}
                            onClick={() => setView(t.key)}
                            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${view === t.key
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </header>

            {view === "clockin" && (
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Work Details Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-[32px] shadow-lg border border-slate-200 flex flex-col justify-between h-full lg:min-h-[400px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="space-y-8">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                                        <FiBriefcase size={20} />
                                    </div>
                                    Work Details
                                </h2>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                                        DEPARTMENT
                                    </h3>
                                    <div className="relative group">
                                        <select
                                            className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer hover:bg-white hover:shadow-sm"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                        >
                                            {DEPARTMENTS.map((d) => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <svg
                                                width="12"
                                                height="8"
                                                viewBox="0 0 12 8"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 1L6 6L11 1"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                                        WORK LOCATION
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                        {["Office", "Hybrid", "WFH"].map((loc) => (
                                            <button
                                                type="button"
                                                key={loc}
                                                onClick={() => setLocation(loc)}
                                                className={`py-3 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm ${location === loc
                                                    ? "bg-blue-600 text-white shadow-blue-200 scale-[1.02]"
                                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 hover:shadow-md"
                                                    }`}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Session Control Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-[32px] shadow-lg border border-slate-200 relative overflow-hidden h-full lg:min-h-[440px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            {/* Status Badge */}
                            <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-20">
                                <div
                                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border border-slate-100 ${status === "clockedIn"
                                        ? "bg-green-50 text-green-700"
                                        : status === "onBreak"
                                            ? "bg-amber-50 text-amber-700"
                                            : "bg-slate-50 text-slate-500"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full ${status === "clockedIn"
                                            ? "bg-green-600 animate-pulse"
                                            : status === "onBreak"
                                                ? "bg-amber-600 animate-pulse"
                                                : "bg-slate-400"
                                            }`}
                                    />
                                    {status === "clockedIn"
                                        ? "ONLINE"
                                        : status === "onBreak"
                                            ? "ON BREAK"
                                            : "OFFLINE"}
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center lg:items-start xl:items-center gap-6 lg:gap-8 h-full py-2 relative">
                                {/* Circular Progress Timer */}
                                <div className="relative w-32 h-32 sm:w-36 sm:h-36 xl:w-40 xl:h-40 flex-shrink-0 flex items-center justify-center lg:ml-2">
                                    <svg viewBox="0 0 224 224" className="w-full h-full -rotate-90 drop-shadow-sm">
                                        <circle
                                            cx="112"
                                            cy="112"
                                            r="104"
                                            fill="none"
                                            stroke="#f1f5f9"
                                            strokeWidth="10"
                                        />
                                        <circle
                                            cx="112"
                                            cy="112"
                                            r="104"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="10"
                                            strokeDasharray={2 * Math.PI * 104}
                                            strokeDashoffset={2 * Math.PI * 104 * (1 - efficiency / 100)}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                        />
                                    </svg>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={status === "clockedOut" ? clockIn : undefined}
                                            disabled={status !== "clockedOut"}
                                            className={`w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-500 shadow-xl ${status === "clockedOut"
                                                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white cursor-pointer hover:scale-105 active:scale-95 shadow-emerald-200/50"
                                                : "bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 text-blue-600 cursor-default shadow-blue-50"
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-inner ${status === "clockedOut" ? "bg-white/20" : "bg-blue-100/50"}`}>
                                                <FiPlay size={16} className={status === "clockedOut" ? "text-white" : "text-blue-500"} />
                                            </div>
                                            <span className={`font-black text-[8px] xl:text-[10px] tracking-widest uppercase ${status === "clockedOut" ? "text-white" : "text-blue-600/70"}`}>
                                                {status === "clockedOut" ? "Clock In" : "Clocked In"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Session Info Area */}
                                <div className="flex-1 flex flex-col justify-between space-y-4 w-full min-w-0">
                                    <div className="bg-slate-50/70 p-6 sm:p-8 rounded-[32px] border border-slate-100 shadow-inner relative group transition-all duration-300 hover:bg-white hover:shadow-md">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl transition-opacity group-hover:opacity-60 overflow-hidden" />

                                        <div className="space-y-2 text-center lg:text-left relative z-10">
                                            <div className="flex items-center justify-center lg:justify-start gap-2.5">
                                                <div className={`w-2.5 h-2.5 rounded-full ${status === 'clockedIn' ? 'bg-blue-600 animate-pulse' : status === 'onBreak' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                    {status === "clockedIn" ? "Active Session" : status === "onBreak" ? "Last Session" : "Session Duration"}
                                                </h3>
                                            </div>

                                            <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-black leading-none tabular-nums tracking-tighter text-slate-800 drop-shadow-sm flex items-center justify-center lg:justify-start gap-2">
                                                {formatSeconds(liveSeconds)}
                                                {/* <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                                    Dur
                                                </span> */}
                                            </div>

                                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                                                <div className="px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm flex items-center gap-2.5">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                        Total Today: {formatMinutes(workedToday)}
                                                    </span>
                                                </div>
                                                {status === "clockedIn" && (
                                                    <div className="flex items-center gap-2.5 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                                                        <span className="flex h-2 w-2 relative">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                                        </span>
                                                        <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                                                            Tracking Live
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons Row */}
                                    <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                                        <button
                                            type="button"
                                            onClick={status === "clockedIn" ? breakIn : breakOut}
                                            disabled={status === "clockedOut"}
                                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 border font-black text-[9px] uppercase tracking-widest shadow-sm ${status === "onBreak"
                                                ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-200 scale-[1.02]"
                                                : status === "clockedOut"
                                                    ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40 cursor-not-allowed"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 active:scale-95"
                                                }`}
                                        >
                                            {status === "onBreak" ? (
                                                <FiPlay size={14} />
                                            ) : (
                                                <FiCoffee size={14} />
                                            )}
                                            {status === "onBreak" ? "Resume Work" : "Take Break"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={clockOut}
                                            disabled={status === "clockedOut"}
                                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 border font-black text-[9px] uppercase tracking-widest shadow-sm ${status === "clockedOut"
                                                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40 cursor-not-allowed"
                                                : "bg-white border-slate-200 text-slate-700 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95"
                                                }`}
                                        >
                                            <FiLogOut size={14} />
                                            Clock Out
                                        </button>
                                    </div>

                                    <div className="space-y-3 pt-1">
                                        <div className="flex justify-between items-center px-1">
                                            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                                SHIFT PROGRESS
                                            </h3>
                                            <span className="text-[9px] text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                                {lastLogTime
                                                    ? `Last Activity: ${lastLogTime.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}`
                                                    : "No Activity"}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-200/50">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                                                style={{ width: `${efficiency}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="WORKED TODAY"
                            value={formatMinutes(workedToday)}
                            icon={<FiClock size={18} />}
                            color="blue"
                        />
                        <MetricCard
                            title="OVERTIME"
                            value={formatMinutes(overtimeToday)}
                            icon={<FiZap size={18} />}
                            color="amber"
                        />
                        <MetricCard
                            title="EFFICIENCY"
                            value={`${efficiency}%`}
                            icon={<FiTrendingUp size={18} />}
                            color="emerald"
                        />
                        <MetricCard
                            title="STATUS"
                            value={
                                status === "clockedIn"
                                    ? "Online"
                                    : status === "onBreak"
                                        ? "On Break"
                                        : "Offline"
                            }
                            icon={<FiUser size={18} />}
                            color="slate"
                            statusMode
                            status={status}
                        />
                    </div>

                    {/* Weekly Graph Section */}
                    <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-200 relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-md">
                                    <FiBarChart2 size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Weekly Activity</h2>
                                    <p className="text-sm text-slate-400">
                                        Time distribution across current week
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-blue-600 shadow-sm" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        WORKED HOURS
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-slate-200" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        STANDARD (8H)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[280px] mt-8">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-full border-t border-slate-50 h-0" />
                                ))}
                            </div>

                            {/* Standard Line */}
                            <div
                                className="absolute left-0 right-0 border-t-2 border-dashed border-slate-200 z-10"
                                style={{
                                    bottom: `${(STANDARD_WORK_MINUTES / maxWeekMinutes) * 100}%`,
                                }}
                            >
                                <div className="absolute -top-3 right-0 px-2 py-0.5 bg-slate-400 rounded text-[8px] font-bold text-white uppercase tracking-tighter shadow-lg">
                                    STANDARD: 8H
                                </div>
                            </div>

                            {/* Bars */}
                            <div className="absolute inset-0 flex items-end justify-between px-4 sm:px-8">
                                {Object.entries(weeklySummary).map(([day, d]) => {
                                    const height = (d.work / maxWeekMinutes) * 100;
                                    const isToday =
                                        new Date(day).toDateString() === new Date().toDateString();

                                    return (
                                        <div key={day} className="group relative flex flex-col items-center w-full">
                                            <div className="absolute bottom-0 w-10 sm:w-16 h-full bg-slate-50 rounded-t-xl -z-10 group-hover:bg-slate-100/70 transition-colors" />

                                            <div
                                                className={`w-10 sm:w-16 rounded-t-xl transition-all duration-700 ease-out relative z-10 ${isToday
                                                    ? "bg-blue-600 shadow-[0_6px_16px_rgba(37,99,235,0.5)]"
                                                    : "bg-slate-200"
                                                    }`}
                                                style={{
                                                    height: `${height}%`,
                                                    minHeight: d.work > 0 ? "8px" : "0px",
                                                }}
                                            >
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                                                    {formatMinutes(d.work)}
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-col items-center gap-1">
                                                <span
                                                    className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? "text-blue-600" : "text-slate-400"
                                                        }`}
                                                >
                                                    {new Date(day).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                    })}
                                                </span>
                                                <span className="text-[10px] font-medium text-slate-300">
                                                    {formatMinutes(d.work)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span className="text-blue-600">+</span> TOTAL WORK HOURS:{" "}
                                <span className="text-slate-900">
                                    {(
                                        Object.values(weeklySummary).reduce(
                                            (acc, curr) => acc + curr.work,
                                            0
                                        ) / 60
                                    ).toFixed(1)}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span className="text-emerald-500">•</span> AVERAGE EFFICIENCY:{" "}
                                <span className="text-slate-900">{efficiency}%</span>
                            </div>
                        </div>
                    </div>

                    <footer className="text-center py-12">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                            © 2024 RevAppayya IT Services (RitsHRConnect). All rights reserved.
                        </p>
                    </footer>
                </div>
            )}

            {view === "timesheet" && (
                <Timesheet summary={dailySummary} formatMinutes={formatMinutes} />
            )}

            {view === "weekly" && (
                <WeeklyTimeTracking summary={weeklySummary} formatMinutes={formatMinutes} />
            )}
        </div>
    );
}

/* METRIC CARD COMPONENT */
function MetricCard({
    title,
    value,
    icon,
    color,
    statusMode,
    status,
}) {
    const colors = {
        blue: { bg: "bg-blue-50", text: "text-blue-600" },
        amber: { bg: "bg-amber-50", text: "text-amber-600" },
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
        slate: { bg: "bg-slate-50", text: "text-slate-600" },
    };

    const c = colors[color];

    return (
        <div className="bg-white p-6 rounded-[24px] shadow-md border border-slate-200 flex items-center justify-between group hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {title}
                </p>
                <div className="flex items-center gap-3">
                    <p className="text-xl font-bold text-slate-800 tracking-tight">
                        {value}
                    </p>
                </div>
            </div>

            <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${c.bg} ${c.text}`}
            >
                {statusMode ? (
                    status === "clockedIn" ? (
                        <FiTrendingUp size={22} className="text-emerald-500" />
                    ) : (
                        <FiUser size={22} className="text-slate-300" />
                    )
                ) : (
                    icon
                )}
            </div>
        </div>
    );
}

/* TIMESHEET */
function Timesheet({
    summary,
    formatMinutes: fmt,
}) {
    const days = Object.entries(summary).sort(
        (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );

    const getEventIcon = (type) => {
        if (type === "Clock In" || type === "Break Out") return <FiPlay size={18} />;
        if (type === "Clock Out") return <FiLogOut size={18} />;
        return <FiCoffee size={18} />;
    };

    const getEventBg = (type) => {
        if (type === "Clock In") return "bg-emerald-50 text-emerald-600";
        if (type === "Clock Out") return "bg-rose-50 text-rose-600";
        return "bg-amber-50 text-amber-700";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-md">
                    <FiClock size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Timesheet Summary</h2>
                    <p className="text-sm text-slate-400">
                        Review your daily work logs and activities
                    </p>
                </div>
            </div>

            {days.length === 0 ? (
                <div className="bg-white rounded-[32px] p-12 text-center border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                        <FiClock size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">No activity records found yet.</p>
                </div>
            ) : (
                days.map(([date, d]) => (
                    <div
                        key={date}
                        className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                                {new Date(date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </h3>
                            <div className="px-4 py-1.5 bg-white rounded-full text-[10px] font-bold text-blue-600 border border-blue-100 shadow-sm">
                                TOTAL: {fmt(d.work)}
                            </div>
                        </div>

                        <div className="px-8 py-4 divide-y divide-slate-50">
                            {d.events.map((e, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-5 group hover:bg-slate-50/50 px-4 -mx-4 rounded-xl transition-colors"
                                >
                                    <div className="flex items-center gap-6">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${getEventBg(
                                                e.type
                                            )}`}
                                        >
                                            {getEventIcon(e.type)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{e.type}</p>
                                            <p className="text-xs text-slate-400 font-medium">
                                                {e.time.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-12">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1 text-left">
                                                LOCATION
                                            </p>
                                            <p className="text-sm font-bold text-slate-600">{e.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1 text-left">
                                                DEPARTMENT
                                            </p>
                                            <p className="text-sm font-bold text-slate-600">
                                                {e.department}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

/* WEEKLY TRACKING TABLE */
function WeeklyTimeTracking({
    summary,
    formatMinutes: fmt,
}) {
    const weekDays = Object.keys(summary).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return (
        <div className="max-w-7xl mx-auto pt-8">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-md">
                    <FiTrendingUp size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Weekly Performance Report
                    </h2>
                    <p className="text-sm text-slate-400">
                        Analyze your efficiency and work hours for the current week
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {weekDays.map((day) => {
                    const d = summary[day];
                    const events = [...d.events].sort(
                        (a, b) => a.time.getTime() - b.time.getTime()
                    );

                    return (
                        <div
                            key={day}
                            className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900">
                                    {new Date(day).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </h3>
                                <div className="flex gap-3">
                                    <div className="px-4 py-1.5 bg-white rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 uppercase shadow-sm">
                                        WORKED: {fmt(d.work)}
                                    </div>
                                    <div className="px-4 py-1.5 bg-white rounded-full text-[10px] font-bold text-amber-600 border border-amber-50 uppercase shadow-sm">
                                        OT: {fmt(d.overtime)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-x-auto p-4">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <th className="px-4 py-3">Event</th>
                                            <th className="px-4 py-3">Time</th>
                                            <th className="px-4 py-3">Location</th>
                                            <th className="px-4 py-3">Department</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {events.length > 0 ? (
                                            events.map((e, i) => (
                                                <tr
                                                    key={i}
                                                    className="text-sm hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <td className="px-4 py-4 font-bold text-slate-700">
                                                        {e.type}
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-500 font-medium">
                                                        {e.time.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase shadow-sm">
                                                            {e.location}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-500 font-medium">
                                                        {e.department}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-4 py-12 text-center text-slate-300 italic font-medium"
                                                >
                                                    No records found for this day
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
