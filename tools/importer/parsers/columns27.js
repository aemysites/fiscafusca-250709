/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the main block content
  const grid = element.querySelector('.w-layout-grid.grid-layout.y-bottom');
  if (!grid) return;
  // Extract heading and quote
  const heading = grid.querySelector('p.h2-heading');
  const quote = grid.querySelector('p.paragraph-lg');
  // Get the inner subgrid with reviewer and logo
  const subgrid = grid.querySelector('.w-layout-grid');
  let reviewer = null;
  let logo = null;
  if (subgrid) {
    reviewer = subgrid.querySelector('.flex-horizontal');
    logo = subgrid.querySelector('.utility-display-inline-block');
  }
  // Build left cell of first row: heading + quote
  const leftTop = document.createElement('div');
  if (heading) leftTop.appendChild(heading);
  if (quote) leftTop.appendChild(quote);
  // Build right cell of first row: logo
  const rightTop = logo || document.createElement('div');
  // Build left cell of second row: reviewer block
  const leftBottom = reviewer || document.createElement('div');
  // Build right cell of second row: empty, to match 2x2 structure
  const rightBottom = '';
  // Compose rows for createTable
  const headerRow = ['Columns (columns27)'];
  const row1 = [leftTop, rightTop];
  const row2 = [leftBottom, rightBottom];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    row2
  ], document);
  element.replaceWith(table);
}
