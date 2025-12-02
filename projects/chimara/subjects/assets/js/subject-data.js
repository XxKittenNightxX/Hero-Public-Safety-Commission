// Centralized subject data configuration
const subjectData = {
    1092: { // Maxus Blackwood
        name: 'Maxus Blackwood',
        status: 'Terminated',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'A Class',
        age: 31,
        birthDate: 'April 11th',
        bloodType: 'Type B',
        height: '5\' 9"',
        clearanceLevel: 'Level 3',
        titles: ['Rebellion Leader'],
        quirkName: 'Supercharged Electricity',
        quirkType: 'Emitter',
        quirkDescription: 'The quirk generates incredibly potent, dangerous electricity from an internal source expandable through training. Their bodies are naturally immune to electricity, which instead charges them. This electricity is far more powerful than normal electricity, capable of causing devastating effects, but is limited by an internal energy source that can be increased through rigorous training.'
    },
    1128: { // Olivia Foster
        name: 'Olivia Foster',
        status: 'Deceased',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'B Class',
        age: 30,
        birthDate: 'July 3rd',
        bloodType: 'Type A',
        height: '5\' 4"',
        clearanceLevel: 'Level 3',
        titles: [],
        quirkName: 'Progenitor',
        quirkType: 'Emitter',
        quirkDescription: 'Her unique Quirk enabled her to create human beings. These were typically quirkless, but if she made a person while touching another, the new person would inherit a heavily modified version of the other\'s Quirk. However, this ability had a strict limitation: she could only create one person for each person she touched in this way. To create more individuals, she would need to find new people to touch.'
    },
    1396: { // Amir Yaoyorozu
        name: 'Amir Yaoyorozu',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'A Class',
        age: 25,
        birthDate: 'January 18th',
        bloodType: 'Unknown BloodType',
        height: '5\' (outdated)',
        clearanceLevel: 'Level 4',
        titles: [],
        quirkName: 'Puppeteer',
        quirkType: 'Emitter',
        quirkDescription: 'Subject can create a unbreakable highly reflective invisible thread that can be wrapped around the others and control them, or be able to pull his body to the location he attached himself to'
    },
    1709: { // Raden
        name: 'Raden',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'A Class Class',
        age: 15,
        birthDate: 'February 27th',
        bloodType: 'Type O+',
        height: '5\' 7" (outdated)',
        clearanceLevel: 'Level 4',
        titles: [],
        quirkName: 'Flux Shift',
        quirkType: 'Emitter',
        quirkDescription: 'Raden has the ability to modify energy'
    },
    1751: { // Moon
        name: 'Moon',
        status: 'Tracked',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 16,
        birthDate: 'May 20th',
        bloodType: 'Type O',
        height: '5\' 4"',
        clearanceLevel: 'Level 5',
        titles: ['Director\'s Daughter', 'Nightmare Walker', 'The Tormentor', 'MoonFlower (Saburo)', 'Corrupted Demon'],
        quirkName: 'Dark energy',
        quirkType: 'Emitter',
        quirkDescription: 'the Quirk allows for the storage and versatile manipulation of internal energy. This energy can be utilized for self-enhancement, energy projection, and cognitive influence, including the induction of controlled dream states. The Quirk\'s functionality is characterized by a dual-persona system: a daytime persona with limited control and a nighttime persona with advanced proficiency.'
    },
    1753: { // Saburo ██████
        name: 'Saburo ██████',
        status: 'Tracked',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 16,
        birthDate: 'May 21st',
        bloodType: 'Type O-',
        height: '5\' 2"',
        clearanceLevel: 'Level 5',
        titles: ['Director\'s Son', 'Demon Prodigy', 'Rabid Teacher', 'Shadow Tiger', 'Shadowed Hope'],
        quirkName: 'Quirkless -> Shadow Synthesis',
        quirkType: 'Emitter',
        quirkDescription: 'The individual\'s Quirk grants the capacity for shadow manipulation, allowing for the dynamic control of darkness within their environment. Concurrently, a significant enhancement in cognitive processing is observed, suggesting a direct link between the Quirk\'s function and heightened intellectual capabilities.'
    },
    1755: { // Xanti
        name: 'Xanti',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'A Class',
        age: 16,
        birthDate: 'December 3rd',
        bloodType: 'Type O-',
        height: '5\' 5"',
        clearanceLevel: 'Level 4',
        titles: [],
        quirkName: 'Fallen Angel',
        quirkType: 'Mutant',
        quirkDescription: 'the subject can manipulate each feather that comes off their body, to preform actions, while being able to manipulate the feathers form, the subject can also fly with their wings'
    },
    1758: { // Arata
        name: 'Arata',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'A Class',
        age: 15,
        birthDate: 'January 4th',
        bloodType: 'Type O-',
        height: '5\' 6"',
        clearanceLevel: 'Level 4',
        titles: [],
        quirkName: 'Quirkless',
        quirkType: 'N/a',
        quirkDescription: 'N/a'
    },
    1781: { // Akako ██████
        name: 'Akako ██████',
        status: 'Alive',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 15,
        birthDate: 'March 3rd',
        bloodType: 'Type AB',
        height: '5\' 5"',
        clearanceLevel: 'Level 4',
        titles: ['The Enforcer', 'Violet Reaper'],
        quirkName: 'Celestial Conduit',
        quirkType: 'Emitter',
        quirkDescription: 'Akako , can create stable, two-way portals between any two locations she has memorized the precise coordinates of. These portals don\'t just open; they rip a shimmering tear in the fabric of reality, revealing a swirling, breathtaking galaxy within. The size of the portal is initially limited to a small circle, but with practice and training, Akako can expand the portal\'s diameter to a maximum of 5 meters.'
    },
    1794: { // Haruto
        name: 'Haruto',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 16,
        birthDate: 'February 27th',
        bloodType: 'Type O+',
        height: '6\' (outdated)',
        clearanceLevel: 'Level 5',
        titles: [],
        quirkName: 'Gravity Manipulation',
        quirkType: 'Emitter',
        quirkDescription: 'The ability to manipulate gravity.'
    },
    1884: { // Eva Yaoyorozu
        name: 'Eva Yaoyorozu',
        status: 'Under Observation',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'Unclassified',
        age: 17,
        birthDate: 'November 4th',
        bloodType: 'Type B-',
        height: '5\'',
        clearanceLevel: 'Level 2',
        recruitmentDate: 'Unclassified', // Override automatic calculation
        titles: [],
        quirkName: 'OmiArm',
        quirkType: 'Emmitter & Mutant',
        quirkDescription: 'can manipulate her the robotic part of her body and can manipulate it to form to whatever she can think of (Needs to be studied more)'
    },
    2008: { // Violet
        name: 'Violet',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 16,
        birthDate: 'November 1st',
        bloodType: 'Type B',
        height: '5\' (outdated)',
        clearanceLevel: 'Level 5',
        titles: ['The Walking Calamity'],
        quirkName: 'Transmutation',
        quirkType: 'Emmitter & Mutant',
        quirkDescription: 'The subject possesses the capacity for somatic morphing, enabling the transformation of her physical form into that of other biological organisms. This process necessitates the acquisition of comprehensive biological data pertaining to the target species. Furthermore, the subject demonstrates the ability to undergo partial transformations, manifesting specific anatomical or physiological characteristics of the selected creature..'
    },
    2012: { // Solar
        name: 'Solar',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 15,
        birthDate: 'November 24th',
        bloodType: 'Type O+',
        height: '4\' 8"',
        clearanceLevel: 'Level 5',
        titles: [],
        quirkName: 'Solar Energy',
        quirkType: 'Emitter',
        quirkDescription: 'Can absorb and convert solar energy into various forms of energy projection and enhancement.'
    },
    2037: { // Michi
        name: 'Michi',
        status: 'Deceased',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'B Class',
        age: 13,
        birthDate: 'January 15th',
        bloodType: 'Type O-',
        height: '4\' 5"',
        clearanceLevel: 'Level 5',
        titles: [],
        quirkName: 'Regenerator',
        quirkType: 'Emitter',
        quirkDescription: 'Can visualize and create optimal paths through any environment or situation.'
    },
    2099: { // Mia
        name: 'Mia',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'S Class',
        age: 16,
        birthDate: 'June 9th',
        bloodType: 'Type B',
        height: '5\' 1"',
        clearanceLevel: 'Level 4',
        titles: ['Infernal Demon','Pyromaniac'],
        quirkName: 'Infernal Energy',
        quirkType: 'Emitter',
        quirkDescription: 'This Quirk grants fire-based abilities fueled by "Infernal Energy." Increased energy use intensifies flames, causing a physical transformation into a demonic form with enhanced aggression. Once energy output lessens, the transformation and aggressive traits subside.'
    },
    1821: { // Selene
        name: 'Selene',
        status: 'Under Observation',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'Unclassified',
        age: 16,
        birthDate: 'May 20th',
        bloodType: 'A-',
        height: '5\'4"',
        clearanceLevel: 'Level 2',
        recruitmentDate: 'Unclassified', // Override automatic calculation
        titles: [],
        quirkName: 'Objective Oracle',
        quirkType: 'Emitter',
        quirkDescription: 'The user manifests an "Objective Oracle," a mental voice that provides strategic guidance. When the user sets a specific goal and identifies a target, the Oracle offers the most effective path to achieve that objective. The Oracle\'s knowledge isn\'t universal, but it\'s omniscient within the context of the user\'s goals, delivering detailed insights and strategic advice.'
    },
    2008: { // Violet
        name: 'Violet',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS Class',
        age: 16,
        birthDate: 'November 1st',
        bloodType: 'Type B',
        height: '5\' (outdated)',
        clearanceLevel: 'Level 5',
        titles: ['The Walking Calamity'],
        quirkName: 'Transmutation',
        quirkType: 'Emmitter & Mutant',
        quirkDescription: 'The subject possesses the capacity for somatic morphing, enabling the transformation of her physical form into that of other biological organisms. This process necessitates the acquisition of comprehensive biological data pertaining to the target species. Furthermore, the subject demonstrates the ability to undergo partial transformations, manifesting specific anatomical or physiological characteristics of the selected creature..'
    },
        2012: { // Solar
        name: 'Solar',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS',
        age: 15,
        birthDate: 'November 24th',
        bloodType: 'O+',
        height: '4\'8" (outdated)',
        clearanceLevel: 'Level 5',
        titles: [],
        quirkName: 'Sun',
        quirkType: 'Emitter',
        quirkDescription: 'Something with the sun, light, and fire'
    },
        2037: { // Michi Yuma
        name: 'Michi Yuma',
        status: 'Deceased',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'B',
        age: 13,
        birthDate: 'January 15th',
        bloodType: 'O-',
        height: '4\' 5"',
        clearanceLevel: 'Level 5',
        titles: [],
        quirkName: 'Regenerator',
        quirkType: 'Emitter',
        quirkDescription: 'The body of the person will always and forever keep regenerating back, if a body is too beyond repair, it\'ll repair itself from the living tissue closest or furthest apart.'
    },
        2099: { // Mia
        name: 'Mia',
        status: 'Missing',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'S',
        age: 16,
        birthDate: 'June 9th',
        bloodType: 'Type B',
        height: '5\' 1"',
        clearanceLevel: 'Level 4',
        titles: ['Infernal Demon', 'Pyromaniac'],
        quirkName: 'Infernal Energy',
        quirkType: 'Emitter',
        quirkDescription: 'This Quirk grants fire-based abilities fueled by "Infernal Energy." Increased energy use intensifies flames, causing a physical transformation into a demonic form with enhanced aggression. Once energy output lessens, the transformation and aggressive traits subside.'
    },
        1471: { // Yumeno
        name: 'Yumeno',
        status: 'Graduated',
        // Tracked, Missing, Terminated, Deceased, Alive
        classification: 'SS',
        age: 21,
        birthDate: 'January 31st',
        bloodType: 'A+',
        height: '5\'6"',
        clearanceLevel: 'Level 5',
        titles: [],
        quirkName: 'Arcade',
        quirkType: 'Emitter',
        quirkDescription: 'The user can absorb and utilize video images and energy, allowing them to create objects and beings from video games.'
    },
};

