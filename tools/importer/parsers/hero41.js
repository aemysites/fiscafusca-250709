/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Hero (hero41)'];

  // --- Get background image ---
  // Look for img inside first grid div (background container)
  let bgImg = null;
  const gridContainers = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridContainers.length > 0) {
    const img = gridContainers[0].querySelector('img');
    if (img) {
      bgImg = img;
    }
  }

  // --- Get content (headline, subheading, CTA) ---
  // The main content is in the second grid div
  let contentCell = [];
  if (gridContainers.length > 1) {
    const contentDiv = gridContainers[1];
    // The text content is inside a grid, typically the first child
    const innerGrid = contentDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Get all children of the inner grid
      for (const child of Array.from(innerGrid.children)) {
        if (child.tagName === 'H1') {
          contentCell.push(child);
        } else if (child.classList.contains('flex-vertical')) {
          // Add all children of this vertically-stacked content
          contentCell.push(...child.children);
        }
      }
    } else {
      // Fallback: Just add all children
      contentCell.push(...contentDiv.children);
    }
  }

  // Ensure we still return a single cell with an empty array if no content
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length ? contentCell : '']
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
