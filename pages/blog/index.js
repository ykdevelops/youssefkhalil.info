import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../lib/blogPosts';
import styles from '../../styles/Blog.module.css';
import pageStyles from '../../styles/BlogPage.module.css';

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>Blog — Youssef Khalil</title>
        <meta name="description" content="Blog posts by Youssef Khalil." />
        <link rel="canonical" href="https://youssefkhalil.info/blog" />
      </Head>
      <div className={pageStyles.blogPage}>
        <div className={pageStyles.blogPageInner}>
          <nav className={pageStyles.blogPageNav} aria-label="Breadcrumb">
            <Link href="/" className={pageStyles.blogPageNavLink}>
              ← Home
            </Link>
          </nav>
          <h1 className={pageStyles.blogPageTitle}>Blog</h1>
          <p className={pageStyles.blogPageSubtitle}>
            Writing about software, infrastructure, cybersecurity, and learning by building.
          </p>

          <div className={`${styles.blogGrid} ${styles.blogGridColumn}`}>
            {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={styles.blogCardLink}
                  aria-label={`Read ${post.title}`}
                >
                  <article className={`${styles.blogCard} ${post.showHero === false ? styles.textOnlyCard : ''}`}>
                    {post.showHero !== false && (
                      <div className={styles.thumbnailWrap}>
                        <Image
                          src={post.thumb}
                          alt=""
                          width={150}
                          height={150}
                          className={styles.thumbnail}
                        />
                      </div>
                    )}
                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span>{post.category || 'Blog'}</span>
                        <span aria-hidden="true">•</span>
                        <time dateTime={post.dateTime}>{post.date}</time>
                      </div>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <span className={styles.readHint}>
                        {post.readTime || 'Read post'}
                        <span className={styles.readArrow} aria-hidden="true">→</span>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
          </div>

          <div className={styles.seeMoreWrap}>
            <Link href="/" className={styles.seeMore}>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
