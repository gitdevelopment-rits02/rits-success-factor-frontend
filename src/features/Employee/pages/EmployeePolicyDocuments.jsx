import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineDesktopComputer,
  HiOutlineHome,
  HiOutlineLogout,
} from "react-icons/hi";

import {
  getEmployeePolicies,
  getEmployeePolicyById,
} from "../Redux/thunks/EmployeePolicyDocumentsThunk";
import {
  clearSelectedPolicy,
  setSelectedPolicy,
} from "../Redux/slices/EmployeePolicyDocumentsSlice";

import EmployeePolicyDocumentsSkeleton from "./EmployeePolicyDocumentsSkeleton";

const policyIcons = {
  "Code of Conduct": <HiOutlineDocumentText />,
  Leave: <HiOutlineCalendar />,
  Attendance: <HiOutlineClock />,
  "Data Protection": <HiOutlineShieldCheck />,
  "IT Usage": <HiOutlineDesktopComputer />,
  "Work From Home (WFH)": <HiOutlineHome />,
  "Exit & Separation": <HiOutlineLogout />,
};

export default function EmployeePoliciesPage() {
  const dispatch = useDispatch();

  const employeePolicyDocuments =
    useSelector((state) => state.employee.policyDocuments) || {};

  const {
    policies = [],
    selectedPolicy = null,
    loading = false,
    error = null,
  } = employeePolicyDocuments;

  const [search, setSearch] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true); // 👈 skeleton control

  // Fetch policies
  useEffect(() => {
    dispatch(getEmployeePolicies());
  }, [dispatch]);

  // Force skeleton for minimum 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredPolicies = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return policies.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowerSearch) ||
        item.preview?.toLowerCase().includes(lowerSearch) ||
        item.category?.toLowerCase().includes(lowerSearch)
    );
  }, [policies, search]);

  const selectedPolicyDetails = useMemo(
    () => (selectedPolicy ? [selectedPolicy.preview] : []),
    [selectedPolicy]
  );

  const isLoadingUI = loading || showSkeleton; // 👈 final loader flag

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {!selectedPolicy && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Employee Policies
                </h1>
                <p className="text-sm md:text-base text-slate-500">
                  Manage and view company-wide standard operating procedures.
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search policies..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <p className="text-red-500">Error: {error}</p>}

            {isLoadingUI ? (
              <EmployeePolicyDocumentsSkeleton />
            ) : (
              <div className="grid gap-4">
                {filteredPolicies.map((item) => (
                  <div
                    key={item.policyId}
                    onClick={() => dispatch(setSelectedPolicy(item))}
                    className="group cursor-pointer flex items-center justify-between p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl text-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                        {policyIcons[item.title] || <HiOutlineDocumentText />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base md:text-lg text-slate-900">
                          {item.title} ({item.category})
                        </h3>
                        <p className="text-sm text-slate-500">{item.preview}</p>
                        <p className="text-xs text-slate-400">
                          Created: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <FiArrowRight className="text-lg text-slate-400 group-hover:text-blue-600 transition" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {selectedPolicy && (
          <>
            {isLoadingUI ? (
              <EmployeePolicyDocumentsSkeleton type="details" />
            ) : (
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={() => dispatch(clearSelectedPolicy())}
                  className="flex items-center gap-2 text-sm text-blue-600 mb-5 hover:underline"
                >
                  <FiArrowLeft /> Back to Policies
                </button>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-4 p-5 border-b bg-slate-50">
                    <div className="p-3 rounded-xl text-xl bg-blue-100 text-blue-600">
                      {policyIcons[selectedPolicy.title] || <HiOutlineDocumentText />}
                    </div>
                    <div>
                      <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                        {selectedPolicy.title}
                      </h1>
                      <p className="text-sm text-slate-500">{selectedPolicy.preview}</p>
                      <p className="text-xs text-slate-400">
                        Created: {new Date(selectedPolicy.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <p><strong>ID:</strong> {selectedPolicy.policyId}</p>
                    <p><strong>Title:</strong> {selectedPolicy.title}</p>
                    <p><strong>Category:</strong> {selectedPolicy.category}</p>
                    <p><strong>Preview:</strong> {selectedPolicy.preview}</p>
                    <p><strong>Created At:</strong> {new Date(selectedPolicy.createdAt).toLocaleString()}</p>

                    <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-4">
                      Policy Guidelines
                    </h2>
                    <div className="grid gap-3">
                      {selectedPolicyDetails.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
