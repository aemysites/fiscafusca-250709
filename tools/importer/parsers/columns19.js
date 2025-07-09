/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout in the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify image element (the right column)
  const imageEl = grid.querySelector('img');

  // For the left column: collect all children that are not the image (should be the content and the contacts list)
  let leftColumnEls = [];
  for (const child of gridChildren) {
    if (child !== imageEl) {
      leftColumnEls.push(child);
    }
  }
  // Bundle left column content into a wrapper div to keep their structure
  const leftColWrapper = document.createElement('div');
  leftColumnEls.forEach(el => leftColWrapper.appendChild(el));

  // Prepare the block table: header ALWAYS has only one cell
  const headerRow = ['Columns (columns19)'];
  const contentRow = [leftColWrapper, imageEl];
  const cells = [headerRow, contentRow];

  // Use the helper to create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Adjust the header row to span all columns
  const firstRow = table.querySelector('tr');
  if (firstRow && contentRow.length > 1) {
    const ths = firstRow.querySelectorAll('th');
    if (ths.length === 1) {
      ths[0].setAttribute('colspan', contentRow.length);
    }
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
