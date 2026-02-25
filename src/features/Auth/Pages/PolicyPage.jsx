import React from 'react';
 
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header Card */}
        <div className="bg-blue-900 rounded-lg text-white text-center py-10 mb-10">
          <h1 className="text-4xl font-bold tracking-wide">Privacy Policy</h1>
          <p className="mt-2 text-lg opacity-80">
            Effective Date: March 10, 2026
          </p>
        </div>
 
        <Intro />
 
        <Section title="1. Information We Collect">
          <p>
            We collect basic information such as name, email address, phone
            number, company name, and business details during registration. OTP
            verification is used to confirm user identity.
          </p>
 
          <List
            items={[
              'Employee personal details (name, ID, designation, department)',
              'Admin and staff login information',
              'Attendance records, shifts, and leave data',
              'Payroll and salary information',
              'Performance reviews and feedback',
              'Uploaded documents (contracts, offer letters, ID proofs)',
              'Company HR policies and organizational records',
              'Device and usage data (IP address, browser, login logs)',
            ]}
          />
        </Section>
 
        <Section title="2. How We Use Your Information">
          <List
            items={[
              'Manage employee profiles and HR operations',
              'Process attendance, payroll, and leave management',
              'Generate HR reports and analytics',
              'Improve platform performance and user experience',
              'Send notifications, alerts, and system updates',
              'Provide customer support',
              'Prevent fraud and ensure system security',
              'Comply with legal and regulatory requirements',
            ]}
          />
        </Section>
 
        <Section title="3. Data Protection & Security">
          We use industry-standard safeguards including encrypted storage,
          secure servers, role-based access controls, and continuous monitoring.
          While we take reasonable steps to protect your information, no system
          is completely secure. Users are responsible for maintaining the
          confidentiality of their login credentials.
        </Section>
 
        <Section title="4. Cookies & Tracking">
          Our website and applications may use cookies and analytics tools to
          improve performance, monitor usage, and enhance user experience. You
          may disable cookies through your browser settings.
        </Section>
 
        <Section title="5. Third-Party Services">
          We do not sell your data. Limited information may be shared with
          trusted service providers such as cloud hosting, email services,
          analytics tools, or payroll partners strictly to operate RITS HR
          Connect. All partners follow strict confidentiality standards.
        </Section>
 
        <Section title="6. Your Rights">
          You have the right to access, update, correct, delete, or request
          copies of your stored data. You may also withdraw consent or raise
          concerns regarding data handling by contacting us.
        </Section>
 
        <Section title="7. Data Retention">
          We retain your information only as long as required for operational or
          legal purposes. Once no longer needed, data is securely deleted.
        </Section>
 
        <Section title="8. Policy Updates">
          We may update this Privacy Policy periodically to reflect changes in
          practices or legal requirements. Updates will be posted on this page
          with a revised effective date.
        </Section>
 
        <Section title="9. Children’s Privacy">
          RITS HR Connect does not knowingly collect personal information from
          individuals under the age of 18. If we become aware that such data has
          been collected unintentionally, we will take immediate steps to delete
          it. Parents or guardians may contact us if they believe their child’s
          information has been shared with us.
        </Section>
 
        <Section title="10. Contact Us">
          <p>Email: support@revappayyaitservices.com</p>
          <p>Company: Revappayya IT Services pvt Ltd.</p>
        </Section>
      </div>
    </div>
  );
};
 
/* Components */
 
const Intro = () => (
  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
    RITS HR Connect is committed to protecting your privacy. This Privacy Policy
    explains how we collect, use, share, and safeguard your information when
    using our HR management platform, ensuring transparency in how your data is
    handled.
  </p>
);
 
const Section = ({ title, children }) => (
  <div className="mb-7 border-l-4 border-blue-600 pl-4">
    <h2 className="text-2xl font-semibold text-slate-800 mb-2">{title}</h2>
    <div className="text-gray-700 text-lg leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);
 
const List = ({ items }) => (
  <ul className="list-disc ml-6 space-y-1 text-lg">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);
 
export default PrivacyPolicy;
 