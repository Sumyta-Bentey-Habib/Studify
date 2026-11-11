import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Logo from "../../shared/Logo";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  FolderOpen,
  BookmarkCheck,
  FileText,
  PenLine,
  Send,
  CalendarPlus,
  CloudUpload,
  Users,
  ArrowUpCircle,
  LogOut,
  UserCheck,
  User,
  GraduationCap,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = {
  student: [
    { to: "/dashboard/student", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/dashboard/student/view-sessions", label: "Browse Sessions", icon: BookOpen },
    { to: "/dashboard/student/booked-session", label: "Booked Sessions", icon: CalendarCheck },
    { to: "/dashboard/student/view-materials", label: "Explore Materials", icon: FolderOpen },
    { to: "/dashboard/student/study-materials", label: "Saved Materials", icon: BookmarkCheck },
    { to: "/dashboard/student/view-notes", label: "My Notes", icon: FileText },
    { to: "/dashboard/student/create-note", label: "Create Note", icon: PenLine },
    { to: "/dashboard/student/sent-request", label: "Become a Mentor", icon: Send },
  ],
  tutor: [
    { to: "/dashboard/mentor", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/dashboard/mentor/create-session", label: "Create Session", icon: CalendarPlus },
    { to: "/dashboard/mentor/view-sessions", label: "My Sessions", icon: CalendarCheck },
    { to: "/dashboard/mentor/upload-materials", label: "Upload Materials", icon: CloudUpload },
  ],
  admin: [
    { to: "/dashboard/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/dashboard/admin/view-users", label: "All Users", icon: Users },
    { to: "/dashboard/admin/view-study-sessions", label: "Study Sessions", icon: BookOpen },
    { to: "/dashboard/admin/view-study-materials", label: "Study Materials", icon: FolderOpen },
    { to: "/dashboard/admin/upgrade-the-user", label: "Upgrade Requests", icon: ArrowUpCircle },
  ],
};

const ROLE_BADGES = {
  admin: { label: "Admin", icon: UserCheck, color: "bg-studify-danger/20 text-red-200 border-red-300/30" },
  tutor: { label: "Mentor", icon: GraduationCap, color: "bg-studify-accent/20 text-amber-200 border-amber-300/30" },
  student: { label: "Student", icon: User, color: "bg-white/15 text-emerald-100 border-white/20" },
};

const DashboardSidebar = ({
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = (user?.role || "student").toLowerCase().trim();
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.student;
  const roleBadge = ROLE_BADGES[role] || ROLE_BADGES.student;
  const RoleIcon = roleBadge.icon;

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-studify-sidebar text-[#E6E8E2] select-none">
      {/* ── Top Brand Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 h-16">
        <NavLink
          to="/"
          className="flex items-center gap-3 overflow-hidden group focus:outline-none"
        >
          <Logo light={true} />
        </NavLink>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* ── Role Identity Pill (when expanded) ── */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold text-white/60">
              Workspace
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${roleBadge.color}`}
            >
              <RoleIcon size={12} />
              {roleBadge.label}
            </span>
          </div>
        </div>
      )}

      {/* ── Navigation Links ── */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const currentCleanPath = location.pathname.replace(/\/$/, "");
          const roleBasePath = `/dashboard/${role === "tutor" ? "mentor" : role}`;
          const isAtDashboardRoot = currentCleanPath === "/dashboard" || currentCleanPath === "";
          const isRoleOverview =
            (item.to === roleBasePath && (currentCleanPath === roleBasePath || currentCleanPath === `${roleBasePath}/overview`)) ||
            (item.to === roleBasePath && isAtDashboardRoot);

          const isActive = item.exact
            ? isRoleOverview
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
              className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative ${
                isActive
                  ? "bg-studify-sidebar-active text-white shadow-sm font-semibold"
                  : "text-[#E6E8E2]/80 hover:bg-white/10 hover:text-white"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-studify-accent rounded-r-full" />
              )}
              <Icon
                size={18}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? "text-studify-accent" : "text-[#E6E8E2]/70 group-hover:text-white"
                }`}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Bottom User Profile & Actions ── */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-black/10">
        <NavLink
          to="/dashboard/profile"
          onClick={onCloseMobile}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group ${
            isCollapsed ? "justify-center p-1.5" : ""
          }`}
          title="View Profile"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-studify-primary text-white flex items-center justify-center text-xs font-bold ring-2 ring-white/20">
              {initials}
            </div>
          )}

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-[#E6E8E2]/60 truncate">{user?.email}</p>
            </div>
          )}
        </NavLink>

        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-200/80 hover:text-red-100 hover:bg-red-500/20 transition-colors ${
            isCollapsed ? "justify-center px-2" : ""
          }`}
        >
          <LogOut size={16} />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-studify-heading/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out sticky top-0 h-screen border-r border-white/10 shadow-md ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
