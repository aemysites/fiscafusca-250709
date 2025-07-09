/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero14)'];

  // --- Extract Background Image ---
  // The background image is inside a div with class 'ix-parallax-scale-out-hero', as an <img>
  let backgroundImg = null;
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    const img = parallaxDiv.querySelector('img');
    if (img) {
      backgroundImg = img;
    }
  }

  // --- Extract Content (title, subheading, cta) ---
  // The content is in a .container, inside which is a div with the h1
  let contentCell = [];
  // find .container
  const container = element.querySelector('.container');
  if (container) {
    // Look for the div that contains the heading and buttons
    // (e.g., <div class="utility-margin-bottom-6rem">)
    const mainContentDivs = Array.from(container.children).filter(child => child.tagName === 'DIV');
    if (mainContentDivs.length > 0) {
      contentCell.push(mainContentDivs[0]);
    } else {
      // fallback to the container itself
      contentCell.push(container);
    }
  }

  // --- Build Rows ---
  const rows = [
    headerRow,
    backgroundImg ? [backgroundImg] : [''],
    [contentCell]
  ];

  // --- Create Table ---
  const block = WebImporter.DOMUtils.createTable(rows, document);
  
  // --- Replace the original element ---
  element.replaceWith(block);
}
