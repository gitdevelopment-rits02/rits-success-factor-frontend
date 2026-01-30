import React, { useState } from "react";
import {
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaEdit,
  FaBriefcase,
} from "react-icons/fa";

const initialData = {
  manager: "Eshwar P",
  projectName: "Website Redesign",
  employees: [
    { name: "Nisha P", role: "UI/UX Designer", tasks: [] },
    { name: "Ashwini K", role: "Frontend Developer", tasks: [] },
    { name: "Siddarth R", role: "Backend Developer", tasks: [] },
    { name: "Ajay", role: "UI/UX Designer", tasks: [] },
  ],
};

export default function Manager() {
  const [employees, setEmployees] = useState(initialData.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const resetForm = () => {
    setTaskTitle("");
    setTaskTime("");
    setEditIndex(null);
  };

  const addOrUpdateTask = () => {
    if (!taskTitle || !taskTime) return;

    const updated = [...employees];

    if (editMode && editIndex !== null) {
      updated[selectedEmployee].tasks[editIndex] = {
        ...updated[selectedEmployee].tasks[editIndex],
        title: taskTitle,
        time: taskTime,
      };
    } else {
      updated[selectedEmployee].tasks.push({
        title: taskTitle,
        time: taskTime,
        status: "incomplete",
      });
    }

    setEmployees(updated);
    resetForm();
  };

  const selectTaskForEdit = (index) => {
    if (!editMode) return;
    const task = employees[selectedEmployee].tasks[index];
    setTaskTitle(task.title);
    setTaskTime(task.time);
    setEditIndex(index);
  };

  const toggleStatus = (index, status) => {
    const updated = [...employees];
    updated[selectedEmployee].tasks[index].status = status;
    setEmployees(updated);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 mb-6 shadow flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl">
            <FaBriefcase className="text-blue-700 text-3xl" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
              Manager Task & Project Tracking
            </h1>
            <p className="text-sm text-gray-600">
              Manager: {initialData.manager}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* EMPLOYEES */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Employees</h2>

          {employees.map((emp, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedEmployee(i);
                resetForm();
                setEditMode(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 text-left transition ${
                selectedEmployee === i
                  ? "bg-blue-100 border border-blue-300"
                  : "hover:bg-blue-50"
              }`}
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <FaUser />
              </div>
              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.role}</p>
              </div>
            </button>
          ))}
        </div>

        {/* TASK ASSIGNMENT */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-bold">Task Assignment</h2>
              <p className="text-sm text-gray-500">
                {employees[selectedEmployee].name}
              </p>
            </div>

            <button
              onClick={() => {
                setEditMode((prev) => !prev);
                resetForm();
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                editMode
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <FaEdit />
              {editMode ? "Editing" : "Edit Tasks"}
            </button>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task Title"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              placeholder="Hours"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={addOrUpdateTask}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 py-2"
            >
              <FaPlus />
              {editMode ? "Update" : "Assign"}
            </button>
          </div>

          {/* TASK LIST */}
          {employees[selectedEmployee].tasks.length === 0 && (
            <p className="text-gray-400 text-sm">No tasks assigned yet.</p>
          )}

          {employees[selectedEmployee].tasks.map((task, i) => (
            <div
              key={i}
              onClick={() => editMode && selectTaskForEdit(i)}
              className={`border rounded-xl p-4 mb-3 transition ${
                editIndex === i
                  ? "border-blue-400 bg-blue-50"
                  : "hover:bg-blue-50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaClock /> {task.time}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      task.status === "complete"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {task.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(i, "complete");
                    }}
                    disabled={task.status === "complete"}
                    className="text-green-600 disabled:opacity-30"
                  >
                    <FaCheckCircle />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(i, "incomplete");
                    }}
                    disabled={task.status === "incomplete"}
                    className="text-red-600 disabled:opacity-30"
                  >
                    <FaTimesCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

 