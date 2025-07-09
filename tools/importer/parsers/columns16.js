/* global WebImporter */
export default function parse(element, { document }) {
  // Get the top grid with two columns: left (headline) and right (body/author)
  const topGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!topGrid) return;
  const columns = Array.from(topGrid.children);
  // Defensive: ensure we have two columns
  if (columns.length < 2) return;

  // First col: Eyebrow and Headline
  const leftCol = columns[0];
  // We'll reference the eyebrow and headline directly if present
  const leftColEls = [];
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftColEls.push(eyebrow);
  const headline = leftCol.querySelector('h1');
  if (headline) leftColEls.push(headline);

  // Second col: Body, author info, and button
  const rightCol = columns[1];
  const rightColEls = [];
  const richText = rightCol.querySelector('.w-richtext');
  if (richText) rightColEls.push(richText);
  const authorBlock = rightCol.querySelector('.w-layout-grid > .flex-horizontal');
  if (authorBlock) rightColEls.push(authorBlock);
  const button = rightCol.querySelector('a.button');
  if (button) rightColEls.push(button);

  // Get the bottom image grid (two images)
  const bottomGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (bottomGrid) {
    const imageCols = Array.from(bottomGrid.children);
    if (imageCols[0]) img1 = imageCols[0].querySelector('img');
    if (imageCols[1]) img2 = imageCols[1].querySelector('img');
  }

  // Table: header, row1: two columns (headline/eyebrow, body/authors/button), row2: two images
  const cells = [
    ['Columns (columns16)'],
    [leftColEls, rightColEls],
    [img1, img2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
