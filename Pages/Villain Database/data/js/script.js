    const allowedProjects = (() => {
      try {
        const projects = JSON.parse(sessionStorage.getItem("hpsc-project-access") || "[]");
        return Array.isArray(projects) ? projects : [];
      } catch {
        return [];
      }
    })();
    const villainList = document.querySelector("#villain-list");
    const sidebarMatchCount = document.querySelector("#villain-sidebar-matches");
    const sidebarTotalCount = document.querySelector("#villain-sidebar-total");
    const sidebarFilterCount = document.querySelector("#villain-sidebar-filters");
    const searchForm = document.querySelector("#registry-filters");
    const searchInput = document.querySelector("#villain-search");
    const sortInput = document.querySelector("#villain-sort");
    const typeFilter = document.querySelector("#villain-type");
    const clearanceFilter = document.querySelector("#villain-clearance");
    const statusFilter = document.querySelector("#villain-status");
    const searchEmpty = document.querySelector("#search-empty");
    const registryMessage = document.querySelector("#registry-message");
    const profileDialog = document.querySelector("#profile-dialog");
    const registryRecordLink = document.querySelector("#registry-record-link");
    const chimaraRecordLink = document.querySelector("#chimara-record-link");
    const dialogHeader = profileDialog.querySelector(".dialog-header");
    const dialogPages = [...document.querySelectorAll(".dialog-page")];
    const pageNavigationButtons = [...document.querySelectorAll(".dialog-page-nav button")];
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
    let villainRecords = [];
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

    function appendRecordText(selector, value) {
      appendFormattedText(document.querySelector(selector), value || "Not provided.");
    }

    function clearanceDescription(level) {
      return Number.isInteger(level) && clearanceLabels[level]
        ? `Level ${level} · ${clearanceLabels[level]}`
        : "Not assigned";
    }

    function canOpenProfile(villain) {
      return Number.isInteger(villain.clearanceAccessLevel) &&
        villain.clearanceAccessLevel >= 1 &&
        villain.clearanceAccessLevel <= 5 &&
        userClearance >= villain.clearanceAccessLevel;
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

    function createPortrait(villainName, legalName, variant = "dialog") {
      const isCard = variant === "card";
      const wrapper = document.createElement("div");
      wrapper.className = isCard ? "villain-card-portrait-wrap" : "dialog-portrait-wrap";
      if (!isCard) wrapper.id = "dialog-portrait-wrap";
      const image = document.createElement("img");
      image.className = isCard ? "villain-card-portrait" : "dialog-portrait";
      image.alt = `Portrait of ${legalName}`;
      image.onerror = () => {
        const placeholder = document.createElement("div");
        placeholder.className = isCard ? "villain-card-portrait-placeholder" : "dialog-portrait-placeholder";
        placeholder.setAttribute("aria-label", "Portrait unavailable");
        placeholder.textContent = villainName.charAt(0).toUpperCase();
        image.onerror = null;
        image.replaceWith(placeholder);
      };
      const fileStem = villainName.replace(/[^A-Za-z0-9_-]/g, "");
      image.src = `data/img/${encodeURIComponent(fileStem)}.png`;
      wrapper.append(image);
      return wrapper;
    }

    function openProfile(villain) {
      if (!canOpenProfile(villain)) return;
      appendFormattedText(document.querySelector("#dialog-name"), villain.villainName || villain.legalName);
      document.querySelector("#dialog-portrait-wrap").replaceWith(createPortrait(villain.villainName || villain.legalName, villain.legalName));
      const fields = document.querySelector("#dialog-fields");
      fields.replaceChildren();
      const primaryFields = document.querySelector("#dialog-primary-fields");
      primaryFields.replaceChildren();
      appendDialogField(primaryFields, "Registry ID", villain.registryName);
      appendDialogField(primaryFields, "Villain alias", villain.villainName);
      appendDialogField(primaryFields, "Clearance access level", clearanceDescription(villain.clearanceAccessLevel))
        .className = "dialog-field--clearance";
      appendDialogField(fields, "Legal name", villain.legalName);
      appendDialogField(fields, "Date of birth", villain.Birthdate);
      appendDialogField(fields, "Age", villain.Age);
      appendDialogField(fields, "Height", villain.Height);
      appendDialogField(fields, "Blood type", villain.BloodType);
      appendDialogField(fields, "Sex", villain.Sex);
      appendDialogField(fields, "Pronouns", villain.Pronouns);
      appendFormattedText(document.querySelector("#dialog-quirk-heading"), villain.quirkName || "Quirk assessment");
      appendFormattedText(document.querySelector("#dialog-quirk-type"), villain.quirkType || "");
      appendRecordText("#dialog-description", villain.quirkDescription);
      const quirkAllowed = allowedProjects.includes("Quirk Registry");
      setConnectedLink(registryRecordLink, "Quirk Registry", "Matching personnel record",
        `../Quirk%20Registry/Index.html?profile=${encodeURIComponent(villain.registryName)}`,
        quirkAllowed && userClearance >= 2, quirkAllowed ? "Clearance 2 required" : "Project access required");
      const chimara = chimaraProfilesById.get(villain.registryName.trim());
      const chimaraAllowed = allowedProjects.includes("Chimara Project");
      chimaraRecordLink.hidden = !chimara;
      if (chimara) {
        const requiredClearance = Number(chimara.ClearanceLevel);
        const reason = chimaraAllowed
          ? Number.isInteger(requiredClearance) && requiredClearance >= 1 && requiredClearance <= 5
            ? `Clearance ${requiredClearance} required` : "Clearance not assigned"
          : "Project access required";
        setConnectedLink(chimaraRecordLink, "Chimara Project", `Subject ${chimara.subjectNumber}`,
          `../Chimara%20Project/Index.html?profile=${encodeURIComponent(villain.registryName)}`,
          chimaraAllowed && canOpenChimaraProfile(chimara), reason);
      }
      appendRecordText("#threat-level", villain.threatLevel);
      appendRecordText("#threat-summary", villain.threatSummary);
      appendRecordText("#combat-style", villain.combatstyle);
      appendRecordText("#combat-tools", villain.combattools);
      appendRecordText("#combat-moves", villain.Moves);
      appendRecordText("#affiliations", villain.affiliations);
      appendRecordText("#known-associates", villain.knownAssociates);
      appendRecordText("#known-locations", villain.knownLocations);
      appendRecordText("#current-incidents", villain.currentIncidents);
      appendRecordText("#incident-location", villain.incidentLocation);
      appendRecordText("#incident-briefing", villain.incidentBriefing);
      appendRecordText("#dialog-background", villain.background);
      showPopupPage("personal");
      profileDialog.showModal();
    }

    function showPopupPage(pageName) {
      dialogPages.forEach((page) => {
        page.hidden = page.id !== (pageName === "connected" ? "connected-pages" : `${pageName}-page`);
      });
      pageNavigationButtons.forEach((button) => {
        if (button.dataset.page === pageName) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      document.querySelector(".dialog-pages").scrollTop = 0;
    }

    pageNavigationButtons.forEach((button) => {
      button.addEventListener("click", () => showPopupPage(button.dataset.page));
    });

    function renderVillain(villain) {
      const card = document.createElement("article");
      const hasFileAccess = canOpenProfile(villain);
      const displayName = villain.villainName || villain.legalName;
      card.className = hasFileAccess ? "villain-card" : "villain-card villain-card--restricted";
      card.tabIndex = hasFileAccess ? 0 : -1;
      card.setAttribute("role", hasFileAccess ? "button" : "article");
      card.setAttribute("aria-disabled", String(!hasFileAccess));
      card.setAttribute("aria-label", hasFileAccess
        ? `Open villain file for ${displayName}`
        : `Restricted villain file for ${displayName}; clearance ${villain.clearanceAccessLevel || "not assigned"} required`);
      if (hasFileAccess) {
        card.addEventListener("click", () => openProfile(villain));
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProfile(villain);
          }
        });
      }

      const name = document.createElement("h2");
      name.textContent = displayName;
      const info = document.createElement("div");
      info.className = "registry-card-meta";
      for (const [fieldLabel, value] of [["Quirk", villain.quirkName], ["Type", villain.quirkType], ["Clearance", villain.clearanceAccessLevel]]) {
        const item = document.createElement("span");
        item.className = "registry-card-meta-item";
        const heading = document.createElement("strong");
        heading.textContent = fieldLabel;
        item.append(heading, document.createTextNode(value || "Not listed"));
        info.append(item);
      }
      if (!hasFileAccess) {
        const restriction = document.createElement("span");
        restriction.className = "registry-card-restriction";
        restriction.textContent = `Clearance ${villain.clearanceAccessLevel || "not assigned"} required`;
        info.append(restriction);
      }
      if (villain.legalName) name.title = `Legal name: ${villain.legalName}`;
      card.append(name, createPortrait(villain.villainName || villain.legalName, villain.legalName, "card"), info);
      villainList.append(card);
    }

    function legalNameSearchValues(legalName) {
      if (typeof legalName !== "string") return [];
      const nameParts = legalName.split(",").map((part) => part.trim());
      return nameParts.length === 2
        ? [legalName, nameParts.join(" "), nameParts.reverse().join(" ")]
        : [legalName];
    }

    function renderFilteredVillains() {
      const query = searchInput.value.trim().toLocaleLowerCase();
      const results = villainRecords.filter((villain) =>
        [villain.villainName, ...legalNameSearchValues(villain.legalName), villain.quirkName]
          .some((value) => typeof value === "string" && value.toLocaleLowerCase().includes(query)) &&
        (!typeFilter.value || villain.quirkType === typeFilter.value) &&
        (!clearanceFilter.value || String(villain.clearanceAccessLevel) === clearanceFilter.value) &&
        (!statusFilter.value || villain.Status === statusFilter.value)
      );
      if (sortInput.value.startsWith("name-")) results.sort((left, right) => (left.villainName || left.legalName).localeCompare(right.villainName || right.legalName) * (sortInput.value === "name-desc" ? -1 : 1));
      if (sortInput.value.startsWith("clearance-")) results.sort((left, right) => (left.clearanceAccessLevel - right.clearanceAccessLevel) * (sortInput.value === "clearance-desc" ? -1 : 1));
      villainList.replaceChildren();
      results.forEach(renderVillain);
      searchEmpty.hidden = results.length !== 0;
      const activeFilterCount = [
        searchInput.value.trim(),
        typeFilter.value,
        clearanceFilter.value,
        statusFilter.value
      ].filter(Boolean).length;
      sidebarMatchCount.textContent = results.length.toLocaleString();
      sidebarTotalCount.textContent = villainRecords.length.toLocaleString();
      sidebarFilterCount.textContent = activeFilterCount === 0 ? "None" : activeFilterCount.toLocaleString();
    }

    searchForm.addEventListener("input", renderFilteredVillains);
    searchForm.addEventListener("submit", (event) => event.preventDefault());
    document.querySelector("#villain-reset").addEventListener("click", () => {
      searchForm.reset();
      renderFilteredVillains();
    });
    function makeDialogDraggable(dialog, handle) {
      let drag = null;
      function startDrag(event) {
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
      }
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
        const left = Math.min(maxLeft, Math.max(0, drag.startLeft + deltaX));
        const top = Math.min(maxTop, Math.max(0, drag.startTop + deltaY));
        dialog.style.left = `${left}px`;
        dialog.style.top = `${top}px`;
        event.preventDefault();
      }
      function endDrag() {
        drag = null;
        window.removeEventListener("pointermove", moveDrag);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
      }

      handle.addEventListener("pointerdown", startDrag);
      dialog.addEventListener("close", () => {
        endDrag();
        dialog.style.position = "";
        dialog.style.left = "";
        dialog.style.top = "";
        dialog.style.right = "";
        dialog.style.bottom = "";
        dialog.style.margin = "";
      });
    }

    function makeDialogResizable(dialog) {
      const directions = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
      let resize = null;

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

      function resizeDialog(event) {
        if (!resize || event.pointerId !== resize.pointerId) return;
        const deltaX = event.clientX - resize.startX;
        const deltaY = event.clientY - resize.startY;
        const minWidth = Math.min(320, window.innerWidth - 20);
        const minHeight = Math.min(360, window.innerHeight - 20);
        let left = resize.left;
        let top = resize.top;
        let width = resize.width;
        let height = resize.height;

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

      dialog.addEventListener("close", () => {
        stopResizing();
      });
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
      if (!allowedProjects.includes("Villain Database")) {
        const profile = new URLSearchParams(window.location.search).get("profile");
        window.location.replace(`../Login.html?project=Villain%20Database${profile ? `&profile=${encodeURIComponent(profile)}` : ""}`);
        return;
      }
      try {
        const [villainResponse, quirkResponse, chimaraResponse] = await Promise.all([
          fetch("data/json/Villain-registry.json", { cache: "no-store" }),
          fetch("../Quirk%20Registry/data/json/quirk-registry.json", { cache: "no-store" }),
          fetch("../Chimara%20Project/data/json/chimaraproject-registery.json", { cache: "no-store" }).catch(() => null)
        ]);
        if (!villainResponse.ok || !quirkResponse.ok) {
          throw new Error(`Registry requests failed with status ${villainResponse.status} and ${quirkResponse.status}.`);
        }
        const [villains, quirkRecords, chimaraRecords] = await Promise.all([
          villainResponse.json(), quirkResponse.json(), chimaraResponse?.ok ? chimaraResponse.json().catch(() => []) : []
        ]);
        if (!Array.isArray(villains) || !Array.isArray(quirkRecords)) {
          throw new Error("Villain and Quirk Registry data must be JSON arrays.");
        }
        const recordsById = new Map(quirkRecords.map((record) => [record.registryName, record]));
        if (!villains.every((villain) =>
          villain &&
          typeof villain.registryName === "string" && villain.registryName.trim() &&
          (villain.villainName === "" || typeof villain.villainName === "string") &&
          typeof villain.background === "string" &&
          Number.isInteger(villain.clearanceAccessLevel) &&
          villain.clearanceAccessLevel >= 1 && villain.clearanceAccessLevel <= 5 &&
          recordsById.has(villain.registryName)
        )) {
          throw new Error("Each villain needs a matching Quirk Registry ID and a valid clearance access level.");
        }
        chimaraProfilesById = new Map((Array.isArray(chimaraRecords) ? chimaraRecords : [])
          .filter((record) => record && typeof record.registryName === "string" && record.registryName.trim())
          .map((record) => [record.registryName.trim(), record]));
        villainRecords = villains
          .map((villain) => ({ ...recordsById.get(villain.registryName), ...villain }))
          .sort((left, right) =>
            (left.villainName || left.legalName).localeCompare(right.villainName || right.legalName)
          );
        if (!villainRecords.length) {
          registryMessage.innerHTML = "<strong>No villain records yet</strong>Add an entry to the Villain Registry data file to see it here.";
          return;
        }
        for (const [select, field] of [[typeFilter, "quirkType"], [statusFilter, "Status"]]) {
          [...new Set(villainRecords.map((villain) => villain[field]).filter((value) => typeof value === "string" && value.trim()))]
            .sort((left, right) => left.localeCompare(right)).forEach((value) => select.add(new Option(value, value)));
        }
        renderFilteredVillains();
        registryMessage.hidden = true;
        const requestedProfileId = new URLSearchParams(window.location.search).get("profile");
        const requestedProfile = villainRecords.find((villain) => villain.registryName === requestedProfileId);
        if (requestedProfile && canOpenProfile(requestedProfile)) {
          openProfile(requestedProfile);
        } else if (requestedProfile) {
          registryMessage.hidden = false;
          registryMessage.classList.add("registry-error");
          registryMessage.innerHTML = "<strong>Restricted profile</strong>Your clearance does not permit access to this villain file.";
        }
      } catch (error) {
        console.error("Could not load the Villain Database:", error);
        registryMessage.classList.add("registry-error");
        registryMessage.innerHTML = "<strong>Registry unavailable</strong>Could not load villain records. Open this page through the local web server and check both registry JSON files.";
      }
    }

    loadRegistry();
