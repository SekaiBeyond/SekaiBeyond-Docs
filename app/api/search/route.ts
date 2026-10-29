import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

export const revalidate = false;

// The default multilingual tokenizer segments Chinese as well as English, so
// both languages share one index with no per-locale setup.
export const { staticGET: GET } = createFromSource(source);
