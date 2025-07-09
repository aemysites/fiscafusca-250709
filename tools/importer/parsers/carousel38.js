/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column (block name)
  const headerRow = ['Carousel (carousel38)'];

  // Find the main grid containing both columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  let textCol = null;
  let imagesCol = null;
  if (mainGrid) {
    const gridChildren = Array.from(mainGrid.children);
    if (gridChildren.length >= 2) {
      textCol = gridChildren[0];
      imagesCol = gridChildren[1];
    }
  }
  // Fallback if structure changes
  if (!textCol || !imagesCol) {
    textCol = element.querySelector('.h1-heading')?.closest('div');
    imagesCol = element.querySelector('.cover-image')?.closest('.grid-layout');
  }

  // Get all images for the carousel slides
  let imgs = [];
  if (imagesCol) {
    imgs = Array.from(imagesCol.querySelectorAll('img.cover-image'));
  }

  // Compose the text content cell (h1, p, button group)
  let textCellElements = [];
  if (textCol) {
    const h1 = textCol.querySelector('h1, .h1-heading');
    if (h1) textCellElements.push(h1);
    const p = textCol.querySelector('p, .subheading');
    if (p) textCellElements.push(p);
    const btnGroup = textCol.querySelector('.button-group');
    if (btnGroup) textCellElements.push(btnGroup);
  }

  // Build the rows array: first row header (1 column), then each slide (2 columns)
  const rows = [headerRow];
  imgs.forEach((img, idx) => {
    if (idx === 0) {
      rows.push([img, textCellElements.length ? textCellElements : '']);
    } else {
      rows.push([img, '']);
    }
  });

  // Create the block, but ensure the header row has only 1 column and slide rows have 2 columns
  // This is accomplished by adjusting the underlying cells array after creation
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Manually fix the header row to span columns if needed (table header row should be single cell)
  const firstRow = block.querySelector('tr');
  if (firstRow && firstRow.children.length === 1 && imgs.length > 0) {
    firstRow.firstElementChild.setAttribute('colspan', '2');
  }
  element.replaceWith(block);
}
