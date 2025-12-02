# Generate all remaining MHA character pages
# UA Faculty: 3020-3025, Class 1-A: 3100-3119, Villains: 4001-4009

function New-CharacterPage {
    param(
        [int]$id,
        [string]$firstName,
        [string]$fullName,
        [string]$quirkName,
        [string]$quirkType,
        [string]$classification,
        [string]$hereditary,
        [string]$description,
        [int]$age,
        [string]$birthDate,
        [string]$bloodType,
        [string]$height,
        [string]$status,
        [string]$regDate,
        [string]$officer,
        [int]$clearance,
        [string]$protection,
        [string]$notice,
        [string]$alias = "",
        [bool]$isVillain = $false,
        [string]$threat = ""
    )
    
    $borderColor = if ($isVillain) { "#c0392b" } else { "#8e44ad" }
    $clearanceColor = if ($isVillain) { "#c0392b" } else { "#8e44ad" }
    $statusColor = if ($status -match "Wanted|Large") { "#c0392b" } elseif ($status -eq "Deceased") { "#666" } else { "#1a1a2e" }
    
    $villainBadge = if ($isVillain) { '<span style="display: inline-block; margin-top: 10px; background: linear-gradient(135deg, #c0392b, #e74c3c); color: white; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">⚠️ VILLAIN</span>' } else { '' }
    
    $villainHeader = if ($isVillain) { ' border: 3px solid #c0392b; background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);' } else { '' }
    
    $threatSection = if ($isVillain -and $threat) {
        @"

            <section class="info-card" style="margin-bottom: 30px; border-left: 4px solid #c0392b;">
                <h2 style="color: #c0392b; margin-bottom: 15px;">⚠️ VILLAIN THREAT ASSESSMENT</h2>
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; border: 1px solid #f8d7da;">
                    <p style="color: #721c24; font-weight: 600; margin: 0 0 10px 0;">$threat</p>
                </div>
            </section>
"@
    } else { '' }
    
    $aliasText = if ($alias) { "<p style=`"color: #666; font-size: 1rem; margin: 10px 0 0 0;`">$alias</p>" } else { '' }
    
    $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QRK-$id - $fullName - National Quirk Registry</title>
    <link rel="stylesheet" href="../style.css">
    <style>body { visibility: hidden; }</style>
</head>
<body data-project="quirk-registry">
    <script src="../../../projects/auth.js"></script>
    <script>protectPage('$protection');</script>
    
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

            <section class="info-card" style="margin-bottom: 30px;$villainHeader">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; gap: 30px;">
                    <div style="display: flex; gap: 30px; align-items: start; flex: 1;">
                        <div style="flex-shrink: 0;">
                            <img src="img/Placeholder.jpg" alt="$fullName" class="subject-image" style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px; border: 3px solid $borderColor;">
                        </div>
                        <div>
                            <h1 style="color: #1a1a2e; margin: 0 0 10px 0;" class="subject-name">$fullName</h1>
                            <p style="color: $borderColor; font-size: 1.2rem; margin: 0;"><strong>Registry ID:</strong> <span class="registry-id">QRK-$id</span></p>
                            $aliasText
                            $villainBadge
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span class="clearance-badge" style="background: rgba($(if($isVillain){'192, 57, 43'}else{'142, 68, 173'}), 0.2); color: $clearanceColor; padding: 8px 16px; border-radius: 20px; border: 2px solid $clearanceColor; font-weight: 700;">Level $clearance Clearance</span>
                    </div>
                </div>
            </section>
$threatSection
            <section class="info-card" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Quirk Information</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Quirk Name</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0; font-weight: 600;" class="quirk-name">$quirkName</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Quirk Type</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="quirk-type">$quirkType</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Classification</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="quirk-classification">$classification</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Hereditary Status</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="hereditary-status">$hereditary</p>
                    </div>
                </div>

                <div>
                    <p style="color: #666; margin: 0 0 10px 0;">Description</p>
                    <p style="color: #1a1a2e; line-height: 1.6;" class="quirk-description">
                        $description
                    </p>
                </div>
            </section>

            <section class="info-card" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Subject Information</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Subject Name</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-name-info">$fullName</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Age</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-age">$age</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Birth Date</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-birthdate">$birthDate</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Blood Type</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-bloodtype">$bloodType</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Height</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="subject-height">$height</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Status</p>
                        <p style="color: $statusColor; font-size: 1.1rem; margin: 0;$(if($status -match 'Wanted|Large'){' font-weight: 600;'})" class="subject-status">$status</p>
                    </div>
                </div>
            </section>

            <section class="info-card" style="margin-bottom: 30px;">
                <h2 style="color: #8e44ad; margin-bottom: 15px;">Registration Details</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Registration Date</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="registration-date">$regDate</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Registry Officer</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="registry-officer">$officer</p>
                    </div>
                    <div>
                        <p style="color: #666; margin: 0 0 5px 0;">Last Updated</p>
                        <p style="color: #1a1a2e; font-size: 1.1rem; margin: 0;" class="last-updated">December 2025</p>
                    </div>
                </div>
            </section>

            <section class="info-card classified-info" style="margin-bottom: 30px;$(if($isVillain){' border: 2px solid #c0392b;'})">
                <h2 style="color: $(if($isVillain){'#c0392b'}else{'#8e44ad'}); margin-bottom: 15px;">$(if($isVillain){'⚠️ '})Clearance Notice</h2>
                <p style="color: $(if($isVillain){'#721c24'}else{'#1a1a2e'}); line-height: 1.6;$(if($isVillain){' font-weight: 600;'})">
                    $notice
                </p>
            </section>
        </div>
    </main>

    <footer class="project-footer">
        <div class="container">
            <p>&copy; 2025 Hero Public Safety Commission - National Quirk Registry</p>
            <p class="security-text">CONFIDENTIAL - Level $clearance Clearance Required</p>
        </div>
    </footer>

    <script src="quirk-data.js"></script>
    <script src="quirk-loader.js"></script>
</body>
</html>
"@
    
    $fileName = "QRK-$id-$firstName.html"
    $html | Out-File -FilePath $fileName -Encoding utf8
    Write-Host "Created $fileName"
}

# UA FACULTY (3020-3025)
New-CharacterPage -id 3020 -firstName "Shota" -fullName "Shota Aizawa" -quirkName "Erasure" -quirkType "Emitter" -classification "Unique" -hereditary "Hereditary" -description "Allows the user to nullify another person's quirk by looking at them. Effect ends when the user blinks or loses line of sight. Pro Hero (Eraserhead) and UA Class 1-A homeroom teacher." -age 31 -birthDate "November 8th 1994" -bloodType "Type B" -height '6'' 0"' -status "Active Hero/Teacher" -regDate "December 1994" -officer "HPSC Admin" -clearance 4 -protection "admin" -notice "This record is classified under Level 4 clearance. Pro Hero and UA teacher." -alias "Pro Hero - Eraserhead / UA Teacher"

New-CharacterPage -id 3021 -firstName "Hizashi" -fullName "Hizashi Yamada" -quirkName "Voice" -quirkType "Emitter" -classification "Rare" -hereditary "Hereditary" -description "Allows the user to amplify their voice to destructive levels. Volume and power can be controlled and directed. Pro Hero (Present Mic) and UA teacher." -age 31 -birthDate "July 7th 1994" -bloodType "Type B" -height '6'' 0"' -status "Active Hero/Teacher" -regDate "August 1994" -officer "HPSC Admin" -clearance 3 -protection "admin" -notice "This record is classified under Level 3 clearance. Pro Hero and UA teacher." -alias "Pro Hero - Present Mic / UA Teacher"

New-CharacterPage -id 3022 -firstName "Nemuri" -fullName "Nemuri Kayama" -quirkName "Somnambulist" -quirkType "Emitter" -classification "Rare" -hereditary "Hereditary" -description "Allows the user to emit a sleep-inducing aroma from their body. More effective on males. Pro Hero (Midnight) and UA teacher." -age 31 -birthDate "March 9th 1994" -bloodType "Type A" -height '5'' 9"' -status "Deceased" -regDate "April 1994" -officer "HPSC Admin" -clearance 3 -protection "admin" -notice "This record is classified under Level 3 clearance. Pro Hero and UA teacher. Deceased." -alias "Pro Hero - Midnight / UA Teacher"

New-CharacterPage -id 3023 -firstName "Sekijiro" -fullName "Sekijiro Kan" -quirkName "Blood Control" -quirkType "Emitter" -classification "Rare" -hereditary "Hereditary" -description "Allows the user to manipulate their own blood after it leaves their body, hardening it into weapons or barriers. Pro Hero (Vlad King) and UA Class 1-B homeroom teacher." -age 32 -birthDate "February 10th 1993" -bloodType "Type O" -height '6'' 3"' -status "Active Hero/Teacher" -regDate "March 1993" -officer "HPSC Admin" -clearance 3 -protection "admin" -notice "This record is classified under Level 3 clearance. Pro Hero and UA teacher." -alias "Pro Hero - Vlad King / UA Teacher"

New-CharacterPage -id 3024 -firstName "Sorahiko" -fullName "Sorahiko Torino" -quirkName "Jet" -quirkType "Emitter" -classification "Rare" -hereditary "Hereditary" -description "Allows the user to shoot air from holes in the soles of their feet, granting high-speed mobility and flight. Retired Pro Hero (Gran Torino) and former mentor to All Might." -age 72 -birthDate "January 1st 1953" -bloodType "Type B" -height '4'' 2"' -status "Retired" -regDate "February 1953" -officer "HPSC Admin" -clearance 5 -protection "director" -notice "This record is classified under Level 5 clearance. Retired Pro Hero. All Might's mentor." -alias "Retired Pro Hero - Gran Torino"

New-CharacterPage -id 3025 -firstName "Chiyo" -fullName "Chiyo Shuuzenji" -quirkName "Heal" -quirkType "Emitter" -classification "Rare" -hereditary "Hereditary" -description "Allows the user to accelerate and amplify the target's healing process with a kiss, using the target's own stamina as fuel. UA nurse (Recovery Girl)." -age 82 -birthDate "March 3rd 1943" -bloodType "Type O" -height '3'' 9"' -status "Active" -regDate "April 1943" -officer "HPSC Admin" -clearance 3 -protection "admin" -notice "This record is classified under Level 3 clearance. UA medical staff." -alias "UA Nurse - Recovery Girl"

Write-Host "`n=== UA FACULTY COMPLETE (6/34) ==="
Write-Host "Continuing with Class 1-A students..."
