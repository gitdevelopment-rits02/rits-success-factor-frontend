import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  createLeaveRequest,
  getLeaveHistory,
  getLeaveSummary,
} from "../Redux/thunks/ManagerRequestTimeOffThunk";
import ManagerRequestTimeOffSkeleton from "./ManagerRequestTimeOffSkeleton";
import { toast } from "react-toastify";


const formatDate = (d) => d.toISOString().split("T")[0];

export default function LeaveManagementSystem() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayType, setDayType] = useState("Full Day");
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [prevHistory, setPrevHistory] = useState([]);




  const dispatch = useDispatch();

const managerState = useSelector(
  (state) => state.manager?.requestTimeOff
) || { history: [], summary: {}, loading: false };

const { history, summary, loading } = managerState;


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


useEffect(() => {
  if (dayType === "Half Day" && startDate) {
    setEndDate(startDate);
  }
}, [dayType, startDate]);

useEffect(() => {
  history.forEach((leave) => {
    const oldLeave = prevHistory.find(
      (l) => l._id === leave._id
    );

    if (
      oldLeave &&
      oldLeave.status !== "Approved" &&
      leave.status === "Approved"
    ) {
      toast.success(
        `Your ${leave.leaveType} leave has been approved`
      );
    }
  });

  setPrevHistory(history);
}, [history]);


