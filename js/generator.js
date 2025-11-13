// Subject Generator JavaScript
document.getElementById('year').textContent = new Date().getFullYear();

var generatedHTML = ''; // Global variable to store generated HTML

const form = document.getElementById('subjectForm');
const outputBox = document.getElementById('outputBox');
const outputHTML = document.getElementById('outputHTML');
const fileName = document.getElementById('fileName');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

function escapeHtml(text){
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatBirthDate(dobString) {
  // Convert MM/DD to "Month DDth" format
  const parts = dobString.split('/');
  if (parts.length !== 2) return dobString; // Return as-is if not in expected format
  
  const month = parseInt(parts[0]);
  const day = parseInt(parts[1]);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Add ordinal suffix (st, nd, rd, th)
  function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  
  return monthNames[month - 1] + ' ' + getOrdinal(day);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect form data
  const subjectName = document.getElementById('subjectName').value.trim();
  const subjectId = document.getElementById('subjectId').value.trim();
  const titlesRaw = document.getElementById('titles').value.trim();
  const status = document.getElementById('status').value;
  const powerClass = document.getElementById('powerClass').value;
  const clearanceLevel = document.getElementById('clearanceLevel').value;
  const age = document.getElementById('age').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const dobFormatted = formatBirthDate(dob); // Format the date
  const height = document.getElementById('height').value.trim();
  const bloodType = document.getElementById('bloodType').value.trim();
  const ethnicity = document.getElementById('ethnicity').value.trim();
  const quirkName = document.getElementById('quirkName').value.trim();
  const quirkDetails = document.getElementById('quirkDetails').value.trim();

  // Parse titles
  const titles = titlesRaw ? titlesRaw.split(',').map(t => t.trim()).filter(t => t) : [];
  const titleBadges = titles.length > 0
    ? titles.map(t => '<span class="title-badge">' + escapeHtml(t) + '</span>').join('\n              ')
    : '<span class="title-badge">No Title</span>';

  // Determine status class
  let statusClass = 'status-active';
  if(status.toLowerCase().includes('dead') || status.toLowerCase().includes('terminated')){
    statusClass = 'status-inactive';
  } else if(status.toLowerCase().includes('missing')){
    statusClass = 'status-unknown';
  }

  // Generate HTML using string concatenation to avoid script tag issues
  generatedHTML = '<!doctype html>\n' +
'<html lang="en">\n' +
'  <head>\n' +
'    <meta charset="utf-8" />\n' +
'    <meta name="viewport" content="width=device-width,initial-scale=1" />\n' +
'    <title>' + escapeHtml(subjectName) + ' - Subject File</title>\n' +
'    <link rel="stylesheet" href="../css/style.css" />\n' +
'    <style>\n' +
'      /* Subject profile specific styles */\n' +
'      .subject-profile{display:grid;grid-template-columns:1fr;gap:24px;margin-top:18px}\n' +
'      @media(min-width:768px){\n' +
'        .subject-profile{grid-template-columns:280px 1fr}\n' +
'      }\n' +
'      \n' +
'      .subject-photo{width:100%;max-width:280px;height:auto;border-radius:8px;border:2px solid #eef2ff;box-shadow:0 6px 18px rgba(11,61,145,.08)}\n' +
'      \n' +
'      .info-grid{display:grid;grid-template-columns:1fr;gap:12px}\n' +
'      @media(min-width:600px){\n' +
'        .info-grid{grid-template-columns:1fr 1fr}\n' +
'      }\n' +
'      \n' +
'      .info-field{background:#fbfdff;padding:14px;border-radius:8px;border:1px solid #eef2ff}\n' +
'      .info-field .label{font-weight:700;color:var(--brand-navy);font-size:0.9rem;margin-bottom:4px;display:block}\n' +
'      .info-field .value{color:#374151;font-size:1rem}\n' +
'      \n' +
'      .quirk-section{background:#ffffff;border:2px solid #eef6ff;padding:20px;border-radius:12px;margin-top:24px;box-shadow:0 8px 24px rgba(11,61,145,.06)}\n' +
'      .quirk-section h3{margin-top:0;color:var(--brand-navy);font-family:Merriweather, serif}\n' +
'      \n' +
'      .status-badge{display:inline-block;padding:6px 14px;border-radius:20px;font-weight:600;font-size:0.9rem}\n' +
'      .status-active{background:#dcfce7;color:#166534;border:1px solid #86efac}\n' +
'      .status-inactive{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}\n' +
'      .status-unknown{background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db}\n' +
'      \n' +
'      .section-heading{color:var(--brand-navy);font-family:Merriweather, serif;font-size:1.3rem;margin:28px 0 14px 0;padding-bottom:8px;border-bottom:2px solid #eef2ff}\n' +
'      \n' +
'      .notes-muted{color:var(--muted);font-size:0.9rem;margin:0 0 16px 0}\n' +
'      .abilities-list{list-style:none;padding:0;margin:0}\n' +
'      .ability{background:#fbfdff;padding:16px;border-radius:8px;border:1px solid #eef2ff;margin-bottom:12px}\n' +
'      .ability-title{font-weight:700;color:var(--brand-navy);font-size:1.05rem;margin-bottom:6px}\n' +
'      .ability-desc{margin:0;color:#374151;line-height:1.6}\n' +
'      \n' +
'      .report-grid{display:grid;gap:14px}\n' +
'      .report-slot{background:#fbfdff;padding:16px;border-radius:8px;border:1px solid #eef2ff}\n' +
'      .report-label{display:block;font-weight:700;color:var(--brand-navy);margin-bottom:8px;font-size:0.95rem}\n' +
'    </style>\n' +
'  </head>\n' +
'  <body>\n' +
'    <header class="site-header">\n' +
'      <img src="../img/HPSC.jpeg" alt="Hero Public Safety Commission emblem" class="emblem" />\n' +
'      <div>\n' +
'        <div class="site-title">Hero Public Safety Commission</div>\n' +
'        <div class="site-sub">Subject File — ' + escapeHtml(subjectId) + '</div>\n' +
'      </div>\n' +
'    </header>\n' +
'\n' +
'    <main class="container">\n' +
'      <nav class="site-nav">\n' +
'        <a href="../index.html">Home</a>\n' +
'        <a href="../protected.html">Projects</a>\n' +
'        <a href="../chimara-secret.html">Chimara Files</a>\n' +
'      </nav>\n' +
'\n' +
'      <section class="card" style="margin-top:18px">\n' +
'        <!-- Subject Header -->\n' +
'        <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:12px">\n' +
'          <div>\n' +
'            <h1 style="margin:0;font-family:Merriweather, serif;color:var(--brand-navy);font-size:1.8rem">' + escapeHtml(subjectId) + ' - ' + escapeHtml(subjectName) + '</h1>\n' +
'            <div class="title-badges">\n' +
'              ' + titleBadges + '\n' +
'            </div>\n' +
'          </div>\n' +
'          <span class="status-badge ' + statusClass + '">' + escapeHtml(status) + '</span>\n' +
'        </div>\n' +
'\n' +
'        <!-- Subject Profile Grid -->\n' +
'        <div class="subject-profile">\n' +
'          <!-- Left Column: Photo -->\n' +
'          <div>\n' +
'            <img src="img/' + escapeHtml(subjectName) + '.jpg" alt="' + escapeHtml(subjectName) + ' Photo" class="subject-photo" />\n' +
'            <div style="margin-top:12px;text-align:center">\n' +
'              <div class="info-field">\n' +
'                <span class="label">Subject ID</span>\n' +
'                <div class="value" style="font-family:monospace;font-weight:600">Subject-' + escapeHtml(subjectId) + '-' + escapeHtml(subjectName) + '</div>\n' +
'              </div>\n' +
'            </div>\n' +
'          </div>\n' +
'\n' +
'          <!-- Right Column: Basic Information -->\n' +
'          <div>\n' +
'            <h2 style="margin-top:0;font-size:1.2rem;color:var(--brand-navy)">Basic Information</h2>\n' +
'            <div class="info-grid">\n' +
'              <div class="info-field">\n' +
'                <span class="label">Power Class</span>\n' +
'                <div class="value">' + escapeHtml(powerClass) + '</div>\n' +
'              </div>\n' +
'\n' +
'              <div class="info-field">\n' +
'                <span class="label">Clearance Level</span>\n' +
'                <div class="value">Level ' + escapeHtml(clearanceLevel) + '</div>\n' +
'              </div>\n' +
'\n' +
'              <div class="info-field">\n' +
'                <span class="label">Current Age</span>\n' +
'                <div class="value">' + escapeHtml(age) + ' years old</div>\n' +
'              </div>\n' +
'\n' +
'              <div class="info-field">\n' +
'                <span class="label">Birth Date</span>\n' +
'                <div class="value">' + escapeHtml(dobFormatted) + '</div>\n' +
'              </div>\n' +
'\n' +
'              <div class="info-field">\n' +
'                <span class="label">Height</span>\n' +
'                <div class="value">' + escapeHtml(height) + '</div>\n' +
'              </div>\n' +
'\n' +
'              <div class="info-field">\n' +
'                <span class="label">Blood Type</span>\n' +
'                <div class="value">' + escapeHtml(bloodType) + '</div>\n' +
'              </div>\n' +
'\n' +
'              <div class="info-field" style="grid-column:1/-1">\n' +
'                <span class="label">Ethnicity</span>\n' +
'                <div class="value">' + escapeHtml(ethnicity) + '</div>\n' +
'              </div>\n' +
'            </div>\n' +
'          </div>\n' +
'        </div>\n' +
'\n' +
'        <!-- Quirk Information -->\n' +
'        <div class="quirk-section">\n' +
'          <h3>Quirk Information</h3>\n' +
'          <div class="info-field" style="margin-bottom:12px">\n' +
'            <span class="label">Quirk Name</span>\n' +
'            <div class="value" style="font-size:1.1rem;font-weight:600;color:var(--brand-navy)">' + escapeHtml(quirkName) + '</div>\n' +
'          </div>\n' +
'          <div class="info-field">\n' +
'            <span class="label">Quirk Description</span>\n' +
'            <div class="value" style="line-height:1.6">' + escapeHtml(quirkDetails) + '</div>\n' +
'          </div>\n' +
'        </div>\n' +
'\n' +
'        <!-- Current Known Abilities -->\n' +
'        <h2 class="section-heading">List of Current Known Abilities</h2>\n' +
'        <p class="notes-muted">Documented abilities and techniques observed or reported.</p>\n' +
'        <ul class="abilities-list">\n' +
'          <li class="ability">\n' +
'            <div class="ability-title">[Ability Name 1]</div>\n' +
'            <p class="ability-desc">[Ability details 1]</p>\n' +
'          </li>\n' +
'          <li class="ability">\n' +
'            <div class="ability-title">[Ability Name 2]</div>\n' +
'            <p class="ability-desc">[Ability details 2]</p>\n' +
'          </li>\n' +
'          <li class="ability">\n' +
'            <div class="ability-title">[Ability Name 3]</div>\n' +
'            <p class="ability-desc">[Ability details 3]</p>\n' +
'          </li>\n' +
'        </ul>\n' +
'\n' +
'        <!-- Director Reports -->\n' +
'        <h2 class="section-heading">Director Reports</h2>\n' +
'        <p class="notes-muted">Official assessments and observations from project directors and commission supervisors.</p>\n' +
'        <div class="report-grid">\n' +
'          <div class="report-slot">\n' +
'            <span class="report-label">Report #[Report Number] — [Report Name]</span>\n' +
'            <p>[Subject report info]</p>\n' +
'          </div>\n' +
'        </div>\n' +
'\n' +
'        <!-- Back Navigation -->\n' +
'        <div style="margin-top:32px;padding-top:18px;border-top:1px solid #eef2ff">\n' +
'          <a href="../chimara-secret.html" class="btn btn-secondary" style="text-decoration:none">← Back to Chimara Files</a>\n' +
'        </div>\n' +
'      </section>\n' +
'\n' +
'      <footer class="site-footer">© <span id="year"></span> Hero Public Safety Commission</footer>\n' +
'    </main>\n' +
'\n' +
'    <script src="../js/auth.js"></script>\n' +
'    <script>\n' +
'      Auth.requireAuth(\'../login.html\');\n' +
'      document.getElementById(\'year\').textContent = new Date().getFullYear();\n' +
'    </script>\n' +
'  </body>\n' +
'</html>';

  // Display the generated HTML
  outputHTML.value = generatedHTML;
  fileName.textContent = 'subject-' + subjectId + '-' + subjectName + '.html';
  outputBox.style.display = 'block';
  outputBox.scrollIntoView({ behavior: 'smooth' });
});

// Copy button functionality
copyBtn.addEventListener('click', function() {
  outputHTML.select();
  document.execCommand('copy');
  copyBtn.textContent = '✓ Copied!';
  setTimeout(function() { 
    copyBtn.textContent = 'Copy to Clipboard'; 
  }, 2000);
});

// Download button functionality
downloadBtn.addEventListener('click', function() {
  const blob = new Blob([generatedHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.textContent;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  downloadBtn.textContent = '✓ Downloaded!';
  setTimeout(function() { 
    downloadBtn.textContent = 'Download File'; 
  }, 2000);
});
