const registryContainer = document.getElementById('registry-entries');
const searchInput = document.getElementById('registry-search');

async function loadRegistryData() {
  try {
    const response = await fetch('registry-data.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load registry data');
    const entries = await response.json();
    renderRegistryEntries(entries);
    return entries;
  } catch (error) {
    console.error(error);
    registryContainer.innerHTML = '<p class="error-message">Unable to load registry entries.</p>';
    return [];
  }
}

function getTagBadge(tag) {
  if (!tag || tag.toLowerCase() === 'normal') return '';
  const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
  return `<span class="tag-badge tag-${normalizedTag}">${tag}</span>`;
}

function createRegistryCard(entry) {
  const tagBadge = getTagBadge(entry.tag);
  const card = document.createElement('article');
  card.className = 'project-card registry-card';
  // Only include image markup when an image path is provided
  const hasImage = entry.image && String(entry.image).trim() !== '';
  const imgHtml = hasImage
    ? `<div class="registry-image"><img src="${entry.image}" alt="${entry.name}" onerror="this.style.display='none';this.parentNode.style.display='none';"/></div>`
    : '';

  card.innerHTML = `
    ${imgHtml}
    <div class="registry-content">
      <div class="card-heading">
        <div>
          <h3>${entry.name}</h3>
          <span class="badge standard">Registry ID: ${entry.registryId}</span>
        </div>
      </div>
      ${tagBadge ? `<div>${tagBadge}</div>` : ''}
      <p><strong>Quirk Name:</strong> ${entry.quirkName}</p>
      <p><strong>Type:</strong> ${entry.type}</p>
      <p><strong>Hereditary:</strong> ${entry.hereditary}</p>
      <p><strong>Details:</strong> ${entry.details}</p>
    </div>
  `;
  return card;
}

function renderRegistryEntries(entries) {
  registryContainer.innerHTML = '';
  entries.forEach(entry => registryContainer.appendChild(createRegistryCard(entry)));
}

function filterRegistry(entries, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return entries.filter(entry =>
    entry.name.toLowerCase().includes(normalizedQuery) ||
    entry.quirkName.toLowerCase().includes(normalizedQuery) ||
    entry.registryId.toLowerCase().includes(normalizedQuery) ||
    entry.type.toLowerCase().includes(normalizedQuery) ||
    (entry.tag || '').toLowerCase().includes(normalizedQuery)
  );
}

(async () => {
  const entries = await loadRegistryData();

  searchInput.addEventListener('input', event => {
    const filtered = filterRegistry(entries, event.target.value);
    renderRegistryEntries(filtered);
  });
})();
