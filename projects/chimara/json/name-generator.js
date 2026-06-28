// Chimera Project Subject Name Generator
// Generates randomized names for subjects without detailed pages
// Usage: Integrate with your subject list to populate names for all subject IDs

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
    'Subaru', 'Mizuki', 'Yamato', 'Tsubaki', 'Kaoru', 'Nao', 'Itsuki', 'Anri', 'Makoto', 'Yui', 'Saburo'
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
    'Jacob', 'Grace', 'Logan', 'Chloe', 'Ethan', 'Victoria', 'Alexander', 'Riley', 'Mason', 'Aria', 'Maxus',
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
    'Miguel', 'Carmen', 'Santiago', 'Rosa', 'Rafael', 'Gabriela', 'Luis', 'Maria', 'Jorge', 'Elena','Amir',
];

const otherLastNames = [
    // American/English
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Foster',
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
    'O\'Brien', 'MacLeod', 'O\'Connor', 'Murphy', 'Kelly', 'Sullivan', 'Walsh', 'Ryan', 'Byrne', 'Connor', 'Blackwood'
];

// Default status distribution for generated subjects
const defaultStatusConfig = {
    graduatedBelow1000: 0.7090909091,
    trainingTransferMax: 0.25
};

const defaultClassificationConfig = {
    SS: 1,
    S: 4,
    A: 10,
    B: 15,
    C: 20,
    D: 20,
    E: 15,
    F: 15
};

const transferredClassificationConfig = {
    SS: 1,
    S: 4,
    A: 10,
    B: 15,
    C: 20,
    D: 20,
    E: 15,
    F: 15
};

function normalizeDistribution(dist) {
    const total = Object.values(dist).reduce((sum, value) => sum + Number(value || 0), 0);
    if (!total) return {};
    return Object.fromEntries(
        Object.entries(dist).map(([key, value]) => [key, Number(value || 0) / total])
    );
}

function pickClassification(status, rand, config = defaultClassificationConfig) {
    let activeConfig = status === 'Transferred' ? transferredClassificationConfig : config;
    if (status === 'Graduated') {
        activeConfig = {
            SS: activeConfig.SS || 0,
            S: activeConfig.S || 0,
            A: activeConfig.A || 0,
            B: activeConfig.B || 0,
            C: 0,
            D: 0,
            E: 0,
            F: 0
        };
    }

    const weighted = {};
    for (const [key, value] of Object.entries(activeConfig)) {
        weighted[key] = Number(value || 0);
    }

    const normalized = normalizeDistribution(weighted);
    let threshold = 0;
    for (const classification of ['SS', 'S', 'A', 'B', 'C', 'D', 'E', 'F']) {
        threshold += normalized[classification] || 0;
        if (rand < threshold) return classification;
    }

    return status === 'Transferred' ? 'F' : 'E';
}

