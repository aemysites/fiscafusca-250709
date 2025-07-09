/* global WebImporter */
export default function parse(element, { document }) {
  // Gather cards (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  // Header row: must be a single cell array
  const rows = [['Cards (cards12)']];
  // Each card row: exactly two columns (image | text)
  cards.forEach(card => {
    const img = card.querySelector('img');
    // Defensive: ensure 2 columns per card (image, empty text cell)
    rows.push([img || '', '']);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
