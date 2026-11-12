    const subjectDialog = document.querySelector("#subject-dialog");
    const subjectDialogTabs = document.querySelector("#subject-dialog-tabs");
    const subjectDialogContent = document.querySelector("#subject-dialog-content");
    const subjectDialogFooter = document.querySelector("#subject-dialog-footer");
    document.querySelector("#subject-dialog-close").addEventListener("click", () => subjectDialog.close());
    let projects;
    try {
      projects = JSON.parse(sessionStorage.getItem("hpsc-project-access") || "[]");
    } catch (error) {
      console.warn("Could not read project access:", error);
    }
    if (Array.isArray(projects) && projects.includes("Chimara Project") && Number(sessionStorage.getItem("hpsc-clearance")) === 5) {
      document.querySelector("#access-denied").hidden = true;
      document.querySelector("#project-file").hidden = false;
      loadVectors();
      loadConnectedSubjects();
    }

    async function loadVectors() {
      const container = document.querySelector("#genesis-vectors");
      try {
        const response = await fetch("data/json/vectors.json", { cache: "no-store" });
        if (!response.ok) throw new Error(`Vector directory request failed (HTTP ${response.status}).`);
        const vectors = await response.json();
        if (!Array.isArray(vectors) || !vectors.every((vector) =>
          vector && typeof vector.code === "string" && vector.code.trim() &&
          typeof vector.name === "string" && vector.name.trim()
        )) throw new Error("Vector entries require a code and name.");
        if (!vectors.length) {
          container.textContent = "No vectors listed.";
          return;
        }
        const byCode = new Map();
        for (const vector of vectors) {
          const code = vector.code.trim();
          if (!/^QX-\d+(?:-[A-Za-z]+)?$/.test(code) || byCode.has(code)) throw new Error(`Invalid or duplicate vector code: ${code}.`);
          byCode.set(code, vector);
        }
        const groups = new Map();
        for (const [code, vector] of byCode) {
          const base = code.replace(/-[A-Za-z]+$/, "");
          if (!byCode.has(base)) throw new Error(`Missing base vector for ${code}.`);
          if (!groups.has(base)) groups.set(base, []);
          if (code !== base) groups.get(base).push(vector);
        }
        function vectorText(vector, className) {
          const card = document.createElement("div");
          card.className = className;
          const code = document.createElement("span");
          code.textContent = vector.code.trim();
          const name = document.createElement("strong");
          name.textContent = vector.name.trim();
          card.append(code, name);
          return card;
        }
        container.replaceChildren(...[...groups].map(([base, variants]) => {
          if (!variants.length) return vectorText(byCode.get(base), "vector-variant");
          const details = document.createElement("details");
          details.className = "vector-group";
          const summary = document.createElement("summary");
          summary.append(vectorText(byCode.get(base), "vector-card"));
          const list = document.createElement("ul");
          list.className = "vector-variants";
          for (const variant of variants) {
            const item = document.createElement("li");
            item.append(vectorText(variant, "vector-variant"));
            list.append(item);
          }
          details.append(summary, list);
          return details;
        }));
      } catch (error) {
        console.error("Could not load Genesis vectors:", error);
        const message = document.createElement("p");
        message.className = "subject-error";
        message.textContent = "Could not load the vector directory. Check the vectors data file and open the site through a local web server.";
        container.replaceChildren(message);
      }
    }

    async function loadConnectedSubjects() {
      const container = document.querySelector("#connected-subjects");
      try {
        async function loadJson(path) {
          const response = await fetch(path, { cache: "no-store" });
          if (!response.ok) throw new Error(`${path} request failed (HTTP ${response.status}).`);
          return response.json();
        }
        const [data, chimaraRecords, profiles] = await Promise.all([
          loadJson("data/json/projectgenesis.json"),
          loadJson("../Chimara%20Project/data/json/chimaraproject-registery.json"),
          loadJson("../Quirk%20Registry/data/json/quirk-registry.json")
        ]);
        if (!data || !Array.isArray(data.subjects) || !data.subjects.every((subject) =>
          subject && typeof subject === "object" &&
          typeof subject.registryName === "string" && subject.registryName.trim() &&
          ["strand", "sourceRegistryName", "description"].every((field) =>
            subject[field] === undefined || typeof subject[field] === "string")
        )) {
          throw new Error("Project Genesis subjects need a registry name and valid text fields.");
        }
        if (!Array.isArray(data.generatedSubjects) || !data.generatedSubjects.every((subject) =>
          subject && typeof subject.subjectNumber === "string" && /^\d+$/.test(subject.subjectNumber) &&
          typeof subject.legalName === "string" && subject.legalName.trim()
        )) throw new Error("Generated Genesis subjects need a subject number and legal name.");
        if (!Array.isArray(chimaraRecords) || !Array.isArray(profiles)) throw new Error("Chimara and Quirk Registry data must be arrays.");
        if (!data.subjects.length && !data.generatedSubjects.length) {
          container.textContent = "No connected subjects listed.";
          document.querySelector("#subject-search-status").textContent = "No connected subjects listed.";
          return;
        }
        const findByRegistryName = (records, registryName) =>
          records.find((item) => typeof item?.registryName === "string" && item.registryName.trim() === registryName);
        const value = (item) => typeof item === "string" || Number.isFinite(item) ? String(item).trim() : "";
        const legalName = (record, profile) => value(record?.LegalNameOverride) || value(profile?.legalName);
        const quirkName = (record, profile) => value(record?.QuirkNameOverride) || value(profile?.quirkName);
        const cards = [...data.subjects, ...data.generatedSubjects].map((subject) => {
          const registryName = value(subject.registryName);
          const record = findByRegistryName(chimaraRecords, registryName);
          const profile = findByRegistryName(profiles, registryName);
          if (registryName && !record) console.warn(`No Chimara record found for ${registryName}.`);
          if (registryName && !profile) console.warn(`No Quirk Registry profile found for ${registryName}.`);
          const sourceRegistryName = value(subject.sourceRegistryName);
          const sourceRecord = sourceRegistryName ? findByRegistryName(chimaraRecords, sourceRegistryName) : undefined;
          const sourceProfile = sourceRegistryName ? findByRegistryName(profiles, sourceRegistryName) : undefined;
          if (sourceRegistryName && !sourceRecord && !sourceProfile) console.warn(`No source record found for ${sourceRegistryName}.`);
          const sourceMissing = sourceRegistryName && !sourceRecord && !sourceProfile ? "Source record not found" : "";
          const overrides = record?.ProfileOverrides && typeof record.ProfileOverrides === "object" && !Array.isArray(record.ProfileOverrides)
            ? record.ProfileOverrides : {};
          const profileValue = (field) => value(overrides[field]) || value(profile?.[field]);
          const subjectNumber = value(record?.subjectNumber) || value(subject.subjectNumber);
          const card = document.createElement("article");
          card.className = "subject-card";
          card.dataset.registryName = registryName;
          card.dataset.subjectNumber = subjectNumber;
          const kicker = document.createElement("p");
          kicker.className = "subject-kicker";
          kicker.textContent = subjectNumber ? `Chimara subject ${subjectNumber}` : "Chimara subject not found";
          const heading = document.createElement("h3");
          heading.textContent = legalName(record, profile) || value(subject.legalName) || "Legal name unavailable";
          card.dataset.searchText = `${heading.textContent} ${value(subject.strand)}`.toLocaleLowerCase();
          card.dataset.sortName = heading.textContent;
          card.append(kicker, heading);
          const strand = document.createElement("p");
          strand.className = "subject-strand";
          const strandLabel = document.createElement("span");
          strandLabel.textContent = "Strand used";
          const strandValue = document.createElement("strong");
          strandValue.textContent = value(subject.strand) || "Not recorded";
          strand.append(strandLabel, strandValue);
          card.append(strand);
          const openButton = document.createElement("button");
          openButton.type = "button";
          openButton.className = "subject-open";
          openButton.textContent = "View details";
          openButton.setAttribute("aria-haspopup", "dialog");
          openButton.setAttribute("aria-label", `View details for ${heading.textContent}`);
          card.append(openButton);
          const strandContent = document.createDocumentFragment();
          if (value(subject.description)) {
            const description = document.createElement("p");
            description.textContent = subject.description.trim();
            strandContent.append(description);
          }
          function addFields(target, title, fields) {
            const sectionTitle = document.createElement("h3");
            sectionTitle.textContent = title;
            const list = document.createElement("dl");
            list.className = "subject-fields";
            for (const [label, fieldValue, wide] of fields) {
              const field = document.createElement("div");
              field.className = wide ? "subject-field subject-field--wide" : "subject-field";
              const term = document.createElement("dt");
              term.textContent = label;
              const description = document.createElement("dd");
              description.textContent = value(fieldValue) || "Not recorded";
              field.append(term, description);
              list.append(field);
            }
            target.append(sectionTitle, list);
          }
          const profileContent = document.createDocumentFragment();
          const quirkContent = document.createDocumentFragment();
          addFields(strandContent, "Genesis strand", [
            ["Strand used", subject.strand, true],
            ["Based on Quirk", quirkName(sourceRecord, sourceProfile) || sourceMissing],
            ["Source user", legalName(sourceRecord, sourceProfile) || sourceMissing]
          ]);
          addFields(profileContent, "Subject profile", [
            ["Registry ID", registryName], ["Status", record?.status],
            ["Birthdate", profileValue("Birthdate")], ["Age", profileValue("Age")],
            ["Blood type", profileValue("BloodType")], ["Sex", profileValue("Sex")],
            ["Pronouns", profileValue("Pronouns")], ["Height", profileValue("Height")]
          ]);
          addFields(quirkContent, "Subject Quirk", [
            ["Quirk", quirkName(record, profile)],
            ["Type", value(record?.QuirkTypeOverride) || value(profile?.quirkType)],
            ["Description", value(record?.QuirkDescriptionOverride) || value(profile?.quirkDescription), true]
          ]);
          openButton.addEventListener("click", () => {
            document.querySelector("#subject-dialog-kicker").textContent = kicker.textContent;
            document.querySelector("#subject-dialog-title").textContent = heading.textContent;
            const portraitContainer = document.querySelector("#subject-dialog-portrait");
            portraitContainer.replaceChildren();
            portraitContainer.hidden = !subjectNumber;
            if (subjectNumber) {
              portraitContainer.append(createSubjectPortrait(subjectNumber, "subject-dialog-portrait", "../Chimara%20Project/data/img"));
            }
            subjectDialogTabs.replaceChildren();
            subjectDialogContent.replaceChildren();
            subjectDialogFooter.replaceChildren();
            subjectDialogFooter.hidden = !subjectNumber;
            if (subjectNumber) {
              const link = document.createElement("a");
              link.className = "subject-link";
              link.href = registryName
                ? `../Chimara%20Project/Index.html?profile=${encodeURIComponent(registryName)}`
                : `../Chimara%20Project/Index.html?subject=${encodeURIComponent(subjectNumber)}`;
              link.textContent = `Open subject ${subjectNumber} \u2192`;
              subjectDialogFooter.append(link);
            }
            const tabButtons = [];
            const tabPanels = [];
            function selectTab(selectedIndex, moveFocus = false) {
              tabButtons.forEach((tab, index) => {
                const selected = index === selectedIndex;
                tab.setAttribute("aria-selected", String(selected));
                tab.tabIndex = selected ? 0 : -1;
                tabPanels[index].hidden = !selected;
              });
              subjectDialogContent.scrollTop = 0;
              if (moveFocus) tabButtons[selectedIndex].focus();
            }
            for (const [index, [label, content]] of [["Strand", strandContent], ["Profile", profileContent], ["Quirk", quirkContent]].entries()) {
              const button = document.createElement("button");
              button.type = "button";
              button.className = "subject-dialog-tab";
              button.id = `subject-dialog-tab-${index}`;
              button.setAttribute("role", "tab");
              button.setAttribute("aria-controls", `subject-dialog-panel-${index}`);
              button.textContent = label;
              const panel = document.createElement("section");
              panel.className = "subject-dialog-panel";
              panel.id = `subject-dialog-panel-${index}`;
              panel.setAttribute("role", "tabpanel");
              panel.setAttribute("aria-labelledby", button.id);
              panel.tabIndex = 0;
              panel.append(content.cloneNode(true));
              button.addEventListener("click", () => selectTab(index));
              button.addEventListener("keydown", (event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const nextIndex = event.key === "Home" ? 0
                  : event.key === "End" ? tabButtons.length - 1
                    : (index + (event.key === "ArrowRight" ? 1 : tabButtons.length - 1)) % tabButtons.length;
                selectTab(nextIndex, true);
              });
              tabButtons.push(button);
              tabPanels.push(panel);
              subjectDialogTabs.append(button);
              subjectDialogContent.append(panel);
            }
            selectTab(0);
            subjectDialogContent.scrollTop = 0;
            subjectDialog.showModal();
          });
          return card;
        });
        cards.sort((first, second) => first.dataset.sortName.localeCompare(second.dataset.sortName, undefined, { sensitivity: "base" }));
        container.replaceChildren(...cards);
        const search = document.querySelector("#subject-search");
        const status = document.querySelector("#subject-search-status");
        function updateSearch() {
          const query = search.value.trim().toLocaleLowerCase();
          let visible = 0;
          for (const card of cards) {
            card.hidden = !card.dataset.searchText.includes(query);
            if (!card.hidden) visible += 1;
          }
          status.textContent = visible ? `Showing ${visible} of ${cards.length} subjects.` : "No subjects match your search.";
        }
        search.addEventListener("input", updateSearch);
        updateSearch();
        const params = new URLSearchParams(window.location.search);
        const requestedProfile = params.get("profile")?.trim();
        const requestedNumber = params.get("subject")?.trim();
        if (requestedProfile || requestedNumber) {
          const requestedCard = cards.find((card) => requestedProfile
            ? card.dataset.registryName === requestedProfile
            : card.dataset.subjectNumber === requestedNumber);
          if (requestedCard) {
            requestedCard.querySelector(".subject-open").click();
          } else {
            const message = document.querySelector("#subject-link-message");
            message.textContent = "The requested subject was not found in Project Genesis.";
            message.hidden = false;
          }
        }
      } catch (error) {
        console.error("Could not load Project Genesis subjects:", error);
        const message = document.createElement("p");
        message.className = "subject-error";
        message.textContent = "Could not load connected subjects. Check the Project Genesis, Chimara, and Quirk Registry data files and open the site through a local web server.";
        container.replaceChildren(message);
        document.querySelector("#subject-search-status").textContent = "Subject search is unavailable.";
      }
    }
