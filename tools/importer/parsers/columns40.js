/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Proper structure: 1 header cell, then a row with as many columns as needed
  const cells = [];
  cells.push(['Columns (columns40)']); // header row: single cell
  cells.push(columns);                 // content row: one cell per column

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}