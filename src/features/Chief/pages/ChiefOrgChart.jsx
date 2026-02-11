
import React, { useState, useMemo, useEffect } from "react";
import {
    FiZoomIn,
    FiZoomOut,
    FiRotateCcw,
    FiDownload,
    FiSearch,
    FiList,
    FiFilter,
    FiChevronLeft,
    FiGrid,
    FiUser,
} from "react-icons/fi";




/* =========================================================================
   INITIAL DATA (Simulated if nothing in LocalStorage)
   This mimics the "Super Admin" -> "Admin" -> "Employee" structure
   but for "Chief" -> "Chief Admin" -> "Employee"
   ========================================================================= */

const initialSuperAdmin = [
    {
        id: "CHIEF01",
        name: "Chief User",
        role: "Chief",
        position: "Chief Executive Officer",
        department: "Executive",
        location: "Headquarters",
        email: "chief@company.com",
        phone: "+1 (555) 000-0000",
        image: "https://i.pravatar.cc/150?img=11",
        managerId: null, // Top of the hierarchy
        status: "Active",
        joinDate: "2015-01-01",
    },
];

const initialAdmins = []; // Will be populated from localStorage 'successfactor_chief_admins'
const initialEmployees = []; // Will be populated from localStorage 'successfactor_employees'

/* =========================================================================
   COMPONENT: Organization Chart
   ========================================================================= */

