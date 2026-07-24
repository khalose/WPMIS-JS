const STORAGE_KEY = "wpmis-js-state";

const seedUsers = [
  { id: "USR-001", name: "County Admin", email: "admin@wajir.go.ke", password: "password", role: "admin" },
  { id: "USR-002", name: "Field Officer", email: "officer@wajir.go.ke", password: "password", role: "field_officer" }
];

const basePoints = [
  ["WP-001", "Wajir Town Central Borehole", "borehole", "Wajir East", "Township", 1.7488, 40.0629, 2006, "functional"],
  ["WP-002", "Bute Community Well", "hand_dug_well", "Wajir North", "Bute", 3.0562, 39.9991, 2011, "functional"],
  ["WP-003", "Habaswein Water Kiosk", "pipeline_kiosk", "Wajir South", "Habaswein", 1.0107, 39.4901, 2018, "under_repair"],
  ["WP-004", "Eldas Livestock Borehole", "borehole", "Eldas", "Eldas", 2.5079, 39.5666, 2013, "non_functional"],
  ["WP-005", "Tarbaj South Water Pan", "water_pan", "Tarbaj", "Tarbaj", 2.2141, 40.1185, 2020, "functional"],
  ["WP-006", "Wagberi Estate Kiosk", "pipeline_kiosk", "Wajir East", "Wagberi", 1.7506, 40.0608, 2019, "functional"],
  ["WP-007", "Township Borehole 2", "borehole", "Wajir East", "Township", 1.7473, 40.0573, 2015, "under_repair"],
  ["WP-008", "Hadado Shallow Well", "hand_dug_well", "Wajir West", "Hadado", 1.8542, 39.3208, 2009, "functional"],
  ["WP-009", "Khorof Harar Borehole", "borehole", "Wajir East", "Khorof Harar", 1.5788, 40.4419, 2017, "functional"],
  ["WP-010", "Leheley Water Pan", "water_pan", "Wajir North", "Leheley", 2.5342, 39.8463, 2021, "non_functional"],
  ["WP-011", "Diff Borehole", "borehole", "Wajir South", "Diff", 0.1352, 39.1897, 2014, "functional"],
  ["WP-012", "Buna Market Kiosk", "pipeline_kiosk", "Wajir North", "Buna", 3.4741, 39.7733, 2022, "functional"],
  ["WP-013", "Basir Borehole", "borehole", "Wajir East", "Basir", 1.9135, 40.3688, 2012, "under_repair"],
  ["WP-014", "Della Community Well", "hand_dug_well", "Eldas", "Della", 2.3649, 39.6705, 2008, "functional"],
  ["WP-015", "Lakoley Water Pan", "water_pan", "Wajir West", "Lakoley", 1.9531, 39.7495, 2020, "functional"],
  ["WP-016", "Sabuli Borehole", "borehole", "Wajir South", "Sabuli", 0.8222, 39.6382, 2016, "non_functional"],
  ["WP-017", "Kajaja Shallow Well", "hand_dug_well", "Tarbaj", "Kajaja", 2.0894, 40.2019, 2010, "functional"],
  ["WP-018", "Korondile Borehole", "borehole", "Wajir North", "Korondile", 2.8894, 39.5317, 2018, "functional"],
  ["WP-019", "Gurar Water Pan", "water_pan", "Wajir North", "Gurar", 3.2401, 39.2475, 2019, "under_repair"],
  ["WP-020", "Lagboghol Borehole", "borehole", "Wajir South", "Lagboghol", 0.6726, 39.8997, 2014, "functional"],
  ["WP-021", "Arbajahan Kiosk", "pipeline_kiosk", "Wajir West", "Arbajahan", 1.9722, 39.4927, 2021, "functional"],
  ["WP-022", "Danaba Borehole", "borehole", "Eldas", "Danaba", 2.7203, 39.1832, 2015, "non_functional"],
  ["WP-023", "Qarsa Community Well", "hand_dug_well", "Wajir East", "Qarsa", 1.3771, 40.2392, 2011, "functional"],
  ["WP-024", "Biyamadhow Water Pan", "water_pan", "Wajir South", "Biyamadhow", 0.4148, 39.5963, 2020, "functional"],
  ["WP-025", "Elben Borehole", "borehole", "Tarbaj", "Elben", 2.3117, 40.3793, 2017, "under_repair"],
  ["WP-026", "Gunana Kiosk", "pipeline_kiosk", "Wajir North", "Gunana", 3.1196, 39.6621, 2022, "functional"],
  ["WP-027", "Mansa Borehole", "borehole", "Wajir West", "Mansa", 1.7427, 39.1182, 2013, "functional"],
  ["WP-028", "Sarman Shallow Well", "hand_dug_well", "Wajir North", "Sarman", 3.0113, 39.4037, 2007, "non_functional"],
  ["WP-029", "Abakore Water Pan", "water_pan", "Eldas", "Abakore", 2.1778, 39.8014, 2019, "functional"],
  ["WP-030", "Riba Borehole", "borehole", "Wajir East", "Riba", 1.6119, 40.1622, 2016, "functional"]
];

