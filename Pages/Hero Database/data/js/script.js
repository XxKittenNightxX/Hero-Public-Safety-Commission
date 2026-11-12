const allowedProjects = (() => {
      try {
        const projects = JSON.parse(sessionStorage.getItem("hpsc-project-access") || "[]");
        return Array.isArray(projects) ? projects : [];
      } catch {
        return [];
      }
    })();
    const heroList = document.querySelector("#hero-list");
    const sidebarMatchCount = document.querySelector("#hero-sidebar-matches");
    const sidebarTotalCount = document.querySelector("#hero-sidebar-total");
    const sidebarFilterCount = document.querySelector("#hero-sidebar-filters");
    const searchForm = document.querySelector("#registry-filters");
    const searchInput = document.querySelector("#hero-search");
    const sortInput = document.querySelector("#hero-sort");
    const typeFilter = document.querySelector("#hero-type");
    const clearanceFilter = document.querySelector("#hero-clearance");
    const statusFilter = document.querySelector("#hero-status");
    const searchEmpty = document.querySelector("#search-empty");
    const registryMessage = document.querySelector("#registry-message");
    const profileDialog = document.querySelector("#profile-dialog");
    const registryRecordLink = document.querySelector("#registry-record-link");
    const chimaraRecordLink = document.querySelector("#chimara-record-link");
    const dialogHeader = profileDialog.querySelector(".dialog-header");
    const dialogPages = [...document.querySelectorAll(".dialog-page")];
    const pageNavigationButtons = [...document.querySelectorAll(".dialog-page-nav button")];
    let activeHero = null;
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
    let heroRecords = [];
    let chimaraProfilesById = new Map();

    function appendFormattedText(element, value) {
      element.replaceChildren();
      const parts = String(value).split(/(\*\*[\s\S]+?\*\*)/g);
      parts.forEach((part) => {
        const isBold = part.startsWith("**") && part.endsWith("**");
        const text = isBold ? part.slice(2, -2) : part;
        const target = isBold ? document.createElement("strong") : element;
        text.split("\n").forEach((line, index) => {
          if (index > 0) target.append(document.createElement("br"));
          target.append(document.createTextNode(line));
        });
        if (isBold) element.append(target);
      });
    }

    function appendDialogField(fields, label, value) {
      if (value === null || value === undefined || value === "") return;
      const wrapper = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      appendFormattedText(description, value);
      wrapper.append(term, description);
      fields.append(wrapper);
      return wrapper;
    }

    function clearanceDescription(level) {
      return Number.isInteger(level) && clearanceLabels[level]
        ? `Level ${level} · ${clearanceLabels[level]}`
        : "Not assigned";
    }

    function canOpenProfile(hero) {
      return Number.isInteger(hero.clearanceAccessLevel) &&
        hero.clearanceAccessLevel >= 1 &&
        hero.clearanceAccessLevel <= 5 &&
        userClearance >= hero.clearanceAccessLevel;
    }

    function canOpenChimaraProfile(record) {
      const requiredClearance = Number(record?.ClearanceLevel);
      return Number.isInteger(requiredClearance) && requiredClearance >= 1 && requiredClearance <= 5 &&
        userClearance >= requiredClearance;
    }

    function setConnectedLink(link, titleText, descriptionText, href, accessible, reason) {
      const copy = document.createElement("span");
      copy.className = "connected-page-copy";
      const title = document.createElement("strong");
      title.className = "connected-page-title";
      title.textContent = titleText;
      const description = document.createElement("small");
      description.className = "connected-page-description";
      description.textContent = accessible ? descriptionText : reason;
      copy.append(title, description);
      link.replaceChildren(copy);
      if (accessible) {
        link.href = href;
        link.setAttribute("aria-label", `Open ${titleText}`);
        link.removeAttribute("aria-disabled");
        link.removeAttribute("role");
        link.removeAttribute("tabindex");
      } else {
        link.removeAttribute("href");
        link.setAttribute("role", "link");
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("aria-label", `${titleText}: ${reason}`);
        link.tabIndex = 0;
      }
    }

    function createPortrait(heroName, variant = "dialog") {
      const isCard = variant === "card";
      const wrapper = document.createElement("div");
      wrapper.className = isCard ? "hero-card-portrait-wrap" : "dialog-portrait-wrap";
      if (!isCard) wrapper.setAttribute("id", "dialog-portrait-wrap");

      const image = document.createElement("img");
      const fileStem = encodeURIComponent(heroName.replace(/\s+/g, ""));
      const extensions = [".png", ".webp", ".jpg", ".jpeg"];
      let extensionIndex = 0;
      image.className = isCard ? "hero-card-portrait" : "dialog-portrait";
      image.alt = `Portrait of ${heroName}`;
      image.onerror = () => {
        extensionIndex += 1;
        if (extensionIndex < extensions.length) {
          image.src = `data/img/${fileStem}${extensions[extensionIndex]}`;
          return;
        }

        const placeholder = document.createElement("div");
        placeholder.className = isCard ? "hero-card-portrait-placeholder" : "dialog-portrait-placeholder";
        placeholder.setAttribute("aria-label", "Portrait unavailable");
        placeholder.textContent = heroName.charAt(0).toUpperCase();
        image.onerror = null;
        image.replaceWith(placeholder);
      };
      image.src = `data/img/${fileStem}${extensions[extensionIndex]}`;
      wrapper.append(image);
      return wrapper;
    }

    function openProfile(hero) {
      if (!canOpenProfile(hero)) return;
      appendFormattedText(document.querySelector("#dialog-name"), hero.heroName);
      document.querySelector("#dialog-portrait-wrap").replaceWith(createPortrait(hero.heroName));
      const fields = document.querySelector("#dialog-fields");
      fields.replaceChildren();
      const primaryFields = document.querySelector("#dialog-primary-fields");
      primaryFields.replaceChildren();
      appendDialogField(primaryFields, "Registry ID", hero.registryName);
      appendDialogField(primaryFields, "Legal name", hero.legalName);
      appendDialogField(primaryFields, "Clearance access level", clearanceDescription(hero.clearanceAccessLevel))
        .className = "dialog-field--clearance";
      appendDialogField(fields, "Date of birth", hero.Birthdate);
      appendDialogField(fields, "Age", hero.Age);
      appendDialogField(fields, "Height", hero.Height);
      appendDialogField(fields, "Blood type", hero.BloodType);
      appendDialogField(fields, "Sex", hero.Sex);
      appendDialogField(fields, "Pronouns", hero.Pronouns);
      appendFormattedText(
        document.querySelector("#dialog-quirk-heading"),
        hero.quirkName || "Quirk assessment"
      );
      appendFormattedText(document.querySelector("#dialog-quirk-type"), hero.quirkType || "");
      appendFormattedText(
        document.querySelector("#dialog-description"),
        hero.quirkDescription || "No assessment is currently available."
      );
      const quirkAllowed = allowedProjects.includes("Quirk Registry");
      setConnectedLink(registryRecordLink, "Quirk Registry", "Matching personnel record",
        `../Quirk%20Registry/Index.html?profile=${encodeURIComponent(hero.registryName)}`,
        quirkAllowed && userClearance >= 2, quirkAllowed ? "Clearance 2 required" : "Project access required");
      const chimara = chimaraProfilesById.get(hero.registryName.trim());
      const chimaraAllowed = allowedProjects.includes("Chimara Project");
      chimaraRecordLink.hidden = !chimara;
      if (chimara) {
        const requiredClearance = Number(chimara.ClearanceLevel);
        const reason = chimaraAllowed
          ? Number.isInteger(requiredClearance) && requiredClearance >= 1 && requiredClearance <= 5
            ? `Clearance ${requiredClearance} required` : "Clearance not assigned"
          : "Project access required";
        setConnectedLink(chimaraRecordLink, "Chimara Project", `Subject ${chimara.subjectNumber}`,
          `../Chimara%20Project/Index.html?profile=${encodeURIComponent(hero.registryName)}`,
          chimaraAllowed && canOpenChimaraProfile(chimara), reason);
      }
      appendFormattedText(document.querySelector("#combat-style"), hero.combatstyle || "Not provided.");
      appendFormattedText(document.querySelector("#combat-tools"), hero.combattools || "Not provided.");
      appendFormattedText(document.querySelector("#combat-moves"), hero.Moves || "Not provided.");
      appendFormattedText(document.querySelector("#training-goals"), hero.trainingGoals || "Not provided.");
      appendFormattedText(document.querySelector("#completed-training"), hero.completedTraining || "Not provided.");
      appendFormattedText(document.querySelector("#certifications"), hero.certifications || "Not provided.");
      appendFormattedText(document.querySelector("#training-notes"), hero.trainingNotes || "Not provided.");
      appendFormattedText(document.querySelector("#current-jobs"), hero.currentJobs || "Not provided.");
      appendFormattedText(document.querySelector("#mission-status"), hero.missionStatus || "Not provided.");
      appendFormattedText(document.querySelector("#mission-location"), hero.missionLocation || "Not provided.");
      appendFormattedText(document.querySelector("#mission-briefing"), hero.missionBriefing || "Not provided.");
      activeHero = hero;
      showPopupPage("personal");
      profileDialog.showModal();
    }

    function showPopupPage(pageName) {
      dialogPages.forEach((page) => {
        page.hidden = page.id !== (pageName === "connected" ? "connected-pages" : `${pageName}-page`);
      });
      pageNavigationButtons.forEach((button) => {
        if (button.dataset.page === pageName) {
          button.setAttribute("aria-current", "page");
        } else {
          button.removeAttribute("aria-current");
        }
      });
      document.querySelector(".dialog-pages").scrollTop = 0;
    }

    pageNavigationButtons.forEach((button) => {
      button.addEventListener("click", () => showPopupPage(button.dataset.page));
    });

    function renderHero(hero) {
      const card = document.createElement("article");
      const hasFileAccess = canOpenProfile(hero);
      card.className = hasFileAccess ? "hero-card" : "hero-card hero-card--restricted";
      card.tabIndex = hasFileAccess ? 0 : -1;
      card.setAttribute("role", hasFileAccess ? "button" : "article");
      card.setAttribute("aria-disabled", String(!hasFileAccess));
      card.setAttribute("aria-label", hasFileAccess
        ? `Open hero file for ${hero.heroName}`
        : `Restricted hero file for ${hero.heroName}; clearance ${hero.clearanceAccessLevel || "not assigned"} required`);
      if (hasFileAccess) {
        card.addEventListener("click", () => openProfile(hero));
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProfile(hero);
          }
        });
      }

      const status = typeof hero.Status === "string" ? hero.Status : "";
      const isInTraining = /in[\s-]*training/i.test(status);
      const name = document.createElement("h2");
      name.textContent = hero.heroName;
      const nameRow = document.createElement("div");
      nameRow.className = "hero-card-name-row";
      nameRow.append(name);
      const info = document.createElement("div");
      info.className = "registry-card-meta";
      for (const [fieldLabel, value] of [["Quirk", hero.quirkName], ["Type", hero.quirkType], ["Clearance", hero.clearanceAccessLevel]]) {
        const item = document.createElement("span");
        item.className = "registry-card-meta-item";
        const heading = document.createElement("strong");
        heading.textContent = fieldLabel;
        item.append(heading, document.createTextNode(value ?? "Not assigned"));
        if (fieldLabel === "Clearance" && isInTraining) {
          const note = document.createElement("small");
          note.className = "registry-card-meta-note";
          note.textContent = "In Training";
          item.append(note);
        }
        info.append(item);
      }
      if (!hasFileAccess) {
        const restriction = document.createElement("span");
        restriction.className = "registry-card-restriction";
        restriction.textContent = `Clearance ${hero.clearanceAccessLevel || "not assigned"} required`;
        info.append(restriction);
      }
      if (hasFileAccess && hero.legalName) nameRow.title = `Legal name: ${hero.legalName}`;
      card.append(nameRow, createPortrait(hero.heroName, "card"), info);
      heroList.append(card);
    }

    function legalNameSearchValues(legalName) {
      if (typeof legalName !== "string") return [];
      const nameParts = legalName.split(",").map((part) => part.trim());
      return nameParts.length === 2
        ? [legalName, nameParts.join(" "), nameParts.reverse().join(" ")]
        : [legalName];
    }

    function renderFilteredHeroes() {
      const query = searchInput.value.trim().toLocaleLowerCase();
      const results = heroRecords.filter((hero) =>
        [hero.heroName, ...legalNameSearchValues(hero.legalName), hero.quirkName]
          .some((value) => typeof value === "string" && value.toLocaleLowerCase().includes(query)) &&
        (!typeFilter.value || hero.quirkType === typeFilter.value) &&
        (!clearanceFilter.value || String(hero.clearanceAccessLevel) === clearanceFilter.value) &&
        (!statusFilter.value || hero.Status === statusFilter.value)
      );
      if (sortInput.value.startsWith("name-")) results.sort((left, right) => left.heroName.localeCompare(right.heroName) * (sortInput.value === "name-desc" ? -1 : 1));
      if (sortInput.value.startsWith("clearance-")) results.sort((left, right) => ((left.clearanceAccessLevel ?? 0) - (right.clearanceAccessLevel ?? 0)) * (sortInput.value === "clearance-desc" ? -1 : 1));
      heroList.replaceChildren();
      results.forEach(renderHero);
      searchEmpty.hidden = results.length !== 0;
      const activeFilterCount = [
        searchInput.value.trim(),
        typeFilter.value,
        clearanceFilter.value,
        statusFilter.value
      ].filter(Boolean).length;
      sidebarMatchCount.textContent = results.length.toLocaleString();
      sidebarTotalCount.textContent = heroRecords.length.toLocaleString();
      sidebarFilterCount.textContent = activeFilterCount === 0 ? "None" : activeFilterCount.toLocaleString();
    }

    searchForm.addEventListener("input", renderFilteredHeroes);
    searchForm.addEventListener("submit", (event) => event.preventDefault());
    document.querySelector("#hero-reset").addEventListener("click", () => {
      searchForm.reset();
      renderFilteredHeroes();
    });
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


    const pagePopups = new Set();
    function openPagePopup(pageName) {
      const sourcePage = document.querySelector(`#${pageName}-page`);
      const pageTitle = sourcePage.querySelector(".dialog-page-heading").textContent;
      const name = document.querySelector("#dialog-name").textContent;
      const popup = document.createElement("dialog");
      popup.className = "profile-dialog profile-page-popup";
      popup.setAttribute("aria-label", `${name} — ${pageTitle}`);

      const topline = document.createElement("div");
      topline.className = "dialog-topline";
      const header = document.createElement("div");
      header.className = "dialog-header";
      const identity = document.createElement("div");
      identity.className = "dialog-identity";
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = `Hero Public Safety Commission · ${pageTitle}`;
      const heading = document.createElement("h2");
      heading.textContent = name;
      identity.append(eyebrow, heading);
      const closeButton = document.createElement("button");
      closeButton.className = "dialog-close";
      closeButton.type = "button";
      closeButton.setAttribute("aria-label", `Close ${pageTitle}`);
      closeButton.textContent = "×";
      header.append(identity, closeButton);

      const pages = document.createElement("div");
      pages.className = "dialog-pages";
      const page = sourcePage.cloneNode(true);
      page.hidden = false;
      page.removeAttribute("id");
      page.setAttribute("aria-label", pageTitle);
      page.removeAttribute("aria-labelledby");
      page.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      page.querySelectorAll("[aria-labelledby]").forEach((element) => element.removeAttribute("aria-labelledby"));
      pages.append(page);
      popup.append(topline, header, pages);
      profileDialog.append(popup);

      makeDialogDraggable(popup, header);
      makeDialogResizable(popup);
      pagePopups.add(popup);
      popup.addEventListener("close", () => {
        pagePopups.delete(popup);
        popup.remove();
      });
      closeButton.addEventListener("click", () => popup.close());
      popup.show();
      const mainBounds = profileDialog.getBoundingClientRect();
      const popupBounds = popup.getBoundingClientRect();
      popup.style.position = "fixed";
      popup.style.left = `${Math.max(10, Math.min(window.innerWidth - popupBounds.width - 10, mainBounds.right + 10))}px`;
      popup.style.top = `${Math.max(10, Math.min(window.innerHeight - popupBounds.height - 10, mainBounds.top + ((pagePopups.size - 1) % 5) * 28))}px`;
      popup.style.right = "auto";
      popup.style.bottom = "auto";
      popup.style.margin = "0";
    }

    profileDialog.addEventListener("close", () => {
      [...pagePopups].forEach((popup) => popup.close());
    });

    document.querySelector(".dialog-close").addEventListener("click", () => profileDialog.close());
    profileDialog.addEventListener("click", (event) => {
      if (event.target === profileDialog) profileDialog.close();
    });

    async function loadRegistry() {
      if (!allowedProjects.includes("Hero Database")) {
        const profile = new URLSearchParams(window.location.search).get("profile");
        window.location.replace(`../Login.html?project=Hero%20Database${profile ? `&profile=${encodeURIComponent(profile)}` : ""}`);
        return;
      }
      try {
        const [heroResponse, quirkResponse, chimaraResponse] = await Promise.all([
          fetch("data/json/Hero-registry.json", { cache: "no-store" }),
          fetch("../Quirk%20Registry/data/json/quirk-registry.json", { cache: "no-store" }),
          fetch("../Chimara%20Project/data/json/chimaraproject-registery.json", { cache: "no-store" }).catch(() => null)
        ]);
        if (!heroResponse.ok || !quirkResponse.ok) {
          throw new Error(`Registry requests failed with status ${heroResponse.status} and ${quirkResponse.status}.`);
        }

        const [heroes, quirkRecords, chimaraRecords] = await Promise.all([
          heroResponse.json(), quirkResponse.json(), chimaraResponse?.ok ? chimaraResponse.json().catch(() => []) : []
        ]);
        if (!Array.isArray(heroes) || !Array.isArray(quirkRecords)) {
          throw new Error("Hero and Quirk Registry data must be JSON arrays.");
        }
        const quirkRecordsById = new Map(quirkRecords.map((record) => [record.registryName, record]));
        if (!heroes.every((hero) =>
          hero &&
          typeof hero.registryName === "string" && hero.registryName.trim() &&
          typeof hero.heroName === "string" && hero.heroName.trim() &&
          (hero.clearanceAccessLevel === null ||
            (Number.isInteger(hero.clearanceAccessLevel) && hero.clearanceAccessLevel >= 1 && hero.clearanceAccessLevel <= 5)) &&
          quirkRecordsById.has(hero.registryName)
        )) {
          throw new Error("Each hero needs a matching Quirk Registry ID, hero name, and valid clearance access level.");
        }

        chimaraProfilesById = new Map((Array.isArray(chimaraRecords) ? chimaraRecords : [])
          .filter((record) => record && typeof record.registryName === "string" && record.registryName.trim())
          .map((record) => [record.registryName.trim(), record]));
        heroRecords = heroes.map((hero) => ({ ...quirkRecordsById.get(hero.registryName), ...hero }));
        for (const [select, field] of [[typeFilter, "quirkType"], [statusFilter, "Status"]]) {
          [...new Set(heroRecords.map((hero) => hero[field]).filter((value) => typeof value === "string" && value.trim()))]
            .sort((left, right) => left.localeCompare(right)).forEach((value) => select.add(new Option(value, value)));
        }
        renderFilteredHeroes();
        registryMessage.hidden = true;
        const requestedProfileId = new URLSearchParams(window.location.search).get("profile");
        const requestedProfile = heroRecords.find((hero) => hero.registryName === requestedProfileId);
        if (requestedProfile && canOpenProfile(requestedProfile)) {
          openProfile(requestedProfile);
        } else if (requestedProfile) {
          registryMessage.hidden = false;
          registryMessage.classList.add("registry-error");
          registryMessage.innerHTML = "<strong>Restricted profile</strong>Your clearance does not permit access to this hero file.";
        }
      } catch (error) {
        console.error("Could not load the Hero Database:", error);
        registryMessage.classList.add("registry-error");
        registryMessage.innerHTML = "<strong>Registry unavailable</strong>Could not load hero records. Open this page through the local web server and check both registry JSON files.";
      }
    }

    loadRegistry();