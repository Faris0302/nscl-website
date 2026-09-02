import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { leadershipData } from '../data/siteData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { Spotlight } from '../components/Spotlight';
import { TeamMember } from '../types';

export const OurLeadership: React.FC = () => {
  useRevealOnScroll();
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selectedLeader) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedLeader(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLeader]);

  const renderLeaderCard = (member: TeamMember) => (
    <div key={member.name} className="team-card reveal">
      <div className="team-photo-wrapper">
        <img
          src={member.photoUrl}
          alt={member.name}
          className="team-photo"
          loading="lazy"
        />
      </div>
      <div className="team-info">
        <div className="team-role">{member.role}</div>
        <h3 className="team-name">{member.name}</h3>
        <p className="team-desc">{member.desc}</p>
        <button
          type="button"
          className="btn btn-outline btn-sm leader-see-more"
          onClick={() => setSelectedLeader(member)}
        >
          <span>See More</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="leadership-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/OurLeadership.jpeg"
          alt="NSCL Leadership"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Our Company</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>Our Leadership</span>
          </div>
          <div className="eyebrow">Governance & Executive Team</div>
          <h1>Leadership & Governance</h1>
          <p className="lead">
            Guided by veteran heavy-industry titans, metallurgical innovators, and capital strategists dedicated to scaling Pakistan's steel manufacturing sector.
          </p>
        </div>
      </section>

      {/* 1. Board & Executive Leadership (2 people) */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Strategic Direction</div>
            <h2 className="section-title">Board & Executive Leadership</h2>
            <p className="section-subtitle">
              Pioneering long-term corporate stewardship, capital allocation, and international technology partnerships.
            </p>
          </div>

          <div className="team-grid">
            {leadershipData.board.map(renderLeaderCard)}
          </div>
        </div>
      </section>

      {/* 2. Core Team — Head Office (5 people) */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow eyebrow-steel">Corporate Operations</div>
            <h2 className="section-title">Core Team — Head Office</h2>
            <p className="section-subtitle">
              Driving financial engineering, domestic backward integration, international commodity procurement, and organizational growth.
            </p>
          </div>

          <div className="team-grid">
            {leadershipData.headOffice.map(renderLeaderCard)}
          </div>
        </div>
      </section>

      {/* 3. Core Team — Plant Site (3 people) */}
      <section className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Engineering Excellence</div>
            <h2 className="section-title">Core Team — Plant Site (Bin Qasim)</h2>
            <p className="section-subtitle">
              24/7 technical mastery overseeing shaft reduction metallurgy, DCS automation interlocks, and brownfield expansions.
            </p>
          </div>

          <div className="team-grid">
            {leadershipData.plantSite.map(renderLeaderCard)}
          </div>
        </div>
      </section>

      {selectedLeader && (
        <div
          className="leader-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="leader-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leader-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="leader-modal-close"
              onClick={() => setSelectedLeader(null)}
              aria-label="Close leader biography"
            >
              <X size={20} />
            </button>
            <div className="team-role">{selectedLeader.role}</div>
            <h2 id="leader-modal-title" className="leader-modal-title">
              {selectedLeader.name}
            </h2>
            {selectedLeader.name === 'Zaigham Adil Rizvi' ? (
              <div className="leader-bio">
                <p>Mr. Zaigham Adil Rizvi is a qualified Electrical Engineer having Double Masters in Economics and Computer Engineering with honors from renowned Universities in Pakistan.</p>
                <p>He has served Pakistan Railways for 23 years till 1999, last being Chief Electrical Engineer. His experience with Pakistan Railways has earned him accolades with several recognitions for his research work.</p>
                <p>Since 1999, Mr. Zaigham is associated with National Steel Complex Limited (NSCL) and has served at various senior level positions, Under him TIEPCO (An Electrical Goods Manufacturing Unit of NSCL) went through several successful up-gradations where his technical knowledge proved to be decisive and the company turned around as a highly reputable and profitable venture. In 2006, Mr. Zaigham was posted as the Director Projects of National Steel Complex Limited and led the construction and successful commissioning of the first DRI Plant of Pakistan having a capacity of 1.5 MTPA.</p>
                <p>Currently, Mr. Zaigham is working as the CEO of Alhadeed Pelletization Company Limited in addition to his responsibilities as CEO National Steel Complex Limited. He is instrumental in spearheading this bold initiative of developing Pakistan&apos;s First large Scale Iron Ore Beneficiation and Pelletization Plants on the concept of Transfer of Technology (ToT).</p>
              </div>
            ) : selectedLeader.name === 'Muhammad Owais Habib' ? (
              <div className="leader-bio">
                <p>Mr. Muhammad Owais Habib is a Fellow Chartered Accountant with a professional experience of 20+ years. He completed his articleship from A.F. Ferguson &amp; Co. (a member firm of PricewaterhouseCoopers), where he gained experience while working on various diverse assignments encompassing internal audits, external audits, compliance certifications, controls reviews and other special assignments serving various clients from the Financial, Manufacturing and the Services industries.</p>
                <p>After working in the profession for five years, he joined the National Steel Complex Limited of KSA for its Pakistan operations for establishment of the internal Audit Function in 2007.</p>
                <p>Since 2015, he has been working as the CFO of National Steel Complex Limited and is actively engaged for the project&apos;s revival despite numerous challenges. He is among the core team promoting the bold initiative of the Backward Integration Plan. His specific focus is on the development of the Iron and Steel Sector in Pakistan which at the present stage is all based on imported remeltable scrap only.</p>
                <p>As against the minimal value addition philosophy currently practiced by the domestic players, he believes there is an immense potential of development in this sector for the promotion of exports as well as significant import substitution.</p>
              </div>
            ) : selectedLeader.name === 'Mateen Jalal Khattak' ? (
              <div className="leader-bio">
                <p>Mr. Mateen Jalal Khattak is an MBA - Finance from SZABIST with a professional working experience of around 19 years. He started his career from K-Electric in the billing department. Here he learned the valuable art of public dealing. Soon thereafter, he joined National Steel Complex Limited. Initially, he looked after the treasury function of the Finance &amp; Accounts department.</p>
                <p>He is one of the key members of the core team who have taken up the challenge of AlHadeed Pelletization Project. Recognizing his admirable leadership skills and tenacity, the management has assigned him the responsibility of spearheading the assignment for identification of multiple iron ore sources. For this he has extensively travelled in the remote areas of Baluchistan and is keeping close liaison with all the relevant stakeholders including Government Authorities to make the project of APCL a success.</p>
              </div>
            ) : selectedLeader.name === 'Ghias Uddin Nasir' ? (
              <div className="leader-bio">
                <p>Over 40 Years versatile experience of working on Electrical Power Generation, Transmission and Distribution Projects (HV/MV &amp; LV), Industrial Plants (Steel, Cement, Sugar, Fertilizer etc.) and Infrastructure Projects (Airports, Railways, Hospitals, Housing Complexes &amp; Commercial Buildings). Worked for multinational companies, Siemens (17 Years), AEG/Alstom (2 Years) in Pakistan and global subsidiaries including Germany. Also worked in Saudi Arabia for Al-Tuwairqi Group of Companies as DGM of Electrical Manufacturing Unit, TIEPCO.</p>
                <p>Successfully executed HV Substation Project/SVC for National Steel Co. and Arab Steel Company respectively. Vast experience of heading Contracts Management, Engineering/Design, Estimation, Procurement, Planning &amp; Production, Installation, Testing, Commissioning, Partnerships and Agreements.</p>
                <p>Additional experience of working as a Lead Auditor and Management Representative (MR) for Quality Assurance/Quality Management System. Rich experience of worldwide procurement of Electro-Mechanical Equipment, Plant &amp; Machinery.</p>
              </div>
            ) : selectedLeader.name === 'Muhammad Farooq' ? (
              <div className="leader-bio">
                <p>With over 40 years of extensive, multi-disciplinary experience spanning Design, Detailed Engineering, EPCC projects, and strategic leadership roles, he has been consistent in delivering complex projects successfully. He holds a degree in Computer Science and an Associate Mechanical Engineering qualification, bringing a unique blend of technical expertise and management acumen.</p>
                <p>Throughout his career, he has held pivotal positions, including serving as Project Manager for the PEN-TSML Joint Venture, where he led intricate onshore and offshore infrastructure development for POSCO Engineering and Tuwairqi Steel Mills. His leadership was influential in achieving the project&apos;s objectives and establishing a strong foundation for future growth.</p>
                <p>In his current role as Head of Project Coordination at National Steel Complex Ltd., he is connected to the company&apos;s ambitious Backward and Forward Integration projects, including HBI and CBI. His practical coordination, emphasis on teamwork, and commitment to aligning projects with NSCL&apos;s long-term objectives continue to support the company&apos;s growth.</p>
              </div>
            ) : selectedLeader.name === 'Abdul Razzaq' ? (
              <div className="leader-bio">
                <p>A Metallurgical and Materials Science Engineer with over 35 years of professional experience in heavy steel industries in Pakistan and KSA. He currently serves NSCL as Site In-Charge.</p>
                <p>He started his career with Ittefaq Foundry at Kot Lakhpat, Pakistan, one of the leading heavy steel manufacturing, rolling, and casting units. He also worked as Production Manager at Peoples Steel Mills, Karachi, in the special alloy steel plant with steel melting, rolling, and forging facilities.</p>
                <p>He joined ATG in 2004 as Production Head and has also served Agha Steel Company as COO.</p>
              </div>
            ) : selectedLeader.name === 'Naseer Iqbal' ? (
              <div className="leader-bio">
                <p>An Electrical Engineer with over 35 years of experience executing numerous projects in Pakistan and abroad across diverse industrial sectors including steel, fertilizer, and cement, in addition to infrastructure projects involving grid stations, hospitals, airports, high-rise buildings, and malls.</p>
                <p>He has played leading roles in production, project management, procurement, construction, testing, and commissioning, and has worked with renowned multinational companies such as Philips and AEG/Alstom.</p>
                <p>He worked as Senior Manager, Electrical Manufacturing Operations at TIEPCO (Al-Tuwairqi Group), where he successfully executed bulk-power high-voltage substation projects for National Steel Company, Arab Steel Company, and Saudi Electric Company, as well as projects for ARAMCO.</p>
                <p>With his multifaceted industry experience, he is currently working as the Head Of Project Cell.</p>
              </div>
            ) : selectedLeader.name === 'Javaid Iqbal Zahid' ? (
              <div className="leader-bio">
                <p>A qualified Electrical Engineer in Power System Engineering from the University of Engineering and Technology (UET), Lahore. He has 37 years of experience in Power System Protection and Control up to 380 kV.</p>
                <p>He served seven years in the System Protection Department at WAPDA. He then joined the renowned consulting company SCADO in Saudi Arabia, where he worked on numerous SEC and Saudi Aramco projects for 11 years.</p>
                <p>He subsequently joined The International Electrical Product Company (TIEPCO), an Al-Tuwairqi Group company, and served there for 17 years. He was responsible for the design of all kinds of Protection and Control Panels for SEC and Saudi Aramco projects. He worked on prestigious projects including Senaeyah BSP 230/69/13.8 kV, Al-Fursan 115/13.8 kV, Al-Jouf 132 kV, Al-Tawdiyah-2 132/33 kV, and Safaniah 380/230 kV.</p>
                <p>He also worked partially on the NASCO 69/13.8 kV Substation and the ASCO 230/154 kV Substation, both Al-Tuwairqi Group projects. The ASCO substation was designed and constructed under his supervision and included two 300 MVA power transformers, eight 230 kV GIS bays, fifteen 154 kV GIS bays, and all kinds of Protection and Control Panels.</p>
                <p>He left TIEPCO in 2022 and joined NSCL. He is currently serving NSCL as Head of Electrical and Automation Design.</p>
              </div>
            ) : selectedLeader.name === 'Muhammad Ashraf Qazi' ? (
              <div className="leader-bio">
                <p>Mr. Ashraf Qazi is an entrepreneur and seasoned business executive. He founded The Ciena Group in Southfield, Michigan, with a focus on providing quality long-term care. He is currently the owner, President, and CEO of Ciena Healthcare of Michigan and Laurel Health Care Company of Ohio, leading innovators and providers of skilled nursing and rehabilitation care.</p>
                <p>Under Mr. Qazi&apos;s leadership, the Ciena Group owns and manages 72 skilled nursing facilities with over 8,000 beds across five states, including Michigan, Ohio, North Carolina, Virginia, and Indiana. Combined revenues exceed USD 700 million, with a workforce of over 10,000 employees.</p>
                <p>Over the last two decades, Mr. Qazi has established and successfully operated numerous business ventures in healthcare and other sectors. He serves as Chairman of SSJD Group, a leading independent energy supplier for indigenous fossil fuel and renewable energy in Pakistan. He also owns Sequel Systems, a medical management software company based in New York with back offices in Lahore, Pakistan. Recently, he acquired a 30% ownership interest in Nayatel (Pvt) Ltd., a leading fiber-optic telecom provider in Pakistan. He also has ownership interests in several businesses in the US, Middle East, and Southeast Asia, including the Pakistan Innovation Fund, which helps fund young and promising start-ups in Pakistan.</p>
                <p>Mr. Qazi is the founder and Chairman of the Qazi Foundation, a family foundation registered in the United States and as a nonprofit in Pakistan. The foundation supports charitable causes in healthcare, education, and microcredit (Karze Hassna), working with implementing partners such as Akhuwat and Helping Hands. He is also a founder and Chairman of the Council on Pakistan Relations, an advocacy organization based in Washington, DC.</p>
                <p>Additionally, Mr. Qazi serves on the Board of Directors of Beverly Hills Academy School in Michigan and is a board member of the Healthcare Association of Michigan (HCAM), an affiliate of the American Health Care Association (AHCA). He graduated from Daemen College in Amherst, New York, in 1990 with a degree in Physical Therapy.</p>
                <p>Internationally, Mr. Qazi is actively seeking ways to strengthen the relationship between the United States and Pakistan through his work with the Council on US-Pakistan Relations and the Atlantic Council.</p>
                <a
                  href="/Our-Chairman-Profile-details.pdf"
                  className="btn btn-solid leader-profile-pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Full Chairman Profile (PDF)
                  <ArrowRight size={16} />
                </a>
              </div>
            ) : selectedLeader.name === 'Syed Muhammad Ali' ? (
              <div className="leader-bio">
                <p>Syed Muhammad Ali is a Human Resources professional with extensive experience in HR management, employee relations, talent management, and organizational development. He currently serves as Deputy Manager Human Resources at National Steel Complex Limited (NSCL), where he contributes to strengthening the organization&apos;s people, policies, and human-resource practices in support of its strategic objectives.</p>
                <p>With professional experience spanning human resources and employee-focused operations, Syed Muhammad Ali brings a strong understanding of workforce management, industrial relations, labour laws, and organizational requirements. His professional background includes experience with organizations such as IBEX Global and State Life Insurance.</p>
                <p>He holds an M.Phil. in Human Resource Management and an MHRM, along with a BSc. in Actuarial Studies. He is also a certified practitioner in Labour Laws and Industrial Relations, reflecting his commitment to professional development and effective workplace practices.</p>
                <p>At NSCL, he plays an important role in supporting a productive, engaged, and professionally driven workforce as the organization advances its vision of becoming a leading integrated steel manufacturing complex in Pakistan.</p>
              </div>
            ) : (
              <div className="leader-bio">
                <p>{selectedLeader.desc}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Our Milestones</div>
              <h2 style={{ marginBottom: '1rem' }}>Tracing Our Metallurgical Journey</h2>
              <p>
                From port site acquisition and Japanese MIDREX licensing to commercial commissioning and EAF forward integration.
              </p>
              <div className="band-cta-buttons">
                <Link to="/our-journey" className="btn btn-solid btn-lg">
                  <span>Explore Our Journey</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/our-collaboration" className="btn btn-outline btn-lg">
                  <span>Strategic Collaborations</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
