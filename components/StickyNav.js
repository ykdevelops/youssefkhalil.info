import React from "react";
import styles from "../styles/StickyNav.module.css";

const NAV_ITEMS = [
  { id: "intro", label: "Intro" },
  { id: "service", label: "Service" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function StickyNav() {
  const handleJump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.stickyWrap} role="navigation" aria-label="Page sections">
      <div className={styles.inner}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={styles.navLink}
            onClick={(e) => handleJump(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
