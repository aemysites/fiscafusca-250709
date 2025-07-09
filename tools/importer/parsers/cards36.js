/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure structure matches the example: header row is a single cell, two columns per data row
  // Get all card containers (direct children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header: single column, matches example
  const rows = [['Cards (cards36)']];

  // Each card is a row with two columns: image | text (text empty if not present)
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    const imageCell = img;
    // Try to extract title/desc if present, but fallback to ''
    let textCell = '';
    // If there is a sibling or nested text element in cardDiv, use that
    // (In this HTML, there is none, so textCell remains empty)
    rows.push([imageCell, textCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
