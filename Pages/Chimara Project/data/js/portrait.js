function createSubjectPortrait(subjectNumber, wrapperClass, imageDirectory = "data/img") {
  const portraitWrap = document.createElement("div");
  portraitWrap.className = wrapperClass;
  const portrait = document.createElement("img");
  portrait.className = "member-portrait";
  portrait.alt = `Portrait for subject ${subjectNumber}`;
  portrait.loading = "lazy";
  const imageExtensions = ["png", "webp", "jpg", "jpeg", "gif"];
  let extensionIndex = 0;
  portrait.addEventListener("error", () => {
    extensionIndex += 1;
    if (extensionIndex < imageExtensions.length) {
      portrait.src = `${imageDirectory}/${encodeURIComponent(subjectNumber)}.${imageExtensions[extensionIndex]}`;
      return;
    }
    const placeholder = document.createElement("div");
    placeholder.className = "member-portrait-placeholder";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", `Portrait unavailable for subject ${subjectNumber}`);
    const placeholderNumber = document.createElement("strong");
    placeholderNumber.textContent = subjectNumber;
    const placeholderLabel = document.createElement("span");
    placeholderLabel.textContent = "Portrait unavailable";
    placeholder.append(placeholderNumber, placeholderLabel);
    portrait.replaceWith(placeholder);
  });
  portrait.src = `${imageDirectory}/${encodeURIComponent(subjectNumber)}.${imageExtensions[extensionIndex]}`;
  portraitWrap.append(portrait);
  return portraitWrap;
}
