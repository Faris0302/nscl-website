// Company content carried over from the current site.
// Our Journey: phases and their photos (keys of src/assets/img).
export type JourneyPhoto = { src: string; alt: string; caption: string };
export const journey: { label: string; years: string; title: string; text: string; images: JourneyPhoto[] }[] = [
  {
    "label": "Phase 01",
    "years": "2007",
    "title": "Site Selection & Strategic Land Acquisition",
    "text": "Secured 220 acres of prime industrial oceanfront land inside Port Qasim Industrial Zone, Karachi, designed with immediate deep-water berthing and rail corridor access for bulk raw material handling.",
    "images": [
      {
        "src": "j-phase1",
        "alt": "Open coastal land at Port Qasim before development",
        "caption": "Port Qasim · Site selection"
      }
    ]
  },
  {
    "label": "Phase 02",
    "years": "2006–2008",
    "title": "Engineering Design & Plant Development",
    "text": "Advanced the engineering design of Pakistan’s first MIDREX Direct Reduction Iron (DRI) plant, laying the groundwork for integrated steel manufacturing at Port Qasim.",
    "images": [
      {
        "src": "j-phase2-1",
        "alt": "Engineering visualization of the integrated DRI plant",
        "caption": "Integrated DRI plant design"
      },
      {
        "src": "j-phase2-2",
        "alt": "Engineering visualization of the MIDREX shaft furnace",
        "caption": "MIDREX shaft furnace"
      },
      {
        "src": "j-phase2-3",
        "alt": "Engineering visualization of the plant reformer and process equipment",
        "caption": "Reformer and process equipment"
      }
    ]
  },
  {
    "label": "Phase 03",
    "years": "2007–2012",
    "title": "Heavy Plant Construction & Structural Erection",
    "text": "Completed civil construction, vertical shaft furnace erection, gas reformer chamber assembly, dedicated water cooling towers, and high-voltage electrical substation connections.",
    "images": [
      {
        "src": "j-phase3-3",
        "alt": "Cranes and steel structures during plant construction",
        "caption": "Structural erection in progress"
      },
      {
        "src": "j-phase3-1",
        "alt": "Foundation work at the industrial site",
        "caption": "Plant foundations"
      },
      {
        "src": "j-phase3-2",
        "alt": "Steel framework rising around the shaft furnace",
        "caption": "Shaft furnace construction"
      }
    ]
  },
  {
    "label": "Phase 04",
    "years": "2012–2013",
    "title": "Commissioning & Midrex Plant Demonstration Test",
    "text": "Achieved commercial start-up on May 25, 2013, surpassing performance guarantees during rigorous 72-hour continuous test runs certified directly by Midrex Technologies Inc.",
    "images": [
      {
        "src": "j-phase4-1",
        "alt": "Commemorative plaque for the commissioning of Pakistan’s first DRI plant",
        "caption": "Commissioning milestone"
      },
      {
        "src": "j-phase4-2",
        "alt": "MIDREX demonstration test record documenting commercial start-up",
        "caption": "MIDREX demonstration test record"
      }
    ]
  },
  {
    "label": "Phase 05",
    "years": "2013–2014",
    "title": "Commercial Production",
    "text": "Supplied high-purity CDRI to domestic re-rolling mills.",
    "images": [
      {
        "src": "j-phase5-1",
        "alt": "Industrial equipment representing the plant’s commercial production era",
        "caption": "Commercial production"
      }
    ]
  },
  {
    "label": "Phase 06",
    "years": "2019",
    "title": "Transition to NSCL",
    "text": "Transitioned corporate structure from Tuwairqi Steel Mills Limited (TSML) to National Steel Complex Limited (NSCL) with strengthened capitalization.",
    "images": [
      {
        "src": "night",
        "alt": "The plant at Port Qasim at dusk, with the Tuwairqi Steel Mills name on a storage tank",
        "caption": "From Tuwairqi Steel Mills to NSCL"
      }
    ]
  },
  {
    "label": "Phase 07",
    "years": "2026–Future",
    "title": "EAF Integration & Mine Beneficiation",
    "text": "Executing fully integrated expansion roadmap: domestic iron ore extraction, beneficiation, pelletization, and direct hot-charging (HDRI) into high-efficiency Electric Arc Furnaces (EAF).",
    "images": [
      {
        "src": "eaf",
        "alt": "Molten steel being produced in an electric arc furnace",
        "caption": "The next step · EAF steelmaking"
      },
      {
        "src": "j-phase6",
        "alt": "Industrial process equipment representing NSCL’s expansion roadmap",
        "caption": "Integrated industrial roadmap"
      }
    ]
  }
];

