/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (!columns.length) return;
  // Construct the table rows: header row is ONE cell, second row is as many columns as needed
  const rows = [];
  rows.push(['Columns (columns11)']); // Header row: one cell only
  rows.push(columns); // Second row: one cell for each column in the grid
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
