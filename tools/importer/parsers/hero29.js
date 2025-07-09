/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children (looking for text block and image)
  let textBlock = null;
  let imageEl = null;
  Array.from(grid.children).forEach((child) => {
    if (child.tagName === 'IMG' && !imageEl) {
      imageEl = child;
    } else if (child.tagName === 'DIV' && !textBlock) {
      textBlock = child;
    }
  });

  // Prepare content row (all children of textBlock)
  let contentCell = '';
  if (textBlock) {
    // Get all content elements in order (preserving text, headings, cta, etc)
    contentCell = Array.from(textBlock.childNodes);
  }

  // Structure: 1 column, 3 rows (header, image, content)
  const rows = [
    ['Hero (hero29)'],
    [imageEl ? imageEl : ''],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
