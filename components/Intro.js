import React, { Suspense } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

import homeStyles from "../styles/Home.module.css";
import styles from "../styles/Intro.module.css";

function Intro() {
  const textArray = ["Fourth year Honours BSc Computer Science @uOttawa", "Graduate Microprogram in Cybersecurity"];

  const handlePrimaryCTA = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    window.dispatchEvent(new Event("contact:openForm"));
    track("cta_click", { location: "intro", target: "contact" });
  };

  return (
    <div id="intro" className={homeStyles.layer}>
      <div className={homeStyles.leftHalf}>
        <Suspense
          fallback={
            <Image
              src="https://ykdevelops.s3.us-east-2.amazonaws.com/contact/introGif-min.png"
              alt="headshot"
              width={500}
              height={500}
              className={styles.introPic}
            />
          }
        >
          <Image
            src="https://ykdevelops.s3.us-east-2.amazonaws.com/intro/introArtCompressed.gif"
            alt="headshot"
            width={600}
            height={600}
            className={styles.introPic}
            priority
            unoptimized
          />
        </Suspense>
      </div>
      <div className={homeStyles.rightHalf}>
        <div className={homeStyles.textContainer}>
         <span className={styles.introName}>Youssef Khalil</span>
          <div className={styles.introDescription}>
            {textArray.map((text, index) => (
              <h2 key={index} className={styles.introDescriptionLine}>
                {text}
              </h2>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <a
              href="#contact"
              onClick={handlePrimaryCTA}
              className={styles.primaryCTA}
              aria-label="Get in touch (opens contact form)"
            >
              Get in touch
            </a>
            <div className={homeStyles.contactIconLinks}>
              <a
                href="https://ykdevelops.s3.us-east-2.amazonaws.com/contact/Youssef_Khalil_2025_Resume+(3).pdf"
                target="_blank"
                rel="noreferrer"
                download
                className={homeStyles.contactIconLink}
              >
                <Suspense fallback={<div className={homeStyles.loaderImage}></div>}>
                  <Image
                    src="https://ykdevelops.s3.us-east-2.amazonaws.com/contact/resumeIcon.png"
                    alt="Resume"
                    width={397}
                    height={512}
                    className={homeStyles.contactIconSmall}
                  />
                </Suspense>
                <span className={homeStyles.contactIconLabel}>Resume</span>
              </a>

              <a
                href="https://linkedin.com/in/ykdevelops"
                target="_blank"
                rel="noreferrer"
                className={homeStyles.contactIconLink}
              >
                <Suspense fallback={<div className={homeStyles.loaderImage}></div>}>
                  <Image
                    src="https://ykdevelops.s3.us-east-2.amazonaws.com/contact/linkedin2.png"
                    alt="linkedin"
                    width={500}
                    height={500}
                    className={homeStyles.contactIconSmall}
                  />
                </Suspense>
                <span className={homeStyles.contactIconLabel}>LinkedIn</span>
              </a>

              <a
                href="https://github.com/ykdevelops"
                target="_blank"
                rel="noreferrer"
                className={homeStyles.contactIconLink}
              >
                <Suspense fallback={<div className={homeStyles.loaderImage}></div>}>
                  <Image
                    src="https://ykdevelops.s3.us-east-2.amazonaws.com/contact/github.png"
                    alt="github"
                    width={500}
                    height={500}
                    className={homeStyles.contactIconSmall}
                  />
                </Suspense>
                <span className={homeStyles.contactIconLabel}>GitHub</span>
              </a>

         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
