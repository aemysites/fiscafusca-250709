/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the example exactly
  const headerRow = ['Cards'];

  // Each direct child div is a card
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  const rows = cardDivs.map((cardDiv) => {
    // The card's text is always in <p> (no headings)
    const p = cardDiv.querySelector('p');
    if (p) {
      return [p]; // Reference the existing <p> element
    } else {
      // If <p> is missing, fallback: create a <p> with the card's text
      const fallbackP = document.createElement('p');
      fallbackP.textContent = cardDiv.textContent.trim();
      return [fallbackP];
    }
  });

  // Compose the table as in the example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
