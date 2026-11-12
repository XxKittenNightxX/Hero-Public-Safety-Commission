    const allowedProjects = (() => {
      try {
        const projects = JSON.parse(sessionStorage.getItem("hpsc-project-access") || "[]");
        return Array.isArray(projects) ? projects : [];
      } catch {
        return [];
      }
    })();
    const classThresholds = [
      { name: "SS", points: 12800 },
      { name: "S", points: 6400 },
      { name: "A", points: 3200 },
      { name: "B", points: 1600 },
      { name: "C", points: 800 },
      { name: "D", points: 400 },
      { name: "E", points: 200 },
      { name: "F", points: 100 }
    ];

    function chimaraClass(points) {
      return classThresholds.find(({ points: threshold }) => points >= threshold)?.name || "Unranked";
    }

    function createSeededRandom(seed) {
      let state = seed >>> 0;
      return () => {
        state += 0x6D2B79F5;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      };
    }

    function shuffle(values, random) {
      for (let index = values.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
      }
      return values;
    }

    function emptyNoteLevels() {
      return { "1": "", "2": "", "3": "", "4": "", "5": "" };
    }

    async function loadLinkedProfiles(path) {
      try {
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) return new Map();
        const profiles = await response.json();
        if (!Array.isArray(profiles)) return new Map();
        return new Map(profiles
          .filter((profile) => profile && typeof profile.registryName === "string" && profile.registryName.trim())
          .map((profile) => [profile.registryName.trim(), profile]));
      } catch (error) {
        console.warn(`Could not load linked profiles from ${path}:`, error);
        return new Map();
      }
    }

    function canOpenLinkedProfile(profile, userClearance) {
      return Number.isInteger(profile?.clearanceAccessLevel) &&
        profile.clearanceAccessLevel >= 1 &&
        profile.clearanceAccessLevel <= 5 &&
        userClearance >= profile.clearanceAccessLevel;
    }

    function canOpenSubject(record, userClearance) {
      const requiredClearance = Number(record?.ClearanceLevel);
      return Number.isInteger(requiredClearance) && requiredClearance >= 1 && requiredClearance <= 5 &&
        userClearance >= requiredClearance;
    }

    function generateMissingSubjects(records, nameConfig) {
      const tiers = [
        { name: "SS", percent: 1.2, min: 12800, max: 21000, clearance: [5] },
        { name: "S", percent: 2.3, min: 6400, max: 12799, clearance: [4, 5] },
        { name: "A", percent: 8.5, min: 3200, max: 6399, clearance: [4] },
        { name: "B", percent: 28, min: 1600, max: 3199, clearance: [3, 4] },
        { name: "C", percent: 20, min: 800, max: 1599, clearance: [3] },
        { name: "D", percent: 12, min: 400, max: 799, clearance: [2, 3] },
        { name: "E", percent: 10, min: 200, max: 399, clearance: [2] },
        { name: "F", percent: 18, min: 100, max: 199, clearance: [1, 2] }
      ];
      const random = createSeededRandom(0xC41A2026);
      const existingNumbers = new Set(records
        .map((record) => Number(record.subjectNumber))
        .filter((number) => Number.isInteger(number) && number >= 1 && number <= 2600));
      const missingNumbers = Array.from({ length: 2600 }, (_, index) => index + 1)
        .filter((number) => !existingNumbers.has(number));
      const allocations = tiers.map((tier) => {
        const exactCount = missingNumbers.length * tier.percent / 100;
        return { ...tier, count: Math.floor(exactCount), remainder: exactCount % 1 };
      });
      let remainingSlots = missingNumbers.length - allocations.reduce((total, tier) => total + tier.count, 0);
      for (const tier of [...allocations].sort((first, second) => second.remainder - first.remainder).slice(0, remainingSlots)) {
        tier.count += 1;
      }

      const classSlots = shuffle(allocations.flatMap((tier) => Array(tier.count).fill(tier)), random);
      const firstNames = nameConfig.firstNames;
      const lastNames = nameConfig.lastNames;
      const nameCombinations = firstNames.length * lastNames.length;
      let nameStride = 7919;
      while (greatestCommonDivisor(nameStride, nameCombinations) !== 1) nameStride += 1;
      const generated = missingNumbers.map((subjectNumber, index) => {
        const tier = classSlots[index];
        const scoreRoll = random();
        const pointCurve = tier.name === "SS" ? scoreRoll ** 4 : scoreRoll;
        const points = tier.min + Math.floor(pointCurve * (tier.max - tier.min + 1));
        const clearance = tier.clearance[Math.floor(random() * tier.clearance.length)];
        const yearsInProgram = 1 + 2 * Math.floor((2600 - subjectNumber) / 100);
        const nameIndex = ((subjectNumber - 1) * nameStride) % nameCombinations;
        return {
          subjectNumber: String(subjectNumber),
          LegalNameOverride: `${lastNames[Math.floor(nameIndex / firstNames.length)]}, ${firstNames[nameIndex % firstNames.length]}`,
          ChimaraPts: points,
          Role: "Chimara Subject",
          status: tier.name === "F" ? "Expelled" : yearsInProgram >= 13 ? "Transferred" : "In-Training",
          ClearanceLevel: String(clearance),
          Notes: emptyNoteLevels()
        };
      });

      const classPriority = { SS: 0, S: 1, A: 2, B: 3 };
      const graduationCandidates = generated.filter((record) =>
        Number(record.subjectNumber) <= 2000 && Object.hasOwn(classPriority, chimaraClass(record.ChimaraPts))
      ).sort((first, second) =>
        classPriority[chimaraClass(first.ChimaraPts)] - classPriority[chimaraClass(second.ChimaraPts)] ||
        second.ChimaraPts - first.ChimaraPts ||
        Number(second.subjectNumber) - Number(first.subjectNumber)
      );
      const targetGraduates = Math.round((records.length + generated.length) * 0.3);
      const existingGraduates = records.filter((record) => record.status === "Graduated").length;
      const graduates = Math.max(0, targetGraduates - existingGraduates);
      const selectedGraduates = graduationCandidates.slice(0, graduates);
      for (const record of selectedGraduates) record.status = "Graduated";
      const graduatedBSubjects = selectedGraduates.filter((record) => chimaraClass(record.ChimaraPts) === "B");
      const breakoutCandidates = shuffle([...records, ...generated].filter((record) =>
        Number(record.subjectNumber) >= 900 && Number(record.subjectNumber) <= 2400 &&
        record.Role === "Chimara Subject" &&
        record.status === "Transferred"
      ), random);
      for (const record of breakoutCandidates.slice(0, Math.round(breakoutCandidates.length * 0.15))) {
        record.status = "Missing";
      }
      const observationCandidates = shuffle([...records, ...generated].filter((record) => record.status === "Transferred"), random);
      for (const record of observationCandidates.slice(0, Math.round(observationCandidates.length * 0.16))) {
        record.status = "Under Observation";
        record.Role = "Monitored";
        record.ChimaraPts = 0;
      }

      return {
        records: generated,
        bGraduationMinPoints: graduatedBSubjects.length
          ? Math.min(...graduatedBSubjects.map((record) => record.ChimaraPts))
          : null
      };
    }

    function greatestCommonDivisor(first, second) {
      while (second) {
        [first, second] = [second, first % second];
      }
      return first;
    }

    function showMemberDetails(record, profile, userClearance, connectedProfiles = {}) {
      if (!canOpenSubject(record, userClearance)) return;
      const dialog = document.querySelector("#member-detail-dialog");
      const tabs = document.querySelector("#member-detail-tabs");
      const panels = document.querySelector("#member-detail-panels");
      const subjectNumber = String(record.subjectNumber).trim();
      const legalNameOverride = typeof record.LegalNameOverride === "string" ? record.LegalNameOverride.trim() : "";
      const profileLegalName = typeof profile?.legalName === "string" ? profile.legalName.trim() : "";
      const legalName = legalNameOverride || profileLegalName;
      const profileOverrides = record.ProfileOverrides && typeof record.ProfileOverrides === "object" && !Array.isArray(record.ProfileOverrides)
        ? record.ProfileOverrides
        : {};
      const profileValue = (field) => {
        const override = typeof profileOverrides[field] === "string" ? profileOverrides[field].trim() : "";
        if (override) return override;
        const registryValue = profile?.[field];
        return typeof registryValue === "string" || Number.isFinite(registryValue) ? String(registryValue).trim() : "";
      };
      const className = chimaraClass(record.ChimaraPts);
      const codeNames = Array.isArray(record.ChimaraCodeName) ? record.ChimaraCodeName : [];
      const visibleCodeNames = codeNames.filter((codeName) => typeof codeName === "string" && codeName.trim()).map((codeName) => codeName.trim());
      const quirkNameOverride = typeof record.QuirkNameOverride === "string" ? record.QuirkNameOverride.trim() : "";
      const quirkTypeOverride = typeof record.QuirkTypeOverride === "string" ? record.QuirkTypeOverride.trim() : "";
      const quirkDescriptionOverride = typeof record.QuirkDescriptionOverride === "string" ? record.QuirkDescriptionOverride.trim() : "";
      const quirkName = quirkNameOverride || (typeof profile?.quirkName === "string" ? profile.quirkName.trim() : "");
      const quirkType = quirkTypeOverride || (typeof profile?.quirkType === "string" ? profile.quirkType.trim() : "");
      const quirkDescription = quirkDescriptionOverride || (typeof profile?.quirkDescription === "string" ? profile.quirkDescription.trim() : "");
      const classColors = { SS: "#927400", S: "#245a9b", A: "#087c78", B: "#4a784d", C: "#9c4a10", D: "#754c9b", E: "#77752d", F: "#b2372d" };
      const classSurfaces = { SS: "#fffbe4", S: "#eff5fd", A: "#edf7f4", B: "#f1f7ed", C: "#fff2e6", D: "#f6f0fa", E: "#f7f7e9", F: "#fff0ec" };
      document.querySelector("#member-detail-title").textContent = legalName || `Subject ${subjectNumber}`;
      document.querySelector("#member-detail-subtitle").textContent = `Subject ${subjectNumber} | ${record.Role || "Chimara Subject"}`;
      document.querySelector("#member-detail-portrait").replaceChildren(createSubjectPortrait(subjectNumber, "member-dialog-portrait-wrap"));
      dialog.style.setProperty("--detail-accent", classColors[className] || "#087c78");
      dialog.style.setProperty("--class-surface", classSurfaces[className] || "#f1f5f3");
      const badges = document.createElement("div");
      badges.className = "member-detail-badges";
      badges.replaceChildren(...[
        ["Class", className],
        ["Chimara points", `${Number(record.ChimaraPts).toLocaleString()} pts`],
        ["Clearance", record.ClearanceLevel || "Not assigned"],
        ["Status", record.status || "Unavailable"]
      ].map(([label, value]) => {
        const badge = document.createElement("span");
        const badgeType = {
          Class: "class",
          "Chimara points": "points",
          Clearance: "clearance",
          Status: "status"
        }[label];
        badge.className = `member-detail-badge member-detail-badge--${badgeType}`;
        if (label === "Status") badge.dataset.status = String(value).trim().toLowerCase();
        const badgeLabel = document.createElement("small");
        badgeLabel.textContent = label;
        const badgeValue = document.createElement("strong");
        badgeValue.textContent = value;
        badge.append(badgeLabel, badgeValue);
        return badge;
      }));
      tabs.replaceChildren();
      panels.replaceChildren();
      const tabButtons = [];
      const tabPanels = [];

      function selectDetailTab(selectedIndex, moveFocus = false) {
        if (tabButtons[selectedIndex].getAttribute("aria-selected") !== "true") panels.scrollTop = 0;
        tabButtons.forEach((tab, index) => {
          const selected = index === selectedIndex;
          tab.setAttribute("aria-selected", String(selected));
          tab.tabIndex = selected ? 0 : -1;
          tabPanels[index].hidden = !selected;
        });
        if (moveFocus) {
          tabButtons[selectedIndex].focus();
          tabButtons[selectedIndex].scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }

      function registerDetailTab(button, panel, tabIndex) {
        button.addEventListener("click", () => selectDetailTab(tabIndex));
        button.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const nextIndex = event.key === "Home" ? 0
            : event.key === "End" ? tabButtons.length - 1
              : (tabIndex + (event.key === "ArrowRight" ? 1 : tabButtons.length - 1)) % tabButtons.length;
          selectDetailTab(nextIndex, true);
        });
      }

      function addDetailTab(label, fields, wideLabels = []) {
        const availableFields = fields.filter(([, value]) => value !== null && value !== undefined && String(value).trim());
        if (!availableFields.length) return;
        const tabIndex = tabButtons.length;
        const tabId = `member-detail-tab-${subjectNumber}-${tabIndex}`;
        const panelId = `member-detail-panel-${subjectNumber}-${tabIndex}`;
        const button = document.createElement("button");
        button.className = "member-detail-tab";
        button.type = "button";
        button.id = tabId;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", panelId);
        button.setAttribute("aria-selected", String(tabIndex === 0));
        button.tabIndex = tabIndex === 0 ? 0 : -1;
        button.textContent = label;

        const panel = document.createElement("section");
        panel.className = "member-detail-panel";
        panel.id = panelId;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabId);
        panel.tabIndex = 0;
        panel.hidden = tabIndex !== 0;
        const fieldList = document.createElement("dl");
        fieldList.className = "member-detail-fields";
        for (const [fieldLabel, fieldValue] of availableFields) {
          const field = document.createElement("div");
          field.className = wideLabels.includes(fieldLabel) ? "member-detail-field member-detail-field--wide" : "member-detail-field";
          const term = document.createElement("dt");
          term.textContent = fieldLabel;
          const description = document.createElement("dd");
          description.textContent = String(fieldValue).trim();
          field.append(term, description);
          fieldList.append(field);
        }
        panel.append(fieldList);
        tabs.append(button);
        panels.append(panel);
        tabButtons.push(button);
        tabPanels.push(panel);
        registerDetailTab(button, panel, tabIndex);
        return panel;
      }

      function addConnectedPagesTab(links) {
        if (!links.length) return;
        const tabIndex = tabButtons.length;
        const tabId = `member-detail-tab-${subjectNumber}-${tabIndex}`;
        const panelId = `member-detail-panel-${subjectNumber}-${tabIndex}`;
        const button = document.createElement("button");
        button.className = "member-detail-tab";
        button.type = "button";
        button.id = tabId;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", panelId);
        button.setAttribute("aria-selected", "false");
        button.tabIndex = -1;
        button.textContent = "Connected pages";

        const panel = document.createElement("section");
        panel.className = "member-detail-panel";
        panel.id = panelId;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabId);
        panel.tabIndex = 0;
        panel.hidden = true;
        const linkList = document.createElement("div");
        linkList.className = "member-connected-links";
        for (const { title, description, href, accessLevel, accessible, reason } of links) {
          const link = document.createElement(accessible ? "a" : "div");
          link.className = "member-connected-link";
          if (accessible) {
            link.href = href;
            link.setAttribute("aria-label", `Open ${title}`);
          } else {
            link.setAttribute("role", "link");
            link.setAttribute("aria-disabled", "true");
            link.setAttribute("aria-label", `${title}: ${reason}`);
            link.tabIndex = 0;
          }
          const copy = document.createElement("span");
          copy.className = "member-connected-link-copy";
          const linkTitle = document.createElement("strong");
          linkTitle.textContent = title;
          const linkDescription = document.createElement("small");
          linkDescription.textContent = accessible ? `${description} | Clearance ${accessLevel}` : reason;
          copy.append(linkTitle, linkDescription);
          link.append(copy);
          if (accessible) {
            const arrow = document.createElement("span");
            arrow.className = "member-connected-link-arrow";
            arrow.setAttribute("aria-hidden", "true");
            arrow.textContent = "→";
            link.append(arrow);
          }
          linkList.append(link);
        }
        panel.append(linkList);
        tabs.append(button);
        panels.append(panel);
        tabButtons.push(button);
        tabPanels.push(panel);
        registerDetailTab(button, panel, tabIndex);
      }

      const registryId = typeof record.registryName === "string" && record.registryName.trim()
        ? userClearance === 5 ? record.registryName.trim() : "REDACTED"
        : "Not assigned";
      const recordPanel = addDetailTab("Record", [
        ["Registry ID", registryId],
        ["Role", record.Role],
        ["Code names", visibleCodeNames.length ? visibleCodeNames.join("\n") : "None listed"]
      ], ["Code names"]);
      recordPanel.classList.add("member-detail-panel--record");
      recordPanel.prepend(badges);
      if (visibleCodeNames.length) {
        const codeNameList = document.createElement("ul");
        codeNameList.className = "member-code-names";
        for (const codeName of visibleCodeNames) {
          const item = document.createElement("li");
          item.className = "member-code-name";
          item.textContent = codeName;
          codeNameList.append(item);
        }
        recordPanel.querySelector(".member-detail-field--wide dd").replaceChildren(codeNameList);
      }
      const hasQuirkOverride = Boolean(quirkNameOverride || quirkTypeOverride || quirkDescriptionOverride);
      const hasProfileOverrides = Object.values(profileOverrides).some((value) => typeof value === "string" && value.trim());
      if (userClearance >= 2 && (profile || hasQuirkOverride || hasProfileOverrides)) {
        addDetailTab("Profile", [
          ["Birthdate", profileValue("Birthdate")],
          ["Age", profileValue("Age")],
          ["Blood type", profileValue("BloodType")],
          ["Sex", profileValue("Sex")],
          ["Pronouns", profileValue("Pronouns")],
          ["Height", profileValue("Height")]
        ]);
        addDetailTab("Quirk", [
          ["Quirk", quirkName],
          ["Type", quirkType],
          ["Description", quirkDescription]
        ], ["Description"]);
      }
      if (userClearance >= 2) {
        const generalNotes = record.Notes && typeof record.Notes === "object" && !Array.isArray(record.Notes)
          ? record.Notes
          : emptyNoteLevels();
        const noteFields = [];
        for (let level = 1; level <= userClearance; level += 1) {
          const note = typeof generalNotes[String(level)] === "string" ? generalNotes[String(level)].trim() : "";
          if (note) noteFields.push([`Clearance ${level}`, note]);
        }
        const notePanel = addDetailTab("Notes", noteFields, noteFields.map(([label]) => label));
        if (notePanel) {
          const labels = ["", "Public", "Standard Pro Heroes & Sidekicks", "Top Heroes / Specialized Agencies", "Elite Operational / Field Spies", "The President / Director Eyes-Only"];
          const sections = noteFields.map(([label, text]) => {
            const level = Number(label.slice("Clearance ".length));
            const section = document.createElement("section");
            section.className = "member-note-level";
            const heading = document.createElement("h4");
            heading.textContent = `${label} \u00b7 ${labels[level]}`;
            const content = document.createElement("p");
            appendFormattedNote(content, text);
            section.append(heading, content);
            return section;
          });
          notePanel.replaceChildren(...sections);
        }
      }
      const registryName = typeof record.registryName === "string" ? record.registryName.trim() : "";
      const linkedPages = [];
      function connectionReason(projectAllowed, level) {
        if (!projectAllowed) return "Project access required";
        return Number.isInteger(level) && level >= 1 && level <= 5
          ? `Clearance ${level} required` : "Clearance not assigned";
      }
      if (userClearance === 5 && Array.isArray(record.ConnectedProjects) && record.ConnectedProjects.includes("Project Genesis")) {
        linkedPages.push({
          title: "Project Genesis",
          description: "Connected project file",
          href: registryName
            ? `../Project%20Genesis/Index.html?profile=${encodeURIComponent(registryName)}`
            : `../Project%20Genesis/Index.html?subject=${encodeURIComponent(subjectNumber)}`,
          accessLevel: 5,
          accessible: true
        });
      }
      if (profile && registryName) {
        const projectAllowed = allowedProjects.includes("Quirk Registry");
        linkedPages.push({
          title: "Quirk Registry",
          description: legalName || `Subject ${subjectNumber}`,
          href: `../Quirk%20Registry/Index.html?profile=${encodeURIComponent(registryName)}`,
          accessLevel: 2,
          accessible: projectAllowed && userClearance >= 2,
          reason: connectionReason(projectAllowed, 2)
        });
      }
      const hero = connectedProfiles.hero;
      if (registryName && hero) {
        const projectAllowed = allowedProjects.includes("Hero Database");
        linkedPages.push({
          title: "Hero Database",
          description: "Matching hero record",
          href: `../Hero%20Database/Index.html?profile=${encodeURIComponent(registryName)}`,
          accessLevel: hero.clearanceAccessLevel,
          accessible: projectAllowed && canOpenLinkedProfile(hero, userClearance),
          reason: connectionReason(projectAllowed, hero.clearanceAccessLevel)
        });
      }
      const villain = connectedProfiles.villain;
      if (registryName && villain) {
        const projectAllowed = allowedProjects.includes("Villain Database");
        linkedPages.push({
          title: "Villain Database",
          description: villain.villainName || legalName || `Subject ${subjectNumber}`,
          href: `../Villain%20Database/Index.html?profile=${encodeURIComponent(registryName)}`,
          accessLevel: villain.clearanceAccessLevel,
          accessible: projectAllowed && canOpenLinkedProfile(villain, userClearance),
          reason: connectionReason(projectAllowed, villain.clearanceAccessLevel)
        });
      }
      addConnectedPagesTab(linkedPages);
      dialog.showModal();
    }

    function renderMember(record, profile, userClearance, connectedProfiles = {}) {
      const card = document.createElement("article");
      const hasFileAccess = canOpenSubject(record, userClearance);
      card.className = hasFileAccess ? "member-card" : "member-card member-card--restricted";
      const subjectNumber = String(record.subjectNumber).trim();
      card.tabIndex = hasFileAccess ? 0 : -1;
      card.setAttribute("role", hasFileAccess ? "button" : "article");
      card.setAttribute("aria-disabled", String(!hasFileAccess));
      if (hasFileAccess) card.setAttribute("aria-haspopup", "dialog");
      card.setAttribute("aria-label", hasFileAccess
        ? `Open details for subject ${subjectNumber}`
        : `Restricted subject ${subjectNumber}; clearance ${record.ClearanceLevel} required`);
      const subject = document.createElement("p");
      subject.className = "member-subject-number";
      subject.textContent = `Subject Number - ${subjectNumber}`;
      const legalNameOverride = typeof record.LegalNameOverride === "string" ? record.LegalNameOverride.trim() : "";
      const profileLegalName = typeof profile?.legalName === "string" ? profile.legalName.trim() : "";
      const legalName = legalNameOverride || profileLegalName;
      const className = chimaraClass(record.ChimaraPts);
      const codeNames = Array.isArray(record.ChimaraCodeName) ? record.ChimaraCodeName : [];
      card.dataset.searchText = [
        subjectNumber,
        record.registryName,
        legalName,
        ...codeNames,
        record.Role,
        record.status
      ].filter((value) => typeof value === "string" && value.trim()).join(" ").toLocaleLowerCase();
      card.dataset.subjectNumber = subjectNumber;
      card.dataset.className = className;
      card.dataset.chimaraPts = String(record.ChimaraPts);
      card.dataset.clearance = String(record.ClearanceLevel ?? "");
      card.dataset.legalName = hasFileAccess ? legalName : "";
      card.dataset.role = String(record.Role ?? "");
      card.dataset.status = String(record.status ?? "");
      const tooltipId = `legal-name-${subjectNumber.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
      if (hasFileAccess) card.setAttribute("aria-describedby", tooltipId);
      const tooltip = document.createElement("span");
      tooltip.className = "member-name-tooltip";
      tooltip.id = tooltipId;
      tooltip.setAttribute("role", "tooltip");
      const tooltipLabel = document.createElement("span");
      tooltipLabel.className = "member-name-tooltip-label";
      tooltipLabel.textContent = "Legal name";
      const tooltipName = document.createElement("strong");
      tooltipName.textContent = legalName || "Legal name unavailable";
      tooltip.append(tooltipLabel, tooltipName);
      if (hasFileAccess) subject.append(tooltip);
      const portraitWrap = createSubjectPortrait(subjectNumber, "member-portrait-wrap");

      const info = document.createElement("div");
      info.className = "member-info";
      const metadata = document.createElement("div");
      metadata.className = "member-meta";
      for (const [labelText, value] of [
        ["Class", className],
        ["Clearance level", record.ClearanceLevel],
        ["Role", record.Role]
      ]) {
        const item = document.createElement("span");
        item.className = "member-meta-item";
        const itemLabel = document.createElement("strong");
        itemLabel.textContent = labelText;
        if (labelText === "Class") {
          const classValue = document.createElement("span");
          classValue.className = "member-meta-class";
          classValue.textContent = value;
          const points = document.createElement("small");
          points.className = "member-meta-points";
          points.textContent = `${Number(record.ChimaraPts).toLocaleString()} pts`;
          item.append(itemLabel, classValue, points);
        } else {
          item.append(itemLabel, document.createTextNode(value || "Not provided"));
        }
        metadata.append(item);
      }
      info.append(metadata);

      if (hasFileAccess) {
        card.addEventListener("click", () => showMemberDetails(record, profile, userClearance, connectedProfiles));
        card.addEventListener("keydown", (event) => {
          if (event.target !== card || !["Enter", " "].includes(event.key)) return;
          event.preventDefault();
          showMemberDetails(record, profile, userClearance, connectedProfiles);
        });
      }
      card.append(subject, portraitWrap, info);
      return card;
    }

    function renderDeveloperStats(subjects) {
      const records = subjects.map(({ record }) => record);
      const totalSubjects = records.length;
      const totalPoints = records.reduce((sum, record) => sum + Number(record.ChimaraPts), 0);
      const sortedPoints = records.map((record) => Number(record.ChimaraPts)).sort((first, second) => first - second);
      const midpoint = Math.floor(sortedPoints.length / 2);
      const medianPoints = !sortedPoints.length ? 0 : sortedPoints.length % 2
        ? sortedPoints[midpoint]
        : (sortedPoints[midpoint - 1] + sortedPoints[midpoint]) / 2;
      const graduatedCount = records.filter((record) => record.status === "Graduated").length;
      const generatedCount = records.filter((record) => !Object.hasOwn(record, "registryName")).length;
      const registeredCount = totalSubjects - generatedCount;
      const numberFormat = new Intl.NumberFormat();
      const kpis = [
        ["Total subjects", numberFormat.format(totalSubjects), `${numberFormat.format(registeredCount)} registered / ${numberFormat.format(generatedCount)} generated`],
        ["Total ChimaraPts", numberFormat.format(totalPoints), "Combined points across the current roster"],
        ["Average points", numberFormat.format(totalSubjects ? Math.round(totalPoints / totalSubjects) : 0), "Per subject"],
        ["Median points", numberFormat.format(medianPoints), "Middle score in the roster"],
        ["Graduated", `${(totalSubjects ? graduatedCount / totalSubjects * 100 : 0).toFixed(1)}%`, `${numberFormat.format(graduatedCount)} of ${numberFormat.format(totalSubjects)} subjects`]
      ];
      const kpiContainer = document.querySelector("#stats-kpis");
      kpiContainer.replaceChildren(...kpis.map(([label, value, detail]) => {
        const item = document.createElement("article");
        item.className = "stats-kpi";
        const itemLabel = document.createElement("span");
        itemLabel.className = "stats-kpi-label";
        itemLabel.textContent = label;
        const itemValue = document.createElement("strong");
        itemValue.textContent = value;
        const itemDetail = document.createElement("small");
        itemDetail.textContent = detail;
        item.append(itemLabel, itemValue, itemDetail);
        return item;
      }));

      const classColors = {
        SS: "#927400", S: "#245a9b", A: "#087c78", B: "#4a784d",
        C: "#9c4a10", D: "#754c9b", E: "#77752d", F: "#b2372d", Unranked: "#64777d"
      };
      const statusColors = {
        "In-Training": "#4a784d", Graduated: "#245a9b",
        Missing: "#9c4a10", Transferred: "#77752d", Expelled: "#b2372d",
        "Under Observation": "#754c9b"
      };
      function renderBars(containerId, entries, colorMap) {
        const container = document.querySelector(containerId);
        const maxCount = Math.max(1, ...entries.map((entry) => entry.count));
        container.replaceChildren(...entries.map((entry) => {
          const row = document.createElement("div");
          row.className = "stats-bar-row";
          const label = document.createElement("span");
          label.textContent = entry.label;
          const track = document.createElement("span");
          track.className = "stats-bar-track";
          track.setAttribute("role", "img");
          track.setAttribute("aria-label", `${entry.label}: ${numberFormat.format(entry.count)} subjects`);
          const bar = document.createElement("span");
          bar.className = "stats-bar";
          bar.style.width = `${entry.count / maxCount * 100}%`;
          bar.style.backgroundColor = colorMap[entry.label] || "#64777d";
          track.append(bar);
          const value = document.createElement("span");
          value.className = "stats-bar-value";
          value.textContent = `${numberFormat.format(entry.count)} (${(totalSubjects ? entry.count / totalSubjects * 100 : 0).toFixed(1)}%)`;
          row.append(label, track, value);
          return row;
        }));
      }

      const classEntries = [...classThresholds.map(({ name }) => name), "Unranked"].map((name) => ({
        label: name,
        count: records.filter((record) => chimaraClass(record.ChimaraPts) === name).length
      }));
      renderBars("#stats-class-bars", classEntries, classColors);

      const statusNames = ["In-Training", "Graduated", "Missing", "Transferred", "Expelled", "Under Observation"];
      renderBars("#stats-status-bars", statusNames.map((name) => ({
        label: name,
        count: records.filter((record) => record.status === name).length
      })), statusColors);

      const clearanceNames = ["5", "4", "3", "2", "1"];
      renderBars("#stats-clearance-bars", clearanceNames.map((name) => ({
        label: `Level ${name}`,
        count: records.filter((record) => String(record.ClearanceLevel) === name).length
      })), { "Level 5": "#927400", "Level 4": "#087c78", "Level 3": "#245a9b", "Level 2": "#754c9b", "Level 1": "#b2372d" });
      renderBars("#stats-source-bars", [
        { label: "Registered", count: registeredCount },
        { label: "Generated", count: generatedCount }
      ], { Registered: "#245a9b", Generated: "#087c78" });
      const roles = [...new Set(records.map((record) => String(record.Role || "Not provided")))].sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
      renderBars("#stats-role-bars", roles.map((name) => ({
        label: name,
        count: records.filter((record) => String(record.Role || "Not provided") === name).length
      })), { "Chimara Enforcer": "#927400", "Chimara Subject": "#087c78", Monitored: "#754c9b" });

      const pointsBody = document.querySelector("#stats-points-table");
      const classes = [...classThresholds.map(({ name }) => name), "Unranked"];
      const pointScaleMax = Math.max(1, ...sortedPoints);
      pointsBody.replaceChildren(...classes.map((name) => {
        const classPoints = records.filter((record) => chimaraClass(record.ChimaraPts) === name)
          .map((record) => Number(record.ChimaraPts));
        if (!classPoints.length) return null;
        const row = document.createElement("tr");
        row.dataset.className = name;
        const minPoints = Math.min(...classPoints);
        const maxPoints = Math.max(...classPoints);
        const averagePoints = Math.round(classPoints.reduce((sum, value) => sum + value, 0) / classPoints.length);
        const classCell = document.createElement("td");
        const classBadge = document.createElement("span");
        classBadge.className = "stats-class-badge";
        classBadge.textContent = name;
        classBadge.style.color = classColors[name] || "#64777d";
        const classCount = document.createElement("small");
        classCount.className = "stats-class-count";
        classCount.textContent = `${numberFormat.format(classPoints.length)} subjects`;
        classCell.append(classBadge, classCount);
        const rangeCell = document.createElement("td");
        rangeCell.className = "stats-points-range";
        const rangeLabel = document.createElement("div");
        rangeLabel.className = "stats-range-label";
        rangeLabel.textContent = `${numberFormat.format(minPoints)}-${numberFormat.format(maxPoints)}`;
        const rangeTrack = document.createElement("div");
        rangeTrack.className = "stats-range-track";
        rangeTrack.setAttribute("role", "img");
        rangeTrack.setAttribute("aria-label", `${name} point range: ${numberFormat.format(minPoints)} to ${numberFormat.format(maxPoints)}, average ${numberFormat.format(averagePoints)}`);
        const rangeFill = document.createElement("span");
        rangeFill.className = "stats-range-fill";
        rangeFill.style.left = `${minPoints / pointScaleMax * 100}%`;
        rangeFill.style.width = `${Math.max(1, (maxPoints - minPoints) / pointScaleMax * 100)}%`;
        rangeFill.style.backgroundColor = classColors[name] || "#64777d";
        const averageMarker = document.createElement("span");
        averageMarker.className = "stats-range-average";
        averageMarker.style.left = `${averagePoints / pointScaleMax * 100}%`;
        rangeTrack.append(rangeFill, averageMarker);
        rangeCell.append(rangeLabel, rangeTrack);
        const averageCell = document.createElement("td");
        averageCell.textContent = numberFormat.format(averagePoints);
        row.append(classCell, rangeCell, averageCell);
        return row;
      }).filter(Boolean));

      const cohorts = new Map();
      for (const record of records) {
        const subjectNumber = Number(record.subjectNumber);
        const start = Math.floor((subjectNumber - 1) / 100) * 100 + 1;
        const cohort = cohorts.get(start) || { start, count: 0, points: 0, graduated: 0, missing: 0, transferred: 0 };
        cohort.count += 1;
        cohort.points += Number(record.ChimaraPts);
        if (record.status === "Graduated") cohort.graduated += 1;
        if (record.status === "Missing") cohort.missing += 1;
        if (record.status === "Transferred") cohort.transferred += 1;
        cohorts.set(start, cohort);
      }
      const cohortsBody = document.querySelector("#stats-cohorts-table");
      cohortsBody.replaceChildren(...[...cohorts.values()].sort((first, second) => first.start - second.start).map((cohort) => {
        const row = document.createElement("tr");
        const cohortCell = document.createElement("td");
        const cohortLabel = document.createElement("span");
        cohortLabel.className = "stats-cohort-label";
        cohortLabel.textContent = `${cohort.start.toLocaleString()}-${(cohort.start + 99).toLocaleString()}`;
        cohortCell.append(cohortLabel);
        const countCell = document.createElement("td");
        countCell.textContent = numberFormat.format(cohort.count);
        const averageCell = document.createElement("td");
        averageCell.textContent = numberFormat.format(Math.round(cohort.points / cohort.count));
        const graduatedCell = document.createElement("td");
        graduatedCell.className = "stats-cohort-outcome stats-cohort-outcome--graduated";
        graduatedCell.textContent = numberFormat.format(cohort.graduated);
        const missingCell = document.createElement("td");
        missingCell.className = "stats-cohort-outcome stats-cohort-outcome--missing";
        missingCell.textContent = numberFormat.format(cohort.missing);
        const transferredCell = document.createElement("td");
        transferredCell.className = "stats-cohort-outcome stats-cohort-outcome--transferred";
        transferredCell.textContent = numberFormat.format(cohort.transferred);
        row.append(cohortCell, countCell, averageCell, graduatedCell, missingCell, transferredCell);
        return row;
      }));
    }

    async function loadRoster() {
      if (!allowedProjects.includes("Chimara Project")) {
        const params = new URLSearchParams(window.location.search);
        const profile = params.get("profile");
        const subject = params.get("subject");
        window.location.replace(`../Login.html?project=Chimara%20Project${profile ? `&profile=${encodeURIComponent(profile)}` : ""}${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`);
        return;
      }
      const roster = document.querySelector("#roster");
      const message = document.querySelector("#roster-message");
      const requestedDeveloperView = new URLSearchParams(window.location.search).get("view") === "dev";
      const storedClearance = Number(sessionStorage.getItem("hpsc-clearance") || "0");
      const hasDeveloperClearance = storedClearance === 5;
      if (requestedDeveloperView && !hasDeveloperClearance) {
        window.location.replace("../Login.html?project=Chimara%20Project");
        return;
      }
      const developerView = requestedDeveloperView && hasDeveloperClearance;
      const rosterIntro = document.querySelector("#roster-intro");
      const rosterView = document.querySelector("#roster-view");
      const devView = document.querySelector("#dev-view");
      const devMessage = document.querySelector("#dev-stats-message");
      const devViewLink = document.querySelector("#dev-view-link");
      const statsRangeForm = document.querySelector("#stats-range-form");
      const statsRangeFrom = document.querySelector("#stats-range-from");
      const statsRangeTo = document.querySelector("#stats-range-to");
      const statsRangeReset = document.querySelector("#stats-range-reset");
      const statsRangeSummary = document.querySelector("#stats-range-summary");
      document.querySelector("#subprojects-button").hidden = false;
      devViewLink.hidden = !hasDeveloperClearance;
      devViewLink.href = developerView ? "Index.html" : "?view=dev";
      devViewLink.textContent = developerView ? "Subject roster" : "Dev statistics";
      if (developerView) {
        devViewLink.setAttribute("aria-current", "page");
        rosterIntro.hidden = true;
        rosterView.hidden = true;
        devView.hidden = false;
      } else {
        devViewLink.removeAttribute("aria-current");
      }
      const searchInput = document.querySelector("#subject-search-input");
      const toggleRosterView = document.querySelector("#toggle-roster-view");
      const clearSearch = document.querySelector("#clear-subject-search");
      const sortSelect = document.querySelector("#subject-sort");
      const classFilter = document.querySelector("#class-filter");
      const clearanceFilter = document.querySelector("#clearance-filter");
      const roleFilter = document.querySelector("#role-filter");
      const statusFilter = document.querySelector("#status-filter");
      const resetFilters = document.querySelector("#reset-subject-filters");
      const subjectCount = document.querySelector("#subject-count");
      const sidebarMatchCount = document.querySelector("#roster-sidebar-matches");
      const sidebarTotalCount = document.querySelector("#roster-sidebar-total");
      const sidebarFilterCount = document.querySelector("#roster-sidebar-filters");
      const noResults = document.querySelector("#subject-no-results");
      const paginationControls = [...document.querySelectorAll(".roster-pagination")];
      const pageSize = 100;
      let allSubjects = [];
      let showGeneratedSubjects = true;
      let currentPage = 1;
      let bGraduationMinPoints = null;

      function populateFilter(select, values, placeholder, comparator) {
        const uniqueValues = [...new Set(values.filter((value) => value !== ""))].sort(comparator);
        for (const value of uniqueValues) {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.append(option);
        }
        select.options[0].textContent = placeholder;
      }

      function applyStatsRange() {
        const fromText = statsRangeFrom.value.trim();
        const toText = statsRangeTo.value.trim();
        const fromNumber = fromText ? Number(fromText) : -Infinity;
        const toNumber = toText ? Number(toText) : Infinity;
        if ((fromText && (!Number.isInteger(fromNumber) || fromNumber < 1 || fromNumber > 2600)) ||
            (toText && (!Number.isInteger(toNumber) || toNumber < 1 || toNumber > 2600)) ||
            fromNumber > toNumber) {
          statsRangeSummary.textContent = "Enter a valid whole-number range from 1 to 2,600.";
          return;
        }

        const selectedSubjects = allSubjects.filter((subject) => {
          const subjectNumber = Number(subject.subjectNumber);
          return subjectNumber >= fromNumber && subjectNumber <= toNumber;
        });
        const rangeLabel = `${fromText || "first"} to ${toText || "last"}`;
        statsRangeSummary.textContent = fromText || toText
          ? `Showing ${selectedSubjects.length.toLocaleString()} of ${allSubjects.length.toLocaleString()} subjects (${rangeLabel})`
          : `Showing all ${allSubjects.length.toLocaleString()} subjects`;
        renderDeveloperStats(selectedSubjects);
      }

      statsRangeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        applyStatsRange();
      });
      statsRangeReset.addEventListener("click", () => {
        statsRangeFrom.value = "";
        statsRangeTo.value = "";
        applyStatsRange();
      });

      function compareText(first, second) {
        return first.localeCompare(second, undefined, { sensitivity: "base", numeric: true });
      }

      function sortSubjects(subjects) {
        const comparators = {
          "subject-desc": (first, second) => compareText(second.subjectNumber, first.subjectNumber),
          "subject-asc": (first, second) => compareText(first.subjectNumber, second.subjectNumber),
          "class-desc": (first, second) => second.chimaraPts - first.chimaraPts || compareText(second.subjectNumber, first.subjectNumber),
          "class-asc": (first, second) => first.chimaraPts - second.chimaraPts || compareText(second.subjectNumber, first.subjectNumber),
          "clearance-desc": (first, second) => compareText(second.clearance, first.clearance),
          "clearance-asc": (first, second) => compareText(first.clearance, second.clearance),
          "name-asc": (first, second) => compareText(first.legalName, second.legalName),
          "role-asc": (first, second) => compareText(first.role, second.role),
          "status-asc": (first, second) => compareText(first.status, second.status)
        };
        const comparator = comparators[sortSelect.value] || comparators["subject-desc"];
        return subjects.sort(comparator);
      }

      function updateRoster(resetPage = true) {
        if (resetPage) currentPage = 1;
        const rosterSubjects = showGeneratedSubjects
          ? allSubjects
          : allSubjects.filter((subject) => !subject.isGenerated);
        const searchValue = searchInput.value.trim().toLocaleLowerCase();
        const rangeMatch = searchValue.match(/^(\d+)\s*<\s*(\d+)$/);
        const comparisonMatch = searchValue.match(/^(>=|<=|>|<)\s*(\d+)$/);
        const numericRange = rangeMatch
          ? { min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) }
          : null;
        const numericComparison = comparisonMatch
          ? { operator: comparisonMatch[1], value: Number(comparisonMatch[2]) }
          : null;
        const isNumericSearch = Boolean(numericRange || numericComparison);
        const searchTerms = isNumericSearch ? [] : searchValue.split(/\s+/).filter(Boolean);
        const matchingSubjects = rosterSubjects.filter((subject) => {
          const subjectNumber = Number(subject.subjectNumber);
          const matchesSearch = numericRange
            ? subjectNumber >= numericRange.min && subjectNumber <= numericRange.max
            : numericComparison
              ? numericComparison.operator === ">" ? subjectNumber > numericComparison.value
                : numericComparison.operator === "<" ? subjectNumber < numericComparison.value
                  : numericComparison.operator === ">=" ? subjectNumber >= numericComparison.value
                    : subjectNumber <= numericComparison.value
              : searchTerms.every((term) => subject.searchText.includes(term));
          const matches = matchesSearch &&
            (!classFilter.value || classFilter.value === subject.className) &&
            (!clearanceFilter.value || clearanceFilter.value === subject.clearance) &&
            (!roleFilter.value || roleFilter.value === subject.role) &&
            (!statusFilter.value || statusFilter.value === subject.status);
          return matches;
        });
        const activeFilterCount = [
          searchValue,
          classFilter.value,
          clearanceFilter.value,
          roleFilter.value,
          statusFilter.value
        ].filter(Boolean).length;
        sidebarMatchCount.textContent = matchingSubjects.length.toLocaleString();
        sidebarTotalCount.textContent = allSubjects.length.toLocaleString();
        sidebarFilterCount.textContent = activeFilterCount === 0 ? "None" : activeFilterCount.toLocaleString();
        sortSubjects(matchingSubjects);

        const pageCount = Math.max(1, Math.ceil(matchingSubjects.length / pageSize));
        currentPage = Math.min(currentPage, pageCount);
        const pageStart = (currentPage - 1) * pageSize;
        const pageSubjects = matchingSubjects.slice(pageStart, pageStart + pageSize);
        roster.replaceChildren(...pageSubjects.map(({ record, profile, heroProfile, villainProfile }) =>
          renderMember(record, profile, storedClearance, { hero: heroProfile, villain: villainProfile })
        ));
        for (const controls of paginationControls) {
          controls.querySelector('[data-page-action="previous"]').disabled = currentPage <= 1;
          controls.querySelector('[data-page-action="next"]').disabled = currentPage >= pageCount;
          controls.querySelector(".roster-page-summary").textContent = `Page ${currentPage} of ${pageCount} - ${pageSize} per page`;
        }

        const graduatedCount = rosterSubjects.filter((subject) => subject.status === "Graduated").length;
        const graduationRate = rosterSubjects.length
          ? (graduatedCount / rosterSubjects.length * 100).toFixed(1)
          : "0.0";
        noResults.hidden = matchingSubjects.length > 0;
        clearSearch.hidden = !searchValue;
      }

      searchInput.addEventListener("input", updateRoster);
      for (const select of [sortSelect, classFilter, clearanceFilter, roleFilter, statusFilter]) {
        select.addEventListener("change", updateRoster);
      }
      clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        updateRoster();
        searchInput.focus();
      });
      resetFilters.addEventListener("click", () => {
        searchInput.value = "";
        sortSelect.value = "subject-desc";
        classFilter.value = "";
        clearanceFilter.value = "";
        roleFilter.value = "";
        statusFilter.value = "";
        updateRoster();
        searchInput.focus();
      });
      toggleRosterView.addEventListener("click", () => {
        showGeneratedSubjects = !showGeneratedSubjects;
        toggleRosterView.setAttribute("aria-pressed", String(showGeneratedSubjects));
        const toggleLabel = showGeneratedSubjects ? "Hide generated subjects" : "Show generated subjects";
        toggleRosterView.setAttribute("aria-label", toggleLabel);
        toggleRosterView.title = toggleLabel;
        updateRoster();
      });
      for (const controls of paginationControls) {
        controls.querySelector('[data-page-action="previous"]').addEventListener("click", () => {
          currentPage -= 1;
          updateRoster(false);
          document.querySelector(".roster-tools").scrollIntoView({ behavior: "auto", block: "start" });
        });
        controls.querySelector('[data-page-action="next"]').addEventListener("click", () => {
          currentPage += 1;
          updateRoster(false);
          document.querySelector(".roster-tools").scrollIntoView({ behavior: "auto", block: "start" });
        });
      }

      try {
        const [rosterResponse, nameConfigResponse] = await Promise.all([
          fetch("data/json/chimaraproject-registery.json", { cache: "no-store" }),
          fetch("../Quirk%20Registry/data/json/generated-personnel-config.json", { cache: "no-store" })
        ]);
        if (!rosterResponse.ok || !nameConfigResponse.ok) {
          throw new Error(`Chimara registry request failed with status ${rosterResponse.status}; generated-name config request failed with status ${nameConfigResponse.status}.`);
        }

        const [records, nameConfig] = await Promise.all([
          rosterResponse.json(),
          nameConfigResponse.json()
        ]);
        if (!Array.isArray(records)) {
          throw new Error("Chimara Registry data must be a JSON array.");
        }
        if (!nameConfig ||
            !Array.isArray(nameConfig.firstNames) ||
            !Array.isArray(nameConfig.lastNames) ||
            !nameConfig.firstNames.length ||
            !nameConfig.lastNames.length ||
            nameConfig.firstNames.some((name) => typeof name !== "string" || !name.trim()) ||
            nameConfig.lastNames.some((name) => typeof name !== "string" || !name.trim()) ||
            nameConfig.firstNames.length * nameConfig.lastNames.length < 2600) {
          throw new Error("Generated-name config needs non-empty first- and last-name lists with at least 2,600 unique combinations.");
        }

        if (!records.every((record) =>
          record &&
          (typeof record.subjectNumber === "string" || Number.isFinite(record.subjectNumber)) &&
          String(record.subjectNumber).trim() &&
          Number.isFinite(record.ChimaraPts) && record.ChimaraPts >= 0 &&
          typeof record.Role === "string" &&
          (typeof record.ClearanceLevel === "string" || Number.isFinite(record.ClearanceLevel))
        )) {
          throw new Error("Each Chimara record needs valid roster fields.");
        }

        let profilesById = new Map();
        try {
          const profileResponse = await fetch("../Quirk%20Registry/data/json/quirk-registry.json", { cache: "no-store" });
          if (profileResponse.ok) {
            const profiles = await profileResponse.json();
            if (Array.isArray(profiles)) {
              profilesById = new Map(profiles
                .filter((profile) =>
                  profile &&
                  typeof profile.registryName === "string" && profile.registryName.trim() &&
                  typeof profile.legalName === "string" && profile.legalName.trim()
                )
                .map((profile) => [profile.registryName.trim(), profile]));
            }
          }
        } catch (error) {
          console.warn("Could not load Quirk Registry legal names:", error);
        }

        const [heroProfilesById, villainProfilesById] = await Promise.all([
          loadLinkedProfiles("../Hero%20Database/data/json/Hero-registry.json"),
          loadLinkedProfiles("../Villain%20Database/data/json/Villain-registry.json")
        ]);

        const rosterRecords = records.map((record) => ({
          ...record,
          Notes: record.Notes && typeof record.Notes === "object" && !Array.isArray(record.Notes)
            ? record.Notes
            : emptyNoteLevels()
        }));
        const generatedSubjects = generateMissingSubjects(rosterRecords, nameConfig);
        bGraduationMinPoints = generatedSubjects.bGraduationMinPoints;
        if (storedClearance === 5) {
          try {
            const response = await fetch("../Project%20Genesis/data/json/projectgenesis.json", { cache: "no-store" });
            if (!response.ok) throw new Error(`Genesis data request failed (HTTP ${response.status}).`);
            const genesis = await response.json();
            if (!Array.isArray(genesis.generatedSubjects) || !genesis.generatedSubjects.every((subject) =>
              subject && typeof subject.subjectNumber === "string" && /^\d+$/.test(subject.subjectNumber) &&
              typeof subject.legalName === "string" && subject.legalName.trim()
            )) throw new Error("Invalid generated Genesis subjects.");
            const generatedByNumber = new Map(generatedSubjects.records.map((record) => [record.subjectNumber, record]));
            for (const subject of genesis.generatedSubjects) {
              const record = generatedByNumber.get(subject.subjectNumber);
              if (!record) {
                console.warn(`Generated Genesis subject ${subject.subjectNumber} is no longer in the generated Chimara roster.`);
                continue;
              }
              record.LegalNameOverride = subject.legalName;
              record.ConnectedProjects = ["Project Genesis"];
            }
          } catch (error) {
            console.warn("Could not load generated Genesis subject links:", error);
          }
        }
        const generatedRecords = new Set(generatedSubjects.records);
        const allRecords = [...rosterRecords, ...generatedSubjects.records];
        allSubjects = allRecords.map((record) => {
          const registryName = typeof record.registryName === "string" ? record.registryName.trim() : "";
          const profile = profilesById.get(registryName);
          const heroProfile = heroProfilesById.get(registryName);
          const villainProfile = villainProfilesById.get(registryName);
          const legalNameOverride = typeof record.LegalNameOverride === "string" ? record.LegalNameOverride.trim() : "";
          const profileLegalName = typeof profile?.legalName === "string" ? profile.legalName.trim() : "";
          const legalName = legalNameOverride || profileLegalName;
          const codeNames = Array.isArray(record.ChimaraCodeName) ? record.ChimaraCodeName : [];
          const subjectNumber = String(record.subjectNumber).trim();
          return {
            record,
            isGenerated: generatedRecords.has(record),
            profile,
            heroProfile,
            villainProfile,
            subjectNumber,
            className: chimaraClass(record.ChimaraPts),
            chimaraPts: Number(record.ChimaraPts),
            clearance: String(record.ClearanceLevel ?? ""),
            legalName,
            role: String(record.Role ?? ""),
            status: String(record.status ?? ""),
            searchText: [subjectNumber, record.registryName, legalName, ...codeNames, record.Role, record.status]
              .filter((value) => typeof value === "string" && value.trim()).join(" ").toLocaleLowerCase()
          };
        });
        populateFilter(classFilter, allSubjects.map((subject) => subject.className), "Any class", (first, second) => Number(first === "Unranked") - Number(second === "Unranked") || classThresholds.findIndex(({ name }) => name === first) - classThresholds.findIndex(({ name }) => name === second));
        populateFilter(clearanceFilter, allSubjects.map((subject) => subject.clearance), "Any clearance", (first, second) => first.localeCompare(second, undefined, { numeric: true }));
        populateFilter(roleFilter, allSubjects.map((subject) => subject.role), "Any role", (first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
        populateFilter(statusFilter, allSubjects.map((subject) => subject.status), "Any status", (first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
        message.hidden = true;
        if (developerView) {
          applyStatsRange();
          devMessage.hidden = true;
        } else {
          updateRoster();
          const requestedRegistryId = new URLSearchParams(window.location.search).get("profile")?.trim();
          const requestedNumber = new URLSearchParams(window.location.search).get("subject")?.trim();
          const requestedSubject = requestedRegistryId
            ? allSubjects.find(({ record }) => typeof record.registryName === "string" && record.registryName.trim() === requestedRegistryId)
            : requestedNumber && allSubjects.find(({ subjectNumber }) => subjectNumber === requestedNumber);
          if (requestedSubject) {
            searchInput.value = requestedSubject.subjectNumber;
            updateRoster();
            if (canOpenSubject(requestedSubject.record, storedClearance)) {
              showMemberDetails(requestedSubject.record, requestedSubject.profile, storedClearance, {
                hero: requestedSubject.heroProfile,
                villain: requestedSubject.villainProfile
              });
            } else {
              message.classList.add("roster-message--error");
              message.textContent = `Clearance ${requestedSubject.clearance} is required to open this subject file.`;
              message.hidden = false;
            }
          }
        }
      } catch (error) {
        console.error("Could not load the Chimara roster:", error);
        const errorMessage = developerView ? devMessage : message;
        errorMessage.classList.add("roster-message--error");
        errorMessage.textContent = "Could not load Chimara statistics. Open this page through the local web server and check both registry JSON files.";
      }
    }

    const subprojectsDialog = document.querySelector("#subprojects-dialog");
    document.querySelector("#subprojects-button").addEventListener("click", () => subprojectsDialog.showModal());
    const subprojectMessage = document.querySelector("#subproject-message");
    const subprojectClearance = Number(sessionStorage.getItem("hpsc-clearance") || "0");
    subprojectsDialog.querySelectorAll(".subproject-card").forEach((card) => {
      const requiredClearance = Number(card.dataset.clearance);
      const restricted = subprojectClearance < requiredClearance || subprojectClearance > 5 || !Number.isInteger(subprojectClearance);
      if (restricted) {
        card.setAttribute("aria-disabled", "true");
        card.querySelector(".subproject-label").textContent = `Restricted · Clearance ${requiredClearance}`;
        card.querySelector(".subproject-action").textContent = "Clearance required";
      }
      if (card.matches("button, a")) card.addEventListener("click", (event) => {
        if (!restricted && card.tagName === "A") return;
        event.preventDefault();
        subprojectMessage.textContent = restricted
          ? `${card.dataset.project} requires clearance ${requiredClearance}.`
          : `${card.dataset.project} does not have a project page yet.`;
        subprojectMessage.hidden = false;
        subprojectMessage.scrollIntoView({ block: "nearest" });
      });
    });
    subprojectsDialog.addEventListener("close", () => {
      subprojectMessage.hidden = true;
      subprojectMessage.textContent = "";
    });

    const memberDetailDialog = document.querySelector("#member-detail-dialog");
    document.querySelector("#member-detail-close").addEventListener("click", () => memberDetailDialog.close());
    memberDetailDialog.addEventListener("click", (event) => {
      if (event.target === memberDetailDialog) memberDetailDialog.close();
    });

    const backToTopButton = document.querySelector("#back-to-top");
    function updateBackToTopVisibility() {
      backToTopButton.hidden = window.scrollY < 500;
    }

    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
    updateBackToTopVisibility();
    loadRoster();
