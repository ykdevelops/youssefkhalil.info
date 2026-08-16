import React, { Suspense } from 'react';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import workStyles from '../styles/Work.module.css';
import timelineStyles from '../styles/WorkExperience.module.css';

const TIMELINE_COLORS = [
  '#7dd3fc', /* light blue */
  '#fdba74', /* orange */
  '#a78bfa', /* purple */
];

const EXPERIENCES = [
  {
    company: 'QuoteMedia, Inc.',
    role: 'Intermediate Front End Developer',
    date: 'August 2022 - March 2023',
    logo: 'https://ykdevelops.s3.us-east-2.amazonaws.com/work/qm.jpeg',
    logoAlt: 'QuoteMedia logo',
  },
  {
    company: 'SpeakHabla',
    role: 'Junior Full Stack Developer',
    date: 'April 2022 - September 2022',
    logo: 'https://ykdevelops.s3.us-east-2.amazonaws.com/work/speakHablaLogo.jpeg',
    logoAlt: 'SpeakHabla logo',
  },
  {
    company: 'IBM/SLiDE',
    role: 'Junior Front End Developer',
    date: 'September 2021 - December 2021',
    logo: 'https://ykdevelops.s3.us-east-2.amazonaws.com/work/ibm-logo.jpeg',
    logoAlt: 'IBM logo',
  },
];

export default function WorkExperience() {
  return (
    <div id="work" className={homeStyles.layer}>
      <div className={workStyles.workContainer}>
        <div className={homeStyles.containerTitleRow}>
          <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
            <Image
              src="/suitcase.svg"
              alt="work icon"
              width={150}
              height={150}
              className={homeStyles.sectionTitleIcon}
              unoptimized
            />
          </Suspense>
          <h1 className={homeStyles.sectionTitle}>Work Experience</h1>
        </div>

        <div className={timelineStyles.timeline}>
          <div className={timelineStyles.timelineLine} aria-hidden="true" />
          {EXPERIENCES.map((exp, i) => {
            const color = TIMELINE_COLORS[i % TIMELINE_COLORS.length];
            return (
              <div key={i} className={timelineStyles.timelineItem}>
                <p className={timelineStyles.timelineDate}>{exp.date}</p>
                <div
                  className={timelineStyles.timelineNode}
                  style={{ borderColor: color }}
                  aria-hidden="true"
                />
                <div className={timelineStyles.timelineContent}>
                  <Suspense fallback={<div className={homeStyles['loading-image']} style={{ width: 128, height: 128 }} />}>
                    <Image
                      src={exp.logo}
                      alt={exp.logoAlt}
                      width={128}
                      height={128}
                      className={timelineStyles.timelineLogo}
                    />
                  </Suspense>
                  <div className={timelineStyles.timelineText}>
                    <h2
                      className={timelineStyles.timelineTitle}
                    >
                      {exp.company}
                    </h2>
                    <p className={timelineStyles.timelineRole}>{exp.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
