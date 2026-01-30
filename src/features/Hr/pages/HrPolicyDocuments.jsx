import { useState } from "react";
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
 
const policies = [
  {
    id: "New",
    title: "New Security Policy on Data Sharing",
    desc: "Security Rules",
    icon: <HiOutlineCalendar />,
    details: [
      "This policy establishes guidelines for secure and responsible data sharing within the organization.",
      "This policy applies to all employees, contractors, and third parties handling organizational data.",
      "All data must be classified according to internal standards.",
      "Sensitive data must be encrypted at rest and in transit.",
      "Access must be granted on a strict need-to-know basis.",
    ],
  },
  {
    id: "code",
    title: "Code of Conduct",
    desc: "Guidelines for professional behavior and ethical conduct in the workplace.",
    icon: <HiOutlineDocumentText />,
    details: [
      "Maintain professional behavior at all times.",
      "Follow ethical standards and company values.",
      "Respect colleagues and management.",
      "Avoid conflicts of interest.",
      "Comply with company policies.",
    ],
  },
  {
    id: "leave",
    title: "Leave Policy",
    desc: "Details about vacation, sick leave, and other types of employee leave.",
    icon: <HiOutlineCalendar />,
    details: [
      "Apply leave at least 2 days in advance.",
      "Sick leave requires a medical certificate.",
      "Manager approval is mandatory.",
      "Emergency leave must be informed immediately.",
      "Unused leave handled as per HR policy.",
    ],
  },
  {
    id: "attendance",
    title: "Attendance Policy",
    desc: "Rules regarding punctuality, work hours, and absenteeism.",
    icon: <HiOutlineClock />,
    details: [
      "Office hours: 9:30 AM – 6:30 PM.",
      "Biometric attendance is mandatory.",
      "Late coming more than 3 times is not allowed.",
      "No unapproved absenteeism.",
      "WFH attendance must be logged.",
    ],
  },
  {
    id: "data",
    title: "Data Protection Policy",
    desc: "Measures to protect employee and company data privacy.",
    icon: <HiOutlineShieldCheck />,
    details: [
      "Do not share confidential information.",
      "Strong passwords are mandatory.",
      "No unauthorized USB devices.",
      "Report breaches immediately.",
      "Follow cybersecurity guidelines.",
    ],
  },
  {
    id: "it",
    title: "IT Usage Policy",
    desc: "Guidelines on the acceptable use of company IT resources and equipment.",
    icon: <HiOutlineDesktopComputer />,
    details: [
      "Official system usage only.",
      "No unauthorized software installation.",
      "Internet usage is monitored.",
      "No access to restricted websites.",
      "System security is mandatory.",
    ],
  },
  {
    id: "wfh",
    title: "Work From Home (WFH) Policy",
    desc: "Guidelines for remote working and productivity.",
    icon: <HiOutlineHome />,
    details: [
      "Employees must obtain prior approval from their reporting manager for WFH.",
      "Daily attendance and task updates must be recorded in the company system.",
      "Employees should be available online during standard working hours.",
      "Company data security rules must be followed while working remotely.",
      "Misuse of WFH privileges may lead to disciplinary action.",
    ],
  },
  {
    id: "exit",
    title: "Exit & Separation Policy",
    desc: "Rules governing resignation, notice period, and handover process.",
    icon: <HiOutlineLogout />,
    details: [
      "Employees must submit a formal resignation email to HR and reporting manager.",
      "A minimum notice period of 30 days must be served unless waived by management.",
      "All company assets must be returned before the last working day.",
      "Proper handover of responsibilities is mandatory.",
      "Final settlement will be processed after clearance from all departments.",
    ],
  },
];
 
export default function EmployeePoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [search, setSearch] = useState("");
 
  const filteredPolicies = policies.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );
 
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
              {filteredPolicies.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPolicy(item)}
                  className="group cursor-pointer flex items-center justify-between p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl text-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {item.desc}
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
              onClick={() => setSelectedPolicy(null)}
              className="flex items-center gap-2 text-sm text-blue-600 mb-5 hover:underline"
            >
              <FiArrowLeft /> Back to Policies
            </button>
 
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-4 p-5 border-b bg-slate-50">
                <div className="p-3 rounded-xl text-xl bg-blue-100 text-blue-600">
                  {selectedPolicy.icon}
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                    {selectedPolicy.title}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {selectedPolicy.desc}
                  </p>
                </div>
              </div>
 
              <div className="p-5 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-4">
                  Policy Guidelines
                </h2>
 
                <div className="grid gap-3">
                  {selectedPolicy.details.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                    >
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
      </div>
    </div>
  );
}