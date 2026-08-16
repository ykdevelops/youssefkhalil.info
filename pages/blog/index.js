import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../lib/blogPosts';
import homeStyles from '../../styles/Home.module.css';
import workStyles from '../../styles/Work.module.css';
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
          <p className={pageStyles.blogPageSubtitle}>All posts</p>

          <div id="blog" className={workStyles.workContainer}>
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
              <Link href="/" className={styles.seeMore}>
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
