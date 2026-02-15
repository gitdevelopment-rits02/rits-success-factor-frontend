import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeaveRequest,
  getLeaveHistory,
  getLeaveSummary,
} from "../Redux/thunks/EmployeeRequestTimeOffThunk";
import EmployeeRequestTimeOffSkeleton from "./EmployeeRequestTimeOffSkeleton";
import { toast } from "react-toastify";

const LEAVE_QUOTAS = {
  "Sick Leave": 12,
  "Casual Leave": 10,
  "Paid Leave": 15,
};

const formatDate = (d) => d.toISOString().split("T")[0];

export default function LeaveManagementSystem() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayType, setDayType] = useState("Full Day");
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const previousApprovedRef = useRef(false);
  const toastShownRef = useRef(false);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { history, summary, loading } = useSelector(
    (state) => state.employee.requestTimeOff
  );

  useEffect(() => {
    dispatch(getLeaveHistory());
    dispatch(getLeaveSummary());
  }, [dispatch]);

  useEffect(() => {
    let timer;
    if (loading) {
      setShowSkeleton(true);
    } else {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 900);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const previousStatusMap = useRef({});

  useEffect(() => {
    if (!history || history.length === 0) return;

    history.forEach((leave) => {
      const id = leave._id;
      const leaveType = leave.leaveType;
      const currentStatus = leave.status?.toLowerCase();
      const previousStatus = previousStatusMap.current[id];

      if (previousStatus && previousStatus !== currentStatus) {
        if (currentStatus === "approved") {
          toast.success(`🎉 ${leaveType} has been approved!`);
        }
        if (currentStatus === "rejected") {
          toast.error(`❌ ${leaveType} has been rejected.`);
        }
      }
      previousStatusMap.current[id] = currentStatus;
    });
  }, [history]);

  const minDate = formatDate(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 0;

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return dayType === "Half Day" ? 0.5 : diffDays;
  };

  const appliedDays = calculateDays();

  const validateForm = () => {
    const errors = {};
    if (!leaveType) errors.leaveType = "Leave type is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";
    if (!dayType) errors.dayType = "Duration is required";
    if (!reason.trim()) errors.reason = "Reason is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const currentBalance =
      (summary?.[leaveType]?.remaining ?? LEAVE_QUOTAS[leaveType]) || 0;

    if (appliedDays > currentBalance) {
      setError(`You only have ${currentBalance} days left for ${leaveType}.`);
      return;
    }

    setError("");

    dispatch(
      createLeaveRequest({
        leaveType,
        startDate,
        endDate,
        duration: dayType,
        reason,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Leave request sent successfully 🎉");
        dispatch(getLeaveHistory());
        dispatch(getLeaveSummary());
      })
      .catch((err) => {
        toast.error(err || "Failed to send leave request");
      });

    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setDayType("Full Day");
    setFormErrors({});
  };

  if (showSkeleton) {
    return <EmployeeRequestTimeOffSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2">
            Leave Management
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Request time off and keep track of your balance
          </p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {Object.entries(summary || {}).map(([type, value]) => {
            const total = value.total;
            const usedAmount = value.used;
            const remaining = value.remaining;
            const percentage = total ? (usedAmount / total) * 100 : 0;

            return (
              <div
                key={type}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{type}</p>
                    <p className="text-3xl sm:text-4xl font-semibold text-gray-800">
                      {remaining}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">days remaining</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-3 py-1.5">
                    <p className="text-xs font-medium text-blue-700">
                      {total} total
                    </p>
                  </div>
                </div>

                <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  {usedAmount} days used this year
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Request Form */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                New Leave Request
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the details below to submit your request
              </p>
            </div>

            <div className="space-y-6">
              {/* Leave Type & Days Display */}
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Leave
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => {
                      setLeaveType(e.target.value);
                      setFormErrors({ ...formErrors, leaveType: "" });
                    }}
                    className={`w-full bg-white border ${
                      formErrors.leaveType ? "border-red-400" : "border-gray-200"
                    } rounded-lg px-4 py-2.5 text-gray-700 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer`}
                  >
                    <option value="">Select leave type</option>
                    {Object.keys(LEAVE_QUOTAS).map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                  {formErrors.leaveType && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.leaveType}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-5 flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                  <p className="text-xs font-medium text-gray-500 mb-1 uppercase">
                    Total Days
                  </p>
                  <p className="text-3xl font-semibold text-blue-600">
                    {appliedDays}
                  </p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={startDate}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      setStartDate(e.target.value);
                      setFormErrors({ ...formErrors, startDate: "" });
                      if (dayType === "Half Day") {
                        setEndDate(selectedDate);
                      }
                    }}
                    className={`w-full bg-white border ${
                      formErrors.startDate ? "border-red-400" : "border-gray-200"
                    } rounded-lg px-4 py-2.5 text-gray-700 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer`}
                  />
                  {formErrors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    min={startDate || minDate}
                    value={dayType === "Half Day" ? startDate : endDate}
                    disabled={dayType === "Half Day"}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setFormErrors({ ...formErrors, endDate: "" });
                    }}
                    className={`w-full bg-white border ${
                      formErrors.endDate ? "border-red-400" : "border-gray-200"
                    } rounded-lg px-4 py-2.5 text-gray-700 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      dayType === "Half Day"
                        ? "bg-gray-100 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  />
                  {formErrors.endDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Duration Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Duration
                </label>
                <div
                  className={`inline-flex bg-gray-100 rounded-lg p-1 border border-gray-200 ${
                    formErrors.dayType ? "ring-2 ring-red-400" : ""
                  }`}
                >
                  {["Full Day", "Half Day"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => {
                        setDayType(type);
                        setFormErrors({ ...formErrors, dayType: "" });
                        if (type === "Half Day" && startDate) {
                          setEndDate(startDate);
                        }
                        if (type === "Full Day") {
                          setEndDate("");
                        }
                      }}
                      className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                        dayType === type
                          ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {formErrors.dayType && (
                  <p className="text-red-500 text-xs mt-2">
                    {formErrors.dayType}
                  </p>
                )}
              </div>

              {/* Reason Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Leave
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setFormErrors({ ...formErrors, reason: "" });
                  }}
                  placeholder="Please provide a brief explanation for your leave request..."
                  className={`w-full h-32 bg-white text-gray-800 placeholder-gray-400 border ${
                    formErrors.reason ? "border-red-400" : "border-gray-200"
                  } rounded-lg p-4 text-sm resize-none hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {formErrors.reason && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.reason}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg flex items-center gap-2">
                  <span className="text-red-500 font-bold">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-98"
              >
                Submit Leave Request
              </button>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Request Summary
                </h3>
                <p className="text-sm text-gray-600">
                  Review your leave details before submitting
                </p>
              </div>

              <div className="space-y-4 bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Leave Type
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {leaveType || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Duration
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {dayType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Total Days
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {appliedDays}
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-800 mb-2">
                  💡 Quick Tips
                </h4>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• Leave requests require manager approval</li>
                  <li>• Submit at least 2 days in advance</li>
                  <li>• Check your leave balance before applying</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Leave History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Leave History
            </h2>

            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              {["All", "Approved", "Pending", "Rejected"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    filter === f
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                    Days
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {(history || [])
                  .filter(
                    (h) =>
                      filter === "All" ||
                      h.status?.toLowerCase() === filter.toLowerCase()
                  )
                  .map((h) => {
                    const status = h.status?.toLowerCase();

                    return (
                      <tr key={h._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {h.leaveType}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {h.startDate?.split("T")[0]} — {h.endDate?.split("T")[0]}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                            {h.totalDays}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              status === "approved"
                                ? "bg-green-50 text-green-700"
                                : status === "pending"
                                ? "bg-amber-50 text-amber-700"
                                : status === "rejected"
                                ? "bg-red-50 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {h.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}