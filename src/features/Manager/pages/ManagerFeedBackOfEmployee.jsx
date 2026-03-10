
import React, { useState } from "react";
// import { FaStar } from "react-icons/fa";
import { FaStar, FaPlus, FaUsers, FaMedal, FaFilter, FaSearch } from "react-icons/fa";
// import background from "/src/assets/Background.jpg";
// import bottomImage from "/src/assets/bottom-image.png"; 
import pageBackground from "../../../assets/background.png";
import ManagerFeedbackSkeleton from "./ManagerFeedbackSkeleton";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import {
  createManagerFeedbackThunk,
  getManagerFeedbackListThunk,
} from "../../Manager/Redux/thunks/ManagerFeedBackOfEmployeeThunk";
import { useEffect } from "react";


const managerData = {
  "Parmesh": [
    { name: "Amit Shah", id: "EMP101" },
    { name: "Neha Verma", id: "EMP102" },
    { name: "Suresh Rao", id: "EMP103" },
  ],
  "Padmashree": [
    { name: "Rahul Mehta", id: "EMP201" },
    { name: "Kavita Joshi", id: "EMP202" },
    { name: "Anil Patel", id: "EMP203" },
  ],
  "Arjun Malhotra": [
    { name: "Pooja Nair", id: "EMP301" },
    { name: "Vikas Jain", id: "EMP302" },
    { name: "Manoj Gupta", id: "EMP303" },
  ],
  "Sneha Iyer": [
    { name: "Rohit Das", id: "EMP401" },
    { name: "Nikhil Kulkarni", id: "EMP402" },
    { name: "Swati Mishra", id: "EMP403" },
  ],
};
// Search icon 

/* ---------- Initial Feedback Data ---------- */
const initialFeedbacks = [
  {
    id: 1,
    employee: "Akash Patil",
    manager: "Ravi Kumar",
    rating: 4,
    review: "Consistently meets deadlines and communicates well.",
    date: "2026-01-12",
  },
  {
    id: 2,
    employee: "Neha Sharma",
    manager: "Priya Singh",
    rating: 5,
    review: "Excellent people management and proactive attitude.",
    date: "2026-01-18",
  },
  {
    id: 3,
    employee: "John Doe",
    manager: "Arjun Malhotra",
    rating: 4,
    review: "Supports team members effectively.",
    date: "2026-01-19",
  },
  {
    id: 4,
    employee: "Alex Smith",
    manager: "Ravi Kumar",
    rating: 5,
    review: "Handles tasks efficiently with minimal supervision.",
    date: "2026-01-21",
  },
  {
    id: 5,
    employee: "Jack Wilson",
    manager: "Sneha Iyer",
    rating: 4,
    review: "Maintains good work ethics.",
    date: "2026-01-23",
  },
];

