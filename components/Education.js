import React, { Suspense } from 'react';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/Education.module.css';
import workStyles from '../styles/Work.module.css';

export default function Education() {
  return (
    <div id="education" className={homeStyles.layer}>
      <div className={workStyles.workContainer}>
        <div className={homeStyles.containerTitleRow}>
          <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
            <Image
              src="https://ykdevelops.s3.us-east-2.amazonaws.com/education/education.png"
              alt="educationIcon"
              width={150}
              height={150}
              className={homeStyles.sectionTitleIcon}
            />
          </Suspense>
          <h1 className={homeStyles.sectionTitle}>Education</h1>
        </div>

        {/* University of Ottawa (Current) */}
        <div className={workStyles.workCompany}>
          <div className={workStyles.workCompanyHeader}>
            <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
              <Image
                src="https://ykdevelops.s3.us-east-2.amazonaws.com/education/uottawa.png"
                alt="University of Ottawa logo"
                width={150}
                height={150}
                className={workStyles.workLogo}
              />
            </Suspense>
            <div className={workStyles.workInfo}>
              <h2 className="itemLevel1">Honours BSc Computer Science</h2>
              <h2 className="itemLevel1">Postgraduate Microprogram in Cybersecurity</h2>
              <h3 className="itemLevel2">University of Ottawa</h3>
              <p className="itemLevel3">Sep 2024 – Sep 2027</p>
            </div>
          </div>
        </div>

        {/* Algonquin College */}
        <div className={workStyles.workCompany}>
          <div className={workStyles.workCompanyHeader}>
            <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
              <Image
                src="https://ykdevelops.s3.us-east-2.amazonaws.com/education/algonquin.png"
                alt="AlgonquinLogo"
                width={150}
                height={150}
                className={workStyles.workLogo}
              />
            </Suspense>
            <div className={workStyles.workInfo}>
              <h2 className="itemLevel1">Mobile Application Design & Development</h2>
              <h3 className="itemLevel2">Algonquin College</h3>
              <p className="itemLevel3">Sep 2019 – Apr 2022</p>
            </div>
          </div>
        </div>

        {/* Google Cybersecurity Specialization */}
        <div className={workStyles.workCompany}>
          <div className={workStyles.workCompanyHeader}>
            <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
              <Image
                src="https://ykdevelops.s3.us-east-2.amazonaws.com/education/google.jpg"
                alt="GoogleLogo"
                width={150}
                height={150}
                className={workStyles.workLogo}
              />
            </Suspense>
            <div className={workStyles.workInfo}>
              <h2 className="itemLevel1">Google Cybersecurity Specialization</h2>
              <p className="itemLevel3">Issued Jan 2025</p>
              <a
                href="https://coursera.org/share/5b806dc8790c26727c4f81e2d6a0f89c"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.eduLink}
              >
                Credential <Image src="/leave-website.svg" alt="external link" width={24} height={16} unoptimized />
              </a>
            </div>
          </div>
        </div>

        {/* AWS Certified Cloud Practitioner */}
        <div className={workStyles.workCompany}>
          <div className={workStyles.workCompanyHeader}>
            <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
              <Image
                src="https://ykdevelops.s3.us-east-2.amazonaws.com/education/aws.jpg"
                alt="AWSLogo"
                width={150}
                height={150}
                className={workStyles.workLogo}
              />
            </Suspense>
            <div className={workStyles.workInfo}>
              <h2 className="itemLevel1">AWS Certified Cloud Practitioner</h2>
              <p className="itemLevel3">Issued Oct 2023 – Expires Oct 2026</p>
              <a
                href="https://www.credly.com/badges/c2c6ded9-a3f6-4461-9618-7ead3a2d43f9/linked_in_profile"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.eduLink}
              >
                Credential <Image src="/leave-website.svg" alt="external link" width={24} height={16} unoptimized />
              </a>
            </div>
          </div>
        </div>

        {/* OpenCV for Beginners */}
        <div className={workStyles.workCompany}>
          <div className={workStyles.workCompanyHeader}>
            <Suspense fallback={<div className={homeStyles['loading-image']}></div>}>
              <Image
                src="https://ykdevelops.s3.us-east-2.amazonaws.com/education/openCV.png"
                alt="OpenCVLogo"
                width={150}
                height={150}
                className={workStyles.workLogo}
              />
            </Suspense>
            <div className={workStyles.workInfo}>
              <h2 className="itemLevel1">OpenCV for Beginners</h2>
              <p className="itemLevel3">Issued May 2023</p>
              <a
                href="https://courses.opencv.org/certificates/f15b061ca3b24324b49cd000d15a2e40"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.eduLink}
              >
                Credential <Image src="/leave-website.svg" alt="external link" width={24} height={16} unoptimized />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
