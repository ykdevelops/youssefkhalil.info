import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/Blog.module.css';
import { blogPosts } from '../lib/blogPosts';

export default function Blog() {
  return (
    <div id="blog" className={homeStyles.layer}>
      <div className={styles.blogSection}>
        <div className={homeStyles.containerTitleRow}>
          <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
            <Image
              src="/blog-icon.svg"
              alt="Blog"
              width={150}
              height={150}
              className={homeStyles.sectionTitleIcon}
              unoptimized
            />
          </Suspense>
          <h1 className={homeStyles.sectionTitle}>Blog</h1>
        </div>

        <div className={styles.blogGrid}>
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
          <Link href="/blog" className={styles.seeMore}>
            See more →
          </Link>
        </div>
      </div>
    </div>
  );
}
