/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Must exactly match the requested block name
  const headerRow = ['Hero (hero6)'];

  // Row 2: Background Image (optional)
  // Find the background image in the DOM structure
  // It's the <img> with class 'cover-image'
  const bgImg = element.querySelector('img.cover-image') || '';
  const bgRow = [bgImg];

  // Row 3: Title, Subheading, CTA (using existing elements, not clones)
  const card = element.querySelector('.card');
  const contentParts = [];
  if (card) {
    // Heading: use the first heading element (any level)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentParts.push(heading);
    // Subheading: paragraph with class 'subheading'
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentParts.push(subheading);
    // Call-to-Action(s): all links/buttons in the button-group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
  }
  const contentRow = [contentParts];

  // Build table structure as per requirements (1 column, 3 rows)
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
