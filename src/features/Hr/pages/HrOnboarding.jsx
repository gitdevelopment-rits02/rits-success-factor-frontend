import React, { useState, useEffect, useMemo } from "react";
import {
    LuUsers as Users,
    LuUserPlus as UserPlus,
    LuUserCheck as UserCheck,
    LuSearch as Search,
    LuFilter as Filter,
    LuEllipsisVertical as MoreVertical,
    LuMail as Mail,
    LuPhone as Phone,
    LuBuilding as Building,
    LuChevronRight as ChevronRight,
    LuChevronLeft as ChevronLeft,
    LuLayoutGrid as GridIcon,
    LuList as List,
    LuDownload as Download,
    LuPlus as Plus,
    LuArrowLeft as ArrowLeft,
    LuShieldCheck as ShieldCheck,
    LuMapPin as MapPin,
    LuSquareCheck as CheckSquare,
    LuFileText as FileText,
    LuUpload as Upload,
    LuX as X,
    LuCircleCheck as CheckCircle,
    LuUser as UserIcon,
    LuGraduationCap as GraduationCap,
    LuBriefcase as Briefcase,
    LuLaptop as Laptop,
    LuLayoutTemplate as Layout,
    LuType as TypeIcon,
    LuHistory as History,
    LuPencil as Pencil,
    LuTrash2 as Trash
} from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const HrOnboarding = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formType, setFormType] = useState('employee'); // 'employee' or 'manager'
    const [completed, setCompleted] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [currentStep, setCurrentStep] = useState('account'); // 'account' or 'profile'

    // Dynamic ID helper
    const generateId = () => Math.random().toString(36).substr(2, 9);

    // Initial Form State
    const initialForm = {
        name: "",
        employeeId: "",
        avatar: "",
        headline: "",
        department: "",
        designation: "",
        manager: "",
        joiningDate: "",
        workLocation: "",
        workType: "On-site",
        status: "Active",
        qualifications: [{ id: generateId(), degree: "", institution: "", year: "" }],
        skills: [{ id: generateId(), name: "", category: "" }],
        experiences: [{ id: generateId(), title: "", company: "", duration: "" }],
        assets: [{ id: generateId(), name: "", serial: "", assignedDate: "" }],
        personalizedTitle: "",
        personalizedContent: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        email: "",
        bloodGroup: "",
        documents: [{ id: generateId(), name: "", fileName: "", fileData: "" }],
        username: "",
        password: "",
        confirmPassword: "",
        enableSystemAccess: false,
    };

    const [form, setForm] = useState(initialForm);

    // Load Data from LocalStorage
    const [employees, setEmployees] = useState(() => {
        const saved = localStorage.getItem('successfactor_employees');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: "EMP001",
                name: "Akshay Thalkari",
                role: "Senior Developer",
                department: "Engineering",
                email: "akshay.t@successfactor.com",
                phone: "+91 98765 43210",
                status: "Active",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=akshay",
                type: "Employee",
                manager: "Priya Sharma"
            },
            {
                id: "EMP002",
                name: "Priya Sharma",
                role: "Marketing Manager",
                department: "Marketing",
                email: "priya.s@successfactor.com",
                phone: "+91 98765 43211",
                status: "Active",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
                type: "Manager"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('successfactor_employees', JSON.stringify(employees));
    }, [employees]);

    // Handle Enter Key submission prevention
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    };

    const stats = [
        { label: "Total Employees", value: employees.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Total Managers", value: employees.filter(e => e.type === 'Manager').length, icon: UserCheck, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Active Now", value: employees.filter(e => e.status === 'Active').length, icon: UserPlus, color: "text-green-600", bg: "bg-green-50" },
        { label: "On Leave", value: "3", icon: Filter, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const filteredEmployees = employees.filter(emp =>
        (emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedDepartment === 'All' || emp.department === selectedDepartment)
    );

    const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'Design', 'HR', 'Administration', 'Global Management'];

    // Dynamic Manager and HR Lists from all sources
    const { managers, hrList } = useMemo(() => {
        const superAdminRaw = localStorage.getItem('successfactor_superadmin');
        const adminsRaw = localStorage.getItem('successfactor_admins');

        const superAdmin = superAdminRaw ? [JSON.parse(superAdminRaw)] : [];
        const admins = adminsRaw ? JSON.parse(adminsRaw) : [];
        const onboardedManagers = employees.filter(e => e.type === 'Manager');

        const allAdmins = [...superAdmin, ...admins];

        return {
            managers: [...allAdmins, ...onboardedManagers].map(m => m.name),
            hrList: [...allAdmins, ...employees].filter(e => e.department === 'HR' || e.designation === 'HR Manager').map(h => h.name)
        };
    }, [employees]);

    const update = (key, value) => setForm(p => ({ ...p, [key]: value }));

    const handleDocumentUpload = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateDynamicItem('documents', id, 'fileData', reader.result);
                updateDynamicItem('documents', id, 'fileName', file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddClick = (type) => {
        setFormType(type);
        setForm(initialForm);
        setEditingId(null);
        setCurrentStep('account');
        setShowAddForm(true);
        setCompleted(false);
    };

    const handleEditClick = (emp) => {
        setFormType(emp.type.toLowerCase());
        setEditingId(emp.id);

        setForm({
            ...initialForm,
            ...emp,
            designation: emp.role || emp.designation,
            employeeId: emp.id
        });

        setCurrentStep('profile');
        setShowAddForm(true);
        setCompleted(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this employee?")) {
            setEmployees(p => p.filter(e => e.id !== id));
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                update("avatar", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [selectedDomain, setSelectedDomain] = useState("@successfactor.com");

    const addDynamicItem = (key, initialValue) => {
        setForm(p => ({
            ...p,
            [key]: [...p[key], { ...initialValue, id: generateId() }]
        }));
    };

    const updateDynamicItem = (key, id, field, value) => {
        setForm(p => ({
            ...p,
            [key]: p[key].map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const removeDynamicItem = (key, id) => {
        if (form[key].length > 1) {
            setForm(p => ({ ...p, [key]: p[key].filter(item => item.id !== id) }));
        }
    };

    const handleAccountSubmit = (e) => {
        e.preventDefault();

        const newId = form.employeeId || `EMP${Date.now()}`;
        const newEmployeeData = {
            ...form,
            id: newId,
            role: form.designation || "Pending Assignment",
            avatar: form.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || 'default'}`,
            type: formType.charAt(0).toUpperCase() + formType.slice(1),
            status: "Pending",
            lastUpdated: new Date().toISOString()
        };

        // Add to employees list immediately
        setEmployees(p => [...p, newEmployeeData]);

        // Transition to full profile step for this new employee
        setEditingId(newId);
        setForm(newEmployeeData);
        setCurrentStep('profile');
    };

    const completeAction = (e) => {
        e.preventDefault();

        const newEmployeeData = {
            ...form,
            id: form.employeeId || `EMP${Date.now()}`,
            role: form.designation,
            avatar: form.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || 'default'}`,
            type: formType.charAt(0).toUpperCase() + formType.slice(1),
            lastUpdated: new Date().toISOString()
        };

        if (editingId) {
            setEmployees(p => p.map(e => e.id === editingId ? newEmployeeData : e));
        } else {
            setEmployees(p => [...p, newEmployeeData]);
        }

        setCompleted(true);
    };

    if (showAddForm) {
        if (completed) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-5xl" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">
                            {editingId ? 'Update Successful!' : 'Registration Complete!'}
                        </h2>
                        <p className="text-gray-500 font-medium mb-8">
                            The {formType} profile has been successfully {editingId ? 'updated' : 'integrated'} into the system.
                        </p>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
                        >
                            Back to Directory
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="flex-1 p-8">
                    {/* Header Info Inside Page */}
                    <div className="max-w-5xl mx-auto mb-8 flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (currentStep === 'profile' && !editingId) {
                                    setCurrentStep('account');
                                } else {
                                    setShowAddForm(false);
                                    setEditingId(null);
                                    setForm(initialForm);
                                    setCompleted(false);
                                }
                            }}
                            className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 hover:shadow-md transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight capitalize">
                                {editingId ? 'Edit Profile' : (currentStep === 'account' ? `Create ${formType} Account` : `Complete ${formType} Profile`)}
                            </h2>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {currentStep === 'account' ? 'Step 1: Setup basic credentials' : 'Step 2: Configure professional details'}
                            </p>
                        </div>
                    </div>
                    {currentStep === 'account' ? (
                        /* STEP 1: CREATE ACCOUNT */
                        <div className="max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <form onSubmit={handleAccountSubmit} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-50/50 space-y-8">
                                <Select
                                    label="Account Type"
                                    options={['Employee', 'Manager']}
                                    value={formType}
                                    onChange={e => setFormType(e.target.value)}
                                    required
                                />

                                <div className="space-y-6">
                                    <Input label="Full Name" placeholder="Full Name" value={form.name} onChange={e => update('name', e.target.value)} required />
                                    <Input label="Username" placeholder="Username" value={form.username} onChange={e => update('username', e.target.value)} required />
                                    <Input label="Phone Number" placeholder="Phone Number" value={form.phone} onChange={e => update('phone', e.target.value)} required />
                                    <Input label="Official Email Address" placeholder="Company email for login" type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
                                    <Input label="Password" placeholder="Password" type="password" value={form.password} onChange={e => update('password', e.target.value)} required />
                                    <Input label="Confirm Password" placeholder="Confirm Password" type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-8 py-3 rounded-2xl border-2 border-gray-50 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-10 py-3 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-black transition-all"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* STEP 2: PROFILE FORM */
                        <div className="max-w-5xl mx-auto py-8">
                            <form onSubmit={completeAction} onKeyDown={handleKeyDown} className="space-y-6 pb-24">
                                {/* 0. PROFILE SECTION */}
                                <Section title="Profile Information" icon={<UserIcon />}>
                                    <div className="flex flex-col md:flex-row gap-8 items-center pb-4">
                                        <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-upload').click()}>
                                            <div className="w-32 h-32 rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400 group-hover:bg-blue-50/30">
                                                {form.avatar ? (
                                                    <img src={form.avatar} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-center p-4">
                                                        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Click to Upload</p>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                id="profile-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                            {form.avatar && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); update("avatar", ""); }}
                                                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-black transition-all"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-4 w-full">
                                            <Input
                                                label="Professional Headline"
                                                placeholder="e.g. Senior Product Architect | UI Specialist"
                                                value={form.headline}
                                                onChange={(e) => update("headline", e.target.value)}
                                            />
                                            <p className="text-[9px] font-bold text-gray-400 italic">
                                                * Note: Click the box on the left to upload a custom profile picture.
                                            </p>
                                        </div>
                                    </div>
                                </Section>

                                {/* PERSONAL INFORMATION */}
                                <Section title="1. Personal Information" icon={<UserIcon />}>
                                    <Grid>
                                        <Input label="Full Name" placeholder="e.g. Ravi Kumar" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                                        <Input label="Phone Number" placeholder="e.g. +91 9876543210" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                                        <Select label="Blood Group" options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} value={form.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)} />
                                        <div className="hidden md:block"></div>
                                    </Grid>
                                    <div className="mt-4 pt-4 border-t border-gray-50">
                                        <Input label="Employee ID" placeholder="e.g. E102" value={form.employeeId} onChange={(e) => update("employeeId", e.target.value)} required disabled={!!editingId} />
                                    </div>
                                </Section>

                                {/* WORK DETAILS */}
                                <Section title="2. Work Details" icon={<Briefcase />}>
                                    <Grid>
                                        <Select label="Department" options={departments.filter(d => d !== 'All')} value={form.department} onChange={(e) => update("department", e.target.value)} required />
                                        <ComboBox
                                            label={formType === 'manager' ? "Assigned HR Representative" : "Reporting Manager"}
                                            options={formType === 'manager' ? hrList : managers}
                                            value={form.manager}
                                            placeholder={formType === 'manager' ? "e.g. Sarah Jenkins or select HR" : "Search or type manager name"}
                                            onChange={(e) => update("manager", e.target.value)}
                                        />
                                        <Input label="Date of Joining" type="date" value={form.joiningDate} onChange={(e) => update("joiningDate", e.target.value)} required />
                                        <Input label="Work Location" placeholder="e.g. New York, Bangalore" value={form.workLocation} onChange={(e) => update("workLocation", e.target.value)} />
                                        <Input label="Designation / Job Title" placeholder="e.g. Senior Software Engineer" value={form.designation} onChange={(e) => update("designation", e.target.value)} required />
                                        <Select label="Work Type" options={['On-site', 'Remote', 'Hybrid']} value={form.workType} onChange={(e) => update("workType", e.target.value)} />
                                        <Select label="Status" options={['Active', 'Pending', 'Inactive']} value={form.status} onChange={(e) => update("status", e.target.value)} />
                                    </Grid>
                                </Section>

                                {/* SKILLS & QUALIFICATIONS */}
                                <Section title="3. Skills & Qualifications" icon={<GraduationCap />}>
                                    <div className="space-y-6">
                                        {/* Dynamic Skills */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Skills</p>
                                                <button type="button" onClick={() => addDynamicItem('skills', { name: "", category: "" })} className="text-[9px] font-black text-gray-400 hover:text-blue-600 flex items-center gap-1 uppercase">
                                                    <Plus className="w-3 h-3" /> Add Skill
                                                </button>
                                            </div>
                                            {form.skills.map((skill) => (
                                                <div key={skill.id} className="flex gap-4 items-end animate-in slide-in-from-top-2 duration-300">
                                                    <div className="flex-1 min-w-0">
                                                        <Input label="Skill Name" placeholder="Eg: React, UI Design" value={skill.name} onChange={(e) => updateDynamicItem('skills', skill.id, 'name', e.target.value)} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <Input label="Category" placeholder="Eg: Frontend" value={skill.category} onChange={(e) => updateDynamicItem('skills', skill.id, 'category', e.target.value)} />
                                                    </div>
                                                    {form.skills.length > 1 && (
                                                        <button type="button" onClick={() => removeDynamicItem('skills', skill.id)} className="p-2.5 mb-1 text-gray-300 hover:text-red-500 transition-colors">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Dynamic Qualifications */}
                                        <div className="space-y-4 pt-4 border-t border-gray-50">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Qualifications</p>
                                                <button type="button" onClick={() => addDynamicItem('qualifications', { degree: "", institution: "", year: "" })} className="text-[9px] font-black text-gray-400 hover:text-blue-600 flex items-center gap-1 uppercase">
                                                    <Plus className="w-3 h-3" /> Add Qualification
                                                </button>
                                            </div>
                                            {form.qualifications.map((qual) => (
                                                <div key={qual.id} className="p-4 bg-gray-50/50 rounded-xl space-y-4 relative group animate-in slide-in-from-top-2 duration-300">
                                                    <Grid>
                                                        <Input label="Degree / Certification" placeholder="Eg: B.Tech in CS" value={qual.degree} onChange={(e) => updateDynamicItem('qualifications', qual.id, 'degree', e.target.value)} />
                                                        <Input label="Institution" placeholder="Eg: University Name" value={qual.institution} onChange={(e) => updateDynamicItem('qualifications', qual.id, 'institution', e.target.value)} />
                                                    </Grid>
                                                    <Input label="Year of Completion" placeholder="Eg: 2022" value={qual.year} onChange={(e) => updateDynamicItem('qualifications', qual.id, 'year', e.target.value)} />
                                                    {form.qualifications.length > 1 && (
                                                        <button type="button" onClick={() => removeDynamicItem('qualifications', qual.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Section>

                                {/* EXPERIENCE */}
                                <Section title="4. Experience" icon={<History />}>
                                    {form.experiences.map((exp) => (
                                        <div key={exp.id} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-4 mb-4 relative group animate-in slide-in-from-top-2 duration-300">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Record</p>
                                            </div>
                                            <Grid>
                                                <Input label="Title (Job Title)" placeholder="Eg: Senior Lead" value={exp.title} onChange={(e) => updateDynamicItem('experiences', exp.id, 'title', e.target.value)} />
                                                <Input label="Company (Company Name)" placeholder="Eg: Tech Corp" value={exp.company} onChange={(e) => updateDynamicItem('experiences', exp.id, 'company', e.target.value)} />
                                            </Grid>
                                            <Input label="Duration (Eg: Jan 2021 - Dec 2023)" placeholder="Eg: 2 Years" value={exp.duration} onChange={(e) => updateDynamicItem('experiences', exp.id, 'duration', e.target.value)} />
                                            {form.experiences.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDynamicItem('experiences', exp.id)}
                                                    className="absolute top-5 right-5 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addDynamicItem('experiences', { title: "", company: "", duration: "" })}
                                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2 bg-white"
                                    >
                                        <Plus className="w-4 h-4" /> Add Experience Record
                                    </button>
                                </Section>

                                {/* ASSIGNED ASSETS */}
                                <Section title="5. Assigned Assets" icon={<Laptop />}>
                                    {form.assets.map((asset) => (
                                        <div key={asset.id} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-4 mb-4 relative group animate-in slide-in-from-top-2 duration-300">
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Asset</p>
                                            <Grid>
                                                <Input label="Asset Name" placeholder="Enter asset name" value={asset.name} onChange={(e) => updateDynamicItem('assets', asset.id, 'name', e.target.value)} />
                                                <Input label="Serial Number" placeholder="Enter serial number" value={asset.serial} onChange={(e) => updateDynamicItem('assets', asset.id, 'serial', e.target.value)} />
                                            </Grid>
                                            <Input label="Assigned Date" type="date" value={asset.assignedDate} onChange={(e) => updateDynamicItem('assets', asset.id, 'assignedDate', e.target.value)} />
                                            {form.assets.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDynamicItem('assets', asset.id)}
                                                    className="absolute top-5 right-5 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addDynamicItem('assets', { name: "", serial: "", assignedDate: "" })}
                                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2 bg-white"
                                    >
                                        <Plus className="w-4 h-4" /> Add Asset Record
                                    </button>
                                </Section>

                                {/* PERSONALIZED SECTION */}
                                <Section title="6. Personalized" icon={<TypeIcon />}>
                                    <Input label="Section Title" placeholder="Enter custom section title" value={form.personalizedTitle} onChange={(e) => update('personalizedTitle', e.target.value)} />
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paragraph</label>
                                        <textarea
                                            rows={4}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                            placeholder="Enter additional information..."
                                            value={form.personalizedContent}
                                            onChange={(e) => update('personalizedContent', e.target.value)}
                                        />
                                    </div>
                                </Section>

                                {/* DOCUMENTS */}
                                {/* DOCUMENTS */}
                                <Section title="7. Documents" icon={<FileText />}>
                                    <div className="space-y-4">
                                        {form.documents.map((doc) => (
                                            <div key={doc.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 relative group animate-in slide-in-from-top-2 duration-300">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                                    <Input
                                                        label="Document Name"
                                                        placeholder="e.g. Passport, Contract, Resume"
                                                        value={doc.name}
                                                        onChange={(e) => updateDynamicItem('documents', doc.id, 'name', e.target.value)}
                                                    />
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload File</label>
                                                        <div
                                                            onClick={() => document.getElementById(`doc-upload-${doc.id}`).click()}
                                                            className={`w-full border-2 border-dashed rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${doc.fileName ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-400 hover:border-blue-400 hover:bg-blue-50/30'}`}
                                                        >
                                                            <span className="truncate max-w-[150px]">{doc.fileName || "Select File"}</span>
                                                            {doc.fileName ? <CheckCircle className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                                                        </div>
                                                        <input
                                                            id={`doc-upload-${doc.id}`}
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => handleDocumentUpload(doc.id, e)}
                                                        />
                                                    </div>
                                                </div>
                                                {form.documents.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDynamicItem('documents', doc.id)}
                                                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-black transition-all"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addDynamicItem('documents', { id: generateId(), name: "", fileName: "", fileData: "" })}
                                            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2 bg-white"
                                        >
                                            <Plus className="w-4 h-4" /> Add Another Document
                                        </button>
                                    </div>
                                </Section>

                                {/* PERMANENT ADDRESS */}
                                {/* PERMANENT ADDRESS */}
                                <Section title="8. Permanent Address" icon={<MapPin />}>
                                    <Grid>
                                        <Input label="Address Line" placeholder="e.g. 123 Main St" value={form.address} onChange={(e) => update("address", e.target.value)} />
                                        <Input label="City" placeholder="e.g. Bangalore" value={form.city} onChange={(e) => update("city", e.target.value)} />
                                        <Input label="Zip Code" placeholder="e.g. 560001" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                                    </Grid>
                                </Section>

                                {/* 8. SYSTEM ACCOUNT CREDENTIALS */}
                                {/* 9. SYSTEM ACCOUNT CREDENTIALS */}
                                <Section title="9. System Account Credentials" icon={<ShieldCheck />}>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Enable System Login</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Assign username and password for dashboard access</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => update("enableSystemAccess", !form.enableSystemAccess)}
                                                className={`w-14 h-7 rounded-full transition-all duration-300 relative ${form.enableSystemAccess ? 'bg-blue-600' : 'bg-gray-200'}`}
                                            >
                                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${form.enableSystemAccess ? 'left-8' : 'left-1'}`}></div>
                                            </button>
                                        </div>

                                        {form.enableSystemAccess && (
                                            <div className="animate-in slide-in-from-top-4 duration-300 space-y-4">
                                                <Grid>
                                                    <Input label="Username" placeholder="e.g. ravikumar_sf" value={form.username} onChange={(e) => update("username", e.target.value)} />
                                                    <div className="hidden md:block"></div>
                                                </Grid>
                                                <Grid>
                                                    <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} />
                                                    <Input label="Confirm Password" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />
                                                </Grid>

                                            </div>
                                        )}
                                    </div>
                                </Section>

                                <div className="mt-12 pt-10 border-t border-gray-100 flex items-center justify-end gap-6">
                                    <button
                                        type="button"
                                        onClick={() => editingId ? setShowAddForm(false) : setCurrentStep('account')}
                                        className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                                    >
                                        {editingId ? 'Discard Changes' : 'Back to Account'}
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-black hover:-translate-y-1 transition-all active:scale-95"
                                    >
                                        {editingId ? 'Save Changes' : 'Finalize Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="max-w-[1600px] mx-auto px-6 pt-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-3 rounded-2xl bg-white text-gray-400 hover:text-blue-600 border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Onboarding Directory</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Live Database</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleAddClick('employee')}
                            className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-gray-900 text-white font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-gray-300 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Employee
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Ovrvw</span>
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, ID or role..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-sm uppercase tracking-tight"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
                                {departments.map(dept => (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDepartment(dept)}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedDepartment === dept
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                            <div className="h-8 w-px bg-gray-200 mx-2 hidden lg:block"></div>
                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
                                >
                                    <GridIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employees Content */}
                {viewMode === 'list' ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-center md:text-left">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Employee</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role & Dept</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Reporting To</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Type</th>
                                        <th className="px-6 py-5 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredEmployees.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img src={emp.avatar} alt="" className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" />
                                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${emp.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{emp.name}</h4>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{emp.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-700">{emp.role}</span>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                                                        <Building className="w-3 h-3" /> {emp.department}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-600">{emp.manager || 'No Manager'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${emp.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${emp.type === 'Manager'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {emp.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(emp)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(emp.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEmployees.map((emp) => (
                            <div key={emp.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="relative">
                                        <img src={emp.avatar} alt="" className="w-20 h-20 rounded-[2rem] border-4 border-gray-50 shadow-inner" />
                                        <div className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full ${emp.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditClick(emp)} className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(emp.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h4 className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{emp.name}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{emp.role}</p>
                                    <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-blue-600 bg-blue-50 w-fit px-3 py-1.5 rounded-lg uppercase tracking-widest">
                                        <Building className="w-3 h-3" /> {emp.department}
                                    </div>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 truncate uppercase tracking-tighter">
                                        <Mail className="w-4 h-4 text-gray-300" /> {emp.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                        <Phone className="w-4 h-4 text-gray-300" /> {emp.phone}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <span className="text-[10px] font-black text-gray-300 tracking-[0.2em]">{emp.id}</span>
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${emp.type === 'Manager'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {emp.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/* ---------------- FORM COMPONENTS ---------------- */

const Section = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 border-b border-gray-50 pb-3">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</span>
            {title}
        </div>
        {children}
    </div>
);

const Grid = ({ children, cols = "md:grid-cols-2" }) => (
    <div className={`grid grid-cols-1 ${cols} gap-4`}>{children}</div>
);

const Input = ({ label, ...props }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <input
            {...props}
            onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
                if (props.onKeyDown) props.onKeyDown(e);
            }}
            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
        />
    </div>
);

const Select = ({ label, options, ...props }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <select {...props} className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all">
            <option value="">Select {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const ComboBox = ({ label, options, ...props }) => {
    const listId = `list-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group">
                <input
                    {...props}
                    list={listId}
                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
                <datalist id={listId}>
                    {options.map(opt => <option key={opt} value={opt} />)}
                </datalist>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 opacity-50 group-focus-within:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest ml-1 mt-1">Pick from list or type name</p>
        </div>
    );
};

export default HrOnboarding;
