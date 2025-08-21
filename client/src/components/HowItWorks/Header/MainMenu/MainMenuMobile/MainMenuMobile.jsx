import { useState } from 'react';
import DomainList from '../DomainList/DomainList';
import SubMenuItem from '../SubMenuItem/SubMenuItem';
import PromoCard from '../PromoCard/PromoCard';
import {
  domainList,
  brandingContext,
  contestsList,
  researchTesting,
  trademarks,
  generatorList,
  aboutList,
} from '../menuData';
import constants from '../../../../../constants';
import styles from './MainMenuMobile.module.sass';

const { STATIC_IMAGES_PATH } = constants;

const MainMenuMobile = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const menuItems = [
    {
      label: 'Domains for Sale',
      content: (
        <>
          <ul className={styles.mainLeftLinks}>
            <li>
              <SubMenuItem
                href="https://www.atom.com/premium-domains-for-sale"
                icon={`${STATIC_IMAGES_PATH}cdm_icon.svg`}
                title="Premium Domain Marketplace"
                description="Explore 300,000+ expert-curated, brandable domains to elevate your business."
                mobile={true}
              />
            </li>
            <li>
              <SubMenuItem
                href="https://www.atom.com/ultra-premium-marketplace/all"
                icon={`${STATIC_IMAGES_PATH}upm_icon.svg`}
                title="Ultra Premium Marketplace"
                description="Discover the world’s most coveted and powerful domains for top-tier brands."
                mobile={true}
              />
            </li>
            <li>
              <SubMenuItem
                href="https://www.atom.com/sapphire/all"
                icon={`${STATIC_IMAGES_PATH}sapphire_icon.svg`}
                title="Sapphire Marketplace"
                description="Find one-word domains with modern extensions like .ai, .io, and .xyz."
                mobile={true}
              />
            </li>
          </ul>

          <DomainList
            title="Top Domain Collections"
            items={domainList}
            bage="Popular"
            width={'20rem'}
          />

          <PromoCard
            backgroundImage="/staticImages/get_started_bg.svg"
            image={`${STATIC_IMAGES_PATH}get_started.webp`}
            isImg={true}
            title="Get Started"
            description="Find your perfect domain today and buy instantly in the Atom.com marketplace."
            mobile={true}
          />
        </>
      ),
    },
    {
      label: 'Naming & Branding',
      content: (
        <div className={styles.NamingAndBrand}>
          <div className={styles.mainLeftLinks}>
            <SubMenuItem
              href="https://www.atom.com/branding-marketing-naming-contests"
              title="Start a Naming Contest"
              description="Launch a name and domain contest today for 1000s of unique name ideas!"
              mobile={true}
            />
            <DomainList
              title="Branding Contest"
              items={brandingContext}
              padding={'0'}
            />
          </div>

          <DomainList
            title="Contest Details"
            items={contestsList}
            width={'16.25rem'}
          />

          <PromoCard
            backgroundImage={`${STATIC_IMAGES_PATH}brand_naming_bg.svg`}
            image={`${STATIC_IMAGES_PATH}agency_style.webp`}
            title="Agency Style Experience"
            description="Work with a naming and branding expert in our better-than-an-agency managed contests."
            mobile={true}
          />
        </div>
      ),
    },
    {
      label: 'Research & Testing',
      content: (
        <div className={styles.researchAndTesting}>
          <div className={styles.mainLeftLinks}>
            <SubMenuItem
              href="https://www.atom.com/branding-marketing-naming-contests"
              icon={`${STATIC_IMAGES_PATH}audience_research.svg`}
              title="Audience Research"
              description="Business decisions are easier with data. Run targeted surveys on just about anything, and get real data fast!"
              mobile={true}
            />
          </div>
          <DomainList items={researchTesting} columns={1} />
        </div>
      ),
    },
    {
      label: 'Trademarks',
      content: (
        <div className={styles.trademarks}>
          <div className={styles.mainLeftLinks}>
            <SubMenuItem
              href="https://helpdesk.atom.com/squadhelp-services/trademark-filing-package"
              icon={`${STATIC_IMAGES_PATH}trademark_filling.svg`}
              title="Trademark Filing"
              description="Protect your brand with trademark services spanning search to filing."
              mobile={true}
            />
          </div>
          <DomainList items={trademarks} padding={'0'} />
        </div>
      ),
    },
    {
      label: 'Resources',
      content: (
        <>
          <ul className={styles.mainLeftLinks}>
            <li>
              <SubMenuItem
                href="https://www.atom.com/business-name-generator"
                icon={`${STATIC_IMAGES_PATH}bsg.svg`}
                title="Business Name Generator"
                description="Be inspired by our AI-powered generators! Get 1000s of name ideas in seconds."
                mobile={true}
              />
            </li>
            <DomainList items={generatorList} padding="0px 0px 5px 0px" />
            <li>
              <SubMenuItem
                href="https://www.atom.com/logo-maker"
                icon={`${STATIC_IMAGES_PATH}ai.svg`}
                title="AI Logo Maker"
                description="Create eye-catching logos in minutes and make your brand memorable."
                mobile={true}
              />
            </li>
          </ul>

          <ul className={styles.mainLeftLinks}>
            <li>
              <SubMenuItem
                href="https://www.atom.com/brand-alignment"
                icon={`${STATIC_IMAGES_PATH}alignment_tool.svg`}
                title="Brand Alignment Tool"
                description="Make the right naming choice with our AI-powered brand alignment tool."
                mobile={true}
              />
            </li>
            <li>
              <SubMenuItem
                href="https://www.atom.com/radar/"
                icon={`${STATIC_IMAGES_PATH}tom_radar.svg`}
                title="AtomRadar"
                description="Exclusive naming and branding research from Atom.com."
                mobile={true}
              />
            </li>
            <li>
              <SubMenuItem
                href="https://www.atom.com/build-a-brand"
                icon={`${STATIC_IMAGES_PATH}brand_book.svg`}
                title="Build a Brandbook"
                description="Create a free brand bible in minutes using our AI-assisted builder."
                mobile={true}
              />
            </li>
            <li>
              <SubMenuItem
                href="https://www.atom.com/build-a-brand"
                icon={`${STATIC_IMAGES_PATH}start_up.svg`}
                title="Startup Toolkit"
                description="Explore apps and services to help your startup thrive."
                mobile={true}
              />
            </li>
          </ul>

          <DomainList
            title="Atom.com"
            items={aboutList}
            bage="AtomConnect"
            width={'280px'}
          />

          <PromoCard
            backgroundImage={`${STATIC_IMAGES_PATH}domain_score_bg.svg`}
            image={`${STATIC_IMAGES_PATH}domain_score.svg`}
            title="AI Domain Appraisal Tool"
            description="Discover the value of your domains, based on 50+ data points and powered by effective AI."
            mobile={true}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.mobileMenu}>
      <ul>
        <li>
          <div className={styles.searchWrapper}>
            <div className={styles.icon}></div>
            <input
              type="text"
              placeholder="Search Over 300,000+ Premium Names"
            />
            <button className={styles.searchBtn}>
              <span></span>
            </button>
          </div>
        </li>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${styles.menuItem} ${
              openIndex === index ? styles.open : ''
            }`}
          >
            <button
              className={styles.noLink}
              onClick={() => handleToggle(index)}
            >
              <span className={styles.title}>{item.label}</span>
              <span
                className={`${styles.arrow} ${
                  openIndex === index ? styles.rotate : ''
                }`}
              ></span>
            </button>
            <div
              className={`${styles.subMenu} ${
                openIndex === index ? styles.show : ''
              }`}
            >
              {item.content}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainMenuMobile;
