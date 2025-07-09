/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely find first direct child grid (for structure robustness)
  const grids = element.querySelectorAll(':scope > .w-layout-grid');
  let image = null;
  let content = null;

  // Find the hero image (first img directly under section or in a grid)
  image = element.querySelector('img');

  // Find the grid that contains the heading/paragraph/buttons (the text stack)
  // There may be nested grids; find the one containing a heading
  let foundContent = null;
  for (const grid of grids) {
    const candidate = grid.querySelector('h1,h2,h3,.h1-heading,.h2-heading,.h3-heading');
    if (candidate) {
      // Sometimes the content is wrapped deeper - get the inner section if present
      foundContent = grid.querySelector(':scope > .section') || grid;
      break;
    }
  }
  if (foundContent) {
    content = foundContent;
  } else if (grids.length > 0) {
    content = grids[0];
  }

  // Compose the table rows
  const rows = [];
  rows.push(['Hero (hero25)']); // header EXACLTY as in the example
  rows.push([image ? image : '']); // image row (optional)
  rows.push([content ? content : '']); // content row (optional)

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
