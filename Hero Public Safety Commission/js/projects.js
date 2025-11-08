// Demo project data and client-side search for Protected page
(function(global){
  const projects = [
    {
      id: 'p1',
      title: 'Mental Health Outreach Initiative',
      description: 'Community-based outreach and referrals to connect residents to MHA services and resources.',
      tags: ['mental-health','outreach','community'],
      status: 'Active',
      lead: 'Elena Torres',
      startDate: '2024-09-01'
    },
    {
      id: 'p2',
      title: 'Crisis Response Training',
      description: 'Training first responders in de-escalation and mental health-informed interventions.',
      tags: ['training','crisis-response','first-responders'],
      status: 'Ongoing',
      lead: 'Raj Patel',
      startDate: '2023-11-15'
    },
    {
      id: 'p3',
      title: 'Community Awareness Campaign',
      description: 'Public information campaign about available support services and emergency contacts.',
      tags: ['communications','public-awareness'],
      status: 'Planned',
      lead: 'MHA Communications',
      startDate: '2026-01-10'
    },
    {
      id: 'p4',
      title: 'Data & Analytics Dashboard',
      description: 'Centralized dashboard aggregating incident data to inform policy and resource allocation.',
      tags: ['data','dashboard','analytics'],
      status: 'Active',
      lead: 'Data Team',
      startDate: '2024-04-01'
    },
    {
      id: 'p5',
      title: 'Mobile Outreach Unit Pilot',
      description: 'A mobile unit staffed with clinicians to respond to non-emergency behavioral health calls.',
      tags: ['pilot','mobile','clinical'],
      status: 'Pilot',
      lead: 'Jordan Lee',
      startDate: '2025-05-20'
    },
    {
      id: 'p6',
      title: 'Youth Intervention Program',
      description: 'Programs targeted at youth to prevent escalation and connect them to early supports.',
      tags: ['youth','prevention','education'],
      status: 'Ongoing',
      lead: 'Youth Services',
      startDate: '2022-06-01'
    },
    {
      id: 'p7',
      title: 'Interagency Coordination Pilot',
      description: 'A pilot to improve data sharing and coordination between MHA, police, and EMS for better outcomes.',
      tags: ['interagency','coordination','pilot'],
      status: 'Active',
      lead: 'Interagency Program',
      startDate: '2024-12-01'
    },
    {
      id: 'p8',
      title: 'Policy Review & Recommendations',
      description: 'Review of existing policies with recommended updates to improve safety and equity.',
      tags: ['policy','review'],
      status: 'Planned',
      lead: 'Policy Committee',
      startDate: '2026-02-01'
    }
    ,{
      id: 'chimara',
      title: 'Chimara Project',
      description: 'A historic program originating in partnership with MHA focused on community resilience and long-term mental health supports.',
      tags: ['training','crisis-prevention','community'],
      status: 'Active',
      lead: 'Red Miller',
      startDate: '1976-01-01'
    }
  ];

  // utility: case-insensitive contains
  function containsText(text, query){
    if (!text) return false;
    return text.toLowerCase().indexOf(query) !== -1;
  }

  // search across title, description, tags, lead
  function search(q){
    const query = (q || '').trim().toLowerCase();
    if (!query) return projects.slice();
    return projects.filter(p => {
      if (containsText(p.title, query)) return true;
      if (containsText(p.description, query)) return true;
      if (containsText(p.lead, query)) return true;
      if (p.tags && p.tags.some(t => containsText(t, query))) return true;
      return false;
    });
  }

  // render helpers return DOM elements
  function renderProjectCard(p){
    const wrapper = document.createElement('article');
    wrapper.className = 'card';
    wrapper.style.marginBottom = '12px';
    // include a details link for projects that have a dedicated page (e.g., Chimara)
    const detailsHtml = p.id === 'chimara' ? `<div style="margin-top:10px;text-align:right"><a href="chimara.html" class="btn btn-secondary">View details</a></div>` : '';
    wrapper.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px">
        <div>
          <h3 style="margin:0 0 6px 0; font-family:Merriweather, serif; color:var(--brand-navy)">${escapeHtml(p.title)}</h3>
          <p class="muted" style="margin:0 0 8px 0">${escapeHtml(p.description)}</p>
          <p class="muted" style="margin:0; font-size:.95rem"><strong>Lead:</strong> ${escapeHtml(p.lead)} &nbsp;|&nbsp; <strong>Status:</strong> ${escapeHtml(p.status)}</p>
        </div>
        <div style="text-align:right; min-width:120px">
          <div class="muted">Start: ${escapeHtml(p.startDate)}</div>
          <div style="margin-top:8px">
            ${p.tags.map(t => `<span style="display:inline-block;background:#eef2ff;color:var(--brand-navy);padding:4px 8px;border-radius:999px;margin-left:6px;font-size:.85rem">${escapeHtml(t)}</span>`).join('')}
          </div>
          ${detailsHtml}
        </div>
      </div>
    `;
    return wrapper;
  }

  // escape minimal HTML to avoid injection in demo
  function escapeHtml(str){
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(s){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s];
    });
  }

  // public render function: given container and query, render list
  function render(container, q){
    const results = search(q);
    container.innerHTML = '';
    const count = document.createElement('div');
    count.className = 'muted';
    count.style.marginBottom = '12px';
    count.textContent = `${results.length} project${results.length === 1 ? '' : 's'} found`;
    container.appendChild(count);
    if (results.length === 0){
      const no = document.createElement('div');
      no.className = 'card muted';
      no.textContent = 'No projects match your search.';
      container.appendChild(no);
      return;
    }
    results.forEach(p => container.appendChild(renderProjectCard(p)));
  }

  // small debounce helper
  function debounce(fn, wait){
    let t = null;
    return function(){
      const args = arguments;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // expose API
  global.Projects = { render, search, debounce };
})(window);
