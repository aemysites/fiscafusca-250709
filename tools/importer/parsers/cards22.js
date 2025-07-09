/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card element
  function extractCardData(cardEl) {
    // Try to find an <img> tag that's not decorative
    const img = cardEl.querySelector('img');
    // For text: try to get heading and supporting text
    let title = cardEl.querySelector('h1,h2,h3,h4,h5,h6');
    let desc = null;
    // Prefer paragraph-sm class, fallback to div, p, or span
    desc = cardEl.querySelector('.paragraph-sm') || cardEl.querySelector('p') || cardEl.querySelector('div:not([class])') || cardEl.querySelector('span');

    // Title: use as is (preserve element)
    // Description: use as is (preserve element)
    let textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    return [img || '', textCell.length ? textCell : ''];
  }

  // Find all '.w-layout-grid.grid-layout' blocks (one per tab/pane)
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');
  const rows = [ ['Cards (cards22)'] ];

  grids.forEach((grid) => {
    // Each card is an <a> with class 'utility-link-content-block'
    // Some may also have 'card-link' and other classes
    // Only select direct children to avoid nested grids
    const cards = Array.from(grid.children).filter(child =>
      child.matches('a.utility-link-content-block'));
    cards.forEach(card => {
      const [imgEl, textCell] = extractCardData(card);
      // Only add if at least one content is present
      if (imgEl || (Array.isArray(textCell) && textCell.length > 0)) {
        rows.push([imgEl, textCell]);
      }
    });
  });

  // Build the table with the helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
