import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import managerOrgChartThunk from '../Redux/thunks/ManagerOrgChartThunk';

const ManagerOrgChart = () => {
    const dispatch = useDispatch();
    const { getOrgChartLoading: loading, orgChartData: data, getOrgChartError: error } = useSelector((state) => state.manager.orgChart);

    useEffect(() => {
        dispatch(managerOrgChartThunk.getOrgChartThunk());
    }, [dispatch]);

    const countEmployees = (nodes = []) => {
        let count = 0;
        const walk = (arr) => {
            arr.forEach((n) => {
                count++;
                if (n.children && n.children.length > 0) {
                    walk(n.children);
                }
            });
        };
        walk(nodes);
        return count;
    };

    // API employees mapping
    const employees = useMemo(() => {
        if (!Array.isArray(data)) return [];

        const mapNode = (emp) => ({
            id: emp.employeeNo || emp.id,
            name: emp.employeeName || emp.name,
            designation: emp.designation,
            department: emp.department,
            status: emp.status?.toLowerCase() === "active" ? "Active" : "Inactive",
            reportingManager: emp.reportingManager,
            role: emp.role,
            avatar: emp.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.employeeName || emp.name)}`,
            children: (emp.children || []).map(mapNode),
        });

        return data.map(mapNode);
    }, [data]);


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

    const hierarchy = useMemo(() => {
        if (!employees.length) return null;
        if (employees.length === 1) {
            return employees[0];
        }
        return {
            id: "ROOT",
            name: "Organization Chart",
            designation: "Team Structure",
            department: "Global",
            status: "Active",
            avatar: "https://ui-avatars.com/api/?name=Team&background=1e3a8a&color=fff",
            children: employees,
        };
    }, [employees]);

    const renderNode = (node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isMatch = filterDept === 'All' || node.department === filterDept;
        const opacityClass = filterDept !== 'All' && !isMatch ? 'opacity-30 grayscale' : 'opacity-100';
        const isVirtualRoot = node.id === 'ROOT';

        return (
            <div className={`flex flex-col items-center`} key={node.id}>
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
                        <img
                            src={emp.avatar}
                            className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                            alt={emp.name}
                        />

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

    if (loading) {
        return <div className="p-10 text-lg">Loading organization...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-3rem)] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-[2rem] border border-blue-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
            <div className="h-20 border-b flex items-center justify-between px-8 bg-white/90 backdrop-blur-xl z-20 border-blue-50 shrink-0">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-[24px] font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-tight">Manager Org Chart</h1>
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
                                    <img
                                        src={selectedEmployee.avatar}
                                        className="w-20 h-20 rounded-[2rem]"
                                        alt={selectedEmployee.name}
                                    />
                                    <div className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${selectedEmployee.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                                        {selectedEmployee.status === 'Active' && <FiCheck size={12} strokeWidth={4} className="text-white" />}
                                    </div>
                                </div>
                                <h2 className="text-[26px] font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent tracking-tight leading-tight">{selectedEmployee.name}</h2>
                                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-2">{selectedEmployee.designation}</p>
                            </div>
                        </div>

                        <div className="flex border-b border-blue-50 bg-white">
                            {[{ id: 'details', label: 'Overview' }].map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-blue-600 rounded-t-full shadow-[0_-4px_10px_rgba(37,99,235,0.4)]" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar bg-white">
                            {activeTab === 'details' && (
                                <div className="space-y-5">
                                    <p className="text-[11px] font-bold text-gray-700 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2 font-['Inter']">
                                        Member Information
                                    </p>

                                    {[
                                        { label: "Name", value: selectedEmployee.name },
                                        { label: "ID", value: selectedEmployee.id },
                                        { label: "Department", value: selectedEmployee.department },
                                        { label: "Designation", value: selectedEmployee.designation },
                                        { label: "Status", value: selectedEmployee.status, isStatus: true },
                                        {
                                            label: "Reporting Manager",
                                            value: selectedEmployee.reportingManager || "N/A",
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center py-3.5 border-b border-slate-100 last:border-0 font-['Inter']"
                                        >
                                            <span className="w-1/2 text-[11px] font-extrabold text-gray-700 uppercase tracking-widest">
                                                {item.label}
                                            </span>

                                            <span
                                                className={`w-1/2 text-[14px] font-normal text-right break-all
                                                ${item.isStatus && item.value === "Active"
                                                        ? "text-emerald-600"
                                                        : item.isStatus && item.value === "Inactive"
                                                            ? "text-red-500"
                                                            : "text-gray-800"
                                                    }
                                              `}
                                            >
                                                {item.value}
                                            </span>
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

export default ManagerOrgChart;
