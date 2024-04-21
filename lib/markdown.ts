import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import remarkHtml from 'remark-html';

const convertMarkdownToHtml = unified()
  .use(remarkParse)
  .use(remarkHtml)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeFormat)
  .use(rehypeSanitize)
  .use(rehypeStringify);

export function markdownToHtml(markdown: string): string {
  if (!markdown) {
    return '';
  }

  const result = convertMarkdownToHtml.processSync(markdown);

  return result.toString();
}
