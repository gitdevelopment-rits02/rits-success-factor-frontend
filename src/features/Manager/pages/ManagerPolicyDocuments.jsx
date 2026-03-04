import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineDesktopComputer,
  HiOutlineExclamation,
  HiOutlineHome,
  HiOutlineLogout,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllManagerPolicyDocuments,
  getManagerPolicyById,
} from "../Redux/thunks/ManagerPolicyDocumentsThunk";

import { clearSelectedPolicy } from "../Redux/slices/ManagerPolicyDocumentsSlice";
import ManagerPolicyDocumentSkeleton from "./ManagerPolicyDocumentSkeleton";

export default function EmployeePoliciesPage() {
  const dispatch = useDispatch();

  const { loading, data: policies = [], selectedPolicy, error } = useSelector(
    (state) => state.manager.policyDocuments
  );

  console.log("Redux Data FULL:", JSON.stringify(policies, null, 2));

  //const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllManagerPolicyDocuments());
  }, [dispatch]);

  const filteredPolicies = Array.isArray(policies)
    ? policies.filter(
      (item) =>
        item?.title?.toLowerCase().includes(search.toLowerCase()) ||
        item?.preview?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  if (loading) {
  return <ManagerPolicyDocumentSkeleton count={5} />;
}

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

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

            <div className="grid gap-4">
              {filteredPolicies?.map((item) => (
                <div
                  key={item.policyId}
                  onClick={() => dispatch(getManagerPolicyById(item.policyId))}
                  className="group cursor-pointer flex items-center justify-between p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl text-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                      {/* {item.icon} */}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {/* {item.desc} */}
                        {item.preview}
                      </p>
                    </div>
                  </div>
                  <FiArrowRight className="text-lg text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              ))}
            </div>
          </>
        )}

        {selectedPolicy && (
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
                  {/* {selectedPolicy.icon} */}
                  <HiOutlineDocumentText />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                    {selectedPolicy.title}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {/* {selectedPolicy.desc} */}
                    Category: {selectedPolicy.category}
                  </p>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-4">
                  Policy Guidelines
                </h2>

                <div className="grid gap-3">
                  {selectedPolicy?.sections?.map((section, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold shrink-0">
                          {index + 1}
                        </div>
                        <h3 className="font-semibold text-slate-800">{section.title}</h3>
                      </div>

                      {/* Render content correctly */}
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc ml-10 text-slate-700">
                          {section.content.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-700">{section.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 