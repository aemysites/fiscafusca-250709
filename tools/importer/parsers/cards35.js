/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Cards (cards35)'];

  // Get all immediate card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, handle image and (optionally) text content
  const rows = Array.from(cardDivs).map(cardDiv => {
    // First, find the image (if present)
    const img = cardDiv.querySelector('img');
    // Second, find potential text content (look for headings, paragraphs, links, etc.)
    // For robustness: gather all elements in the cardDiv that are NOT the image
    const textContent = [];
    Array.from(cardDiv.childNodes).forEach(child => {
      if (child !== img && (child.nodeType === 1 || child.nodeType === 3)) {
        // Element or text node, push as-is
        textContent.push(child);
      }
    });
    // If no text nodes/elements, use blank string
    const textCell = textContent.length > 0 ? textContent : '';
    return [img, textCell];
  });

  // Compose the table
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
