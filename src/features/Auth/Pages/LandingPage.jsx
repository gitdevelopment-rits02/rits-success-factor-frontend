// import React from 'react'
// import background from "../../../assets/background.png";
// import mockup from "../../../assets/Mockup.png";

// export default function App() {
//   return (
//     <div className="font-sans text-slate-800">

//       {/* HERO */}
//       {/* <section className="bg-gradient-to-br from-blue-50 to-white py-20">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
//              One System for Every HR Task.
//             </h1>
//             <p className="mt-6 text-lg text-slate-600">
//               Automate HR operations, reduce workload, and ensure compliance — all in one place.
//             </p>
//             <div className="mt-8 flex gap-4">
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
//                 Request Demo
//               </button>
//               <button className="border border-slate-300 px-6 py-3 rounded-lg">
//                 View Features
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-xl p-6">
//             <div className="h-64 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
//               Dashboard Preview
//             </div>
//           </div>
//         </div>
//       </section> */}
//       <section
//         className="relative py-20 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${background})` }}
//       >
//         {/* overlay */}
//         {/* <div className="absolute inset-0 bg-white/70"></div> */}

//         {/* content */}
//         <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-[40%_60%] gap-12 items-center">
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
//               One System for Every HR Task.
//             </h1>
//             <p className="mt-6 text-lg text-slate-600">
//               Automate HR operations, reduce workload, and ensure compliance — all in one place.
//             </p>
//             <div className="mt-8 flex gap-4">
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
//                 Request Demo
//               </button>
//               <button className="border border-slate-300 px-6 py-3 rounded-lg">
//                 View Features
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//               <img
//                 src={mockup}
//                 alt="HRMS Dashboard Preview"
//                 className="

//                   w-full
//                  max-w-4xl
//                  drop-shadow-2xl
//                  rounded-xl
//                 "
//               />
//             </div>

//         </div>
//       </section>


//       {/* STATS */}
//       <section className="py-12 bg-white">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
//           <Stat value="5,000+" label="Companies use HRMS Pro" />
//           <Stat value="15 Min" label="Payroll Processing Time" />
//           <Stat value="3x" label="Less HR Workload" />
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-20 bg-gradient-to-b from-white to-blue-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Powerful HR Tools in One Platform
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             <Feature title="Employee Management" />
//             <Feature title="Attendance & Leave" />
//             <Feature title="Payroll" />
//             <Feature title="Hiring & Onboarding" />
//             <Feature title="Performance & Reviews" />
//             <Feature title="Role-Based Access Control" />
//           </div>
//         </div>
//       </section>

//       {/* ROLES */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-10">
//             Built for Every Role in Your Organization
//           </h2>

//           <div className="flex flex-wrap justify-center gap-4">
//             {["Super Admin", "Admin", "HR", "Manager", "Employee"].map((role) => (
//               <span
//                 key={role}
//                 className="px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-medium"
//               >
//                 {role}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="py-20 bg-blue-50">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[45%_55%] gap-12 items-center">
//           <div className="bg-white rounded-xl p-6 shadow">
//             <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
//               App Preview
//             </div>
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold mb-6">
//               Go Live in <span className="text-blue-600">Minutes</span>
//             </h2>
//             <ul className="space-y-4">
//               <Step text="Set up your organization" />
//               <Step text="Add employees & roles" />
//               <Step text="Automate HR operations" />
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Get Started with HRMS Pro Today
//           </h2>
//           <p className="mb-8 text-blue-100">
//             Automate HR processes and focus on growing your business.
//           </p>
//           <div className="flex justify-center gap-4">
//             <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium">
//               Request Demo
//             </button>
//             <button className="border border-white px-6 py-3 rounded-lg">
//               Start Free Trial
//             </button>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

// /* ---------------- SMALL COMPONENTS ---------------- */

// function Stat({ value, label }) {
//   return (
//     <div className="p-6 rounded-xl bg-slate-50">
//       <p className="text-3xl font-bold text-blue-600">{value}</p>
//       <p className="mt-2 text-slate-600">{label}</p>
//     </div>
//   );
// }

// function Feature({ title }) {
//   return (
//     <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
//       <div className="h-12 w-12 bg-blue-100 rounded-full mb-4" />
//       <h3 className="font-semibold text-lg">{title}</h3>
//       <p className="text-slate-600 mt-2">
//         Everything you need to manage this efficiently.
//       </p>
//     </div>
//   );
// }

// function Step({ text }) {
//   return (
//     <li className="flex items-center gap-3">
//       <span className="h-6 w-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
//         ✓
//       </span>
//       {text}
//     </li>
//   );
// }


