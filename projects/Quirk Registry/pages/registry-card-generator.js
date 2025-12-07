// Registry Card Generator
// Dynamically generates quirk registry cards from quirk-data.js

function generateRegistryCards() {
    const resultsGrid = document.getElementById('resultsGrid');
    if (!resultsGrid) return;

    // Clear existing content
    resultsGrid.innerHTML = '';

    const cardsArray = [];

    // Loop through all quirk data entries
    for (const [registryId, quirkData] of Object.entries(quirkRegistryData)) {
        // Create card element
        const card = document.createElement('div');
        card.className = 'info-card';
        card.setAttribute('data-registry-id', registryId);
        card.style.position = 'relative';

        // Extract name (handle redacted names with ███)
        const fullName = quirkData.subjectName || 'Unknown';
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || 'Unknown';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Apply villain/watchlist data attribute
        if (quirkData.villainTag) {
            card.setAttribute('data-status', quirkData.villainTag.toLowerCase());
        }

        // Build card HTML
        let cardHTML = `
            <div class="card-header">
                <div class="name-section">
                    <div class="first-name">${firstName}</div>
                    <div class="last-name">${lastName}</div>
                </div>
                <img src="pages/${quirkData.imagePath || 'img/Placeholder.jpg'}" alt="${firstName}" class="card-image">
            </div>
            <p><strong>Registry ID:</strong> ${quirkData.registryId}</p>
            <p><strong>Quirk Name:</strong> ${quirkData.quirkName}</p>`;

        // Add type if not quirkless
        if (quirkData.quirkType && quirkData.quirkType !== 'None') {
            cardHTML += `<p><strong>Type:</strong> ${quirkData.quirkType}</p>`;
        }

        // Add hereditary status if available
        if (quirkData.hereditaryStatus && quirkData.hereditaryStatus !== 'N/A' && quirkData.hereditaryStatus !== 'None') {
            cardHTML += `<p><strong>Hereditary:</strong> ${quirkData.hereditaryStatus}</p>`;
        }

        // Add description if available
        if (quirkData.description && quirkData.description !== 'None.') {
            cardHTML += `<p><strong>Details:</strong> ${quirkData.description}</p>`;
        }

        // Add link to full entry
        const nameLinkPart = firstName.replace(/[█\s]+/g, '');
        cardHTML += `
            <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                <a href="pages/${quirkData.registryId}-${nameLinkPart}.html" style="color: #8e44ad; text-decoration: none; font-weight: 600;">→ View Full Registry Entry</a>
            </p>`;

        card.innerHTML = cardHTML;
        
        // Add villain/watchlist badge AFTER setting innerHTML
        if (quirkData.villainTag) {
            const badge = document.createElement('div');
            badge.className = 'status-badge';
            
            if (quirkData.villainTag.toLowerCase() === 'villain') {
                badge.textContent = '⚠️ VILLAIN';
                badge.style.cssText = 'background: linear-gradient(135deg, #c0392b, #e74c3c) !important;';
            } else if (quirkData.villainTag.toLowerCase() === 'watch list') {
                badge.textContent = '👁️ WATCH LIST';
                badge.style.cssText = 'background: linear-gradient(135deg, #f39c12, #f1c40f) !important;';
            }
            
            card.insertBefore(badge, card.firstChild);
        }
        
        // Store card with name for sorting
        cardsArray.push({
            card: card,
            name: (firstName + ' ' + lastName).trim().toLowerCase()
        });
    }

    // Sort cards alphabetically by name
    cardsArray.sort((a, b) => a.name.localeCompare(b.name));

    // Append sorted cards to grid
    cardsArray.forEach(item => resultsGrid.appendChild(item.card));

    // Update result count
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = cardsArray.length;
    }
}

// Call the function when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateRegistryCards);
} else {
    generateRegistryCards();
}
