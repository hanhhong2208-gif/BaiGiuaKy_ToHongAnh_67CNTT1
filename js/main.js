/**
 * CSE122 - SMARTBUILDING TEAM 01
 * main.js - Master Navigation, Mobile Drawer Toggle & Shared Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
  highlightActiveNavigation();
});

// 1. Mobile Off-Canvas Drawer Toggle
function initMobileDrawer() {
  const toggleBtn = document.getElementById("menuToggleBtn");
  const closeBtn = document.getElementById("closeSidebarBtn");
  const overlay = document.getElementById("sidebarOverlay");
  const sidebar = document.getElementById("appSidebar");

  function openDrawer() {
    if (sidebar) sidebar.classList.add("show-mobile");
    if (overlay) overlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent body scroll when drawer open
  }

  function closeDrawer() {
    if (sidebar) sidebar.classList.remove("show-mobile");
    if (overlay) overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  if (overlay) {
    overlay.addEventListener("click", closeDrawer);
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("show-mobile")) {
      closeDrawer();
    }
  });
}

// 2. Automatically Highlight Active Nav Item
function highlightActiveNavigation() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Sidebar items
  const sidebarNavItems = document.querySelectorAll(".sidebar-nav .nav-item");
  sidebarNavItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href && (href === currentPath || (currentPath === "index.html" && href.includes("manager-energy-kpis.html")))) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Mobile bottom nav items
  const bottomNavItems = document.querySelectorAll(".bottom-nav-item");
  bottomNavItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href && href === currentPath) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// 3. User Session & Logout Handler
function handleLogout() {
  if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống Green Tower SmartBuilding?")) {
    localStorage.removeItem("smartbuilding_user");
    window.location.href = "login.html";
  }
}
window.handleLogout = handleLogout;