const ChiefOrgChart = () => {
    // --- View State ---
    const [viewMode, setViewMode] = useState("chart"); // 'chart' or 'list'
    const [zoomLevel, setZoomLevel] = useState(1);
    const [selectedNode, setSelectedNode] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");

    // --- Data State ---
    const [employees, setEmployees] = useState([]);

    // Fetch data from LocalStorage on mount
    useEffect(() => {
        // 1. Get Chief (Top Level)
        const storedChief = localStorage.getItem("successfactor_chief");
        const chiefData = storedChief ? JSON.parse(storedChief) : initialSuperAdmin;

        // 2. Get Admins (Mid Level) -> Using 'successfactor_chief_admins'
        const storedAdmins = localStorage.getItem("successfactor_chief_admins");
        const adminData = storedAdmins ? JSON.parse(storedAdmins) : initialAdmins;

        // 3. Get Employees (Bottom Level) -> Using shared 'successfactor_employees'
        // Assuming employees are shared or we can filter them if they have a 'portal' field.
        // For now, let's load all employees and let the hierarchy (managerId) determine visibility.
        const storedEmployees = localStorage.getItem("successfactor_employees");
        const empData = storedEmployees ? JSON.parse(storedEmployees) : initialEmployees;

        // 4. Merge
        // Note: ensure field names match what the chart expects (id, name, role, managerId, etc.)
        // We might need to map some fields if the stored data structure differs.
        // Assuming the structure is consistent:

        const allData = [...chiefData, ...adminData, ...empData];
        setEmployees(allData);
    }, []);

    // --- Derived State (Hierarchy Construction) ---
    const hierarchy = useMemo(() => {
        if (!employees.length) return [];

        const buildTree = (managerId) => {
            return employees
                .filter((emp) => emp.managerId === managerId)
                .map((emp) => ({
                    ...emp,
                    children: buildTree(emp.id), // Recursive call
                }));
        };

        // Find root nodes (those with no manager or manager not in list)
        // The Chief should definitely be a root.
        const roots = employees.filter(
            (emp) => !emp.managerId || !employees.find((e) => e.id === emp.managerId)
        );

        // If we have distinct roots, we can try to structure them.
        // Ideally, there is one Chief.
        return roots.map((root) => ({
            ...root,
            children: buildTree(root.id),
        }));
    }, [employees]);

    // --- Filtering & Searching ---
    // In 'chart' mode, filtering usually highlights nodes.
    // In 'list' mode, filtering removes rows.
    const filteredList = useMemo(() => {
        return employees.filter((emp) => {
            const matchSearch =
                emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.department?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchDept =
                departmentFilter === "All" || emp.department === departmentFilter;

            return matchSearch && matchDept;
        });
    }, [employees, searchTerm, departmentFilter]);

    // Unique Departments for Filter
    const departments = useMemo(() => {
        const depts = new Set(employees.map((e) => e.department).filter(Boolean));
        return ["All", ...Array.from(depts)];
    }, [employees]);

    // --- Handlers ---
    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
    const handleResetZoom = () => setZoomLevel(1);

    const handleDownload = () => {
        alert("Download functionality would generate a PDF/Image of the chart.");
    };

    // --- Render Helpers ---

    // Recursive Chart Node Renderer
    const renderTreeNode = (node) => {
        // Check if node matches search (for highlighting)
        const isHighlight =
            searchTerm &&
            node.name.toLowerCase().includes(searchTerm.toLowerCase());

        return (
            <div className="flex flex-col items-center mx-4" key={node.id}>
                {/* Node Card */}
                <div
                    onClick={() => setSelectedNode(node)}
                    className={`
            relative flex flex-col items-center p-3 bg-white rounded-xl shadow-md border-2 
            cursor-pointer transition-transform hover:scale-105 hover:shadow-lg w-48
            ${selectedNode?.id === node.id
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : isHighlight
                                ? "border-yellow-400 ring-2 ring-yellow-100"
                                : "border-transparent"
                        }
          `}
                >
                    <img
                        src={node.image || "https://via.placeholder.com/150"}
                        alt={node.name}
                        className="w-12 h-12 rounded-full mb-2 object-cover border"
                    />
                    <h3 className="text-sm font-bold text-gray-800 text-center leading-tight">
                        {node.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium text-center">
                        {node.position || node.role}
                    </p>
                    {node.children && node.children.length > 0 && (
                        <div className="mt-2 text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                            {node.children.length} Reportees
                        </div>
                    )}
                </div>

                {/* Lines connecting to children */}
                {node.children && node.children.length > 0 && (
                    <>
                        {/* Vertical line down from parent */}
                        <div className="w-px h-6 bg-gray-300"></div>

                        {/* Horizontal connection line */}
                        <div className="flex justify-center relative">
                            {/* Top horizontal bar spanning children */}
                            {node.children.length > 1 && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gray-300"></div>
                            )}

                            {/* Children Container */}
                            <div className="flex pt-4 relative">
                                {/* 
                   We need connector logic: 
                   The horizontal line should technically connect the midpoints of the first and last child.
                   A simple flex row works for visual alignment. 
                */}
                                {node.children.map((child, index) => (
                                    <div key={child.id} className="flex flex-col items-center relative">
                                        {/* Vertical line up to the horizontal bar */}
                                        {/* 
                        CSS specific: We need a line up from each child to the common horizontal bar.
                        The root's vertical line connects to that bar.
                     */}
                                        <div className="flex flex-col items-center">

                                            {/* Connector UP from child */}
                                            <div className="w-px h-4 bg-gray-300 absolute -top-4"></div>

                                            {renderTreeNode(child)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    // NOTE: Simple CSS-only tree connectors are tricky. 
    // For a robust org chart, using a library like 'react-d3-tree' or 'react-orgchart' is better.
    // However, since we are building from scratch/cloning existing, 
    // I will use a simplified Flexbox approach or simulating the lines.
    // The recursive function above is a rough sketch. Let's refine the CSS for the lines in the `OrgNode` component below instead.

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">

            {/* --- Main Content Area --- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header Toolbar */}
                <div className="bg-white border-b px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 z-10 shadow-sm">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FiGrid className="text-blue-600" /> Organization Chart
                        </h1>
                        <p className="text-sm text-gray-500">
                            Visualizing {employees.length} employees
                        </p>
                    </div>

                    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode("chart")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === "chart" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <FiGrid className="inline mr-2" /> Chart
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === "list" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <FiList className="inline mr-2" /> List
                        </button>
                    </div>
                </div>

                {/* Filters & Controls */}
                <div className="bg-white px-6 py-3 border-b flex flex-wrap gap-4 items-center justify-between z-10">
                    {/* Left: Search & Filter */}
                    <div className="flex gap-3 flex-1 min-w-[200px]">
                        <div className="relative flex-1 max-w-sm">
                            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <FiFilter className="absolute left-3 top-2.5 text-gray-400" />
                            <select
                                className="pl-9 pr-8 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm cursor-pointer"
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                            >
                                {departments.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Right: Zoom Controls (Chart Mode Only) */}
                    {viewMode === "chart" && (
                        <div className="flex items-center gap-2">
                            <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded-full text-gray-600" title="Zoom Out"><FiZoomOut /></button>
                            <span className="text-sm font-medium w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                            <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded-full text-gray-600" title="Zoom In"><FiZoomIn /></button>
                            <button onClick={handleResetZoom} className="p-2 hover:bg-gray-100 rounded-full text-gray-600" title="Reset"><FiRotateCcw /></button>
                            <div className="h-6 w-px bg-gray-300 mx-2"></div>
                            <button onClick={handleDownload} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full" title="Export"><FiDownload /></button>
                        </div>
                    )}
                </div>

                {/* --- Content Area --- */}
                <div className="flex-1 overflow-auto bg-gray-50 relative p-8">

                    {viewMode === "chart" ? (
                        <div
                            className="min-w-fit min-h-fit flex justify-center origin-top transition-transform duration-200"
                            style={{ transform: `scale(${zoomLevel})` }}
                        >
                            {hierarchy.length > 0 ? (
                                <div className="flex gap-8">
                                    {hierarchy.map(rootNode => (
                                        <OrgNode key={rootNode.id} node={rootNode} onSelect={setSelectedNode} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-400 mt-20 flex flex-col items-center">
                                    <FiUser className="text-4xl mb-2" />
                                    No organization data found.
                                </div>
                            )}
                        </div>
                    ) : (
                        // List View
                        <div className="max-w-6xl mx-auto bg-white shadow rounded-lg overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100 text-gray-600 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="p-4">Employee</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Department</th>
                                        <th className="p-4">Manager</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {filteredList.map(emp => {
                                        const manager = employees.find(e => e.id === emp.managerId);
                                        return (
                                            <tr key={emp.id} onClick={() => setSelectedNode(emp)} className="hover:bg-blue-50 cursor-pointer transition">
                                                <td className="p-4 flex items-center gap-3">
                                                    <img src={emp.image} className="w-8 h-8 rounded-full bg-gray-200" />
                                                    <div>
                                                        <div className="font-semibold text-gray-800">{emp.name}</div>
                                                        <div className="text-gray-500 text-xs">{emp.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-700">{emp.position || emp.role}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{emp.department || 'N/A'}</span>
                                                </td>
                                                <td className="p-4 text-gray-600 text-xs">
                                                    {manager ? manager.name : <span className="text-gray-400 italic">None</span>}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {emp.status || 'Active'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {filteredList.length === 0 && (
                                        <tr><td colSpan="5" className="p-8 text-center text-gray-500">No employees found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Side Panel (Details) --- */}
            {selectedNode && (
                <div
                    className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 border-l overflow-y-auto transition-transform transform translate-x-0"
                >
                    <div className="p-6">
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="mb-4 text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm font-medium"
                        >
                            <FiChevronLeft /> Back to Chart
                        </button>

                        <div className="flex flex-col items-center mb-6">
                            <div className="relative">
                                <img src={selectedNode.image} className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 object-cover" alt="" />
                                <span className={`absolute bottom-4 right-1 w-5 h-5 border-2 border-white rounded-full ${selectedNode.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 text-center">{selectedNode.name}</h2>
                            <p className="text-blue-600 font-medium">{selectedNode.position}</p>
                            <p className="text-gray-500 text-sm mt-1">{selectedNode.department}</p>
                        </div>

                        <div className="space-y-4">
                            <DetailRow label="Employee ID" value={selectedNode.id} />
                            <DetailRow label="Email" value={selectedNode.email} />
                            <DetailRow label="Phone" value={selectedNode.phone} />
                            <DetailRow label="Location" value={selectedNode.location} />
                            <DetailRow label="Joined" value={selectedNode.joinDate} />

                            <div className="border-t pt-4 mt-4">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Reporting To</h4>
                                {(() => {
                                    const manager = employees.find(e => e.id === selectedNode.managerId);
                                    return manager ? (
                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                            <img src={manager.image} className="w-8 h-8 rounded-full" alt="" />
                                            <div>
                                                <div className="text-sm font-semibold">{manager.name}</div>
                                                <div className="text-xs text-gray-500">{manager.position}</div>
                                            </div>
                                        </div>
                                    ) : <div className="text-sm text-gray-400 italic">No Manager (Top Level)</div>
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};


/* =========================================================================
   SUB-COMPONENT: Recursive Tree Node with Lines
   ========================================================================= */

const OrgNode = ({ node, onSelect }) => {
    if (!node) return null;

    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">

            {/* 1. The Card */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(node);
                }}
                className="
          flex flex-col items-center p-4 bg-white rounded-xl shadow border border-gray-100 
          w-56 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all z-10 relative bg-white
        "
            >
                <div className="flex items-center gap-3 w-full">
                    <img src={node.image} className="w-10 h-10 rounded-full bg-gray-100 object-cover" alt="" />
                    <div className="flex-1 min-w-0 text-left">
                        <h4 className="text-sm font-bold text-gray-800 truncate">{node.name}</h4>
                        <p className="text-xs text-blue-600 truncate">{node.position}</p>
                    </div>
                </div>

                {/* Badges */}
                <div className="w-full flex justify-between mt-3 pt-2 border-t border-gray-50">
                    <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded">{node.department}</span>
                    {hasChildren && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                            {node.children.length} Reports
                        </span>
                    )}
                </div>
            </div>

            {/* 2. Children Generation (with Lines) */}
            {hasChildren && (
                <div className="flex flex-col items-center">
                    {/* Vertical line down from parent */}
                    <div className="w-px h-8 bg-gray-300"></div>

                    {/* Horizontal Wrapper */}
                    <div className="flex relative">
                        {/* 
                We render the children. 
                We also need a horizontal bar above them. 
                The bar should span from the center of the first child to the center of the last child.
             */}

                        {/* Horizontal Bar: absolute positioning trick based on child count */}
                        {node.children.length > 1 && (
                            <div className="absolute top-0 left-0 right-0 h-px bg-gray-300 mx-28">
                                {/* 
                      mx-28 is a rough approximation to start the line at the center of the cards. 
                      Since card width is w-56 (14rem ~ 224px), center is ~112px.
                      A safer way is using specific logic or a library, but CSS 'calc' or padding works.
                      Let's use a simpler structure: a container for each child that handles its own "up" line.
                  */}
                            </div>
                        )}

                        {/* Render Children */}
                        {node.children.map((child, index, arr) => {
                            const isFirst = index === 0;
                            const isLast = index === arr.length - 1;
                            const isOnly = arr.length === 1;

                            return (
                                <div key={child.id} className="flex flex-col items-center px-4 relative">

                                    {/* Horizontal Line Segment logic for this child's top area */}
                                    {!isOnly && (
                                        <div className={`absolute top-0 w-full h-px bg-gray-300 
                         ${isFirst ? "left-1/2 w-1/2" : ""} 
                         ${isLast ? "right-1/2 w-1/2 left-0" : ""}
                         ${(!isFirst && !isLast) ? "w-full" : ""}
                       `}></div>
                                    )}

                                    {/* Vertical line down to the child card */}
                                    <div className="w-px h-8 bg-gray-300"></div>

                                    {/* Recursion */}
                                    <OrgNode node={child} onSelect={onSelect} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
};

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50">
        <span className="text-gray-500 text-sm">{label}</span>
        <span className="text-gray-800 font-medium text-sm text-right">{value || "N/A"}</span>
    </div>
);

export default ChiefOrgChart;
