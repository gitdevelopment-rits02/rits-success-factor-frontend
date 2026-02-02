
import React, { useState } from "react";
// import { FaStar } from "react-icons/fa";
import { FaStar, FaPlus, FaUsers, FaMedal, FaFilter, FaSearch } from "react-icons/fa";
// import background from "/src/assets/Background.jpg";
// import bottomImage from "/src/assets/bottom-image.png"; 
import pageBackground from "../../../assets/background.png";


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
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
  manager: "",
  employee: "",
  employeeId: "",
  rating: 0,
  review: "",
});



  const totalFeedbacks = feedbacks.length;
  const averageRating = (
    feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks || 0
  ).toFixed(1);




const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.manager || !form.employee || !form.rating || !form.review) {
    alert("Fill all fields");
    return;
  }

  const newFeedback = {
  id: feedbacks.length + 1,
  employee: form.employee,
  manager: form.manager,
  rating: form.rating,
  review: form.review,
  date: new Date().toISOString().split("T")[0],
};


  setFeedbacks((prev) => [...prev, newFeedback]); // 
  setShowForm(false);

  setForm({
    manager: "",
    employee: "",
    employeeId: "",
    rating: 0,
    review: "",
  });
};

const filteredFeedbacks = feedbacks.filter((f) =>
  f.employee.toLowerCase().includes(search.toLowerCase())
);




  return (
//     <div
// className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100"
// >
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


      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"> */}
        <div className="grid grid-cols-3 gap-6 mb-10">
  {/* Total Feedbacks */}
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition
p-5 flex items-center gap-4">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
      <FaUsers />
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase">Total Feedbacks</p>
      <p className="text-2xl font-semibold">{totalFeedbacks}</p>
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
        {averageRating} <span className="text-yellow-500">★</span>
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
        {feedbacks.filter((f) => f.rating === 5).length}
      </p>
    </div>
  </div>
</div>


      {/* Feedback Table */}
      {/* <div className="bg-white rounded-xl shadow mb-10 overflow-x-auto"> */}
       <div className="bg-white rounded-2xl shadow-xl mb-10 overflow-hidden border border-blue-100">

        <div className="p-4 flex items-center justify-between">
  <h2 className="text-lg font-semibold text-gray-800">
    Feedback List
  </h2>

  {/* <div className="flex items-center gap-4 text-gray-500">
    <FaFilter className="cursor-pointer hover:text-gray-700" />
    <FaSearch className="cursor-pointer hover:text-gray-700" />
  </div> */}
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

            {filteredFeedbacks.map((f) => (
              <tr key={f.id} className="bg-white hover:bg-blue-50 transition shadow-sm rounded-lg">
                {/* <td className="p-3">{f.employee}</td> */}
                <td className="p-3 text-center">
  <div className="flex items-center gap-3">

  {/* <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold"> */}
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-sm font-semibold shadow">

    {f.employee
      .split(" ")
      .map((n) => n[0])
      .join("")}
  </div>
  <span className="font-medium text-gray-800">{f.employee}</span>
  </div>
</td>

                {/* <td className="p-3">
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-800">
  {f.manager || "—"}
</span>

    <span className="text-xs text-gray-400">
      Manager
    </span>
  </div>
</td> */}

<td className="p-3 text-cen">
  {/* <span className="text-sm font-medium text-gray-800"> */}
  <span className="text-sm font-semibold text-gray-900">

    {f.manager || "—"}
  </span>
</td>


                {/* <td className="p-3 flex gap-1"> */}
                <td className="p-3">
  <div className="flex items-center gap-1">

                  {Array.from({ length: f.rating }).map((_, i) => (
                    <FaStar key={i} size={14} className="text-yellow-500" />
                  ))}
                  </div>
                </td>
                <td className="p-4 text-gray-600 leading-relaxed">
  {f.review}
</td>

                <td className="p-4 text-gray-400 text-sm">
  {f.date}
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

            {/* <h2 className="text-lg font-semibold text-blue-800 mb-4">
              Give Employee Feedback
            </h2> */}
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
    {/* <select
      className="w-full h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={form.manager}
      onChange={(e) =>
        setForm({
          ...form,
          manager: e.target.value,
          employee: "",
          employeeId: "",
        })
      }
    >
      <option value="">Select Manager</option>
      {Object.keys(managerData).map((m) => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select> */}

    <input
  type="text"
  placeholder="Type manager name..."
  value={form.manager}
  onChange={(e) =>
    setForm({
      ...form,
      manager: e.target.value,
      employee: "",
      employeeId: "",
    })
  }
  className="w-full h-11 rounded-xl border border-gray-300 px-4
  focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>

  </div>

  {/* Employee */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Employee
    </label>
    <select
      disabled={!form.manager}
      className="w-full h-11 rounded-lg border border-gray-300 px-4 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={form.employee}
      onChange={(e) => {
        const emp = managerData[form.manager].find(
          (x) => x.name === e.target.value
        );
        setForm({
          ...form,
          employee: emp.name,
          employeeId: emp.id,
        });
      }}
    >
      <option value="">Select Employee</option>
      {managerData[form.manager] &&
  managerData[form.manager].map((emp) => (

          <option key={emp.id} value={emp.name}>
            {emp.name}
          </option>
        ))}
    </select>
  </div>

  {/* Employee ID */}
  {/* Employee ID */}
<div className="col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Employee ID
  </label>
  <input
    readOnly
    value={form.employeeId}
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
      {[1,2,3,4,5].map((r) => (
        <FaStar
          key={r}
          size={22}
          onClick={() => setForm({ ...form, rating: r })}
          className={`cursor-pointer ${
            r <= form.rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>

    <span className="text-sm text-gray-600">
      {form.rating || 0}.0 / 5.0
    </span>
  </div>
</div>


  {/* Feedback */}
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
      className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
    >
      Submit
    </button>
  </div>

</form>


          </div>
        </div>

      )}
      {/* Bottom Decorative Image */}
{/* <div className="w-full flex justify-center mt-16 pointer-events-none">
  <img
    src={bottomImage}
    alt="Performance illustration"
    className="max-w-3xl w-full opacity-90"
  />


</div> */}
      </div>
    </div>
  );
}

export default FeedbackPage;
 