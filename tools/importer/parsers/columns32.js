/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid as columns
  const columnDivs = Array.from(grid.children);
  if (columnDivs.length === 0) return;

  // Header row must be a single cell exactly matching the example
  const headerRow = ['Columns (columns32)'];
  // Content row: each column as its own cell
  const contentRow = columnDivs;

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
