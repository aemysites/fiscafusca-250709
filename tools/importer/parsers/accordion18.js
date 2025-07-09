/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion18) block: header and rows
  const rows = [['Accordion (accordion18)']];

  // Find all immediate accordion items
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title: inside .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleElem = null;
    if (toggle) {
      titleElem = toggle.querySelector('.paragraph-lg');
      // fallback: get last child if .paragraph-lg missing
      if (!titleElem && toggle.lastElementChild) {
        titleElem = toggle.lastElementChild;
      }
    }
    // Content: inside .accordion-content .utility-padding-all-1rem
    const dropdownList = item.querySelector('.accordion-content');
    let contentElem = null;
    if (dropdownList) {
      // Prefer the inner padding div, else the dropdownList itself
      const padDiv = dropdownList.querySelector('.utility-padding-all-1rem');
      if (padDiv) {
        contentElem = padDiv;
      } else {
        contentElem = dropdownList;
      }
    }
    // Add only rows that have BOTH title and content
    if (titleElem && contentElem) {
      rows.push([titleElem, contentElem]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
