/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match specification
  const headerRow = ['Carousel (carousel24)'];

  // Find the innermost .card-body (robust against slight structure differences)
  let cardBody = element.querySelector('.card-body') || element;

  // Find the image element (mandatory)
  const img = cardBody.querySelector('img');

  // Find the heading/title (optional)
  // Prefer real heading tags if present, fallback to known heading classes
  let heading = cardBody.querySelector('h1, h2, h3, h4, h5, h6');
  if (!heading) heading = cardBody.querySelector('.h4-heading');

  // Compose the text content cell
  let textCell = '';
  if (heading) {
    textCell = heading;
  }

  // Construct table rows
  // Only a single slide in this example: one row (image, text), with block name as header
  const rows = [
    headerRow,
    [img, textCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element in the DOM
  element.replaceWith(block);
}
