/**
 * Converts WhatsApp-style and simple Markdown shortcuts to HTML.
 * Supports:
 * *bold* -> <strong>
 * _italic_ -> <em>
 * ~strike~ -> <s>
 * __underline__ -> <u>
 * # Heading -> <h1>
 * ## Subheading -> <h2>
 * * Bullet -> <li> (wrapped in <ul>)
 * 1. Number -> <li> (wrapped in <ol>)
 */
export const formatText = (text) => {
  if (!text) return "";

  let formatted = text
    // Escape HTML to prevent XSS
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Headings (must be at the start of a line)
  formatted = formatted.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  formatted = formatted.replace(/^## (.*$)/gim, '<h2>$1</h2>');

  // Bold (*text*)
  formatted = formatted.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

  // Underline (__text__) - Check this before italic to avoid conflict
  formatted = formatted.replace(/__([^_]+)__/g, '<u>$1</u>');

  // Italic (_text_)
  formatted = formatted.replace(/_([^_]+)_/g, '<em>$1</em>');

  // Strike (~text~)
  formatted = formatted.replace(/~([^~]+)~/g, '<s>$1</s>');

  // Lists (simple implementation)
  // Bullet points
  formatted = formatted.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
  // Handle consecutive bullet points by merging </ul><ul>
  formatted = formatted.replace(/<\/ul>\s*<ul>/g, '');

  // Numbered lists
  formatted = formatted.replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>');
  // Handle consecutive numbered items
  formatted = formatted.replace(/<\/ol>\s*<ol>/g, '');

  // Line breaks
  formatted = formatted.replace(/\n/g, '<br />');

  return formatted;
};

/**
 * Strips formatting symbols for character counting
 */
export const stripShortcuts = (text) => {
  if (!text) return "";
  return text
    .replace(/[*_~#]/g, '')
    .replace(/^\d+\. /gm, '')
    .trim();
};
