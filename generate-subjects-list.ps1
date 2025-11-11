# PowerShell script to scan subjects folder and generate subjects.json
$currentDir = Get-Location
$subjectsDir = Join-Path $currentDir "subjects"
$outputFile = Join-Path $currentDir "subjects.json"

# Get all HTML files matching the pattern
$files = Get-ChildItem -Path $subjectsDir -Filter "subject-*.html" | Where-Object { $_.Name -match '^subject-(\d+)-(.+)\.html$' }

$subjects = @()

foreach ($file in $files) {
    if ($file.Name -match '^subject-(\d+)-(.+)\.html$') {
        $id = [int]$matches[1]
        $name = $matches[2] -replace '-', ' '  # Replace hyphens with spaces
        
        $subjects += [PSCustomObject]@{
            id = $id
            name = $name
        }
    }
}

# Sort by ID
$subjects = $subjects | Sort-Object -Property id

# Convert to JSON and save
# Force array output even with single item
if ($subjects.Count -eq 1) {
    $json = ConvertTo-Json @($subjects) -Depth 10
} else {
    $json = $subjects | ConvertTo-Json -Depth 10
}
Set-Content -Path $outputFile -Value $json

$message = "Generated subjects.json with " + $subjects.Count + " subjects"
Write-Host $message -ForegroundColor Green