// Generate a seeded random number for consistent name generation
function createSeededRandom(seed) {
    return function() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

/**
 * Pick the subject status based on a seeded value and configuration
 */
function pickStatus(id, rand, config = defaultStatusConfig) {
    if (id >= 1101) {
        const maxTransfer = Number(config.trainingTransferMax) || 0.4;
        const rangeSize = 2600 - 1101;
        const relative = (2600 - id) / rangeSize;
        const transferProbability = maxTransfer * relative;
        return rand < transferProbability ? 'Transferred' : 'In Training';
    }

    const graduatedChance = Number(config.graduatedBelow1000) || 0;
    return rand < graduatedChance ? 'Graduated' : 'Transferred';
}

/**
 * Generate a random name for a subject ID
 * Uses the subject ID as seed to ensure consistent generation
 * @param {number} subjectId - The subject ID to generate name for
 * @returns {string} Generated full name
 */
function generateNameForId(subjectId) {
    const seededRandom = createSeededRandom(subjectId);
    
    // 50% Japanese names, 50% other international names
    const isJapanese = seededRandom() < 0.5;
    
    if (isJapanese) {
        const firstName = japaneseFirstNames[Math.floor(seededRandom() * japaneseFirstNames.length)];
        const lastName = japaneseLastNames[Math.floor(seededRandom() * japaneseLastNames.length)];
        return `${firstName} ${lastName}`;
    } else {
        const firstName = otherFirstNames[Math.floor(seededRandom() * otherFirstNames.length)];
        const lastName = otherLastNames[Math.floor(seededRandom() * otherLastNames.length)];
        return `${firstName} ${lastName}`;
    }
}

/**
 * Generate random subject data
 * @param {array} subjectsWithPages - Array of subject IDs that have actual detail pages
 * @param {number} maxSubjectId - Maximum subject ID to generate (default 2000)
 * @param {object} statusConfig - Status distribution configuration
 * @returns {array} Array of generated subject objects
 */
function generateSubjectList(subjectsWithPages = [], maxSubjectId = 2000, statusConfig = defaultStatusConfig) {
    const subjectsSet = new Set(subjectsWithPages.map(s => typeof s === 'object' ? s.id : s));
    const generated = [];
    
    for (let id = 1; id <= maxSubjectId; id++) {
        // Skip if this ID has a page
        if (subjectsSet.has(String(id)) || subjectsSet.has(id)) {
            continue;
        }
        
        const seededRandom = createSeededRandom(id);
        
        // Generate status from the next random value
        const statusRand = seededRandom();
        let status = pickStatus(id, statusRand, statusConfig);

        // Generate classification and then derive a matching level
        const classificationRand = seededRandom();
        const classification = pickClassification(status, classificationRand);

        // Only bias S-class subjects toward In Training for IDs within the training range.
        if (classification === 'S' && status === 'Transferred' && id >= 1101) {
            const trainingBias = seededRandom();
            if (trainingBias < 0.45) {
                status = 'In Training';
            }
        }

        // F-class subjects must be Transferred
        if (classification === 'F') {
            status = 'Transferred';
        }

        const levelRand = seededRandom();
        const classificationLevelMap = {
            SS: [4, 5],
            S: [3, 4, 5],
            A: [2, 3, 4],
            B: [2, 3],
            C: [1, 2],
            D: [1, 2],
            E: [1],
            F: [1]
        };
        const availableLevels = classificationLevelMap[classification] || [1];
        const level = String(availableLevels[Math.floor(levelRand * availableLevels.length)]);

        generated.push({
            id: String(id),
            name: generateNameForId(id),
            status: status,
            level: level,
            classification: classification,
            quirk: '',
            hasPage: false
        });
    }
    
    return generated;
}

/**
 * Merge existing subjects with generated subjects
 * Existing subjects take priority and override generated ones
 * @param {array} existingSubjects - Subjects with actual pages/data
 * @param {number} maxSubjectId - Maximum ID to generate to
 * @returns {array} Complete merged list
 */
function mergeSubjectsWithGenerated(existingSubjects = [], maxSubjectId = 2000) {
    const existingIds = new Set(existingSubjects.map(s => String(s.id)));
    
    // Add generated subjects for all other IDs
    const generated = generateSubjectList(existingIds, maxSubjectId);
    
    // Combine: existing subjects first (with hasPage: true), then generated
    const merged = existingSubjects.map(s => ({
        ...s,
        hasPage: true,
        classification: s.classification || pickClassification(s.status || 'In Training', createSeededRandom(Number(s.id))())
    })).concat(generated);
    
    // Sort by ID numerically
    merged.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    
    return merged;
}

/**
 * Export as JSON string for file saving
 * @param {array} subjects - Subjects array
 * @returns {string} JSON string
 */
function exportToJSON(subjects) {
    return JSON.stringify(subjects, null, 2);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateNameForId,
        generateSubjectList,
        mergeSubjectsWithGenerated,
        exportToJSON,
        japaneseFirstNames,
        japaneseLastNames,
        otherFirstNames,
        otherLastNames
    };
}
