/* global WebImporter */
export default function parse(element, { document }) {
  // Required: header row, background image row (first image only), and content row (blank)
  const headerRow = ['Hero (hero1)'];
  // Find first image in DOM order
  const firstImg = element.querySelector('img');
  const imageRow = [firstImg || ''];
  // Content row: check for headings, subheadings, CTA, or leave blank if none
  // In this HTML, there is no heading/subheading/CTA, so blank is correct
  const contentRow = [''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
