/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: must match example exactly
  const headerRow = ['Hero (hero37)'];

  // No background image in the provided HTML, so the second row is empty string
  const backgroundRow = [''];

  // Extract all relevant content for the content row
  // Find the grid or main content layout
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  let headline = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // The first child div (headlines)
    const divs = Array.from(grid.children).filter(e => e.tagName === 'DIV');
    if (divs.length > 0) {
      const firstDiv = divs[0];
      headline = firstDiv.querySelector('h1, h2, h3, h4, h5, h6');
      // subheading could be a .subheading or just a p
      subheading = firstDiv.querySelector('p, .subheading');
    }
    // The first direct <a> child (CTA)
    cta = Array.from(grid.children).find(e => e.tagName === 'A');
  } else {
    // fallback: scan for headline, subheading, and cta anywhere under element
    headline = element.querySelector('h1, h2, h3, h4, h5, h6');
    subheading = element.querySelector('p, .subheading');
    cta = element.querySelector('a');
  }

  // Compose content cell as an array of the present elements, in block order
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subheading && subheading !== headline) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  
  // Must provide an array for the cell, but if all missing, empty string
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose the table rows
  const rows = [headerRow, backgroundRow, contentRow];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
