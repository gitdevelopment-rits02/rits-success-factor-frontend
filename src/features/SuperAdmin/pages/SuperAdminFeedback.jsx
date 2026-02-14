import React, { useState, useEffect } from "react";
import emptyFeedbackImg from "../../../assets/image-Photoroom.png";
import { HiOutlineCalendar } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHRs,
  fetchManagersByHR,
  fetchFeedbackByManager,
  fetchOverview,
} from "../Redux/thunks/superAdminFeedbackThunk";

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
      <span className="text-3xl font-semibold text-blue-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default function EmployeeFeedback() {
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("Manager");
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedHR, setSelectedHR] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [minRating, setMinRating] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  useEffect(() => {
    if (activeRole === "HR") {
      dispatch(fetchHRs());
    }
  }, [dispatch, activeRole]);

  useEffect(() => {
    if (activeRole === "HR" && selectedHR?._id) {
      console.log("Fetching managers for HR:", selectedHR._id);
      dispatch(fetchManagersByHR(selectedHR._id));
    }
  }, [dispatch, activeRole, selectedHR?._id]);

  useEffect(() => {
    if (selectedManager) {
      dispatch(fetchFeedbackByManager(selectedManager._id));
    }
  }, [dispatch, selectedManager]);

  const searchText = search.toLowerCase();

  const {
    hrs = [],
    managers = [],
    feedbacks = [],
    overview = {},
    loading = false,
    error = null,
  } = useSelector((state) => state.superAdmin?.superAdminFeedback || {});

  const tableData = feedbacks || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-blue-600 mb-2">
            Feedback Overview
          </h1>
          <p className="text-sm text-gray-500">
            Overview and management of employee feedback across departments
          </p>
        </div>

        {/* ROLE TOGGLE */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveRole("Manager")}
            className={`px-5 sm:px-6 py-2 rounded-lg text-sm font-medium transition ${
              activeRole === "Manager"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Manager
          </button>
          <button
            onClick={() => setActiveRole("HR")}
            className={`px-5 sm:px-6 py-2 rounded-lg text-sm font-medium transition ${
              activeRole === "HR"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            HR
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* TOTAL FEEDBACK */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase">
                Total Feedback
              </p>
              <p className="text-4xl font-semibold text-gray-800">
                {overview.totalFeedback ?? 0}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <HiOutlineCalendar className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* THIS MONTH */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase">
                This Month
              </p>
              <p className="text-4xl font-semibold text-gray-800">
                {activeRole === "HR" && selectedHR
                  ? tableData.length > 0
                    ? (
                        tableData.reduce((sum, fb) => sum + fb.rating, 0) /
                        tableData.length
                      ).toFixed(1)
                    : 0
                  : 0}
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <HiOutlineCalendar className="text-emerald-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* AVERAGE RATING */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase">
                Average Rating
              </p>
              <p className="text-4xl font-semibold text-gray-800">
                {tableData.length > 0
                  ? (
                      tableData.reduce((sum, fb) => sum + fb.rating, 0) /
                      tableData.length
                    ).toFixed(1)
                  : "0.0"}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <span className="text-amber-600 text-2xl">★</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6 max-w-xl">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for feedback, managers, or reportees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
        />
      </div>

      {/* HR / MANAGERS SECTION */}
      {(activeRole === "Manager" || activeRole === "HR") && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
            {activeRole === "HR" ? "HR" : "Managers"}
          </h3>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {/* HR VIEW */}
            {activeRole === "HR" &&
              hrs
                .filter((hrItem) =>
                  (hrItem.employeeName || "")
                    .toLowerCase()
                    .includes(searchText)
                )
                .map((hrItem) => (
                  <button
                    key={hrItem._id}
                    onClick={() => {
                      console.log("Selected HR:", hrItem);
                      setSelectedHR(hrItem);
                      setSelectedManager(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      selectedHR?._id === hrItem._id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {hrItem.employeeName}
                  </button>
                ))}

            {/* MANAGER VIEW */}
            {activeRole === "Manager" &&
              managers
                .filter((manager) =>
                  (manager.employeeName || "")
                    .toLowerCase()
                    .includes(searchText)
                )
                .map((manager) => (
                  <button
                    key={manager._id}
                    onClick={() => {
                      setSelectedManager(manager);
                      setSelectedEmployee(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      selectedManager?._id === manager._id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">
            Managers under {selectedHR.employeeName}
          </h3>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {managers
              .filter((manager) =>
                (manager.employeeName || "").toLowerCase().includes(searchText)
              )
              .map((manager) => (
                <button
                  key={manager._id}
                  onClick={() => setSelectedManager(manager)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    selectedManager?._id === manager._id
                      ? "bg-purple-600 text-white"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
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
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">
            Reportees under {selectedManager.employeeName}
          </h3>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {selectedManager?.reportees?.map((emp, idx) => (
              <button
                key={emp.id || emp.employeeName || idx}
                onClick={() => setSelectedEmployee(emp)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedEmployee === emp
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                {emp.employeeName || emp}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FEEDBACK TABLE */}
      {((activeRole === "HR" && selectedManager) ||
        (activeRole === "Manager" && selectedEmployee)) && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-lg">
              Feedback Details
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {tableData.length} {tableData.length === 1 ? "record" : "records"}{" "}
              found
            </p>
          </div>

          <div className="overflow-x-auto">
            {tableData.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-medium">No feedback found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your selection
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tableData
                    .filter(
                      (fb) =>
                        (fb.type || "").toLowerCase().includes(searchText) ||
                        (fb.subject || "").toLowerCase().includes(searchText)
                    )
                    .map((fb, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {fb.type}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium">
                            <span className="text-yellow-500">★</span>
                            {fb.rating}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {fb.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {fb.date}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {((activeRole === "Manager" && !selectedEmployee) ||
        (activeRole === "HR" && !selectedManager)) && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <img
            src={emptyFeedbackImg}
            alt="No feedback selected"
            className="mx-auto mb-6 w-full max-w-md opacity-90"
          />
          <h3 className="font-semibold text-gray-700 text-lg">
            Detailed Feedback Logs
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Select an employee to view detailed feedback
          </p>
        </div>
      )}
    </div>
  );
}