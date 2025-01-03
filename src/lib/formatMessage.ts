import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

export function formatMessage(content: string): string {
  // Configure marked to use highlight.js for code highlighting
  marked.setOptions({
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  });

  // Parse the markdown content
  const rawHtml = marked(content);

  // Sanitize the HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return sanitizedHtml;
}

