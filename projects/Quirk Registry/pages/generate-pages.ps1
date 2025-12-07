# PowerShell script to generate MHA character pages

# Define character data
$characters = @(
    # Top 10 Heroes
    @{id=3002; firstName="Enji"; fullName="Enji Todoroki"; quirk="Hellflame"; type="Emitter"; classification="Rare"; hereditary="Hereditary"; desc="Allows the user to generate and manipulate extremely powerful flames from their body. Currently the #1 Hero (Endeavor) following All Might's retirement."; age=46; birth="August 8th 1979"; blood="Type AB"; height='6'' 5"'; status="Active Hero"; regDate="September 1979"; officer="HPSC Admin"; clearance=4; protection="admin"; notice="This record is classified under Level 4 clearance. #1 Pro Hero."; alias="Endeavor"},
    @{id=3003; firstName="Keigo"; fullName="Keigo Takami"; quirk="Fierce Wings"; type="Mutant"; classification="Rare"; hereditary="Hereditary"; desc="Grants large red wings composed of individual feathers that can be controlled telekinetically. Each feather can be used independently for reconnaissance, rescue, or combat. #2 Pro Hero (Hawks)."; age=23; birth="December 28th 2002"; blood="Type B"; height='5'' 7"'; status="Active Hero"; regDate="January 2003"; officer="HPSC Admin"; clearance=4; protection="admin"; notice="This record is classified under Level 4 clearance. #2 Pro Hero. HPSC operative."; alias="Hawks"},
    @{id=3004; firstName="Tsunagu"; fullName="Tsunagu Hakamada"; quirk="Fibermaster"; type="Emitter"; classification="Rare"; hereditary="Hereditary"; desc="Allows the user to manipulate fabric fibers at will, unraveling and controlling threads for binding, offense, and defense. #4 Pro Hero (Best Jeanist)."; age=36; birth="October 5th 1989"; blood="Type A"; height='6'' 3"'; status="Active Hero"; regDate="November 1989"; officer="HPSC Admin"; clearance=3; protection="admin"; notice="This record is classified under Level 3 clearance. #4 Pro Hero."; alias="Best Jeanist"},
    @{id=3005; firstName="Shinji"; fullName="Shinji Nishiya"; quirk="Arbor"; type="Transformation"; classification="Rare"; hereditary="Hereditary"; desc="Allows the user to transform their body into wood, granting enhanced durability and the ability to extend wooden constructs. #6 Pro Hero (Kamui Woods)."; age=29; birth="May 20th 1996"; blood="Type O"; height='6'' 0"'; status="Active Hero"; regDate="June 1996"; officer="HPSC Admin"; clearance=3; protection="admin"; notice="This record is classified under Level 3 clearance. #6 Pro Hero."; alias="Kamui Woods"},
    @{id=3006; firstName="Yu"; fullName="Yu Takeyama"; quirk="Gigantification"; type="Transformation"; classification="Rare"; hereditary="Hereditary"; desc="Allows the user to grow to gigantic proportions, reaching heights of 67 feet. #9 Pro Hero (Mt. Lady)."; age=23; birth="August 8th 2002"; blood="Type O"; height='5'' 4" (Normal) / 67'' (Giant)'; status="Active Hero"; regDate="September 2002"; officer="HPSC Admin"; clearance=3; protection="admin"; notice="This record is classified under Level 3 clearance. #9 Pro Hero."; alias="Mt. Lady"},
    @{id=3007; firstName="Rumi"; fullName="Rumi Usagiyama"; quirk="Rabbit"; type="Mutant"; classification="Common"; hereditary="Hereditary"; desc="Grants rabbit-like features including powerful legs for jumping and kicking, enhanced hearing, and superior agility. #5 Pro Hero (Mirko)."; age=27; birth="March 1st 1998"; blood="Type O"; height='5'' 3"'; status="Active Hero"; regDate="April 1998"; officer="HPSC Admin"; clearance=4; protection="admin"; notice="This record is classified under Level 4 clearance. #5 Pro Hero."; alias="Mirko"},
    @{id=3008; firstName="Taishiro"; fullName="Taishiro Toyomitsu"; quirk="Fat Absorption"; type="Transformation"; classification="Rare"; hereditary="Hereditary"; desc="Allows the user to absorb fat and store it in their body. The stored fat can be converted into energy and strength, and also provides cushioning against attacks. #8 Pro Hero (Fat Gum)."; age=29; birth="September 8th 1996"; blood="Type O"; height='6'' 7" (Fat Form) / 6'' 2" (Slim Form)'; status="Active Hero"; regDate="October 1996"; officer="HPSC Admin"; clearance=3; protection="admin"; notice="This record is classified under Level 3 clearance. #8 Pro Hero."; alias="Fat Gum"},
    @{id=3009; firstName="Shinya"; fullName="Shinya Kamihara"; quirk="Foresight"; type="Emitter"; classification="Unique"; hereditary="Hereditary"; desc="Allows the user to see into the future of a specific target after making eye contact and analyzing their vitals. Can predict movements up to one hour in advance. Former #7 Pro Hero (Sir Nighteye)."; age=38; birth="January 2nd 1987"; blood="Type AB"; height='6'' 7"'; status="Deceased"; regDate="February 1987"; officer="HPSC Admin"; clearance=4; protection="admin"; notice="This record is classified under Level 4 clearance. Former #7 Pro Hero. Deceased."; alias="Sir Nighteye"},
    @{id=3010; firstName="Ryuko"; fullName="Ryuko Tatsuma"; quirk="Dragon"; type="Transformation"; classification="Rare"; hereditary="Hereditary"; desc="Allows the user to transform into a large Western dragon, granting flight, enhanced strength, and durable scales. #10 Pro Hero (Ryukyu)."; age=32; birth="April 9th 1993"; blood="Type B"; height='5'' 4" (Human) / 65'' (Dragon)'; status="Active Hero"; regDate="May 1993"; officer="HPSC Admin"; clearance=4; protection="admin"; notice="This record is classified under Level 4 clearance. #10 Pro Hero."; alias="Ryukyu"}
)

