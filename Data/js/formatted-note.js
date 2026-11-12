function appendFormattedNote(element, text) {
  const parts = text.split(/(\*\*[^*\n]+?\*\*)/g);
  parts.forEach((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const bold = document.createElement("strong");
      bold.textContent = part.slice(2, -2);
      element.append(bold);
      return;
    }
    const lines = part.split("\n");
    lines.forEach((line, index) => {
      if (index > 0) element.append(document.createElement("br"));
      element.append(document.createTextNode(line));
    });
  });
}
