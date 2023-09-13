import { allBlogPosts, allChangelogPosts } from "contentlayer/generated";

export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
        <title>Dub News</title>
        <subtitle>Dub's Blog and Changelog</subtitle>
        <link href="https://letsfind.my/atom" rel="self"/>
        <link href="https://letsfind.my/"/>
        <updated>${new Date().toISOString()}</updated>
        <id>https://letsfind.my/</id>${[...allBlogPosts, ...allChangelogPosts]
          .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
          .map((post) => {
            return `
        <entry>
            <id>https://letsfind.my/${
              post.type === "BlogPost" ? "blog" : "changelog"
            }/${post.slug}</id>
            <title>${post.title}</title>
            <link href="https://letsfind.my/${
              post.type === "BlogPost" ? "blog" : "changelog"
            }/${post.slug}"/>
            <updated>${post.publishedAt}</updated>
            <author><name>${post.author}</name></author>
        </entry>`;
          })
          .join("")}
    </feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    },
  );
}
