/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [['Cards (cards5)']];

  // Each card is a direct <a> child
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // First cell: image (always present, inside the first inner div)
    const imageHolder = card.querySelector(':scope > div'); // First div
    let imageCell = null;
    if (imageHolder) {
      const img = imageHolder.querySelector('img');
      if (img) imageCell = img;
      else imageCell = imageHolder;
    }
    // Second cell: text content (inside the second div)
    const textDiv = card.querySelectorAll(':scope > div')[1];
    const cellContent = [];
    if (textDiv) {
      // Tag (optional, appears above heading)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) {
        cellContent.push(tagGroup);
      }
      // Heading (h3 or .h4-heading)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        cellContent.push(heading);
      }
      // Description (first <p>)
      const desc = textDiv.querySelector('p');
      if (desc) {
        cellContent.push(desc);
      }
    }
    rows.push([imageCell, cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
