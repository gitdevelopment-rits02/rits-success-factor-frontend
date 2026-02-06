import React from 'react';
import { 
  BsBullseye, 
  BsEye, 
  BsRocketTakeoff, 
  BsCheckCircleFill, 
  BsLinkedin, 
  BsTwitter 
} from 'react-icons/bs';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      
      {/* --- Navigation --- */}
      <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl">R</div>
          <span className="text-blue-900 font-extrabold text-xl hidden sm:inline">RitsHRConnect</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="text-blue-600">About Us</a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">Get Started</button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="max-w-7xl mx-auto px-6 py-20 lg:flex items-center gap-16">
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-black text-slate-900 leading-[1.1] mb-6">
            Empowering Workplaces, <br />
            <span className="text-blue-600">Simplifying HR Operations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 font-medium">
            Innovative HR Solutions Designed to Transform How You Manage Your Workforce.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Learn more about our mission, vision, values, and our journey to becoming a trusted HR technology partner.
          </p>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="bg-blue-100/50 rounded-[2.5rem] p-12 aspect-video flex items-center justify-center border-2 border-dashed border-blue-200">
             <div className="relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full animate-ping absolute opacity-20"></div>
                <BsRocketTakeoff className="text-blue-600 text-8xl relative z-10" />
             </div>
          </div>
        </div>
      </header>

      {/* --- Stats Counter --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 py-10">
          <StatItem label="Years of Experience" value="8+" />
          <StatItem label="Organizations Served" value="10,000+" />
          <StatItem label="Employees Managed" value="1M+" />
        </div>
      </section>

      {/* --- Mission, Vision, Journey --- */}
      <main className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20">
        <div className="space-y-16">
          <SectionContent 
            icon={<BsBullseye className="text-3xl" />} 
            title="Our Mission"
            text="At RitsHRConnect, our mission is to empower businesses of all sizes to streamline their HR processes, enhance employee experiences, and drive organizational success."
          />
          <SectionContent 
            icon={<BsEye className="text-3xl" />} 
            title="Our Vision"
            text="Our vision is to be the leading HR technology provider recognized for transforming how organizations manage their human resources through innovation and empathy."
          />
        </div>

        {/* Journey Card */}
        <div className="bg-blue-900 rounded-[2rem] p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
          <h3 className="text-3xl font-bold mb-6">Our Journey</h3>
          <p className="text-blue-100 leading-relaxed mb-8">
            Founded in 2016, RitsHRConnect was established with the goal of revolutionizing HR management. From a small team to a global leader, we have evolved into a trusted partner for thousands.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3"><BsCheckCircleFill className="text-blue-400" /> 2016: Project Inception</li>
            <li className="flex items-center gap-3"><BsCheckCircleFill className="text-blue-400" /> 2019: 1,000 Clients Reached</li>
            <li className="flex items-center gap-3"><BsCheckCircleFill className="text-blue-400" /> 2024: Global Expansion</li>
          </ul>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          <div>
            <div className="text-white font-bold text-xl mb-4 flex items-center gap-2">
               <div className="bg-blue-600 px-2 py-1 rounded">R</div> RitsHRConnect
            </div>
            <p className="text-sm">Simplifying HR for the modern world.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex gap-4 text-xl">
              <BsLinkedin className="hover:text-white cursor-pointer" />
              <BsTwitter className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components for cleaner structure
const StatItem = ({ label, value }) => (
  <div className="text-center p-6">
    <h2 className="text-4xl font-black text-blue-900 mb-1">{value}</h2>
    <p className="text-gray-500 font-medium text-sm">{label}</p>
  </div>
);

const SectionContent = ({ icon, title, text }) => (
  <div className="flex gap-6">
    <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl h-fit">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  </div>
);

export default AboutPage;