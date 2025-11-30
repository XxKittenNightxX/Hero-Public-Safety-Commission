// Centralized authentication system for HPSC projects
const users = {
    'red': {
        password: 'Chimara1976',
        accessLevel: 'director',
        projects: ['chimara', 'quirk-registry'] // Can access all projects
    },
    'ShotaAizawa': {
        password: 'Aizawa2020',
        accessLevel: 'researcher',
        projects: ['quirk-registry']
    },
    'Akako': {
        password: 'Akako2020',
        accessLevel: 'admin',
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
        projects: ['chimara','quirk-registry'] // Read-only access
    }
};

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
        'admin': 4,
        'director': 5
    };
    
    return levels[currentLevel] >= levels[requiredLevel];
}

// Protect page (call this on pages that require authentication)
function protectPage(requiredLevel = null) {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    if (requiredLevel && !hasAccessLevel(requiredLevel)) {
        alert('ACCESS DENIED: Insufficient clearance level');
        window.history.back();
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
    // Level 4: admin can access
    if (levelStr.includes('level 4')) {
        return 'admin';
    }
    // Level 5+: director can access
    if (levelStr.includes('level 5') || levelStr.includes('level 6')) {
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
        // Immediately hide content and redirect
        document.body.style.display = 'none';
        alert(`ACCESS DENIED: ${clearanceLevel} required\nYour access level: ${sessionStorage.getItem('accessLevel')}`);
        window.history.back();
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
