/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from spec/example
  const cells = [['Cards (cards26)']];

  // Helper to extract the text cell (heading + description) as elements
  function getTextCell(cardEl) {
    // Look for the most inner .utility-padding-all-2rem, else fallback
    let textContainer = cardEl.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      // fallback: any div that contains h3/h2/h4 or p
      textContainer = cardEl.querySelector('div:has(h3,p), div:has(h2,p), div:has(h4,p)');
    }
    if (textContainer) {
      // collect heading and paragraph in order
      const textArr = [];
      let heading = textContainer.querySelector('h1,h2,h3,h4,h5,h6');
      if (heading) textArr.push(heading);
      let para = textContainer.querySelector('p');
      if (para) textArr.push(para);
      if (textArr.length) return textArr;
    }
    // fallback: if no container, search on card element
    const textArr = [];
    let heading = cardEl.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) textArr.push(heading);
    let para = cardEl.querySelector('p');
    if (para) textArr.push(para);
    return textArr.length ? textArr : '';
  }

  // Each card is a direct child div containing an img (mandatory)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return; // Only process cards with an image
    // Text cell
    const textCell = getTextCell(cardDiv);
    cells.push([img, textCell]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
