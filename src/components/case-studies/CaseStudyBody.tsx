import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { caseStudyComponents } from './mdx-components'

type Props = { content: string }

export function CaseStudyBody({ content }: Props) {
  return (
    <div className="mt-12">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        }}
        components={caseStudyComponents as never}
      />
    </div>
  )
}
