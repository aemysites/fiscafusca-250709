/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to combine multiple nodes into a fragment
  function combineNodes(nodes) {
    if (!nodes.length) return '';
    const frag = document.createDocumentFragment();
    nodes.forEach(n => frag.appendChild(n));
    return frag;
  }

  // Find the main grid wrapper
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  const rows = [];

  // --- 1. Main Card (first, large, left) ---
  const mainCard = gridChildren[0];
  if (mainCard) {
    // Image: only the <img> inside the aspect-ratio container
    const imgContainer = mainCard.querySelector('div[class*="utility-aspect"]');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Tag (optional)
    const tagGroup = mainCard.querySelector('.tag-group');
    // Title (h2 or h3)
    const heading = mainCard.querySelector('h2, h3, h4, h5, h6');
    // Description
    const desc = mainCard.querySelector('p');
    const textNodes = [];
    if (tagGroup) textNodes.push(tagGroup);
    if (heading) textNodes.push(heading);
    if (desc) textNodes.push(desc);
    const textCell = combineNodes(textNodes);
    rows.push([img || '', textCell]);
  }

  // --- 2. Secondary Cards (the vertical two-cards group) ---
  const rightCardsGroup = gridChildren[1];
  if (rightCardsGroup) {
    // Each card: <a>
    const subCards = rightCardsGroup.querySelectorAll('a.utility-link-content-block');
    subCards.forEach(card => {
      // Image: only <img> in .utility-aspect-
      const imgContainer = card.querySelector('div[class*="utility-aspect"]');
      const img = imgContainer ? imgContainer.querySelector('img') : null;
      const tagGroup = card.querySelector('.tag-group');
      const heading = card.querySelector('h2, h3, h4, h5, h6');
      const desc = card.querySelector('p');
      const textNodes = [];
      if (tagGroup) textNodes.push(tagGroup);
      if (heading) textNodes.push(heading);
      if (desc) textNodes.push(desc);
      const textCell = combineNodes(textNodes);
      rows.push([img || '', textCell]);
    });
  }

  // --- 3. Text Cards Only (no image, just h3+p) ---
  const textCardsGroup = gridChildren[2];
  if (textCardsGroup) {
    // Cards are <a> siblings, separated by div.divider elements
    const textCards = textCardsGroup.querySelectorAll('a.utility-link-content-block');
    textCards.forEach(card => {
      const heading = card.querySelector('h2, h3, h4, h5, h6');
      const desc = card.querySelector('p');
      const textNodes = [];
      if (heading) textNodes.push(heading);
      if (desc) textNodes.push(desc);
      const textCell = combineNodes(textNodes);
      rows.push(['', textCell]);
    });
  }

  // Compose the table
  const cells = [ ['Cards (cards4)'], ...rows ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
