// Import subject data (note: subject-data.js must be loaded before this script)
// subjectData is already available from subject-data.js

// Create mapping from subjectData
const subjectNames = {};
const subjectsWithPages = new Set();

// Populate from subjectData
Object.keys(subjectData).forEach(id => {
    const subject = subjectData[id];
    subjectNames[id] = {
        name: subject.name,
        status: subject.status,
        clearanceLevel: subject.clearanceLevel
    };
    subjectsWithPages.add(parseInt(id));
});

// Name pools for random generation - International mix (50% Japanese)
const japaneseFirstNames = [
    'Yuki', 'Haruto', 'Sakura', 'Ren', 'Aiko', 'Kaito', 'Hana', 'Sota', 'Mei', 'Riku',
    'Yui', 'Takumi', 'Hina', 'Hayato', 'Nanami', 'Daiki', 'Ayaka', 'Shota', 'Miyu', 'Kenta',
    'Sora', 'Rina', 'Ryota', 'Akari', 'Yuto', 'Kana', 'Kota', 'Yuna', 'Ryo', 'Mio',
    'Kenji', 'Natsuki', 'Tsubasa', 'Koharu', 'Shun', 'Emi', 'Tatsuya', 'Yua', 'Masato', 'Shiori',
    'Hikari', 'Kazuki', 'Hinata', 'Ruka', 'Asahi', 'Ichika', 'Minato', 'Aoi', 'Yuuto', 'Himari',
    'Itsuki', 'Mitsuki', 'Yuuki', 'Kokoro', 'Akira', 'Sayuri', 'Ryusei', 'Kaede', 'Daichi', 'Honoka',
    'Yuudai', 'Nana', 'Kouki', 'Rui', 'Seiya', 'Rin', 'Taiga', 'Mai', 'Souma', 'Yuina',
    'Shou', 'Misaki', 'Yuuta', 'Haruka', 'Touma', 'Chihiro', 'Raito', 'Nozomi', 'Shouta', 'Kanon',
    'Reon', 'Ayane', 'Hinato', 'Saki', 'Kouta', 'Mana', 'Haruki', 'Yuzuki', 'Renji', 'Moeka',
    'Subaru', 'Mizuki', 'Yamato', 'Tsubaki', 'Kaoru', 'Nao', 'Itsuki', 'Anri', 'Makoto', 'Yui'
];

const japaneseLastNames = [
    'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato',
    'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Saito', 'Matsumoto', 'Inoue', 'Kimura', 'Hayashi', 'Shimizu',
    'Mori', 'Abe', 'Ikeda', 'Hashimoto', 'Ishikawa', 'Yamashita', 'Nakajima', 'Maeda', 'Fujita', 'Ogawa',
    'Goto', 'Okada', 'Hasegawa', 'Murakami', 'Kondo', 'Ishii', 'Saito', 'Sakamoto', 'Endo', 'Aoki',
    'Fujii', 'Nishimura', 'Fukuda', 'Ota', 'Miura', 'Okamoto', 'Kaneko', 'Nakagawa', 'Kudo', 'Matsuda',
    'Harada', 'Ueda', 'Hirano', 'Shimada', 'Morita', 'Hara', 'Miyazaki', 'Sugiyama', 'Noguchi', 'Takagi'
];

