import React, { useState } from "react";
import {
    LuCalendar as Calendar,
    LuClock as Clock,
    LuMapPin as MapPin,
    LuCircleCheck as CheckCircle,
    LuCircleX as XCircle,
    LuLogOut as LogOut,
    LuHouse as Home,
    LuUser as User,
    LuUsers as Users,
    LuFileText as FileText,
    LuMessageSquare as MessageSquare,
    LuAward as Award,
    LuSearch as Search,
    LuChevronRight as ChevronRight,
    LuChevronLeft as ChevronLeft,
    LuBell as Bell,
    LuBookOpen as BookOpen,
    LuDollarSign as DollarSign,
    LuFileCheck as FileCheck,
    LuBuilding as Building,
    LuCake as Cake,
    LuPartyPopper as PartyPopper,
    LuFileDown as FileDown,
    LuIdCard as IdCard
} from "react-icons/lu";

const EmployeeDashboard = () => {
    // State Management
    const [checkedIn, setCheckedIn] = useState(true);
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    // Announcements
    const announcements = [
        {
            id: 1,
            title: "Company Townhall This Friday",
            description: "Join us for Q4 review and 2026 roadmap discussion at 3 PM in the main auditorium.",
            date: "2 hours ago",
            type: "meeting",
            read: false
        },
        {
            id: 2,
            title: "New Health Insurance Benefits",
            description: "Enhanced coverage effective from March 1st. Please review the updated policy documents.",
            date: "1 day ago",
            type: "benefits",
            read: false
        },
        {
            id: 7,
            title: "Annual Performance Reviews",
            description: "Please schedule your 1-on-1 with your manager before February 15th.",
            date: "2 days ago",
            type: "hr",
            read: true
        },
        {
            id: 8,
            title: "Product Launch Success",
            description: "Congrats to the dev team for the successful launch of Project 'Antigravity'!",
            date: "3 days ago",
            type: "celebration",
            read: true
        }
    ];

    // Work Anniversaries
    const workAnniversaries = [
        {
            id: 3,
            name: "Priya Sharma",
            department: "Marketing",
            years: 3,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
            thought: "Congratulations on 3 amazing years! Your creativity inspires us all.",
            date: "Today",
            read: false
        },
        {
            id: 4,
            name: "Rahul Verma",
            department: "Sales",
            years: 5,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
            thought: "5 years of excellence! Thank you for your dedication and hard work.",
            date: "Tomorrow",
            read: false
        },
        {
            id: 9,
            name: "Anjali Gupta",
            department: "HR Operations",
            years: 1,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali",
            thought: "Happy 1st work anniversary! Looking forward to many more years of collaboration.",
            date: "Feb 01",
            read: true
        },
        {
            id: 10,
            name: "Suresh Raina",
            department: "Engineering",
            years: 10,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh",
            thought: "A decade of brilliance! You've been a pillar of the engineering team.",
            date: "Feb 05",
            read: true
        }
    ];

    // Birthdays
    const birthdays = [
        {
            id: 5,
            name: "Rajesh Kumar",
            department: "Finance",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
            thought: "Wishing you a fantastic birthday filled with joy and success!",
            date: "Today",
            read: false
        },
        {
            id: 6,
            name: "Meera Nair",
            department: "Design",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
            thought: "Happy Birthday! May your year be as creative and beautiful as your designs.",
            date: "Tomorrow",
            read: false
        },
        {
            id: 11,
            name: "Vikram Seth",
            department: "Product",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
            thought: "Have a wonderful birthday, Vikram! Hope you have a great year ahead.",
            date: "Feb 03",
            read: true
        },
        {
            id: 12,
            name: "Sneha Reddy",
            department: "QA",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha",
            thought: "Warmest birthday wishes to our QA champion! Enjoy your special day.",
            date: "Feb 10",
            read: true
        }
    ];

    // Team Members Status
    const teamMembers = [
        {
            id: 1,
            name: "Akshay Thalkari",
            department: "Software Development",
            position: "Senior Developer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=akshay",
            status: "online",
            lastSeen: "Active now"
        },
        {
            id: 2,
            name: "Priya Sharma",
            department: "Marketing",
            position: "Marketing Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
            status: "online",
            lastSeen: "Active now"
        },
        {
            id: 3,
            name: "Rahul Verma",
            department: "Sales",
            position: "Sales Executive",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
            status: "online",
            lastSeen: "Active now"
        },
        {
            id: 4,
            name: "Rajesh Kumar",
            department: "Finance",
            position: "Financial Analyst",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
            status: "offline",
            lastSeen: "2 hours ago"
        },
        {
            id: 5,
            name: "Meera Nair",
            department: "Design",
            position: "UI/UX Designer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
            status: "online",
            lastSeen: "Active now"
        },
        {
            id: 6,
            name: "Anjali Gupta",
            department: "HR Operations",
            position: "HR Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali",
            status: "offline",
            lastSeen: "1 day ago"
        },
        {
            id: 7,
            name: "Suresh Raina",
            department: "Engineering",
            position: "Tech Lead",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh",
            status: "online",
            lastSeen: "Active now"
        },
        {
            id: 8,
            name: "Vikram Seth",
            department: "Product",
            position: "Product Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
            status: "offline",
            lastSeen: "30 mins ago"
        },
        {
            id: 9,
            name: "Sneha Reddy",
            department: "QA",
            position: "QA Engineer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha",
            status: "online",
            lastSeen: "Active now"
        },
        {
            id: 10,
            name: "Ramesh Kumar",
            department: "Management",
            position: "Team Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramesh",
            status: "offline",
            lastSeen: "5 hours ago"
        },
        {
            id: 10,
            name: "Ramesh Kumar",
            department: "Management",
            position: "Team Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramesh",
            status: "offline",
            lastSeen: "5 hours ago"
        },
        {
            id: 10,
            name: "Ramesh Kumar",
            department: "Management",
            position: "Team Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ramesh",
            status: "offline",
            lastSeen: "5 hours ago"
        }
    ];

    // Now we can calculate notificationCount
    const [notificationCount, setNotificationCount] = useState(
        announcements.length + birthdays.length + workAnniversaries.length
    );

    // Employee data
    const employeeData = {
        name: "Akshay Thalkari",
        employeeId: "EMP12345",
        department: "Software Development",
        position: "Senior Developer",
        email: "akshay.thalkari@revappayya.com",
        phone: "+91 98765 43210",
        joiningDate: "2022-05-15",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=akshay",
        location: "Bangalore, India",
        manager: "Ramesh Kumar"
    };

    // Company Info
    const companyInfo = {
        name: "SUCCESS FACTOR",
        tagline: "Revappayya IT Services Pvt Ltd"
    };

    // Attendance data
    const attendanceData = {
        presentDays: 20,
        totalDays: 22,
        absentDays: 2,
        leaveDays: 3,
        lateDays: 1
    };

    // Leave data
    const leaveData = {
        casual: { label: "Casual Leave", description: "Personal reasons", total: 12, used: 4, pending: 8, icon: Calendar, color: "bg-blue-600" },
        sick: { label: "Sick Leave", description: "Medical & health", total: 10, used: 2, pending: 8, icon: User, color: "bg-green-500" },
        earned: { label: "Earned Leave", description: "Accumulated over time", total: 15, used: 3, pending: 12, icon: Award, color: "bg-purple-500" },
        maternity: { label: "Maternity Leave", description: "Family expansion", total: 180, used: 0, pending: 180, icon: Users, color: "bg-rose-500" },
        paternity: { label: "Paternity Leave", description: "New parent time", total: 15, used: 0, pending: 15, icon: Users, color: "bg-amber-500" }
    };

    // Quick actions
    const quickActions = [
        { id: 1, name: 'Attendance', icon: Calendar },
        { id: 2, name: 'Apply Leave', icon: FileText },
        { id: 3, name: 'Feedback', icon: MessageSquare },
        { id: 4, name: 'Org Chart', icon: Users },
        { id: 5, name: 'Basic Info', icon: User },
        { id: 6, name: 'Learning', icon: BookOpen },
        { id: 7, name: 'Payslip', icon: DollarSign },
        { id: 8, name: 'Download CTC', icon: FileDown },
        { id: 9, name: 'Documents', icon: FileCheck }
    ];

    // Calendar functionality
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const getMonthYearString = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    // Generate calendar for current month
    const generateCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        // Previous month's days
        const prevMonthDays = getDaysInMonth(year, month - 1);
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                date: prevMonthDays - i,
                currentMonth: false,
                type: 'prev'
            });
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayType = getDayType(i);
            days.push({
                date: i,
                currentMonth: true,
                type: dayType.type,
                label: dayType.label,
                color: dayType.color,
                textColor: dayType.textColor
            });
        }

        // Next month's days
        const totalCells = 42; // 6 weeks * 7 days
        const nextMonthDays = totalCells - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                date: i,
                currentMonth: false,
                type: 'next'
            });
        }

        return days;
    };

    // Get day type - Updated with Public Holiday
    const getDayType = (date) => {
        const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date).getDay();
        const isWeekend = day === 0 || day === 6;

        // Simulate attendance data
        const today = new Date();
        const isToday =
            date === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();

        // Sample data for different day types
        if (isToday) return {
            type: 'today',
            label: 'Today',
            color: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-700'
        };
        if (date === 15 || date === 26) return {
            type: 'public_holiday',
            label: 'Public Holiday',
            color: 'bg-red-50 border-red-200',
            textColor: 'text-red-700'
        };
        // Absent and Leave use same color
        if (date === 13 || date === 20 || date === 27 || date === 28) return {
            type: 'absent_leave',
            label: date === 13 || date === 20 ? 'Absent' : 'On Leave',
            color: 'bg-gray-50 border-gray-200',
            textColor: 'text-gray-700'
        };
        if (date === 7 || date === 14) return {
            type: 'late',
            label: 'Late Login',
            color: 'bg-yellow-50 border-yellow-200',
            textColor: 'text-yellow-700'
        };
        if (isWeekend) return {
            type: 'weekend',
            label: 'Weekend',
            color: 'bg-gray-50 border-gray-200',
            textColor: 'text-gray-500'
        };

        // Default present days
        return {
            type: 'present',
            label: 'Present',
            color: 'bg-green-50 border-green-200',
            textColor: 'text-green-700'
        };
    };

    // Calendar navigation
    const navigateMonth = (direction) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + direction);
        setCurrentMonth(newDate);
    };

    // Handle date click
    const handleDateClick = (day) => {
        if (day.currentMonth) {
            const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
            setSelectedDate(clickedDate);
        }
    };

    // Handle calendar icon click
    const handleCalendarIconClick = () => {
        setShowYearMonthPicker(!showYearMonthPicker);
        setSelectedYear(currentMonth.getFullYear());
        setSelectedMonth(currentMonth.getMonth());
    };

    // Handle year/month selection
    const handleYearMonthSelect = (year, month) => {
        const newDate = new Date(year, month, 1);
        setCurrentMonth(newDate);
        setShowYearMonthPicker(false);
    };

    // Get status icon - Updated with Public Holiday
    const getStatusIcon = (status) => {
        switch (status) {
            case 'present': return <div className="w-2 h-2 rounded-full bg-green-400" />;
            case 'absent_leave': return <div className="w-2 h-2 rounded-full bg-gray-400" />;
            case 'late': return <div className="w-2 h-2 rounded-full bg-yellow-400" />;
            case 'public_holiday': return <div className="w-2 h-2 rounded-full bg-red-400" />;
            default: return null;
        }
    };

    // Calendar days
    const calendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarData = generateCalendar();

    // Months list
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate years list (current year ± 2)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

    // Profile Details Component
    const ProfileDetails = () => (
        <div className="absolute top-16 right-4 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
            <div className="flex items-start mb-4">
                <img
                    src={employeeData.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-200"
                />
                <div className="ml-3 flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{employeeData.name}</h3>
                    <p className="text-xs text-gray-600">{employeeData.position}</p>
                    <div className="flex items-center mt-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                        <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 text-xs">
                <div className="flex items-center">
                    <User className="w-3.5 h-3.5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-gray-500">Employee ID</p>
                        <p className="font-medium text-gray-800">{employeeData.employeeId}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Building className="w-3.5 h-3.5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-gray-500">Department</p>
                        <p className="font-medium text-gray-800">{employeeData.department}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Users className="w-3.5 h-3.5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-gray-500">Manager</p>
                        <p className="font-medium text-gray-800">{employeeData.manager}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 mr-3" />
                    <div>
                        <p className="text-gray-500">Join Date</p>
                        <p className="font-medium text-gray-800">{employeeData.joiningDate}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setShowProfileDetails(false)}
                className="w-full mt-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Close
            </button>
        </div>
    );

    // YearMonth Picker Component
    const YearMonthPicker = () => (
        <div className="absolute top-16 right-4 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
            <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Select Month & Year</h3>

                <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1.5">Year</p>
                    <div className="grid grid-cols-3 gap-1">
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`p-1.5 text-xs rounded border ${selectedYear === year
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-1.5">Month</p>
                    <div className="grid grid-cols-3 gap-1">
                        {months.map((month, index) => (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(index)}
                                className={`p-1.5 text-xs rounded border ${selectedMonth === index
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {month.substring(0, 3)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setShowYearMonthPicker(false)}
                        className="flex-1 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleYearMonthSelect(selectedYear, selectedMonth)}
                        className="flex-1 py-2 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );

    // Notification Component
    const NotificationComponent = () => (
        <div className="absolute top-16 right-4 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-50 p-4">
            <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Notifications ({notificationCount})</h3>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {/* Announcements in notifications */}
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="flex items-start p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors">
                            <div className={`p-1.5 rounded mr-2 ${announcement.type === 'meeting' ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'
                                }`}>
                                <Bell className={`w-3 h-3 ${announcement.type === 'meeting' ? 'text-blue-600' : 'text-green-600'
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 text-xs mb-0.5">{announcement.title}</h3>
                                <p className="text-xs text-gray-600">{announcement.description}</p>
                                <span className="text-xs text-gray-400 mt-0.5 block">{announcement.date}</span>
                            </div>
                        </div>
                    ))}

                    {/* Work Anniversaries in notifications */}
                    {workAnniversaries.map((anniversary) => (
                        <div key={anniversary.id} className="flex items-start p-2 border border-gray-100 rounded hover:bg-yellow-50 transition-colors">
                            <div className="p-1.5 rounded mr-2 bg-yellow-50 border border-yellow-200">
                                <PartyPopper className="w-3 h-3 text-yellow-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 text-xs mb-0.5">Work Anniversary: {anniversary.name}</h3>
                                <p className="text-xs text-gray-600">{anniversary.thought}</p>
                                <span className="text-xs text-gray-400 mt-0.5 block">{anniversary.date} • {anniversary.years} year{anniversary.years > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    ))}

                    {/* Birthdays in notifications */}
                    {birthdays.map((birthday) => (
                        <div key={birthday.id} className="flex items-start p-2 border border-gray-100 rounded hover:bg-pink-50 transition-colors">
                            <div className="p-1.5 rounded mr-2 bg-pink-50 border border-pink-200">
                                <Cake className="w-3 h-3 text-pink-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 text-xs mb-0.5">Birthday: {birthday.name}</h3>
                                <p className="text-xs text-gray-600">{birthday.thought}</p>
                                <span className="text-xs text-gray-400 mt-0.5 block">{birthday.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => {
                    setNotificationCount(0);
                }}
                className="w-full py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Mark All as Read
            </button>
        </div>
    );

    // Bottom Navigation - Updated order: Home, ID Card, Logout
    const bottomNavItems = [
        { name: "Home", icon: Home },
        { name: "ID Card", icon: IdCard },
        { name: "Log Out", icon: LogOut },
    ];

    // Handle notification click
    const [showNotifications, setShowNotifications] = useState(false);
    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    // Handle check in/out
    const handleCheckOut = () => {
        setCheckedIn(false);
        alert('Successfully checked out for the day!');
    };

    const handleCheckIn = () => {
        setCheckedIn(true);
        alert('Successfully checked in for the day!');
    };

    // Handle quick action
    const handleQuickAction = (actionName) => {
        if (actionName === 'Download CTC') {
            alert('CTC document download started!');
        } else {
            alert(`Opening ${actionName} page...`);
            setCurrentView(actionName.toLowerCase().replace(' ', '-'));
        }
    };

    // Render Dashboard
    const renderDashboard = () => (
        <>
            {/* Today's Work Status */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                            Today's Work Status
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 font-medium">Your daily attendance performance</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${checkedIn ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                        <span className={`w-2 h-2 rounded-full ${checkedIn ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        {checkedIn ? 'Active Now' : 'Signed Out'}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Check-in Time */}
                    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-3 border border-gray-100 hover:border-blue-200 hover:scale-[1.02] transition-all duration-300 shadow-sm group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-blue-100/50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <Clock className="w-4 h-4 text-blue-600 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">MORNING</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Check-in</p>
                        <p className="text-xl font-extrabold text-gray-800">09:15 <span className="text-xs font-medium text-gray-400 uppercase">am</span></p>
                        <div className="mt-2 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-[10px] font-semibold text-green-600">On time today</span>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl p-3 border border-gray-100 hover:border-purple-200 hover:scale-[1.02] transition-all duration-300 shadow-sm group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-purple-100/50 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <Clock className="w-4 h-4 text-purple-600 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">LOGGED</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Work Duration</p>
                        <p className="text-xl font-extrabold text-gray-800">8h <span className="text-lg text-gray-400">45m</span></p>
                        <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[85%] rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-xl p-3 border border-gray-100 hover:border-emerald-200 hover:scale-[1.02] transition-all duration-300 shadow-sm group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-emerald-100/50 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                <MapPin className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">VERIFIED</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                        <p className="text-xl font-extrabold text-gray-800">HQ Office</p>
                        <p className="text-[10px] font-medium text-gray-500 mt-1">Bangalore Tech Park</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mb-5">
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                        Quick Actions
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Access your productivity tools instantly</p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                    {quickActions.map((action) => (
                        <button
                            key={action.id}
                            onClick={() => handleQuickAction(action.name)}
                            className="group flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-50 hover:border-indigo-100 hover:bg-gradient-to-b hover:from-white hover:to-indigo-50/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300"
                        >
                            <div className="relative p-3 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-sm border border-transparent group-hover:border-indigo-100">
                                <action.icon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity"></div>
                            </div>
                            <span className="font-bold text-gray-700 text-[10px] mt-2.5 text-center leading-tight tracking-tight group-hover:text-indigo-700 transition-colors uppercase italic">
                                {action.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-start">
                {/* Left Column - Calendar & Team Status */}
                <div className="space-y-4">
                    {/* Attendance Calendar */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 relative shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-emerald-600 rounded-full"></div>
                                    Attendance Calendar
                                </h2>
                                <p className="text-xs text-gray-500 mt-1 font-medium italic">{getMonthYearString(currentMonth)}</p>
                            </div>
                            <button
                                onClick={handleCalendarIconClick}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-emerald-100 shadow-sm"
                            >
                                <Calendar className="w-4 h-4" />
                            </button>
                        </div>

                        {showYearMonthPicker && <YearMonthPicker />}

                        <div className="flex items-center justify-between mb-4 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-1.5 bg-white hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-lg transition-all duration-300 border border-gray-100 shadow-sm"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="font-extrabold text-gray-700 text-xs tracking-widest uppercase">
                                {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>

                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-1.5 bg-white hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-lg transition-all duration-300 border border-gray-100 shadow-sm"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1.5 mb-4">
                            {calendarDays.map(day => (
                                <div key={day} className="text-center font-bold text-gray-400 text-[10px] py-2 uppercase tracking-tighter">
                                    {day}
                                </div>
                            ))}

                            {calendarData.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                                        p-1.5 rounded-xl text-xs transition-all duration-300
                                        ${day.currentMonth ? day.color : 'bg-gray-50/50 text-gray-300 border-transparent'}
                                        ${day.currentMonth ? 'hover:scale-105 hover:shadow-sm cursor-pointer border' : 'cursor-default opacity-40'}
                                        flex flex-col items-center justify-center min-h-[3rem] relative overflow-hidden group
                                    `}
                                >
                                    <span className={`text-[11px] font-bold ${day.textColor} ${day.type === 'today' ? 'scale-110' : ''}`}>
                                        {day.date}
                                    </span>
                                    {day.currentMonth && (
                                        <div className="mt-1 transition-transform group-hover:scale-125">
                                            {getStatusIcon(day.type)}
                                        </div>
                                    )}
                                    {day.type === 'today' && (
                                        <div className="absolute top-1 right-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Calendar Legend */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-2 bg-green-50/50 px-2 py-1.5 rounded-lg border border-green-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">Present</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Absent</span>
                            </div>
                            <div className="flex items-center gap-2 bg-yellow-50/50 px-2 py-1.5 rounded-lg border border-yellow-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                                <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-tighter">Late</span>
                            </div>
                            <div className="flex items-center gap-2 bg-red-50/50 px-2 py-1.5 rounded-lg border border-red-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                                <span className="text-[10px] font-bold text-red-700 uppercase tracking-tighter">Holiday</span>
                            </div>
                        </div>
                    </div>

                    {/* Team Status - Online/Offline Members */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                    Team Status
                                </h2>
                                <p className="text-xs text-gray-500 mt-1 font-medium italic">Real-time availability</p>
                            </div>

                            {/* Online/Offline Count Badges */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Online</span>
                                    <span className="ml-1 px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full">
                                        {teamMembers.filter(m => m.status === 'online').length}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase">Offline</span>
                                    <span className="ml-1 px-1.5 py-0.5 bg-gray-600 text-white text-[10px] font-bold rounded-full">
                                        {teamMembers.filter(m => m.status === 'offline').length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className={`group relative flex items-center p-2 bg-white border rounded-lg transition-all duration-300 ${member.status === 'online'
                                        ? 'border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/30'
                                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/30'
                                        }`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${member.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'
                                            }`}>
                                            {member.status === 'online' && (
                                                <div className="w-full h-full rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-2 flex-1 min-w-0">
                                        <h3 className="text-xs font-bold text-gray-900 truncate tracking-tight leading-tight">{member.name}</h3>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                                            {member.lastSeen}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats & Leave Overview */}
                <div className="space-y-4">
                    {/* Attendance Summary */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="mb-4">
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                                Monthly Summary
                            </h2>
                            <p className="text-xs text-gray-500 mt-1 font-medium italic">Overview for this month</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-white to-green-50/20 rounded-xl p-3 border border-gray-100 hover:border-green-200 transition-all shadow-sm group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-green-100/50 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                        <CheckCircle className="w-3.5 h-3.5 text-green-600 group-hover:text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-green-600">{attendanceData.presentDays}d</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">Present</p>
                                <p className="text-lg font-black text-gray-800">{attendanceData.presentDays}</p>
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(attendanceData.presentDays / attendanceData.totalDays) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white to-blue-50/20 rounded-xl p-3 border border-gray-100 hover:border-blue-200 transition-all shadow-sm group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-blue-100/50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <Calendar className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-600">{attendanceData.leaveDays}d</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">Leave</p>
                                <p className="text-lg font-black text-gray-800">{attendanceData.leaveDays}</p>
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(attendanceData.leaveDays / attendanceData.totalDays) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white to-yellow-50/20 rounded-xl p-3 border border-gray-100 hover:border-yellow-200 transition-all shadow-sm group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-yellow-100/50 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                                        <Clock className="w-3.5 h-3.5 text-yellow-600 group-hover:text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-yellow-600">{attendanceData.lateDays}d</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">Late</p>
                                <p className="text-lg font-black text-gray-800">{attendanceData.lateDays}</p>
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(attendanceData.lateDays / attendanceData.totalDays) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white to-red-50/20 rounded-xl p-3 border border-gray-100 hover:border-red-200 transition-all shadow-sm group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-1.5 bg-red-100/50 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                        <XCircle className="w-3.5 h-3.5 text-red-600 group-hover:text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-red-600">{attendanceData.absentDays}d</span>
                                </div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-left">Absent</p>
                                <p className="text-lg font-black text-gray-800">{attendanceData.absentDays}</p>
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${(attendanceData.absentDays / attendanceData.totalDays) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leave Overview */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                        <div className="mb-4">
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                                Entitlement Overview
                            </h2>
                            <p className="text-xs text-gray-500 mt-1 font-medium italic">Your available leave balances</p>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                            {Object.entries(leaveData).map(([key, data]) => (
                                <div key={key} className="bg-white rounded-xl p-3 border border-gray-100 hover:border-indigo-100/50 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 border border-gray-100">
                                                <data.icon className="w-3.5 h-3.5 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-xs">{data.label}</p>
                                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{data.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-gray-900">{data.pending}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase">Left</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                                        <span className="text-gray-400">USED: {data.used}</span>
                                        <span className="text-indigo-600">TOTAL: {data.total}</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                                        <div
                                            className={`h-full ${data.color} rounded-full transition-all duration-500 shadow-sm`}
                                            style={{ width: `${(data.used / data.total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Work Anniversaries & Birthdays Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Work Anniversaries */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                Work Anniversaries
                            </h2>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Celebrating career milestones</p>
                        </div>
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
                            <PartyPopper className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {workAnniversaries.map((anniversary, index) => (
                            <div key={index} className="group relative flex items-center p-3 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                                        <img
                                            src={anniversary.avatar}
                                            alt={anniversary.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <Award className="w-2 h-2 text-white" />
                                    </div>
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="text-xs font-bold text-gray-900 truncate tracking-tight">{anniversary.name}</h3>
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/50 px-2 py-0.5 rounded-full border border-indigo-100/30">
                                            {anniversary.years}Y
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1.5">{anniversary.department}</p>
                                    <p className="text-[11px] text-gray-600 line-clamp-1 italic font-medium">"{anniversary.thought}"</p>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-400 ml-2 transition-colors" />
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-5 py-2.5 text-center text-indigo-600 text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-indigo-100/50 active:scale-[0.98]">
                        Full Milestones List
                    </button>
                </div>

                {/* Birthdays */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                Birthday Highlights
                            </h2>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">Special day celebrations</p>
                        </div>
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
                            <Cake className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {birthdays.map((birthday, index) => (
                            <div key={index} className="group relative flex items-center p-3 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                                        <img
                                            src={birthday.avatar}
                                            alt={birthday.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <Cake className="w-2 h-2 text-white" />
                                    </div>
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="text-xs font-bold text-gray-900 truncate tracking-tight">{birthday.name}</h3>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                            {birthday.date}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-2">{birthday.department}</p>
                                    <button className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all shadow-sm">
                                        <MessageSquare className="w-2.5 h-2.5" />
                                        Wish Joy
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-5 py-2.5 text-center text-indigo-600 text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-indigo-100/50 active:scale-[0.98]">
                        View Birthday Calendar
                    </button>
                </div>
            </div>

            {/* Announcements Row */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="mb-5">
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                        Company Announcements
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-medium italic">Stay updated with the latest news</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="group relative flex items-start p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all duration-300">
                            <div className={`p-3 rounded-xl mr-4 flex-shrink-0 transition-all duration-300 ${announcement.type === 'meeting'
                                ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                                }`}>
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900 text-xs truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{announcement.title}</h3>
                                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-2">{announcement.date}</span>
                                </div>
                                <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2 font-medium">{announcement.description}</p>
                            </div>
                            <div className="ml-2 flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="w-4 h-4 text-indigo-400" />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-5 py-3 text-center text-indigo-600 text-[11px] font-black uppercase tracking-widest hover:text-white hover:bg-indigo-600 rounded-xl transition-all duration-300 border border-indigo-200 shadow-sm">
                    View Comprehensive Archive
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-3">
                {currentView === 'dashboard' ? renderDashboard() : (
                    <div className="bg-white rounded-lg border border-gray-100 p-4 text-center">
                        <h2 className="text-sm font-semibold text-gray-800 mb-2">
                            {quickActions.find(a => a.name.toLowerCase().replace(' ', '-') === currentView)?.name || currentView} Page
                        </h2>
                        <p className="text-xs text-gray-600 mb-3">This page would open with full details when implemented.</p>
                        <button
                            onClick={() => setCurrentView('dashboard')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-2 px-4">
                <div className="grid grid-cols-3 gap-2">
                    {bottomNavItems.map((item, index) => (
                        <button
                            key={index}
                            className={`flex flex-col items-center justify-center hover:opacity-80 transition-opacity ${item.name === "Home" ? "order-1" :
                                item.name === "ID Card" ? "order-2" : "order-3"
                                }`}
                            onClick={() => {
                                if (item.name === "Home") setCurrentView('dashboard');
                                else if (item.name === "Log Out") {
                                    if (window.confirm('Are you sure you want to logout?')) {
                                        alert('Logged out successfully!');
                                    }
                                } else {
                                    alert(`Opening ${item.name} page...`);
                                }
                            }}
                        >
                            <div className={`p-1.5 rounded-lg mb-0.5 ${item.name === "Home" ? 'bg-blue-100 border border-blue-200' :
                                item.name === "ID Card" ? 'bg-purple-100 border border-purple-200' :
                                    'bg-gray-100 border border-gray-200'
                                }`}>
                                <item.icon className="w-3.5 h-3.5 text-gray-600" />
                            </div>
                            <span className={`text-xs font-medium text-gray-600`}>{item.name}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <footer className="pb-16 pt-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0 text-xs text-gray-500">
                        <div>
                            <p>© 2024 {companyInfo.name}. All rights reserved.</p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span>ENG</span>
                            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                            <span>IN</span>
                            <span>{new Date().toLocaleDateString('en-GB').split('/').join('-')}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EmployeeDashboard;
