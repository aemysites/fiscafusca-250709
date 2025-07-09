/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that holds the carousel slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all immediate children of the grid, each a slide container
  const slideDivs = Array.from(grid.children);

  const rows = [];
  // Header row as specified in the example
  rows.push(['Carousel (carousel17)']);
  // For each slide container, find the contained image and create a row with two columns
  slideDivs.forEach(slideDiv => {
    // Find the first <img> inside this slide
    const img = slideDiv.querySelector('img');
    // Only add rows for slides that actually contain images
    if (img) {
      // The second cell is for optional text; there is no text content in the given HTML, so set to empty string
      rows.push([img, '']);
    }
  });
  // Ensure all content rows have exactly two columns
  // If for some reason a row only has one column, pad with an empty string
  rows.forEach((row, index) => {
    if (index === 0) return; // header row
    while (row.length < 2) {
      row.push('');
    }
  });

  // Build the table using the WebImporter helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
