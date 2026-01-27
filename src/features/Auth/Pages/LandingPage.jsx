import React from 'react'
import background from "../../../assets/background.png";
console.log(background);
 
export default function App() {
  return (
    <div className="font-sans text-slate-800">
 
      {/* HERO */}
      {/* <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
             One System for Every HR Task.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Automate HR operations, reduce workload, and ensure compliance — all in one place.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                Request Demo
              </button>
              <button className="border border-slate-300 px-6 py-3 rounded-lg">
                View Features
              </button>
            </div>
          </div>
 
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="h-64 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
              Dashboard Preview
            </div>
          </div>
        </div>
      </section> */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* overlay */}
        {/* <div className="absolute inset-0 bg-white/70"></div> */}
 
        {/* content */}
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              One System for Every HR Task.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Automate HR operations, reduce workload, and ensure compliance — all in one place.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                Request Demo
              </button>
              <button className="border border-slate-300 px-6 py-3 rounded-lg">
                View Features
              </button>
            </div>
          </div>
 
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="h-64 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
              Dashboard Preview
            </div>
          </div>
        </div>
      </section>
 
 
      {/* STATS */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <Stat value="5,000+" label="Companies use HRMS Pro" />
          <Stat value="15 Min" label="Payroll Processing Time" />
          <Stat value="3x" label="Less HR Workload" />
        </div>
      </section>
 
      {/* FEATURES */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful HR Tools in One Platform
          </h2>
 
          <div className="grid md:grid-cols-3 gap-8">
            <Feature title="Employee Management" />
            <Feature title="Attendance & Leave" />
            <Feature title="Payroll" />
            <Feature title="Hiring & Onboarding" />
            <Feature title="Performance & Reviews" />
            <Feature title="Role-Based Access Control" />
          </div>
        </div>
      </section>
 
      {/* ROLES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Built for Every Role in Your Organization
          </h2>
 
          <div className="flex flex-wrap justify-center gap-4">
            {["Super Admin", "Admin", "HR", "Manager", "Employee"].map((role) => (
              <span
                key={role}
                className="px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>
 
      {/* HOW IT WORKS */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
              App Preview
            </div>
          </div>
 
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Go Live in <span className="text-blue-600">Minutes</span>
            </h2>
            <ul className="space-y-4">
              <Step text="Set up your organization" />
              <Step text="Add employees & roles" />
              <Step text="Automate HR operations" />
            </ul>
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Started with HRMS Pro Today
          </h2>
          <p className="mb-8 text-blue-100">
            Automate HR processes and focus on growing your business.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium">
              Request Demo
            </button>
            <button className="border border-white px-6 py-3 rounded-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
 
    </div>
  );
}
 
/* ---------------- SMALL COMPONENTS ---------------- */
 
function Stat({ value, label }) {
  return (
    <div className="p-6 rounded-xl bg-slate-50">
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="mt-2 text-slate-600">{label}</p>
    </div>
  );
}
 
function Feature({ title }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="h-12 w-12 bg-blue-100 rounded-full mb-4" />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-slate-600 mt-2">
        Everything you need to manage this efficiently.
      </p>
    </div>
  );
}
 
function Step({ text }) {
  return (
    <li className="flex items-center gap-3">
      <span className="h-6 w-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
        ✓
      </span>
      {text}
    </li>
  );
}
 