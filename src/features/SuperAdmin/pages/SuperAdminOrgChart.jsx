import React, { useMemo, useState } from 'react';
import {
    FiFilter,
    FiDownload,
    FiChevronDown,
    FiMapPin,
    FiMail,
    FiPhone,
    FiUser,
    FiX,
    FiBriefcase,
    FiLayers,
    FiPlus,
    FiMinus,
    FiCheck,
    FiList
} from "react-icons/fi";

const MOCK_EMPLOYEES = [
    {
        id: 'emp001',
        name: 'Rajesh Kumar',
        designation: 'Chief Executive Officer',
        department: 'Executive',
        companyEmail: 'rajesh.kumar@ritshr.com',
        phone: '+91-9876543210',
        status: 'Active',
        joiningDate: '2020-01-15',
        avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=1e40af&color=fff',
        reportingManager: null
    },
    {
        id: 'emp002',
        name: 'Priya Sharma',
        designation: 'HR Director',
        department: 'Human Resources',
        companyEmail: 'priya.sharma@ritshr.com',
        phone: '+91-9876543211',
        status: 'Active',
        joiningDate: '2020-06-10',
        avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=1e40af&color=fff',
        reportingManager: 'Rajesh Kumar'
    },
    {
        id: 'emp003',
        name: 'Amit Patel',
        designation: 'Finance Manager',
        department: 'Finance',
        companyEmail: 'amit.patel@ritshr.com',
        phone: '+91-9876543212',
        status: 'Active',
        joiningDate: '2020-08-20',
        avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=1e40af&color=fff',
        reportingManager: 'Rajesh Kumar'
    },
    {
        id: 'emp004',
        name: 'Sneha Gupta',
        designation: 'Recruitment Manager',
        department: 'Human Resources',
        companyEmail: 'sneha.gupta@ritshr.com',
        phone: '+91-9876543213',
        status: 'Active',
        joiningDate: '2021-02-14',
        avatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta&background=1e40af&color=fff',
        reportingManager: 'Priya Sharma'
    },
    {
        id: 'emp005',
        name: 'Vikram Singh',
        designation: 'Senior HR Executive',
        department: 'Human Resources',
        companyEmail: 'vikram.singh@ritshr.com',
        phone: '+91-9876543214',
        status: 'Active',
        joiningDate: '2021-04-10',
        avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=1e40af&color=fff',
        reportingManager: 'Priya Sharma'
    },
    {
        id: 'emp006',
        name: 'Neha Reddy',
        designation: 'Accountant',
        department: 'Finance',
        companyEmail: 'neha.reddy@ritshr.com',
        phone: '+91-9876543215',
        status: 'Active',
        joiningDate: '2021-05-20',
        avatar: 'https://ui-avatars.com/api/?name=Neha+Reddy&background=1e40af&color=fff',
        reportingManager: 'Amit Patel'
    },
    {
        id: 'emp007',
        name: 'Arjun Verma',
        designation: 'Finance Analyst',
        department: 'Finance',
        companyEmail: 'arjun.verma@ritshr.com',
        phone: '+91-9876543216',
        status: 'Active',
        joiningDate: '2021-07-15',
        avatar: 'https://ui-avatars.com/api/?name=Arjun+Verma&background=1e40af&color=fff',
        reportingManager: 'Amit Patel'
    },
    {
        id: 'emp008',
        name: 'Divya Nair',
        designation: 'HR Executive',
        department: 'Human Resources',
        companyEmail: 'divya.nair@ritshr.com',
        phone: '+91-9876543217',
        status: 'Active',
        joiningDate: '2022-01-10',
        avatar: 'https://ui-avatars.com/api/?name=Divya+Nair&background=1e40af&color=fff',
        reportingManager: 'Sneha Gupta'
    },
    {
        id: 'emp009',
        name: 'Rohan Das',
        designation: 'Operations Manager',
        department: 'Operations',
        companyEmail: 'rohan.das@ritshr.com',
        phone: '+91-9876543218',
        status: 'Active',
        joiningDate: '2020-09-05',
        avatar: 'https://ui-avatars.com/api/?name=Rohan+Das&background=1e40af&color=fff',
        reportingManager: 'Rajesh Kumar'
    },
    {
        id: 'emp010',
        name: 'Kavya Menon',
        designation: 'Operations Executive',
        department: 'Operations',
        companyEmail: 'kavya.menon@ritshr.com',
        phone: '+91-9876543219',
        status: 'Active',
        joiningDate: '2022-03-15',
        avatar: 'https://ui-avatars.com/api/?name=Kavya+Menon&background=1e40af&color=fff',
        reportingManager: 'Rohan Das'
    }
];

