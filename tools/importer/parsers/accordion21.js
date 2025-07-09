/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block table
  const headerRow = ['Accordion (accordion21)'];
  const rows = [headerRow];
  // Each accordion item is a direct child with class 'divider' (first may have another class as well)
  const items = element.querySelectorAll(':scope > .divider');
  items.forEach((item) => {
    // Each divider contains a grid with two children: title and content
    const grid = item.querySelector(':scope > .w-layout-grid');
    if (grid) {
      const children = grid.children;
      let title = null;
      let content = null;
      if (children.length >= 2) {
        title = children[0];
        content = children[1];
      } else if (children.length === 1) {
        // fallback: put everything in the left cell and leave right empty
        title = children[0];
        content = document.createElement('span');
      } else {
        title = document.createElement('span');
        content = document.createElement('span');
      }
      rows.push([title, content]);
    } else {
      // fallback for structures that are missing the grid
      rows.push([
        item,
        document.createElement('span')
      ]);
    }
  });
  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
