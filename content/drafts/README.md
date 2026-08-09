# Drafts

Posts in here are not published. `lib/posts.ts` only reads `content/posts/*.md`,
so nothing in this folder is built or routed.

These four were written earlier but never reached GitHub: the global gitignore
excluded `*.md`, so they were never committed and the live site rendered an
empty blog. That rule is now overridden in this repo's `.gitignore`.

To publish one, move it back and push:

    mv content/drafts/<name>.md content/posts/
    git add content/posts/<name>.md && git commit -m "Publish <name>" && git push

Check the frontmatter `date` before publishing. It sets the ordering.
