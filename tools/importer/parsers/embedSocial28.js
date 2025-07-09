/* global WebImporter */
export default function parse(element, { document }) {
  // The source HTML represents a tab list with text labels. We must preserve all text content.
  // We'll collect the text of all direct children (the tab links), including their descendants.
  const tabTexts = Array.from(element.children)
    .map(child => child.textContent.trim())
    .filter(Boolean);
  // Join all tab names with a space, as in the screenshot ("Trends Sporty Nightlife")
  const content = tabTexts.join(' ');

  const cells = [
    ['Embed'],
    [content]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
