import { useState } from "react";
import {
  FaHeartbeat,
  FaTooth,
  FaEye,
  FaUsers,
  FaArrowLeft,
  FaPhoneAlt,
  FaFileAlt,
} from "react-icons/fa";
import jsPDF from "jspdf";
 
/* ================= HELPERS ================= */
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
 
const getPolicyStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
 
  if (today >= start && today <= end)
    return { status: "ACTIVE", reason: "Policy is currently active" };
  if (today > end)
    return { status: "INACTIVE", reason: "Policy expired" };
  return { status: "INACTIVE", reason: "Policy not yet activated" };
};
 
export default function Insurance() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
 
  /* ================= EMPLOYEE ================= */
  const employee = {
    name: "Rahul Sharma",
    role: "Senior Developer – Engineering",
    avatar: "https://i.pravatar.cc/150?img=12",
  };
 
  /* ================= INSURANCE POLICIES ================= */
  const policies = [
    {
      id: 1,
      type: "Health",
      title: "Health Insurance",
      provider: "Care Health Platinum",
      policyNo: "HLT-882194",
      coverage: "₹10,00,000",
      premium: "₹18,000 / year",
      icon: <FaHeartbeat />,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      info: {
        roomRent: "No Limit",
        cashlessHospitals: "10,000+",
        maternity: "Included",
        preExisting: "Covered after 1 year",
        ambulance: "₹3,000",
        healthCheckup: "Free annually",
      },
    },
    {
      id: 2,
      type: "Dental",
      title: "Dental Insurance",
      provider: "Apollo Dental Care",
      policyNo: "DNT-774521",
      coverage: "₹1,00,000",
      premium: "₹3,000 / year",
      icon: <FaTooth />,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      info: {
        cleaning: "Covered",
        rootCanal: "Covered",
        braces: "Partial",
        emergency: "Included",
        claimType: "Cashless",
      },
    },
    {
      id: 3,
      type: "Vision",
      title: "Vision Insurance",
      provider: "Lenskart Elite Care",
      policyNo: "VSN-112045",
      coverage: "₹25,000",
      premium: "₹1,200 / year",
      icon: <FaEye />,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      info: {
        eyeCheckup: "Free",
        frames: "Covered",
        lenses: "Covered",
        contacts: "Included",
        laser: "Not Covered",
      },
    },
    {
      id: 4,
      type: "Life",
      title: "Life Insurance",
      provider: "Max Life Protection",
      policyNo: "LIF-902241",
      coverage: "₹5,00,000",
      premium: "Paid by Employer",
      icon: <FaUsers />,
      startDate: "2025-01-01",
      endDate: "2045-01-01",
      info: {
        policyType: "Term Life",
        tenure: "20 Years",
        accidentalDeath: "Included",
        disabilityCover: "Included",
        nomineeRequired: "Yes",
      },
    },
  ];
 
  /* ================= CLAIMS ================= */
  const claims = [
    {
      title: "Dental Cleaning",
      date: "Dec 12, 2024 · Apollo Dental",
      amount: "₹1,500",
      status: "APPROVED",
    },
    {
      title: "Vision Consultation",
      date: "Nov 28, 2024 · Lenskart",
      amount: "₹800",
      status: "PROCESSING",
    },
  ];
 
  /* ================= PDF ================= */
  const downloadPolicyPDF = (policy) => {
  const doc = new jsPDF("p", "mm", "a4");
 
  /* HEADER */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("EMPLOYEE INSURANCE POLICY", 105, 20, { align: "center" });
 
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Company: RITS Technologies Pvt. Ltd.", 15, 30);
  doc.text(`Generated On: ${formatDate(new Date())}`, 150, 30);
 
  doc.line(15, 34, 195, 34);
 
  /* POLICY INFO */
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(policy.title, 15, 45);
 
  doc.rect(15, 50, 180, 45);
 
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
 
  doc.text(`Provider`, 20, 62);
  doc.text(`: ${policy.provider}`, 70, 62);
 
  doc.text(`Policy Number`, 20, 70);
  doc.text(`: ${policy.policyNo}`, 70, 70);
 
  doc.text(`Coverage`, 20, 78);
  doc.text(`: ${policy.coverage}`, 70, 78);
 
  doc.text(`Premium`, 20, 86);
  doc.text(`: ${policy.premium}`, 70, 86);
 
  doc.text(`Policy Period`, 20, 94);
  doc.text(
    `: ${formatDate(policy.startDate)} to ${formatDate(policy.endDate)}`,
    70,
    94
  );
 
  /* COVERAGE TABLE */
  doc.setFont("helvetica", "bold");
  doc.text("Coverage Details", 15, 115);
 
  doc.rect(15, 120, 180, 70);
  doc.line(110, 120, 110, 190);
 
  doc.text("Benefit", 25, 130);
  doc.text("Details", 130, 130);
 
  doc.line(15, 134, 195, 134);
 
  doc.setFont("helvetica", "normal");
 
  let y = 145;
  Object.entries(policy.info).forEach(([key, value]) => {
    doc.text(key.replace(/([A-Z])/g, " $1"), 20, y);
    doc.text(String(value), 115, y);
    y += 8;
  });
 
  /* FOOTER */
  doc.line(15, 265, 195, 265);
  doc.setFontSize(9);
  doc.text(
    "This is a system-generated document. No signature required.",
    15,
    272
  );
 
  doc.save(`${policy.title.replace(/\s+/g, "_")}_Policy.pdf`);
};
 
 
  /* ================= DETAILS PAGE ================= */
  if (selectedPolicy) {
    const statusInfo = getPolicyStatus(
      selectedPolicy.startDate,
      selectedPolicy.endDate
    );
 
    return (
      <div className="min-h-screen w-ful bg-blue-100 p-6"
      style={{ backgroundImage: "url('/Page/image.png')" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => setSelectedPolicy(null)}
            />
            <h2 className="text-2xl font-bold">Policy Details</h2>
          </div>
 
          <div className="bg-white rounded-2xl p-6 shadow-lg text-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                {selectedPolicy.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {selectedPolicy.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {selectedPolicy.provider}
                </p>
              </div>
            </div>
 
            <div className="space-y-3 text-xl">
              <InfoRow label="Policy Number" value={selectedPolicy.policyNo} />
              <InfoRow label="Coverage" value={selectedPolicy.coverage} />
              <InfoRow label="Premium" value={selectedPolicy.premium} />
              <InfoRow label="Active From" value={formatDate(selectedPolicy.startDate)} />
              <InfoRow
                label={
                  statusInfo.status === "ACTIVE"
                    ? "Expires On"
                    : "Expired On"
                }
                value={formatDate(selectedPolicy.endDate)}
              />
              <InfoRow
                label="Status"
                value={statusInfo.status}
                color={
                  statusInfo.status === "ACTIVE"
                    ? "text-green-600"
                    : "text-red-500"
                }
              />
 
              {statusInfo.status === "INACTIVE" && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                  Reason: {statusInfo.reason}
                </div>
              )}
 
              <div className="pt-4">
                <h4 className="font-bold mb-2">Coverage Details</h4>
                {Object.entries(selectedPolicy.info).map(([k, v]) => (
                  <p key={k} className="text-slate-700">
                    • {k.replace(/([A-Z])/g, " $1")}: {v}
                  </p>
                ))}
              </div>
            </div>
 
            <button
              onClick={() => downloadPolicyPDF(selectedPolicy)}
              className="mt-6 w-96 h-12 ml-96 bg-blue-600 text-white  rounded-xl"
            >
              Download Policy
            </button>
          </div>
        </div>
      </div>
    );
  }
 
  /* ================= MAIN DASHBOARD ================= */
  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-9xl mx-auto ">
        {/* EMPLOYEE */}
        <div className="bg-white rounded-2xl p-6 shadow-lg flex gap-4">
          <img src={employee.avatar} className="w-14 h-14 rounded-full" />
          <div>
            <h2 className="font-extrabold">{employee.name}</h2>
            <p className="text-sm text-slate-500">{employee.role}</p>
          </div>
        </div>
 
        {/* POLICIES */}
        <div className="grid md:grid-cols-4 gap-6 mt-6 shadow-lg">
          {policies.map((p) => {
            const statusInfo = getPolicyStatus(p.startDate, p.endDate);
            return (
              <div key={p.id} className="bg-white rounded-2xl p-5 shadow-lg">
                <div className="flex justify-between">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      statusInfo.status === "ACTIVE"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {statusInfo.status}
                  </span>
                </div>
 
                <h4 className="mt-4 font-semibold">{p.title}</h4>
                <p className="text-sm text-slate-500">{p.provider}</p>
 
                <p className="text-sm mt-2">
                  Active: {formatDate(p.startDate)}
                </p>
                <p className="text-sm text-red-400 ">
                  {statusInfo.status === "ACTIVE"
                    ? "Expires:"
                    : "Expired:"}{" "}
                  {formatDate(p.endDate)}
                </p>
 
                {statusInfo.status === "INACTIVE" && (
                  <p className="text-xs text-red-400 mt-1">
                    {statusInfo.reason}
                  </p>
                )}
 
                <button
                  onClick={() => setSelectedPolicy(p)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                  View Full Details →
                </button>
              </div>
            );
          })}
        </div>
 
        {/* CLAIMS & ASSISTANCE */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 shadow-lg">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <h4 className="font-bold mb-4">Recent Claims</h4>
            {claims.map((c, i) => (
              <div key={i} className="flex justify-between py-3 border-b">
                <div className="flex gap-3">
                  <FaFileAlt className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-slate-500">{c.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{c.amount}</p>
                  <p
                    className={`text-xs ${
                      c.status === "APPROVED"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {c.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
 
          <div className="bg-blue-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold">Need Assistance?</h4>
            <p className="text-sm text-blue-100 mt-1">
              HR support available 24/7 for insurance & claims
            </p>
            <button className="mt-6 bg-white text-blue-600 w-full py-2 rounded-lg flex justify-center gap-2">
              <FaPhoneAlt /> Call HR Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
/* ================= SMALL COMPONENT ================= */
const InfoRow = ({ label, value, color = "" }) => (
  <div className="flex justify-between">
    <span className="font-bold">{label}</span>
    <span className={color}>{value}</span>
  </div>
);
 
 
 