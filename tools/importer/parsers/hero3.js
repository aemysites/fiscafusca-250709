/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid containing the hero content
  const grid = element.querySelector('.grid-layout');
  // Defensive: If grid not found, fallback to all content
  const contentGroup = grid || element;
  // Try to find the text block and button group
  // By structure: usually first two direct children of grid
  const children = Array.from(contentGroup.children);
  let textBlock = null;
  let buttonGroup = null;
  // Find children by likely content
  children.forEach(child => {
    if (!textBlock && child.querySelector('h1,h2,h3,h4,h5,h6')) {
      textBlock = child;
    } else if (!buttonGroup && child.querySelector('a')) {
      buttonGroup = child;
    }
  });
  // Compose main content cell
  const mainContent = [];
  if (textBlock) {
    // Add all heading elements (in order)
    const headings = Array.from(textBlock.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    mainContent.push(...headings);
    // Add all paragraphs (in order, that are not in buttons)
    const paragraphs = Array.from(textBlock.querySelectorAll('p'));
    mainContent.push(...paragraphs);
  }
  // Add button links if present
  if (buttonGroup) {
    const buttons = Array.from(buttonGroup.querySelectorAll('a'));
    if (buttons.length > 0) {
      // Add a break if there is main text and at least one button
      if (mainContent.length > 0) {
        mainContent.push(document.createElement('br'));
      }
      mainContent.push(...buttons);
    }
  }
  // Build the block table as specified: 1 col, 3 rows
  // Row 1: block header, Row 2: (empty, no background), Row 3: main content
  const cells = [
    ['Hero (hero3)'],
    [''],
    [mainContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
