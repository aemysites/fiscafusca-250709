/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: the only allowed hardcoded value
  const headerRow = ['Hero (hero8)'];

  // Find the main hero layout grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');

  let imageCell = '';
  let contentCell = '';

  if (grid) {
    // Get all immediate children of the grid
    const gridChildren = Array.from(grid.children);
    // Try to get the image (first img child)
    const img = grid.querySelector('img');
    imageCell = img || '';

    // Try to get the main content block (first DIV child with headings etc.)
    let contentDiv = null;
    for (const child of gridChildren) {
      if (child.tagName === 'DIV' && !contentDiv) {
        contentDiv = child;
        break;
      }
    }
    if (contentDiv) {
      // Collect all its direct children that are elements or meaningful text
      const nodes = [];
      contentDiv.childNodes.forEach(n => {
        if (n.nodeType === Node.ELEMENT_NODE) {
          nodes.push(n);
        } else if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
          // Wrap text node in a span to preserve it as an element
          const span = document.createElement('span');
          span.textContent = n.textContent;
          nodes.push(span);
        }
      });
      contentCell = nodes;
    }
  }

  // Compose the single block table
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