// Function to calculate recruitment date based on subject ID
function getRecruitmentDate(subjectId) {
    const currentYear = 2025;
    
    // Calculate which range the subject falls into
    if (subjectId >= 2501 && subjectId <= 2600) return `January ${currentYear - 1}`;
    if (subjectId >= 2401 && subjectId <= 2500) return `January ${currentYear - 3}`;
    if (subjectId >= 2301 && subjectId <= 2400) return `January ${currentYear - 5}`;
    if (subjectId >= 2201 && subjectId <= 2300) return `January ${currentYear - 7}`;
    if (subjectId >= 2101 && subjectId <= 2200) return `January ${currentYear - 9}`;
    if (subjectId >= 2001 && subjectId <= 2100) return `January ${currentYear - 11}`;
    if (subjectId >= 1801 && subjectId <= 1900) return `January ${currentYear - 13}`;
    if (subjectId >= 1701 && subjectId <= 1800) return `January ${currentYear - 15}`;
    if (subjectId >= 1601 && subjectId <= 1700) return `January ${currentYear - 17}`;
    if (subjectId >= 1501 && subjectId <= 1600) return `January ${currentYear - 19}`;
    if (subjectId >= 1401 && subjectId <= 1500) return `January ${currentYear - 21}`;
    if (subjectId >= 1301 && subjectId <= 1400) return `January ${currentYear - 23}`;
    if (subjectId >= 1201 && subjectId <= 1300) return `January ${currentYear - 25}`;
    if (subjectId >= 1101 && subjectId <= 1200) return `January ${currentYear - 27}`;
    if (subjectId >= 1001 && subjectId <= 1100) return `January ${currentYear - 29}`;
    if (subjectId >= 901 && subjectId <= 1000) return `January ${currentYear - 31}`;
    if (subjectId >= 801 && subjectId <= 900) return `January ${currentYear - 33}`;
    if (subjectId >= 701 && subjectId <= 800) return `January ${currentYear - 35}`;
    if (subjectId >= 601 && subjectId <= 700) return `January ${currentYear - 37}`;
    if (subjectId >= 501 && subjectId <= 600) return `January ${currentYear - 39}`;
    if (subjectId >= 401 && subjectId <= 500) return `January ${currentYear - 41}`;
    if (subjectId >= 301 && subjectId <= 400) return `January ${currentYear - 43}`;
    if (subjectId >= 201 && subjectId <= 300) return `January ${currentYear - 45}`;
    if (subjectId >= 101 && subjectId <= 200) return `January ${currentYear - 47}`;
    if (subjectId >= 1 && subjectId <= 100) return `January ${currentYear - 49}`;
    
    return 'Unknown';
}

