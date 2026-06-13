import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  KanbanSquare, 
  DollarSign, 
  MousePointerClick, 
  RefreshCw, 
  Database, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  Trash2, 
  Lock, 
  LogOut, 
  User, 
  Sliders, 
  FileSpreadsheet, 
  Calendar, 
  Layers, 
  Globe, 
  Bell,
  Coins,
  Hourglass,
  BarChart3,
  Trophy,
  Settings,
  Search,
  Moon,
  Sun,
  Download,
  Eye,
  Edit3,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  Zap,
  Shield,
  PieChart,
  TrendingDown
} from 'lucide-react';

// === CONSTANTS & UTILS ===
const STORAGE_KEY = 'agencyos_pro_data';
const TASK_PRESETS = [
  { id: 'pr_web', label: 'Bikin Web (60 Menit)', rate: 1000000, minutes: 60 },
  { id: 'pr_domain', label: 'Cari Domain (15 Menit)', rate: 50000, minutes: 15 },
  { id: 'pr_ads', label: 'Riset Iklan (30 Menit)', rate: 150000, minutes: 30 },
  { id: 'pr_design', label: 'Desain UI/UX (45 Menit)', rate: 400000, minutes: 45 }
];

// Helper Functions
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID');

// === INITIAL DATA ===
const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  
  return {
    clients: [
      { id: 'c1', name: 'Budi Santoso', company: 'PT Maju Bersama', email: 'budi@majubersama.com', phone: '0812-3456-7890', website: 'https://majubersama.com', status: 'Aktif', totalDeal: 25000000, paidAmount: 15000000, clicks: 342, createdAt: '2026-01-15' },
      { id: 'c2', name: 'Siti Rahma', company: 'CV Berkah Abadi', email: 'siti@berkahabadi.co.id', phone: '0813-9876-5432', website: 'https://berkahabadi.co.id', status: 'Aktif', totalDeal: 18000000, paidAmount: 18000000, clicks: 128, createdAt: '2026-02-10' },
      { id: 'c3', name: 'Andi Wijaya', company: 'Toko Elektronik Kita', email: 'andi@tokokita.com', phone: '0857-1122-3344', website: 'https://tokokita.com', status: 'Kritis', totalDeal: 45000000, paidAmount: 10000000, clicks: 890, createdAt: '2026-01-20' }
    ],
    projects: [
      { id: 'p1', name: 'Rebranding & Web Corporate', clientId: 'c1', progress: 65, status: 'Sedang Berjalan', value: 25000000, month: '2026-06', createdAt: '2026-05-01' },
      { id: 'p2', name: 'Sistem Inventory Toko', clientId: 'c3', progress: 20, status: 'Harus Dikerjakan', value: 45000000, month: '2026-06', createdAt: '2026-05-15' },
      { id: 'p3', name: 'E-Commerce Website Update', clientId: 'c2', progress: 100, status: 'Selesai', value: 18000000, month: '2026-06', createdAt: '2026-04-10' }
    ],
    tasks: [
      { id: 't1', title: 'Setup Hosting & Domain Klien', projectId: 'p1', priority: 'Tinggi', status: 'Prioritas Utama', dueDate: '2026-06-20', assignedTo: 'Nasir', executorFee: 500000, timeSpent: 30, completedAt: null, taskType: 'Domain', createdAt: '2026-06-01' },
      { id: 't2', title: 'Desain Wireframe & UI/UX Landing Page', projectId: 'p1', priority: 'Sedang', status: 'Sedang Berjalan', dueDate: '2026-06-25', assignedTo: 'Nikita', executorFee: 400000, timeSpent: 45, completedAt: null, taskType: 'Desain', createdAt: '2026-06-02' },
      { id: 't3', title: 'Mencari Domain & Name Server Terbaik', projectId: 'p1', priority: 'Tinggi', status: 'Harus Dikerjakan', dueDate: '2026-06-18', assignedTo: null, executorFee: 50000, timeSpent: 15, completedAt: null, taskType: 'Domain', createdAt: '2026-06-05' },
      { id: 't4', title: 'Slicing Frontend & Integrasi Database', projectId: 'p3', priority: 'Tinggi', status: 'Selesai', dueDate: '2026-06-10', assignedTo: 'Nikita', executorFee: 1000000, timeSpent: 60, completedAt: '2026-06-12', taskType: 'Web', createdAt: '2026-06-01' }
    ],
    domains: [
      { id: 'd1', domainName: 'majubersama.com', expiryDate: '2026-07-15', provider: 'Niagahoster', clicks: 342, createdAt: '2026-01-01' },
      { id: 'd2', domainName: 'tokokita.com', expiryDate: '2026-06-28', provider: 'Domainesia', clicks: 890, createdAt: '2026-01-01' }
    ],
    team: [
      { id: 'tm1', name: 'Nasir', role: 'Maker', email: 'nasir@agency.com', phone: '08123456789', joinDate: '2025-01-01', totalTasksCompleted: 45, totalEarnings: 15000000 },
      { id: 'tm2', name: 'Nikita', role: 'Executor', email: 'nikita@agency.com', phone: '081298765432', joinDate: '2025-06-01', totalTasksCompleted: 32, totalEarnings: 12500000 },
      { id: 'tm3', name: 'Bambang', role: 'Executor', email: 'bambang@agency.com', phone: '081355577788', joinDate: '2026-01-15', totalTasksCompleted: 12, totalEarnings: 3500000 }
    ],
    activityLog: []
  };
};