const otherFirstNames = [
    // American/English
    'James', 'Emma', 'Michael', 'Olivia', 'William', 'Ava', 'David', 'Isabella', 'Joseph', 'Sophia',
    'Daniel', 'Mia', 'Matthew', 'Charlotte', 'Christopher', 'Amelia', 'Andrew', 'Harper', 'Joshua', 'Evelyn',
    'Ryan', 'Abigail', 'Nathan', 'Emily', 'Tyler', 'Madison', 'Brandon', 'Ella', 'Kevin', 'Scarlett',
    'Jacob', 'Grace', 'Logan', 'Chloe', 'Ethan', 'Victoria', 'Alexander', 'Riley', 'Mason', 'Aria',
    // Chinese
    'Wei', 'Li', 'Jing', 'Ming', 'Ling', 'Chen', 'Xia', 'Feng', 'Mei', 'Yang',
    'Jun', 'Hua', 'Xin', 'Lei', 'Yan', 'Bo', 'Qing', 'Yun', 'Fang', 'Hui',
    // Korean
    'Min-jun', 'Ji-woo', 'Seo-jun', 'Ha-yoon', 'Do-yoon', 'Seo-yeon', 'Ye-jun', 'Ji-min', 'Su-ho', 'Eun-ji',
    // European (French, German, Italian, Spanish)
    'Luca', 'Sofia', 'Hugo', 'Camille', 'Felix', 'Leon', 'Marie', 'Lucas', 'Clara',
    'Marco', 'Giulia', 'Matteo', 'Chiara', 'Pablo', 'Lucia', 'Diego', 'Valentina', 'Carlos', 'Ana',
    'Hans', 'Greta', 'Klaus', 'Heidi', 'Pierre', 'Amelie', 'Jean', 'Sophie', 'Antonio',
    // Middle Eastern
    'Omar', 'Fatima', 'Hassan', 'Layla', 'Ali', 'Amira', 'Yusuf', 'Zahra', 'Amir', 'Jasmine',
    // Scandinavian
    'Erik', 'Ingrid', 'Lars', 'Astrid', 'Bjorn', 'Freya', 'Magnus', 'Saga', 'Sven', 'Elsa',
    // Indian
    'Arjun', 'Priya', 'Rohan', 'Ananya', 'Aarav', 'Ishita', 'Vivek', 'Kavya', 'Raj', 'Diya',
    // Russian/Slavic
    'Ivan', 'Natasha', 'Dmitri', 'Anastasia', 'Alexei', 'Katya', 'Nikolai', 'Svetlana', 'Viktor', 'Olga',
    // African
    'Kwame', 'Amara', 'Kofi', 'Nia', 'Tariq', 'Zuri', 'Jabari', 'Aisha', 'Malik', 'Kendi',
    // Latin American
    'Miguel', 'Carmen', 'Santiago', 'Rosa', 'Rafael', 'Gabriela', 'Luis', 'Maria', 'Jorge', 'Elena'
];

const otherLastNames = [
    // American/English
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    // Chinese
    'Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou',
    // Korean
    'Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Cho', 'Yoon', 'Jang', 'Lim',
    // European
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
    'García', 'Fernández', 'González', 'Rodríguez', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín',
    'Dupont', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy',
    // Scandinavian
    'Andersen', 'Johansson', 'Larsson', 'Nilsson', 'Eriksson', 'Hansen', 'Pedersen', 'Svensson', 'Petersen', 'Gustafsson',
    // Russian/Slavic
    'Ivanov', 'Petrov', 'Sidorov', 'Kuznetsov', 'Popov', 'Sokolov', 'Lebedev', 'Kozlov', 'Novikov', 'Morozov',
    // Indian
    'Patel', 'Singh', 'Kumar', 'Sharma', 'Verma', 'Khan', 'Reddy', 'Gupta', 'Joshi', 'Mehta',
    // Middle Eastern
    'Al-Rashid', 'Hassan', 'Hussein', 'Ahmed', 'Mohammed', 'Ali', 'Ibrahim', 'Khalil', 'Mahmoud', 'Nasser',
    // African
    'Okonkwo', 'Mbeki', 'Nkrumah', 'Diop', 'Kamara', 'Mensah', 'Banda', 'Mwangi', 'Okello', 'Adesina',
    // Other
    'O\'Brien', 'MacLeod', 'O\'Connor', 'Murphy', 'Kelly', 'Sullivan', 'Walsh', 'Ryan', 'Byrne', 'Connor'
];

