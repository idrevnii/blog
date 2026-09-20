import { createProcessor } from '@mdx-js/mdx';

const parser = createProcessor();
const wordsPerMinute = 200;

interface ContentNode {
  type: string;
  value?: string;
  alt?: string | null;
  attributes?: { name?: string; value?: unknown }[];
  children?: ContentNode[];
}

/** Estimate from article prose and literal captions, excluding MDX implementation. */
export function getReadingTime(body = '') {
  const text: string[] = [];
  const visit = (node: ContentNode) => {
    if (['text', 'inlineCode', 'code'].includes(node.type) && node.value) {
      text.push(node.value);
    }
    if (node.type === 'image' && node.alt) text.push(node.alt);
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      for (const attribute of node.attributes ?? []) {
        if (['title', 'note', 'summary'].includes(attribute.name ?? '') && typeof attribute.value === 'string') {
          text.push(attribute.value);
        }
      }
    }
    for (const child of node.children ?? []) visit(child);
  };
  visit(parser.parse(body));
  const words = text.join(' ').split(/\s+/u).filter(word => /[\p{L}\p{N}]/u.test(word)).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
