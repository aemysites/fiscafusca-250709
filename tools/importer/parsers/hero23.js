/* global WebImporter */
export default function parse(element, { document }) {
  // Find the currently active tab pane
  const tabPane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!tabPane) return;
  // Find the grid layout inside the active tab pane
  const grid = tabPane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (elements and text nodes)
  const children = Array.from(grid.childNodes).filter(node => {
    // Only include element nodes or text nodes with visible content
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });

  // Separate out images and non-images
  const images = children.filter(el => el.nodeType === 1 && el.tagName === 'IMG');
  const nonImages = children.filter(el => !(el.nodeType === 1 && el.tagName === 'IMG'));

  // For all non-image content, wrap in a div so ALL text content is present (headings, paragraphs, etc)
  let textContent = '';
  if (nonImages.length === 1) {
    textContent = nonImages[0];
  } else if (nonImages.length > 1) {
    const wrapper = document.createElement('div');
    nonImages.forEach(el => wrapper.appendChild(el));
    textContent = wrapper;
  }

  // Compose the table as specified
  const cells = [
    ['Hero (hero23)'],
    [images.length > 1 ? images : (images[0] || '')],
    [textContent || ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
