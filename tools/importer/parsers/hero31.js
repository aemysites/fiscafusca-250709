/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must be exactly 'Hero (hero31)'
  const headerRow = ['Hero (hero31)'];

  // 2nd row (background image): This input has no bg image, must be empty string
  const imageRow = [''];

  // Compose the content row by collecting all content from the block in the correct source order
  // The order in the source is: eyebrow (author), tags, h2, then the rich text (paragraphs)
  // We need to reference the actual elements, not clone or recreate

  // Eyebrow/Author
  const eyebrow = element.querySelector('.paragraph-xl.utility-text-secondary');
  // Tags (collection of .tag)
  const tags = element.querySelector('.flex-vertical.x-left.flex-gap-xxs');
  // Heading
  const heading = element.querySelector('h2');
  // Rich text paragraphs
  const rich = element.querySelector('.rich-text');

  // Compose, but only include elements if they exist, and preserve order
  // The requirements allow combining multiple pieces in a single cell
  const cellContent = [];
  if (eyebrow) cellContent.push(eyebrow);
  if (tags) cellContent.push(tags);
  if (heading) cellContent.push(heading);
  if (rich) cellContent.push(rich);

  // Final table row for content
  const contentRow = [cellContent]; // only one column in the row

  // Create the table rows array
  const rows = [headerRow, imageRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
