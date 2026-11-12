    const allowedProjects = (() => {
      try {
        const projects = JSON.parse(sessionStorage.getItem("hpsc-project-access") || "[]");
        return Array.isArray(projects) ? projects : [];
      } catch {
        return [];
      }
    })();
    const characterList = document.querySelector("#character-list");
    const registryMessage = document.querySelector("#registry-message");
    const recordCount = document.querySelector("#record-count");
    const sidebarMatchCount = document.querySelector("#sidebar-match-count");
    const sidebarDirectoryCount = document.querySelector("#sidebar-directory-count");
    const sidebarFilterCount = document.querySelector("#sidebar-filter-count");
    const filterForm = document.querySelector("#registry-filters");
    const nameFilter = document.querySelector("#name-filter");
    const quirkFilter = document.querySelector("#quirk-filter");
    const quirkTypeFilter = document.querySelector("#quirk-type-filter");
    const bloodTypeFilter = document.querySelector("#blood-type-filter");
    const statusFilter = document.querySelector("#status-filter");
    const statusFilterSummary = document.querySelector("#status-filter-summary");
    const registryIdFilter = document.querySelector("#registry-id-filter");
    const registryIdFilterField = document.querySelector("#registry-id-filter-field");
    const clearFiltersButton = document.querySelector("#clear-filters");
    const directoryToggleButton = document.querySelector("#directory-toggle");
    const searchEmpty = document.querySelector("#search-empty");
    const pagination = document.querySelector("#registry-pagination");
    const previousPageButton = document.querySelector("#previous-page");
    const nextPageButton = document.querySelector("#next-page");
    const pageIndicator = document.querySelector("#page-indicator");
    const profileDialog = document.querySelector("#profile-dialog");
    const dialogHeader = profileDialog.querySelector(".dialog-header");
    const dialogTabs = [...profileDialog.querySelectorAll('[role="tab"]')];
    const pageSize = 60;
    const maxGeneratedCharacterCount = 122200000;
    const registryViewStateKey = "hpsc-quirk-registry-view";
    let registryCharacters = [];
    let directoryConfig = null;
    let directoryReservedIndexes = [];
    let generatedNameExclusions = [];
    let generatedMatchGroups = [];
    let generatedMatchOffsets = [];
    let generatedMatchesPerPeriod = 0;
    let generatedMatchCount = 0;
    let registeredResultPositions = [];
    let generatedIdSearchLimited = false;
    let generatedCharactersByPage = new Map();
    let registryProfilesById = new Map();
    let heroProfilesByRegistryId = new Map();
    let villainProfilesByRegistryId = new Map();
    let chimaraProfilesByRegistryId = new Map();
    let filteredCharacters = [];
    let currentPage = 1;
    let showGeneratedCharacters = true;
    let hasActiveFilters = false;
    let openProfileRegistryId = null;
    const storedClearance = Number(sessionStorage.getItem("hpsc-clearance") || "0");
    const userClearance = Number.isInteger(storedClearance) && storedClearance >= 1 && storedClearance <= 5
      ? storedClearance
      : 0;
    const clearanceLabels = {
      1: "Public",
      2: "Standard Pro Heroes & Sidekicks",
      3: "Top Heroes / Specialized Agencies",
      4: "Elite Operational / Field Spies",
      5: "The President / Director Eyes-Only"
    };

    function readRegistryViewState() {
      const savedState = sessionStorage.getItem(registryViewStateKey);
      if (!savedState) return null;
      try {
        const state = JSON.parse(savedState);
        return state && typeof state === "object" && !Array.isArray(state) ? state : null;
      } catch (error) {
        console.warn("Could not restore the Quirk Registry view:", error);
        return null;
      }
    }

    function saveRegistryViewState() {
      sessionStorage.setItem(registryViewStateKey, JSON.stringify({
        name: nameFilter.value,
        quirk: quirkFilter.value,
        registryId: registryIdFilter?.value || "",
        quirkType: quirkTypeFilter.value,
        bloodType: bloodTypeFilter.value,
        status: [...statusFilter.querySelectorAll("input:checked")].map((input) => input.value),
        showGeneratedCharacters,
        currentPage,
        openProfileRegistryId
      }));
    }

    function appendDialogField(fields, label, value) {
      if (typeof value !== "string" || !value.trim()) return;
      const wrapper = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value.trim();
      wrapper.append(term, description);
      fields.append(wrapper);
    }

    function normalizeQuirklessCharacter(character) {
      const quirkFields = ["quirkName", "quirkType", "quirkDescription"];
      if (quirkFields.every((field) =>
        typeof character?.[field] === "string" && !character[field].trim()
      )) {
        character.quirkName = "Quirkless";
        character.quirkType = "N/A";
        character.quirkDescription = "N/A";
      }
    }

    function registryIdForDisplay(character) {
      return userClearance === 5 ? character.registryName : "REDACTED";
    }

    function hasProfileClearance(profile) {
      return Number.isInteger(profile.clearanceAccessLevel) &&
        profile.clearanceAccessLevel >= 1 &&
        profile.clearanceAccessLevel <= 5 &&
        userClearance >= profile.clearanceAccessLevel;
    }

    function hasChimaraClearance(record) {
      const requiredClearance = Number(record?.ClearanceLevel);
      return Number.isInteger(requiredClearance) && requiredClearance >= 1 && requiredClearance <= 5 &&
        userClearance >= requiredClearance;
    }

    function renderDatabaseProfileLinks(character) {
      const links = document.querySelector("#dialog-database-profile-links");
      links.replaceChildren();

      function addConnectedPage(titleText, path, allowed, hasClearance, requiredClearance, descriptionText) {
        const accessible = allowed && hasClearance;
        const reason = !allowed ? "Project access required" : Number.isInteger(requiredClearance) && requiredClearance >= 1 && requiredClearance <= 5
          ? `Clearance ${requiredClearance} required` : "Clearance not assigned";
        const link = document.createElement(accessible ? "a" : "div");
        link.className = "connected-page-card";
        if (accessible) {
          link.href = `../${path}/Index.html?profile=${encodeURIComponent(character.registryName)}`;
          link.setAttribute("aria-label", `Open ${titleText}`);
        } else {
          link.setAttribute("role", "link");
          link.setAttribute("aria-disabled", "true");
          link.setAttribute("aria-label", `${titleText}: ${reason}`);
          link.tabIndex = 0;
        }
        const copy = document.createElement("span");
        copy.className = "connected-page-copy";
        const title = document.createElement("span");
        title.className = "connected-page-title";
        title.textContent = titleText;
        const description = document.createElement("span");
        description.className = "connected-page-description";
        description.textContent = accessible ? descriptionText : reason;
        copy.append(title, description);
        link.append(copy);
        if (accessible) {
          const arrow = document.createElement("span");
          arrow.className = "connected-page-arrow";
          arrow.setAttribute("aria-hidden", "true");
          arrow.textContent = "→";
          link.append(arrow);
        }
        links.append(link);
      }

      const chimara = chimaraProfilesByRegistryId.get(character.registryName);
      if (chimara) {
        addConnectedPage("Chimara Project", "Chimara%20Project", allowedProjects.includes("Chimara Project"),
          hasChimaraClearance(chimara), Number(chimara.ClearanceLevel), `Subject ${chimara.subjectNumber}`);
      }

      const hero = heroProfilesByRegistryId.get(character.registryName);
      if (hero) {
        addConnectedPage("Hero Database", "Hero%20Database", allowedProjects.includes("Hero Database"),
          hasProfileClearance(hero), hero.clearanceAccessLevel, "Matching hero record");
      }

      const villain = villainProfilesByRegistryId.get(character.registryName);
      if (villain) {
        addConnectedPage("Villain Database", "Villain%20Database", allowedProjects.includes("Villain Database"),
          hasProfileClearance(villain), villain.clearanceAccessLevel, "Matching villain record");
      }

      return links.childElementCount > 0;
    }

    function givenNameFirst(legalName) {
      const nameParts = legalName.split(",");
      return nameParts.length === 2 ? `${nameParts[1].trim()} ${nameParts[0].trim()}` : legalName;
    }

    function createPortraitImage(character, imageClass, placeholderClass) {
      if (character.readOnly === true) {
        const placeholder = document.createElement("div");
        placeholder.className = placeholderClass;
        placeholder.setAttribute("aria-label", "No portrait available");
        placeholder.textContent = character.legalName.charAt(0).toUpperCase();
        return placeholder;
      }

      const image = document.createElement("img");
      const legalName = character.legalName;
      const portraitName = givenNameFirst(legalName);
      const fileStem = encodeURIComponent(portraitName.replace(/\s+/g, ""));
      const extensions = [".png", ".webp", ".jpg", ".jpeg"];
      let extensionIndex = 0;

      image.className = imageClass;
      image.alt = `Portrait of ${legalName}`;
      image.onerror = () => {
        extensionIndex += 1;
        if (extensionIndex < extensions.length) {
          image.src = `data/img/${fileStem}${extensions[extensionIndex]}`;
          return;
        }

        const placeholder = document.createElement("div");
        placeholder.className = placeholderClass;
        placeholder.setAttribute("aria-label", "Portrait unavailable");
        placeholder.textContent = legalName.charAt(0).toUpperCase();
        image.onerror = null;
        image.replaceWith(placeholder);
      };
      image.src = `data/img/${fileStem}${extensions[extensionIndex]}`;
      return image;
    }

    function openProfile(character) {
      if (userClearance === 1) return;
      openProfileRegistryId = character.registryName;
      document.querySelector("#dialog-name").textContent = character.legalName;

      const portraitWrap = document.querySelector("#dialog-portrait-wrap");
      portraitWrap.replaceChildren();
      portraitWrap.append(createPortraitImage(character, "dialog-portrait", "dialog-portrait-placeholder"));

      const fields = document.querySelector("#dialog-fields");
      fields.replaceChildren();
      appendDialogField(fields, "Legal name", character.legalName);
      appendDialogField(fields, "Registry ID", registryIdForDisplay(character));
      appendDialogField(fields, "Date of birth", character.Birthdate);
      appendDialogField(fields, "Age", character.Age);
      appendDialogField(fields, "Height", character.Height);
      appendDialogField(fields, "BloodType", character.BloodType);
      appendDialogField(fields, "Pronouns", character.Pronouns);
      appendDialogField(fields, "Sex", character.Sex);
      document.querySelector("#dialog-quirk-name").textContent = character.quirkName || "Unlisted";
      document.querySelector("#dialog-quirk-type").textContent = character.quirkType || "Quirkless";
      document.querySelector("#connected-tab").hidden = !renderDatabaseProfileLinks(character);

      const warnings = document.querySelector("#dialog-warnings");
      warnings.replaceChildren();
      function addDialogWarning(title, styleClass) {
        const warning = document.createElement("span");
        warning.className = `record-warning ${styleClass}`;
        warning.textContent = title;
        warnings.append(warning);
      }
      recordTags(character).forEach(({ title, styleClass }) => addDialogWarning(title, styleClass));

      const description = typeof character.quirkDescription === "string" ? character.quirkDescription.trim() : "";
      document.querySelector("#dialog-description").textContent = description || "No assessment is currently available.";
      renderFamily(character.Family);
      renderBackground(character.Background);
      renderNotes(character.Notes);
      setActiveDialogTab(dialogTabs[0]);
      saveRegistryViewState();
      profileDialog.showModal();
    }

    function renderNotes(notes) {
      const notesElement = document.querySelector("#dialog-notes-text");
      renderClearanceContent(notesElement, notes, "No notes are available at your clearance level.");
    }

    function renderBackground(background) {
      const backgroundElement = document.querySelector("#dialog-background-text");
      backgroundElement.replaceChildren();
      if (userClearance < 2) {
        const message = document.createElement("p");
        message.className = "notes-empty";
        message.textContent = "Clearance level 2 or higher is required to view background information.";
        backgroundElement.append(message);
        return;
      }
      if (typeof background !== "string" || !background.trim()) {
        const message = document.createElement("p");
        message.className = "notes-empty";
        message.textContent = "No background information is available for this record.";
        backgroundElement.append(message);
        return;
      }

      const entry = document.createElement("section");
      entry.className = "notes-level";
      const content = document.createElement("p");
      appendFormattedNote(content, background.trim());
      entry.append(content);
      backgroundElement.append(entry);
    }

    function renderFamily(family) {
      const familyElement = document.querySelector("#dialog-family-text");
      familyElement.replaceChildren();

      const familyMembers = [];
      if (family && typeof family === "object" && !Array.isArray(family)) {
        if (typeof family.Father === "string" && family.Father.trim()) {
          familyMembers.push(["Father", family.Father.trim()]);
        }
        if (typeof family.Mother === "string" && family.Mother.trim()) {
          familyMembers.push(["Mother", family.Mother.trim()]);
        }
        if (typeof family.Spouse === "string" && family.Spouse.trim()) {
          familyMembers.push(["Spouse", family.Spouse.trim()]);
        }
        if (Array.isArray(family.Siblings)) {
          family.Siblings.forEach((entry) => {
            if (typeof entry === "string" && entry.trim()) {
              familyMembers.push(["Sibling", entry.trim()]);
            }
          });
        }
        if (Array.isArray(family.Children)) {
          family.Children.forEach((entry) => {
            if (typeof entry === "string" && entry.trim()) {
              familyMembers.push(["Child", entry.trim()]);
            }
          });
        }
      }

      if (familyMembers.length === 0) {
        const message = document.createElement("p");
        message.className = "notes-empty";
        message.textContent = "No family members are listed in this record.";
        familyElement.append(message);
        return;
      }

      familyMembers.forEach(([relationship, entry]) => {
        const character = registryProfilesById.get(entry);
        const card = document.createElement("article");
        card.className = "family-member";
        const details = document.createElement("div");
        details.className = "family-member-details";
        const name = document.createElement("h4");
        name.textContent = character ? character.legalName : entry;
        const relationshipText = document.createElement("p");
        relationshipText.className = "family-member-relationship";
        relationshipText.textContent = relationship;
        details.append(name, relationshipText);

        if (!character) {
          card.classList.add("family-member--text");
          card.append(details);
          familyElement.append(card);
          return;
        }

        const openProfileButton = document.createElement("button");
        openProfileButton.className = "family-member-open";
        openProfileButton.type = "button";
        openProfileButton.setAttribute("aria-label", `Open Registry Profile for ${character.legalName}`);
        openProfileButton.addEventListener("click", () => openProfile(character));
        const portrait = document.createElement("div");
        portrait.className = "family-member-portrait";
        portrait.append(createPortraitImage(character, "", "dialog-portrait-placeholder"));

        const quirk = document.createElement("section");
        quirk.className = "family-member-quirk";
        const quirkLabel = document.createElement("span");
        quirkLabel.className = "family-member-quirk-label";
        quirkLabel.textContent = "Registered Quirk";
        const quirkHeading = document.createElement("div");
        quirkHeading.className = "family-member-quirk-heading";
        const quirkName = document.createElement("strong");
        quirkName.className = "family-member-quirk-name";
        quirkName.textContent = character.quirkName;
        const quirkType = document.createElement("span");
        quirkType.className = "family-member-quirk-type";
        quirkType.textContent = character.quirkType;
        const description = document.createElement("details");
        description.className = "family-member-quirk-description";
        const descriptionSummary = document.createElement("summary");
        descriptionSummary.textContent = "View assessment";
        const descriptionText = document.createElement("p");
        descriptionText.textContent = character.quirkDescription || "No Quirk assessment is available.";
        description.append(descriptionSummary, descriptionText);
        quirkHeading.append(quirkName, quirkType);
        quirk.append(quirkLabel, quirkHeading, description);
        details.append(quirk);
        card.append(openProfileButton, portrait, details);
        familyElement.append(card);
      });
    }

    function renderClearanceContent(contentElement, entries, emptyMessage) {
      contentElement.replaceChildren();

      if (userClearance === 0) {
        const message = document.createElement("p");
        message.className = "notes-empty";
        message.append(document.createTextNode("Sign in to the Quirk Registry to view clearance-level information. "));
        const loginLink = document.createElement("a");
        loginLink.href = "../Login.html?project=Quirk%20Registry";
        loginLink.textContent = "Sign in";
        message.append(loginLink);
        contentElement.append(message);
        return;
      }

      let hasVisibleEntries = false;
      if (entries && typeof entries === "object" && !Array.isArray(entries)) {
        for (let level = 1; level <= 5; level += 1) {
          const text = entries[String(level)];
          if (typeof text !== "string" || !text.trim()) continue;

          const section = document.createElement("section");
          const isRestricted = level > userClearance;
          section.className = isRestricted ? "notes-level notes-level--restricted" : "notes-level";
          const heading = document.createElement("h4");
          heading.textContent = `Clearance ${level} · ${clearanceLabels[level]}${isRestricted ? " · Restricted" : ""}`;
          const note = document.createElement("p");
          appendFormattedNote(note, text.trim());
          section.append(heading, note);
          contentElement.append(section);
          hasVisibleEntries = true;
        }
      }

      if (!hasVisibleEntries) {
        const message = document.createElement("p");
        message.className = "notes-empty";
        message.textContent = emptyMessage;
        contentElement.append(message);
      }
    }

    function setActiveDialogTab(activeTab, focus = false) {
      dialogTabs.forEach((tab) => {
        const selected = tab === activeTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !selected;
      });
      if (focus) activeTab.focus();
    }

    dialogTabs.forEach((tab) => {
      tab.addEventListener("click", () => setActiveDialogTab(tab));
      tab.addEventListener("keydown", (event) => {
        const availableTabs = dialogTabs.filter((candidate) => !candidate.hidden);
        const currentIndex = availableTabs.indexOf(tab);
        let nextIndex = currentIndex;
        if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % availableTabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + availableTabs.length) % availableTabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = availableTabs.length - 1;
        else return;
        event.preventDefault();
        setActiveDialogTab(availableTabs[nextIndex], true);
      });
    });

    function renderCharacter(character) {
      const card = document.createElement("article");
      const isReadOnly = character.readOnly === true;
      const isSummaryOnly = userClearance === 1 && !isReadOnly;
      card.className = isReadOnly
        ? "character-card character-card--read-only"
        : isSummaryOnly
          ? "character-card character-card--summary-only"
          : "character-card";
      if (isReadOnly) {
        card.setAttribute("aria-label", `Read-only directory entry for ${character.legalName}`);
      } else if (isSummaryOnly) {
        card.setAttribute("aria-label", `Personnel summary for ${character.legalName}`);
      } else {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-haspopup", "dialog");
        card.setAttribute("aria-label", `Open personnel file for ${character.legalName}`);
        card.addEventListener("click", () => openProfile(character));
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProfile(character);
          }
        });
      }

      const portraitWrap = document.createElement("div");
      portraitWrap.className = "portrait-wrap";
      portraitWrap.append(createPortraitImage(character, "portrait", "portrait-placeholder"));

      const info = document.createElement("div");
      info.className = "registry-card-meta";
      function addRoleWarning(title, styleClass) {
        let warningContainer = portraitWrap.querySelector(".record-warnings");
        if (!warningContainer) {
          warningContainer = document.createElement("div");
          warningContainer.className = "record-warnings";
          portraitWrap.append(warningContainer);
        }
        const warning = document.createElement("div");
        warning.className = `record-warning ${styleClass}`;
        warning.textContent = title;
        warningContainer.append(warning);
      }
      recordTags(character).forEach(({ title, styleClass }) => addRoleWarning(title, styleClass));

      const name = document.createElement("h2");
      name.className = "character-name";
      name.textContent = character.legalName;
      for (const [fieldLabel, value] of [
        ["Quirk", character.quirkName], ["Type", character.quirkType], ["Registry", registryIdForDisplay(character)],
        ["DOB", character.Birthdate], ["Age", character.Age], ["Blood type", character.BloodType]
      ]) {
        if (value === undefined || value === null || value === "") continue;
        const item = document.createElement("span");
        item.className = fieldLabel === "Registry"
          ? "registry-card-meta-item registry-card-meta-item--registry-id"
          : "registry-card-meta-item";
        const heading = document.createElement("strong");
        heading.textContent = fieldLabel;
        if (fieldLabel === "Registry") {
          const registryId = document.createElement("span");
          registryId.textContent = value;
          item.append(heading, registryId);
        } else {
          item.append(heading, document.createTextNode(value));
        }
        info.append(item);
      }

      if (isReadOnly) {
        const directoryNote = document.createElement("p");
        directoryNote.className = "registry-card-restriction";
        directoryNote.textContent = "Directory entry · No file available";
        info.append(directoryNote);
      }

      card.append(name, portraitWrap, info);
      characterList.append(card);
    }

    function renderCurrentPage() {
      characterList.replaceChildren();
      updateGeneratedPageWindow();
      (generatedCharactersByPage.get(currentPage) || []).forEach(renderCharacter);
    }

    function updateGeneratedPageWindow() {
      generatedCharactersByPage.clear();
      const totalPages = getTotalPages();
      const firstPage = Math.max(1, currentPage - 2);
      const lastPage = Math.min(totalPages, currentPage + 2);
      for (let page = firstPage; page <= lastPage; page += 1) {
        const pageStart = (page - 1) * pageSize;
        const pageCount = Math.min(pageSize, filteredCharacters.length + generatedMatchCount - pageStart);
        generatedCharactersByPage.set(page, Array.from({ length: Math.max(0, pageCount) }, (_, offset) => {
          const position = pageStart + offset;
          const registeredIndex = lowerBound(registeredResultPositions, position);
          if (registeredResultPositions[registeredIndex] === position) {
            return filteredCharacters[registeredIndex];
          }
          return generateDirectoryCharacter(directoryConfig, generatedIndexAt(position - registeredIndex));
        }));
      }
    }

    function populateFilterOptions(select, field, defaultLabel, extraValues = []) {
      const values = [...new Set(registryCharacters
        .map((character) => character[field])
        .filter((value) => typeof value === "string" && value.trim())
        .map((value) => value.trim()).concat(extraValues))]
        .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: "base" }));
      select.replaceChildren(new Option(defaultLabel, ""));
      values.forEach((value) => select.add(new Option(value, value)));
    }

    function matchesRecordStatus(character, status) {
      if (!status) return true;
      const role = typeof character.Role === "string" ? character.Role.toLocaleLowerCase() : "";
      switch (status) {
        case "missing": return /\bmissing\b/.test(role);
        case "watch-list": return /watch[\s-]*list/.test(role);
        case "villain": return role.includes("villain") || role.includes("villian");
        case "vigilante": return role.includes("vigilante");
        case "hero": return role.includes("hero") || role.includes("student");
        case "civilian": return role.includes("civilian");
        case "deceased": return character.deceased === true || /\b(?:dead|deceased)\b/.test(role);
        default: return true;
      }
    }

    function recordTags(character) {
      const tags = [];
      const knownTags = [
        ["villain", "Villain alert"], ["watch-list", "Watch-list warning"],
        ["missing", "Missing person"], ["vigilante", "Vigilante"], ["hero", "Hero"],
        ["deceased", "Deceased"]
      ];
      for (const [status, title] of knownTags) {
        if (matchesRecordStatus(character, status)) {
          tags.push({ title, styleClass: `record-warning--${status}` });
        }
      }
      const role = typeof character.Role === "string" ? character.Role : "";
      for (const part of role.split(",").map((value) => value.trim()).filter(Boolean)) {
        if (![...knownTags.map(([status]) => status), "civilian"].some((status) =>
          matchesRecordStatus({ Role: part }, status)
        )) {
          tags.push({ title: part, styleClass: "record-warning--misc" });
        }
      }
      return tags;
    }

    function lowerBound(values, target) {
      let low = 0;
      let high = values.length;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (values[middle] < target) low = middle + 1;
        else high = middle;
      }
      return low;
    }

    function generatedPeriod(config) {
      return config.firstNames.length * config.lastNames.length;
    }

    function countDirectoryEntries(config, exclusions, registeredCount) {
      const period = generatedPeriod(config);
      const fullPeriods = Math.floor(config.count / period);
      const remainder = config.count % period;
      const fullGroups = Math.floor(remainder / config.firstNames.length);
      const partialGroup = remainder % config.firstNames.length;
      const excludedPerPeriod = exclusions.reduce((total, group) => total + group.length, 0);
      const excludedInRemainder = exclusions.slice(0, fullGroups)
        .reduce((total, group) => total + group.length, 0) +
        (fullGroups < exclusions.length ? lowerBound(exclusions[fullGroups], partialGroup) : 0);
      return registeredCount + config.count - fullPeriods * excludedPerPeriod - excludedInRemainder;
    }

    // Shared surname phases let filtered searches reuse indexes without scanning the full directory.
    const generatedStatusSlots = [
      ...Array(40).fill("civilian"),
      ...Array(25).fill("hero"),
      ...Array(12).fill("vigilante"),
      ...Array(10).fill("villain"),
      ...Array(8).fill("watch-list"),
      ...Array(5).fill("missing")
    ];
    const generatedStatusPhaseCount = 20;

    function generatedStatusHash(value, seed) {
      let hash = (value ^ seed) >>> 0;
      hash = Math.imul(hash ^ (hash >>> 16), 0x7feb352d);
      hash = Math.imul(hash ^ (hash >>> 15), 0x846ca68b);
      return (hash ^ (hash >>> 16)) >>> 0;
    }

    function generatedStatusPhase(config, lastIndex) {
      return (generatedStatusHash(lastIndex, config.seed ^ 0x9e3779b9) % generatedStatusPhaseCount) * 5;
    }

    function generatedStatus(config, firstIndex, phase) {
      const slot = (generatedStatusHash(firstIndex, config.seed) + phase) % generatedStatusSlots.length;
      return generatedStatusSlots[slot];
    }

    function generatedDeceased(config, firstIndex, phase) {
      return (generatedStatusHash(firstIndex, config.seed ^ 0x85ebca6b) + phase) % 100 < 6;
    }

    function normalizeDirectoryName(name) {
      return name.trim().replace(/\s+/g, " ").toLocaleLowerCase();
    }

    function buildGeneratedNameExclusions(config, characters) {
      const firstIndexes = new Map();
      config.firstNames.forEach((name, index) => {
        const normalized = normalizeDirectoryName(name);
        if (!firstIndexes.has(normalized)) firstIndexes.set(normalized, []);
        firstIndexes.get(normalized).push(index);
      });
      const names = characters.map((character) => normalizeDirectoryName(character.legalName));
      return config.lastNames.map((name) => {
        const last = normalizeDirectoryName(name);
        const excluded = new Set();
        for (const legalName of names) {
          const parts = legalName.split(",");
          const candidates = [];
          if (parts.length === 2 && parts[0].trim() === last) {
            candidates.push(parts[1].trim());
          } else if (parts.length === 1) {
            if (legalName.startsWith(`${last} `)) candidates.push(legalName.slice(last.length + 1));
            if (legalName.endsWith(` ${last}`)) candidates.push(legalName.slice(0, -last.length - 1));
          }
          for (const candidate of candidates) {
            for (const index of firstIndexes.get(candidate) || []) excluded.add(index);
          }
        }
        return [...excluded].sort((a, b) => a - b);
      });
    }

    function generatedIndexAt(position) {
      const period = generatedPeriod(directoryConfig);
      const periodNumber = Math.floor(position / generatedMatchesPerPeriod);
      const namePosition = position % generatedMatchesPerPeriod;
      let low = 0;
      let high = generatedMatchGroups.length;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (generatedMatchOffsets[middle + 1] <= namePosition) low = middle + 1;
        else high = middle;
      }
      const firstPosition = namePosition - generatedMatchOffsets[low];
      const group = generatedMatchGroups[low];
      let firstIndex = firstPosition;
      if (Array.isArray(group)) {
        firstIndex = group[firstPosition];
      } else if (group !== null) {
        for (const excluded of group.excluded) {
          if (excluded > firstIndex) break;
          firstIndex += 1;
        }
      }
      return periodNumber * period + low * directoryConfig.firstNames.length + firstIndex;
    }

    function updateRegisteredResultPositions() {
      registeredResultPositions = filteredCharacters.map((character, index) => {
        let low = 0;
        let high = generatedMatchCount;
        while (low < high) {
          const middle = Math.floor((low + high) / 2);
          const generatedId = generatedDirectoryId(generatedIndexAt(middle));
          if (generatedId.localeCompare(character.registryName, undefined, { numeric: true }) < 0) low = middle + 1;
          else high = middle;
        }
        return index + low;
      });
    }

    function updateGeneratedMatches(nameQuery, quirkQuery, registryIdQuery, quirkType, bloodType, statuses) {
      generatedMatchGroups = [];
      generatedMatchOffsets = [0];
      generatedMatchesPerPeriod = 0;
      generatedMatchCount = 0;
      generatedIdSearchLimited = false;
      if (!showGeneratedCharacters || !directoryConfig || !directoryConfig.count) return;
      if ((quirkQuery && !"unlisted".includes(quirkQuery)) ||
          (quirkType && quirkType !== "unknown") ||
          statuses.some((status) => status !== "deceased" && !generatedStatusSlots.includes(status))) return;
      if (registryIdQuery) {
        generatedIdSearchLimited = true;
        return;
      }

      const period = generatedPeriod(directoryConfig);
      const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      const selectedBloodIndex = bloodType ? bloodTypes.findIndex((value) => value.toLocaleLowerCase() === bloodType) : -1;
      if (bloodType && selectedBloodIndex < 0) return;
      const firstNames = nameQuery ? directoryConfig.firstNames.map((name) => name.toLocaleLowerCase()) : [];
      const bloodMatches = (index) => !bloodType || index % bloodTypes.length === selectedBloodIndex;
      const firstMatches = [];
      if (nameQuery) {
        firstNames.forEach((name, index) => {
          if (bloodMatches(index) && name.includes(nameQuery)) firstMatches.push(index);
        });
      } else if (bloodType) {
        for (let index = selectedBloodIndex; index < directoryConfig.firstNames.length; index += bloodTypes.length) {
          firstMatches.push(index);
        }
      }
      const edgeMatches = new Map();
      const groupsByEdges = new Map();
      const groupsByStatus = new Map();
      const firstStatusSlots = statuses.length
        ? Uint8Array.from(directoryConfig.firstNames, (_, index) =>
          generatedStatusHash(index, directoryConfig.seed) % generatedStatusSlots.length)
        : null;
      const firstDeceasedSlots = statuses.includes("deceased")
        ? Uint8Array.from(directoryConfig.firstNames, (_, index) =>
          generatedStatusHash(index, directoryConfig.seed ^ 0x85ebca6b) % generatedStatusSlots.length)
        : null;
      function matchingEdge(kind, value) {
        const key = `${kind}:${value}`;
        if (!edgeMatches.has(key)) {
          const matches = [];
          firstNames.forEach((name, index) => {
            if (bloodMatches(index) && (kind === "prefix" ? name.startsWith(value) : name.endsWith(value))) matches.push(index);
          });
          edgeMatches.set(key, matches);
        }
        return key;
      }
      for (const [lastIndex, originalLast] of directoryConfig.lastNames.entries()) {
        const last = nameQuery ? originalLast.toLocaleLowerCase() : "";
        let group = firstMatches;
        if (!nameQuery || `${last}, `.includes(nameQuery) || `${last} `.includes(nameQuery) || ` ${last}`.includes(nameQuery)) {
          if (!bloodType) {
            group = null;
          } else if (nameQuery) {
            const key = "all-blood";
            if (!edgeMatches.has(key)) {
              const indexes = [];
              for (let index = selectedBloodIndex; index < directoryConfig.firstNames.length; index += bloodTypes.length) indexes.push(index);
              edgeMatches.set(key, indexes);
            }
            group = edgeMatches.get(key);
          }
        } else {
          const edges = [];
          for (let split = 1; split < nameQuery.length; split += 1) {
            const left = nameQuery.slice(0, split);
            const right = nameQuery.slice(split);
            if (`${last}, `.endsWith(left) || `${last} `.endsWith(left)) {
              edges.push(matchingEdge("prefix", right));
            }
            if (` ${last}`.startsWith(right)) {
              edges.push(matchingEdge("suffix", left));
            }
          }
          if (edges.length) {
            const key = [...new Set(edges)].sort().join("|");
            if (!groupsByEdges.has(key)) {
              const indexes = new Set(firstMatches);
              for (const edge of new Set(edges)) {
                for (const index of edgeMatches.get(edge)) indexes.add(index);
              }
              groupsByEdges.set(key, [...indexes].sort((a, b) => a - b));
            }
            group = groupsByEdges.get(key);
          }
        }
        if (statuses.length) {
          const phase = generatedStatusPhase(directoryConfig, lastIndex);
          if (!groupsByStatus.has(group)) groupsByStatus.set(group, new Map());
          const phases = groupsByStatus.get(group);
          if (!phases.has(phase)) {
            const matches = [];
            const matchesStatus = (index) => {
              const statusSlot = (firstStatusSlots[index] + phase) % generatedStatusSlots.length;
              const deceasedSlot = firstDeceasedSlots
                ? (firstDeceasedSlots[index] + phase) % generatedStatusSlots.length
                : -1;
              return statuses.some((status) => status === "deceased"
                ? deceasedSlot < 6
                : generatedStatusSlots[statusSlot] === status);
            };
            if (group === null) {
              for (let index = 0; index < directoryConfig.firstNames.length; index += 1) {
                if (matchesStatus(index)) matches.push(index);
              }
            } else {
              for (const index of group) {
                if (matchesStatus(index)) matches.push(index);
              }
            }
            phases.set(phase, matches);
          }
          group = phases.get(phase);
        }
        const excluded = generatedNameExclusions[lastIndex];
        if (excluded.length) {
          if (group === null) {
            group = { excluded };
          } else {
            const excludedSet = new Set(excluded);
            group = group.filter((index) => !excludedSet.has(index));
          }
        }
        generatedMatchGroups.push(group);
        generatedMatchOffsets.push(generatedMatchOffsets[generatedMatchOffsets.length - 1] +
          (group === null ? directoryConfig.firstNames.length :
            Array.isArray(group) ? group.length : directoryConfig.firstNames.length - group.excluded.length));
      }
      generatedMatchesPerPeriod = generatedMatchOffsets[generatedMatchOffsets.length - 1];
      const completePeriods = Math.floor(directoryConfig.count / period);
      const remainder = directoryConfig.count % period;
      generatedMatchCount = completePeriods * generatedMatchesPerPeriod;
      const fullGroups = Math.floor(remainder / directoryConfig.firstNames.length);
      const partial = remainder % directoryConfig.firstNames.length;
      generatedMatchCount += generatedMatchOffsets[fullGroups];
      if (fullGroups < generatedMatchGroups.length) {
        const group = generatedMatchGroups[fullGroups];
        generatedMatchCount += group === null ? partial :
          Array.isArray(group) ? lowerBound(group, partial) : partial - lowerBound(group.excluded, partial);
      }
    }

    function updateRegistrySearch(resetPage = true) {
      const nameQuery = nameFilter.value.trim().toLocaleLowerCase();
      const quirkQuery = quirkFilter.value.trim().toLocaleLowerCase();
      const registryIdQuery = userClearance >= 2 && registryIdFilter
        ? registryIdFilter.value.trim().toLocaleLowerCase()
        : "";
      const selectedQuirkType = quirkTypeFilter.value.toLocaleLowerCase();
      const selectedBloodType = bloodTypeFilter.value.toLocaleLowerCase();
      const selectedStatuses = [...statusFilter.querySelectorAll("input:checked")]
        .map((input) => input.value);
      statusFilterSummary.textContent = selectedStatuses.length === 0
        ? "Any status"
        : selectedStatuses.length === 1
          ? statusFilter.querySelector(`input[value="${selectedStatuses[0]}"]`).parentElement.textContent.trim()
          : `${selectedStatuses.length} statuses selected`;
      const activeFilterCount = [
        nameFilter.value.trim(),
        quirkFilter.value.trim(),
        registryIdQuery,
        selectedQuirkType,
        selectedBloodType,
      ].filter(Boolean).length + selectedStatuses.length;
      hasActiveFilters = Boolean(
        nameQuery || quirkQuery || registryIdQuery || selectedQuirkType || selectedBloodType || selectedStatuses.length
      );

      const availableCharacters = registryCharacters.filter((character) =>
        showGeneratedCharacters || character.readOnly !== true
      );
      filteredCharacters = availableCharacters.filter((character) => {
        const legalName = character.legalName.toLocaleLowerCase();
        const searchableNames = [legalName, legalName.replace(",", ""), givenNameFirst(legalName)];
        const quirkName = character.quirkName.toLocaleLowerCase();
        const quirkType = character.quirkType.toLocaleLowerCase();
        const bloodType = typeof character.BloodType === "string" ? character.BloodType.toLocaleLowerCase() : "";
        const registryName = typeof character.registryName === "string" ? character.registryName.toLocaleLowerCase() : "";
        return (!nameQuery || searchableNames.some((name) => name.includes(nameQuery))) &&
          (!quirkQuery || quirkName.includes(quirkQuery)) &&
          (!registryIdQuery || registryName.includes(registryIdQuery)) &&
          (!selectedQuirkType || quirkType === selectedQuirkType) &&
          (!selectedBloodType || bloodType === selectedBloodType) &&
          (!selectedStatuses.length || selectedStatuses.some((status) => matchesRecordStatus(character, status)));
      });
      updateGeneratedMatches(nameQuery, quirkQuery, registryIdQuery, selectedQuirkType, selectedBloodType, selectedStatuses);
      updateRegisteredResultPositions();
      if (resetPage) currentPage = 1;

      const totalPages = getTotalPages();
      currentPage = Math.min(currentPage, totalPages);
      searchEmpty.hidden = filteredCharacters.length > 0 || generatedMatchCount > 0;
      pagination.hidden = totalPages <= 1;
      previousPageButton.disabled = currentPage <= 1;
      nextPageButton.disabled = currentPage >= totalPages;
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
      clearFiltersButton.disabled = !hasActiveFilters;
      sidebarMatchCount.textContent = (filteredCharacters.length + generatedMatchCount).toLocaleString();
      sidebarFilterCount.textContent = activeFilterCount === 0 ? "None" : activeFilterCount.toLocaleString();
      renderCurrentPage();
      saveRegistryViewState();
    }

    directoryToggleButton.addEventListener("click", () => {
      showGeneratedCharacters = !showGeneratedCharacters;
      directoryToggleButton.setAttribute("aria-pressed", String(!showGeneratedCharacters));
      directoryToggleButton.title = showGeneratedCharacters
        ? "Click to hide the randomized directory entries"
        : "Click to show the randomized directory entries";
      updateRegistrySearch();
    });
    filterForm.addEventListener("input", updateRegistrySearch);
    filterForm.addEventListener("change", updateRegistrySearch);
    filterForm.addEventListener("reset", () => {
      requestAnimationFrame(updateRegistrySearch);
    });
    previousPageButton.addEventListener("click", () => {
      if (currentPage <= 1) return;
      currentPage -= 1;
      renderCurrentPage();
      updatePagination();
      saveRegistryViewState();
    });
    nextPageButton.addEventListener("click", () => {
      if (currentPage >= getTotalPages()) return;
      currentPage += 1;
      renderCurrentPage();
      updatePagination();
      saveRegistryViewState();
    });
    filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    function updatePagination() {
      const totalPages = getTotalPages();
      previousPageButton.disabled = currentPage <= 1;
      nextPageButton.disabled = currentPage >= totalPages;
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    function getTotalPages() {
      return Math.max(1, Math.ceil((filteredCharacters.length + generatedMatchCount) / pageSize));
    }

    function makeDialogDraggable(dialog, handle) {
      let drag = null;
      function moveDrag(event) {
        if (!drag || event.pointerId !== drag.pointerId) return;
        const deltaX = event.clientX - drag.startX;
        const deltaY = event.clientY - drag.startY;
        if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;

        if (!drag.moved) {
          dialog.style.position = "fixed";
          dialog.style.left = `${drag.startLeft}px`;
          dialog.style.top = `${drag.startTop}px`;
          dialog.style.right = "auto";
          dialog.style.bottom = "auto";
          dialog.style.margin = "0";
          drag.moved = true;
        }

        const maxLeft = Math.max(0, window.innerWidth - drag.width);
        const maxTop = Math.max(0, window.innerHeight - drag.height);
        dialog.style.left = `${Math.min(maxLeft, Math.max(0, drag.startLeft + deltaX))}px`;
        dialog.style.top = `${Math.min(maxTop, Math.max(0, drag.startTop + deltaY))}px`;
        event.preventDefault();
      }
      function endDrag() {
        drag = null;
        window.removeEventListener("pointermove", moveDrag);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
      }

      handle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || event.target.closest("button, h2")) return;
        const bounds = dialog.getBoundingClientRect();
        drag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          startLeft: bounds.left,
          startTop: bounds.top,
          width: bounds.width,
          height: bounds.height,
          moved: false
        };
        window.addEventListener("pointermove", moveDrag);
        window.addEventListener("pointerup", endDrag);
        window.addEventListener("pointercancel", endDrag);
      });
      dialog.addEventListener("close", endDrag);
    }

    function makeDialogResizable(dialog) {
      let resize = null;
      const directions = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
      function resizeDialog(event) {
        if (!resize || event.pointerId !== resize.pointerId) return;
        const deltaX = event.clientX - resize.startX;
        const deltaY = event.clientY - resize.startY;
        const minWidth = Math.min(320, window.innerWidth - 20);
        const minHeight = Math.min(360, window.innerHeight - 20);
        let { left, top, width, height } = resize;

        if (resize.direction.includes("e")) {
          width = Math.min(window.innerWidth - resize.left - 10, Math.max(minWidth, resize.width + deltaX));
        } else if (resize.direction.includes("w")) {
          width = Math.min(resize.left + resize.width - 10, Math.max(minWidth, resize.width - deltaX));
          left = resize.left + resize.width - width;
        }
        if (resize.direction.includes("s")) {
          height = Math.min(window.innerHeight - resize.top - 10, Math.max(minHeight, resize.height + deltaY));
        } else if (resize.direction.includes("n")) {
          height = Math.min(resize.top + resize.height - 10, Math.max(minHeight, resize.height - deltaY));
          top = resize.top + resize.height - height;
        }

        dialog.style.left = `${Math.max(10, left)}px`;
        dialog.style.top = `${Math.max(10, top)}px`;
        dialog.style.right = "auto";
        dialog.style.bottom = "auto";
        dialog.style.margin = "0";
        dialog.style.width = `${width}px`;
        dialog.style.height = `${height}px`;
        event.preventDefault();
      }
      function stopResizing() {
        resize = null;
        window.removeEventListener("pointermove", resizeDialog);
        window.removeEventListener("pointerup", stopResizing);
        window.removeEventListener("pointercancel", stopResizing);
      }

      directions.forEach((direction) => {
        const handle = document.createElement("div");
        handle.className = `dialog-resize-handle dialog-resize-handle--${direction}`;
        handle.setAttribute("aria-hidden", "true");
        handle.addEventListener("pointerdown", (event) => {
          if (event.button !== 0) return;
          const bounds = dialog.getBoundingClientRect();
          resize = {
            direction,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height
          };
          handle.setPointerCapture(event.pointerId);
          window.addEventListener("pointermove", resizeDialog);
          window.addEventListener("pointerup", stopResizing);
          window.addEventListener("pointercancel", stopResizing);
          event.preventDefault();
        });
        dialog.append(handle);
      });
      dialog.addEventListener("close", stopResizing);
    }


    profileDialog.addEventListener("close", () => {
      openProfileRegistryId = null;
      saveRegistryViewState();
      profileDialog.style.position = "";
      profileDialog.style.left = "";
      profileDialog.style.top = "";
      profileDialog.style.right = "";
      profileDialog.style.bottom = "";
      profileDialog.style.margin = "";
    });

    document.querySelector(".dialog-close").addEventListener("click", () => profileDialog.close());
    profileDialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        profileDialog.close();
      }
    });
    profileDialog.addEventListener("click", (event) => {
      if (event.target === profileDialog) profileDialog.close();
    });

    function createSeededRandom(seed) {
      let state = seed >>> 0;
      return () => {
        state += 0x6d2b79f5;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      };
    }

    function randomInteger(random, minimum, maximum) {
      return Math.floor(random() * (maximum - minimum + 1)) + minimum;
    }

    function reservedDirectoryIndexes(reservedRegistryIds) {
      return [...reservedRegistryIds].map((registryId) => {
        const match = registryId.match(/^ID: (\d{4})-(\d{4})-(\d{4})$/);
        if (!match) return -1;
        const number = Number(match.slice(1).join(""));
        return number > 0 ? number - 1 : -1;
      }).filter((index) => index >= 0).sort((first, second) => first - second);
    }

    function generatedDirectoryName(config, index) {
      const firstIndex = index % config.firstNames.length;
      const lastIndex = Math.floor(index / config.firstNames.length) % config.lastNames.length;
      return `${config.lastNames[lastIndex]}, ${config.firstNames[firstIndex]}`;
    }

    function generatedDirectoryId(index) {
      let idIndex = index;
      for (const reserved of directoryReservedIndexes) {
        if (reserved > idIndex) break;
        idIndex += 1;
      }
      const digits = String(idIndex + 1).padStart(12, "0");
      return `ID: ${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
    }

    function generateDirectoryCharacter(config, index) {
      const random = createSeededRandom((config.seed ^ Math.imul(index + 1, 0x9e3779b1)) >>> 0);
      const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const month = randomInteger(random, 1, 12);
      const day = randomInteger(random, 1, daysInMonth[month - 1]);
      return {
        registryName: generatedDirectoryId(index),
        legalName: generatedDirectoryName(config, index),
        quirkName: "Unlisted",
        quirkType: "Unknown",
        Birthdate: `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        BloodType: bloodTypes[(index % config.firstNames.length) % bloodTypes.length],
        Age: String(randomInteger(random, 15, 75)),
        Role: generatedStatus(config, index % config.firstNames.length,
          generatedStatusPhase(config, Math.floor(index / config.firstNames.length) % config.lastNames.length)),
        deceased: generatedDeceased(config, index % config.firstNames.length,
          generatedStatusPhase(config, Math.floor(index / config.firstNames.length) % config.lastNames.length)),
        readOnly: true
      };
    }

    async function loadRegistry() {
      if (!allowedProjects.includes("Quirk Registry")) {
        const profile = new URLSearchParams(window.location.search).get("profile");
        window.location.replace(`../Login.html?project=Quirk%20Registry${profile ? `&profile=${encodeURIComponent(profile)}` : ""}`);
        return;
      }
      try {
        const [response, directoryResponse, heroResponse, villainResponse, chimaraResponse] = await Promise.all([
          fetch("data/json/quirk-registry.json", { cache: "no-store" }),
          fetch("data/json/generated-personnel-config.json", { cache: "no-store" }),
          fetch("../Hero%20Database/data/json/Hero-registry.json", { cache: "no-store" }),
          fetch("../Villain%20Database/data/json/Villain-registry.json", { cache: "no-store" }),
          fetch("../Chimara%20Project/data/json/chimaraproject-registery.json", { cache: "no-store" }).catch(() => null)
        ]);
        if (!response.ok || !directoryResponse.ok || !heroResponse.ok || !villainResponse.ok) {
          throw new Error(
            `Registry requests failed with status ${response.status}, ${directoryResponse.status}, ${heroResponse.status}, and ${villainResponse.status}.`
          );
        }

        const [characters, loadedDirectoryConfig, heroes, villains, chimaraRecords] = await Promise.all([
          response.json(),
          directoryResponse.json(),
          heroResponse.json(),
          villainResponse.json(),
          chimaraResponse?.ok ? chimaraResponse.json().catch(() => []) : []
        ]);
        if (!Array.isArray(characters) || !Array.isArray(heroes) || !Array.isArray(villains)) {
          throw new Error("Registry and database records must be JSON arrays.");
        }
        characters.forEach(normalizeQuirklessCharacter);
        if (!loadedDirectoryConfig ||
            typeof loadedDirectoryConfig !== "object" ||
            !Number.isInteger(loadedDirectoryConfig.count) ||
            loadedDirectoryConfig.count < 0 ||
            loadedDirectoryConfig.count > maxGeneratedCharacterCount ||
            !Number.isInteger(loadedDirectoryConfig.seed) ||
            loadedDirectoryConfig.seed < 1 ||
            loadedDirectoryConfig.seed > 4294967295 ||
            !["firstNames", "lastNames"].every((field) =>
              Array.isArray(loadedDirectoryConfig[field]) &&
              loadedDirectoryConfig[field].length > 0 &&
              loadedDirectoryConfig[field].every((name) => typeof name === "string" && name.trim())
            )) {
          throw new Error("Generated personnel config needs a count from 0 to 122,200,000, a valid seed, and non-empty first and last name lists.");
        }
        directoryConfig = loadedDirectoryConfig;
        if (!characters.every((character) =>
          character &&
          ["registryName", "legalName", "quirkName", "quirkType"].every((field) =>
            typeof character[field] === "string" && character[field].trim()
          ) &&
          character.Family &&
          typeof character.Family === "object" &&
          !Array.isArray(character.Family) &&
          typeof character.Family.Father === "string" &&
          typeof character.Family.Mother === "string" &&
          typeof character.Family.Spouse === "string" &&
          Array.isArray(character.Family.Children) &&
          character.Family.Children.every((registryId) => typeof registryId === "string") &&
          Array.isArray(character.Family.Siblings) &&
          character.Family.Siblings.every((registryId) => typeof registryId === "string") &&
          typeof character.Background === "string"
        )) {
          throw new Error("Every registry entry needs a registry name, legal name, quirk name, quirk type, and valid family fields.");
        }
        if (!heroes.every((hero) =>
          hero &&
          typeof hero.registryName === "string" && hero.registryName.trim() &&
          typeof hero.heroName === "string" && hero.heroName.trim() &&
          (hero.clearanceAccessLevel === null ||
            (Number.isInteger(hero.clearanceAccessLevel) && hero.clearanceAccessLevel >= 1 && hero.clearanceAccessLevel <= 5))
        )) {
          throw new Error("Every Hero Database record needs a registry ID, hero name, and valid clearance level.");
        }
        if (!villains.every((villain) =>
          villain &&
          typeof villain.registryName === "string" && villain.registryName.trim() &&
          typeof villain.villainName === "string" &&
          Number.isInteger(villain.clearanceAccessLevel) &&
          villain.clearanceAccessLevel >= 1 && villain.clearanceAccessLevel <= 5
        )) {
          throw new Error("Every Villain Database record needs a registry ID and valid clearance level.");
        }

        const registryIds = new Set(characters.map((character) => character.registryName));
        if (!characters.every((character) =>
          [character.Family.Father, character.Family.Mother, character.Family.Spouse, ...character.Family.Children, ...character.Family.Siblings]
            .every((entry) => !/^ID\s*:/i.test(entry.trim()) || registryIds.has(entry.trim()))
        )) {
          throw new Error("Family entries beginning with ID: must match a Quirk Registry record; other entries can be plain text.");
        }
        if (!heroes.every((hero) => registryIds.has(hero.registryName)) ||
            !villains.every((villain) => registryIds.has(villain.registryName))) {
          throw new Error("Every Hero and Villain Database record must match a Quirk Registry ID.");
        }

        registryProfilesById = new Map(characters.map((character) => [character.registryName, character]));
        heroProfilesByRegistryId = new Map(heroes.map((hero) => [hero.registryName, hero]));
        villainProfilesByRegistryId = new Map(villains.map((villain) => [villain.registryName, villain]));
        chimaraProfilesByRegistryId = new Map((Array.isArray(chimaraRecords) ? chimaraRecords : [])
          .filter((record) => record && typeof record.registryName === "string" && record.registryName.trim())
          .map((record) => [record.registryName.trim(), record]));
        directoryReservedIndexes = reservedDirectoryIndexes(registryIds);
        generatedNameExclusions = buildGeneratedNameExclusions(directoryConfig, characters);
        const totalDirectoryCount = countDirectoryEntries(directoryConfig, generatedNameExclusions, characters.length);
        sidebarDirectoryCount.textContent = totalDirectoryCount.toLocaleString();
        registryCharacters = [...characters]
          .sort((left, right) => left.registryName.localeCompare(right.registryName, undefined, { numeric: true }));
        populateFilterOptions(quirkTypeFilter, "quirkType", "All quirk types", ["Unknown"]);
        populateFilterOptions(bloodTypeFilter, "BloodType", "All blood types", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);
        registryIdFilterField.hidden = userClearance < 2;
        if (registryCharacters.length === 0 && directoryConfig.count === 0) {
          registryMessage.innerHTML = "<strong>No registry entries yet</strong>Add a personnel record to the registry data file to see it here.";
          return;
        }

        const savedState = readRegistryViewState();
        openProfileRegistryId = typeof savedState?.openProfileRegistryId === "string"
          ? savedState.openProfileRegistryId
          : null;
        if (savedState) {
          nameFilter.value = typeof savedState.name === "string" ? savedState.name : "";
          quirkFilter.value = typeof savedState.quirk === "string" ? savedState.quirk : "";
          if (registryIdFilter) {
            registryIdFilter.value = typeof savedState.registryId === "string" ? savedState.registryId : "";
          }
          if ([...quirkTypeFilter.options].some((option) => option.value === savedState.quirkType)) {
            quirkTypeFilter.value = savedState.quirkType;
          }
          if ([...bloodTypeFilter.options].some((option) => option.value === savedState.bloodType)) {
            bloodTypeFilter.value = savedState.bloodType;
          }
          const savedStatuses = Array.isArray(savedState.status) ? savedState.status :
            typeof savedState.status === "string" && savedState.status ? [savedState.status] : [];
          statusFilter.querySelectorAll("input[type='checkbox']").forEach((input) => {
            input.checked = savedStatuses.includes(input.value);
          });
          showGeneratedCharacters = savedState.showGeneratedCharacters !== false;
          currentPage = Number.isInteger(savedState.currentPage) && savedState.currentPage > 0
            ? savedState.currentPage
            : 1;
          directoryToggleButton.setAttribute("aria-pressed", String(!showGeneratedCharacters));
          directoryToggleButton.title = showGeneratedCharacters
            ? "Click to hide the randomized directory entries"
            : "Click to show the randomized directory entries";
        }

        updateRegistrySearch(false);
        currentPage = Math.min(currentPage, getTotalPages());
        renderCurrentPage();
        updatePagination();
        saveRegistryViewState();
        registryMessage.hidden = true;
        const requestedRegistryId = new URLSearchParams(window.location.search).get("profile");
        const requestedCharacter = registryCharacters.find((character) =>
          character.readOnly !== true && character.registryName === requestedRegistryId
        );
        const savedCharacter = registryCharacters.find((character) =>
          character.readOnly !== true && character.registryName === savedState?.openProfileRegistryId
        );
        const characterToRestore = requestedRegistryId
          ? requestedCharacter
          : savedCharacter;
        if (characterToRestore && userClearance >= 2) {
          openProfile(characterToRestore);
        } else {
          openProfileRegistryId = null;
          saveRegistryViewState();
        }
        if (requestedCharacter && userClearance >= 2) {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.delete("profile");
          window.history.replaceState(window.history.state, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
        }
      } catch (error) {
        console.error("Could not load the Quirk Registry:", error);
        registryMessage.classList.add("registry-error");
        registryMessage.innerHTML = "<strong>Registry unavailable</strong>Could not load personnel records. Open this page through the local web server and check the Registry, database, and generated personnel config files.";
      }
    }

    loadRegistry();
