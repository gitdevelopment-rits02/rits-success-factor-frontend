import React, { useState, useEffect } from "react";
import emptyFeedbackImg from "../../../assets/image-Photoroom.png";
import { HiOutlineFolder } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";


import { useDispatch, useSelector } from "react-redux";
import {
  fetchHRs,
  fetchManagersByHR,
  fetchFeedbackByManager,
  fetchOverview,
} from "../Redux/thunks/superAdminFeedbackThunk";


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
            className={`cursor-pointer text-3xl ${rating >= value ? "text-blue-500" : "text-gray-300"
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

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  

  // Fetch HRs when activeRole is HR
  useEffect(() => {
    if (activeRole === "HR") {
      dispatch(fetchHRs());
    }
  }, [dispatch, activeRole]);

  // Fetch managers when HR is selected
  useEffect(() => {
    if (activeRole === "HR" && selectedHR?._id) {
      console.log("Fetching managers for HR:", selectedHR._id);
      dispatch(fetchManagersByHR(selectedHR._id));
    }
  }, [dispatch, activeRole, selectedHR?._id]);

  // Fetch feedback when manager is selected
  useEffect(() => {
    if (selectedManager) {
      dispatch(fetchFeedbackByManager(selectedManager._id));
    }
  }, [dispatch, selectedManager]);

  const searchText = search.toLowerCase();

  /* FILTER STATES */
  const [selectedMonth, setSelectedMonth] = useState(""); // "" = all months
  const [minRating, setMinRating] = useState(""); // "" = no filter


  const {
    hrs = [],
    managers = [],
    feedbacks = [],
    overview = {},
    loading = false,
    error = null,
  } = useSelector(
    (state) => state.superAdmin?.superAdminFeedback || {}
  );

  const tableData = feedbacks || [];

  return (
    <>
      {/* PAGE – FULL WIDTH FIX */}
      <div
        className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-16"
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
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeRole === "Manager"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              MANAGER
            </button>

            <button
              onClick={() => setActiveRole("HR")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeRole === "HR"
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


          {/* THIS MONTH WITH MONTH SELECT */}
          <div className="bg-white rounded-xl p-6 border-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  {overview.totalFeedback ?? 0}
                </span>

                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <HiOutlineCalendar className="text-indigo-600 text-2xl" />
                </div>

              </div>

            </div>
            <p className="text-sm text-gray-500 mt-2">Total Feedback</p>
          </div>

          {/* AVERAGE RATING WITH MINIMUM FILTER */}
          <div className="bg-white rounded-xl p-6 border-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  {activeRole === "HR" && selectedHR
                    ? (
                      tableData.length > 0
                        ? (tableData.reduce((sum, fb) => sum + fb.rating, 0) / tableData.length).toFixed(1)
                        : 0
                    )
                    : 0}
                </span>
              </div>

            </div>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
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
                hrs
                  .filter((hrItem) =>
                    (hrItem.employeeName || "").toLowerCase().includes(searchText)
                  )
                  .map((hrItem) => (
                    <button
                      key={hrItem._id}
                      onClick={() => {
                        console.log("Selected HR:", hrItem);
                        setSelectedHR(hrItem);
                        setSelectedManager(null);
                      }}
                      className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${selectedHR?._id === hrItem._id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                        }`}
                    >
                      {hrItem.employeeName}
                    </button>
                  ))}

              {/* MANAGER VIEW */}
              {activeRole === "Manager" &&
                managers
                  .filter((manager) =>
                    (manager.employeeName || "").toLowerCase().includes(searchText)
                  )
                  .map((manager) => (
                    <button
                      key={manager._id}
                      onClick={() => {
                        setSelectedManager(manager);
                        setSelectedEmployee(null);
                      }}
                      className={`px-4 py-2 rounded-full text-lg font-medium ${selectedManager?._id === manager._id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                        }`}
                    >
                      {manager.employeeName}
                    </button>
                  ))}

            </div>
          </div>
        )}

        {/* MANAGERS UNDER HR */}
        {activeRole === "HR" && selectedHR && (
          <div className="bg-white rounded-2xl p-4 border-none mb-6 shadow-md hover:shadow-xl transition-shadow duration-300">

            <h3 className="font-semibold mb-3 text-gray-700">
              Managers under {selectedHR.employeeName}
            </h3>

            <div className="flex gap-3 overflow-x-auto">


              {selectedHR && managers
                .filter((manager) =>
                  (manager.employeeName || "").toLowerCase().includes(searchText)
                )
                .map((manager) => (
                  <button
                    key={manager._id}
                    onClick={() => setSelectedManager(manager)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${selectedManager?._id === manager._id
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-700"
                      }`}
                  >
                    {manager.employeeName}
                  </button>
                ))}

            </div>
          </div>
        )}

        {/* REPORTEES */}
        {activeRole === "Manager" && selectedManager && (

          <div className="bg-white rounded-2xl p-4 border-none mb-10 shadow-md hover:shadow-xl transition-shadow duration-300">

            <h3 className="font-semibold mb-3 text-gray-700">
              Reportees under {selectedManager.employeeName}
            </h3>
            <div className="flex gap-3 overflow-x-auto">
              {selectedManager?.reportees?.map((emp, idx) => (
                <span
                  key={emp.id || emp.employeeName || idx}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${selectedEmployee === emp ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                >
                  {emp.employeeName || emp}
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
                          (fb.type || "").toLowerCase().includes(searchText) ||
                          (fb.subject || "").toLowerCase().includes(searchText)
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