# HTML Template function
function Get-HTMLTemplate {
    param($char)
    
    $clearanceColor = if ($char.clearance -ge 4) { "#8e44ad" } else { "#8e44ad" }
    
    return @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QRK-$($char.id) - $($char.fullName) - National Quirk Registry</title>
    <link rel="stylesheet" href="../style.css">
    <style>body { visibility: hidden; }</style>
</head>
<body data-project="quirk-registry">
    <script src="../../../projects/auth.js"></script>
    <script>protectPage('$($char.protection)');</script>
    
    <header class="project-header">
        <div class="container">
            <div class="header-content">
                <img src="../../../img/HPSC.jpeg" alt="HPSC Logo" class="header-logo">
                <div class="header-text">
                    <h1>National Quirk Registry</h1>
                    <p class="project-subtitle">Comprehensive Quirk Database & Analysis</p>
                </div>
            </div>
            <nav class="project-nav">
                <a href="../home.html">Dashboard</a>
                <a href="../Registry.html">Search Registry</a>
                <a href="../Statistics.html">Statistics</a>
                <a href="../../../index.html" class="logout-btn">← Logout</a>
            </nav>
        </div>
    </header>

    <main class="dashboard">
        <div class="container">
            <div class="back-link" style="margin-bottom: 20px;">
                <a href="../Registry.html" style="color: #8e44ad; text-decoration: none; font-weight: 600;">← Back to Registry Search</a>
            </div>

            <section class="info-card" style="margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; gap: 30px;">
                    <div style="display: flex; gap: 30px; align-items: start; flex: 1;">
                        <div style="flex-shrink: 0;">
                            <img src="img/Placeholder.jpg" alt="$($char.fullName)" class="subject-image" style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px; border: 3px solid #8e44ad;">
                        </div>
                        <div>
                            <h1 style="color: #1a1a2e; margin: 0 0 10px 0;" class="subject-name">$($char.fullName)</h1>
                            <p style="color: #8e44ad; font-size: 1.2rem; margin: 0;"><strong>Registry ID:</strong> <span class="registry-id">QRK-$($char.id)</span></p>
"@
    if ($char.alias) {
        $html += "`n                            <p style=`"color: #666; font-size: 1rem; margin: 10px 0 0 0;`">$($char.alias)</p>"
    }
    $html = @"
$html
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span class="clearance-badge" style="background: rgba(142, 68, 173, 0.2); color: $clearanceColor; padding: 8px 16px; border-radius: 20px; border: 2px solid $clearanceColor; font-weight: 700;">Level $($char.clearance) Clearance</span>
                    </div>
                </div>
            </section>

            <section class="info-card" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Quirk Information</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Quirk Name</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0; font-weight: 600;" class="quirk-name">$($char.quirk)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Quirk Type</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="quirk-type">$($char.type)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Classification</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="quirk-classification">$($char.classification)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Hereditary Status</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="hereditary-status">$($char.hereditary)</p>
                    </div>
                </div>

                <div>
                    <p style="color: #666; margin: 0 0 10px 0;">Description</p>
                    <p style="color: #1a1a2e; line-height: 1.6;" class="quirk-description">
                        $($char.desc)
                    </p>
                </div>
            </section>

            <section class="info-card" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Subject Information</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Subject Name</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-name-info">$($char.fullName)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Age</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-age">$($char.age)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Birth Date</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-birthdate">$($char.birth)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Blood Type</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-bloodtype">$($char.blood)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Height</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-height">$($char.height)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Status</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-status">$($char.status)</p>
                    </div>
                </div>
            </section>

            <section class="info-card" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Registration Details</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Registration Date</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="registration-date">$($char.regDate)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Registry Officer</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="registry-officer">$($char.officer)</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Last Updated</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="last-updated">December 2025</p>
                    </div>
                </div>
            </section>

            <section class="info-card classified-info" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Clearance Notice</h2>
                <p style="color: #1a1a2e; line-height: 1.6;">
                    $($char.notice)
                </p>
            </section>
        </div>
    </main>

    <footer class="project-footer">
        <div class="container">
            <p>&copy; 2025 Hero Public Safety Commission - National Quirk Registry</p>
            <p class="security-text">CONFIDENTIAL - Level $($char.clearance) Clearance Required</p>
        </div>
    </footer>

    <script src="quirk-data.js"></script>
    <script src="quirk-loader.js"></script>
</body>
</html>
"@
}

# Generate pages
foreach ($char in $characters) {
    $filename = "QRK-$($char.id)-$($char.firstName).html"
    $html = Get-HTMLTemplate -char $char
    $html | Out-File -FilePath $filename -Encoding utf8
    Write-Host "Created $filename"
}

Write-Host "`nCompleted generating hero pages!"
