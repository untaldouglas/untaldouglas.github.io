import { useEffect, useState } from "react";
import { marked } from "marked";

const BASE = import.meta.env.BASE_URL;

function usePosts() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch(`${BASE}posts/index.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);
  return posts;
}

function PostList({ posts, t }) {
  if (posts === null) return <p className="loading">{t.loading}</p>;
  if (posts.length === 0) return <p className="empty">{t.empty}</p>;
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="post-list">
      {sorted.map((p) => (
        <a className="post-row" key={p.slug} href={`#/blog/${p.slug}`}>
          <span className="post-date">{p.date}</span>
          <span>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </span>
          <span className="post-lang">{p.lang.toUpperCase()}</span>
        </a>
      ))}
    </div>
  );
}

function Post({ slug, posts, t }) {
  const [html, setHtml] = useState(null);
  const meta = posts?.find((p) => p.slug === slug);

  useEffect(() => {
    if (!meta) return;
    fetch(`${BASE}posts/${meta.file}`)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((md) => setHtml(marked.parse(md)))
      .catch(() => setHtml(""));
  }, [meta]);

  if (posts === null) return <p className="loading">{t.loading}</p>;
  if (!meta) return (
    <div>
      <p className="empty">{t.notFound}</p>
      <a className="back-link" href="#/blog">{t.back}</a>
    </div>
  );

  return (
    <article className="article">
      <a className="back-link" href="#/blog">{t.back}</a>
      <div className="article-head">
        <h1>{meta.title}</h1>
        <p className="article-meta">{meta.date} · {meta.lang.toUpperCase()}</p>
      </div>
      {html === null
        ? <p className="loading">{t.loading}</p>
        : <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />}
    </article>
  );
}

export function Blog({ route, t }) {
  const posts = usePosts();
  return (
    <section>
      {route.name === "blog" && (
        <>
          <div className="sec-head">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2>{t.title}</h2>
            <p>{t.sub}</p>
          </div>
          <PostList posts={posts} t={t} />
        </>
      )}
      {route.name === "post" && <Post slug={route.slug} posts={posts} t={t} />}
    </section>
  );
}