// Generate statuses with specific percentages
function generateSubjects() {
    const subjects = [];
    
    // Generate subjects in groups of 100
    for (let group = 0; group < 26; group++) {
        const groupStart = group * 100 + 1;
        const groupEnd = Math.min((group + 1) * 100, 2600);
        const groupSize = groupEnd - groupStart + 1;
        
        // Create array of statuses for this group
        const statuses = [];
        
        // 1% Terminated (across all subjects)
        const terminatedCount = Math.floor(groupSize * 0.01);
        
        // For subjects > 1200: 5% under observation, 5% missing
        const isHighGroup = groupStart > 1200;
        const underObservationCount = isHighGroup ? Math.floor(groupSize * 0.05) : 0;
        const missingCount = isHighGroup ? Math.floor(groupSize * 0.05) : 0;
        
        // Calculate remaining slots after special statuses
        const specialCount = terminatedCount + underObservationCount + missingCount;
        const remainingCount = groupSize - specialCount;
        
        // 30% of remaining are alive, rest are deceased
        const aliveCount = Math.floor(remainingCount * 0.3);
        const deceasedCount = remainingCount - aliveCount;
        
        // Add statuses to array
        for (let i = 0; i < terminatedCount; i++) statuses.push('Terminated');
        for (let i = 0; i < underObservationCount; i++) statuses.push('Under Observation');
        for (let i = 0; i < missingCount; i++) statuses.push('Missing');
        for (let i = 0; i < aliveCount; i++) statuses.push('Alive');
        for (let i = 0; i < deceasedCount; i++) statuses.push('Deceased');
        
        // Create clearance levels array (for unidentified subjects only)
        const clearanceLevels = [];
        // Level 1 - Common: 50%
        for (let i = 0; i < Math.floor(groupSize * 0.50); i++) clearanceLevels.push('Level 1');
        // Level 2 - Uncommon: 30%
        for (let i = 0; i < Math.floor(groupSize * 0.30); i++) clearanceLevels.push('Level 2');
        // Level 3 - Rare: 15%
        for (let i = 0; i < Math.floor(groupSize * 0.15); i++) clearanceLevels.push('Level 3');
        // Level 4 - Epic: 4%
        for (let i = 0; i < Math.floor(groupSize * 0.04); i++) clearanceLevels.push('Level 4');
        // Level 5 - Legendary: 1%
        for (let i = 0; i < Math.floor(groupSize * 0.01); i++) clearanceLevels.push('Level 5');
        // Fill remaining with Level 1
        while (clearanceLevels.length < groupSize) clearanceLevels.push('Level 1');
        
        // Shuffle both arrays using seeded Fisher-Yates algorithm
        // Using group number as seed to ensure consistent results
        let seed = group + 1;
        const seededRandom = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
        
        for (let i = statuses.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [statuses[i], statuses[j]] = [statuses[j], statuses[i]];
        }
        
        for (let i = clearanceLevels.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [clearanceLevels[i], clearanceLevels[j]] = [clearanceLevels[j], clearanceLevels[i]];
        }
        
        // Assign subjects for this group
        for (let i = 0; i < groupSize; i++) {
            const subjectId = groupStart + i;
            const subjectData = subjectNames[subjectId];
            let subjectStatus = subjectData ? subjectData.status : statuses[i];
            let subjectClearance = subjectData ? subjectData.clearanceLevel : clearanceLevels[i];
            let subjectName = subjectData ? subjectData.name : null;
            
            // Generate random name for unidentified subjects (no page)
            if (!subjectData) {
                // Use subject ID as seed for consistent name generation
                let nameSeed = subjectId;
                const seededNameRandom = () => {
                    nameSeed = (nameSeed * 9301 + 49297) % 233280;
                    return nameSeed / 233280;
                };
                
                // 50% Japanese names, 50% other international names
                const isJapanese = seededNameRandom() < 0.5;
                
                if (isJapanese) {
                    const firstName = japaneseFirstNames[Math.floor(seededNameRandom() * japaneseFirstNames.length)];
                    const lastName = japaneseLastNames[Math.floor(seededNameRandom() * japaneseLastNames.length)];
                    subjectName = `${firstName} ${lastName}`;
                } else {
                    const firstName = otherFirstNames[Math.floor(seededNameRandom() * otherFirstNames.length)];
                    const lastName = otherLastNames[Math.floor(seededNameRandom() * otherLastNames.length)];
                    subjectName = `${firstName} ${lastName}`;
                }
            }
            
            // Convert Alive to Graduated for subjects <= 1000
            if (subjectId <= 1000 && subjectStatus === 'Alive') {
                subjectStatus = 'Graduated';
            }
            
            subjects.push({
                id: subjectId,
                name: subjectName,
                status: subjectStatus,
                hasPage: subjectsWithPages.has(subjectId),
                clearanceLevel: subjectClearance
            });
        }
    }
    
    return subjects;
}

const allSubjects = generateSubjects();
let filteredSubjects = [...allSubjects];
let activeFilters = {
    status: 'all', // 'all', 'alive', 'deceased', 'tracked', 'missing', 'terminated', 'under-observation', 'graduated'
    clearance: 'all', // 'all', 'level-1', 'level-2', 'level-3', 'level-4', 'level-5'
    pages: false
};

