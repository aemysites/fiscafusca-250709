/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero7)'];
  // Second row: Background Image (blank if not present)
  const backgroundImageRow = [''];

  // Get content from the grid:
  const grid = element.querySelector('.grid-layout');
  let contentCell;
  if (grid) {
    // Find <h2> heading (title)
    const heading = grid.querySelector('h2');
    // Find the content div (usually the right-hand side with text, CTA)
    // This is any div that is NOT the root grid
    // We'll take all immediate child divs under .grid-layout (for flexibility)
    const divChildren = Array.from(grid.children).filter(child => child.tagName === 'DIV');
    const content = [];
    if (heading) content.push(heading);
    // For each div child, add its children in order
    divChildren.forEach(div => {
      content.push(...Array.from(div.children));
    });
    contentCell = [content];
  } else {
    // Fallback: put everything
    contentCell = [Array.from(element.children)];
  }

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundImageRow,
    contentCell,
  ], document);

  element.replaceWith(table);
}
