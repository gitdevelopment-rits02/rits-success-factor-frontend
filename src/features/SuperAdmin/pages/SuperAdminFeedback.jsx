import React, { useState } from "react";
import emptyFeedbackImg from "/src/assets/image-Photoroom.png";
import { HiOutlineFolder } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";

import { FiSearch } from "react-icons/fi";

const feedbackData = {
  Amit: [
    {
      type: "Discipline",
      rating: 3.5,
      subject: "Late Submission",
      date: "22 Oct 2023",
    },
    {
      type: "Performance",
      rating: 4.2,
      subject: "Monthly Review",
      date: "25 Oct 2023",
    },
  ],

  Rohit: [
    {
      type: "Attendance",
      rating: 4.0,
      subject: "Regular Attendance",
      date: "10 Nov 2023",
    },
    {
      type: "Performance",
      rating: 4.5,
      subject: "Project Delivery",
      date: "18 Nov 2023",
    },
  ],

  Neha: [
    {
      type: "Communication",
      rating: 4.3,
      subject: "Client Interaction",
      date: "05 Oct 2023",
    },
    {
      type: "Discipline",
      rating: 3.8,
      subject: "Missed Deadline",
      date: "14 Nov 2023",
    },
  ],

  Pooja: [
    {
      type: "Performance",
      rating: 4.6,
      subject: "Outstanding Work",
      date: "02 Oct 2023",
    },
    {
      type: "Teamwork",
      rating: 4.4,
      subject: "Collaboration",
      date: "20 Nov 2023",
    },
  ],
};

const managerFeedbackData = {
  Param: [
    {
      type: "Leadership",
      rating: 4.3,
      subject: "Team Handling",
      date: "12 Nov 2023",
    },
  ],
  Kiran: [
    {
      type: "Planning",
      rating: 4.1,
      subject: "Sprint Planning",
      date: "15 Nov 2023",
    },
  ],
  Rahul: [
    {
      type: "Delivery",
      rating: 4.4,
      subject: "Project Execution",
      date: "18 Nov 2023",
    },
  ],
  Priya: [
    {
      type: "Communication",
      rating: 4.5,
      subject: "Client Coordination",
      date: "20 Nov 2023",
    },
  ],
};

