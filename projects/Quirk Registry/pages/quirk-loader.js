// Load quirk data and populate the page
function loadQuirkData() {
    // Get the registry ID from the page title or URL
    const titleElement = document.querySelector('title');
    if (!titleElement) return;
    
    const registryId = titleElement.textContent.match(/QRK-(\d+)/)?.[1];
    if (!registryId) return;
    
    const data = quirkRegistryData[registryId];
    if (!data) return;
    
    // Populate basic info
    const subjectNameElement = document.querySelector('.subject-name');
    subjectNameElement.textContent = data.subjectName;
    
    // Add villain/watch list tag if present
    if (data.villainTag) {
        const tagBadge = document.createElement('span');
        const isWatchList = data.villainTag === 'WATCH LIST';
        
        tagBadge.textContent = (isWatchList ? '👁 ' : '⚠ ') + data.villainTag;
        
        if (isWatchList) {
            tagBadge.style.cssText = 'background: linear-gradient(135deg, #f39c12, #e67e22); color: white; padding: 6px 16px; border-radius: 6px; font-size: 0.85rem; margin-left: 15px; font-weight: bold; box-shadow: 0 2px 8px rgba(243, 156, 18, 0.4); text-transform: uppercase; letter-spacing: 1px; border: 2px solid #d68910; display: inline-block; vertical-align: middle;';
        } else {
            tagBadge.style.cssText = 'background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 6px 16px; border-radius: 6px; font-size: 0.85rem; margin-left: 15px; font-weight: bold; box-shadow: 0 2px 8px rgba(231, 76, 60, 0.4); text-transform: uppercase; letter-spacing: 1px; border: 2px solid #a93226; display: inline-block; vertical-align: middle;';
        }
        
        subjectNameElement.appendChild(document.createTextNode(' '));
        subjectNameElement.appendChild(tagBadge);
    }
    
    document.querySelector('.registry-id').textContent = data.registryId;
    document.querySelector('.clearance-badge').textContent = data.clearanceLevel;
    
    // Populate quirk information
    document.querySelector('.quirk-name').textContent = data.quirkName;
    document.querySelector('.quirk-type').textContent = data.quirkType;
    document.querySelector('.quirk-classification').textContent = data.quirkClassification;
    document.querySelector('.hereditary-status').textContent = data.hereditaryStatus;
    document.querySelector('.quirk-description').textContent = data.description.trim();
    
    // Populate capabilities
    const capabilitiesList = document.querySelector('.capabilities-list');
    const capabilitiesSection = document.querySelector('.capabilities-section');
    if (data.capabilities && data.capabilities.length > 0) {
        capabilitiesList.innerHTML = '';
        data.capabilities.forEach(cap => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${cap.name}:</strong> ${cap.description}`;
            capabilitiesList.appendChild(li);
        });
    } else if (capabilitiesSection) {
        capabilitiesSection.style.display = 'none';
    }
    
    // Populate limitations
    const limitationsList = document.querySelector('.limitations-list');
    const limitationsSection = document.querySelector('.limitations-section');
    if (data.limitations && data.limitations.length > 0) {
        limitationsList.innerHTML = '';
        data.limitations.forEach(lim => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${lim.name}:</strong> ${lim.description}`;
            limitationsList.appendChild(li);
        });
    } else if (limitationsSection) {
        limitationsSection.style.display = 'none';
    }
    
    // Populate hereditary analysis
    const hereditarySection = document.querySelector('.hereditary-section');
    if (data.hereditaryAnalysis) {
        if (hereditarySection) hereditarySection.style.display = 'block';
        document.querySelector('.hereditary-description').textContent = data.hereditaryAnalysis.description.trim();
        
        document.querySelector('.mother-quirk-name').textContent = data.hereditaryAnalysis.motherQuirk.name;
        document.querySelector('.mother-quirk-type').textContent = data.hereditaryAnalysis.motherQuirk.type;
        document.querySelector('.mother-quirk-description').textContent = data.hereditaryAnalysis.motherQuirk.description.trim();
        
        document.querySelector('.father-quirk-name').textContent = data.hereditaryAnalysis.fatherQuirk.name;
        document.querySelector('.father-quirk-type').textContent = data.hereditaryAnalysis.fatherQuirk.type;
        document.querySelector('.father-quirk-description').textContent = data.hereditaryAnalysis.fatherQuirk.description.trim();
        
        document.querySelector('.quirk-synthesis').innerHTML = data.hereditaryAnalysis.synthesis.trim();
        
        // Populate siblings if available
        const siblingsSection = document.querySelector('.siblings-section');
        const siblingsInfo = document.querySelector('.siblings-info');
        if (data.hereditaryAnalysis.siblings) {
            siblingsInfo.innerHTML = data.hereditaryAnalysis.siblings;
        } else if (siblingsSection) {
            siblingsSection.style.display = 'none';
        }
    }
    
    // Populate subject information
    document.querySelector('.subject-name-info').textContent = data.subjectName;
    document.querySelector('.subject-age').textContent = data.age;
    document.querySelector('.subject-birthdate').textContent = data.birthDate;
    document.querySelector('.subject-bloodtype').textContent = data.bloodType;
    document.querySelector('.subject-height').textContent = data.height;
    if (data.status) {
        document.querySelector('.subject-status').textContent = data.status;
    }
    
    // Populate registration details
    document.querySelector('.registration-date').textContent = data.registrationDate;
    document.querySelector('.registry-officer').textContent = data.registryOfficer;
    document.querySelector('.last-updated').textContent = data.lastUpdated;
    
    // Populate associated programs
    const associatedProgramContent = document.getElementById('associatedProgramContent');
    if (data.associatedPrograms && data.associatedPrograms.length > 0) {
        const program = data.associatedPrograms[0];
        const currentUser = getCurrentUser();
        
        if (currentUser && currentUser.projects && !currentUser.projects.includes(program.requiredProject)) {
            associatedProgramContent.innerHTML = '<span style="color: #999; font-style: italic;">[RESTRICTED - Insufficient Access]</span>';
        } else {
            associatedProgramContent.innerHTML = `<a href="${program.url}" style="color: #8e44ad; text-decoration: none; font-weight: 600;">${program.name} →</a>`;
        }
    }
    
    // Set image
    document.querySelector('.subject-image').src = data.imagePath;
    
    // Set clearance notice
    document.querySelector('.clearance-notice-text').textContent = data.clearanceNotice.trim();
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', loadQuirkData);
