/**
 * Renders a JSON-LD graph into a <script type="application/ld+json"> tag.
 *
 * The `<` escape prevents a string inside the data from prematurely closing
 * the script element. All input here comes from our own content file, but the
 * escape costs nothing and removes the whole class of problem.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export default JsonLd
