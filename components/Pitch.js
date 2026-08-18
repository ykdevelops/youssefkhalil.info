import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import { track } from "@vercel/analytics";
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/Pitch.module.css';

export default function Pitch() {
  const [hoveredCards, setHoveredCards] = useState(new Set());
  const [toggledCards, setToggledCards] = useState(new Set());

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Also open the contact form
    window.dispatchEvent(new Event('contact:openForm'));
    track("cta_click", { location: "pitch", target: "contact" });
  };

  const handleCardHover = (index, isEntering) => {
    if (isEntering) {
      setHoveredCards(prev => new Set(prev).add(index));
    } else {
      setHoveredCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const handleCardToggle = (index) => {
    setToggledCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleCardKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardToggle(index);
    }
  };

  return (
    <div id="service" className={styles.pitchSection}>
      <div className={styles.pitchWrapper}>
        {/* Title Row - Full Width */}
        <div className={homeStyles.containerTitleRow}>
          <Suspense fallback={<div>Loading icon...</div>}>
            <Image
              src="/wms-icon.svg"
              alt="webManagementIcon"
              width={150}
              height={150}
              className={homeStyles.sectionTitleIcon}
              unoptimized
            />
          </Suspense>
          <h1 className={homeStyles.sectionTitle}>Website Service</h1>
        </div>

        {/* Content Row - Two Columns */}
        <div className={styles.pitchContentRow}>
          {/* Left Column - Paragraph and 2x2 cards (appears on left on desktop, first on mobile) */}
          <div className={styles.pitchLeftColumn}>
            {/* Main Paragraph */}
            <div className={styles.pitchParagraphWrapper}>
              <p className={styles.pitchParagraph}>
                Need a new website?
                <br />
                Update an existing one?
                <br />
                Stay <strong>stress free</strong> and <strong>business focused</strong>.
              </p>
            </div>

            <div className={styles.pitchExpectationsList}>
              <div 
                className={`${styles.pitchExpectationItem} ${(hoveredCards.has(0) || toggledCards.has(0)) ? styles.flipped : ''}`}
                onMouseEnter={() => handleCardHover(0, true)}
                onMouseLeave={() => handleCardHover(0, false)}
                onClick={() => handleCardToggle(0)}
                onKeyDown={(e) => handleCardKeyDown(e, 0)}
                role="button"
                tabIndex={0}
                aria-pressed={hoveredCards.has(0) || toggledCards.has(0)}
                aria-label="Strategy session (toggle details)"
              >
                <div className={styles.pitchCardInner}>
                  <div className={styles.pitchCardFront}>
                    <h3 className={`itemLevel1 ${styles.pitchExpectationTitle}`}>Strategy session</h3>
                  </div>
                  <div className={styles.pitchCardBack}>
                    <p className={`itemLevel3 ${styles.pitchExpectationDescription}`}>
                      Goals, brand, and user journey, plus a clear plan for what we are improving first.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`${styles.pitchExpectationItem} ${(hoveredCards.has(1) || toggledCards.has(1)) ? styles.flipped : ''}`}
                onMouseEnter={() => handleCardHover(1, true)}
                onMouseLeave={() => handleCardHover(1, false)}
                onClick={() => handleCardToggle(1)}
                onKeyDown={(e) => handleCardKeyDown(e, 1)}
                role="button"
                tabIndex={0}
                aria-pressed={hoveredCards.has(1) || toggledCards.has(1)}
                aria-label="Technical and content audit (toggle details)"
              >
                <div className={styles.pitchCardInner}>
                  <div className={styles.pitchCardFront}>
                    <h3 className={`itemLevel1 ${styles.pitchExpectationTitle}`}>Technical and content audit</h3>
                  </div>
                  <div className={styles.pitchCardBack}>
                    <p className={`itemLevel3 ${styles.pitchExpectationDescription}`}>
                      A focused review, with recommendations ranked by research and impact.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`${styles.pitchExpectationItem} ${(hoveredCards.has(2) || toggledCards.has(2)) ? styles.flipped : ''}`}
                onMouseEnter={() => handleCardHover(2, true)}
                onMouseLeave={() => handleCardHover(2, false)}
                onClick={() => handleCardToggle(2)}
                onKeyDown={(e) => handleCardKeyDown(e, 2)}
                role="button"
                tabIndex={0}
                aria-pressed={hoveredCards.has(2) || toggledCards.has(2)}
                aria-label="Build, polish, launch (toggle details)"
              >
                <div className={styles.pitchCardInner}>
                  <div className={styles.pitchCardFront}>
                    <h3 className={`itemLevel1 ${styles.pitchExpectationTitle}`}>Build, polish, launch</h3>
                  </div>
                  <div className={styles.pitchCardBack}>
                    <p className={`itemLevel3 ${styles.pitchExpectationDescription}`}>
                      Implementation, QA, and a clean rollout.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`${styles.pitchExpectationItem} ${(hoveredCards.has(3) || toggledCards.has(3)) ? styles.flipped : ''}`}
                onMouseEnter={() => handleCardHover(3, true)}
                onMouseLeave={() => handleCardHover(3, false)}
                onClick={() => handleCardToggle(3)}
                onKeyDown={(e) => handleCardKeyDown(e, 3)}
                role="button"
                tabIndex={0}
                aria-pressed={hoveredCards.has(3) || toggledCards.has(3)}
                aria-label="Website care (toggle details)"
              >
                <div className={styles.pitchCardInner}>
                  <div className={styles.pitchCardFront}>
                    <h3 className={`itemLevel1 ${styles.pitchExpectationTitle}`}>Website care</h3>
                  </div>
                  <div className={styles.pitchCardBack}>
                    <p className={`itemLevel3 ${styles.pitchExpectationDescription}`}>
                      Proactive upkeep, quick fixes, and ongoing updates when your business changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Video and CTA button (appears on right on desktop, second on mobile) */}
          <div className={styles.pitchRightColumn}>
            {/* Video */}
            <div className={styles.pitchButtonImageRow}>
              <div className={styles.pitchGifContainer}>
                <Suspense fallback={<div>Loading...</div>}>
                  <div className={styles.pitchGifWrapper}>
                    <Image
                      src="https://ykdevelops.s3.us-east-2.amazonaws.com/pitchArtCompressed.gif"
                      alt="web service illustration"
                      fill
                      className={styles.pitchGif}
                      sizes="(max-width: 768px) 250px, 200px"
                      unoptimized
                    />
                  </div>
                </Suspense>
              </div>
            </div>

            {/* CTA Button - Below the video */}
            <div className={styles.pitchCTAContainer}>
              <a href="#contact" onClick={handleScrollToContact} className={styles.pitchCTA}>
                Book a free consult
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

