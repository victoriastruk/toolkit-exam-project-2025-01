import { useRef, useState } from 'react';
import { faqData } from './faqData';
import styles from './Faq.module.sass';

const Faq = () => {
  const sectionRefs = useRef({});
  const sectionNames = Object.keys(faqData);

  const [openIndexes, setOpenIndexes] = useState({});

  const [activeSection, setActiveSection] = useState(sectionNames[0]);

  const handleScroll = (section) => {
    setActiveSection(section);

    const target = sectionRefs.current[section];
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - 20;
    smoothScrollTo(targetY, 2000);
  };

  const toggleAnswer = (section, index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [section]: prev[section]?.includes(index)
        ? prev[section].filter((i) => i !== index)
        : [...(prev[section] || []), index],
    }));
  };

  const smoothScrollTo = (targetY, duration) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const scroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <div className={styles.faqWrapper}>
      <h3 className={styles.titleSection}>Frequently Asked Questions</h3>
      <div className={styles.faqInner}>
        <div className={styles.tabs}>
          {sectionNames.map((section) => (
            <span
              key={section}
              className={`${styles.tab} ${
                activeSection === section ? styles.active : ''
              }`}
              onClick={() => handleScroll(section)}
            >
              {section}
            </span>
          ))}
        </div>

        <div className={styles.content}>
          {Object.entries(faqData).map(([section, questions]) => (
            <div
              key={section}
              ref={(el) => (sectionRefs.current[section] = el)}
              className={styles.section}
            >
              <h3 className={styles.title}>{section}</h3>
              {questions.map((item, index) => (
                <div key={index} className={styles.item}>
                  <button
                    className={`${styles.question} ${
                      openIndexes[section]?.includes(index) ? styles.open : ''
                    }`}
                    onClick={() => toggleAnswer(section, index)}
                  >
                    {item.question}
                  </button>
                  <div
                    className={`${styles.answer} ${
                      openIndexes[section]?.includes(index) ? styles.open : ''
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
