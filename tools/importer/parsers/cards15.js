/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards15)'];

  // Get all immediate children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Image in first cell
    let imgDiv = card.querySelector('.utility-aspect-2x3');
    let img = imgDiv ? imgDiv.querySelector('img') : null;

    // Second cell: Build content from existing nodes
    const contentParts = [];
    // Meta (tag + date)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      // We reference the meta node directly, since it contains both tag and date
      contentParts.push(meta);
    }
    // Heading (card title)
    const heading = card.querySelector('h1, h2, h3, .h4-heading');
    if (heading) {
      contentParts.push(heading);
    }
    
    // Compose the row; each card is 2 columns: [image, content]
    return [img, contentParts];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