function renderSubjects(subjects) {
    const container = document.getElementById('subjectsContainer');
    const shownCount = document.getElementById('shownCount');
    
    if (subjects.length === 0) {
        container.innerHTML = '<div class="loading">No subjects match your search criteria.</div>';
        shownCount.textContent = '0';
        return;
    }

    const fragment = document.createDocumentFragment();
    
    subjects.forEach(subject => {
        const item = document.createElement('div');
        item.className = 'subject-item';
        
        const info = document.createElement('div');
        info.className = 'subject-info';
        
        const numberSpan = document.createElement('span');
        numberSpan.className = 'subject-number';
        numberSpan.textContent = `#${String(subject.id).padStart(4, '0')}`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'subject-name';
        
        if (subject.hasPage) {
            const link = document.createElement('a');
            const fileName = `pages/${subject.id} - ${subject.name}.html`;
            link.href = fileName;
            link.textContent = `${subject.name} →`;
            
            // Check if user has access to this clearance level
            if (subject.clearanceLevel && typeof mapClearanceLevelToAccess === 'function' && typeof hasAccessLevel === 'function') {
                const requiredAccess = mapClearanceLevelToAccess(subject.clearanceLevel);
                if (!hasAccessLevel(requiredAccess)) {
                    link.style.opacity = '0.5';
                    link.style.cursor = 'not-allowed';
                    link.title = `Access Denied: ${subject.clearanceLevel} required`;
                }
            }
            
            nameSpan.appendChild(link);
        } else if (subject.name) {
            // Display name for unidentified subjects without link
            nameSpan.textContent = subject.name;
            nameSpan.style.color = '#666';
            nameSpan.style.fontStyle = 'italic';
        }
        
        info.appendChild(numberSpan);
        info.appendChild(nameSpan);
        
        item.appendChild(info);
        
        // Add clearance level badge if subject has clearance level
        if (subject.clearanceLevel) {
            const clearanceBadge = document.createElement('span');
            clearanceBadge.className = 'clearance-badge';
            clearanceBadge.textContent = subject.clearanceLevel;
            
            // Add visual indicator if access denied (only relevant for subjects with pages)
            if (subject.hasPage && typeof mapClearanceLevelToAccess === 'function' && typeof hasAccessLevel === 'function') {
                const requiredAccess = mapClearanceLevelToAccess(subject.clearanceLevel);
                if (!hasAccessLevel(requiredAccess)) {
                    clearanceBadge.classList.add('clearance-denied');
                }
            }
            
            item.appendChild(clearanceBadge);
        }
        
        const badge = document.createElement('span');
        const statusClass = subject.status.toLowerCase().replace(/\s+/g, '-');
        badge.className = `status-badge status-${statusClass}`;
        badge.textContent = subject.status;
        
        item.appendChild(badge);
        fragment.appendChild(item);
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);
    shownCount.textContent = subjects.length;
}

function applyFilters(searchQuery = '') {
    const query = searchQuery.toLowerCase().trim();
    
    filteredSubjects = allSubjects.filter(subject => {
        // Apply status filter
        if (activeFilters.status !== 'all') {
            const statusLower = subject.status.toLowerCase().replace(/\s+/g, '-');
            if (statusLower !== activeFilters.status) {
                return false;
            }
        }
        
        // Apply clearance level filter
        if (activeFilters.clearance !== 'all') {
            const clearanceLower = subject.clearanceLevel ? subject.clearanceLevel.toLowerCase().replace(/\s+/g, '-') : '';
            if (clearanceLower !== activeFilters.clearance) {
                return false;
            }
        }
        
        // Apply pages filter
        if (activeFilters.pages && !subject.hasPage) {
            return false;
        }
        
        // Apply search query
        if (query) {
            const idMatch = String(subject.id).includes(query);
            const nameMatch = subject.name && subject.name.toLowerCase().includes(query);
            return idMatch || nameMatch;
        }
        
        return true;
    });
    
    renderSubjects(filteredSubjects);
}

// Event listeners
document.getElementById('searchBox').addEventListener('input', (e) => {
    applyFilters(e.target.value);
});

document.getElementById('statusFilter').addEventListener('change', function() {
    activeFilters.status = this.value;
    applyFilters(document.getElementById('searchBox').value);
});

document.getElementById('clearanceFilter').addEventListener('change', function() {
    activeFilters.clearance = this.value;
    applyFilters(document.getElementById('searchBox').value);
});

document.getElementById('filterPages').addEventListener('click', function() {
    this.classList.toggle('active');
    activeFilters.pages = this.classList.contains('active');
    applyFilters(document.getElementById('searchBox').value);
});

document.getElementById('clearFilter').addEventListener('click', () => {
    document.getElementById('searchBox').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('clearanceFilter').value = 'all';
    document.getElementById('filterPages').classList.remove('active');
    activeFilters = {
        status: 'all',
        clearance: 'all',
        pages: false
    };
    applyFilters('');
});

// Initial render
renderSubjects(allSubjects);