// === MAIN APP COMPONENT ===
export default function App() {
  // Authentication
  const [user, setUser] = useState(null);
  const [loginNameInput, setLoginNameInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Data State
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [domains, setDomains] = useState([]);
  const [team, setTeam] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMonth, setSelectedMonth] = useState('Semua');
  const [showToast, setShowToast] = useState(null);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Modal States
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, type: '', id: '', name: '' });
  
  // Form States
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '', phone: '', website: '', status: 'Aktif', totalDeal: '', paidAmount: '' });
  const [newProject, setNewProject] = useState({ name: '', clientId: '', progress: 0, status: 'Harus Dikerjakan', value: '', month: new Date().toISOString().slice(0, 7) });
  const [newTask, setNewTask] = useState({ title: '', projectId: '', priority: 'Sedang', status: 'Harus Dikerjakan', dueDate: '', executorFee: 50000, timeSpent: 15, taskType: 'Domain' });
  const [newDomain, setNewDomain] = useState({ domainName: '', expiryDate: '', provider: '' });
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: 'Executor', email: '', phone: '' });
  
  // Claim Task State
  const [claimingTaskId, setClaimingTaskId] = useState(null);
  const [minutesSpentInput, setMinutesSpentInput] = useState('');
  const [claimRewardValue, setClaimRewardValue] = useState(0);
  
  // AI Analysis State
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Date Range Filter
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Load data from localStorage on mount
  useEffect(() => {
    const data = getInitialData();
    setClients(data.clients);
    setProjects(data.projects);
    setTasks(data.tasks);
    setDomains(data.domains);
    setTeam(data.team);
    setActivityLog(data.activityLog || []);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (clients.length || projects.length || tasks.length) {
      const dataToSave = { clients, projects, tasks, domains, team, activityLog };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [clients, projects, tasks, domains, team, activityLog]);

  // Add activity log helper
  const addActivityLog = useCallback((action, details) => {
    const newLog = {
      id: generateId(),
      action,
      details,
      user: user?.name || 'System',
      timestamp: new Date().toISOString(),
      userRole: user?.role || 'System'
    };
    setActivityLog(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, [user]);

  // Toast helper
  const triggerToast = useCallback((message, type = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 4000);
  }, []);

  // Login handler
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    const trimmed = loginNameInput.trim();
    if (!trimmed) return;

    // Simple auth - in production, this should be replaced with proper authentication
    if (trimmed.toLowerCase() === 'nasir' && loginPassword === 'admin123') {
      setUser({ name: 'Nasir', role: 'Maker', email: 'nasir@agency.com' });
      triggerToast('Selamat Datang Nasir!', 'success');
      addActivityLog('LOGIN', 'Maker login successful');
    } else if (team.some(m => m.name.toLowerCase() === trimmed.toLowerCase())) {
      const member = team.find(m => m.name.toLowerCase() === trimmed.toLowerCase());
      setUser({ name: member.name, role: member.role, email: member.email });
      triggerToast(`Halo ${member.name}, selamat bekerja!`, 'success');
      addActivityLog('LOGIN', `${member.name} logged in`);
    } else {
      triggerToast('Username atau password salah!', 'error');
    }
  }, [loginNameInput, loginPassword, team, triggerToast, addActivityLog]);

  // Logout
  const handleLogout = useCallback(() => {
    addActivityLog('LOGOUT', `${user?.name} logged out`);
    setUser(null);
    setLoginNameInput('');
    setLoginPassword('');
    setAiAnalysis('');
    triggerToast('Keluar sistem berhasil.', 'info');
  }, [user, addActivityLog, triggerToast]);

  // Delete confirmation handlers
  const confirmDelete = (type, id, name) => {
    setDeleteConfirmation({ show: true, type, id, name });
  };

  const executeDelete = () => {
    const { type, id } = deleteConfirmation;
    
    switch (type) {
      case 'client':
        setClients(prev => prev.filter(c => c.id !== id));
        addActivityLog('DELETE_CLIENT', `Deleted client: ${deleteConfirmation.name}`);
        triggerToast('Klien berhasil dihapus');
        break;
      case 'project':
        setProjects(prev => prev.filter(p => p.id !== id));
        addActivityLog('DELETE_PROJECT', `Deleted project: ${deleteConfirmation.name}`);
        triggerToast('Proyek berhasil dihapus');
        break;
      case 'task':
        setTasks(prev => prev.filter(t => t.id !== id));
        addActivityLog('DELETE_TASK', `Deleted task: ${deleteConfirmation.name}`);
        triggerToast('Tugas berhasil dihapus');
        break;
      case 'domain':
        setDomains(prev => prev.filter(d => d.id !== id));
        addActivityLog('DELETE_DOMAIN', `Deleted domain: ${deleteConfirmation.name}`);
        triggerToast('Domain berhasil dihapus');
        break;
      case 'team':
        setTeam(prev => prev.filter(m => m.id !== id));
        addActivityLog('DELETE_TEAM', `Removed team member: ${deleteConfirmation.name}`);
        triggerToast('Anggota tim berhasil dihapus');
        break;
      default:
        break;
    }
    setDeleteConfirmation({ show: false, type: '', id: '', name: '' });
  };

  // Global Search
  const searchResults = useMemo(() => {
    if (!globalSearch.trim()) return { clients: [], projects: [], tasks: [] };
    const query = globalSearch.toLowerCase();
    return {
      clients: clients.filter(c => c.name.toLowerCase().includes(query) || c.company.toLowerCase().includes(query)),
      projects: projects.filter(p => p.name.toLowerCase().includes(query)),
      tasks: tasks.filter(t => t.title.toLowerCase().includes(query))
    };
  }, [globalSearch, clients, projects, tasks]);

  // CRUD Handlers
  const handleAddClientSubmit = useCallback((e) => {
    e.preventDefault();
    const added = {
      ...newClient,
      id: generateId(),
      totalDeal: Number(newClient.totalDeal) || 0,
      paidAmount: Number(newClient.paidAmount) || 0,
      clicks: 0,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setClients(prev => [...prev, added]);
    addActivityLog('ADD_CLIENT', `Added client: ${added.company}`);
    setShowAddClient(false);
    triggerToast(`Klien "${newClient.company}" ditambahkan!`);
    setNewClient({ name: '', company: '', email: '', phone: '', website: '', status: 'Aktif', totalDeal: '', paidAmount: '' });
  }, [newClient, addActivityLog, triggerToast]);

  const handleAddProjectSubmit = useCallback((e) => {
    e.preventDefault();
    const added = {
      ...newProject,
      id: generateId(),
      progress: Number(newProject.progress) || 0,
      value: Number(newProject.value) || 0,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setProjects(prev => [...prev, added]);
    addActivityLog('ADD_PROJECT', `Added project: ${added.name}`);
    setShowAddProject(false);
    triggerToast(`Proyek "${newProject.name}" ditambahkan!`);
    setNewProject({ name: '', clientId: clients[0]?.id || '', progress: 0, status: 'Harus Dikerjakan', value: '', month: new Date().toISOString().slice(0, 7) });
  }, [newProject, clients, addActivityLog, triggerToast]);

  const handleAddTaskSubmit = useCallback((e) => {
    e.preventDefault();
    const added = {
      ...newTask,
      id: generateId(),
      assignedTo: null,
      completedAt: null,
      executorFee: Number(newTask.executorFee) || 0,
      timeSpent: Number(newTask.timeSpent) || 15,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setTasks(prev => [...prev, added]);
    addActivityLog('ADD_TASK', `Added task: ${added.title} with fee Rp ${added.executorFee}`);
    setShowAddTask(false);
    triggerToast(`Tugas berhasil dibuat! Selesai dapat ${formatRupiah(added.executorFee)}`);
    setNewTask({ title: '', projectId: projects[0]?.id || '', priority: 'Sedang', status: 'Harus Dikerjakan', dueDate: '', executorFee: 50000, timeSpent: 15, taskType: 'Domain' });
  }, [newTask, projects, addActivityLog, triggerToast]);

  const handleAddTeamMemberSubmit = useCallback((e) => {
    e.preventDefault();
    const added = {
      id: generateId(),
      ...newTeamMember,
      joinDate: new Date().toISOString().slice(0, 10),
      totalTasksCompleted: 0,
      totalEarnings: 0
    };
    setTeam(prev => [...prev, added]);
    addActivityLog('ADD_TEAM', `Added team member: ${added.name} as ${added.role}`);
    setShowAddTeamMember(false);
    triggerToast(`Anggota tim "${newTeamMember.name}" ditambahkan!`);
    setNewTeamMember({ name: '', role: 'Executor', email: '', phone: '' });
  }, [newTeamMember, addActivityLog, triggerToast]);

  const handleAddDomainSubmit = useCallback((e) => {
    e.preventDefault();
    const added = {
      ...newDomain,
      id: generateId(),
      clicks: 0,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setDomains(prev => [...prev, added]);
    addActivityLog('ADD_DOMAIN', `Added domain: ${added.domainName}`);
    setShowAddDomain(false);
    triggerToast(`Domain "${newDomain.domainName}" dipantau.`);
    setNewDomain({ domainName: '', expiryDate: '', provider: '' });
  }, [newDomain, addActivityLog, triggerToast]);

  const handleClaimTask = useCallback((taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId && !t.assignedTo) {
        addActivityLog('CLAIM_TASK', `${user?.name} claimed task: ${t.title}`);
        triggerToast(`Tugas "${t.title}" diambil! Segera kerjakan.`);
        return { ...t, assignedTo: user?.name, status: 'Sedang Berjalan' };
      }
      return t;
    }));
  }, [user, addActivityLog, triggerToast]);

  const openCompleteTaskDialog = useCallback((taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.assignedTo === user?.name) {
      setClaimingTaskId(taskId);
      setMinutesSpentInput(String(task.timeSpent));
      setClaimRewardValue(task.executorFee);
    } else {
      triggerToast('Hanya yang mengerjakan yang bisa klaim!', 'error');
    }
  }, [tasks, user, triggerToast]);

  const handleCompleteTaskSubmit = useCallback((e) => {
    e.preventDefault();
    const mins = Number(minutesSpentInput) || 15;
    setTasks(prev => prev.map(t => {
      if (t.id === claimingTaskId) {
        const completedTask = { 
          ...t, 
          status: 'Selesai', 
          timeSpent: mins, 
          executorFee: claimRewardValue,
          completedAt: new Date().toISOString().slice(0, 10) 
        };
        addActivityLog('COMPLETE_TASK', `${user?.name} completed task: ${t.title} in ${mins} minutes, earned ${formatRupiah(claimRewardValue)}`);
        
        // Update team member stats
        setTeam(prev => prev.map(m => {
          if (m.name === user?.name) {
            return {
              ...m,
              totalTasksCompleted: (m.totalTasksCompleted || 0) + 1,
              totalEarnings: (m.totalEarnings || 0) + claimRewardValue
            };
          }
          return m;
        }));
        
        triggerToast(`Kerja bagus! ${formatRupiah(claimRewardValue)} masuk akun Anda!`, 'success');
        return completedTask;
      }
      return t;
    }));
    setClaimingTaskId(null);
  }, [claimingTaskId, minutesSpentInput, claimRewardValue, user, addActivityLog, triggerToast]);

  const handleProjectProgressChange = useCallback((projectId, val) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const nextStatus = val >= 100 ? 'Selesai' : (val > 0 ? 'Sedang Berjalan' : 'Harus Dikerjakan');
        addActivityLog('UPDATE_PROGRESS', `Project ${p.name} progress: ${val}%`);
        return { ...p, progress: Number(val), status: nextStatus };
      }
      return p;
    }));
  }, [addActivityLog]);

  const selectPresetForNewTask = useCallback((presetId) => {
    const preset = TASK_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setNewTask({
        ...newTask,
        timeSpent: preset.minutes,
        executorFee: preset.rate,
        taskType: preset.id === 'pr_web' ? 'Web' : preset.id === 'pr_domain' ? 'Domain' : 'Riset'
      });
    }
  }, [newTask]);

  // Stats Calculations
  const stats = useMemo(() => {
    const filteredProjects = selectedMonth === 'Semua' 
      ? projects 
      : projects.filter(p => p.month === selectedMonth);

    const projectIds = filteredProjects.map(p => p.id);
    const filteredTasks = selectedMonth === 'Semua'
      ? tasks
      : tasks.filter(t => projectIds.includes(t.projectId));

    const totalDeals = filteredProjects.reduce((sum, p) => sum + Number(p.value || 0), 0);
    const totalEarnings = clients.reduce((sum, c) => sum + Number(c.paidAmount || 0), 0);
    const totalExecutorFees = filteredTasks.reduce((sum, t) => t.status === 'Selesai' ? sum + Number(t.executorFee || 0) : sum, 0);
    const profit = totalEarnings - totalExecutorFees;
    const taskAvailableCount = filteredTasks.filter(t => t.status !== 'Selesai').length;
    const taskCompletedCount = filteredTasks.filter(t => t.status === 'Selesai').length;
    const totalClicks = clients.reduce((sum, c) => sum + Number(c.clicks || 0), 0);
    const overdueTasks = tasks.filter(t => t.status !== 'Selesai' && t.dueDate && new Date(t.dueDate) < new Date()).length;
    
    // Team leaderboard
    const leaderboard = [...team].sort((a, b) => (b.totalEarnings || 0) - (a.totalEarnings || 0));
    
    // Monthly trend (last 6 months)
    const monthlyTrend = {};
    tasks.filter(t => t.status === 'Selesai' && t.completedAt).forEach(t => {
      const month = t.completedAt.slice(0, 7);
      monthlyTrend[month] = (monthlyTrend[month] || 0) + (t.executorFee || 0);
    });

    return {
      totalDeals,
      totalEarnings,
      totalExecutorFees,
      profit,
      taskAvailableCount,
      taskCompletedCount,
      totalClicks,
      overdueTasks,
      leaderboard,
      monthlyTrend: Object.entries(monthlyTrend).slice(-6)
    };
  }, [clients, projects, tasks, team, selectedMonth]);

  // Notifications
  const notifications = useMemo(() => {
    const list = [];
    const today = new Date();

    tasks.forEach(t => {
      if (t.status !== 'Selesai' && t.dueDate) {
        const dueDate = new Date(t.dueDate);
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
          list.push({
            id: `notif-overdue-${t.id}`,
            type: 'danger',
            title: 'TUGAS LEWAT DEADLINE!',
            message: `Tugas "${t.title}" telah terlambat ${Math.abs(diffDays)} hari.`,
          });
        } else if (diffDays <= 3) {
          list.push({
            id: `notif-urgent-${t.id}`,
            type: 'warning',
            title: 'Tugas Hampir Jatuh Tempo',
            message: `Sisa ${diffDays} hari lagi untuk menyelesaikan "${t.title}".`,
          });
        }
      }
    });

    domains.forEach(d => {
      const expiry = new Date(d.expiryDate);
      const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      if (diffDays <= 30 && diffDays > 0) {
        list.push({
          id: `notif-domain-${d.id}`,
          type: 'danger',
          title: 'Domain Mau Habis!',
          message: `${d.domainName} kedaluwarsa ${diffDays} hari lagi.`,
        });
      }
    });

    return list;
  }, [tasks, domains]);

  // Export CSV
  const handleExportCSV = useCallback((dataType) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    switch (dataType) {
      case 'financial':
        csvContent += "Eksekutor,Tugas,Menit Kerja,Fee Diterima,Tanggal Selesai\n";
        tasks.filter(t => t.status === 'Selesai').forEach(t => {
          csvContent += `"${t.assignedTo || 'System'}","${t.title}",${t.timeSpent},${t.executorFee},"${t.completedAt}"\n`;
        });
        break;
      case 'tasks':
        csvContent += "ID,Judul,Proyek,Status,Prioritas,Due Date,Assigned To,Fee\n";
        tasks.forEach(t => {
          const project = projects.find(p => p.id === t.projectId);
          csvContent += `"${t.id}","${t.title}","${project?.name || '-'}","${t.status}","${t.priority}","${t.dueDate || '-'}","${t.assignedTo || '-'}",${t.executorFee}\n`;
        });
        break;
      case 'clients':
        csvContent += "Nama,Perusahaan,Email,Telepon,Status,Total Deal,Paid Amount,Clicks\n";
        clients.forEach(c => {
          csvContent += `"${c.name}","${c.company}","${c.email}","${c.phone}","${c.status}",${c.totalDeal},${c.paidAmount},${c.clicks}\n`;
        });
        break;
      default:
        return;
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_${dataType}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Laporan ${dataType} berhasil diekspor!`);
  }, [tasks, projects, clients, triggerToast]);

  // AI Analysis with proper API key handling
  const askGeminiAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setAiAnalysis('');
    
    const promptContent = `
      Analisis data agensi digital berikut:
      
      DATA KLIEN: ${JSON.stringify(clients.map(c => ({ nama: c.company, clicks: c.clicks, status: c.status })))}
      
      TUGAS YANG SUDAH SELESAI: ${JSON.stringify(tasks.filter(t => t.status === 'Selesai').map(t => ({ 
        tugas: t.title, 
        menit: t.timeSpent, 
        fee: t.executorFee, 
        pic: t.assignedTo 
      })))}
      
      TOTAL PROFIT: ${formatRupiah(stats.profit)}
      TOTAL TUGAS TERSISA: ${stats.taskAvailableCount}
      TUGAS TERLAMBAT: ${stats.overdueTasks}
      
      Berikan analisis dalam Bahasa Indonesia dengan format:
      1. **Ringkasan Performa** (2-3 kalimat tentang kondisi terkini)
      2. **3 Rekomendasi Prioritas** (langkah konkret untuk meningkatkan produktivitas)
      3. **Peringatan** (jika ada risiko seperti tugas terlambat atau domain akan expired)
      
      Gunakan bahasa yang profesional namun mudah dipahami tim.
    `;
    
    try {
      // Note: Replace with your actual Gemini API key
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
      if (!API_KEY) {
        setAiAnalysis("⚠️ API Key Gemini belum dikonfigurasi. Tambahkan REACT_APP_GEMINI_API_KEY di file .env\n\nContoh analisis manual:\n• Fokus pada tugas yang mendekati deadline\n• Prioritaskan klien dengan status 'Kritis'\n• Optimalkan waktu pengerjaan berdasarkan fee per menit");
        return;
      }
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptContent }] }]
        })
      });
      
      if (!response.ok) throw new Error('API Error');
      const result = await response.json();
      const analysisText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak dapat menghasilkan analisis.";
      setAiAnalysis(analysisText);
      addActivityLog('AI_ANALYSIS', 'Generated performance analysis');
    } catch (error) {
      console.error('AI Analysis failed:', error);
      setAiAnalysis("🔧 Sistem AI sedang sibuk. Berdasarkan data yang ada:\n• Prioritaskan tugas dengan deadline terdekat\n• Klien dengan status 'Kritis' perlu pendekatan khusus\n• Tingkatkan efisiensi dengan template tugas yang sudah ada");
    } finally {
      setIsAnalyzing(false);
    }
  }, [clients, tasks, stats, addActivityLog]);

  // Available months for filter
  const availableMonths = useMemo(() => {
    const months = new Set(projects.map(p => p.month));
    return ['Semua', ...Array.from(months).sort()];
  }, [projects]);

  // Login Screen
  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'} flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300`}>
        <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"></div>

        <div className={`${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl p-8 max-w-sm w-full shadow-2xl relative z-10 space-y-6`}>
          <div className="text-center space-y-2">
            <div className="inline-flex p-3.5 bg-indigo-600/10 text-indigo-400 rounded-2xl border border-indigo-500/10">
              <Coins size={30} />
            </div>
            <h1 className="text-xl font-black tracking-tight uppercase">AgencyOS Pro</h1>
            <p className="text-xs text-slate-400 font-medium">Sistem Kendali Kerja & Profit Instan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <input 
                type="text"
                required
                value={loginNameInput}
                onChange={(e) => setLoginNameInput(e.target.value)}
                placeholder="Masukkan Nama Anda"
                className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-xl py-3.5 px-4 outline-none text-center font-bold text-base transition-all placeholder-slate-500`}
              />
              <input 
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-xl py-3.5 px-4 outline-none text-center font-bold text-base transition-all placeholder-slate-500`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-2"
            >
              Masuk Sekarang
              <ChevronRight size={18} />
            </button>
            
            <p className="text-[10px] text-slate-500 text-center mt-4">
              Demo: Nasir / admin123
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'} font-sans transition-colors duration-300`}>
      
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-fadeIn text-sm font-semibold ${
          showToast.type === 'success' ? (darkMode ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-400' : 'bg-emerald-100 border-emerald-500 text-emerald-700') : 
          showToast.type === 'error' ? (darkMode ? 'bg-rose-950/90 border-rose-500/40 text-rose-400' : 'bg-rose-100 border-rose-500 text-rose-700') :
          (darkMode ? 'bg-indigo-950/90 border-indigo-500/40 text-indigo-400' : 'bg-indigo-100 border-indigo-500 text-indigo-700')
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
          <span>{showToast.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border rounded-xl max-w-sm w-full p-6 space-y-5 shadow-2xl animate-fadeIn`}>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="text-rose-500" size={24} />
              </div>
              <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Konfirmasi Hapus</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Apakah Anda yakin ingin menghapus "{deleteConfirmation.name}"?
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirmation({ show: false, type: '', id: '', name: '' })}
                className={`flex-1 py-2.5 rounded-lg font-bold transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
              >
                Batal
              </button>
              <button 
                onClick={executeDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? 'w-20' : 'w-64'} ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-20 flex flex-col`}>
        <div className={`p-5 border-b ${darkMode ? 'border-slate-800' : 'border-gray-200'} flex items-center justify-between`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Layers size={18} />
              </div>
              <div>
                <h1 className="font-extrabold text-base leading-tight tracking-wide text-white">AgencyOS</h1>
                <p className="text-[10px] text-indigo-400 font-extrabold tracking-widest uppercase">Workspace</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="p-2 bg-indigo-600 rounded-lg text-white mx-auto">
              <Layers size={18} />
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} transition-all`}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* User Profile */}
        <div className={`p-4 mx-3 my-3 ${darkMode ? 'bg-slate-900/60 border-slate-800/60' : 'bg-gray-100 border-gray-300'} border rounded-xl`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Karyawan</p>
              <p className={`text-sm font-black truncate ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>{user.name}</p>
              <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 ${user.role === 'Maker' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {user.role}
              </span>
            </div>
            <button onClick={handleLogout} className={`p-2 ${darkMode ? 'text-slate-400 hover:text-rose-400 hover:bg-slate-800' : 'text-gray-500 hover:text-rose-500 hover:bg-gray-200'} rounded-lg transition-all`}>
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={sidebarCollapsed} />
          <NavItem icon={<Users size={18} />} label="Klien" active={activeTab === 'clients'} onClick={() => setActiveTab('clients')} collapsed={sidebarCollapsed} />
          <NavItem icon={<Sliders size={18} />} label="Proyek" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} collapsed={sidebarCollapsed} />
          <NavItem icon={<KanbanSquare size={18} />} label="Task Board" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} collapsed={sidebarCollapsed} />
          <NavItem icon={<DollarSign size={18} />} label="Keuangan" active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} collapsed={sidebarCollapsed} />
          <NavItem icon={<Globe size={18} />} label="Domain" active={activeTab === 'domains'} onClick={() => setActiveTab('domains')} collapsed={sidebarCollapsed} />
          <NavItem icon={<BarChart3 size={18} />} label="Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} collapsed={sidebarCollapsed} />
          <NavItem icon={<Trophy size={18} />} label="Team" active={activeTab === 'team'} onClick={() => setActiveTab('team')} collapsed={sidebarCollapsed} />
          
          <div className={`border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'} my-4`}></div>
          
          <NavItem icon={<RefreshCw size={18} />} label="Sync Sheets" active={activeTab === 'sheets-sync'} onClick={() => setActiveTab('sheets-sync')} collapsed={sidebarCollapsed} />
          <NavItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} collapsed={sidebarCollapsed} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} flex flex-col min-h-screen`}>
        
        {/* Header */}
        <header className={`sticky top-0 z-10 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b px-6 py-4`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                {activeTab === 'dashboard' && '🔥 Dashboard Produktivitas'}
                {activeTab === 'clients' && 'Manajemen Klien'}
                {activeTab === 'projects' && 'Progress Proyek'}
                {activeTab === 'tasks' && 'Papan Tugas'}
                {activeTab === 'finance' && 'Laporan Keuangan'}
                {activeTab === 'domains' && 'Monitoring Domain'}
                {activeTab === 'reports' && 'Analisis & Laporan'}
                {activeTab === 'team' && 'Manajemen Tim'}
                {activeTab === 'sheets-sync' && 'Sinkronisasi Spreadsheet'}
                {activeTab === 'settings' && 'Pengaturan Sistem'}
              </h2>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'} mt-0.5`}>
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Global Search */}
              <div className="relative flex-1 lg:w-80">
                <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => {
                    setGlobalSearch(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Cari klien, proyek, tugas..."
                  className={`w-full pl-9 pr-8 py-2 text-sm rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} outline-none focus:border-indigo-500 transition-all`}
                />
                {globalSearch && (
                  <button onClick={() => setGlobalSearch('')} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                    <X size={14} />
                  </button>
                )}
                
                {/* Search Results Dropdown */}
                {showSearchResults && globalSearch && (
                  <div className={`absolute top-full left-0 right-0 mt-2 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto`}>
                    {searchResults.clients.length > 0 && (
                      <div className="p-2">
                        <p className={`text-xs font-bold px-3 py-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Klien ({searchResults.clients.length})</p>
                        {searchResults.clients.map(c => (
                          <div key={c.id} className={`px-3 py-2 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`} onClick={() => { setActiveTab('clients'); setGlobalSearch(''); setShowSearchResults(false); }}>
                            <p className="font-semibold text-sm">{c.company}</p>
                            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{c.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchResults.projects.length > 0 && (
                      <div className="p-2 border-t border-slate-700">
                        <p className={`text-xs font-bold px-3 py-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Proyek ({searchResults.projects.length})</p>
                        {searchResults.projects.map(p => (
                          <div key={p.id} className={`px-3 py-2 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`} onClick={() => { setActiveTab('projects'); setGlobalSearch(''); setShowSearchResults(false); }}>
                            <p className="font-semibold text-sm">{p.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Progress: {p.progress}%</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchResults.tasks.length > 0 && (
                      <div className="p-2 border-t border-slate-700">
                        <p className={`text-xs font-bold px-3 py-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Tugas ({searchResults.tasks.length})</p>
                        {searchResults.tasks.map(t => (
                          <div key={t.id} className={`px-3 py-2 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`} onClick={() => { setActiveTab('tasks'); setGlobalSearch(''); setShowSearchResults(false); }}>
                            <p className="font-semibold text-sm">{t.title}</p>
                            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Status: {t.status}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchResults.clients.length === 0 && searchResults.projects.length === 0 && searchResults.tasks.length === 0 && (
                      <div className="p-4 text-center text-sm text-slate-500">Tidak ada hasil ditemukan</div>
                    )}
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg border ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-100'} transition-all`}
              >
                {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className={`p-2 rounded-lg border relative transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-100'} ${notifications.length > 0 ? (darkMode ? 'border-rose-500/40 text-rose-400' : 'border-rose-500 text-rose-500') : ''}`}
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotifDropdown && (
                  <div className={`absolute right-0 mt-3 w-80 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn`}>
                    <div className={`p-3 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex justify-between items-center`}>
                      <span className="font-extrabold text-xs">Pengingat ({notifications.length})</span>
                      <button onClick={() => setShowNotifDropdown(false)} className="text-[10px] text-slate-400 hover:text-white font-bold">Tutup</button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-6 font-medium">Semua aman! ✅</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`p-3.5 ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'} transition-colors space-y-1 border-b ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${n.type === 'danger' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                              <span className="font-bold text-[10px] text-slate-300 uppercase tracking-widest">{n.title}</span>
                            </div>
                            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 space-y-6">
          
          {/* AI Analysis Banner */}
          {aiAnalysis && (
            <div className={`p-5 ${darkMode ? 'bg-slate-800 border-indigo-500/20' : 'bg-white border-indigo-200'} border rounded-xl relative overflow-hidden shadow-xl animate-fadeIn`}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg">
                  <Sparkles size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-extrabold text-[10px] text-indigo-400 uppercase tracking-widest">Analisis AI Auditor</span>
                    <button onClick={() => setAiAnalysis('')} className={`p-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>×</button>
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {aiAnalysis}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== TAB 1: DASHBOARD ========== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <KPICard title="Laba Bersih" value={formatRupiah(stats.profit)} icon={<DollarSign size={18} />} color="indigo" darkMode={darkMode} />
                <KPICard title="Total Fee Tim" value={formatRupiah(stats.totalExecutorFees)} icon={<Coins size={18} />} color="emerald" darkMode={darkMode} />
                <KPICard title="Tugas Tersedia" value={stats.taskAvailableCount.toString()} icon={<Clock size={18} />} color="amber" darkMode={darkMode} />
                <KPICard title="Tugas Selesai" value={stats.taskCompletedCount.toString()} icon={<CheckCircle2 size={18} />} color="green" darkMode={darkMode} />
                <KPICard title="Total Klik" value={stats.totalClicks.toLocaleString()} icon={<MousePointerClick size={18} />} color="sky" darkMode={darkMode} />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <h3 className="font-bold mb-4">Trend Performa Tim (6 Bulan Terakhir)</h3>
                  <div className="h-64 flex items-end justify-between gap-4 pt-4">
                    {stats.monthlyTrend.map(([month, value], idx) => {
                      const maxValue = Math.max(...stats.monthlyTrend.map(([, v]) => v), 1);
                      const heightPercent = (value / maxValue) * 100;
                      return (
                        <div key={month} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-indigo-500/20 rounded-t-lg" style={{ height: `${heightPercent}%`, minHeight: '4px' }}>
                            <div className="w-full bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${heightPercent}%` }}></div>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400">{month.slice(5)}</p>
                          <p className="text-[9px] text-emerald-400">{formatRupiah(value)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <AlertCircle size={16} className="text-rose-400" />
                    Peringatan & Deadline
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {tasks.filter(t => t.status !== 'Selesai' && t.dueDate).slice(0, 5).map(task => {
                      const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                      return (
                        <div key={task.id} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                          <p className="font-semibold text-sm">{task.title}</p>
                          <div className="flex justify-between items-center mt-1 text-xs">
                            <span className={daysLeft <= 3 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                              {daysLeft <= 0 ? 'LEWAT DEADLINE!' : `${daysLeft} hari lagi`}
                            </span>
                            <span className="text-emerald-400">{formatRupiah(task.executorFee)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Leaderboard Preview */}
              <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-500" />
                    Leaderboard Tim Terbaik
                  </h3>
                  <button onClick={() => setActiveTab('team')} className="text-xs text-indigo-400 hover:underline">Lihat Semua →</button>
                </div>
                <div className="space-y-2">
                  {stats.leaderboard.slice(0, 5).map((member, idx) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500' : idx === 1 ? 'bg-gray-400/20 text-gray-400' : idx === 2 ? 'bg-amber-600/20 text-amber-600' : 'bg-slate-600 text-slate-400'}`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-sm">{member.name}</p>
                          <p className="text-[10px] text-slate-400">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400 text-sm">{formatRupiah(member.totalEarnings || 0)}</p>
                        <p className="text-[9px] text-slate-400">{member.totalTasksCompleted || 0} tugas</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========== TAB 2: CLIENTS ========== */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Database Klien</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total {clients.length} klien terdaftar</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleExportCSV('clients')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}>
                    <Download size={14} /> Export CSV
                  </button>
                  {user.role === 'Maker' && (
                    <button onClick={() => setShowAddClient(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">
                      <Plus size={14} /> Tambah Klien
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clients.map(client => (
                  <div key={client.id} className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{client.company}</h4>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{client.name}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${client.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2"><span className="text-slate-400">📧</span> {client.email}</p>
                      <p className="flex items-center gap-2"><span className="text-slate-400">📱</span> {client.phone}</p>
                      <p className="flex items-center gap-2"><span className="text-slate-400">🌐</span> {client.website}</p>
                      <div className="pt-2 border-t border-slate-700 mt-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Deal:</span>
                          <span className="font-bold text-emerald-400">{formatRupiah(client.totalDeal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Terbayar:</span>
                          <span>{formatRupiah(client.paidAmount)}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                          <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${(client.paidAmount / client.totalDeal) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    {user.role === 'Maker' && (
                      <div className="flex justify-end mt-4 pt-2 border-t border-slate-700">
                        <button onClick={() => confirmDelete('client', client.id, client.company)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== TAB 3: PROJECTS ========== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Manajemen Proyek</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total {projects.length} proyek aktif</p>
                </div>
                {user.role === 'Maker' && (
                  <button onClick={() => setShowAddProject(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">
                    <Plus size={14} /> Proyek Baru
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {projects.map(project => {
                  const client = clients.find(c => c.id === project.clientId);
                  return (
                    <div key={project.id} className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{project.name}</h4>
                          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Klien: {client?.company || 'N/A'}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${project.status === 'Selesai' ? 'bg-emerald-500/20 text-emerald-400' : project.status === 'Sedang Berjalan' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span className="font-bold">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }}></div>
                          </div>
                          {user.role === 'Maker' && (
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={project.progress}
                              onChange={(e) => handleProjectProgressChange(project.id, e.target.value)}
                              className="w-full mt-2 accent-indigo-500"
                            />
                          )}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Nilai Proyek:</span>
                          <span className="font-bold text-emerald-400">{formatRupiah(project.value)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Bulan:</span>
                          <span>{project.month}</span>
                        </div>
                      </div>
                      {user.role === 'Maker' && (
                        <div className="flex justify-end mt-4 pt-3 border-t border-slate-700">
                          <button onClick={() => confirmDelete('project', project.id, project.name)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========== TAB 4: TASK BOARD ========== */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Papan Tugas</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Kelola dan klaim tugas</p>
                </div>
                {user.role === 'Maker' && (
                  <button onClick={() => setShowAddTask(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">
                    <Plus size={14} /> Tugas Baru
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Harus Dikerjakan', 'Prioritas Utama', 'Sedang Berjalan', 'Selesai'].map(status => (
                  <div key={status} className={`p-3 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700">
                      <span className="font-bold text-sm">{status}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-300'}`}>
                        {tasks.filter(t => t.status === status).length}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {tasks.filter(t => t.status === status).map(task => (
                        <TaskCardEnhanced
                          key={task.id}
                          task={task}
                          projects={projects}
                          currentUser={user}
                          onClaim={handleClaimTask}
                          onComplete={openCompleteTaskDialog}
                          onDelete={() => confirmDelete('task', task.id, task.title)}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== TAB 5: FINANCE ========== */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <p className="text-xs text-slate-400 uppercase">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-emerald-400">{formatRupiah(stats.totalEarnings)}</p>
                </div>
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <p className="text-xs text-slate-400 uppercase">Total Fee Tim</p>
                  <p className="text-2xl font-bold text-amber-400">{formatRupiah(stats.totalExecutorFees)}</p>
                </div>
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <p className="text-xs text-slate-400 uppercase">Laba Bersih</p>
                  <p className="text-2xl font-bold text-indigo-400">{formatRupiah(stats.profit)}</p>
                </div>
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <p className="text-xs text-slate-400 uppercase">Margin Profit</p>
                  <p className="text-2xl font-bold text-sky-400">
                    {stats.totalEarnings > 0 ? Math.round((stats.profit / stats.totalEarnings) * 100) : 0}%
                  </p>
                </div>
              </div>

              <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Laporan Komisi Pekerjaan</h3>
                  <button onClick={() => handleExportCSV('financial')} className="flex items-center gap-2 text-sm text-indigo-400 hover:underline">
                    <Download size={14} /> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                        <th className="text-left py-3">Eksekutor</th>
                        <th className="text-left py-3">Tugas</th>
                        <th className="text-center py-3">Durasi</th>
                        <th className="text-right py-3">Fee</th>
                        <th className="text-center py-3">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.filter(t => t.status === 'Selesai').map(task => (
                        <tr key={task.id} className={`border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                          <td className="py-2 font-medium">{task.assignedTo || 'System'}</td>
                          <td className="py-2">{task.title}</td>
                          <td className="py-2 text-center">{task.timeSpent} menit</td>
                          <td className="py-2 text-right font-bold text-emerald-400">{formatRupiah(task.executorFee)}</td>
                          <td className="py-2 text-center text-slate-400">{task.completedAt || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========== TAB 6: DOMAINS ========== */}
          {activeTab === 'domains' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Monitoring Domain</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total {domains.length} domain terpantau</p>
                </div>
                {user.role === 'Maker' && (
                  <button onClick={() => setShowAddDomain(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">
                    <Plus size={14} /> Tambah Domain
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domains.map(domain => {
                  const daysLeft = Math.ceil((new Date(domain.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                  const isCritical = daysLeft <= 30;
                  return (
                    <div key={domain.id} className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg font-mono">{domain.domainName}</h4>
                          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Provider: {domain.provider}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${isCritical ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {daysLeft > 0 ? `${daysLeft} hari lagi` : 'EXPIRED!'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700">
                        <div className="flex items-center gap-2">
                          <MousePointerClick size={14} className="text-sky-400" />
                          <span className="font-bold">{domain.clicks.toLocaleString()} klik</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-sm">{domain.expiryDate}</span>
                        </div>
                        {user.role === 'Maker' && (
                          <button onClick={() => confirmDelete('domain', domain.id, domain.domainName)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========== TAB 7: REPORTS & ANALYTICS ========== */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Chart */}
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald-400" />
                    Performa Bulanan
                  </h3>
                  <div className="h-80">
                    <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="none">
                      {stats.monthlyTrend.length > 0 && (() => {
                        const maxValue = Math.max(...stats.monthlyTrend.map(([, v]) => v), 1);
                        const points = stats.monthlyTrend.map(([, v], i) => `${(i / (stats.monthlyTrend.length - 1)) * 500},${300 - (v / maxValue) * 250}`).join(' ');
                        return (
                          <>
                            <polyline points={points} fill="none" stroke="#6366f1" strokeWidth="3" />
                            {stats.monthlyTrend.map(([month, v], i) => (
                              <circle key={month} cx={(i / (stats.monthlyTrend.length - 1)) * 500} cy={300 - (v / maxValue) * 250} r="4" fill="#6366f1" />
                            ))}
                          </>
                        );
                      })()}
                      <text x="250" y="290" textAnchor="middle" fill="#64748b" fontSize="12">Bulan</text>
                      <text x="10" y="150" textAnchor="middle" fill="#64748b" fontSize="12" transform="rotate(-90, 10, 150)">Pendapatan (Rp)</text>
                    </svg>
                  </div>
                </div>

                {/* Productivity Metrics */}
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Target size={16} className="text-indigo-400" />
                    Metrik Produktivitas
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tingkat Penyelesaian Tugas</span>
                        <span className="font-bold">{stats.taskCompletedCount}/{stats.taskCompletedCount + stats.taskAvailableCount}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(stats.taskCompletedCount / (stats.taskCompletedCount + stats.taskAvailableCount)) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rata-rata Fee per Tugas</span>
                        <span className="font-bold">{formatRupiah(stats.totalExecutorFees / (stats.taskCompletedCount || 1))}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rata-rata Durasi per Tugas</span>
                        <span className="font-bold">
                          {Math.round(tasks.filter(t => t.status === 'Selesai').reduce((sum, t) => sum + t.timeSpent, 0) / (stats.taskCompletedCount || 1))} menit
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tugas Terlambat</span>
                        <span className={`font-bold ${stats.overdueTasks > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{stats.overdueTasks}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Distribution */}
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <PieChart size={16} className="text-sky-400" />
                    Distribusi Klien
                  </h3>
                  <div className="space-y-2">
                    {clients.map(client => (
                      <div key={client.id} className="flex justify-between items-center">
                        <span>{client.company}</span>
                        <span className="font-bold text-emerald-400">{formatRupiah(client.totalDeal)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performers */}
                <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Award size={16} className="text-yellow-500" />
                    Top Performers
                  </h3>
                  <div className="space-y-3">
                    {stats.leaderboard.slice(0, 5).map((member, idx) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500' : idx === 1 ? 'bg-gray-400/20 text-gray-400' : idx === 2 ? 'bg-amber-600/20 text-amber-600' : 'bg-slate-600 text-slate-400'}`}>
                            {idx + 1}
                          </span>
                          <span className="font-medium">{member.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-400 text-sm">{formatRupiah(member.totalEarnings || 0)}</div>
                          <div className="text-xs text-slate-400">{member.totalTasksCompleted || 0} tugas</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== TAB 8: TEAM MANAGEMENT ========== */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Manajemen Tim</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total {team.length} anggota tim</p>
                </div>
                {user.role === 'Maker' && (
                  <button onClick={() => setShowAddTeamMember(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all">
                    <Plus size={14} /> Tambah Anggota
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map(member => (
                  <div key={member.id} className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{member.name}</h4>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mt-1 ${member.role === 'Maker' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2"><span className="text-slate-400">📧</span> {member.email}</p>
                      <p className="flex items-center gap-2"><span className="text-slate-400">📱</span> {member.phone || '-'}</p>
                      <p className="flex items-center gap-2"><span className="text-slate-400">📅</span> Bergabung: {member.joinDate}</p>
                      <div className="pt-2 border-t border-slate-700 mt-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tugas Selesai:</span>
                          <span className="font-bold">{member.totalTasksCompleted || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Earnings:</span>
                          <span className="font-bold text-emerald-400">{formatRupiah(member.totalEarnings || 0)}</span>
                        </div>
                      </div>
                    </div>
                    {user.role === 'Maker' && member.name !== 'Nasir' && (
                      <div className="flex justify-end mt-4 pt-2 border-t border-slate-700">
                        <button onClick={() => confirmDelete('team', member.id, member.name)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== TAB 9: SETTINGS ========== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className={`p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <h3 className="font-bold text-lg mb-4">Pengaturan Sistem</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700">
                    <div>
                      <p className="font-semibold">Mode Gelap/Terang</p>
                      <p className="text-xs text-slate-400">Ubah tampilan aplikasi</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold ${darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                    >
                      {darkMode ? '🌙 Dark' : '☀️ Light'}
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700">
                    <div>
                      <p className="font-semibold">Reset Semua Data</p>
                      <p className="text-xs text-slate-400">Hapus semua data dan kembali ke default</p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Yakin ingin mereset semua data? Tindakan ini tidak dapat dibatalkan!')) {
                          localStorage.removeItem(STORAGE_KEY);
                          window.location.reload();
                        }
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-bold"
                    >
                      Reset Data
                    </button>
                  </div>
                  <div className="py-3">
                    <p className="font-semibold">Tentang Aplikasi</p>
                    <p className="text-sm text-slate-400 mt-1">AgencyOS Pro v2.0.0</p>
                    <p className="text-xs text-slate-500 mt-2">Sistem manajemen agensi digital dengan fitur lengkap untuk meningkatkan produktivitas tim.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== TAB 10: SHEETS SYNC ========== */}
          {activeTab === 'sheets-sync' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className={`p-6 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <h3 className="font-bold text-lg mb-4">Sinkronisasi Google Sheets</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-4`}>
                  Hubungkan Google Spreadsheet untuk mengimpor data klien secara otomatis.
                  Pastikan spreadsheet telah dipublikasikan sebagai CSV.
                </p>
                {/* Add your sync implementation here */}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Modals */}
      {/* Add Client Modal */}
      {showAddClient && (
        <Modal title="Tambah Klien Baru" onClose={() => setShowAddClient(false)} darkMode={darkMode}>
          <form onSubmit={handleAddClientSubmit} className="space-y-4">
            <input type="text" required placeholder="Nama PIC" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="text" required placeholder="Perusahaan" value={newClient.company} onChange={(e) => setNewClient({...newClient, company: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="email" required placeholder="Email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="text" placeholder="Telepon" value={newClient.phone} onChange={(e) => setNewClient({...newClient, phone: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="text" placeholder="Website" value={newClient.website} onChange={(e) => setNewClient({...newClient, website: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="number" placeholder="Total Deal (Rp)" value={newClient.totalDeal} onChange={(e) => setNewClient({...newClient, totalDeal: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="number" placeholder="Sudah Dibayar (Rp)" value={newClient.paidAmount} onChange={(e) => setNewClient({...newClient, paidAmount: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all">Simpan Klien</button>
          </form>
        </Modal>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <Modal title="Tambah Proyek Baru" onClose={() => setShowAddProject(false)} darkMode={darkMode}>
          <form onSubmit={handleAddProjectSubmit} className="space-y-4">
            <input type="text" required placeholder="Nama Proyek" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <select required value={newProject.clientId} onChange={(e) => setNewProject({...newProject, clientId: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none`}>
              <option value="">Pilih Klien</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
            </select>
            <input type="month" required value={newProject.month} onChange={(e) => setNewProject({...newProject, month: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none`} />
            <input type="number" placeholder="Nilai Proyek (Rp)" value={newProject.value} onChange={(e) => setNewProject({...newProject, value: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all">Simpan Proyek</button>
          </form>
        </Modal>
      )}

      {/* Add Task Modal */}
      {showAddTask && (
        <Modal title="Buat Tugas Baru" onClose={() => setShowAddTask(false)} darkMode={darkMode}>
          <div className="space-y-2 mb-4">
            <label className="text-xs font-bold text-slate-400">PRESET CEPAT</label>
            <div className="grid grid-cols-2 gap-2">
              {TASK_PRESETS.map(preset => (
                <button key={preset.id} type="button" onClick={() => selectPresetForNewTask(preset.id)} className={`p-2 rounded-lg border text-left text-xs ${darkMode ? 'border-slate-700 hover:border-indigo-500' : 'border-gray-300 hover:border-indigo-500'} transition-all`}>
                  <p className="font-semibold">{preset.label}</p>
                  <p className="text-emerald-400">{formatRupiah(preset.rate)}</p>
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleAddTaskSubmit} className="space-y-4">
            <input type="text" required placeholder="Judul Tugas" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <select required value={newTask.projectId} onChange={(e) => setNewTask({...newTask, projectId: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none`}>
              <option value="">Pilih Proyek</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" required placeholder="Fee (Rp)" value={newTask.executorFee} onChange={(e) => setNewTask({...newTask, executorFee: e.target.value})} className={`p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
              <input type="number" required placeholder="Estimasi Menit" value={newTask.timeSpent} onChange={(e) => setNewTask({...newTask, timeSpent: e.target.value})} className={`p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            </div>
            <input type="date" required placeholder="Due Date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all">Buat Tugas</button>
          </form>
        </Modal>
      )}

      {/* Add Domain Modal */}
      {showAddDomain && (
        <Modal title="Tambah Domain Baru" onClose={() => setShowAddDomain(false)} darkMode={darkMode}>
          <form onSubmit={handleAddDomainSubmit} className="space-y-4">
            <input type="text" required placeholder="Nama Domain" value={newDomain.domainName} onChange={(e) => setNewDomain({...newDomain, domainName: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="date" required placeholder="Tanggal Expiry" value={newDomain.expiryDate} onChange={(e) => setNewDomain({...newDomain, expiryDate: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="text" required placeholder="Provider" value={newDomain.provider} onChange={(e) => setNewDomain({...newDomain, provider: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all">Pantau Domain</button>
          </form>
        </Modal>
      )}

      {/* Add Team Member Modal */}
      {showAddTeamMember && (
        <Modal title="Tambah Anggota Tim" onClose={() => setShowAddTeamMember(false)} darkMode={darkMode}>
          <form onSubmit={handleAddTeamMemberSubmit} className="space-y-4">
            <input type="text" required placeholder="Nama Lengkap" value={newTeamMember.name} onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <select value={newTeamMember.role} onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none`}>
              <option value="Executor">Executor</option>
              <option value="Maker">Maker</option>
            </select>
            <input type="email" required placeholder="Email" value={newTeamMember.email} onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <input type="text" placeholder="Telepon" value={newTeamMember.phone} onChange={(e) => setNewTeamMember({...newTeamMember, phone: e.target.value})} className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all">Tambah Anggota</button>
          </form>
        </Modal>
      )}

      {/* Complete Task Modal */}
      {claimingTaskId && (
        <Modal title="Klaim Uang & Selesaikan Tugas" onClose={() => setClaimingTaskId(null)} darkMode={darkMode}>
          <div className={`p-4 rounded-lg mb-4 text-center ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
            <p className="text-xs font-bold text-indigo-400 uppercase">Komisi Yang Akan Didapat</p>
            <p className="text-2xl font-black text-white">{formatRupiah(claimRewardValue)}</p>
          </div>
          <form onSubmit={handleCompleteTaskSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Durasi Kerja Aktual (Menit)</label>
              <div className="flex items-center gap-2">
                <Hourglass size={18} className="text-indigo-400" />
                <input type="number" required min="1" value={minutesSpentInput} onChange={(e) => {
                  setMinutesSpentInput(e.target.value);
                  const mins = Number(e.target.value) || 0;
                  const activeTask = tasks.find(t => t.id === claimingTaskId);
                  if (activeTask) {
                    const estimatedReward = Math.round((mins / activeTask.timeSpent) * activeTask.executorFee);
                    setClaimRewardValue(estimatedReward);
                  }
                }} className={`flex-1 p-3 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'} outline-none focus:border-indigo-500`} />
                <span className="text-sm font-bold">menit</span>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all">Klaim & Selesai</button>
          </form>
        </Modal>
      )}

    </div>
  );
}

// === COMPONENTS ===

const NavItem = ({ icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${active ? (collapsed ? 'bg-indigo-600/20 text-indigo-400 justify-center' : 'bg-indigo-600/20 text-indigo-400') : 'text-slate-400 hover:bg-slate-800 hover:text-white'} ${collapsed ? 'justify-center' : ''}`}
    title={collapsed ? label : ''}
  >
    {icon}
    {!collapsed && <span>{label}</span>}
  </button>
);

const KPICard = ({ title, value, icon, color, darkMode }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-400',
    green: 'bg-green-500/10 text-green-400',
    sky: 'bg-sky-500/10 text-sky-400'
  };
  return (
    <div className={`p-5 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl border ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex items-center justify-between`}>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{title}</p>
        <p className="text-xl font-black mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
        {icon}
      </div>
    </div>
  );
};

const TaskCardEnhanced = ({ task, projects, currentUser, onClaim, onComplete, onDelete, darkMode }) => {
  const project = projects.find(p => p.id === task.projectId);
  const isAssigned = !!task.assignedTo;
  const isAssignedToCurrentUser = task.assignedTo === currentUser.name;
  const isSelesai = task.status === 'Selesai';

  return (
    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} transition-all`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-sm">{task.title}</p>
          <p className="text-xs text-slate-400">{project?.name}</p>
        </div>
        {currentUser.role === 'Maker' && !isSelesai && (
          <button onClick={onDelete} className="p-1 text-rose-400 hover:bg-rose-500/10 rounded">
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <div className="flex justify-between items-center text-xs mb-2">
        <span className="text-emerald-400 font-bold">{formatRupiah(task.executorFee)}</span>
        <span className="text-slate-400">{task.timeSpent} menit</span>
      </div>
      {isSelesai ? (
        <div className="text-center text-xs py-1.5 bg-emerald-500/20 text-emerald-400 rounded font-bold">
          ✓ Selesai oleh {task.assignedTo}
        </div>
      ) : isAssigned ? (
        isAssignedToCurrentUser ? (
          <button onClick={() => onComplete(task.id)} className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded transition-all">
            Klaim & Selesai
          </button>
        ) : (
          <div className="text-center text-xs py-1.5 text-slate-400 italic">
            Dikerjakan {task.assignedTo}
          </div>
        )
      ) : (
        <button onClick={() => onClaim(task.id)} className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded transition-all">
          Ambil Kerja
        </button>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, children, darkMode }) => (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl max-w-md w-full p-6 shadow-2xl animate-fadeIn`}>
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-700">
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-lg transition-all">✕</button>
      </div>
      {children}
    </div>
  </div>
);
