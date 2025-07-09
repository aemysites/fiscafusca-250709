/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns: immediate child divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const cells = columnDivs.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // Create table manually to ensure single header cell spans all columns
  const table = document.createElement('table');

  // Header row
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns30)';
  if (cells.length > 1) th.colSpan = cells.length;
  trHead.appendChild(th);
  table.appendChild(trHead);

  // Content row (columns)
  const tr = document.createElement('tr');
  cells.forEach(cell => {
    const td = document.createElement('td');
    if (cell) td.append(cell);
    tr.appendChild(td);
  });
  table.appendChild(tr);

  element.replaceWith(table);
}
