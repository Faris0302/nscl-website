// Job openings carried over from the current site. Edit this list to post or remove roles.
export type Job = { id: string; title: string; department: 'Operations' | 'Engineering' | 'HSE' | 'Corporate'; location: string; type: string; experience: string; description: string };

export const jobs: Job[] = [
  {
    "id": "op-01",
    "title": "Lead Shaft Furnace Operator",
    "department": "Operations",
    "location": "Bin Qasim Plant, Karachi",
    "type": "Full-Time (Rotational Shifts)",
    "experience": "5+ Years Heavy Metallurgical / DRI Experience",
    "description": "Operate and monitor central DCS control systems for the MIDREX direct reduction shaft furnace, maintaining bed permeability, reducing gas stoichiometry, and product discharge temperatures."
  },
  {
    "id": "op-02",
    "title": "Reformer & Gas Systems Specialist",
    "department": "Operations",
    "location": "Bin Qasim Plant, Karachi",
    "type": "Full-Time",
    "experience": "4+ Years in Natural Gas Reforming / Chemical Plants",
    "description": "Oversee catalytic natural gas reformer tube assemblies, burner management systems, gas recuperators, and process heat recovery networks."
  },
  {
    "id": "eng-01",
    "title": "Senior Mechanical Maintenance Engineer",
    "department": "Engineering",
    "location": "Bin Qasim Plant, Karachi",
    "type": "Full-Time",
    "experience": "6+ Years in Heavy Industrial Plant Maintenance",
    "description": "Lead predictive and preventative mechanical maintenance across screw feeders, rotary valves, heavy compressors, cooling water pumps, and gas blowers."
  },
  {
    "id": "eng-02",
    "title": "Electrical & Instrumentation Lead Engineer",
    "department": "Engineering",
    "location": "Bin Qasim Plant, Karachi",
    "type": "Full-Time",
    "experience": "7+ Years in High Voltage Substation / PLC Automation",
    "description": "Manage 132kV grid interconnects, ABB/Siemens DCS architectures, field transmitters, gas analyzers, and safety critical emergency shut-down (ESD) systems."
  },
  {
    "id": "hse-01",
    "title": "HSE Manager",
    "department": "HSE",
    "location": "Bin Qasim Plant, Karachi",
    "type": "Full-Time",
    "experience": "8+ Years in Heavy Industrial HSE Leadership (NEBOSH/OSHA)",
    "description": "Direct integrated ISO 14001 and ISO 45001 safety programs, gas leak detection telemetry, permit-to-work governance, and site emergency response drills."
  },
  {
    "id": "hse-02",
    "title": "Environmental Compliance Officer",
    "department": "HSE",
    "location": "Bin Qasim Plant, Karachi",
    "type": "Full-Time",
    "experience": "3+ Years in Industrial Emissions & Water Stewardship",
    "description": "Ensure compliance with Sindh Environmental Protection Agency (SEPA) guidelines, monitor closed-loop water treatment, and publish ambient air telemetry reports."
  },
  {
    "id": "corp-01",
    "title": "Raw Material Procurement Specialist",
    "department": "Corporate",
    "location": "Head Office, Shahrah-e-Faisal, Karachi",
    "type": "Full-Time",
    "experience": "4+ Years in International Mineral Commodity Procurement",
    "description": "Manage bulk contracts for iron ore oxide pellets, charter party vessel logistics, port handling agreements, and refractory consumables."
  },
  {
    "id": "corp-02",
    "title": "Corporate Financial Analyst",
    "department": "Corporate",
    "location": "Head Office, Shahrah-e-Faisal, Karachi",
    "type": "Full-Time",
    "experience": "3+ Years in Project Finance / Investment Banking",
    "description": "Build financial valuation models, forecast debt service ratios, and evaluate capital investment opportunities in forward EAF and pelletization expansion."
  }
];
