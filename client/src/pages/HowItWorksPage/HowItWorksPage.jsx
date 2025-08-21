import { useState } from 'react';
import SaleBanner from '../../components/HowItWorks/SaleBanner/SaleBanner';
import Header from '../../components/HowItWorks/Header/Header';
import MainSection from '../../components/HowItWorks/MainSection/MainSection';
import Ways from '../../components/HowItWorks/Ways/Ways';
import Steps from '../../components/HowItWorks/Steps/Steps';
import Search from '../../components/HowItWorks/Search/Search';
import Faq from '../../components/HowItWorks/Faq/Faq';
import Footer from '../../components/HowItWorks/Footer/Footer';

import styles from './HowItWorksPage.module.sass';
import SearchInput from '../../components/HowItWorks/Header/SearchInput/SearchInput';

const HowItWorksPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const isActive = showSearch ? styles.active : '';
  
  return (
    <>
      <div className={styles.headerSale}>
        <div className={styles.container}>
          <SaleBanner />
        </div>
      </div>
      <header className={`${styles.header} ${isActive}`}>
        <div className={styles.container}>
          <Header setShowSearch={setShowSearch} showSearch={showSearch} />
        </div>
      </header>

      <div
        className={`${styles.menuOverlay} ${isActive}`}
        onClick={() => setShowSearch(false)}
      />
      <div className={`${styles.searchWidget} ${isActive}`}>
        <div className={styles.container}>
          <SearchInput />
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.container}>
          <MainSection />
        </div>
      </main>

      <section className={styles.ways}>
        <div className={styles.container}>
          <Ways />
        </div>
      </section>

      <section className={styles.steps}>
        <div className={styles.container}>
          <Steps />
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.container}>
          <Faq />
        </div>
      </section>

      <section className={styles.search}>
        <div className={styles.container}>
          <Search />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Footer />
        </div>
      </footer>
    </>
  );
};

export default HowItWorksPage;
