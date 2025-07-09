/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container that holds all cards
  const container = element.querySelector('.container');
  if (!container) return;

  // There are two grid layouts, one large card (left) and one inner grid of smaller cards (right)
  const grids = container.querySelectorAll(':scope > .grid-layout');
  const cards = [];

  // Helper: Given a card element, returns [img, [title, description, cta]]
  function extractCard(cardEl) {
    // Image: find first <img> under .utility-aspect-*
    const img = cardEl.querySelector('.utility-aspect-1x1 img, .utility-aspect-2x3 img');
    // Text block: either div.utility-padding-all-2rem (for large card) or the cardEl itself (for others)
    const textContainer = cardEl.querySelector('.utility-padding-all-2rem') || cardEl;
    // Heading: h2, h3, or h4
    const heading = textContainer.querySelector('h2, h3, h4');
    // Paragraph: first <p>
    const paragraph = textContainer.querySelector('p');
    // Call to action: a.button, button, or .button
    let cta = textContainer.querySelector('a.button, button, .button');
    // If CTA is a div and is not a link/button, wrap in span
    if (cta && cta.tagName === 'DIV') {
      const span = document.createElement('span');
      span.textContent = cta.textContent;
      cta = span;
    }
    // Compose the text cell; only add if element exists
    const textContent = [];
    if (heading) textContent.push(heading);
    if (paragraph) textContent.push(paragraph);
    if (cta && cta.textContent.trim()) textContent.push(cta);
    return [img, textContent];
  }

  // 1. Large left card
  if (grids[0]) {
    const leftCard = grids[0].querySelector(':scope > a.utility-link-content-block');
    if (leftCard) {
      cards.push(extractCard(leftCard));
    }
    // 2. Right-side grid of cards inside first grid
    const innerGrid = grids[0].querySelector('.grid-layout');
    if (innerGrid) {
      innerGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(cardEl => {
        cards.push(extractCard(cardEl));
      });
    }
  }

  // 3. Any cards in a second main grid (robustness, covers possible structure changes)
  if (grids[1]) {
    grids[1].querySelectorAll(':scope > a.utility-link-content-block').forEach(cardEl => {
      cards.push(extractCard(cardEl));
    });
  }

  // Compose the table: header row + one row per card
  const tableRows = [['Cards (cards39)']];
  cards.forEach(row => tableRows.push(row));

  // Create and insert the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
