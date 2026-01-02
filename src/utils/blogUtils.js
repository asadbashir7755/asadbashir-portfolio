// Custom frontmatter parser to avoid node dependencies
const parseFrontMatter = (text) => {
    const pattern = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/;
    const match = text.match(pattern);

    if (!match) return { data: {}, content: text };

    const frontMatterBlock = match[1];
    const content = match[2].trim();

    const data = {};
    frontMatterBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            // Remove quotes if present
            value = value.replace(/^['"](.*)['"]$/, '$1');

            // Handle array tags (simple comma separation)
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"](.*)['"]$/, '$1'));
            } else if (value === 'true') {
                value = true;
            } else if (value === 'false') {
                value = false;
            }

            data[key] = value;
        }
    });

    return { data, content };
};

// Get all index.md files from the ../blogs directory subfolders
const modules = import.meta.glob('../blogs/*/index.md', { as: 'raw', eager: true });

export const getBlogs = () => {
    const blogs = Object.keys(modules).map((path) => {
        const fileContent = modules[path];
        const { data, content } = parseFrontMatter(fileContent);

        // Extract slug from directory name (e.g., ../blogs/my-post/index.md -> my-post)
        const parts = path.split('/');
        const slug = parts[parts.length - 2];

        return {
            slug,
            ...data, // spread frontmatter (title, date, etc.)
            content,
        };
    });

    // Sort by date (newest first)
    return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getBlogBySlug = (slug) => {
    const blogs = getBlogs();
    return blogs.find((blog) => blog.slug === slug);
};