// Function to load subject data into the page
function loadSubjectData() {
    // Get subject ID from the page
    const subjectIdElement = document.querySelector('.subject-id');
    if (!subjectIdElement) return;
    
    const subjectId = parseInt(subjectIdElement.textContent.replace(/[^0-9]/g, ''));
    const data = subjectData[subjectId];
    
    if (!data) {
        console.warn(`No data found for subject ${subjectId}`);
        return;
    }
    
    // Use subject's recruitmentDate if defined, otherwise calculate automatically
    const recruitmentDate = data.recruitmentDate || getRecruitmentDate(subjectId);
    
    // Calculate birth year from age
    const currentYear = 2025;
    const birthYear = currentYear - data.age;
    const fullBirthDate = `${data.birthDate} ${birthYear}`;
    
    // Update page title
    document.title = `Subject #${subjectId} - ${data.name}`;
    
    // Update subject title
    const subjectTitle = document.querySelector('.subject-title');
    if (subjectTitle) subjectTitle.textContent = data.name;
    
    // Update titles/badges
    const titlesRow = document.querySelector('.titles-row');
    if (titlesRow && data.titles && data.titles.length > 0) {
        titlesRow.innerHTML = data.titles.map(title => 
            `<span class="title-badge">${title}</span>`
        ).join('\n                    ');
    }
    
    // Update status badge (large)
    const statusBadgeLarge = document.querySelector('.status-badge-large');
    if (statusBadgeLarge) {
        const statusClass = data.status.toLowerCase().replace(/\s+/g, '-');
        statusBadgeLarge.className = `status-badge-large ${statusClass}`;
        statusBadgeLarge.textContent = data.status;
    }
    
    // Update classification badge
    const classificationBadge = document.querySelector('.classification-badge');
    if (classificationBadge) {
        classificationBadge.textContent = data.classification;
    }
    
    // Update info grid values
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        const label = item.querySelector('.info-label');
        const value = item.querySelector('.info-value');
        
        if (!label || !value) return;
        
        const labelText = label.textContent.trim();
        
        switch(labelText) {
            case 'Name':
                value.textContent = data.name;
                break;
            case 'Status':
                const statusBadgeSmall = value.querySelector('.status-badge-small');
                if (statusBadgeSmall) {
                    const statusClass = data.status.toLowerCase().replace(/\s+/g, '-');
                    statusBadgeSmall.className = `status-badge-small ${statusClass}`;
                    statusBadgeSmall.textContent = data.status;
                }
                break;
            case 'Classification':
                value.textContent = data.classification;
                break;
            case 'Age':
                value.textContent = data.age;
                break;
            case 'Birth Date':
                value.textContent = fullBirthDate;
                break;
            case 'Blood Type':
                value.textContent = data.bloodType;
                break;
            case 'Height':
                value.textContent = data.height;
                break;
            case 'Clearance Level':
                value.textContent = data.clearanceLevel;
                break;
            case 'Recruitment Date':
                value.textContent = recruitmentDate;
                break;
            case 'Quirk Name':
                value.textContent = data.quirkName;
                break;
            case 'Quirk Type':
                value.textContent = data.quirkType;
                break;
        }
    });
    
    // Update quirk description
    const quirkDescription = document.querySelector('.info-section:nth-of-type(2) .description');
    if (quirkDescription && data.quirkDescription) {
        quirkDescription.textContent = data.quirkDescription;
    }
    
    // Protect page based on clearance level (if auth.js is loaded)
    if (typeof protectSubjectPage === 'function' && data.clearanceLevel) {
        protectSubjectPage(data.clearanceLevel);
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadSubjectData);
