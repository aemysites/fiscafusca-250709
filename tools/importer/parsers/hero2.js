/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact table header
  const headerRow = ['Hero (hero2)'];

  // Find the grid layout (where content and image are children)
  const grid = element.querySelector('.grid-layout');

  // Defensive: If grid not found, fallback to element
  const gridChildren = grid ? Array.from(grid.children) : Array.from(element.children);

  // Find the image and the content block
  let imageEl = null;
  let contentDiv = null;
  for (const child of gridChildren) {
    if (!imageEl && child.tagName === 'IMG') imageEl = child;
    else if (!contentDiv && child.querySelector && (child.querySelector('h1, .subheading, .button-group'))) contentDiv = child;
  }

  // Compose image cell (only if image found)
  const imageCell = imageEl ? [imageEl] : [''];

  // Compose content cell: heading, subheading, buttons (if present)
  const contentParts = [];
  if (contentDiv) {
    // Heading (h1)
    const h1 = contentDiv.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Subheading (p.subheading)
    const sub = contentDiv.querySelector('.subheading');
    if (sub) contentParts.push(sub);
    // Button group (all links)
    const btnGroup = contentDiv.querySelector('.button-group');
    if (btnGroup) contentParts.push(btnGroup);
  }
  const contentCell = contentParts.length ? contentParts : [''];

  const cells = [
    headerRow,
    imageCell,
    [contentCell]
  ];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
