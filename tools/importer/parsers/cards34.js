/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table, matches example exactly
  const headerRow = ['Cards (cards34)'];

  // Collect all top-level <a> children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Find the main image in the card (mandatory, always first in the source structure)
    const image = card.querySelector('img');

    // For the text content, grab the right-hand div (the sibling after the image)
    // This works by getting the direct children of the card's main grid wrapper
    const grid = card.querySelector('div');
    let textDiv = null;
    if (grid) {
      const children = Array.from(grid.children);
      // Usually [img, textDiv]
      const imgIdx = children.findIndex(el => el.tagName.toLowerCase() === 'img');
      if (imgIdx !== -1 && children.length > imgIdx + 1) {
        textDiv = children[imgIdx + 1];
      } else {
        // Fallback: if only one child, or img not found, just use last child
        textDiv = children[children.length - 1];
      }
    }
    // Defensive: if no textDiv found, use an empty div
    if (!textDiv) {
      textDiv = document.createElement('div');
    }
    // Build the row: [image, text content block]
    return [image, textDiv];
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the newly structured table
  element.replaceWith(table);
}
