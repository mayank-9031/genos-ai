import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

type C = { children?: React.ReactNode }
type A = { href?: string; children?: React.ReactNode }
type Code = { children?: React.ReactNode; className?: string }

export const postComponents = {
  h2: ({ children }: C) => (
    <h2 className="font-display text-3xl md:text-4xl mt-12 mb-4 text-white">
      {children}
    </h2>
  ),
  h3: ({ children }: C) => (
    <h3 className="font-display text-2xl mt-8 mb-3 text-white">{children}</h3>
  ),
  p: ({ children }: C) => (
    <p className="text-white/80 leading-relaxed mb-5">{children}</p>
  ),
  a: ({ href, children }: A) => (
    <a
      href={href}
      className="text-white underline decoration-white/30 hover:decoration-white/80 underline-offset-4 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: C) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-white/80">{children}</ul>
  ),
  ol: ({ children }: C) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-white/80">{children}</ol>
  ),
  li: ({ children }: C) => <li className="leading-relaxed">{children}</li>,
  code: ({ children, className }: Code) => {
    if (className) return <code className={className}>{children}</code>
    return (
      <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-sm font-mono">
        {children}
      </code>
    )
  },
  pre: ({ children }: C) => (
    <pre className="p-4 rounded-xl bg-white/5 border border-white/10 overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }: C) => (
    <blockquote className="border-l-2 border-white/30 pl-5 italic text-white/70 my-6">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-white/10 my-10" />,
  strong: ({ children }: C) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
}

type Props = { content: string }

export function PostBody({ content }: Props) {
  return (
    <div className="mt-10">
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
        components={postComponents as never}
      />
    </div>
  )
}
