# Auto-Detection of Subject Files

## How It Works (GitHub Pages)

The system automatically detects subject files in the `subjects/` folder using **GitHub Actions**. No manual script running required!

### Subject File Naming Convention

Subject files must follow this naming pattern:
```
subject-[ID]-[Name].html
```

Examples:
- `subject-1751-Moon.html`
- `subject-2099-Mia.html`
- `subject-1092-Maxus-Blackwood.html` (use hyphens for multi-word names)

### How to Add New Subjects (GitHub Pages)

1. **Create your subject file** in the `subjects/` folder with the correct naming format
2. **Commit and push** to GitHub:
   ```bash
   git add subjects/subject-XXXX-Name.html
   git commit -m "Add new subject"
   git push
   ```
3. **That's it!** GitHub Actions will automatically:
   - Detect the new file
   - Update `subjects.json`
   - Commit the changes back to your repo
4. Refresh your page - the new subject is now clickable!

### What Happens Behind the Scenes

When you push a new subject file:
1. GitHub Actions workflow (`.github/workflows/update-subjects.yml`) triggers automatically
2. It scans all files matching `subjects/subject-*.html`
3. Extracts the ID and name from each filename
4. Generates/updates `subjects.json`
5. Commits the updated JSON back to your repository
6. Your live site automatically has the updated list!

### Local Development

If you're testing locally and want to generate the list without pushing:

**Windows PowerShell:**
```powershell
powershell -ExecutionPolicy Bypass -File .\generate-subjects-list.ps1
```

**Node.js (if installed):**
```bash
node generate-subjects-list.js
```

### Files Involved

- `subjects/` - Folder containing all subject HTML files
- `subjects.json` - Auto-generated JSON file (updated by GitHub Actions)
- `.github/workflows/update-subjects.yml` - GitHub Actions workflow
- `generate-subjects-list.ps1` - PowerShell script for local development
- `generate-subjects-list.js` - Node.js script for local development
- `chimara-secret.html` - Main page that loads and displays the subjects
