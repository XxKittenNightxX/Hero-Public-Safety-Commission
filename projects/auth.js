// Centralized authentication system for HPSC projects
const users = {
    'red': {
        password: 'Chimara1976',
        accessLevel: 'director',
        projects: ['chimara', 'quirk-registry']
    },
    'ShotaAizawa': {
        password: 'Aizawa2020',
        accessLevel: 'researcher',
        projects: ['quirk-registry']
    },
    'Akako': {
        password: 'Akako2020',
        accessLevel: 'mod',
        projects: ['chimara','quirk-registry']
    },
    'Yumeno': {
        password: 'Arcade21',
        accessLevel: 'mod',
        projects: ['chimara','quirk-registry']
    },
    'Admin': {
        password: 'Admin',
        accessLevel: 'admin',
        projects: ['chimara', 'quirk-registry']
    },
    'Level3': {
        password: 'Lv3',
        accessLevel: 'researcher',
        projects: ['chimara','quirk-registry']
    },
    'Level2': {
        password: 'Lv2',
        accessLevel: 'clerk',
        projects: ['chimara','quirk-registry']
    },
    'Level1': {
        password: 'Lv1',
        accessLevel: 'viewer',
        projects: ['quirk-registry'] // Read-only access
    }
};

// Custom alert function to avoid showing URL
function customAlert(message, callback) {
    // Hide body content
    const originalVisibility = document.body.style.visibility;
    document.body.style.visibility = 'hidden';
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('custom-alert-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-alert-modal';
        modal.innerHTML = `
            <div class="custom-alert-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 999999; display: flex; align-items: center; justify-content: center; visibility: visible;">
                <div class="custom-alert-box" style="background: #1a1a2e; border: 2px solid #dc3545; border-radius: 8px; padding: 30px; min-width: 400px; box-shadow: 0 4px 20px rgba(220,53,69,0.3); visibility: visible;">
                    <div class="custom-alert-message" style="color: #fff; font-size: 1.1rem; margin-bottom: 20px; white-space: pre-line; visibility: visible;"></div>
                    <button class="custom-alert-ok" style="background: #dc3545; color: white; border: none; padding: 10px 30px; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600; width: 100%; visibility: visible;">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Make modal visible
    modal.style.visibility = 'visible';
    
    // Remove old event listeners and add new one
    const okButton = modal.querySelector('.custom-alert-ok');
    const newOkButton = okButton.cloneNode(true);
    okButton.parentNode.replaceChild(newOkButton, okButton);
    
    newOkButton.addEventListener('click', function() {
        modal.style.display = 'none';
        if (callback) callback();
    });
    
    modal.querySelector('.custom-alert-message').textContent = message;
    modal.style.display = 'block';
}

// Get the current project from the page's data attribute or path
function getCurrentProject() {
    // Try to get from data attribute first
    const projectAttr = document.body.getAttribute('data-project');
    if (projectAttr) return projectAttr;
    
    // Fallback: determine from path
    const path = window.location.pathname;
    if (path.includes('chimara') || path.includes('Chimera')) return 'chimara';
    if (path.includes('Quirk') || path.includes('quirk')) return 'quirk-registry';
    
    return null;
}

// Authenticate user
function authenticate(username, password, redirectPage = 'home.html') {
    const user = users[username];
    const currentProject = getCurrentProject();
    
    if (!user) {
        return { success: false, message: 'ACCESS DENIED: Invalid credentials' };
    }
    
    if (user.password !== password) {
        return { success: false, message: 'ACCESS DENIED: Invalid credentials' };
    }
    
    // Check if user has access to this project
    if (currentProject && !user.projects.includes(currentProject)) {
        return { success: false, message: 'ACCESS DENIED: Insufficient permissions for this system' };
    }
    
    // Store session data
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('accessLevel', user.accessLevel);
    sessionStorage.setItem('currentProject', currentProject);
    
    // Redirect
    window.location.href = redirectPage;
    
    return { success: true };
}

// Check if user is authenticated
function isAuthenticated() {
    const username = sessionStorage.getItem('username');
    const currentProject = getCurrentProject();
    
    if (!username) return false;
    
    const user = users[username];
    if (!user) return false;
    
    // Verify user still has access to current project
    if (currentProject && !user.projects.includes(currentProject)) {
        return false;
    }
    
    return true;
}

// Get current user info
function getCurrentUser() {
    const username = sessionStorage.getItem('username');
    const accessLevel = sessionStorage.getItem('accessLevel');
    
    if (!username) return null;
    
    return {
        username,
        accessLevel,
        projects: users[username]?.projects || []
    };
}

// Logout
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Check access level
function hasAccessLevel(requiredLevel) {
    const currentLevel = sessionStorage.getItem('accessLevel');
    
    const levels = {
        'viewer': 1,
        'clerk': 2,
        'researcher': 3,
        'mod': 4,
        'admin': 5,
        'director': 6
    };
    
    // Special case: mod can access admin-level content
    if (requiredLevel === 'admin' && currentLevel === 'mod') {
        return true;
    }
    
    return levels[currentLevel] >= levels[requiredLevel];
}

// Protect page (call this on pages that require authentication)
function protectPage(requiredLevel = null) {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    if (requiredLevel && !hasAccessLevel(requiredLevel)) {
        // Make body visible so modal can show
        document.body.style.visibility = 'visible';
        
        // Get numeric access level
        const currentLevel = sessionStorage.getItem('accessLevel');
        const levels = {
            'viewer': 1,
            'clerk': 2,
            'researcher': 3,
            'mod': 4,
            'admin': 5,
            'director': 6
        };
        const numericLevel = levels[currentLevel] || 0;
        
        customAlert(`ACCESS DENIED: Insufficient clearance level\nYour Access level ${numericLevel}`, function() {
            window.history.back();
        });
        return;
    }
    
    // Show content if authenticated
    document.body.style.visibility = 'visible';
}

// Map subject clearance levels to access levels
function mapClearanceLevelToAccess(clearanceLevel) {
    if (!clearanceLevel) return null;
    
    const levelStr = clearanceLevel.toLowerCase();
    
    // Level 1: viewer can access
    if (levelStr.includes('level 1')) {
        return 'viewer';
    }
    // Level 2: clerk can access
    if (levelStr.includes('level 2')) {
        return 'clerk';
    }
    // Level 3: researcher can access
    if (levelStr.includes('level 3')) {
        return 'researcher';
    }
    // Level 4: mod can access
    if (levelStr.includes('level 4')) {
        return 'mod';
    }
    // Level 5: admin can access
    if (levelStr.includes('level 5')) {
        return 'admin';
    }
    // Level 6+: director can access
    if (levelStr.includes('level 6') || levelStr.includes('level 7')) {
        return 'director';
    }
    
    return null;
}

// Protect subject page based on clearance level
function protectSubjectPage(clearanceLevel) {
    if (!isAuthenticated()) {
        window.location.href = '../../../login.html';
        return;
    }
    
    const requiredAccess = mapClearanceLevelToAccess(clearanceLevel);
    if (requiredAccess && !hasAccessLevel(requiredAccess)) {
        // Make body visible so modal can show
        document.body.style.visibility = 'visible';
        
        // Get numeric access level
        const currentLevel = sessionStorage.getItem('accessLevel');
        const levels = {
            'viewer': 1,
            'clerk': 2,
            'researcher': 3,
            'mod': 4,
            'admin': 5,
            'director': 6
        };
        const numericLevel = levels[currentLevel] || 0;
        
        customAlert(`ACCESS DENIED: ${clearanceLevel} required\nYour Access level ${numericLevel}`, function() {
            window.history.back();
        });
        return;
    }
    
    // Show content if authorized
    document.body.style.visibility = 'visible';
}

// Initialize login form (call this on login pages)
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        const result = authenticate(username, password);
        
        if (!result.success) {
            // Failed login
            errorMessage.textContent = result.message;
            errorMessage.style.display = 'block';
            
            // Clear password field
            document.getElementById('password').value = '';
            
            // Shake animation
            const loginBox = document.querySelector('.login-box');
            if (loginBox) {
                loginBox.classList.add('shake');
                setTimeout(() => {
                    loginBox.classList.remove('shake');
                }, 500);
            }
        }
    });
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // If on login page, initialize the form
    if (window.location.pathname.includes('login.html')) {
        initLoginForm();
    }
});