import React, { useState } from 'react';
import {
  FiUser, FiCalendar, FiDollarSign, FiUserPlus,
  FiBarChart2, FiShield, FiCheckCircle, FiUsers, FiSettings
} from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { Link } from 'react-router-dom';
// Use your specific asset paths here
import background from "../../../assets/background.png";
import mockup from "../../../assets/Mockup.png";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
// import logoRits from "../../../assets/logo.png"; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const [activeRole, setActiveRole] = useState('Super Admin');

  const roles = [
    { id: 'superadmin', label: 'Super Admin', icon: <FiShield />, desc: 'Global control over all branches and system-wide security settings.' },
    { id: 'admin', label: 'Admin', icon: <FiSettings />, desc: 'Manage department-specific configurations and localized policies.' },
    { id: 'hr', label: 'HR', icon: <FiUserPlus />, desc: 'Efficiently handle recruitment, payroll processing, and employee records.' },
    { id: 'manager', label: 'Manager', icon: <LuLayoutDashboard />, desc: 'Monitor team attendance, performance reviews, and approval requests.' },
    { id: 'employee', label: 'Employee', icon: <FiUser />, desc: 'Self-service portal for payslips, leave applications, and attendance.' },
  ];

  const features = [
    { title: "Employee Management", icon: <FiUsers />, desc: "Centralize all your employee data in one place." },
    { title: "Attendance & Leave", icon: <FiCalendar />, desc: "Track hours, absences, and approvals easily." },
    { title: "Payroll", icon: <FiDollarSign />, desc: "Run accurate, on-time payroll automatically." },
    { title: "Hiring & Onboarding", icon: <FiUserPlus />, desc: "Streamline recruitment and onboarding processes." },
    { title: "Performance & Reviews", icon: <FiBarChart2 />, desc: "Evaluate, track and improve employee performance." },
    { title: "Role-Based Access", icon: <FiShield />, desc: "Grant specific permissions to admins and managers." },
  ];
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#163cc8] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              {/* Simplified version of the 'R' logo from your image */}
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#333]">
                Rits<span className="text-[#163cc8]">HRConnect</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold -mt-1">
                Enterprise Solution
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <Link
              to="/register"
              className="bg-blue-50 hover:bg-blue-200 text-blue-500 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center justify-center"
            >
              Get Started
            </Link>

            <div className="h-6 w-[1px] bg-slate-200"></div>
          </div>
        </div>
      </nav>
      {/* --- HERO SECTION (Split Layout) --- */}
      <section
        className="relative pt-12 lg:pt-24 pb-16 px-6 lg:px-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-extrabold leading-[1.15] mb-6">
              One HRMS to manage employees, payroll, <span className="text-blue-600">without chaos.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Automate HR operations with ease, reduce workload, and ensure compliance — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all">
                Request Demo
              </button>
              <button className="bg-white border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold transition-all">
                View Features
              </button>
            </div>
          </div>

          {/* Right Side: Mockup (Top on mobile if you prefer, currently stacks below text) */}
          {/* Changing lg:w-1/2 to lg:w-[60%] makes the image container larger */}
          <div className="w-full lg:w-[70%] relative lg:-mr-20">
            <img
              src={mockup}
              className="relative z-10 w-full h-auto drop-shadow-2xl scale-110 lg:scale-125 transition-transform"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-0 bg-white shadow-xl rounded-2xl border border-slate-100 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          <div className="p-8 text-center flex flex-col items-center">
            <FiUsers className="text-blue-600 text-3xl mb-2" />
            <span className="text-3xl font-bold">5,000+</span>
            <p className="text-slate-500 text-sm">Companies use HRMS Pro</p>
          </div>
          <div className="p-8 text-center flex flex-col items-center">
            <FiCalendar className="text-blue-600 text-3xl mb-2" />
            <span className="text-3xl font-bold">15 Min</span>
            <p className="text-slate-500 text-sm">Payroll Processing Time</p>
          </div>
          <div className="p-8 text-center flex flex-col items-center">
            <FiBarChart2 className="text-blue-600 text-3xl mb-2" />
            <span className="text-3xl font-bold">3x</span>
            <p className="text-slate-500 text-sm">Less HR Workload</p>
          </div>
        </div>
      </section>

      {/* --- TOOLS SECTION --- */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-16">Powerful HR Tools in One Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ROLE TOGGLE SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12">Built for Every Role in Your Organization</h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 bg-slate-100 p-2 rounded-2xl w-fit mx-auto">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.label)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${activeRole === role.label
                  ? 'bg-white text-blue-600 shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {role.icon} {role.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
            <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-widest text-xs mb-4 uppercase">For {activeRole}s</span>
              <h2 className="text-4xl font-extrabold mb-6">Go Live in <span className="text-blue-600">Minutes</span></h2>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <FiCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Personalized Dashboard</h4>
                    <p className="text-slate-500">{roles.find(r => r.label === activeRole)?.desc}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <FiCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Seamless Automation</h4>
                    <p className="text-slate-500">Eliminate manual data entry and focus on what matters most.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-1/2 bg-slate-50 p-8 lg:p-12 flex items-center justify-center">
              {/* Image will transition or swap based on the role selected */}
              <div className="relative group overflow-hidden rounded-xl shadow-lg border-4 border-white">
                <img
                  key={activeRole} // Re-renders for simple animation effect
                  src={mockup}
                  alt={activeRole}
                  className="w-full h-auto animate-in fade-in zoom-in duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      {/* --- CTA FOOTER (Updated to match screenshot) --- */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#f8faff] to-[#eef2ff] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden border border-blue-50 shadow-sm">

          {/* Decorative Floating Icons (Top Left & Bottom Right) */}
          <div className="absolute top-12 left-12 text-blue-100 text-4xl opacity-50">
            <FiUsers />
          </div>
          <div className="absolute bottom-12 right-12 text-blue-100 text-4xl opacity-50">
            <FiBarChart2 />
          </div>

          {/* Trusted Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-wider">
              Trusted by 5,000+ Teams
            </span>
          </div>

          {/* Main Content */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
            Get Started with <span className="text-blue-600">HRMS Pro</span> Today
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your HR operations? Streamline hiring, payroll, and employee management in one central workspace.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
              Request Demo <span className="text-xl">→</span>
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-10 py-4 rounded-2xl font-bold transition-all shadow-sm">
              Start Free Trial
            </button>
          </div>

          {/* Trust/Compliance Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 font-medium text-sm border-t border-slate-200/60 pt-10">
            <div className="flex items-center gap-2">
              <FiShield className="text-slate-300" /> ISO Certified
            </div>
            <div className="flex items-center gap-2">
              <FiShield className="text-slate-300" /> GDPR Compliant
            </div>
            <div className="flex items-center gap-2">
              <FiUser className="text-slate-300" /> 24/7 Support
            </div>
          </div>
        </div>
        
      </section>
      <footer className="py-6 lg:py-8 bg-gray-900 text-gray-400 relative overflow-hidden">
        {/* Background Pattern / Shape (7) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(255,120,40,0.4),transparent_70%)]"></div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-blue-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Updated Grid: 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 tablet-lg:grid-cols-3 lg:grid-cols-4 foldable:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-4">
            {/* COLUMN 1 — Logo + Description */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">
                    {/* <img
                      // src={logoRits}
                      alt="Rits Logo"
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl shadow-lg object-cover"
                    /> */}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-white text-lg">
                    RitsHrConnect
                  </span>
                  <p className="text-xs text-gray-500"></p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed font-light">
                The intelligent HR ecosystem designed to simplify complex operations and build better workplaces for teams across India.
              </p>

              {/* Address Section */}
              <p className="text-gray-400 text-sm leading-relaxed font-light mt-2">
                <span className="font-semibold text-gray-300">HO: </span>
                Shree Shaila Nilaya, 13th Cross, 22nd Main Road, Virat Nagar,
                Bommanahalli, Bangalore, 560068, India
              </p>

              <p className="text-gray-400 text-sm leading-relaxed font-light mt-2">
                <span className="font-semibold text-gray-300">RO: </span>
                Unit No-2201A, 22nd Floor, WTC Bangalore, Brigade Gateway,
                Bangalore – 560055
              </p>
            </div>

            {/* COLUMN 2 — Platform Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 lg:mb-6 text-base lg:text-lg">
                Platform
              </h4>

              <ul className="space-y-3">
                {["Features", "About"].map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() =>
                        navigate(
                          link === "Features" ? "/#features" : "/aboutus",
                        )
                      }
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-light block"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 — Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 lg:mb-6 text-base lg:text-lg">
                Company
              </h4>

              <ul className="space-y-3">
                {["Privacy", "Contact"].map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() =>
                        navigate(
                          link === "Privacy" ? "/privacypolicy" : "/contactus",
                        )
                      }
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-light block"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4 — Contact Info + Social Icons */}
            <div>
              <h4 className="text-white font-semibold mb-4 lg:mb-6 text-base lg:text-lg">
                Contact
              </h4>

              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  Email:{" "}
                  <span className="text-gray-400">
                    support@revappayyaitservices.com
                  </span>
                </p>
                <p>
                  Location: <span className="text-gray-400">Bangalore</span>
                </p>
                <p>
                  Contact: <span className="text-gray-400">+91 7259102861</span>
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 mt-5 text-gray-400">
                {[
                  {
                    name: "Facebook",
                    href: "#",
                    icon: <FaFacebookF className="w-6 h-6" />,
                  },
                  {
                    name: "LinkedIn",
                    href: "#",
                    icon: <FaLinkedinIn className="w-6 h-6" />,
                  },
                  {
                    name: "YouTube",
                    href: "#",
                    icon: <FaYoutube className="w-6 h-6" />,
                  },
                  {
                    name: "Instagram",
                    href: "#",
                    icon: <FaInstagram className="w-6 h-6" />,
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Tagline (6) */}
          <p className="text-center text-gray-400 text-sm mb-6 italic">
            {/* Empowering restaurants with enterprise-grade intelligence. */}
          </p>

          {/* Bottom Section */}
          <div className="pt-3 lg:pt-5 border-t border-gray-800 flex flex-col items-center">
            <div className="text-xs lg:text-sm mt-1 mb-1 font-light text-center">
              © {new Date().getFullYear()} Revappayya IT Services Pvt Ltd. All
              rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