const seedWaterpoints = basePoints.map(([id, name, type, subCounty, ward, latitude, longitude, yearInstalled, status], index) => ({
  id,
  name,
  type,
  subCounty,
  ward,
  latitude,
  longitude,
  yearInstalled,
  status,
  notes: "Synthetic record for academic prototype testing.",
  createdAt: new Date(Date.UTC(2026, 4, 1 + index)).toISOString()
}));


let state = loadState();
let currentUser = null;
let currentView = "dashboard";
let map = null;
let markerLayer = null;

const el = (id) => document.getElementById(id);
const formatType = (value) => value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
const formatStatus = (value) => ({ functional: "Functional", non_functional: "Non-Functional", under_repair: "Under Repair" }[value] || value);

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  el("toastContainer").appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showFormError(id, message) {
  const target = el(id);
  target.textContent = message;
  target.classList.remove("hidden");
}

function clearFormError(id) {
  const target = el(id);
  target.textContent = "";
  target.classList.add("hidden");
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  const initial = { users: seedUsers, waterpoints: seedWaterpoints, tickets: seedTickets };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setAuthMode(mode) {
  const signupMode = mode === "signup";
  el("loginForm").classList.toggle("hidden", signupMode);
  el("signupForm").classList.toggle("hidden", !signupMode);
  el("showLogin").classList.toggle("active", !signupMode);
  el("showSignup").classList.toggle("active", signupMode);
}

function startSession(user) {
  currentUser = user;
  el("loginScreen").classList.add("hidden");
  el("appShell").classList.remove("hidden");
  el("roleLabel").textContent = `${user.name} • ${formatType(user.role)}`;
  setView("dashboard");
  renderAll();
}

function requireAdmin() {
  return currentUser?.role === "admin";
}

function visibleWaterpoints() {
  const search = el("globalSearch").value.trim().toLowerCase();
  const status = el("statusFilter")?.value || "";
  const type = el("typeFilter")?.value || "";
  const subCounty = el("subCountyFilter")?.value || "";
  return state.waterpoints.filter((point) => {
    const text = `${point.id} ${point.name} ${point.subCounty} ${point.ward} ${point.type} ${point.status}`.toLowerCase();
    return (!search || text.includes(search)) &&
      (!status || point.status === status) &&
      (!type || point.type === type) &&
      (!subCounty || point.subCounty === subCounty);
  });
}

function renderAll() {
  populateSelects();
  renderMetrics();
  renderDashboardTables();
  renderWaterpoints();
  renderTickets();
  renderReports();
  renderUsers();
  renderMapMarkers();
}

function renderMetrics() {
  const total = state.waterpoints.length;
  const functional = state.waterpoints.filter((p) => p.status === "functional").length;
  const nonFunctional = state.waterpoints.filter((p) => p.status === "non_functional").length;
  const underRepair = state.waterpoints.filter((p) => p.status === "under_repair").length;
  const pending = state.tickets.filter((t) => t.status !== "Resolved").length;
  const metrics = [
    ["Total Water Points", total, "var(--blue)"],
    ["Functional", functional, "var(--green)"],
    ["Non-Functional", nonFunctional, "var(--red)"],
    ["Pending Repairs", pending || underRepair, "var(--amber)"]
  ];
  el("metricsGrid").innerHTML = metrics.map(([label, value, color]) => `
    <article class="metric-card">
      <span>${label}</span>
      <strong style="color:${color}">${value}</strong>
    </article>
  `).join("");
}

function renderDashboardTables() {
  const recent = [...state.waterpoints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
  el("recentWaterpoints").innerHTML = recent.map((point) => `
    <tr>
      <td>${point.name}</td>
      <td>${point.subCounty}</td>
      <td>${formatType(point.type)}</td>
      <td><span class="badge ${point.status}">${formatStatus(point.status)}</span></td>
      <td>${point.yearInstalled}</td>
    </tr>
  `).join("");

  const pendingTickets = state.tickets.filter((ticket) => ticket.status !== "Resolved").slice(0, 5);
  el("pendingRepairs").innerHTML = pendingTickets.length ? pendingTickets.map((ticket) => {
    const point = getPoint(ticket.waterPointId);
    return `<article class="list-item">
      <strong>${point?.name || "Unknown Water Point"}</strong>
      <span class="muted">${ticket.faultType} • ${ticket.priority} priority • ${ticket.assignedTo}</span>
    </article>`;
  }).join("") : `<p class="muted">No pending maintenance tickets.</p>`;
}

function renderWaterpoints() {
  const rows = visibleWaterpoints();
  el("waterpointsTable").innerHTML = rows.map((point) => `
    <tr>
      <td>${point.id}</td>
      <td>${point.name}</td>
      <td>${point.subCounty} / ${point.ward}</td>
      <td>${formatType(point.type)}</td>
      <td><span class="badge ${point.status}">${formatStatus(point.status)}</span></td>
      <td>${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}</td>
      <td>
        <div class="row-actions">
          <button class="secondary-button" data-edit="${point.id}">Edit</button>
          ${requireAdmin() ? `<button class="danger-button" data-delete="${point.id}">Delete</button>` : ""}
        </div>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="7" class="muted">No records match the selected filters.</td></tr>`;
}

function renderTickets() {
  el("ticketsList").innerHTML = state.tickets.map((ticket) => {
    const point = getPoint(ticket.waterPointId);
    return `<article class="ticket">
      <div>
        <strong>${ticket.id} • ${point?.name || "Unknown Water Point"}</strong>
        <p class="muted">${ticket.description}</p>
      </div>
      <div class="ticket-meta">
        <span>${ticket.faultType}</span>
        <span>${ticket.priority} priority</span>
        <span>Assigned: ${ticket.assignedTo}</span>
        <span>Status: ${ticket.status}</span>
        <span>Reported: ${new Date(ticket.reportedAt).toLocaleString()}</span>
      </div>
      <div class="ticket-actions">
        ${ticket.status === "Open" ? `<button class="secondary-button" data-ticket-progress="${ticket.id}">Start Work</button>` : ""}
        ${ticket.status !== "Resolved" ? `<button data-ticket-resolve="${ticket.id}">Mark Resolved</button>` : `<span class="badge functional">Resolved</span>`}
      </div>
    </article>`;
  }).join("") || `<p class="muted">No maintenance tickets have been logged.</p>`;
}

function renderReports() {
  renderStatusReport();
  renderMaintenanceReport();
  renderBarReport("subCountyReport", countBy(state.waterpoints, "subCounty"));
  renderBarReport("typeReport", countBy(state.waterpoints, "type"), formatType);
}

function renderStatusReport() {
  const statusCounts = countBy(state.waterpoints, "status");
  const total = state.waterpoints.length;
  if (!total) {
    el("statusReport").innerHTML = `<p class="muted">No water points recorded.</p>`;
    return;
  }
  const order = ["functional", "under_repair", "non_functional"];
  const segments = order.map((status) => ({
    status,
    count: statusCounts[status] || 0,
    pct: Math.round(((statusCounts[status] || 0) / total) * 100)
  }));
  const bar = segments.filter((segment) => segment.count > 0).map((segment) => `
    <div class="status-segment ${segment.status}" style="width:${(segment.count / total) * 100}%" title="${formatStatus(segment.status)}: ${segment.count} (${segment.pct}%)"></div>
  `).join("");
  const legend = segments.map((segment) => `
    <div class="status-legend-item">
      <span class="status-dot ${segment.status}"></span>
      ${formatStatus(segment.status)} <strong>${segment.count}</strong> <span class="muted">(${segment.pct}%)</span>
    </div>
  `).join("");
  el("statusReport").innerHTML = `<div class="status-stack">${bar}</div><div class="status-legend">${legend}</div>`;
}

function renderMaintenanceReport() {
  const open = state.tickets.filter((ticket) => ticket.status !== "Resolved").length;
  const resolved = state.tickets.filter((ticket) => ticket.status === "Resolved").length;
  const high = state.tickets.filter((ticket) => ticket.priority === "High" && ticket.status !== "Resolved").length;

  const total = state.waterpoints.length;
  const functional = state.waterpoints.filter((point) => point.status === "functional").length;
  const functionalRate = total ? `${Math.round((functional / total) * 100)}%` : "—";

  const resolvedTickets = state.tickets.filter((ticket) => ticket.status === "Resolved" && ticket.resolvedAt);
  const avgResolutionDays = resolvedTickets.length
    ? resolvedTickets.reduce((sum, ticket) => sum + (new Date(ticket.resolvedAt) - new Date(ticket.reportedAt)), 0) / resolvedTickets.length / (1000 * 60 * 60 * 24)
    : null;
  const avgResolutionLabel = avgResolutionDays === null ? "—" : `${avgResolutionDays.toFixed(1)} days`;

  el("maintenanceReport").innerHTML = [
    ["Open tickets", open],
    ["Resolved tickets", resolved],
    ["High-priority open tickets", high],
    ["Functional rate", functionalRate],
    ["Avg. resolution time", avgResolutionLabel]
  ].map(([label, value]) => `<div class="report-item"><strong>${value}</strong><p class="muted">${label}</p></div>`).join("");
}

function renderBarReport(containerId, counts, formatLabel = (value) => value) {
  const entries = Object.entries(counts);
  if (!entries.length) {
    el(containerId).innerHTML = `<p class="muted">No data available.</p>`;
    return;
  }
  const max = Math.max(...entries.map(([, count]) => count));
  el(containerId).innerHTML = entries.sort((a, b) => b[1] - a[1]).map(([key, count]) => `
    <div class="bar-row">
      <div class="bar-label"><strong>${formatLabel(key)}</strong><span>${count}</span></div>
      <div class="bar-track" title="${formatLabel(key)}: ${count}"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
    </div>
  `).join("");
}

function renderUsers() {
  el("usersNav").classList.toggle("hidden", !requireAdmin());
  el("usersList").innerHTML = state.users.map((user) => `
    <article class="list-item">
      <strong>${user.name}</strong>
      <span class="muted">${user.email} • ${formatType(user.role)}</span>
    </article>
  `).join("");
}

function populateSelects() {
  const subCounties = [...new Set(state.waterpoints.map((point) => point.subCounty))].sort();
  el("subCountyFilter").innerHTML = `<option value="">All sub-counties</option>${subCounties.map((name) => `<option value="${name}">${name}</option>`).join("")}`;
  el("breakdownWaterPoint").innerHTML = state.waterpoints.map((point) => `<option value="${point.id}">${point.id} - ${point.name}</option>`).join("");
  el("assignedTo").innerHTML = state.users
    .filter((user) => user.role === "technician" || user.role === "field_officer")
    .map((user) => `<option value="${user.name}">${user.name}</option>`)
    .join("");
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    counts[item[key]] = (counts[item[key]] || 0) + 1;
    return counts;
  }, {});
}

function getPoint(id) {
  return state.waterpoints.find((point) => point.id === id);
}

function setView(view) {
  currentView = view;
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.querySelectorAll(".view").forEach((section) => section.classList.remove("active-view"));
  el(`${view}View`).classList.add("active-view");
  el("viewTitle").textContent = document.querySelector(`[data-view="${view}"]`).textContent;
  if (view === "map") {
    setTimeout(initMap, 50);
  }
}

function initMap() {
  if (!map) {
    map = L.map("map").setView([1.9, 39.8], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
  }
  map.invalidateSize();
  renderMapMarkers();
}

function markerColor(status) {
  return { functional: "#238636", non_functional: "#c2412d", under_repair: "#b7791f" }[status] || "#1769aa";
}

function markerIcon(status) {
  return L.divIcon({
    className: "status-marker",
    html: `<span style="background:${markerColor(status)};width:18px;height:18px;border:3px solid white;border-radius:50%;display:block;box-shadow:0 2px 8px rgba(0,0,0,.3)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

function renderMapMarkers() {
  if (!map || !markerLayer) return;
  const activeStatus = document.querySelector("#mapFilters button.active")?.dataset.status || "";
  markerLayer.clearLayers();
  state.waterpoints
    .filter((point) => !activeStatus || point.status === activeStatus)
    .forEach((point) => {
      const popupContent = `<strong>${point.name}</strong><br>${point.subCounty} / ${point.ward}<br>${formatType(point.type)}<br><span>${formatStatus(point.status)}</span>`;
      L.marker([point.latitude, point.longitude], { icon: markerIcon(point.status) })
        .bindTooltip(popupContent, { direction: "top", offset: [0, -9] })
        .bindPopup(popupContent)
        .addTo(markerLayer);
    });
}

function openWaterpointForm(pointId = "") {
  const point = pointId ? getPoint(pointId) : null;
  el("waterpointFormTitle").textContent = point ? "Edit Water Point" : "Add Water Point";
  el("waterpointId").value = point?.id || "";
  el("waterpointName").value = point?.name || "";
  el("waterpointType").value = point?.type || "borehole";
  el("subCounty").value = point?.subCounty || "";
  el("ward").value = point?.ward || "";
  el("latitude").value = point?.latitude || "";
  el("longitude").value = point?.longitude || "";
  el("yearInstalled").value = point?.yearInstalled || new Date().getFullYear();
  el("waterpointStatus").value = point?.status || "functional";
  el("notes").value = point?.notes || "";
  el("waterpointDialog").showModal();
  el("waterpointName").focus();
}

function saveWaterpoint(event) {
  event.preventDefault();
  const id = el("waterpointId").value || `WP-${String(state.waterpoints.length + 1).padStart(3, "0")}`;
  const point = {
    id,
    name: el("waterpointName").value.trim(),
    type: el("waterpointType").value,
    subCounty: el("subCounty").value.trim(),
    ward: el("ward").value.trim(),
    latitude: Number(el("latitude").value),
    longitude: Number(el("longitude").value),
    yearInstalled: Number(el("yearInstalled").value),
    status: el("waterpointStatus").value,
    notes: el("notes").value.trim(),
    createdAt: getPoint(id)?.createdAt || new Date().toISOString()
  };
  const existingIndex = state.waterpoints.findIndex((item) => item.id === id);
  if (existingIndex >= 0) {
    state.waterpoints[existingIndex] = point;
  } else {
    state.waterpoints.push(point);
  }
  saveState();
  el("waterpointDialog").close();
  renderAll();
  showToast(existingIndex >= 0 ? "Water point updated" : "Water point added");
}

function deleteWaterpoint(id) {
  if (!requireAdmin()) return;
  const point = getPoint(id);
  if (!point) return;
  if (!confirm(`Delete ${point.name}? This will also remove its maintenance tickets. This cannot be undone.`)) return;
  state.waterpoints = state.waterpoints.filter((item) => item.id !== id);
  state.tickets = state.tickets.filter((ticket) => ticket.waterPointId !== id);
  saveState();
  renderAll();
  showToast("Water point deleted", "error");
}

function csvEscape(value) {
  const text = String(value);
  return /["\n,]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportWaterpointsCSV() {
  const headers = ["ID", "Name", "Type", "Sub-county", "Ward", "Latitude", "Longitude", "Year Installed", "Status"];
  const rows = state.waterpoints.map((point) => [
    point.id, point.name, formatType(point.type), point.subCounty, point.ward,
    point.latitude, point.longitude, point.yearInstalled, formatStatus(point.status)
  ].map(csvEscape).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wpmis-water-points-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Report exported");
}

function createTicket(event) {
  event.preventDefault();
  const waterPointId = el("breakdownWaterPoint").value;
  const ticket = {
    id: `MT-${String(state.tickets.length + 1).padStart(3, "0")}`,
    waterPointId,
    faultType: el("faultType").value,
    priority: el("priority").value,
    assignedTo: el("assignedTo").value,
    description: el("faultDescription").value.trim(),
    status: "Open",
    reportedAt: new Date().toISOString(),
    resolvedAt: ""
  };
  state.tickets.unshift(ticket);
  const point = getPoint(waterPointId);
  if (point) point.status = "under_repair";
  saveState();
  event.target.reset();
  renderAll();
  showToast("Maintenance ticket created");
}

function updateTicket(id, status) {
  const ticket = state.tickets.find((item) => item.id === id);
  if (!ticket) return;
  ticket.status = status;
  if (status === "Resolved") {
    ticket.resolvedAt = new Date().toISOString();
    const point = getPoint(ticket.waterPointId);
    if (point) point.status = "functional";
  }
  saveState();
  renderAll();
  showToast(status === "Resolved" ? "Ticket resolved" : "Ticket marked in progress");
}

function wireEvents() {
  el("showLogin").addEventListener("click", () => setAuthMode("login"));
  el("showSignup").addEventListener("click", () => setAuthMode("signup"));

  el("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormError("loginError");
    const email = el("loginEmail").value.trim().toLowerCase();
    const password = el("loginPassword").value;
    const user = state.users.find((candidate) => candidate.email === email && candidate.password === password);
    if (!user) {
      showFormError("loginError", "Invalid email or password.");
      return;
    }
    startSession(user);
  });

  el("signupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormError("signupError");
    const name = el("signupName").value.trim();
    const email = el("signupEmail").value.trim().toLowerCase();
    const role = el("signupRole").value;
    const password = el("signupPassword").value;
    const confirmPassword = el("signupConfirmPassword").value;

    if (password !== confirmPassword) {
      showFormError("signupError", "Passwords do not match.");
      return;
    }

    if (state.users.some((user) => user.email.toLowerCase() === email)) {
      showFormError("signupError", "An account with this email already exists.");
      return;
    }

    const user = {
      id: `USR-${String(state.users.length + 1).padStart(3, "0")}`,
      name,
      email,
      password,
      role
    };
    state.users.push(user);
    saveState();
    event.target.reset();
    startSession(user);
    showToast("Account created — welcome!");
  });

  el("logoutButton").addEventListener("click", () => {
    currentUser = null;
    el("appShell").classList.add("hidden");
    el("loginScreen").classList.remove("hidden");
  });

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches("[data-action='open-waterpoint-form']")) openWaterpointForm();
    if (target.matches("[data-action='close-dialog']")) el("waterpointDialog").close();
    if (target.dataset.edit) openWaterpointForm(target.dataset.edit);
    if (target.dataset.delete) deleteWaterpoint(target.dataset.delete);
    if (target.dataset.ticketProgress) updateTicket(target.dataset.ticketProgress, "In Progress");
    if (target.dataset.ticketResolve) updateTicket(target.dataset.ticketResolve, "Resolved");
  });

  el("waterpointForm").addEventListener("submit", saveWaterpoint);
  el("breakdownForm").addEventListener("submit", createTicket);
  el("exportReport").addEventListener("click", exportWaterpointsCSV);
  ["globalSearch", "statusFilter", "typeFilter", "subCountyFilter"].forEach((id) => el(id).addEventListener("input", renderAll));
  el("resetDemoData").addEventListener("click", () => {
    if (!confirm("Reset all data to the demo defaults? Any changes you've made will be lost.")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    renderAll();
    showToast("Demo data reset");
  });

  el("mapFilters").addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    document.querySelectorAll("#mapFilters button").forEach((button) => button.classList.remove("active"));
    event.target.classList.add("active");
    renderMapMarkers();
  });
}

wireEvents();
