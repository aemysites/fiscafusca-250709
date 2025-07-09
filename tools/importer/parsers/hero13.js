/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header
  const headerRow = ['Hero (hero13)'];

  // Background image: get the first .cover-image in the first grid column
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img.cover-image');
  }

  // Content cell: includes inner card (headline, paragraphs, cta, etc)
  let contentCell = null;
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      contentCell = card;
    } else {
      contentCell = gridDivs[1];
    }
  }

  // Build rows for block table
  const rows = [
    headerRow, // Block name header
    [bgImg],   // Background image row (may be null)
    [contentCell] // Content (headline, subheading, buttons, etc)
  ];

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
