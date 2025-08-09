import DomainList from './DomainList/DomainList';
import SubMenuItem from './SubMenuItem/SubMenuItem';
import PromoCard from './PromoCard/PromoCard';
import {
  domainList,
  brandingContext,
  contestsList,
  researchTesting,
  trademarks,
  generatorList,
  aboutList,
} from './menuData';
import styles from './MainMenu.module.sass';

const MainMenu = () => {
  
  return (
    <ul className={styles.mainMenu}>
      <li>
        <div className={styles.noLink}>Domains for Sale</div>
        <div className={styles.subMenu}>
          <ul className={styles.mainLeftLinks}>
            <li>
              <SubMenuItem
                href="https://www.atom.com/premium-domains-for-sale"
                icon="/staticImages/cdm_icon.svg"
                title="Premium Domain Marketplace"
                description="Explore 300,000+ expert-curated, brandable domains to elevate your business."
              />
            </li>

            <li>
              <SubMenuItem
                href="https://www.atom.com/ultra-premium-marketplace/all"
                icon="/staticImages/upm_icon.svg"
                title="Ultra Premium Marketplace"
                description="Discover the world’s most coveted and powerful domains for top-tier brands."
              />
            </li>

            <li>
              <SubMenuItem
                href="https://www.atom.com/sapphire/all"
                icon="/staticImages/sapphire_icon.svg"
                title="Sapphire Marketplace"
                description="Find one-word domains with modern extensions like .ai, .io, and .xyz."
              />
            </li>
          </ul>

          <DomainList
            title="Top Domain Collections"
            items={domainList}
            bage="Popular"
            padding={'25px'}
            width={'20rem'}
          />

          <PromoCard
            backgroundImage="/staticImages/get_started_bg.svg"
            image="/staticImages/get_started.webp"
            isImg={true}
            title="Get Started"
            description="Find your perfect domain today and buy instantly in the Atom.com marketplace."
          />
        </div>
      </li>

      <li>
        <div className={styles.noLink}> Naming & Branding</div>
        <div className={`${styles.subMenu} ${styles.NamingAndBrand}`}>
          <div className={styles.mainLeftLinks}>
            <SubMenuItem
              href="https://www.atom.com/branding-marketing-naming-contests"
              title="Start a Naming Contest"
              description="Launch a name and domain contest today for 1000s of unique
                      name ideas!"
            />
            <DomainList title="Brading Contest" items={brandingContext} />
          </div>

          <DomainList
            title="Contest Details"
            items={contestsList}
            padding={'25px'}
            width={'16.25rem'}
          />

          <PromoCard
            backgroundImage="/staticImages/brand_naming_bg.svg"
            image="/staticImages/agency_style.webp"
            title="Agency Style Experience"
            description="Work with a naming and branding expert in our
              better-than-an-agency managed contests."
          />
        </div>
      </li>

      <li>
        <div className={styles.noLink}> Research & Testing</div>

        <div className={`${styles.subMenu} ${styles.researchAndTesting}`}>
          <div className={styles.mainLeftLinks}>
            <SubMenuItem
              href="https://www.atom.com/branding-marketing-naming-contests"
              icon="/staticImages/audience_research.svg"
              title="Audience Research"
              description="Business decisions are easier with data. Run targeted surveys on just about anything, and get real data fast!"
            />
          </div>
          <DomainList items={researchTesting} columns={2} />
        </div>
      </li>

      <li>
        <div className={styles.noLink}> Trademarks</div>

        <div className={`${styles.subMenu} ${styles.trademarks}`}>
          <div className={styles.mainLeftLinks}>
            <SubMenuItem
              href="https://helpdesk.atom.com/squadhelp-services/trademark-filing-package"
              icon="/staticImages/trademark_filling.svg"
              title="Trademark Filing"
              description="Protect your brand with trademark services spanning search to filing."
            />
          </div>
          <DomainList items={trademarks} padding={'15px'} />
        </div>
      </li>
      <li>
        <div className={styles.noLink}> Resources</div>

        <div className={`${styles.subMenu} ${styles.resources}`}>
          <ul className={styles.mainLeftLinks}>
            <li>
              <SubMenuItem
                href="https://www.atom.com/business-name-generator"
                icon="/staticImages/bsg.svg"
                title="Business Name Generator"
                description="Be inspired by our AI-powered generators! Get 1000s of name ideas in seconds."
              />
            </li>
            <DomainList items={generatorList} padding={'0px 0px 25px 75px'} />
            <li>
              <SubMenuItem
                href="https://www.atom.com/logo-maker"
                icon="/staticImages/ai.svg"
                title="AI Logo Maker"
                description="Create eye-catching logos in minutes and make your brand memorable."
              />
            </li>
          </ul>

          <ul className={styles.mainLeftLinks}>
            <li>
              <SubMenuItem
                href="https://www.atom.com/brand-alignment"
                icon="/staticImages/alignment_tool.svg"
                title="Brand Alignment Tool"
                description="Make the right naming choice with our AI-powered brand alignment tool."
              />
            </li>

            <li>
              <SubMenuItem
                href="https://www.atom.com/radar/"
                icon="/staticImages/atom_radar.svg"
                title="AtomRadar"
                description="Exclusive naming and branding research from Atom.com."
              />
            </li>

            <li>
              <SubMenuItem
                href="https://www.atom.com/build-a-brand"
                icon="/staticImages/brand_book.svg"
                title="Build a Brandbook"
                description="Create a free brand bible in minutes using our AI-assisted builder."
              />
            </li>

            <li>
              <SubMenuItem
                href="https://www.atom.com/build-a-brand"
                icon="/staticImages/start_up.svg"
                title="Startup Toolkit"
                description="Explore apps and services to help your startup thrive."
              />
            </li>
          </ul>

          <DomainList
            title="Atom.com"
            items={aboutList}
            bage="AtomConnect"
            padding={'25px'}
            width={'280px'}
          />

          <PromoCard
            backgroundImage="/staticImages/domain_score_bg.svg"
            image="/staticImages/domain_score.svg"
            title="AI Domain Appraisal Tool"
            description="Discover the value of your domains, based on 50+ data points and powered by effective AI."
          />
        </div>
      </li>
    </ul>
  );
};

export default MainMenu;