/* ---------- Named Export ---------- */
export function FeedbackPage() {

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    manager: "",
    employee: "",
    employeeId: "",
    rating: 0,
    review: "",
  });

  const dispatch = useDispatch();

  const { feedbackList, summary, loading } = useSelector(
    (state) => state.manager.feedBackOfEmployee
  );

  const employeeOptions = Array.from(
    new Map(
      feedbackList?.map((item) => [
        item.givenTo?._id,
        item.givenTo,
      ])
    ).values()
  );

  useEffect(() => {
    dispatch(getManagerFeedbackListThunk());
  }, [dispatch]);


  const validateForm = () => {
    const newErrors = {};

    if (!form.manager) {
      newErrors.manager = "Manager is required";
    }

    if (!form.employee) {
      newErrors.employee = "Employee is required";
    }

    if (!form.rating || form.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!form.review.trim()) {
      newErrors.review = "Feedback is required";
    } else if (form.review.trim().length < 10) {
      newErrors.review = "Feedback must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateForm()) return;

    const payload = {
      employeeId: form.employeeId,
      type: "Performance",
      subject: "Quarter Review",
      rating: form.rating,
      comment: form.review,
    };

    // console.log("PAYLOAD:", payload);

    const result = await dispatch(createManagerFeedbackThunk(payload));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Feedback submitted successfully");

      dispatch(getManagerFeedbackListThunk());

      setShowForm(false);

      setForm({
        manager: "",
        employee: "",
        employeeId: "",
        rating: 0,
        review: "",
      });

      setErrors({});
    } else {
      toast.error(result.payload?.message || "Failed to submit feedback");
    }
  };

  if (loading) {
    return <ManagerFeedbackSkeleton />;
  }

  return (

    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${pageBackground})` }}
    >


      <div className="min-h-screen p-6 bg-white/80 backdrop-blur-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-blue-700">
              Manager Feedback
            </h1>
            {/* <h1 className="text-2xl font-semibold text-gray-900">Feedback</h1> */}
            <p className="text-sm text-gray-500 pt-4">
              Manage and monitor employee performance insights
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaPlus size={12} />
            Employee Feedback
          </button>
        </div>



        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Total Feedbacks */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition
p-5 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <FaUsers />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Total Feedbacks</p>
              <p className="text-2xl font-semibold">{summary?.totalFeedbacks || 0}
              </p>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-500 p-3 rounded-lg">
              <FaStar />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Average Rating</p>
              <p className="text-2xl font-semibold">
                {summary?.averageRating || 0}
                <span className="text-yellow-500">★</span>
              </p>
            </div>
          </div>

          {/* 5 Star Feedbacks */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <FaMedal />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">5-Star Feedbacks</p>
              <p className="text-2xl font-semibold">
                {summary?.fiveStarFeedbacks || 0}

              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl mb-10 overflow-hidden border border-blue-100">

          <div className="p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Feedback List
            </h2>


            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              //   className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              className="border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"

            />

          </div>


          <table className="w-full text-sm min-w-[700px] border-separate border-spacing-y-2">
            {/* <thead className="bg-blue-100 text-blue-800"> */}
            <thead className="bg-blue-100 text-blue-800 text-xs uppercase tracking-wide sticky top-0 z-10">

              <tr>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Manager</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Review</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            {/* <tbody> */}

            <tbody className="divide-y divide-blue-100">

              {feedbackList
                ?.filter((f) =>
                  f.givenTo?.employeeName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((f) => (
                  <tr key={f._id} className="bg-white hover:bg-blue-50 transition shadow-sm rounded-lg">

                    {/* Employee */}
                    <td className="p-3 text-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-sm font-semibold shadow">
                          {/* {f.givenTo?.employeeName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")} */}
                        </div>
                        <span className="font-medium text-gray-800">
                          {f.givenTo?.employeeName}
                        </span>
                      </div>
                    </td>

                    {/* Manager */}
                    <td className="p-3">
                      <span className="text-sm font-semibold text-gray-900">
                        {f.givenByRole}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: f.rating }).map((_, i) => (
                          <FaStar key={i} size={14} className="text-yellow-500" />
                        ))}
                      </div>
                    </td>

                    {/* Review */}
                    <td className="p-4 text-gray-600 leading-relaxed">
                      {f.comment}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(f.createdAt).toLocaleDateString()}

                    </td>

                  </tr>
                ))}

            </tbody>


          </table>
        </div>

        {/* Employee Feedback Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50 overflow-y-auto">
            {/* <div className="bg-white rounded-xl shadow w-full max-w-lg p-6"> */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-gray-100 mt-10 max-h-[85vh] overflow-y-auto">


              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Give Employee Feedback
                  </h2>
                  <p className="text-sm text-gray-500">
                    Submit performance ratings for team members
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>



              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-5"
              >

                {/* Manager */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manager
                  </label>

                  <select
                    value={form.manager}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        manager: e.target.value,
                        employee: "",
                        employeeId: "",
                      })
                    }
                    className="w-full h-11 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >

                    <option value="">Select Manager</option>

                    {Object.keys(managerData).map((manager) => (
                      <option key={manager} value={manager}>
                        {manager}
                      </option>
                    ))}
                  </select>
                  {errors.manager && (
                    <p className="text-red-500 text-xs mt-1">{errors.manager}</p>
                  )}

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee
                  </label>

                  <select
                    value={form.employee || ""}
                    onChange={(e) => {
                      const selectedEmployee = employeeOptions.find(
                        (emp) => emp._id === e.target.value
                      );

                      if (!selectedEmployee) {
                        setForm({
                          ...form,
                          employee: "",
                          employeeId: "",
                        });
                        return;
                      }

                      setForm({
                        ...form,
                        employee: selectedEmployee._id,
                        employeeId: selectedEmployee._id,
                      });
                    }}
                    className="w-full h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select Employee</option>

                    {employeeOptions.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.employeeName}
                      </option>
                    ))}
                  </select>
                  {errors.employee && (
                    <p className="text-red-500 text-xs mt-1">{errors.employee}</p>
                  )}

                </div>

                {/* Employee ID */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    readOnly
                    value={form.employeeId || ""}
                    placeholder="Auto-filled"
                    className="w-full h-11 rounded-lg bg-gray-100 border border-gray-300 px-4"
                  />

                </div>


                {/* Rating */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Performance
                  </label>

                  <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 border">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <FaStar
                          key={r}
                          size={22}
                          onClick={() => setForm({ ...form, rating: r })}
                          className={`cursor-pointer ${r <= form.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>

                    <span className="text-sm text-gray-600">
                      {form.rating || 0}.0 / 5.0
                    </span>
                  </div>
                  {errors.rating && (
                    <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
                  )}

                </div>

                {/* Feedback */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write feedback..."
                    value={form.review}
                    onChange={(e) =>
                      setForm({ ...form, review: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.review && (
                    <p className="text-red-500 text-xs mt-1">{errors.review}</p>
                  )}

                </div>

                {/* Buttons */}
                <div className="col-span-2 flex justify-end gap-3 pt-6">

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>

                </div>

              </form>


            </div>
          </div>

        )}

      </div>
    </div>
  );
}

export default FeedbackPage;
