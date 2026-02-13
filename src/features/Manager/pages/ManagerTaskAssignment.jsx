import React, { useState } from "react";
import {
  FaUser,
  FaClock,
  FaCheckCircle,
  FaEdit,
  FaBriefcase,
  FaTrash,
  FaHistory,
  FaPlus,
} from "react-icons/fa";

const initialData = {
  manager: "Eshwar P",
  projectName: "Website Redesign",
  employees: [
    { 
      name: "Nisha P", 
      role: "UI/UX Designer", 
      tasks: [],
      history: []
    },
    { 
      name: "Ashwini K", 
      role: "Frontend Developer", 
      tasks: [],
      history: []
    },
    { 
      name: "Siddarth R", 
      role: "Backend Developer", 
      tasks: [],
      history: []
    },
    { 
      name: "Ajay", 
      role: "UI/UX Designer", 
      tasks: [],
      history: []
    },
  ],
};

export default function Manager() {
  const [employees, setEmployees] = useState(initialData.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const currentEmployee = employees[selectedEmployee];

  function resetForm() {
    setTaskTitle("");
    setTaskTime("");
    setEditingIndex(null);
  }

  function handleSubmit() {
    if (!taskTitle.trim() || !taskTime.trim()) return;

    const updated = [...employees];

    if (editingIndex !== null) {
      updated[selectedEmployee].tasks[editingIndex] = {
        ...updated[selectedEmployee].tasks[editingIndex],
        title: taskTitle,
        time: taskTime,
      };
    } else {
      updated[selectedEmployee].tasks.push({
        title: taskTitle,
        time: taskTime,
        createdAt: new Date().toISOString(),
      });
    }

    setEmployees(updated);
    resetForm();
  }

  function editTask(index) {
    const task = currentEmployee.tasks[index];
    setTaskTitle(task.title);
    setTaskTime(task.time);
    setEditingIndex(index);
  }

  function deleteTask(index) {
    const updated = [...employees];
    updated[selectedEmployee].tasks.splice(index, 1);
    setEmployees(updated);
    if (editingIndex === index) {
      resetForm();
    }
  }

  function openCompletePopup(index) {
    setTaskToComplete(index);
    setShowPopup(true);
  }

  function handleStoreInHistory() {
    if (taskToComplete === null) return;

    const updated = [...employees];
    const task = updated[selectedEmployee].tasks[taskToComplete];
    
    updated[selectedEmployee].history.unshift({
      ...task,
      completedAt: new Date().toISOString(),
    });
    
    updated[selectedEmployee].tasks.splice(taskToComplete, 1);
    setEmployees(updated);
    closePopup();
  }

  function handleDiscard() {
    if (taskToComplete === null) return;

    const updated = [...employees];
    updated[selectedEmployee].tasks.splice(taskToComplete, 1);
    setEmployees(updated);
    closePopup();
  }

  function closePopup() {
    setShowPopup(false);
    setTaskToComplete(null);
  }

  function switchEmployee(index) {
    setSelectedEmployee(index);
    resetForm();
    setShowHistory(false);
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Task Manager
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manager: {initialData.manager}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{today}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Employee List */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Team</h2>

            <div className="space-y-2">
              {employees.map((emp, i) => (
                <button
                  key={i}
                  onClick={() => switchEmployee(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
                    selectedEmployee === i
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedEmployee === i ? "bg-white bg-opacity-20" : "bg-blue-100"
                  }`}>
                    <FaUser className={selectedEmployee === i ? "text-white text-sm" : "text-blue-500 text-sm"} />
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${selectedEmployee === i ? "text-white" : "text-gray-800"}`}>
                      {emp.name}
                    </p>
                    <p className={`text-xs ${selectedEmployee === i ? "text-blue-100" : "text-gray-500"}`}>
                      {emp.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Task Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="font-semibold text-gray-800">
                  {editingIndex !== null ? "Edit Task" : "New Task"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  For: {currentEmployee.name}
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Task description"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <input
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                  placeholder="Hours"
                  className="w-28 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {editingIndex !== null ? (
                    <>
                      <FaEdit className="text-xs" /> Update
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-xs" /> Add
                    </>
                  )}
                </button>
              </div>

              {editingIndex !== null && (
                <button
                  onClick={resetForm}
                  className="mt-3 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Active Tasks */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Current Tasks</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-2"
                >
                  <FaHistory className="text-xs" />
                  {showHistory ? "Hide" : "View"} History
                </button>
              </div>

              {currentEmployee.tasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm">No tasks assigned</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentEmployee.tasks.map((task, i) => (
                    <div
                      key={i}
                      className={`border rounded-lg p-4 ${
                        editingIndex === i
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FaClock className="text-xs" />
                            <span>{task.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openCompletePopup(i)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                            title="Complete"
                          >
                            <FaCheckCircle />
                          </button>
                          
                          <button
                            onClick={() => editTask(i)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          
                          <button
                            onClick={() => deleteTask(i)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Task History</h3>

                {currentEmployee.history.length === 0 ? (
                  <p className="text-center py-8 text-sm text-gray-400">
                    No completed tasks
                  </p>
                ) : (
                  <div className="space-y-3">
                    {currentEmployee.history.map((task, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-1">
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <FaClock className="text-xs" />
                                <span>{task.time}</span>
                              </div>
                              {task.completedAt && (
                                <span>
                                  Completed {new Date(task.completedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            Done
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                Task Completed
              </h3>
              <p className="text-sm text-gray-600">
                Would you like to save this to history or remove it?
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleStoreInHistory}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
              >
                Store in History
              </button>
              <button
                onClick={handleDiscard}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
              >
                Discard Task
              </button>
              <button
                onClick={closePopup}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}