/* STAR RATING */
const StarRating = ({ rating, setRating }) => {
  const stars = Array.from({ length: 10 }, (_, i) => (i + 1) / 2);

  return (
    <div className="flex items-center gap-4 mt-4 flex-wrap">
      <div className="flex">
        {stars.map((value) => (
          <span
            key={value}
            onClick={() => setRating(value)}
            className={`cursor-pointer text-3xl ${
              rating >= value ? "text-blue-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-3xl font-bold text-blue-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default function EmployeeFeedback() {
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [activeRole, setActiveRole] = useState("Manager");
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedHR, setSelectedHR] = useState(null);
  const searchText = search.toLowerCase();

  /* FILTER STATES */
const [selectedMonth, setSelectedMonth] = useState(""); // "" = all months
const [minRating, setMinRating] = useState(""); // "" = no filter


// FEEDBACK TABLE DATA (HR vs Manager)
const tableData =
  activeRole === "HR"
    ? managerFeedbackData[selectedManager?.manager] || []
    : feedbackData[selectedEmployee] || [];

    
  const managersData = [
    { manager: "Param", reportees: ["Amit", "Rohit", "Neha", "Pooja"] },
    { manager: "Kiran", reportees: ["Suresh", "Anita", "Vikas", "Meena"] },
    { manager: "Rahul", reportees: ["Arjun", "Sneha", "Nikhil"] },
    { manager: "Priya", reportees: ["Kunal", "Riya", "Sameer"] },
  ];

  const hrData = [
  {
    hr: "Mahadev",
    managers: ["Param", "Kiran"],
  },
  {
    hr: "Padma",
    managers: ["Rahul", "Priya"],
  },
];


const getHRManagerFeedbackCount = (hr) => {
  if (!hr) return 0;

  return hr.managers.reduce((total, managerName) => {
    const feedbacks = managerFeedbackData[managerName] || [];
    return total + feedbacks.length;
  }, 0);
};


    const getHRThisMonthCount = (hr, selectedMonth) => {
  if (!hr) return 0;

  return hr.managers.reduce((total, managerName) => {
    const feedbacks = managerFeedbackData[managerName] || [];

    const filtered = feedbacks.filter((fb) =>
      selectedMonth === ""
        ? true
        : new Date(fb.date).getMonth() === parseInt(selectedMonth)
    );

    return total + filtered.length;
  }, 0);
};


  const getHRAverageRating = (hr, selectedMonth, minRating) => {
  if (!hr) return 0;

  const ratings = hr.managers.flatMap((managerName) =>
    (managerFeedbackData[managerName] || [])
      .filter(
        (fb) =>
          (!selectedMonth ||
            new Date(fb.date).getMonth() === parseInt(selectedMonth)) &&
          (!minRating || fb.rating >= parseFloat(minRating))
      )
      .map((fb) => fb.rating)
  );

  if (ratings.length === 0) return 0;

  return (
    ratings.reduce((a, b) => a + b, 0) / ratings.length
  ).toFixed(1);
};


  return (
    <>
      {/* PAGE – FULL WIDTH FIX */}
      <div
  className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-16"
  // style={{
  //   backgroundImage: "url('/src/assets/dashboard-bg.jpg')",
  // }}
>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
  {/* LEFT */}
  <div>
    <h1 className="text-5xl font-bold text-blue-700">
      Feedback
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Overview and management of employee feedback across departments.
    </p>
  </div>

  {/* RIGHT – ROLE TOGGLE */}
  <div className="flex bg-gray-100 rounded-full p-1 shadow-sm">
    <button
      onClick={() => setActiveRole("Manager")}
      className={`px-6 py-2 rounded-full text-sm font-medium transition ${
        activeRole === "Manager"
          ? "bg-blue-600 text-white shadow"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      MANAGER
    </button>

    <button
      onClick={() => setActiveRole("HR")}
      className={`px-6 py-2 rounded-full text-sm font-medium transition ${
        activeRole === "HR"
          ? "bg-blue-600 text-white shadow"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      HR
    </button>
  </div>
</div>

        
{/* SUMMARY CARDS – FULL WIDTH, ONE LINE */}
<div className="grid grid-cols-3 gap-6 mb-6 w-full">

  {/* TOTAL FEEDBACKS */}
  

  {/* THIS MONTH WITH MONTH SELECT */}
  <div className="bg-white rounded-xl p-6 border-none shadow-md hover:shadow-xl transition-shadow duration-300flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold">
          {activeRole === "HR" && selectedHR
  ? getHRThisMonthCount(selectedHR, selectedMonth)
  : activeRole === "Manager" && selectedManager
  ? selectedManager.reportees.reduce((total, emp) => {
      const empFeedback = feedbackData[emp] || [];
      return (
        total +
        empFeedback.filter((fb) =>
          selectedMonth === ""
            ? true
            : new Date(fb.date).getMonth() === parseInt(selectedMonth)
        ).length
      );
    }, 0)
  : 0}

        </span>
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
  <HiOutlineCalendar className="text-indigo-600 text-2xl" />
</div>

      </div>
      
    </div>
    <p className="text-sm text-gray-500 mt-2">This Month</p>
    {/* <p className="text-xs text-green-600 mt-2">▲ Filter by month</p> */}
  </div>

  {/* AVERAGE RATING WITH MINIMUM FILTER */}
  <div className="bg-white rounded-xl p-6 border-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold">
          {activeRole === "HR" && selectedHR
  ? getHRAverageRating(selectedHR, selectedMonth, minRating)
  : activeRole === "Manager" && selectedManager
  ? (() => {
      const ratings = selectedManager.reportees.flatMap(
        (emp) =>
          (feedbackData[emp] || []).filter(
            (fb) =>
              (!minRating || fb.rating >= parseFloat(minRating)) &&
              (!selectedMonth ||
                new Date(fb.date).getMonth() === parseInt(selectedMonth))
          ).map((fb) => fb.rating)
      );

      return ratings.length
        ? (
            ratings.reduce((a, b) => a + b, 0) / ratings.length
          ).toFixed(1)
        : 0;
    })()
  : 0}

        </span>
        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
  <HiOutlineStar className="text-yellow-500 text-2xl" />
</div>

      </div>
      
    </div>
    <p className="text-sm text-gray-500 mt-2">Average Rating</p>
    {/* <p className="text-xs text-gray-500 mt-2">Based on selected filters</p> */}
  </div>

</div>

          {/* ✅ SEARCH BAR – 2 CARDS WIDTH */}
<div className="relative mb-6 w-full max-w-[600px] shadow-md hover:shadow-xl transition-shadow duration-300">
  <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
  <input
    type="text"
    placeholder="Search for feedback, managers, or reportees..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-10 p-3 rounded-xl border-none bg-white focus:outline-none"
  />
</div>

        {/* MANAGERS / HR */}
{(activeRole === "Manager" || activeRole === "HR") && (
  <div className="bg-white rounded-2xl p-4 border-none mb-6 shadow-md hover:shadow-xl transition-shadow duration-300">

    <h3 className="font-semibold mb-3 text-gray-700">
      {activeRole === "HR" ? "HR" : "MANAGER"}
    </h3>

    <div className="flex gap-3 overflow-x-auto">
      {/* HR VIEW */}
      {activeRole === "HR" &&
        hrData
  .filter((hrItem) =>
    hrItem.hr.toLowerCase().includes(searchText)
  )
  .map((hrItem) => (

          <button
            key={hrItem.hr}
            onClick={() => {
              setSelectedHR(hrItem);
              setSelectedManager(null);
              setSelectedEmployee(null);
            }}
            className={`px-4 py-2 rounded-full text-lg font-medium ${
              selectedHR?.hr === hrItem.hr
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {hrItem.hr}
          </button>
        ))}

      {/* MANAGER VIEW */}
      {activeRole === "Manager" &&
        managersData
  .filter((m) =>
    m.manager.toLowerCase().includes(searchText)
  )
  .map((m) => (
          <button
            key={m.manager}
            onClick={() => {
              setSelectedManager(m);
              setSelectedEmployee(null);
            }}
            className={`px-4 py-2 rounded-full text-lg font-medium ${
              selectedManager?.manager === m.manager
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {m.manager}
          </button>
        ))}
    </div>
  </div>
)}

    {/* MANAGERS UNDER HR */}
{activeRole === "HR" && selectedHR && (
  <div className="bg-white rounded-2xl p-4 border-none mb-6 shadow-md hover:shadow-xl transition-shadow duration-300">

    <h3 className="font-semibold mb-3 text-gray-700">
      Managers under {selectedHR.hr}
    </h3>

    <div className="flex gap-3 overflow-x-auto">
      {selectedHR.managers
  .filter((managerName) =>
    managerName.toLowerCase().includes(searchText)
  )
  .map((managerName) => {

        const managerObj = managersData.find(
          (m) => m.manager === managerName
        );

        return (
          <button
            key={managerName}
            onClick={() => {
              setSelectedManager(managerObj);
              setSelectedEmployee(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedManager?.manager === managerName
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {managerName}
          </button>
        );
      })}
    </div>
  </div>
)}

        {/* REPORTEES */}
        {activeRole === "Manager" && selectedManager && (
 
          <div className="bg-white rounded-2xl p-4 border-none mb-10 shadow-md hover:shadow-xl transition-shadow duration-300">

            <h3 className="font-semibold mb-3 text-gray-700">
              Reportees under {selectedManager.manager}
            </h3>
            <div className="flex gap-3 overflow-x-auto">
              {selectedManager.reportees
  .filter((emp) =>
    emp.toLowerCase().includes(searchText)
  )
  .map((emp) => (
    <span
      key={emp}
      onClick={() => setSelectedEmployee(emp)}
      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${
        selectedEmployee === emp
          ? "bg-purple-600 text-white"
          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
      }`}
    >
      {emp}
    </span>
))}
            </div>
          </div>
        )}

        {/* FEEDBACK TABLE */}
{(
  (activeRole === "HR" && selectedManager) ||
  (activeRole === "Manager" && selectedEmployee)
) && (

  <div className="bg-white rounded-2xl border-none p-6 mb-10 shadow-md hover:shadow-xl transition-shadow duration-300">
    <h3 className="font-semibold text-gray-800 mb-4">
      Feedback 
    </h3>

    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
  <tr className="bg-blue-50 text-gray-600 text-sm">
    <th className="px-4 py-3 text-left rounded-l-xl">Type</th>
    <th className="px-4 py-3 text-left">Rating</th>
    <th className="px-4 py-3 text-left">Subject</th>
    <th className="px-4 py-3 text-left rounded-r-xl">Date</th>
  </tr>
</thead>
        <tbody>
  {tableData
    .filter(
      (fb) =>
        fb.type.toLowerCase().includes(searchText) ||
        fb.subject.toLowerCase().includes(searchText)
    )
    .map((fb, index) => (
      <tr
        key={index}
        className="bg-white shadow-sm rounded-xl text-sm hover:bg-blue-50 transition"
      >
        <td className="px-4 py-3 rounded-l-xl">{fb.type}</td>
        <td className="px-4 py-3 font-medium">{fb.rating}</td>
        <td className="px-4 py-3">{fb.subject}</td>
        <td className="px-4 py-3 rounded-r-xl text-gray-500">
          {fb.date}
        </td>
      </tr>
    ))}
</tbody>

      </table>
    </div>
  </div>
)}

        {/* EMPTY STATE */}
{(
  (activeRole === "Manager" && !selectedEmployee) ||
  (activeRole === "HR" && !selectedManager)
) && (
  <div className="bg-white rounded-2xl border-none p-12 text-center shadow-md hover:shadow-xl transition-shadow duration-300 mb-8">

    <img
      src={emptyFeedbackImg}
      alt="No feedback selected"
      className="mx-auto mb-6 w-[520px] max-w-full opacity-90"
    />

    <h3 className="font-semibold text-gray-700">
      Detailed Feedback Logs
    </h3>
    <p className="text-sm text-gray-500 mt-2">
      Select an employee to view detailed feedback.
    </p>
  </div>
)}

      </div>
    </>
  );
}

