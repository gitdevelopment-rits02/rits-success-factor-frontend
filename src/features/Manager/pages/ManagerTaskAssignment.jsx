import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeaderThunk,
  fetchTeamThunk,
  fetchCurrentTasksThunk,
  fetchHistoryThunk,
  createTaskThunk,
  completeTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from "../Redux/thunks/ManagerTaskAssignmentThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerTaskAssignmentSkeleton from "./ManagerTaskAssignmentSkeleton";

export default function Manager() {
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const dispatch = useDispatch();

  const { header = {}, team = [], currentTasks = [], history = [], loading } =
    useSelector((state) => state.manager.taskAssignment);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function resetForm() {
    setTaskTitle("");
    setTaskTime("");
    setEditingIndex(null);
  }

  function handleSubmit() {
    if (!taskTitle || !taskTime) {
      toast.warning("Please enter task and hours");
      return;
    }

    if (editingIndex !== null) {
      dispatch(
        updateTaskThunk({
          taskId: currentTasks[editingIndex]._id,
          payload: { description: taskTitle, hours: taskTime },
        })
      )
        .unwrap()
        .then(() => toast.success("Task updated successfully"))
        .catch(() => toast.error("Update failed"));
    } else {
      if (!team[selectedEmployee]?._id) return;

      dispatch(
        createTaskThunk({
          employeeId: team[selectedEmployee]._id,
          description: taskTitle,
          hours: taskTime,
        })
      )
        .unwrap()
        .then(() => toast.success("Task added successfully"))
        .catch(() => toast.error("Task creation failed"));
    }

    resetForm();
  }

  function editTask(index) {
    setEditingIndex(index);
    setTaskTitle(currentTasks[index].description);
    setTaskTime(currentTasks[index].hours);
  }

  function openCompletePopup(index) {
    setTaskToComplete(index);
    setShowPopup(true);
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

  useEffect(() => {
    dispatch(fetchHeaderThunk());
    dispatch(fetchTeamThunk());
  }, []);

  useEffect(() => {
    if (team[selectedEmployee]?._id) {
      dispatch(fetchCurrentTasksThunk(team[selectedEmployee]._id));
      dispatch(fetchHistoryThunk(team[selectedEmployee]._id));
    }
  }, [selectedEmployee, team]);

  if (loading) return <ManagerTaskAssignmentSkeleton />;

  return (
    <>
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
                    Manager: {header.managerName || ""}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {header.date && new Date(header.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Left Team + Right Main Content */}
          <div className="lg:flex lg:gap-6">

            {/* Team Box */}
<div className="bg-white rounded-lg p-5 shadow-sm lg:w-1/4 h-80 overflow-y-auto">
  <h2 className="font-semibold text-gray-700 mb-4">Team</h2>
  <div className="space-y-2">
    {team.map((emp, i) => (
      <button
        key={i}
        onClick={() => switchEmployee(i)}
        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
          selectedEmployee === i
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-50"
        }`}
      >
        <div
          className={`p-2 rounded-lg ${
            selectedEmployee === i
              ? "bg-white bg-opacity-20"
              : "bg-blue-100"
          }`}
        >
          <FaUser
            className={
              selectedEmployee === i
                ? "text-white text-sm"
                : "text-blue-500 text-sm"
            }
          />
        </div>
        <div>
          <p
            className={`font-medium text-sm ${
              selectedEmployee === i ? "text-white" : "text-gray-800"
            }`}
          >
            {emp.employeeName}
          </p>
          <p
            className={`text-xs ${
              selectedEmployee === i ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {emp.workDetails?.designation}
          </p>
        </div>
      </button>
    ))}
  </div>
</div>


            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6 overflow-y-auto h-[600px]">
              {/* Task Form */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="font-semibold text-gray-800">
                    {editingIndex !== null ? "Edit Task" : "New Task"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    For: {team[selectedEmployee]?.employeeName}
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <textarea
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Task description"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none h-24"
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

              {/* Current Tasks */}
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

                {currentTasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-sm">No tasks assigned</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentTasks.map((task, i) => (
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
                              {task.description}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaClock className="text-xs" />
                              <span>{task.hours}</span>
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
                              onClick={() =>
                                dispatch(deleteTaskThunk(currentTasks[i]._id))
                                  .unwrap()
                                  .then(() => toast.success("Task deleted"))
                                  .catch(() => toast.error("Delete failed"))
                              }
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
                  {history.length === 0 ? (
                    <p className="text-center py-8 text-sm text-gray-400">
                      No completed tasks
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {history.map((task, i) => (
                        <div
                          key={i}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-700 mb-1">
                                {task.description}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <FaClock className="text-xs" />
                                  <span>{task.hours}</span>
                                </div>
                                {task.completedAt && (
                                  <span>
                                    Completed{" "}
                                    {new Date(task.completedAt).toLocaleDateString()}
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
                  onClick={() =>
                    dispatch(
                      completeTaskThunk({
                        taskId: currentTasks[taskToComplete]?._id,
                        action: "store",
                      })
                    )
                      .unwrap()
                      .then(() => toast.success("Task stored"))
                      .catch(() => toast.error("Failed"))
                  }
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
                >
                  Store in History
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      completeTaskThunk({
                        taskId: currentTasks[taskToComplete]?._id,
                        action: "discard",
                      })
                    )
                      .unwrap()
                      .then(() => toast.success("Task discarded"))
                      .catch(() => toast.error("Failed"))
                  }
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

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
 