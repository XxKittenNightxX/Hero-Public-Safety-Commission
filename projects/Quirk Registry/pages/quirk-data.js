// Quirk Registry Data Configuration
// Edit this file to update quirk registry information

const quirkRegistryData = {
    1821: { // Selene
        registryId: 'QRK-1821',
        subjectName: 'Selene Moonshadow',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Objective Oracle',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `The user manifests an "Objective Oracle," a mental voice that provides strategic guidance. 
            When the user sets a specific goal and identifies a target, the Oracle offers the most effective 
            path to achieve that objective. The Oracle's knowledge isn't universal, but it's omniscient 
            within the context of the user's goals, delivering detailed insights and strategic advice.`,
        capabilities: [
            {
                name: 'Strategic Analysis',
                description: 'Provides optimal tactical approaches to achieving defined objectives'},
            {
                name: 'Goal-Oriented Omniscience',
                description: "Knowledge is contextually infinite within the scope of the user's stated goals"},
            {
                name: 'Real-Time Guidance',
                description: 'Delivers continuous strategic advice during Alive operations'},
            {
                name: 'Target Assessment',
                description: 'Analyzes targets and provides comprehensive tactical data'
            }
        ],
        
        limitations: [
            {
                name: 'Goal Dependency',
                description: 'Oracle only functions when a specific goal is clearly defined'},
            {
                name: 'Limited Scope',
                description: 'Knowledge is not universal - only pertains to Alive objectives' },
            {
                name: 'Mental Strain',
                description: 'Extended use can cause psychological fatigue'},
            {
                name: 'Requires goal',
                description: 'Must have a clearly identified goal for optimal guidance'
            }
        ],
        hereditaryAnalysis: {
            description: `Selene's quirk "Objective Oracle" is a unique mutation resulting from the combination of her parents' quirks. 
                Genetic analysis indicates a complex synthesis that merged strategic and perceptive abilities.`,
            
            motherQuirk: {
                name: 'Strategic Mind',
                type: 'Emitter',
                description: `The ability to rapidly analyze tactical situations and formulate multi-step plans. Enhanced cognitive 
                    processing when evaluating strategic options and predicting outcomes based on current information.`},
            
            fatherQuirk: {
                name: 'Clairvoyance',
                type: 'Emitter',
                description: `Limited precognitive ability that provides glimpses of potential futures and hidden information 
                    related to specific targets or objectives. Information appears as intuitive insights rather than direct visions.`},
            
            synthesis: `<strong>Objective Oracle</strong> synthesizes the strategic analysis capabilities of Strategic Mind with the 
                information-gathering aspects of Clairvoyance. The result is a manifestation that provides goal-oriented omniscience—
                combining her mother's tactical processing with her father's intuitive knowledge acquisition. Unlike simple precognition, 
                the Oracle delivers comprehensive strategic guidance by merging analytical and perceptive elements into a singular, 
                purpose-driven advisory system.`},
        
        // Subject Information
        age: 16,
        birthDate: 'May 20th 2009',
        bloodType: 'A-',
        height: '5\'4"',
        status: 'Hero Course Student', // Living, Deceased, Missing.
        
        // Registration Details
        registrationDate: 'May 2019',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2020',
        
        // Associated Programs
        associatedPrograms: [
            {
                name: 'Chimera Project',
                url: '../../chimara/subjects/pages/1821 - Selene.html',
                requiredProject: 'chimara' // User must have this project in their access list
            }
        ],
        
        // Image
        imagePath: 'img/Selene.png',
        
        // Clearance Notice
        clearanceNotice: `This record is classified under Level 2 clearance. Complete medical records, DNA analysis, 
            family history, and detailed psychological assessments require Level 3+ clearance. 
            Subject is currently enrolled in a classified HPSC program. For access elevation or additional 
            information, contact the Data Management Division.`
    },
    
    1092: { // Maxus Blackwood
        registryId: 'QRK-1092',
        subjectName: 'Maxus Blackwood',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Supercharged Electricity',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Combination',
        description: `The quirk generates incredibly potent, dangerous electricity from an internal source expandable through training. Their bodies are naturally immune to electricity, which instead charges them. This electricity is far more powerful than normal electricity, capable of causing devastating effects, but is limited by an internal energy source that can be increased through rigorous training.`,
        
        hereditaryAnalysis: {
            description: `Maxus's "Supercharged Electricity" is a combination quirk that enhanced and merged his parents' electrical abilities into a more potent form.`,
            motherQuirk: {
                name: 'Electric Generation',
                type: 'Emitter',
                description: `Standard electricity generation quirk allowing the user to produce and discharge electrical currents from their body. Limited output capacity.`
            },
            fatherQuirk: {
                name: 'Battery',
                type: 'Accumulation',
                description: `The ability to store electrical energy internally, building reserves over time. Can absorb electricity from external sources to charge faster.`
            },
            synthesis: `<strong>Supercharged Electricity</strong> combines the generation capabilities with the storage capacity, creating an internal power plant. Unlike his mother's limited output or his father's passive storage, Maxus can generate incredibly potent electricity while maintaining vast energy reserves. The synergy allows for sustained high-power output previously impossible with either parent quirk alone.`
        },
        
        age: 31,
        birthDate: 'April 11th 1994',
        bloodType: 'Type B',
        height: '5\' 9"',
        status: 'deceased',
        registrationDate: 'January 1996',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1092 - Maxus Blackwood.html', requiredProject: 'chimara'}],
        imagePath: 'img/Maxus.webp',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject was terminated in 2024. Full operational history and termination details require Level 4+ clearance.`
    },
    
    1128: { // Olivia Foster
        registryId: 'QRK-1128',
        subjectName: 'Olivia Foster',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Progenitor',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `Her unique Quirk enabled her to create human beings. These were typically quirkless, but if she made a person while touching another, the new person would inherit a heavily modified version of the other's Quirk. However, this ability had a strict limitation: she could only create one person for each person she touched in this way. To create more individuals, she would need to find new people to touch.`,
        
        hereditaryAnalysis: {
            description: `Olivia's "Progenitor" quirk is a radical mutation that diverged significantly from her parents' quirks, combining biological manipulation with genetic replication in an unprecedented way.`,
            motherQuirk: {
                name: 'Cell Division',
                type: 'Emitter',
                description: `Accelerated cellular reproduction affecting the user's own body, allowing for rapid healing and tissue regeneration through controlled mitosis.`
            },
            fatherQuirk: {
                name: 'DNA Reader',
                type: 'Emitter',
                description: `The ability to scan and understand genetic information through touch, perceiving the genetic makeup and quirk factors of others as intuitive knowledge.`
            },
            synthesis: `<strong>Progenitor</strong> mutated far beyond its parent quirks, transforming cellular manipulation and genetic reading into full-scale human creation. The quirk processes genetic information and uses it as a template to create entirely new individuals. When combined with another person's touch, it can copy and modify their quirk factors, creating unique variations. This represents a fundamental evolution from simple cellular control to complete biological generation.`
        },
        
        age: 30,
        birthDate: 'July 3rd 1995',
        bloodType: 'Type A',
        height: '5\' 4"',
        status: 'Deceased',
        registrationDate: 'January 1998',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1128 - Olivia Foster.html', requiredProject: 'chimara'}],
        imagePath: 'img/Olivia.webp',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject deceased. Full operational history requires Level 4+ clearance.`
    },
    
    1781: { // Akako Miller
        registryId: 'QRK-1781',
        subjectName: 'Akako Miller',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Celestial Conduit',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `Can create stable, two-way portals between any two locations she has memorized the precise coordinates of. These portals don't just open; they rip a shimmering tear in the fabric of reality, revealing a swirling, breathtaking galaxy within. The size of the portal is initially limited to a small circle, but with practice and training, Akako can expand the portal's diameter to a maximum of 5 meters.`,
        
        hereditaryAnalysis: {
            description: `Akako's "Celestial Conduit" is a powerful mutation that merged spatial manipulation with dimensional phasing, creating stable traversable portals through space.`,
            motherQuirk: {
                name: 'Short-Range Teleportation',
                type: 'Emitter',
                description: `Instantaneous spatial displacement allowing the user to teleport themselves to any visible location within approximately 10 meters. Requires line of sight and brief concentration before each jump.`
            },
            fatherQuirk: {
                name: 'Imperceptible',
                type: 'Emitter',
                description: `The ability to manipulate one's own presence, making oneself and touched objects nearly undetectable to senses. Functions by bending perception and partially phasing from normal space.`
            },
            synthesis: `<strong>Celestial Conduit</strong> combines short-range spatial displacement with phase manipulation to create long-distance traversable portals. Where her mother could only teleport herself short distances and her father could partially phase from space, Akako tears stable rifts connecting any two memorized points. The galaxy visualization within portals suggests her quirk operates by creating permanent pathways through higher-dimensional space, vastly exceeding both parent quirks in range and utility.`,
            siblings: `<strong>Saburo Miller</strong> (QRK-1753) - Older brother is quirkless.`
        },
        
        age: 16,
        birthDate: 'March 3rd 2010',
        bloodType: 'Type AB+',
        height: '5\' 6"',
        status: '(HPSC) Active',
        registrationDate: 'January 2010',
        registryOfficer: 'Red Miller',
        lastUpdated: 'January 2025',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1781 - Akako ██████.html', requiredProject: 'chimara'}],
        imagePath: 'img/Akako.png',
        clearanceNotice: `This record is classified under Level 4 clearance. Subject is Alive in classified operations. Full capability assessments and operational records require Level 5 clearance.`
    },
    
    1471: { // Yumeno
        registryId: 'QRK-1471',
        subjectName: 'Yumeno Pixelhart',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Arcade',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Unknown Origin',
        description: `The user can absorb and utilize video images and energy, allowing them to create objects and beings from video games. The manifestations are tangible and can interact with the physical world, limited only by the user's understanding of the source material and energy reserves.`,
        
        hereditaryAnalysis: {
            description: `Yumeno's "Arcade" quirk is a unique mutation that transformed digital comprehension and energy projection into the ability to materialize virtual concepts into physical reality.`,
            motherQuirk: {
                name: 'Digital Mind',
                type: 'Emitter',
                description: `Enhanced ability to understand, process, and interact with digital information and electronic systems. Can comprehend complex code and digital patterns intuitively.`
            },
            fatherQuirk: {
                name: 'Hard Light',
                type: 'Emitter',
                description: `Can generate solid light constructs that have physical mass and durability. Requires intense concentration to maintain stable forms.`
            },
            synthesis: `<strong>Arcade</strong> merges digital comprehension with physical manifestation in a groundbreaking way. Where the mother could only understand digital systems and the father could create basic light constructs, Yumeno can absorb video game data and recreate those digital entities as tangible hard-light constructs. The quirk essentially treats video games as blueprints, using hard-light generation to give them physical form with properties matching their digital counterparts.`
        },
        
        age: 21,
        birthDate: 'January 31st 2004',
        bloodType: 'Type O+',
        height: '5\' 3"',
        status: 'Hero',
        registrationDate: 'January 2004',
        registryOfficer: 'Red Miller',
        lastUpdated: 'January 2009',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1471 - Yumeno.html', requiredProject: 'chimara'}],
        imagePath: 'img/Yumeno.png',
        clearanceNotice: `This record is classified under Level 4 clearance. Subject capabilities are highly unusual and require specialized containment protocols. Full assessment requires Level 5 clearance.`
    },
    
    1396: { // Amir Yaoyorozu
        registryId: 'QRK-1396',
        subjectName: 'Amir Yaoyorozu',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Puppeteer',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `Subject can create unbreakable highly reflective invisible threads that can be wrapped around others to control them, or used to pull the user's body to locations where threads are attached.`,
        
        hereditaryAnalysis: {
            description: `Amir's "Puppeteer" quirk represents a significant mutation that combined material generation with force manipulation, creating invisible control threads with remarkable properties.`,
            motherQuirk: {
                name: 'Creation',
                type: 'Emitter',
                description: `The ability to create any non-living material or object from the user's body through molecular manipulation. Requires understanding of the atomic structure and composition of created items. User must consume lipids to provide raw material for creation.`
            },
            fatherQuirk: {
                name: 'Fiber Control',
                type: 'Emitter',
                description: `Can manipulate and control fibrous materials such as threads, ropes, and strings within a limited range. User can alter tension, direction, and movement of existing fibers but cannot create them.`
            },
            siblings: `<strong>Eva Yaoyorozu</strong> (QRK-1884) - Younger Sister with quirk "OmiArm".`,
            synthesis: `<strong>Puppeteer</strong> evolved beyond both parent quirks by creating threads with impossible properties - unbreakable, highly reflective, and invisible. Where his mother could create objects and his father could control existing fibers, Amir generates specialized threads that function as both physical tethers and control mechanisms. The threads' dual functionality (pulling himself or controlling others) suggests the quirk synthesized creation with advanced force manipulation, exceeding simple fiber control.`
        },
        
        age: 25,
        birthDate: 'January 18th 2000',
        bloodType: 'Unknown',
        height: '5\' (outdated)',
        status: 'Missing',
        registrationDate: 'January 2002',
        registryOfficer: 'Red Miller',
        lastUpdated: 'March 2013',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1396 - Amir Yaoyorozu.html', requiredProject: 'chimara'}],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Subject went missing in 2020. Full operational history requires Level 5 clearance.`
    },
    
    1709: { // Raden
        registryId: 'QRK-1709',
        subjectName: 'Raden Ashford',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Flux Shift',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `The ability to modify and manipulate energy in its various forms. Can alter the properties, direction, and intensity of energy manifestations.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Raden's "Flux Shift" is a mutation that evolved from basic energy manipulation quirks into comprehensive energy control.`,
            motherQuirk: {
                name: 'Heat Absorption',
                type: 'Emitter',
                description: `Can absorb thermal energy from the environment, storing it temporarily within the body. Can release absorbed heat in controlled bursts.`
            },
            fatherQuirk: {
                name: 'Current Flow',
                type: 'Emitter',
                description: `Can redirect the flow of electrical currents within a limited range. Does not generate electricity but can manipulate existing electrical energy.`
            },
            synthesis: `<strong>Flux Shift</strong> expanded beyond its parents' specific energy types to manipulate energy in all its forms. Where the mother controlled thermal energy and father controlled electrical energy, Raden can modify any energy manifestation - kinetic, thermal, electrical, or otherwise. This represents a fundamental evolution in energy manipulation capabilities.`
        },
        
        age: 15,
        birthDate: 'January 18th 2000',
        bloodType: 'Type O+',
        height: '5\' 7" (outdated)',
        status: 'Missing',
        registrationDate: 'January 2002',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1709 - Raden.html', requiredProject: 'chimara'}],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Subject went missing during containment breach. Full details require Level 5 clearance.`
    },
    
    1753: { // Saburo Miller
        registryId: 'QRK-1753',
        subjectName: 'Saburo Miller',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Quirkless',
        quirkType: 'None',
        quirkClassification: 'None',
        hereditaryStatus: 'None',
        description: `None.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Saburo was born quirkless despite having quirked parents. His current Shadow Synthesis quirk was acquired through classified experimental procedures.`,
            motherQuirk: {
                name: 'Short-Range Teleportation',
                type: 'Emitter',
                description: `Instantaneous spatial displacement allowing teleportation to any visible location within approximately 10 meters. Requires line of sight and brief concentration.`
            },
            fatherQuirk: {
                name: 'Imperceptible',
                type: 'Emitter',
                description: `Can manipulate own presence, making self and touched objects nearly undetectable to all senses. Functions by bending perception and partially phasing from normal space.`
            },
            siblings: `<strong>Akako Miller</strong> (QRK-1781) - Younger sister with Celestial Conduit quirk. Both children of Red Miller (QRK-1750), HPSC Director.`,
            synthesis: `Arata inherited no quirk factor. Despite both parents being quirked, the combination resulted in a quirkless child.`
        },
        
        age: 16,
        birthDate: 'May 21st 2009',
        bloodType: 'Type O-',
        height: '5\' 2"',
        status: 'Missing',
        registrationDate: 'January 2010',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1753 - Saburo ██████.html', requiredProject: 'chimara'}],
        imagePath: 'img/Saburo.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject is Director's son. All information requires highest clearance.`
    },
    
    1755: { // Xanti
        registryId: 'QRK-1755',
        subjectName: 'Xanti Featherstone',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Fallen Angel',
        quirkType: 'Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `The subject can manipulate each feather that detaches from their body to perform various actions. Can manipulate feather form and properties. Subject possesses functional wings enabling flight.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Xanti's "Fallen Angel" quirk is a mutant-type that combined avian physiology with material manipulation abilities.`,
            motherQuirk: {
                name: 'Feather Generation',
                type: 'Mutant',
                description: `Possesses wings and can rapidly grow and shed feathers. Feathers are stronger and sharper than normal bird feathers but cannot be controlled after detachment.`
            },
            fatherQuirk: {
                name: 'Shape Memory',
                type: 'Emitter',
                description: `Can alter the shape and properties of objects they've touched, making materials bend, harden, or change form temporarily.`
            },
            synthesis: `<strong>Fallen Angel</strong> merged wing mutation with object manipulation to create controllable weaponized feathers. Unlike the mother who could only produce feathers, Xanti maintains telekinetic control over detached feathers and can alter their properties mid-flight, combining both parent abilities into a versatile offensive and defensive quirk.`
        },
        
        age: 16,
        birthDate: 'December 3rd 2009',
        bloodType: 'Type O-',
        height: '5\' 5"',
        status: 'Missing',
        registrationDate: 'January 2010',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1755 - Xanti.html', requiredProject: 'chimara'}],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Subject escaped during transport. Full details require Level 5 clearance.`
    },
    
    1758: { // Arata
        registryId: 'QRK-1758',
        subjectName: 'Arata Nakamura',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Quirkless',
        quirkType: 'None',
        quirkClassification: 'N/A',
        hereditaryStatus: 'N/A',
        description: `Subject possesses no quirk factor. Enrolled in specialized training program.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Arata was born without a quirk factor despite both parents possessing quirks. Genetic analysis shows recessive quirkless genes from both sides.`,
            motherQuirk: {
                name: 'Minor Telekinesis',
                type: 'Emitter',
                description: `Can move small objects (under 1kg) with mental focus. Limited range of approximately 5 meters and requires visual contact.`
            },
            fatherQuirk: {
                name: 'Enhanced Reflexes',
                type: 'Mutant',
                description: `Possesses reaction time approximately 3x faster than baseline human. Allows for rapid response to stimuli and improved combat capabilities.`
            },
            synthesis: `Arata inherited no quirk factor. Despite both parents being quirked, the combination resulted in a quirkless child.`
        },
        
        age: 16,
        birthDate: 'January 4th 2010',
        bloodType: 'Type O-',
        height: '5\' 6"',
        status: 'Missing',
        registrationDate: 'January 2010',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1758 - Arata.html', requiredProject: 'chimara'}],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject enrolled in classified training program.`
    },
    
    1794: { // Haruto
        registryId: 'QRK-1794',
        subjectName: 'Haruto Sero',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Gravity Manipulation',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Combination',
        description: `The ability to manipulate gravitational forces in a localized area. Can increase, decrease, or redirect gravity affecting objects and individuals.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Haruto's "Gravity Manipulation" is a combination quirk that merged force redirection with mass perception to create localized gravitational control.`,
            motherQuirk: {
                name: 'Push/Pull',
                type: 'Emitter',
                description: `Can exert attrAlive or repulsive force on objects within range. Force strength decreases with distance and object mass.`
            },
            fatherQuirk: {
                name: 'Weight Sense',
                type: 'Emitter',
                description: `Can perceive the mass and weight distribution of objects and people nearby. Functions as a form of mass-based echolocation.`
            },
            synthesis: `<strong>Gravity Manipulation</strong> combined directional force control with mass perception to create true gravitational manipulation. Rather than simply pushing or pulling objects, Haruto can alter the gravitational field itself, affecting multiple targets simultaneously and creating areas of increased or decreased gravity.`
        },
        
        age: 16,
        birthDate: 'February 27th 2009',
        bloodType: 'Type O+',
        height: '6\'',
        status: 'Missing',
        registrationDate: 'January 2010',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1794 - Haruto.html', requiredProject: 'chimara'}],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Subject exhibits high-level spatial manipulation capabilities.`
    },
    
    1884: { // Eva Yaoyorozu
        registryId: 'QRK-1884',
        subjectName: 'Eva Yaoyorozu',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'OmiArm',
        quirkType: 'Emitter & Mutant',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `Can manipulate the robotic components of her body, transforming them into various forms and tools limited only by imagination and understanding of mechanics. Requires further study.`,
        
        hereditaryAnalysis: {
            description: `Eva's "OmiArm" quirk is an unusual mutation that merged material creation with mechanical transformation, manifesting as cybernetic manipulation abilities.`,
            motherQuirk: {
                name: 'Creation',
                type: 'Emitter',
                description: `The ability to create any non-living material or object from the user's body through molecular manipulation. Requires understanding of the atomic structure and composition of created items. User must consume lipids to provide raw material for creation.`
            },
            fatherQuirk: {
                name: 'Fiber Control',
                type: 'Emitter',
                description: `Can manipulate and control fibrous materials such as threads, ropes, and strings within a limited range. User can alter tension, direction, and movement of existing fibers but cannot create them.`
            },
            siblings: `<strong>Amir Yaoyorozu</strong> (QRK-1396) - Older brother, currently missing. His quirk "Puppeteer" also derived from the same parent quirks but manifested as thread creation and control.`,
            synthesis: `<strong>OmiArm</strong> represents a unique mutation of the parent quirks, where creation ability bonded with manipulation to manifest as cybernetic limbs rather than external objects. Unlike her brother's thread-based abilities, Eva's quirk internalized the creation aspect into her own body as robotic components, which she can then reshape and control. This suggests her quirk merged creation with self-transformation, creating permanent mechanical augmentations that respond to her will.`
        },
        
        age: 17,
        birthDate: 'November 4th 2008',
        bloodType: 'Type B-',
        height: '5\'',
        status: 'Hero Course Student',
        registrationDate: 'June 2012',
        registryOfficer: 'Red Miller',
        lastUpdated: 'March 2013',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/1884 - Eva Yaoyorozu.html', requiredProject: 'chimara'}],
        imagePath: 'img/Eva.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject capabilities still under assessment.`
    },
    
    2008: { // Violet
        registryId: 'QRK-2008',
        subjectName: 'Violet Shadowmere',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'Transmutation',
        quirkType: 'Emitter & Mutant',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `The subject possesses the capacity for somatic morphing, enabling transformation into other biological organisms. Requires comprehensive biological data of target species. Can undergo partial transformations manifesting specific anatomical or physiological characteristics.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Violet's "Transmutation" is an extreme mutation that evolved from basic transformation abilities into complete biological restructuring.`,
            motherQuirk: {
                name: 'Animal Traits',
                type: 'Transformation',
                description: `Can temporarily manifest specific animal characteristics such as claws, enhanced senses, or toughened skin. Limited to traits the user has studied extensively.`
            },
            fatherQuirk: {
                name: 'DNA Scanner',
                type: 'Emitter',
                description: `Can analyze the genetic makeup of organisms through touch, understanding their biological structure at a molecular level.`
            },
            synthesis: `<strong>Transmutation</strong> combined trait manifestation with genetic analysis to enable full-body transformation into any studied organism. Unlike the mother's limited trait mimicry, Violet can completely restructure her biology based on the father's scanning ability, creating perfect biological copies of any scanned species.`
        },
        
        age: 16,
        birthDate: 'November 1st 2009',
        bloodType: 'Type B',
        height: '5\'',
        status: 'Missing',
        registrationDate: 'January 2014',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/2008 - Violet.html', requiredProject: 'chimara'}],
        imagePath: 'img/Violet.png',
        clearanceNotice: `This record is classified under Level 5 clearance. Subject is high-priority target. All information restricted.`
    },
    
    2012: { // Solar
        registryId: 'QRK-2012',
        subjectName: 'Solar Brightwell',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Sun',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `Abilities related to solar energy, light manipulation, and fire generation. Can absorb and redirect solar radiation. Full capabilities under assessment.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Solar's "Sun" quirk is a mutation that merged light manipulation with thermal generation to create solar-based powers.`,
            motherQuirk: {
                name: 'Photokinesis',
                type: 'Emitter',
                description: `Can generate and manipulate visible light, creating illusions, bright flashes, or concentrated beams. Cannot generate heat, only light.`
            },
            fatherQuirk: {
                name: 'Flame Body',
                type: 'Transformation',
                description: `Can superheat parts of the body to produce flames. User is immune to their own heat but has limited control over flame direction.`
            },
            synthesis: `<strong>Sun</strong> merged light generation with heat production to mimic solar energy itself. Where parents could produce either light or heat separately, Solar generates both simultaneously, absorbing solar radiation to amplify power and creating concentrated heat-light attacks that function like miniature solar flares.`
        },
        
        age: 15,
        birthDate: 'November 24th 2010',
        bloodType: 'Type O+',
        height: '4\' 8"',
        status: 'Missing',
        registrationDate: 'January 2014',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/2012 - Solar.html', requiredProject: 'chimara'}],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject capabilities require further documentation.`
    },
    
    2037: { // Michi Yuma
        registryId: 'QRK-2037',
        subjectName: 'Michi Yuma',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Regenerator',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `The subject's body will perpetually regenerate from any damage. If the body is beyond repair, it will regenerate from the nearest or furthest living tissue remaining. Near-perfect healing factor.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Michi's "Regenerator" is an extreme mutation that evolved basic healing into perpetual biological restoration.`,
            motherQuirk: {
                name: 'Fast Healing',
                type: 'Mutant',
                description: `Wounds close and heal at approximately 10x normal speed. Cannot regrow lost limbs or organs, only repair existing tissue damage.`
            },
            fatherQuirk: {
                name: 'Cell Memory',
                type: 'Emitter',
                description: `Body retains a biological blueprint of its ideal state. Can use this to correct minor injuries or deformities over time by guiding natural healing.`
            },
            synthesis: `<strong>Regenerator</strong> combined accelerated healing with biological blueprinting to create near-immortal regeneration. Unlike simple fast healing, Michi can regenerate from any remaining living tissue, using the cellular memory to reconstruct the entire body from even catastrophic damage.`
        },
        
        age: 13,
        birthDate: 'January 15th 2012',
        bloodType: 'Type O-',
        height: '4\' 5"',
        status: 'Deceased',
        registrationDate: 'January 2014',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/2037 - Michi Yuma.html', requiredProject: 'chimara'}],
        imagePath: 'img/Michi.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject's regeneration capabilities extensively documented.`
    },
    
    2099: { // Mia
        registryId: 'QRK-2099',
        subjectName: 'Mia Inferno',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Infernal Energy',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        villainTag: 'VILLAIN',
        description: `Grants fire-based abilities fueled by "Infernal Energy." Increased energy use intensifies flames, causing physical transformation into demonic form with enhanced aggression. Transformation subsides when energy output decreases.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Mia's "Infernal Energy" is a mutation that fused fire generation with transformation, creating a power-linked metamorphosis quirk.`,
            motherQuirk: {
                name: 'Pyrokinesis',
                type: 'Emitter',
                description: `Can generate and control flames. Fire intensity increases with emotional state but user has no natural flame resistance.`
            },
            fatherQuirk: {
                name: 'Rage Form',
                type: 'Transformation',
                description: `When angry, undergoes physical transformation gaining enhanced strength and durability. Appearance becomes more monstrous with increased aggression.`
            },
            synthesis: `<strong>Infernal Energy</strong> merged fire generation with rage transformation, but linked the metamorphosis to power output rather than emotion. As Mia uses more energy to intensify flames, her body transforms into a demonic state with enhanced aggression, creating a self-amplifying combat form.`
        },
        
        age: 16,
        birthDate: 'June 9th 2009',
        bloodType: 'Type B',
        height: '5\' 1"',
        status: 'Missing',
        registrationDate: 'January 2014',
        registryOfficer: 'Red Miller',
        lastUpdated: 'June 2023',
        associatedPrograms: [{name: 'Chimera Project', url: '../../chimara/subjects/pages/2099 - Mia.html', requiredProject: 'chimara'}],
        imagePath: 'img/Mia.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject requires emotional regulation monitoring.`
    },
    
    2100: { // Ebony Deathmark
        registryId: 'QRK-2100',
        subjectName: 'Ebony Deathmark',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Shadow Demon',
        quirkType: 'Emitter & Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `Can manipulate shadows and darkness. Exhibits physical mutations from quirk manifestation including altered appearance and enhanced physical capabilities in darkness.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Ebony's "Shadow Demon" is a mutation that combined darkness manipulation with permanent physical transformation.`,
            motherQuirk: {
                name: 'Umbral Control',
                type: 'Emitter',
                description: `Can manipulate existing shadows, causing them to move, solidify, or form basic shapes. Cannot create darkness, only control what already exists.`
            },
            fatherQuirk: {
                name: 'Demon Heritage',
                type: 'Mutant',
                description: `Possesses minor demonic physical traits including horns, altered eye color, and slightly enhanced physical capabilities. Purely cosmetic with minor stat boosts.`
            },
            synthesis: `<strong>Shadow Demon</strong> merged shadow manipulation with demonic mutation, creating a quirk where physical transformation enhances darkness control. The permanent demonic traits amplify Ebony's power in low-light conditions, and the shadow manipulation extends beyond the father's static mutation into Alive combat abilities.`
        },
        
        age: 17,
        birthDate: 'September 16th 2009',
        bloodType: 'Type O+',
        height: '4\' 10"',
        status: 'Hero Course Student',
        registrationDate: 'January 2014',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'September 2025',
        associatedPrograms: [],
        imagePath: './img/Ebony.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject exhibits stable quirk control.`
    },
    
    2101: { // White Usagiyama
        registryId: 'QRK-2101',
        subjectName: 'White Usagiyama',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Rabbit',
        quirkType: 'Mutant',
        quirkClassification: 'Common',
        hereditaryStatus: 'Direct Inheritance',
        description: `Grants rabbit-like physical characteristics and abilities including enhanced leg strength, jumping capability, superior hearing, and increased agility.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `White's "Rabbit" quirk is a direct inheritance from the Usagiyama lineage, maintaining consistent rabbit-type mutation across generations. Younger sibling of Pro Hero Rumi Usagiyama (Mirko).`,
            motherQuirk: {
                name: 'Rabbit',
                type: 'Mutant',
                description: `Rabbit-like mutation providing enhanced leg strength, jumping ability, improved hearing, and increased agility. Standard Usagiyama family trait.`
            },
            fatherQuirk: {
                name: 'Carnivore Regeneration',
                type: 'Emitter',
                description: `Can accelerate healing and tissue repair by consuming meat. Healing rate scales with quantity and quality of meat consumed.`
            },
            synthesis: `<strong>Rabbit</strong> inherited directly from the mother's Usagiyama bloodline. The father's meat-based healing quirk merged subtly, giving White enhanced recovery capabilities when consuming protein, particularly beneficial after intense physical exertion from jumping and combat.`,
            siblings: `Elder sibling: <a href="QRK-3007-Rumi.html" style="color: #8e44ad; text-decoration: none; font-weight: 600;">Rumi Usagiyama (QRK-3007)</a> - Pro Hero #5 (Mirko)`
        },
        
        age: 15,
        birthDate: 'December 28th 2009',
        bloodType: 'Type A',
        height: '5\' 2"',
        status: 'Hero Course Student',
        registrationDate: 'December 2009',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'November 2015',
        associatedPrograms: [],
        imagePath: 'img/white.png',
        clearanceNotice: `This record is classified under Level 2 clearance. Standard mutant-type quirk documentation.`
    },
    
    1750: { // Red Miller
        registryId: 'QRK-1750',
        subjectName: 'Red Miller',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'Imperceptible',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Combination',
        description: `Can manipulate own presence, making self and touched objects nearly undetectable to all senses including sight, sound, smell, and physical sensation. Extent depends on focus and stamina.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Red Miller's "Imperceptible" quirk is a combination-type that merged sensory manipulation with spatial phasing capabilities.`,
            motherQuirk: {
                name: 'Sensory Void',
                type: 'Emitter',
                description: `Can create zones where specific senses are nullified. User can selectively eliminate sight, sound, or smell within a limited area.`
            },
            fatherQuirk: {
                name: 'Phase Step',
                type: 'Emitter',
                description: `Allows brief partial phasing from normal space, making the user difficult to physically interact with. Limited duration and requires concentration.`
            },
            siblings: `<strong>Children:</strong> <br>Akako Miller (QRK-1781)<br> Saburo Miller (QRK-1753).`,
            synthesis: `<strong>Imperceptible</strong> combined sensory nullification with spatial phasing to create comprehensive stealth capabilities. Rather than just eliminating specific senses or briefly phasing, Red can manipulate his entire presence across all sensory modalities simultaneously. This makes him nearly undetectable to both technological and quirk-based detection methods.`
        },
        
        age: 37,
        birthDate: 'May 15t0h 1992',
        bloodType: 'Type O-',
        height: '6\' 1"',
        status: 'HPSC project director',
        registrationDate: 'Classified',
        registryOfficer: 'HPSC Director',
        lastUpdated: 'November 2025',
        associatedPrograms: ['Chimera Project', 'HPSC Administration'],
        imagePath: 'img/Red.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. Subject is HPSC Director and Chimera Project Lead. All information requires highest authorization.`
    },
    
    2102: { // Akari Datenshi
        registryId: 'QRK-2102',
        subjectName: 'Akari Datenshi',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Quirkless',
        quirkType: 'None',
        quirkClassification: 'N/A',
        hereditaryStatus: 'N/A',
        description: `Subject possesses no quirk factor. Enrolled in specialized support program.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Akari was born without a quirk factor. Both parents possess minor quirks but genetic combination resulted in quirkless offspring.`,
            motherQuirk: {
                name: 'Static Spark',
                type: 'Emitter',
                description: `Can generate small static electricity discharges from fingertips. Useful for minor tasks but minimal combat application.`
            },
            fatherQuirk: {
                name: 'Night Vision',
                type: 'Mutant',
                description: `Can see clearly in low-light conditions. Eyes reflect light similar to nocturnal animals.`
            },
            synthesis: `Akari inherited no quirk factor despite both parents being quirked. Genetic analysis shows incompatible quirk genes that cancelled each other out. Subject has focused on support equipment and strategic training to contribute in non-combat roles.`
        },
        
        age: 17,
        birthDate: 'February 14th 2008',
        bloodType: 'Type A+',
        height: '5\' 4"',
        status: 'Hero Course Student',
        registrationDate: 'February 14th 2008',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'February 14th 2015',
        associatedPrograms: [],
        imagePath: 'img/Akari.webp',
        clearanceNotice: `This record is classified under Level 2 clearance. Subject in support role training.`
    },
    
    2103: { // Melody
        registryId: 'QRK-2103',
        subjectName: 'Melody Foxglove',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Hell Fox',
        quirkType: 'Emitter & Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Combination',
        villainTag: 'VILLAIN',
        description: `Grants fox-like abilities and appearance. Can manipulate minds in minor ways - subtle suggestion and emotional influence. Effect can be broken if subject is rendered unconscious.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Melody's "Hell Fox" is a combination quirk that merged animal mutation with mental manipulation abilities.`,
            motherQuirk: {
                name: 'Fox Traits',
                type: 'Mutant',
                description: `Possesses fox-like physical characteristics including ears, tail, enhanced senses, and improved agility. Purely physical with no mental abilities.`
            },
            fatherQuirk: {
                name: 'Subtle Influence',
                type: 'Emitter',
                description: `Can plant minor suggestions in people's minds through prolonged eye contact. Effects are weak and easily resisted by strong-willed individuals.`
            },
            synthesis: `<strong>Hell Fox</strong> combined fox mutation with mental influence, creating a quirk where the animal traits enhance manipulation abilities. The fox appearance puts targets at ease while Melody subtly influences emotions and thoughts, making the mental manipulation more effective than the father's standalone ability.`
        },
        
        age: 17,
        birthDate: 'September 28th 2008',
        bloodType: 'Type B',
        height: '5\' 5"',
        status: 'At Large - Wanted',
        registrationDate: 'September 28th 2008',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'September 28th 2013',
        associatedPrograms: [],
        imagePath: 'img/Melody.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Mental manipulation capabilities monitored.`
    },
    
    2104: { // Kenji
        registryId: 'QRK-2104',
        subjectName: 'Kenji Masquerade',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Mask',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        villainTag: 'WATCH LIST',
        description: `Can create masks of any shape and size. Anyone wearing the created masks falls under the user's control, acting as puppets to the user's will.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Kenji's "Mask" quirk is a mutation that evolved from object creation and mental influence into control-artifact generation.`,
            motherQuirk: {
                name: 'Material Crafting',
                type: 'Emitter',
                description: `Can create simple objects from non-living materials. Items are temporary and dissolve after several hours. Limited to objects user fully understands.`
            },
            fatherQuirk: {
                name: 'Command Voice',
                type: 'Emitter',
                description: `Can issue verbal commands that compel obedience. Requires target to hear and understand the command. Strong-willed individuals can resist.`
            },
            synthesis: `<strong>Mask</strong> merged object creation with mental control, creating artifacts that enforce absolute obedience. Rather than temporary objects or resistible commands, Kenji creates permanent masks that completely override the wearer's will, combining both parent abilities into a powerful control mechanism.`
        },
        
        age: 17,
        birthDate: 'September 9th 2007',
        bloodType: 'Type AB',
        height: '5\' 9"',
        status: 'civilian - under surveillance',
        registrationDate: 'September 9th 2012',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'July 2024',
        associatedPrograms: [],
        imagePath: 'img/Kenji.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Mind control capabilities require strict oversight.`
    },
    
    2105: { // Arthur
        registryId: 'QRK-2105',
        subjectName: 'Arthur Stormborne',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Black Lightning',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `Can create and manipulate black-colored electricity with unique properties distinct from standard electrical generation quirks. Exact differences under study.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Arthur's "Black Lightning" is a mutation that evolved standard electrical generation into a unique variant with altered properties.`,
            motherQuirk: {
                name: 'Electrogenesis',
                type: 'Emitter',
                description: `Can generate and discharge electrical currents. Standard yellow-white lightning with typical voltage and amperage properties.`
            },
            fatherQuirk: {
                name: 'Electrification',
                type: 'Emitter',
                description: `Can alter the properties of energy they come into contact with, making it unstable or changing its fundamental characteristics temporarily.`
            },
            synthesis: `<strong>Black Lightning</strong> merged electrical generation with energy corruption to create electricity with fundamentally altered properties. The black coloration indicates modified electromagnetic properties, potentially higher voltage, different conduction rates, or unique interaction with matter compared to standard electricity.`
        },
        
        age: 15,
        birthDate: 'December 12th 2010',
        bloodType: 'Type O+',
        height: '5\' 10"',
        status: 'Missing',
        registrationDate: 'December 12th 2015',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'September 2020',
        associatedPrograms: [],
        imagePath: 'img/Arthur.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Quirk properties differ from standard electrical types.`
    },
    
    2106: { // Kurma Kuza
        registryId: 'QRK-2106',
        subjectName: 'Kurma Kuza',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Mapper',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Combination',
        description: `Possesses mental map of entire country while within its borders. Can sense locations and public occupations of individuals. Functions as human GPS system with comprehensive geographical awareness.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Kurma's "Mapper" quirk is a combination that merged spatial awareness with information gathering to create comprehensive geographical omniscience.`,
            motherQuirk: {
                name: 'Direction Sense',
                type: 'Emitter',
                description: `Always knows cardinal directions and can sense the layout of immediate surroundings. Functions as internal compass with local mapping.`
            },
            fatherQuirk: {
                name: 'Public Records',
                type: 'Emitter',
                description: `Can psychically access publicly available information about individuals within range. Limited to occupation, age, and basic biographical data.`
            },
            synthesis: `<strong>Mapper</strong> expanded directional sense to country-wide scale and merged it with information access. Where parents had local awareness and limited data access, Kurma possesses complete geographical omniscience within national borders, simultaneously knowing every location and the public information of people within range.`
        },
        
        age: 14,
        birthDate: 'March 3rd 2011',
        bloodType: 'Type A',
        height: '5\' 7"',
        status: 'citizen',
        registrationDate: 'March 3rd 2017',
        registryOfficer: 'Red Miller',
        lastUpdated: 'November 24th 2025',
        associatedPrograms: [],
        imagePath: 'img/Kurma Kuza.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Subject provides valuable reconnaissance capabilities.`
    },
    
    2107: { // Kage Faun
        registryId: 'QRK-2107',
        subjectName: 'Kage Faun',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Blood Control',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `Can control blood of self and others. Can manipulate blood movement, properties, and physical state. Can harden blood into weapons, flow it into objects, or direct it anywhere within range.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Kage's "Blood Control" is a mutation that evolved from basic liquid manipulation into comprehensive hemato-kinesis.`,
            motherQuirk: {
                name: 'Hydrokinesis',
                type: 'Emitter',
                description: `Can manipulate water and other liquids within range. Can change flow direction, shape water into forms, or alter its pressure.`
            },
            fatherQuirk: {
                name: 'Iron Blood',
                type: 'Mutant',
                description: `Blood contains unusually high iron content, making it denser and more viscous. Provides minor resistance to blood loss and slight durability increase.`
            },
            synthesis: `<strong>Blood Control</strong> specialized liquid manipulation specifically to blood, enhanced by the iron-rich composition. Where the mother controlled any liquid and father had passive blood enhancement, Kage can manipulate blood's movement, solidify it into weapons using iron content, and control both his own and others' blood with precision.`
        },
        
        age: 15,
        birthDate: 'October 13th 2010',
        bloodType: 'Type AB-',
        height: '5\' 6"',
        status: 'citizen',
        registrationDate: 'October 13th 2015',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'October 13th 2025',
        associatedPrograms: [],
        imagePath: 'img/Kage Faun.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Quirk has significant combat and medical applications.`
    },
    
    2108: { // Hura Kuro
        registryId: 'QRK-2108',
        subjectName: 'Hura Kuro',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Dollie',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Combination',
        description: `Can control dolls remotely. With quirk information, can embed quirks into dolls, though dolls must withstand the quirk's power or break down. Creates army of quirk-wielding puppets.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Hura's "Dollie" is a combination quirk that merged remote control with quirk replication to create programmable puppet warriors.`,
            motherQuirk: {
                name: 'Telekinesis',
                type: 'Emitter',
                description: `Can move and manipulate inanimate objects remotely. Limited to objects within visual range and requires concentration to maintain control.`
            },
            fatherQuirk: {
                name: 'Quirk Imprint',
                type: 'Emitter',
                description: `Can temporarily copy the quirk signature of someone they've touched, storing the information for later analysis. Cannot use the quirks, only understand them.`
            },
            synthesis: `<strong>Dollie</strong> merged remote manipulation with quirk understanding to create embedded-quirk puppets. Where the mother could only move objects and father could only study quirks, Hura can program copied quirks into dolls and control them remotely, creating an army that wields multiple abilities.`
        },
        
        age: 14,
        birthDate: 'November 5th 2010',
        bloodType: 'Type B+',
        height: '5\' 8"',
        status: 'citizen',
        registrationDate: 'November 5th 2017',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'September 2025',
        associatedPrograms: [],
        imagePath: 'img/Hura Kuro.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Quirk replication capabilities monitored.`
    },
    
    2109: { // Uma Kiza
        registryId: 'QRK-2109',
        subjectName: 'Uma Kiza',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Ghost',
        quirkType: 'Emitter',
        quirkClassification: 'Uncommon',
        hereditaryStatus: 'Mutation',
        description: `Can transform into ghost-like state, becoming intangible and able to pass through solid matter. Retains consciousness and perception while incorporeal.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Uma's "Ghost" is a mutation that evolved from partial phasing into complete intangibility transformation.`,
            motherQuirk: {
                name: 'Phase Through',
                type: 'Transformation',
                description: `Can phase specific body parts through solid matter for brief moments. Requires concentration and cannot maintain phasing for more than a few seconds.`
            },
            fatherQuirk: {
                name: 'Transparency',
                type: 'Transformation',
                description: `Can make body parts or entire body transparent and nearly invisible. Purely visual - does not affect physical interaction.`
            },
            synthesis: `<strong>Ghost</strong> merged partial phasing with transparency to create complete incorporeal transformation. Unlike parents' limited abilities, Uma can fully transition into an intangible state that passes through matter while maintaining consciousness and perception, essentially becoming a true ghost.`
        },
        
        age: 14,
        birthDate: 'May 5th 2011',
        bloodType: 'Type O',
        height: '5\' 4"',
        status: 'citizen',
        registrationDate: 'May 5th 2019',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'November 2025',
        associatedPrograms: [],
        imagePath: 'img/Uma Kiza.png',
        clearanceNotice: `This record is classified under Level 2 clearance. Standard intangibility quirk documentation.`
    },
    
    2110: { // Dako Umza
        registryId: 'QRK-2110',
        subjectName: 'Dako Umza',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Nullifier',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Mutation',
        description: `Can stop a person's quirk via touch or direct eye contact. Nullification is temporary and requires maintained contact or line of sight.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Dako's "Nullifier" is a mutation that evolved from quirk sensing into Alive quirk suppression capabilities.`,
            motherQuirk: {
                name: 'Quirk Sense',
                type: 'Emitter',
                description: `Can perceive the presence and general nature of nearby quirks. Functions as quirk-specific radar, detecting Alive quirk usage within range.`
            },
            fatherQuirk: {
                name: 'Energy Drain',
                type: 'Emitter',
                description: `Can absorb energy from physical contact, making targets feel fatigued. Does not store energy, simply disperses it.`
            },
            synthesis: `<strong>Nullifier</strong> merged quirk detection with energy drain to create targeted quirk suppression. Rather than just sensing or draining energy generally, Dako can specifically target and shut down the quirk factor itself through touch or eye contact, temporarily severing the connection between target and their quirk.`
        },
        
        age: 15,
        birthDate: 'August 20th 2010',
        bloodType: 'Type A-',
        height: '6\' 0"',
        status: 'citizen',
        registrationDate: 'August 20th 2015',
        registryOfficer: 'Kuroda Arata',
        lastUpdated: 'October 2025',
        associatedPrograms: [],
        imagePath: 'img/Dako Umza.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Quirk nullification capabilities valuable for containment operations.`
    },
    
    2111: { // Uyza Kuma
        registryId: 'QRK-2111',
        subjectName: 'Uyza Kuma',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Serene Grace',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Combination',
        description: `Allows transformation with halo and glowing patterns. Can buff or debuff anyone within range, effects lasting up to one week. Can detect any existence within range regardless of stealth quirks.`,
        capabilities: [],
        limitations: [],
        
        hereditaryAnalysis: {
            description: `Uyza's "Serene Grace" is a combination quirk that merged area enhancement with detection abilities, creating a powerful support quirk.`,
            motherQuirk: {
                name: 'Aura Blessing',
                type: 'Emitter',
                description: `Can temporarily enhance allies' physical capabilities through touch. Effects last several hours and provide moderate stat boosts.`
            },
            fatherQuirk: {
                name: 'True Sight',
                type: 'Emitter',
                description: `Can see through illusions and detect hidden presences within visual range. Immune to sensory-disruption quirks while Alive.`
            },
            synthesis: `<strong>Serene Grace</strong> evolved touch-based enhancement into area-of-effect buffs and debuffs, while expanding detection to omnidirectional awareness. The angelic transformation with halo and patterns serves as a visual indicator of the quirk's Alive state, and effects last up to one week rather than hours, making it an exceptional support ability.`
        },
        
        age: 13,
        birthDate: 'June 6th 2012',
        bloodType: 'Type AB+',
        height: '5\' 5"',
        status: 'citizen',
        registrationDate: 'June 6th 2018',
        registryOfficer: 'Red Miller',
        lastUpdated: 'November 2025',
        associatedPrograms: [],
        imagePath: 'img/Uyza Kuma.png',
        clearanceNotice: `This record is classified under Level 3 clearance. Support and detection capabilities extensively documented.`
    },

    // TOP 10 HEROES
    3001: {
        registryId: 'QRK-3001',
        subjectName: 'Toshinori Yagi',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'One For All',
        quirkType: 'Emitter/Stockpile',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Transferred',
        description: `A transferable quirk that stockpiles power and can be passed from user to user. Grants immense strength, speed, and durability. The 8th user, known as "All Might," became the Symbol of Peace.`,
        age: 57,
        birthDate: 'June 10th 1976',
        bloodType: 'Type A',
        height: '7\' 3" (Muscle Form) / 6\' 2" (True Form)',
        status: 'Retired',
        registrationDate: 'March 1977',
        registryOfficer: 'Gran Torino',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. Symbol of Peace. Retired hero.`
    },

    3002: {
        registryId: 'QRK-3002',
        subjectName: 'Enji Todoroki',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Hellflame',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to generate and manipulate extremely powerful flames from their body. Currently the #1 Hero (Endeavor) following All Might's retirement.`,
        age: 54,
        birthDate: 'August 8th 1979',
        bloodType: 'Type AB',
        height: '6\' 5"',
        status: 'Hero',
        registrationDate: 'September 1979',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. #1 Pro Hero.`
    },

    3003: {
        registryId: 'QRK-3003',
        subjectName: 'Keigo Takami',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Fierce Wings',
        quirkType: 'Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Grants large red wings composed of individual feathers that can be controlled telekinetically. Each feather can be used independently for reconnaissance, rescue, or combat. #2 Pro Hero (Hawks).`,
        age: 31,
        birthDate: 'December 28th 2002',
        bloodType: 'Type B',
        height: '5\' 7"',
        status: 'Active Hero',
        registrationDate: 'January 2003',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. #2 Pro Hero. HPSC operative.`
    },

    3004: {
        registryId: 'QRK-3004',
        subjectName: 'Tsunagu Hakamada',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Fibermaster',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to manipulate fabric fibers at will, unraveling and controlling threads for binding, offense, and defense. #4 Pro Hero (Best Jeanist).`,
        age: 44,
        birthDate: 'October 5th 1989',
        bloodType: 'Type A',
        height: '6\' 3"',
        status: 'Active Hero',
        registrationDate: 'November 1989',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. #4 Pro Hero.`
    },

    3005: {
        registryId: 'QRK-3005',
        subjectName: 'Shinji Nishiya',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Arbor',
        quirkType: 'Transformation',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to transform their body into wood, granting enhanced durability and the ability to extend wooden constructs. #6 Pro Hero (Kamui Woods).`,
        age: 37,
        birthDate: 'May 20th 1996',
        bloodType: 'Type O',
        height: '6\' 0"',
        status: 'Active Hero',
        registrationDate: 'June 1996',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. #6 Pro Hero.`
    },

    3006: {
        registryId: 'QRK-3006',
        subjectName: 'Yu Takeyama',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Gigantification',
        quirkType: 'Transformation',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to grow to gigantic proportions, reaching heights of 67 feet. #9 Pro Hero (Mt. Lady).`,
        age: 31,
        birthDate: 'August 8th 2002',
        bloodType: 'Type O',
        height: '5\' 4" (Normal) / 67\' (Giant)',
        status: 'Active Hero',
        registrationDate: 'September 2002',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. #9 Pro Hero.`
    },

    3007: {
        registryId: 'QRK-3007',
        subjectName: 'Rumi Usagiyama',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Rabbit',
        quirkType: 'Mutant',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Grants rabbit-like features including powerful legs for jumping and kicking, enhanced hearing, and superior agility. #5 Pro Hero (Mirko).`,
        
        hereditaryAnalysis: {
            description: `Rumi's "Rabbit" quirk is a direct inheritance from the Usagiyama family lineage. Elder sibling of White Usagiyama (QRK-2101).`,
            motherQuirk: {
                name: 'Rabbit',
                type: 'Mutant',
                description: `Rabbit-like mutation providing enhanced leg strength, jumping ability, improved hearing, and increased agility. Core Usagiyama family trait.`
            },
            fatherQuirk: {
                name: 'Carnivore Regeneration',
                type: 'Emitter',
                description: `Can accelerate healing and tissue repair by consuming meat. Healing rate scales with quantity and quality of meat consumed.`
            },
            synthesis: `<strong>Rabbit</strong> inherited as the dominant trait from the mother's Usagiyama bloodline. The father's meat-based healing quirk provides enhanced recovery capabilities, making Rumi exceptionally resilient in prolonged combat situations.`,
            siblings: `Younger sibling: <a href="QRK-2101-White.html" style="color: #8e44ad; text-decoration: none; font-weight: 600;">White Usagiyama (QRK-2101)</a> - Hero Course Student`
        },
        
        age: 35,
        birthDate: 'March 1st 1998',
        bloodType: 'Type O',
        height: '5\' 3"',
        status: 'Active Hero',
        registrationDate: 'April 1998',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. #5 Pro Hero.`
    },

    3008: {
        registryId: 'QRK-3008',
        subjectName: 'Taishiro Toyomitsu',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Fat Absorption',
        quirkType: 'Transformation',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to absorb fat and store it in their body. The stored fat can be converted into energy and strength, and also provides cushioning against attacks. #8 Pro Hero (Fat Gum).`,
        age: 37,
        birthDate: 'September 8th 1996',
        bloodType: 'Type O',
        height: '6\' 7" (Fat Form) / 6\' 2" (Slim Form)',
        status: 'Active Hero',
        registrationDate: 'October 1996',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. #8 Pro Hero.`
    },

    3009: {
        registryId: 'QRK-3009',
        subjectName: 'Shinya Kamihara',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Foresight',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to see into the future of a specific target after making eye contact and analyzing their vitals. Can predict movements up to one hour in advance. Former #7 Pro Hero (Sir Nighteye).`,
        age: 46,
        birthDate: 'January 2nd 1987',
        bloodType: 'Type AB',
        height: '6\' 7"',
        status: 'Deceased',
        registrationDate: 'February 1987',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Former #7 Pro Hero. Deceased.`
    },

    3010: {
        registryId: 'QRK-3010',
        subjectName: 'Ryuko Tatsuma',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Dragon',
        quirkType: 'Transformation',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to transform into a large Western dragon, granting flight, enhanced strength, and durable scales. #10 Pro Hero (Ryukyu).`,
        age: 40,
        birthDate: 'April 9th 1993',
        bloodType: 'Type B',
        height: '5\' 4" (Human) / 65\' (Dragon)',
        status: 'Active Hero',
        registrationDate: 'May 1993',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. #10 Pro Hero.`
    },

    // UA FACULTY
    3020: {
        registryId: 'QRK-3020',
        subjectName: 'Shota Aizawa',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Erasure',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to nullify another person's quirk by looking at them. Effect ends when the user blinks or loses line of sight. Pro Hero (Eraserhead) and UA Class 1-A homeroom teacher.`,
        age: 39,
        birthDate: 'November 8th 1994',
        bloodType: 'Type B',
        height: '6\' 0"',
        status: 'Active Hero/Teacher',
        registrationDate: 'December 1994',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Pro Hero and UA teacher.`
    },

    3021: {
        registryId: 'QRK-3021',
        subjectName: 'Hizashi Yamada',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Voice',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to amplify their voice to destructive levels. Volume and power can be controlled and directed. Pro Hero (Present Mic) and UA teacher.`,
        age: 39,
        birthDate: 'July 7th 1994',
        bloodType: 'Type B',
        height: '6\' 0"',
        status: 'Active Hero/Teacher',
        registrationDate: 'August 1994',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. Pro Hero and UA teacher.`
    },

    3022: {
        registryId: 'QRK-3022',
        subjectName: 'Nemuri Kayama',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Somnambulist',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to emit a sleep-inducing aroma from their body. More effective on males. Pro Hero (Midnight) and UA teacher.`,
        age: 39,
        birthDate: 'March 9th 1994',
        bloodType: 'Type A',
        height: '5\' 9"',
        status: 'Active Hero/Teacher',
        registrationDate: 'April 1994',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. Pro Hero and UA teacher. Deceased.`
    },

    3023: {
        registryId: 'QRK-3023',
        subjectName: 'Sekijiro Kan',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Blood Control',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to manipulate their own blood after it leaves their body, hardening it into weapons or barriers. Pro Hero (Vlad King) and UA Class 1-B homeroom teacher.`,
        age: 40,
        birthDate: 'February 10th 1993',
        bloodType: 'Type O',
        height: '6\' 3"',
        status: 'Active Hero/Teacher',
        registrationDate: 'March 1993',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. Pro Hero and UA teacher.`
    },

    3024: {
        registryId: 'QRK-3024',
        subjectName: 'Sorahiko Torino',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'Jet',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to shoot air from holes in the soles of their feet, granting high-speed mobility and flight. Retired Pro Hero (Gran Torino) and former mentor to All Might.`,
        age: 80,
        birthDate: 'January 1st 1953',
        bloodType: 'Type B',
        height: '4\' 2"',
        status: 'Active Hero/Teacher',
        registrationDate: 'February 1953',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. Retired Pro Hero. All Might's mentor.`
    },

    3025: {
        registryId: 'QRK-3025',
        subjectName: 'Chiyo Shuuzenji',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Heal',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to accelerate and amplify the target's healing process with a kiss, using the target's own stamina as fuel. UA nurse (Recovery Girl).`,
        age: 90,
        birthDate: 'March 3rd 1943',
        bloodType: 'Type O',
        height: '3\' 9"',
        status: 'Active Hero/Teacher',
        registrationDate: 'April 1943',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. UA medical staff.`
    },

    // OLD CLASS 1-A STUDENTS
    3100: {
        registryId: 'QRK-3100',
        subjectName: 'Izuku Midoriya',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'One For All',
        quirkType: 'Emitter/Stockpile',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Transferred',
        description: `The 9th user of One For All. Stockpiles power and can access multiple quirks from previous users. UA Class 1-A student and successor to All Might.`,
        age: 24,
        birthDate: 'July 15th 2009',
        bloodType: 'Type O',
        height: '5\' 5"',
        status: 'Active Hero/Student',
        registrationDate: 'August 2025',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. One For All successor.`
    },

    3101: {
        registryId: 'QRK-3101',
        subjectName: 'Katsuki Bakugo',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Explosion',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Combination',
        description: `Allows the user to secrete nitroglycerin-like sweat from their palms and detonate it at will, creating powerful explosions. UA Class 1-A student.`,
        age: 24,
        birthDate: 'April 20th 2009',
        bloodType: 'Type A',
        height: '5\' 8"',
        status: 'active Hero/Student',
        registrationDate: 'May 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. UA student.`
    },

    3102: {
        registryId: 'QRK-3102',
        subjectName: 'Shoto Todoroki',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Half-Cold Half-Hot',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Combination',
        description: `Allows the user to generate ice from the right side of their body and fire from the left side. Son of Endeavor. UA Class 1-A student.`,
        age: 24,
        birthDate: 'January 11th 2009',
        bloodType: 'Type O',
        height: '5\' 9"',
        status: 'active Hero/Student',
        registrationDate: 'February 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. UA student. Endeavor's son.`
    },

    3103: {
        registryId: 'QRK-3103',
        subjectName: 'Ochaco Uraraka',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Zero Gravity',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to nullify gravity's effects on objects or people by touching them with their fingertips. UA Class 1-A student.`,
        age: 24,
        birthDate: 'December 27th 2009',
        bloodType: 'Type B',
        height: '5\' 1"',
        status: 'Active Hero/Student',
        registrationDate: 'January 2010',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3104: {
        registryId: 'QRK-3104',
        subjectName: 'Tenya Iida',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Engine',
        quirkType: 'Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Grants engine-like protrusions in the user's calves that allow for super speed and powerful kicks. UA Class 1-A student and class representative.`,
        age: 24,
        birthDate: 'August 22nd 2009',
        bloodType: 'Type A',
        height: '5\' 11"',
        status: 'Active Hero/Student',
        registrationDate: 'September 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3105: {
        registryId: 'QRK-3105',
        subjectName: 'Eijiro Kirishima',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Hardening',
        quirkType: 'Transformation',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to harden any part of their body, granting enhanced offense and defense. Can achieve an even harder state called "Unbreakable." UA Class 1-A student.`,
        age: 24,
        birthDate: 'October 16th 2009',
        bloodType: 'Type O',
        height: '5\' 7"',
        status: 'Active Hero/Student',
        registrationDate: 'November 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3106: {
        registryId: 'QRK-3106',
        subjectName: 'Momo Yaoyorozu',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Creation',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to create any non-living object from their exposed skin by using their lipids. Requires knowledge of the object's molecular structure. UA Class 1-A student.`,
        age: 24,
        birthDate: 'September 23rd 2009',
        bloodType: 'Type A',
        height: '5\' 8"',
        status: 'Active Hero/Student',
        registrationDate: 'October 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. UA student.`
    },

    3107: {
        registryId: 'QRK-3107',
        subjectName: 'Denki Kaminari',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Electrification',
        quirkType: 'Emitter',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to generate electricity and discharge it in various ways. Overuse causes temporary mental impairment. UA Class 1-A student.`,
        age: 24,
        birthDate: 'June 29th 2009',
        bloodType: 'Type O',
        height: '5\' 6"',
        status: 'Active Hero/Student',
        registrationDate: 'July 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3108: {
        registryId: 'QRK-3108',
        subjectName: 'Kyoka Jiro',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Earphone Jack',
        quirkType: 'Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Grants the user retractable earphone jacks hanging from their earlobes. Can be used to channel sound, pick up vibrations, and plug into objects. UA Class 1-A student.`,
        age: 24,
        birthDate: 'August 1st 2009',
        bloodType: 'Type A',
        height: '5\' 1"',
        status: 'Active Hero/Student',
        registrationDate: 'September 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3109: {
        registryId: 'QRK-3109',
        subjectName: 'Mina Ashido',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Acid',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to generate and control corrosive acid from their body. Can control the solubility and viscosity of the acid. UA Class 1-A student.`,
        age: 24,
        birthDate: 'July 30th 2009',
        bloodType: 'Type AB',
        height: '5\' 2"',
        status: 'Active Hero/Student',
        registrationDate: 'August 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3110: {
        registryId: 'QRK-3110',
        subjectName: 'Fumikage Tokoyami',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Dark Shadow',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to manifest a sentient shadow monster from their body. Stronger in darkness but harder to control. Weaker in light but more manageable. UA Class 1-A student.`,
        age: 24,
        birthDate: 'October 30th 2009',
        bloodType: 'Type AB',
        height: '5\' 2"',
        status: 'Active Hero/Student',
        registrationDate: 'November 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3111: {
        registryId: 'QRK-3111',
        subjectName: 'Tsuyu Asui',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Frog',
        quirkType: 'Mutant',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Grants the user frog-like abilities including a long tongue, wall-climbing, underwater breathing, enhanced jumping, and camouflage. UA Class 1-A student.`,
        age: 24,
        birthDate: 'February 12th 2009',
        bloodType: 'Type B',
        height: '4\' 11"',
        status: 'Active Hero/Student',
        registrationDate: 'March 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3112: {
        registryId: 'QRK-3112',
        subjectName: 'Hanta Sero',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Tape',
        quirkType: 'Emitter',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to shoot tape-like material from their elbows. The tape is strong enough to support weight and can be used for binding or mobility. UA Class 1-A student.`,
        age: 24,
        birthDate: 'July 28th 2009',
        bloodType: 'Type B',
        height: '5\' 10"',
        status: 'Active Hero/Student',
        registrationDate: 'August 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3113: {
        registryId: 'QRK-3113',
        subjectName: 'Mashirao Ojiro',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Tail',
        quirkType: 'Mutant',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Grants the user a large, strong, prehensile tail that can support their body weight and be used for offense and defense. UA Class 1-A student.`,
        age: 24,
        birthDate: 'May 28th 2009',
        bloodType: 'Type A',
        height: '5\' 6"',
        status: 'Active Hero/Student',
        registrationDate: 'June 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3114: {
        registryId: 'QRK-3114',
        subjectName: 'Toru Hagakure',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Invisibility',
        quirkType: 'Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Causes the user's body to be completely invisible at all times. Can reflect and refract light for blinding attacks. UA Class 1-A student.`,
        age: 24,
        birthDate: 'June 16th 2009',
        bloodType: 'Type A',
        height: '5\' 0"',
        status: 'Active Hero/Student',
        registrationDate: 'July 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3115: {
        registryId: 'QRK-3115',
        subjectName: 'Koji Koda',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Anivoice',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to communicate with and command animals. The user's commands are followed instinctively by creatures. UA Class 1-A student.`,
        age: 24,
        birthDate: 'February 1st 2009',
        bloodType: 'Type A',
        height: '6\' 2"',
        status: 'Active Hero/Student',
        registrationDate: 'March 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3116: {
        registryId: 'QRK-3116',
        subjectName: 'Rikido Sato',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Sugar Rush',
        quirkType: 'Emitter',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Increases the user's strength by five times for three minutes for every 10 grams of sugar consumed. Side effect includes decreased cognitive function. UA Class 1-A student.`,
        age: 24,
        birthDate: 'May 19th 2009',
        bloodType: 'Type O',
        height: '6\' 2"',
        status: 'Active Hero/Student',
        registrationDate: 'June 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3117: {
        registryId: 'QRK-3117',
        subjectName: 'Mezo Shoji',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Dupli-Arms',
        quirkType: 'Mutant',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to grow multiple appendages from their body and transform them into duplicates of other body parts. UA Class 1-A student.`,
        age: 24,
        birthDate: 'February 15th 2009',
        bloodType: 'Type B',
        height: '6\' 2"',
        status: 'Active Hero/Student',
        registrationDate: 'March 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    3118: {
        registryId: 'QRK-3118',
        subjectName: 'Yuga Aoyama',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Navel Laser',
        quirkType: 'Emitter',
        quirkClassification: 'Common',
        hereditaryStatus: 'Artificial',
        description: `Allows the user to shoot a laser beam from their navel. Overuse causes stomach pain. Quirk was artificially implanted. UA Class 1-A student.`,
        age: 24,
        birthDate: 'May 30th 2009',
        bloodType: 'Type O',
        height: '5\' 6"',
        status: 'Active Hero/Student',
        registrationDate: 'June 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student. Artificial quirk.`
    },

    3119: {
        registryId: 'QRK-3119',
        subjectName: 'Minoru Mineta',
        clearanceLevel: 'Level 2',
        clearanceNumber: 2,
        quirkName: 'Pop Off',
        quirkType: 'Emitter',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        villainTag: 'WATCH LIST',
        description: `Allows the user to produce and pluck off sticky spheres from their head. The spheres stick to anything except the user. UA Class 1-A student.`,
        age: 24,
        birthDate: 'October 8th 2009',
        bloodType: 'Type B',
        height: '3\' 6"',
        status: 'Active Hero/Student',
        registrationDate: 'November 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 2 clearance. UA student.`
    },

    // LEAGUE OF VILLAINS
    4001: {
        registryId: 'QRK-4001',
        subjectName: 'Tomura Shigaraki',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'Decay',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to disintegrate anything they touch with all five fingers. Effect spreads to connected matter. Leader of the League of Villains.`,
        villainTag: 'VILLAIN',
        age: 21,
        birthDate: 'April 4th 2004',
        bloodType: 'Type B',
        height: '5\' 9"',
        status: 'At Large - Wanted',
        registrationDate: 'May 2004',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. EXTREMELY DANGEROUS. Leader of League of Villains.`
    },

    4002: {
        registryId: 'QRK-4002',
        subjectName: 'Dabi',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Cremation',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to generate and control extremely powerful blue flames. Flames are hotter than normal fire quirks but damage the user's body. Real identity: Toya Todoroki, Endeavor's eldest son.`,
        villainTag: 'VILLAIN',
        age: 24,
        birthDate: 'January 18th 2001',
        bloodType: 'Type O',
        height: '5\' 9"',
        status: 'At Large - Wanted',
        registrationDate: 'February 2001',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. DANGEROUS. League of Villains member. Endeavor's son.`
    },

    4003: {
        registryId: 'QRK-4003',
        subjectName: 'Himiko Toga',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Transform',
        quirkType: 'Transformation',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to transform into a perfect physical copy of anyone whose blood they've ingested. Can also use their quirk if enough blood is consumed. League of Villains member.`,
        villainTag: 'VILLAIN',
        age: 17,
        birthDate: 'August 7th 2008',
        bloodType: 'Type B',
        height: '5\' 2"',
        status: 'At Large - Wanted',
        registrationDate: 'September 2008',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. DANGEROUS. League of Villains member.`
    },

    4004: {
        registryId: 'QRK-4004',
        subjectName: 'Kurogiri',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Warp Gate',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Modified',
        description: `Allows the user to create and control a dark fog that acts as a portal, transporting people and objects across great distances. Created from the body of Oboro Shirakumo using artificial modification. League of Villains member.`,
        villainTag: 'VILLAIN',
        age: 30,
        birthDate: 'Unknown',
        bloodType: 'Unknown',
        height: '5\' 11"',
        status: 'At Large - Wanted',
        registrationDate: 'Unknown',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. League of Villains member. Currently in custody.`
    },

    4005: {
        registryId: 'QRK-4005',
        subjectName: 'Atsuhiro Sako',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Compress',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to compress targets into small marble-like spheres by touching them. Compressed targets are stored in a pocket dimension. Known as Mr. Compress. League of Villains member.`,
        villainTag: 'VILLAIN',
        age: 32,
        birthDate: 'January 8th 1993',
        bloodType: 'Type B',
        height: '5\' 11"',
        status: 'At Large - Wanted',
        registrationDate: 'February 1993',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. League of Villains member.`
    },

    4006: {
        registryId: 'QRK-4006',
        subjectName: 'Shuichi Iguchi',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Gecko',
        quirkType: 'Mutant',
        quirkClassification: 'Common',
        hereditaryStatus: 'Hereditary',
        description: `Grants the user a reptilian appearance with gecko-like abilities including wall-climbing, camouflage, and the ability to hold onto surfaces. Known as Spinner. League of Villains member.`,
        villainTag: 'VILLAIN',
        age: 22,
        birthDate: 'February 8th 2003',
        bloodType: 'Type A',
        height: '5\' 7"',
        status: 'At Large - Wanted',
        registrationDate: 'March 2003',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. League of Villains member.`
    },

    4007: {
        registryId: 'QRK-4007',
        subjectName: 'Jin Bubaigawara',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Double',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to create duplicates of anyone through physical measurements. Clones are identical but fragile. Overuse caused mental instability. Known as Twice. League of Villains member.`,
        villainTag: 'VILLAIN',
        age: 31,
        birthDate: 'May 10th 1994',
        bloodType: 'Type B',
        height: '5\' 11"',
        status: 'At Large - Wanted',
        registrationDate: 'June 1994',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. League of Villains member. Deceased.`
    },

    4008: {
        registryId: 'QRK-4008',
        subjectName: 'Kenji Hikiishi',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Magnetism',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to magnetize anything they touch, causing affected objects/people to be attracted to each other. Known as Magne. League of Villains member.`,
        villainTag: 'VILLAIN',
        age: 31,
        birthDate: 'November 22nd 1994',
        bloodType: 'Type AB',
        height: '6\' 5"',
        status: 'At Large - Wanted',
        registrationDate: 'December 1994',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. League of Villains member. Deceased.`
    },

    4009: {
        registryId: 'QRK-4009',
        subjectName: 'All For One',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'All For One',
        quirkType: 'Emitter/Stockpile',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Original',
        description: `Allows the user to steal, stockpile, and grant quirks to others. One of the first quirk users in history. Nemesis of One For All. True leader behind the League of Villains.`,
        villainTag: 'VILLAIN',
        age: '700+',
        birthDate: 'Unknown',
        bloodType: 'Unknown',
        height: '7\' 3"',
        status: 'At Large - Wanted',
        registrationDate: 'Unknown',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. EXTREMELY DANGEROUS. Currently imprisoned in Tartarus. Symbol of Evil.`
    },

    3120: {
        registryId: 'QRK-3120',
        subjectName: 'Hitoshi Shinso',
        clearanceLevel: 'Level 3',
        clearanceNumber: 3,
        quirkName: 'Brainwashing',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to take control of anyone who verbally responds to them. Controlled targets lose their free will and follow commands. Effect breaks if the target is physically shocked. UA General Studies student transferring to Hero Course.`,
        age: 16,
        birthDate: 'July 1st 2009',
        bloodType: 'Type AB',
        height: '5\' 11"',
        status: 'Active Hero/Student',
        registrationDate: 'August 2009',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 3 clearance. UA student. Training under Aizawa.`
    },

    4010: {
        registryId: 'QRK-4010',
        subjectName: 'Toya Todoroki',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'Cremation',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Combination',
        description: `Allows the user to generate extremely powerful blue flames that burn hotter than Hellflame. The quirk is incompatible with the user's body, causing severe self-damage. Real identity of Dabi. Eldest son of Endeavor, presumed dead but survived and joined the League of Villains.`,
        age: 24,
        birthDate: 'January 18th 2001',
        bloodType: 'Type O',
        height: '5\' 9"',
        status: 'deceased',
        registrationDate: 'February 2001',
        registryOfficer: 'Enji Todoroki',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. EXTREMELY DANGEROUS. True identity of Dabi. Son of #1 Hero Endeavor.`
    },

    3026: {
        registryId: 'QRK-3026',
        subjectName: 'Oboro Shirakumo',
        clearanceLevel: 'Level 4',
        clearanceNumber: 4,
        quirkName: 'Cloud',
        quirkType: 'Emitter',
        quirkClassification: 'Rare',
        hereditaryStatus: 'Hereditary',
        description: `Allows the user to generate and manipulate clouds for transportation, offense, and defense. Can create various cloud densities and shapes. Former UA student and friend of Aizawa and Present Mic. Deceased during hero work, body later used to create Kurogiri through artificial modification by All For One.`,
        age: 17,
        birthDate: 'December 4th 1977',
        bloodType: 'Type B',
        height: '5\' 11"',
        status: 'Deceased',
        registrationDate: 'January 1978',
        registryOfficer: 'UA Administration',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 4 clearance. Deceased. Body used to create Kurogiri. Former UA student.`
    },

    3027: {
        registryId: 'QRK-3027',
        subjectName: 'Nezu',
        clearanceLevel: 'Level 5',
        clearanceNumber: 5,
        quirkName: 'High Spec',
        quirkType: 'Emitter',
        quirkClassification: 'Unique',
        hereditaryStatus: 'Mutation',
        description: `Grants the user extremely high intelligence far surpassing that of humans. One of the rare cases of an animal manifesting a quirk. UA Principal and one of the most intelligent beings alive. Former test subject of illegal quirk experiments.`,
        age: 'Unknown',
        birthDate: 'January 1st',
        bloodType: 'Unknown',
        height: '2\' 3"',
        status: 'Active - UA Principal',
        registrationDate: 'Unknown',
        registryOfficer: 'HPSC Admin',
        lastUpdated: 'December 2025',
        associatedPrograms: [],
        imagePath: 'img/Placeholder.jpg',
        clearanceNotice: `This record is classified under Level 5 clearance. UA Principal. Animal with quirk manifestation. Extremely high intelligence.`
    }

};


