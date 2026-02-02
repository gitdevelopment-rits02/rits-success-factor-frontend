import React, { useState } from "react";
import { FiBell, FiCheckCircle } from "react-icons/fi";

// All notifications (simulate fetched data)
const allNotifications = [
  {
    id: 1,
    role: "HR TEAM",
    type: "LEAVE",
    title: "Your leave request has been approved",
    desc: "Your annual leave for April 12–15 has been processed by the HR operations team.",
    time: "2 mins ago",
    color: "bg-green-100 text-green-700",
    read: false,
  },
  {
    id: 2,
    role: "MANAGER",
    type: "TIMESHEET",
    title: "Timesheet pending for approval",
    desc: "John Manager is waiting for you to submit your week 14 timesheet records.",
    time: "1 hour ago",
    color: "bg-yellow-100 text-yellow-700",
    read: false,
  },
  {
    id: 3,
    role: "SUPERADMIN",
    type: "ANNOUNCEMENT",
    title: "New company policy updated",
    desc: "Please review the updated remote work guidelines effective from next month.",
    time: "Yesterday, 4:30 PM",
    color: "bg-purple-100 text-purple-700",
    read: false,
  },
  {
    id: 4,
    role: "PAYROLL",
    type: "PAYROLL",
    title: "Payslip for March has been generated",
    desc: "Your monthly payslip is now available for download in the documents section.",
    time: "Yesterday, 10:00 AM",
    color: "bg-blue-100 text-blue-700",
    read: true,
  },
  {
    id: 5,
    role: "SYSTEM",
    type: "MAINTENANCE",
    title: "System maintenance scheduled this weekend",
    desc: "HR Portal will be unavailable on Saturday from 2:00 AM to 6:00 AM UTC.",
    time: "2 days ago",
    color: "bg-red-100 text-red-700",
    read: false,
  },
  {
    id: 6,
    role: "HR TEAM",
    type: "LEAVE",
    title: "Leave request pending approval",
    desc: "Your leave request for May 5–7 is awaiting HR approval.",
    time: "3 days ago",
    color: "bg-green-100 text-green-700",
    read: false,
  },
  {
    id: 7,
    role: "MANAGER",
    type: "TIMESHEET",
    title: "Timesheet approved",
    desc: "Your week 13 timesheet has been approved.",
    time: "4 days ago",
    color: "bg-yellow-100 text-yellow-700",
    read: true,
  },
  {
    id: 8,
    role: "SYSTEM",
    type: "MAINTENANCE",
    title: "System downtime completed",
    desc: "The scheduled system maintenance has been successfully completed.",
    time: "5 days ago",
    color: "bg-red-100 text-red-700",
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(
    allNotifications.slice(0, 5)
  );
  const [showUnreadDropdown, setShowUnreadDropdown] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  // 👉 ONLY NEW STATE
  const [activeCategory, setActiveCategory] = useState("ALL");

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const loadOlderNotifications = () => {
    const currentCount = notifications.length;
    const more = allNotifications.slice(currentCount, currentCount + 5);
    setNotifications((prev) => [...prev, ...more]);
  };

  const unreadNotifications = notifications.filter((n) => !n.read);

  // Category counts (unchanged)
  const categoryCounts = {
    "All Notifications": notifications.length,
    "Human Resources": notifications.filter((n) => n.role === "HR TEAM").length,
    "Payroll & Finance": notifications.filter((n) => n.role === "PAYROLL")
      .length,
    "System Updates": notifications.filter((n) => n.role === "SYSTEM").length,
  };

  // 👉 ONLY NEW FILTER LOGIC
  const filteredNotifications = notifications.filter((n) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "HR") return n.role === "HR TEAM";
    if (activeCategory === "PAYROLL") return n.role === "PAYROLL";
    if (activeCategory === "SYSTEM") return n.role === "SYSTEM";
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-semibold">Notification Center</h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage your updates and alerts
            </p>
          </div>
          <div className="flex items-center gap-3 relative">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowUnreadDropdown(!showUnreadDropdown)}
            >
              <FiBell size={18} className="text-gray-600" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
              )}
            </div>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <FiCheckCircle size={14} /> Mark all as read
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`border rounded-lg px-4 py-3 flex justify-between items-start cursor-pointer hover:shadow-sm transition ${
                  n.read ? "bg-white" : "bg-gray-50 font-medium"
                }`}
              >
                <div className="flex gap-3 max-w-[75%]">
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center ${n.color} relative`}
                  >
                    <FiBell size={14} />
                    {!n.read && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-0.5">
                      <span className="font-medium">{n.role}</span>
                      <span>•</span>
                      <span className="uppercase">{n.type}</span>
                    </div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{n.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                  {n.time}
                </span>
              </div>
            ))}

            {notifications.length < allNotifications.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadOlderNotifications}
                  className="px-4 py-1 text-xs border rounded-md hover:bg-gray-100"
                >
                  Load older notifications
                </button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1 lg:sticky lg:top-0 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow space-y-2">
              <h2 className="text-sm font-semibold">Summary</h2>
              <div className="flex justify-between text-lg font-bold">
                <div className="text-blue-600">
                  Unread <br />
                  {unreadNotifications.length.toString().padStart(2, "0")}
                </div>
                <div>
                  Total <br />
                  {notifications.length}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow space-y-2">
              <h2 className="text-sm font-semibold">Filter by Category</h2>

              <button
                onClick={() => setActiveCategory("ALL")}
                className={`w-full flex justify-between px-3 py-2 rounded-md text-xs ${
                  activeCategory === "ALL"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>All Notifications</span>
                <span>{categoryCounts["All Notifications"]}</span>
              </button>

              <button
                onClick={() => setActiveCategory("HR")}
                className={`w-full flex justify-between px-3 py-2 rounded-md text-xs ${
                  activeCategory === "HR"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>Human Resources</span>
                <span>{categoryCounts["Human Resources"]}</span>
              </button>

              <button
                onClick={() => setActiveCategory("PAYROLL")}
                className={`w-full flex justify-between px-3 py-2 rounded-md text-xs ${
                  activeCategory === "PAYROLL"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>Payroll & Finance</span>
                <span>{categoryCounts["Payroll & Finance"]}</span>
              </button>

              <button
                onClick={() => setActiveCategory("SYSTEM")}
                className={`w-full flex justify-between px-3 py-2 rounded-md text-xs ${
                  activeCategory === "SYSTEM"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>System Updates</span>
                <span>{categoryCounts["System Updates"]}</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow space-y-2">
              <h2 className="text-sm font-semibold">Preferences</h2>
              <div className="flex items-center justify-between">
                <div className="text-xs">
                  Push Notifications
                  <br />
                  <span className="text-gray-400">
                    Receive desktop alerts
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={() =>
                    setPushNotifications(!pushNotifications)
                  }
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs">
                  Email Digest
                  <br />
                  <span className="text-gray-400">
                    Daily summary of alerts
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={() => setEmailDigest(!emailDigest)}
                  className="toggle-checkbox"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
