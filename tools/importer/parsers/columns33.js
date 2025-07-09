/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect all direct children (columns)
  const columns = Array.from(grid.children);
  // If no columns, do nothing
  if (columns.length === 0) return;

  // Header row as per spec, single column
  const headerRow = ['Columns (columns33)'];
  // Second row: all columns found in the grid
  const columnsRow = columns.map(col => col);

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  element.replaceWith(table);
}
