/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero10)'];

  // 2. Find the background image grid
  let backgroundGrid = null;
  const heroScaleDiv = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (heroScaleDiv) {
    const grid = heroScaleDiv.querySelector('.grid-layout');
    if (grid) {
      backgroundGrid = grid;
    }
  }

  // 3. Find the overlay content (heading, subheading, buttons)
  let contentDiv = null;
  const heroContentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (heroContentDiv) {
    const container = heroContentDiv.querySelector('.container');
    if (container) {
      contentDiv = container;
    }
  }

  // 4. Compose the table rows
  // The background grid may be null (optional), as per spec
  // The contentDiv may be null (optional), as per spec
  const rows = [
    headerRow,
    [backgroundGrid],
    [contentDiv],
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