const SuperAdminOrgChart = ({ employees = MOCK_EMPLOYEES }) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [viewMode, setViewMode] = useState('chart');
    const [filterDept, setFilterDept] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [collapsedNodes, setCollapsedNodes] = useState(new Set());
    const [activeTab, setActiveTab] = useState('details');

    const toggleNode = (nodeId) => {
        setCollapsedNodes(prev => {
            const next = new Set(prev);
            if (next.has(nodeId)) next.delete(nodeId);
            else next.add(nodeId);
            return next;
        });
    };

    const filteredEmployees = useMemo(() => {
        if (filterDept === 'All') return employees;
        return employees.filter(e => e.department === filterDept);
    }, [employees, filterDept]);

    const departments = useMemo(() => {
        return ['All', ...new Set(employees.map(e => e.department))];
    }, [employees]);

    const handleDownload = () => {
        const headers = ['ID', 'Name', 'Designation', 'Department', 'Email', 'Phone', 'Status', 'Joining Date'];
        const csvContent = [
            headers.join(','),
            ...filteredEmployees.map(e => [
                e.id,
                `"${e.name}"`,
                `"${e.designation}"`,
                e.department,
                e.companyEmail,
                e.phone || '',
                e.status,
                e.joiningDate
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `ritshr_org_data_${filterDept.toLowerCase()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const hierarchy = useMemo(() => {
        const roots = employees.filter(emp =>
            !emp.reportingManager ||
            !employees.some(e => e.name === emp.reportingManager)
        );

        if (roots.length === 0) return null;

        const buildNode = (emp) => {
            const directReports = employees.filter(e => e.reportingManager === emp.name);
            return {
                ...emp,
                children: directReports.map(r => buildNode(r))
            };
        };

        if (roots.length === 1) {
            return buildNode(roots[0]);
        } else {
            return {
                id: 'ROOT',
                name: 'RitsHR Organization',
                designation: 'Corporate Hierarchy',
                department: 'Global',
                avatar: 'https://ui-avatars.com/api/?name=Rits+HR&background=1e3a8a&color=fff',
                status: 'Active',
                children: roots.map(r => buildNode(r))
            };
        }
    }, [employees]);

    const renderNode = (node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isMatch = filterDept === 'All' || node.department === filterDept;
        const opacityClass = filterDept !== 'All' && !isMatch ? 'opacity-30 grayscale' : 'opacity-100';
        const isVirtualRoot = node.id === 'ROOT';

        return (
            <div className={`flex flex-col items-center`}>
                <div className={`relative z-10 w-64 transition-all duration-300 ${opacityClass}`}>
                    <div
                        onClick={() => !isVirtualRoot && setSelectedEmployee(node)}
                        className={`bg-white border cursor-pointer rounded-2xl group hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all ${selectedEmployee?.id === node.id
                            ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-lg'
                            : isVirtualRoot
                                ? 'border-blue-700 bg-gradient-to-br from-blue-700 to-indigo-600 text-white shadow-xl scale-110'
                                : 'border-blue-50 shadow-sm hover:border-blue-300'
                            }`}
                    >
                        <div className="p-4 flex items-center gap-4">
                            <div className="relative">
                                <img
                                    src={node.avatar}
                                    className={`w-12 h-12 rounded-xl object-cover border-2 shadow-sm ${isVirtualRoot ? 'border-white' : 'border-blue-50'}`}
                                    alt={node.name}
                                />
                                {!isVirtualRoot && (
                                    <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${node.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                )}
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                                <h4 className={`text-xs font-bold truncate ${isVirtualRoot ? 'text-white' : 'text-slate-800'}`}>{node.name}</h4>
                                <p className={`text-[9px] font-semibold uppercase tracking-wider truncate mt-0.5 ${isVirtualRoot ? 'text-blue-100' : 'text-blue-600'}`}>{node.designation}</p>
                                <p className={`text-[9px] truncate mt-0.5 flex items-center gap-1 ${isVirtualRoot ? 'text-blue-200' : 'text-slate-400'}`}><FiMapPin size={8} /> {node.department}</p>
                            </div>
                        </div>
                    </div>

                    {hasChildren && !isVirtualRoot && (
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleNode(node.id); }}
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center text-blue-500 hover:text-white hover:bg-blue-600 transition-all z-20 shadow-sm"
                        >
                            {collapsedNodes.has(node.id) ? <FiPlus size={10} strokeWidth={4} /> : <FiMinus size={10} strokeWidth={4} />}
                        </button>
                    )}

                    {hasChildren && !collapsedNodes.has(node.id) && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-blue-100"></div>
                    )}
                </div>

                {hasChildren && !collapsedNodes.has(node.id) && (
                    <div className="flex items-start gap-8 pt-6">
                        {node.children.map((child, index) => {
                            const isFirst = index === 0;
                            const isLast = index === node.children.length - 1;
                            const isSingle = node.children.length === 1;

                            return (
                                <div key={child.id} className="flex flex-col items-center relative">
                                    {!isSingle && (
                                        <>
                                            <div className={`absolute top-0 right-1/2 h-px bg-blue-200 ${isFirst ? 'hidden' : 'w-[calc(50%+1rem)]'}`}></div>
                                            <div className={`absolute top-0 left-1/2 h-px bg-blue-200 ${isLast ? 'hidden' : 'w-[calc(50%+1rem)]'}`}></div>
                                        </>
                                    )}
                                    <div className="w-px h-6 bg-blue-200"></div>
                                    {renderNode(child)}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const renderListView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredEmployees.map(emp => (
                <div
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    className={`group bg-white rounded-3xl p-6 border transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center ${selectedEmployee?.id === emp.id
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg'
                        : 'border-blue-50 shadow-sm'
                        }`}
                >
                    <div className="relative mb-4">
                        <img src={emp.avatar} className="w-20 h-20 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform border-4 border-white" alt={emp.name} />
                        <div className={`absolute -bottom-1 -right-1 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase border border-white ${emp.status === 'Active' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-400 text-white'}`}>
                            {emp.status}
                        </div>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{emp.name}</h3>
                    <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mt-1 mb-4">{emp.designation}</p>

                    <div className="w-full pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-semibold text-gray-500">
                        <span className="flex items-center gap-1"><FiBriefcase size={12} className="text-blue-500" /> {emp.department}</span>
                        <span className="flex items-center gap-1 text-indigo-600"><FiUser size={12} /> {emp.id}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-[calc(100vh-3rem)] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-[2rem] border border-blue-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">

            <div className="h-20 border-b flex items-center justify-between px-8 bg-white/90 backdrop-blur-xl z-20 border-blue-50 shrink-0">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-[24px] font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-tight">Organization Chart</h1>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] mt-0.5">
                            {filteredEmployees.length} Displaying • {employees.length} Members
                        </p>
                    </div>
                    <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-blue-50 p-1 rounded-xl border border-blue-100 shadow-inner">
                        <button
                            onClick={() => setViewMode('chart')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${viewMode === 'chart' ? 'bg-white shadow-sm text-blue-700 border border-blue-100' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FiLayers size={14} /> Chart
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-700 border border-blue-100' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FiList size={14} /> List
                        </button>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-md hover:scale-[1.03] transition-all border border-transparent ${filterDept !== 'All'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                : 'bg-white text-gray-700 border-gray-200'}`}
                        >
                            <FiFilter size={14} /> {filterDept === 'All' ? 'Filter' : filterDept}
                        </button>
                        {isFilterOpen && (
                            <>
                                <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)}></div>
                                <div className={`absolute right-0 mt-2 w-52 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-blue-100 overflow-hidden z-40 animate-in fade-in zoom-in-95 bg-white`}>
                                    <div className="p-2 space-y-1">
                                        {departments.map(dept => (
                                            <button key={dept} onClick={() => { setFilterDept(dept); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors ${filterDept === dept ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-slate-50'}`}>{dept}</button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handleDownload}
                        className="p-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                        <FiDownload size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden flex bg-transparent">
                <div className={`flex-1 relative overflow-auto custom-scrollbar ${viewMode === 'chart' ? 'bg-[radial-gradient(#14202e_1px,transparent_1px)] [background-size:20px_20px]' : ''}`}>
                    {viewMode === 'chart' ? (
                        <div className="absolute inset-0 p-20 min-w-max min-h-max flex justify-center items-start">
                            <div className="transition-all duration-300 origin-top h-fit" style={{ zoom: zoom }}>
                                {hierarchy ? renderNode(hierarchy) : (
                                    <div className="flex flex-col items-center justify-center opacity-50 mt-20">
                                        <FiLayers size={48} className="text-blue-200 mb-4" />
                                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.3em]">Mapping Structure...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : renderListView()}
                </div>

                {viewMode === 'chart' && (
                    <div className="absolute bottom-8 left-8 flex flex-col items-center bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-blue-100 p-1.5 z-[70]">
                        <button onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))} className="p-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 hover:shadow-inner transition-all border border-blue-50"><FiPlus size={14} strokeWidth={3} /></button>
                        {/* <div className="py-2.5 text-[10px] font-black text-gray-500 w-full text-center tracking-tighter">{Math.round(zoom * 100)}%</div> */}
                        <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 hover:shadow-inner transition-all border border-blue-50"><FiMinus size={14} strokeWidth={3} /></button>
                    </div>
                )}
            </div>

            {selectedEmployee && (
                <>
                    <div onClick={() => setSelectedEmployee(null)} className="fixed  bg-slate-900/40 backdrop-blur-sm z-[999] animate-in fade-in duration-500" />
                    <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] animate-in slide-in-from-right duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-[1000] flex flex-col overflow-hidden">

                        <div className="p-8 border-b border-blue-50 relative bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                            <button onClick={() => setSelectedEmployee(null)} className="absolute top-6 right-6 p-2.5 bg-white text-gray-400 hover:text-blue-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100"><FiX size={18} /></button>
                            <div className="flex flex-col items-center text-center mt-4">
                                <div className="relative mb-5 scale-110">
                                    <img src={selectedEmployee.avatar} className="w-20 h-20 rounded-[2rem] object-cover border-4 border-white shadow-2xl" alt={selectedEmployee.name} />
                                    <div className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${selectedEmployee.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                                        {selectedEmployee.status === 'Active' && <FiCheck size={12} strokeWidth={4} className="text-white" />}
                                    </div>
                                </div>
                                <h2 className="text-[26px] font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent tracking-tight leading-tight">{selectedEmployee.name}</h2>
                                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-2">{selectedEmployee.designation}</p>
                                <div className="flex gap-2 mt-8">
                                    <button className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl hover:scale-[1.03] transition-all">View Profile</button>
                                    <button className="p-3 bg-white text-blue-600 border border-blue-100 rounded-2xl shadow-lg hover:bg-blue-50 transition-all"><FiMail size={16} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="flex border-b border-blue-50 bg-white">
                            {[{ id: 'details', label: 'Overview' }, { id: 'history', label: 'Experience' }].map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-blue-600 rounded-t-full shadow-[0_-4px_10px_rgba(37,99,235,0.4)]" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar bg-white">
                            {activeTab === 'details' ? (
                                <div className="space-y-5">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-2">Employee Information</p>
                                    {[
                                        { label: 'Department', value: selectedEmployee.department, color: 'text-blue-600' },
                                        { label: 'Employee ID', value: selectedEmployee.id, color: 'text-indigo-600' },
                                        { label: 'Reporting Manager', value: selectedEmployee.reportingManager || 'N/A' },
                                        { label: 'Work Location', value: 'Corporate HQ, Floor 4' },
                                        { label: 'Start Date', value: selectedEmployee.joiningDate },
                                        { label: 'Work Email', value: selectedEmployee.companyEmail },
                                        { label: 'Contact Number', value: selectedEmployee.phone || 'N/A' },
                                        { label: 'Employment', value: 'Full-Time', color: 'text-emerald-700' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-3.5 border-b border-slate-50 last:border-0 group hover:px-2 transition-all">
                                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-tight">{item.label}</span>
                                            <span className={`text-[13px] font-bold text-right max-w-[65%] truncate group-hover:scale-105 transition-all ${item.color || 'text-gray-800'}`}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-8 mt-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-slate-50 pb-2">Work History</p>
                                    {[
                                        { role: selectedEmployee.designation, company: 'RitsHR Services', period: '2022 - Present', desc: 'Current specialized leadership role.' },
                                        { role: 'Senior Consultant', company: 'Global Tech Solutions', period: '2019 - 2022', desc: 'Optimized internal processes and resource workflows.' },
                                        { role: 'Unit Lead', company: 'Alliance Group', period: '2016 - 2019', desc: 'Led a cross-functional team of 15 members.' }
                                    ].map((job, i) => (
                                        <div key={i} className="relative pl-8 border-l-2 border-blue-50 pb-10 last:pb-0">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-md ring-4 ring-blue-50" />
                                            <p className="text-[11px] font-black text-blue-600 uppercase tracking-tighter">{job.period}</p>
                                            <h4 className="text-[15px] font-bold text-gray-900 mt-2">{job.role}</h4>
                                            <p className="text-[11px] font-semibold text-indigo-500 uppercase mt-0.5">{job.company}</p>
                                            <p className="text-[12px] text-gray-500 mt-3 leading-relaxed font-medium">{job.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SuperAdminOrgChart;