export const partners = [
  {
    "name": "Allmineral Aufbereitungstechnik GmbH & Co. KG",
    "text": "Top European and leading global player in mineral beneficiation technology, with over 30 years of experience developing customized processing plants.",
    "focus": "Basic Engineering & Original Equipment Manufacturer (OEM) of the Beneficiation Plant"
  },
  {
    "name": "NewFer GmbH & Co. KG",
    "text": "A German technology company providing design, project management, supply, construction, and commissioning services for process plants in the minerals and metals industry.",
    "focus": "Basic & Detailed Engineering of Pelletization Plant"
  },
  {
    "name": "DMT GmbH & Co. KG",
    "text": "An independent consultancy group providing exploration, engineering, consulting, and geotechnical services across thousands of projects in more than 150 countries.",
    "focus": "Consultancy and Engineering Services for Iron Ore Mining"
  },
  {
    "name": "TripleS GmbH & Co. KG",
    "text": "A trusted partner and authorized representative for smart solutions and services from independent companies in the steelmaking industry.",
    "focus": "Technical Study for the Pelletization Plant"
  },
  {
    "name": "KPMG Taseer Hadi & Co.",
    "text": "Member firm of KPMG International and one of the Big Four accounting firms, with a history in Pakistan dating back to 1969.",
    "focus": "Preparation of Financial Model of the Project"
  },
  {
    "name": "Ali Khan Law Associates",
    "text": "A leading law firm in Pakistan specializing in project financing and mergers and acquisitions.",
    "focus": "Legal Advisor"
  },
  {
    "name": "Delphos International",
    "text": "Providing capital raising and consulting solutions to frontier markets for over 35 years.",
    "focus": "Co-Financial Advisor & Arranger"
  },
  {
    "name": "Next Capital Limited",
    "text": "A leading securities brokerage and investment bank in Pakistan with a strong financial advisory track record.",
    "focus": "Co-Financial Advisor & Arranger"
  },
  {
    "name": "National Management Consultants (Pvt) Limited",
    "text": "A leading consultancy provider in Pakistan with more than 1,400 assignments across strategy, finance, engineering, and environment.",
    "focus": "Market Study for Global Demand and Indigenous Iron Ore Availability in Pakistan"
  },
  {
    "name": "Syed Shabbar Zaidi & Co.",
    "text": "Led by Mr. Shabbar Zaidi, former Chairman FBR, provincial minister, ICAP president, and senior partner at A.F. Ferguson & Co.",
    "focus": "Corporate & Tax Consultant"
  },
  {
    "name": "EMC Pakistan (Pvt) Ltd",
    "text": "One of Pakistan’s pioneering environmental consulting companies, with over 25 years of experience across environmental and infrastructure disciplines.",
    "focus": "Environmental Consultant"
  },
  {
    "name": "Ruhr Montan Group (RMG)",
    "text": "An international engineering company with offices in the Middle East, representing world-class companies across mining, construction, and industrial sectors.",
    "focus": "Engineering and International Industrial Representation"
  }
];

export const values = [
  {
    "title": "Operational Precision",
    "text": "Strict adherence to metallurgical parameters and mathematical control loops ensures every ton of DRI meets international purity benchmarks."
  },
  {
    "title": "Institutional Integrity",
    "text": "Uncompromising corporate governance, transparent partner relationships, and long-term fiduciary stewardship for our stakeholders."
  },
  {
    "title": "Safety First Culture",
    "text": "Zero-compromise occupational health, rigorous hazard prevention, and advanced gas-safety protocols guarding our workforce 24/7."
  },
  {
    "title": "Environmental Stewardship",
    "text": "Pioneering gas-based reduction that cuts greenhouse gas emissions by up to 60% compared to traditional coal-fired blast furnace routes."
  },
  {
    "title": "Pioneering Innovation",
    "text": "Continuously adopting state-of-the-art automation, energy recovery, and green hydrogen-ready MIDREX technological advancements."
  },
  {
    "title": "National Economic Impact",
    "text": "Displacing foreign scrap imports, conserving vital foreign exchange, and anchoring Pakistan’s industrial industrialization foundation."
  }
];
