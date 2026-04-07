export default function LearnPage() {
  return (
    <div className="page-content">
      {/* ───── Hero ───── */}
      <div className="hero-section">
        <div className="hero-badge">🛡 A guide for April at Chase</div>
        <h1>Understanding Sanctions</h1>
        <p className="subtitle">
          A step-by-step guide to how sanctions work, why they matter, and how banks like
          JP Morgan Chase use them every day to keep the financial system safe.
        </p>
      </div>

      {/* ───── Table of Contents ───── */}
      <div className="toc">
        <a href="#what">1. What are sanctions?</a>
        <a href="#who">2. Who imposes them?</a>
        <a href="#types">3. Types of sanctions</a>
        <a href="#lists">4. The key lists</a>
        <a href="#banks">5. How banks use them</a>
        <a href="#screening">6. The screening process</a>
        <a href="#roles">7. Roles in sanctions</a>
        <a href="#career">8. Career paths</a>
        <a href="#resources">9. Resources</a>
      </div>

      {/* ───── Section 1: What are sanctions? ───── */}
      <section id="what" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-teal)' }}>1</span>
          What are sanctions?
        </h2>
        <p>
          Sanctions are <strong>rules set by governments</strong> that restrict how
          certain people, companies, or countries can use the financial system. Think of
          them like a "blocked list" — if someone is on it, banks cannot do business with them.
        </p>

        <div className="info-box definition">
          <div className="info-box-title">Simple definition</div>
          <p>
            Sanctions are penalties applied by countries or international organisations
            to restrict trade, finance, or travel with specific targets — to change
            behaviour or protect national security.
          </p>
        </div>

        <h3>Why do sanctions exist?</h3>
        <p>Governments use sanctions to:</p>
        <ul>
          <li><strong>Prevent terrorism</strong> — stop money reaching terrorist groups</li>
          <li><strong>Stop weapons spread</strong> — prevent nuclear and chemical weapons development</li>
          <li><strong>Punish human rights abuses</strong> — hold dictators and oppressive regimes accountable</li>
          <li><strong>Respond to aggression</strong> — economic pressure instead of military action</li>
          <li><strong>Fight corruption</strong> — target officials who steal public money</li>
        </ul>

        <div className="info-box">
          <div className="info-box-title">Real-world example</div>
          <p>
            When Russia invaded Ukraine in 2022, the UK, US, and EU imposed sweeping
            sanctions on Russian banks, oligarchs, and energy companies. This meant UK
            banks had to freeze any Russian-linked accounts and block all payments
            to sanctioned entities — within days.
          </p>
        </div>
      </section>

      {/* ───── Section 2: Who imposes sanctions? ───── */}
      <section id="who" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-blue)' }}>2</span>
          Who imposes sanctions?
        </h2>
        <p>
          Several organisations create and maintain sanctions. Each has their own list of
          sanctioned people, companies, and countries.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--color-uk)' }}>🇬🇧</div>
            <div className="stat-label">UK — OFSI / FCDO</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--color-us)' }}>🇺🇸</div>
            <div className="stat-label">US — OFAC / Treasury</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--color-eu)' }}>🇪🇺</div>
            <div className="stat-label">EU — European Council</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: 'var(--color-un)' }}>🇺🇳</div>
            <div className="stat-label">UN — Security Council</div>
          </div>
        </div>

        <h3>UK Sanctions — How they work</h3>
        <p>
          In the UK, <strong>OFSI</strong> (Office of Financial Sanctions Implementation)
          maintains the sanctions list and enforces compliance. The <strong>FCDO</strong>
          (Foreign, Commonwealth & Development Office) decides who gets sanctioned.
        </p>
        <p>
          Since Brexit, the UK has its own independent sanctions regime under the
          <strong> Sanctions and Anti-Money Laundering Act 2018</strong> (SAMLA).
          Before Brexit, the UK followed EU sanctions lists.
        </p>

        <div className="info-box important">
          <div className="info-box-title">Key for Chase Edinburgh</div>
          <p>
            As a UK-based bank, Chase must comply with UK (OFSI) sanctions.
            But because JP Morgan is a US parent company, Chase Edinburgh also
            follows US (OFAC) sanctions. This means screening against <em>both</em> lists.
          </p>
        </div>
      </section>

      {/* ───── Section 3: Types of sanctions ───── */}
      <section id="types" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-amber)' }}>3</span>
          Types of sanctions
        </h2>

        <div className="flow-steps">
          <div className="flow-step">
            <div className="flow-step-icon">🧊</div>
            <div className="flow-step-content">
              <h4>Asset Freeze</h4>
              <p>All bank accounts and financial assets belonging to the sanctioned person or company are frozen. They cannot withdraw, transfer, or use their money.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">🚫</div>
            <div className="flow-step-content">
              <h4>Financial Restrictions</h4>
              <p>Banks cannot process payments to or from sanctioned individuals. No loans, no investments, no insurance.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">✈️</div>
            <div className="flow-step-content">
              <h4>Travel Bans</h4>
              <p>Sanctioned people cannot enter or transit through the country that imposed the ban.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">📦</div>
            <div className="flow-step-content">
              <h4>Trade Restrictions</h4>
              <p>Bans on exporting certain goods (like weapons, technology, luxury items) to sanctioned countries or people.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">🏢</div>
            <div className="flow-step-content">
              <h4>Sectoral Sanctions</h4>
              <p>Restrictions on entire sectors of a country's economy — for example, banning investment in Russia's energy sector.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Section 4: The key lists ───── */}
      <section id="lists" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-purple)' }}>4</span>
          The key sanctions lists
        </h2>
        <p>
          Banks must check customers and transactions against these official lists.
          Each list is updated regularly — sometimes daily during crises.
        </p>

        <div className="legend">
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-uk)' }} /> UK OFSI Consolidated List</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-us)' }} /> US OFAC SDN List</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-eu)' }} /> EU Consolidated List</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-un)' }} /> UN Consolidated List</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">17,756</div>
            <div className="stat-label">UK FCDO entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">69,336</div>
            <div className="stat-label">US OFAC SDN entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">14,767</div>
            <div className="stat-label">EU FSF entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2,887</div>
            <div className="stat-label">UN SC entries</div>
          </div>
        </div>

        <div className="info-box definition">
          <div className="info-box-title">What is the SDN List?</div>
          <p>
            <strong>Specially Designated Nationals and Blocked Persons List</strong> — the
            US Treasury's main sanctions list. Anyone on it has their US assets frozen
            and US persons are forbidden from dealing with them. Because the US dollar
            is used worldwide, this list has global reach.
          </p>
        </div>

        <div className="info-box definition">
          <div className="info-box-title">What is OFSI?</div>
          <p>
            <strong>Office of Financial Sanctions Implementation</strong> — part of
            HM Treasury. OFSI publishes the UK sanctions list, issues licences
            (permissions to make restricted payments), and can impose fines of up to
            £1 million or 50% of the breach value for non-compliance.
          </p>
        </div>
      </section>

      {/* ───── Section 5: How banks use sanctions ───── */}
      <section id="banks" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-rose)' }}>5</span>
          How banks use sanctions
        </h2>
        <p>
          Every bank must have a <strong>sanctions compliance programme</strong>. This is
          not optional — it's the law. Here's what that means in practice:
        </p>

        <div className="flow-steps">
          <div className="flow-step">
            <div className="flow-step-icon">📋</div>
            <div className="flow-step-content">
              <h4>Customer Onboarding</h4>
              <p>When a new customer opens an account, their name is checked against all sanctions lists. If there's a match, the account cannot be opened.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">🔄</div>
            <div className="flow-step-content">
              <h4>Ongoing Monitoring</h4>
              <p>Every existing customer is regularly re-screened. If someone gets added to a sanctions list, the bank must act immediately — often freezing the account within hours.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">💸</div>
            <div className="flow-step-content">
              <h4>Transaction Screening</h4>
              <p>Every single payment — incoming and outgoing — is checked in real time. The system looks at names, countries, and other details to spot sanctioned parties.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">🔍</div>
            <div className="flow-step-content">
              <h4>Alert Investigation</h4>
              <p>When the screening system flags a potential match, a human analyst investigates. Most alerts are "false positives" — people with similar names who aren't sanctioned.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">📝</div>
            <div className="flow-step-content">
              <h4>Reporting</h4>
              <p>If a real match is found, the bank must report it to OFSI (UK) or OFAC (US) and freeze the funds. Failure to report is a criminal offence.</p>
            </div>
          </div>
        </div>

        <div className="info-box important">
          <div className="info-box-title">What happens if a bank gets it wrong?</div>
          <p>
            In 2019, Standard Chartered Bank was fined <strong>$1.1 billion</strong> for
            sanctions violations. In 2014, BNP Paribas paid <strong>$8.9 billion</strong>
            — the largest sanctions fine in history. Banks take this very seriously.
          </p>
        </div>
      </section>

      {/* ───── Section 6: The screening process ───── */}
      <section id="screening" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-teal)' }}>6</span>
          The screening process — step by step
        </h2>
        <p>
          This is what happens when Chase processes a payment. Understanding this
          process is key to working in sanctions compliance.
        </p>

        <div className="flow-steps">
          <div className="flow-step">
            <div className="flow-step-icon" style={{ background: 'var(--accent-teal)', color: 'white' }}>1</div>
            <div className="flow-step-content">
              <h4>Payment initiated</h4>
              <p>A customer makes a payment — sending money to someone, receiving money, or making a purchase.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon" style={{ background: 'var(--accent-teal)', color: 'white' }}>2</div>
            <div className="flow-step-content">
              <h4>Automatic screening</h4>
              <p>Software instantly checks the sender name, receiver name, their countries, and the payment details against all sanctions lists. This takes milliseconds.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon" style={{ background: 'var(--accent-teal)', color: 'white' }}>3</div>
            <div className="flow-step-content">
              <h4>Match scoring</h4>
              <p>The system assigns a score — how closely does this person's name match someone on the list? A score of 100% is an exact match. Lower scores might be coincidences.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon" style={{ background: 'var(--accent-teal)', color: 'white' }}>4</div>
            <div className="flow-step-content">
              <h4>Alert generated</h4>
              <p>If the score is above a threshold (usually 80-90%), the payment is paused and an alert is created for human review.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon" style={{ background: 'var(--accent-teal)', color: 'white' }}>5</div>
            <div className="flow-step-content">
              <h4>Analyst investigation</h4>
              <p>A sanctions analyst checks: Is this the same person? They compare dates of birth, addresses, nationality, and other details. Most matches turn out to be false positives.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon" style={{ background: 'var(--accent-teal)', color: 'white' }}>6</div>
            <div className="flow-step-content">
              <h4>Decision</h4>
              <p><strong>False positive</strong> — the payment is released and goes through. <strong>True match</strong> — the payment is blocked, the account may be frozen, and a report is filed with OFSI/OFAC.</p>
            </div>
          </div>
        </div>

        <div className="info-box tip">
          <div className="info-box-title">Did you know?</div>
          <p>
            A large bank like JP Morgan screens <strong>millions of transactions per day</strong>.
            About 95-99% of alerts are false positives — the real skill is knowing how
            to quickly identify the genuine matches.
          </p>
        </div>
      </section>

      {/* ───── Section 7: Roles in sanctions ───── */}
      <section id="roles" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-blue)' }}>7</span>
          Roles in sanctions compliance
        </h2>
        <p>
          There are many different jobs in sanctions at a bank. Here are the main ones,
          from entry level to senior:
        </p>

        <div className="flow-steps">
          <div className="flow-step">
            <div className="flow-step-icon">🔍</div>
            <div className="flow-step-content">
              <h4>Sanctions Screening Analyst (Entry Level)</h4>
              <p>Reviews alerts from the screening system. Decides if a match is real or a false positive. This is often the first step into sanctions work.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">📊</div>
            <div className="flow-step-content">
              <h4>KYC / CDD Analyst</h4>
              <p>Know Your Customer / Customer Due Diligence — conducts deeper background checks on customers, especially high-risk ones. Closely related to sanctions work.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">⚖️</div>
            <div className="flow-step-content">
              <h4>Sanctions Advisory</h4>
              <p>Provides guidance to the business on sanctions questions. "Can we do business with this company in this country?" Requires strong knowledge of regulations.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">🛡️</div>
            <div className="flow-step-content">
              <h4>Sanctions Compliance Officer</h4>
              <p>Oversees the entire sanctions programme. Reports to regulators, manages the team, and ensures the bank stays compliant. A senior role.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-step-icon">💻</div>
            <div className="flow-step-content">
              <h4>Sanctions Technology / Data</h4>
              <p>Builds and maintains the screening systems. Tunes the algorithms to reduce false positives. A tech-focused role that's increasingly in demand.</p>
            </div>
          </div>
        </div>

        <div className="info-box">
          <div className="info-box-title">Getting started from customer service</div>
          <p>
            Many people move into sanctions from customer-facing roles. Your experience
            understanding customers, handling sensitive situations, and following
            procedures is exactly what sanctions teams value. Ask your manager about
            internal mobility programmes or secondments to the compliance team.
          </p>
        </div>
      </section>

      {/* ───── Section 8: Career paths ───── */}
      <section id="career" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-amber)' }}>8</span>
          Building a career in sanctions
        </h2>

        <h3>Qualifications that help</h3>
        <ul>
          <li><strong>ICA Certificate in Sanctions</strong> — International Compliance Association; the most recognised entry-level sanctions qualification</li>
          <li><strong>ICA Diploma in Governance, Risk and Compliance</strong> — broader compliance knowledge</li>
          <li><strong>ACAMS (CAMS)</strong> — Certified Anti-Money Laundering Specialist; widely recognised globally</li>
          <li><strong>Internal JP Morgan training</strong> — ask your manager about compliance learning paths on the internal training platform</li>
        </ul>

        <h3>Skills that matter</h3>
        <ul>
          <li><strong>Attention to detail</strong> — spotting subtle differences in names, dates, and addresses</li>
          <li><strong>Analytical thinking</strong> — weighing evidence to make decisions on alerts</li>
          <li><strong>Research skills</strong> — using open source information to verify identities</li>
          <li><strong>Understanding of geography and politics</strong> — knowing which countries are high-risk and why</li>
          <li><strong>Communication</strong> — explaining complex decisions clearly in writing</li>
        </ul>

        <div className="info-box tip">
          <div className="info-box-title">Tip</div>
          <p>
            Follow <strong>@OFSIgov</strong> on X (Twitter) and subscribe to the
            <strong> OFSI email alerts</strong> to stay up to date with new designations.
            Showing you follow sanctions news will impress in any interview.
          </p>
        </div>
      </section>

      {/* ───── Section 9: Resources ───── */}
      <section id="resources" className="section-card">
        <h2>
          <span className="step-number" style={{ background: 'var(--accent-purple)' }}>9</span>
          Essential resources
        </h2>
        <p>Bookmark these — they're the go-to references for anyone working in sanctions.</p>

        <h3>Official sources</h3>
        <ul className="resource-list">
          <li>
            <a className="resource-link" href="https://www.gov.uk/government/organisations/office-of-financial-sanctions-implementation" target="_blank" rel="noopener">
              <span className="resource-link-icon">🇬🇧</span>
              <span className="resource-link-text">
                OFSI — Official UK Sanctions
                <span className="resource-link-desc">HM Treasury — the UK's sanctions authority</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://sanctionssearchapp.ofsi.hmtreasury.gov.uk/" target="_blank" rel="noopener">
              <span className="resource-link-icon">🔍</span>
              <span className="resource-link-text">
                OFSI Sanctions Search
                <span className="resource-link-desc">Search the UK consolidated sanctions list</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists" target="_blank" rel="noopener">
              <span className="resource-link-icon">🇺🇸</span>
              <span className="resource-link-text">
                OFAC SDN List
                <span className="resource-link-desc">US Treasury — Specially Designated Nationals</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://www.sanctionsmap.eu/" target="_blank" rel="noopener">
              <span className="resource-link-icon">🇪🇺</span>
              <span className="resource-link-text">
                EU Sanctions Map
                <span className="resource-link-desc">Interactive map of all EU sanctions regimes</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://www.un.org/securitycouncil/sanctions/information" target="_blank" rel="noopener">
              <span className="resource-link-icon">🇺🇳</span>
              <span className="resource-link-text">
                UN Security Council Sanctions
                <span className="resource-link-desc">Global sanctions from the United Nations</span>
              </span>
            </a>
          </li>
        </ul>

        <h3>Learning & qualifications</h3>
        <ul className="resource-list">
          <li>
            <a className="resource-link" href="https://www.int-comp.org/qualifications/sanctions/" target="_blank" rel="noopener">
              <span className="resource-link-icon">🎓</span>
              <span className="resource-link-text">
                ICA Certificate in Sanctions
                <span className="resource-link-desc">International Compliance Association — the key qualification</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://www.acams.org/" target="_blank" rel="noopener">
              <span className="resource-link-icon">🎓</span>
              <span className="resource-link-text">
                ACAMS
                <span className="resource-link-desc">Association of Certified Anti-Money Laundering Specialists</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://www.opensanctions.org/" target="_blank" rel="noopener">
              <span className="resource-link-icon">🌐</span>
              <span className="resource-link-text">
                OpenSanctions
                <span className="resource-link-desc">Open database of sanctions data — used by our Globe feature</span>
              </span>
            </a>
          </li>
        </ul>

        <h3>News & updates</h3>
        <ul className="resource-list">
          <li>
            <a className="resource-link" href="https://www.gov.uk/government/collections/financial-sanctions-regime-specific" target="_blank" rel="noopener">
              <span className="resource-link-icon">📰</span>
              <span className="resource-link-text">
                UK Sanctions Regime Guidance
                <span className="resource-link-desc">Country-by-country guidance from OFSI</span>
              </span>
            </a>
          </li>
          <li>
            <a className="resource-link" href="https://sanctionsnews.bakermckenzie.com/" target="_blank" rel="noopener">
              <span className="resource-link-icon">📰</span>
              <span className="resource-link-text">
                Baker McKenzie Sanctions Blog
                <span className="resource-link-desc">Expert analysis of sanctions developments</span>
              </span>
            </a>
          </li>
        </ul>
      </section>

      {/* ───── Explore Globe CTA ───── */}
      <section className="section-card" style={{ textAlign: 'center', background: 'var(--bg-dark)', color: 'var(--text-on-dark)' }}>
        <h2 style={{ color: 'var(--accent-teal)', justifyContent: 'center' }}>
          🌍 Explore the Sanctions Globe
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 20px' }}>
          See sanctioned individuals and organisations plotted on an interactive 3D globe.
          Filter by country, sanctions list, and entity type.
        </p>
        <a href="/globe" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'var(--accent-teal)',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '15px',
        }}>
          Open Globe →
        </a>
      </section>

      <div className="back-to-top">
        <a href="#top">↑ Back to top</a>
      </div>
    </div>
  )
}
