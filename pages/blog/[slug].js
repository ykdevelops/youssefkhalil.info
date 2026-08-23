import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllSlugs } from '../../lib/blogPosts';
import pageStyles from '../../styles/BlogPage.module.css';
import styles from '../../styles/BlogPost.module.css';

export async function getStaticPaths() {
  const slugs = getAllSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

function renderInlineContent(content) {
  if (typeof content === 'string') return content;

  return content.map((segment, index) => {
    if (segment.type === 'strong') {
      return <strong key={index}>{segment.text}</strong>;
    }

    if (segment.type === 'code') {
      return (
        <code key={index} className={styles.inlineCode}>
          {segment.text}
        </code>
      );
    }

    return <React.Fragment key={index}>{segment.text}</React.Fragment>;
  });
}

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} — Youssef Khalil</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://youssefkhalil.info/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumb} />
      </Head>
      <div className={pageStyles.blogPage}>
        <article className={`${pageStyles.blogPageInner} ${styles.article}`}>
          <nav className={pageStyles.blogPageNav} aria-label="Breadcrumb">
            <Link href="/blog" className={pageStyles.blogPageNavLink}>
              ← All posts
            </Link>
            <span style={{ color: 'var(--color-text-muted)', margin: '0 0.5rem' }}>·</span>
            <Link href="/" className={pageStyles.blogPageNavLink}>
              Home
            </Link>
          </nav>

          <div className={styles.readingPanel}>
            <header className={styles.header}>
              {post.showHero !== false && (
                <Image
                  src={post.thumb}
                  alt=""
                  width={800}
                  height={450}
                  className={styles.heroImage}
                />
              )}
              <div className={styles.articleMeta}>
                <span className={styles.category}>{post.category || 'Blog'}</span>
                <span aria-hidden="true">•</span>
                <time dateTime={post.dateTime}>{post.date}</time>
                {post.readTime && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.dek}>{post.excerpt}</p>
            </header>

            <div className={styles.body}>
              {post.body.map((block, i) => {
                switch (block.type) {
                case 'heading':
                  return (
                    <h2 key={i} className={styles.heading}>
                      {block.content}
                    </h2>
                  );
                case 'subheading':
                  return (
                    <h3 key={i} className={styles.subheading}>
                      {block.content}
                    </h3>
                  );
                case 'list':
                  return (
                    <ul key={i} className={styles.list}>
                      {block.items.map((item, itemIndex) => (
                        <li key={`${i}-${itemIndex}`} className={styles.listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                case 'flow':
                  return (
                    <div
                      key={i}
                      className={`${styles.flow} ${block.vertical ? styles.flowVertical : ''}`}
                      aria-label={block.items.join(' to ')}
                    >
                      {block.items.map((item, itemIndex) => (
                        <React.Fragment key={item}>
                          <span className={styles.flowItem}>{item}</span>
                          {itemIndex < block.items.length - 1 && (
                            <span className={styles.flowArrow} aria-hidden="true">
                              →
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  );
                case 'divider':
                  return <hr key={i} className={styles.divider} />;
                case 'paragraph':
                default:
                  return (
                    <p key={i} className={styles.paragraph}>
                      {renderInlineContent(block.content)}
                    </p>
                  );
                }
              })}
            </div>
          </div>

          <nav className={styles.footerLinks} aria-label="Post navigation">
            <Link href="/blog" className={styles.backLink}>
              ← All posts
            </Link>
            <Link href="/" className={styles.backLink}>
              ← Home
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}
