// Leadership data from the current site (names, roles, bios). Photos: src/assets/img/l-*.webp
export type Leader = { name: string; role: string; desc: string; photo: string; bio: string[] };

export const leadership: Record<'board' | 'headOffice' | 'plantSite', Leader[]> = {
  "board": [
    {
      "name": "Muhammad Ashraf Qazi",
      "role": "Chairman of the Board",
      "desc": "Industrialist with over 35 years of strategic leadership across infrastructure, heavy manufacturing, and industrial ventures in South Asia.",
      "photo": "l-qazi",
      "bio": [
        "Mr. Ashraf Qazi is an entrepreneur and seasoned business executive. He founded The Ciena Group in Southfield, Michigan, with a focus on providing quality long-term care. He is currently the owner, President, and CEO of Ciena Healthcare of Michigan and Laurel Health Care Company of Ohio, leading innovators and providers of skilled nursing and rehabilitation care.",
        "Under Mr. Qazi's leadership, the Ciena Group owns and manages 72 skilled nursing facilities with over 8,000 beds across five states, including Michigan, Ohio, North Carolina, Virginia, and Indiana. Combined revenues exceed USD 700 million, with a workforce of over 10,000 employees.",
        "Over the last two decades, Mr. Qazi has established and successfully operated numerous business ventures in healthcare and other sectors. He serves as Chairman of SSJD Group, a leading independent energy supplier for indigenous fossil fuel and renewable energy in Pakistan. He also owns Sequel Systems, a medical management software company based in New York with back offices in Lahore, Pakistan. Recently, he acquired a 30% ownership interest in Nayatel (Pvt) Ltd., a leading fiber-optic telecom provider in Pakistan. He also has ownership interests in several businesses in the US, Middle East, and Southeast Asia, including the Pakistan Innovation Fund, which helps fund young and promising start-ups in Pakistan.",
        "Mr. Qazi is the founder and Chairman of the Qazi Foundation, a family foundation registered in the United States and as a nonprofit in Pakistan. The foundation supports charitable causes in healthcare, education, and microcredit (Karze Hassna), working with implementing partners such as Akhuwat and Helping Hands. He is also a founder and Chairman of the Council on Pakistan Relations, an advocacy organization based in Washington, DC.",
        "Additionally, Mr. Qazi serves on the Board of Directors of Beverly Hills Academy School in Michigan and is a board member of the Healthcare Association of Michigan (HCAM), an affiliate of the American Health Care Association (AHCA). He graduated from Daemen College in Amherst, New York, in 1990 with a degree in Physical Therapy.",
        "Internationally, Mr. Qazi is actively seeking ways to strengthen the relationship between the United States and Pakistan through his work with the Council on US-Pakistan Relations and the Atlantic Council."
      ]
    },
    {
      "name": "Zaigham Adil Rizvi",
      "role": "Chief Executive Officer",
      "desc": "Metallurgical engineering veteran leading NSCL’s integrated operations, gas-based DRI commercialization, and forward integration strategy.",
      "photo": "l-rizvi",
      "bio": [
        "Mr. Zaigham Adil Rizvi is a qualified Electrical Engineer having Double Masters in Economics and Computer Engineering with honors from renowned Universities in Pakistan.",
        "He has served Pakistan Railways for 23 years till 1999, last being Chief Electrical Engineer. His experience with Pakistan Railways has earned him accolades with several recognitions for his research work.",
        "Since 1999, Mr. Zaigham is associated with National Steel Complex Limited (NSCL) and has served at various senior level positions, Under him TIEPCO (An Electrical Goods Manufacturing Unit of NSCL) went through several successful up-gradations where his technical knowledge proved to be decisive and the company turned around as a highly reputable and profitable venture. In 2006, Mr. Zaigham was posted as the Director Projects of National Steel Complex Limited and led the construction and successful commissioning of the first DRI Plant of Pakistan having a capacity of 1.5 MTPA.",
        "Currently, Mr. Zaigham is working as the CEO of Alhadeed Pelletization Company Limited in addition to his responsibilities as CEO National Steel Complex Limited. He is instrumental in spearheading this bold initiative of developing Pakistan's First large Scale Iron Ore Beneficiation and Pelletization Plants on the concept of Transfer of Technology (ToT)."
      ]
    }
  ],
  "headOffice": [
    {
      "name": "Owais Habib",
      "role": "Chief Financial Officer",
      "desc": "Chartered accountant orchestrating capital structuring, syndicated debt syndication, and financial risk governance.",
      "photo": "l-owais",
      "bio": [
        "Mr. Owais Habib is a Fellow Chartered Accountant with a professional experience of 20+ years. He completed his articleship from A.F. Ferguson & Co. (a member firm of PricewaterhouseCoopers), where he gained experience while working on various diverse assignments encompassing internal audits, external audits, compliance certifications, controls reviews and other special assignments serving various clients from the Financial, Manufacturing and the Services industries.",
        "After working in the profession for five years, he joined the National Steel Complex Limited of KSA for its Pakistan operations for establishment of the internal Audit Function in 2007.",
        "Since 2015, he has been working as the CFO of National Steel Complex Limited and is actively engaged for the project's revival despite numerous challenges. He is among the core team promoting the bold initiative of the Backward Integration Plan. His specific focus is on the development of the Iron and Steel Sector in Pakistan which at the present stage is all based on imported remeltable scrap only.",
        "As against the minimal value addition philosophy currently practiced by the domestic players, he believes there is an immense potential of development in this sector for the promotion of exports as well as significant import substitution."
      ]
    },
    {
      "name": "Mateen Jalal Khattak",
      "role": "Head of Backward Integration",
      "desc": "Expert geologist and mineral processing specialist managing domestic iron ore beneficiation and pelletization partnerships.",
      "photo": "l-mateen",
      "bio": [
        "Mr. Mateen Jalal Khattak is an MBA - Finance from SZABIST with a professional working experience of around 19 years. He started his career from K-Electric in the billing department. Here he learned the valuable art of public dealing. Soon thereafter, he joined National Steel Complex Limited. Initially, he looked after the treasury function of the Finance & Accounts department.",
        "He is one of the key members of the core team who have taken up the challenge of AlHadeed Pelletization Project. Recognizing his admirable leadership skills and tenacity, the management has assigned him the responsibility of spearheading the assignment for identification of multiple iron ore sources. For this he has extensively travelled in the remote areas of Baluchistan and is keeping close liaison with all the relevant stakeholders including Government Authorities to make the project of APCL a success."
      ]
    },
    {
      "name": "Ghias Uddin Nasir",
      "role": "Head of Procurement & Supply Chain",
      "desc": "Directing global sourcing for oxide pellets, specialized refractory materials, spare parts, and industrial logistics.",
      "photo": "l-ghias",
      "bio": [
        "Over 40 Years versatile experience of working on Electrical Power Generation, Transmission and Distribution Projects (HV/MV & LV), Industrial Plants (Steel, Cement, Sugar, Fertilizer etc.) and Infrastructure Projects (Airports, Railways, Hospitals, Housing Complexes & Commercial Buildings). Worked for multinational companies, Siemens (17 Years), AEG/Alstom (2 Years) in Pakistan and global subsidiaries including Germany. Also worked in Saudi Arabia for Al-Tuwairqi Group of Companies as DGM of Electrical Manufacturing Unit, TIEPCO.",
        "Successfully executed HV Substation Project/SVC for National Steel Co. and Arab Steel Company respectively. Vast experience of heading Contracts Management, Engineering/Design, Estimation, Procurement, Planning & Production, Installation, Testing, Commissioning, Partnerships and Agreements.",
        "Additional experience of working as a Lead Auditor and Management Representative (MR) for Quality Assurance/Quality Management System. Rich experience of worldwide procurement of Electro-Mechanical Equipment, Plant & Machinery."
      ]
    },
    {
      "name": "Muhammad Farooq",
      "role": "Head of Project Coordination",
      "desc": "Leading multi-disciplinary engineering governance, EPC vendor alignment, and plant automation roadmaps.",
      "photo": "l-farooq",
      "bio": [
        "With over 40 years of extensive, multi-disciplinary experience spanning Design, Detailed Engineering, EPCC projects, and strategic leadership roles, he has been consistent in delivering complex projects successfully. He holds a degree in Computer Science and an Associate Mechanical Engineering qualification, bringing a unique blend of technical expertise and management acumen.",
        "Throughout his career, he has held pivotal positions, including serving as Project Manager for the PEN-TSML Joint Venture, where he led intricate onshore and offshore infrastructure development for POSCO Engineering and Tuwairqi Steel Mills. His leadership was influential in achieving the project's objectives and establishing a strong foundation for future growth.",
        "In his current role as Head of Project Coordination at National Steel Complex Ltd., he is connected to the company's ambitious Backward and Forward Integration projects, including HBI and CBI. His practical coordination, emphasis on teamwork, and commitment to aligning projects with NSCL's long-term objectives continue to support the company's growth."
      ]
    },
    {
      "name": "Syed Muhammad Ali",
      "role": "Head of HR & Corporate Affairs",
      "desc": "Overseeing organizational talent development, labor compliance, industrial relations, and regulatory affairs.",
      "photo": "l-hr",
      "bio": [
        "Syed Muhammad Ali is a Human Resources professional with extensive experience in HR management, employee relations, talent management, and organizational development. He currently serves as Deputy Manager Human Resources at National Steel Complex Limited (NSCL), where he contributes to strengthening the organization's people, policies, and human-resource practices in support of its strategic objectives.",
        "With professional experience spanning human resources and employee-focused operations, Syed Muhammad Ali brings a strong understanding of workforce management, industrial relations, labour laws, and organizational requirements. His professional background includes experience with organizations such as IBEX Global and State Life Insurance.",
        "He holds an M.Phil. in Human Resource Management and an MHRM, along with a BSc. in Actuarial Studies. He is also a certified practitioner in Labour Laws and Industrial Relations, reflecting his commitment to professional development and effective workplace practices.",
        "At NSCL, he plays an important role in supporting a productive, engaged, and professionally driven workforce as the organization advances its vision of becoming a leading integrated steel manufacturing complex in Pakistan."
      ]
    }
  ],
  "plantSite": [
    {
      "name": "Abdul Razzaq",
      "role": "General Manager — Plant Operations",
      "desc": "28+ years of direct reduced iron and shaft furnace operational excellence, heading Bin Qasim site production and maintenance.",
      "photo": "l-razzaq",
      "bio": [
        "A Metallurgical and Materials Science Engineer with over 35 years of professional experience in heavy steel industries in Pakistan and KSA. He currently serves NSCL as Site In-Charge.",
        "He started his career with Ittefaq Foundry at Kot Lakhpat, Pakistan, one of the leading heavy steel manufacturing, rolling, and casting units. He also worked as Production Manager at Peoples Steel Mills, Karachi, in the special alloy steel plant with steel melting, rolling, and forging facilities.",
        "He joined ATG in 2004 as Production Head and has also served Agha Steel Company as COO."
      ]
    },
    {
      "name": "Naseer Iqbal",
      "role": "Head of Project Cell",
      "desc": "Spearheading brownfield expansion initiatives, forward EAF integration designs, and civil-mechanical integration.",
      "photo": "l-naseer",
      "bio": [
        "An Electrical Engineer with over 35 years of experience executing numerous projects in Pakistan and abroad across diverse industrial sectors including steel, fertilizer, and cement, in addition to infrastructure projects involving grid stations, hospitals, airports, high-rise buildings, and malls.",
        "He has played leading roles in production, project management, procurement, construction, testing, and commissioning, and has worked with renowned multinational companies such as Philips and AEG/Alstom.",
        "He worked as Senior Manager, Electrical Manufacturing Operations at TIEPCO (Al-Tuwairqi Group), where he successfully executed bulk-power high-voltage substation projects for National Steel Company, Arab Steel Company, and Saudi Electric Company, as well as projects for ARAMCO.",
        "With his multifaceted industry experience, he is currently working as the Head Of Project Cell."
      ]
    },
    {
      "name": "Javaid Iqbal Zahid",
      "role": "Head of Electrical & Automation Design",
      "desc": "Managing high-voltage power distribution, DCS automation systems, instrumentation safety interlocks, and SCADA infrastructure.",
      "photo": "l-javaid",
      "bio": [
        "A qualified Electrical Engineer in Power System Engineering from the University of Engineering and Technology (UET), Lahore. He has 37 years of experience in Power System Protection and Control up to 380 kV.",
        "He served seven years in the System Protection Department at WAPDA. He then joined the renowned consulting company SCADO in Saudi Arabia, where he worked on numerous SEC and Saudi Aramco projects for 11 years.",
        "He subsequently joined The International Electrical Product Company (TIEPCO), an Al-Tuwairqi Group company, and served there for 17 years. He was responsible for the design of all kinds of Protection and Control Panels for SEC and Saudi Aramco projects. He worked on prestigious projects including Senaeyah BSP 230/69/13.8 kV, Al-Fursan 115/13.8 kV, Al-Jouf 132 kV, Al-Tawdiyah-2 132/33 kV, and Safaniah 380/230 kV.",
        "He also worked partially on the NASCO 69/13.8 kV Substation and the ASCO 230/154 kV Substation, both Al-Tuwairqi Group projects. The ASCO substation was designed and constructed under his supervision and included two 300 MVA power transformers, eight 230 kV GIS bays, fifteen 154 kV GIS bays, and all kinds of Protection and Control Panels.",
        "He left TIEPCO in 2022 and joined NSCL. He is currently serving NSCL as Head of Electrical and Automation Design."
      ]
    },
    {
      "name": "Nadeem Shaikh",
      "role": "Deputy Plant Manager, DRI Plant",
      "desc": "18+ years from DRI plant construction to leading full-scale operations, mechanical integrity and maintenance.",
      "photo": "l-nadeem",
      "bio": [
        "Nadeem Shaikh is Deputy Plant Manager at the Direct Reduced Iron (DRI) Plant of National Steel Complex Limited at Port Qasim. He oversees plant operations, mechanical integrity and maintenance to ensure safe, reliable and cost-effective production. His career spans more than 18 years, from DRI plant construction to leadership of full-scale operations and maintenance.",
        "Nadeem leads production optimization and the mechanical maintenance teams responsible for preventive, predictive and shutdown programs. He also directs condition monitoring to sustain the reliability of major equipment. His remit includes maintenance cost control, spares management and resource planning, as well as staff appraisals and contractor coordination. He ensures that every activity meets the plant’s safety, quality and project standards."
      ]
    },
    {
      "name": "Tahir Saleem",
      "role": "Manager, Electrical, Instrumentation & Control (Head of Automation)",
      "desc": "20+ years in industrial automation, DCS and PLC systems, plant maintenance and project management.",
      "photo": "l-tahir",
      "bio": [
        "Tahir Saleem leads Electrical, Instrumentation and Control (E&I) engineering at National Steel Complex Limited (NSCL), where he directs the automation and maintenance work behind plant reliability and efficiency. He has more than 20 years of experience in industrial automation, plant maintenance and project management in the steel and process industries.",
        "An electronics engineer, Tahir holds a postgraduate qualification in Project Management from NED University of Engineering and Technology. His expertise covers Distributed Control Systems (DCS), Programmable Logic Controllers (PLCs), field instrumentation, process control and predictive maintenance. He has played a central role in major plant expansions and in backward and forward integration projects, leading them from engineering design and technical evaluation through procurement and commissioning.",
        "Tahir is known for leading multidisciplinary teams and deploying resources with care. He holds himself and his teams to the highest standards of safety, engineering quality and innovation."
      ]
    },
    {
      "name": "Obaid Alam",
      "role": "Head of Civil Construction",
      "desc": "20+ years in civil construction, infrastructure development and site execution.",
      "photo": "l-obaid",
      "bio": [
        "Obaid Alam brings over 20 years of professional experience in civil construction, infrastructure development, and site execution. At National Steel Complex Limited (NSCL), he oversees civil construction activities, ensuring effective site coordination, construction planning, and timely execution of projects.",
        "His expertise includes civil works supervision, coordination of construction activities, and maintaining quality and safety standards across project sites. His extensive experience and practical leadership contribute to efficient project delivery and operational excellence."
      ]
    }
  ]
};

// One merged Core Team grid: head office first, then the plant site.
export const coreTeam: Leader[] = [...leadership.headOffice, ...leadership.plantSite];
