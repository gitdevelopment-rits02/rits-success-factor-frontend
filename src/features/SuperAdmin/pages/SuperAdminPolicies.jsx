import { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiRepeat,
  FiClock,
  FiBriefcase,
  FiMoreVertical,
} from "react-icons/fi";

export default function LeavePolicies() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showTextarea, setShowTextarea] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const policies = [
    {
      id: 1,
      title: "Leave Types & Categories",
      icon: FiCalendar,
      overview:
        "Defines different types of leave such as casual, sick, earned, and unpaid leave available to employees.",
      rules: [
        "Each leave type has an annual quota",
        "Unused casual leave expires at year end",
        "Sick leave beyond two days requires medical proof",
      ],
      applicability: "Applicable to all full-time employees.",
      notes:
        "HR can customize leave visibility and naming per department.",
    },
    {
      id: 2,
      title: "Leave Accrual Rules",
      icon: FiCheckCircle,
      overview:
        "Specifies how leave balances accumulate over time based on policy configuration.",
      rules: [
        "Leave accrues monthly",
        "Accrual is prorated for mid-month joiners",
        "Maximum accrual cap is enforced",
      ],
      applicability: "Applies to permanent and contractual employees.",
      notes:
        "Accrual runs automatically via scheduled system jobs.",
    },
    {
      id: 3,
      title: "Carry Forward Rules",
      icon: FiRepeat,
      overview:
        "Controls how unused leave balances are carried forward to the next year.",
      rules: [
        "Only earned leave is eligible",
        "Carry forward limit applies",
        "Excess leave is lapsed automatically",
      ],
      applicability: "Confirmed employees only.",
      notes:
        "Carry forward is executed during year-end rollover.",
    },
    {
      id: 4,
      title: "Attendance Rules",
      icon: FiBriefcase,
      overview:
        "Defines how employee attendance is tracked, validated, and processed.",
      rules: [
        "Minimum daily working hours required",
        "Late arrivals affect attendance score",
        "Missing punches are flagged",
      ],
      applicability: "All employees using attendance tracking.",
      notes:
        "Integrates with biometric and manual attendance systems.",
    },
    {
      id: 5,
      title: "Shifts & Grace Periods",
      icon: FiClock,
      overview:
        "Defines work shifts, grace periods, and late/early entry rules.",
      rules: [
        "Multiple shifts can be configured",
        "Grace period applies once per day",
        "Shift changes require admin approval",
      ],
      applicability: "Shift-based employees.",
      notes:
        "Shift assignments can be automated or manual.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6FAFE] p-8">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold text-slate-900">
        Leave & Carry Forward Policies
      </h1>
      <p className="text-slate-500 mt-1">
        Define and manage policies related to leave and attendance.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* POLICY LIST */}
          <div className="rounded-xl bg-white shadow-sm divide-y">
            {policies.map((p) => (
              <div key={p.id} className="relative">
                <button
                  onClick={() => {
                    setSelectedPolicy(p);
                    setOpenMenu(null);
                  }}
                  className={`w-full text-left flex justify-between items-start px-4 py-4 
                    hover:bg-[#F6FAFE] focus:outline-none
                    ${
                      selectedPolicy?.id === p.id
                        ? "bg-[#F6FAFE]"
                        : ""
                    }
                  `}
                >
                  <div className="flex gap-3">
                    <p.icon className="mt-1 text-blue-500" size={22} />
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Click to view full policy details
                      </p>
                    </div>
                  </div>
                </button>

                {/* 3 DOT MENU */}
                <FiMoreVertical
                  className="absolute right-4 top-6 cursor-pointer text-slate-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === p.id ? null : p.id);
                  }}
                />

                {openMenu === p.id && (
                  <div className="absolute right-4 top-12 w-40 rounded-md border bg-white shadow-md text-sm z-10">
                    <div
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                      onClick={() => {
                        setSelectedPolicy(p);
                        setOpenMenu(null);
                      }}
                    >
                      View details
                    </div>
                    <div className="px-3 py-2 hover:bg-slate-100 cursor-pointer">
                      Edit policy
                    </div>
                    <div className="px-3 py-2 hover:bg-slate-100 cursor-pointer">
                      Duplicate
                    </div>
                    <div className="px-3 py-2 hover:bg-slate-100 text-red-600 cursor-pointer">
                      Archive
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* POLICY DETAILS */}
          {selectedPolicy && (
            <div className="rounded-xl bg-white shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {selectedPolicy.title}
              </h2>

              <div className="mt-4 space-y-4 text-sm text-slate-700">
                <section>
                  <h3 className="font-medium text-slate-900">
                    Overview
                  </h3>
                  <p>{selectedPolicy.overview}</p>
                </section>

                <section>
                  <h3 className="font-medium text-slate-900">Rules</h3>
                  <ul className="list-disc pl-5">
                    {selectedPolicy.rules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-medium text-slate-900">
                    Applicability
                  </h3>
                  <p>{selectedPolicy.applicability}</p>
                </section>

                <section>
                  <h3 className="font-medium text-slate-900">Notes</h3>
                  <p>{selectedPolicy.notes}</p>
                </section>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="rounded-xl bg-white shadow-sm p-5 h-fit">
          <h2 className="text-lg font-semibold text-slate-900">
            Create New Policy
          </h2>

          {!showTextarea ? (
            <button
              onClick={() => setShowTextarea(true)}
              className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
            >
              Start from scratch
            </button>
          ) : (
            <textarea
              rows={8}
              placeholder="Write the full policy description here..."
              className="mt-4 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      </div>
    </div>
  );
}
