// ===== Helpers: selectors =====
const $ = (s, el = document) => el.querySelector(s);

// ===== Dropdown =====
const dropBtn = $('#dropBtn');
const dropdownMenu = $('#dropdownMenu');
dropBtn.addEventListener('click', () => {
  const open = dropdownMenu.style.display === 'block';
  dropdownMenu.style.display = open ? 'none' : 'block';
  dropBtn.setAttribute('aria-expanded', String(!open));
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) dropdownMenu.style.display = 'none';
});

// ===== Sidebar =====
const sidebar = $('#sidebar');
const backdrop = $('#backdrop');
const openSidebarBtn = $('#openSidebar');
const closeSidebarBtn = $('#closeSidebar');
const toggleSidebar = (show) => {
  if (show) {
    sidebar.style.transform = 'translateX(0)';
    backdrop.style.display = 'block';
    sidebar.setAttribute('aria-hidden', 'false');
  } else {
    sidebar.style.transform = 'translateX(-100%)';
    backdrop.style.display = 'none';
    sidebar.setAttribute('aria-hidden', 'true');
  }
}
openSidebarBtn.addEventListener('click', () => toggleSidebar(true));
closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
backdrop.addEventListener('click', () => toggleSidebar(false));

// ===== Theme toggle (Dark/Light) =====
const themeBtns = ['#toggleTheme', '#toggleThemeTop'].map(sel => $(sel));
const applyTheme = (mode) => {
  document.documentElement.classList.toggle('light', mode === 'light');
  localStorage.setItem('theme', mode);
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) applyTheme(savedTheme);
themeBtns.forEach(btn => btn && btn.addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}));

// ===== Skills bars animation =====
const bars = document.querySelectorAll('.skill .bar > span');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const w = el.getAttribute('data-width') || '80%';
      el.style.transition = 'width 900ms ease';
      el.style.width = w;
      io.unobserve(el);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => io.observe(b));

// ===== Contact form (demo only) =====
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  $('#formMsg').textContent = `Thanks, ${data.name}! I will get back to you at ${data.email}.`;
  form.reset();
});

// ===== Backfill year =====
$('#year').textContent = new Date().getFullYear();

// ===== Generate and download a simple resume (placeholder) =====
document.getElementById('downloadResume').addEventListener('click', (e) => {
  e.preventDefault();
  const blob = new Blob([
    `Rajnish Yadav\nJava Developer\n\nSkills: Java, Spring Boot, REST, JPA, MySQL/Oracle\nProjects: Loan Processing, Shipping Cost Calculator, Student Record Sync, Actor Management API\nContact: rajnish@example.com\n`], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Rajnish_Yadav_Resume.txt';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});