if (showSkeleton) {
  return <ManagerRequestTimeOffSkeleton />;
}



  const minDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  const getUsedBalance = () => {
    const used = { "Sick Leave": 0, "Casual Leave": 0, "Paid Leave": 0 };
    history.forEach((h) => {
      if (h.status !== "Rejected") {
        used[h.type] = (used[h.type] || 0) + h.days;
      }
    });
    return used;
  };

  const used = getUsedBalance();

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

  // const handleSubmit = () => {
  //   if (!leaveType || !startDate || !endDate || !reason) {
  //     setError("Please fill in all fields before submitting.");
  //     return;
  //   }
  //   const currentBalance = LEAVE_QUOTAS[leaveType] - (used[leaveType] || 0);
  //   if (appliedDays > currentBalance) {
  //     setError(`You only have ${currentBalance} days left for ${leaveType}.`);
  //     return;
  //   }
  //   setError("");

  //   const newRequest = {
  //     id: Date.now(),
  //     type: leaveType,
  //     from: startDate,
  //     to: endDate,
  //     days: appliedDays,
  //     dayType,
  //     reason,
  //     status: "Pending",
  //   };

  //   setHistory([newRequest, ...history]);
  //   setLeaveType("");
  //   setStartDate("");
  //   setEndDate("");
  //   setReason("");
  //   setDayType("Full Day");
  // };

  const handleSubmit = async () => {
  let errors = {};

  if (!leaveType) errors.leaveType = "Leave type is required";
  if (!startDate) errors.startDate = "Start date is required";
  if (dayType === "Full Day" && !endDate)
    errors.endDate = "End date is required";
  if (!reason) errors.reason = "Reason is required";

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);
    return;
  }

  setFieldErrors({});

  const payload = {
    leaveType,
    startDate,
    endDate,
    duration: dayType,
    reason,
  };

  try {
    await dispatch(createLeaveRequest(payload)).unwrap();

toast.success("Leave request submitted successfully ✅");

dispatch(getLeaveHistory());
dispatch(getLeaveSummary());

    dispatch(getLeaveHistory());
    dispatch(getLeaveSummary());

    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setDayType("Full Day");
  } catch (err) {
    console.error(err);
  }
};



 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-800 mb-1">Leave Management</h1>
          <p className="text-slate-500">Request time off and keep track of your balance</p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {Object.entries(summary || {}).map(([type, data]) => {
           const remaining = data.remaining;
const usedAmount = data.used;
const total = data.total;
const percentage = total ? (usedAmount / total) * 100 : 0;

            
            return (
              <div key={type} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{type}</p>
                    <p className="text-3xl font-semibold text-slate-800">{remaining}</p>
                    <p className="text-xs text-slate-400 mt-0.5">days remaining</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-3 py-1.5">
                    <p className="text-xs font-medium text-blue-700">{total} total</p>
                  </div>
                </div>
                
                <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <p className="text-xs text-slate-500 mt-3">{usedAmount} days used this year</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          
          {/* Request Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-blue-100/50">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">New Leave Request</h2>

            <div className="space-y-6">
              
              {/* Leave Type & Days Display */}
              <div className="grid md:grid-cols-5 gap-5">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type of Leave
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => {
                      setLeaveType(e.target.value);
                      setFieldErrors({ ...fieldErrors, leaveType: "" });
                    }}
                    className={`w-full bg-white border ${fieldErrors.leaveType ? "border-red-400" : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
                    
                  >
                    <option value="">Select leave type</option>
                    {Object.keys(summary || {}).map((q) => (

                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>

                   {fieldErrors.leaveType && (
    <p className="text-red-500 text-sm mt-1">
      {fieldErrors.leaveType}
    </p>
                   )}
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-5 flex flex-col items-center justify-center border border-blue-100">
                  <p className="text-xs text-slate-500 mb-1">Total Days</p>
                  <p className="text-2xl font-semibold text-blue-600">{appliedDays}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Date
                  </label>
                  <input 
                    type="date" 
                    min={minDate} 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                      className={`w-full bg-white border ${fieldErrors.startDate ? "border-red-400" : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
                  />
                   {fieldErrors.startDate && (
    <p className="text-red-500 text-sm mt-1">
      {fieldErrors.startDate}
    </p>
                   )}

                  
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Date
                  </label>
                  <input 
                    type="date" 
                    disabled={dayType === "Half Day"} 
                    min={startDate || minDate} 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                      className={`w-full bg-white border ${fieldErrors.endDate ? "border-red-400" : "border-slate-200"
                      } rounded-lg px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
                  />
                   {fieldErrors.endDate && (
    <p className="text-red-500 text-sm mt-1">
      {fieldErrors.endDate}
    </p>
                   )}
                 
                </div>
              </div>

              {/* Day Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Duration
                </label>
                <div className="inline-flex bg-slate-100 rounded-lg p-1">
                  {["Full Day", "Half Day"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDayType(type)}
                      className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                        dayType === type 
                          ? "bg-white text-blue-600 shadow-sm" 
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reason & Submit */}
          <div className="bg-blue-100 rounded-2xl p-8 shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold mb-2 text-slate-800">Reason</h3>
            <p className="text-slate-600 text-sm mb-5">Why are you requesting time off?</p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly explain your request..."
              className="w-full h-32 bg-white text-slate-800 placeholder-slate-400 border border-blue-200 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-5"
            />

             {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-5 text-center">
                ⚠️ {error}
              </div>
            )} 

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all active:scale-98 shadow-md"
            >
              Submit Application
            </button>
          </div>
        </div>

        {/* Leave History */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-800">Your Leave History</h2>
            
            <div className="inline-flex bg-slate-100 rounded-lg p-1">
              {["All", "Approved", "Pending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    filter === f 
                      ? "bg-white text-slate-800 shadow-sm" 
                      : "text-slate-600 hover:text-slate-800"
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
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Dates</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide">Days</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history
                  .filter(h => filter === "All" || h.status === filter)
                  .map((h) => (
                    <tr key={h._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{h.leaveType} </td>
                                                                                                
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {/* {h.from} — {h.to} */}
                        {h.startDate?.slice(0,10)} — {h.endDate?.slice(0,10)}

                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-slate-100 text-slate-700 text-sm font-semibold px-3 py-1 rounded-full">
                        {h.totalDays}

                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          h.status === "Approved" 
                            ? "bg-green-100 text-green-700" 
                            : h.status === "Pending" 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}