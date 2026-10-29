import { docsLlms } from '@/lib/source';

export const revalidate = false;

// English only: the Chinese pages say the same, and would double its size.
export async function GET() {
  return new Response(await docsLlms.full('en'));
}
