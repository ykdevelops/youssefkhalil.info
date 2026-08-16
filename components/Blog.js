import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import workStyles from '../styles/Work.module.css';
import styles from '../styles/Blog.module.css';
import { blogPosts } from '../lib/blogPosts';

export default function Blog() {
  return (
    <div id="blog" className={homeStyles.layer}>
      <div className={workStyles.workContainer}>
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

        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={styles.blogCardLink}
            aria-label={`Read ${post.title}`}
          >
            <div className={`${workStyles.workCompany} ${styles.blogCard}`}>
              <div className={workStyles.workCompanyHeader}>
                <Image
                  src={post.thumb}
                  alt=""
                  width={150}
                  height={150}
                  className={workStyles.workLogo}
                />
                <div className={workStyles.workInfo}>
                  <time className={workStyles.workDate} dateTime={post.dateTime}>
                    {post.date}
                  </time>
                  <h2 className={workStyles.workCompanyTitle}>{post.title}</h2>
                  <p className={workStyles.workPositionTitle}>{post.excerpt}</p>
                  <span className={styles.readHint}>Read post →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className={styles.seeMoreWrap}>
          <Link href="/blog" className={styles.seeMore}>
            See more →
          </Link>
        </div>
      </div>
    </div>
  );
}
