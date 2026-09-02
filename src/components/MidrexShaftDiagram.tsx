import React, { useState } from 'react';

const processStages = [
  {
    number: '01',
    title: 'Ore Charging',
    temperature: 'Ambient temperature',
    description: 'Iron ore pellets enter the shaft furnace and move downward through the reactor by gravity.',
  },
  {
    number: '02',
    title: 'Gas Reforming',
    temperature: '~900°C catalytic reactor',
    description: 'Natural gas and recycled off-gas are converted into the hydrogen and carbon monoxide reducing gas.',
  },
  {
    number: '03',
    title: 'Reduction Zone',
    temperature: '800°C–850°C reaction bed',
    description: 'Counter-current reducing gas removes oxygen from the pellets, producing porous metallic iron.',
  },
  {
    number: '04',
    title: 'DRI Discharge',
    temperature: '600°C–700°C HDRI / CDRI',
    description: 'The finished DRI is either hot-charged directly to an EAF or cooled for merchant shipment.',
  },
];

export const MidrexShaftDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const selectedStage = processStages[activeStage];

  return (
    <div className="shaft-diagram-container">
      <svg
        className="shaft-svg"
        viewBox="0 0 800 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated MIDREX Shaft Furnace Diagram"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="shaftWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E272F" />
            <stop offset="50%" stopColor="#12181D" />
            <stop offset="100%" stopColor="#1E272F" />
          </linearGradient>

          <linearGradient id="reductZoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ff9e4d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="reformerGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7a1a" />
            <stop offset="100%" stopColor="#ff9e4d" />
          </linearGradient>

          {/* Styles & Animation keyframes */}
          <style>
            {`
              @keyframes pelletFall {
                0% { cy: 60px; fill: #A7AFB8; r: 4px; opacity: 0.2; }
                20% { opacity: 0.9; }
                45% { fill: #ff7a1a; r: 4.5px; }
                75% { fill: #ff9e4d; r: 5px; }
                95% { opacity: 0.9; }
                100% { cy: 370px; fill: #ff9e4d; r: 5px; opacity: 0; }
              }
              @keyframes gasRise {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes zonePulse {
                0% { opacity: 0.35; }
                50% { opacity: 0.7; }
                100% { opacity: 0.35; }
              }
              @keyframes reformerPulse {
                0% { filter: drop-shadow(0 0 4px rgba(255, 122, 26, 0.4)); }
              50% { filter: drop-shadow(0 0 16px rgba(255, 158, 77, 0.8)); }
              100% { filter: drop-shadow(0 0 4px rgba(255, 122, 26, 0.4)); }
              }
              @keyframes flowDash {
              0% { stroke-dashoffset: 30; }
                100% { stroke-dashoffset: 0; }
              }

              .anim-pellet {
                animation: pelletFall 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              .anim-gas {
                stroke-dasharray: 8 6;
                animation: gasRise 1.6s linear infinite;
              }
              .anim-reduction-zone {
              .anim-reformer {
                animation: reformerPulse 2.8s ease-in-out infinite;
              .anim-flow-gas {
                stroke-dasharray: 6 4;
                animation: flowDash 1.2s linear infinite;
              }
              .anim-flow-hdri {
                stroke-dasharray: 6 4;
                animation: flowDash 1.5s linear infinite;
              }
              .anim-flow-cdri {
                stroke-dasharray: 6 4;
                animation: flowDash 1.8s linear infinite;
              }

              @media (prefers-reduced-motion: reduce) {
                .anim-pellet, .anim-gas, .anim-reduction-zone, .anim-reformer, .anim-flow-gas, .anim-flow-hdri, .anim-flow-cdri {
                  animation: none !important;
                }
              }
            `}
          </style>
        </defs>

        {/* Background Grid Pattern */}
        <g opacity="0.15">
          <line x1="100" y1="0" x2="100" y2="480" stroke="#4A7A96" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="700" y1="0" x2="700" y2="480" stroke="#4A7A96" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="0" y1="240" x2="800" y2="240" stroke="#4A7A96" strokeWidth="1" strokeDasharray="4 8" />
        </g>

        {/* MAIN SHAFT FURNACE SHELL */}
        {/* Top Feed Hopper */}
        <path
          d="M 330 40 L 470 40 L 440 85 L 360 85 Z"
          fill="url(#shaftWallGrad)"
          stroke="#4A7A96"
          strokeWidth="2"
        />
        {/* Main Shaft Body */}
        <path
          d="M 360 85 L 340 160 L 340 330 L 375 380 L 425 380 L 460 330 L 460 160 L 440 85 Z"
          fill="url(#shaftWallGrad)"
          stroke="#4A7A96"
          strokeWidth="2"
        />

        {/* Mid-Shaft Reduction Zone (Gradient Glow with Pulse) */}
        <rect
          x="344"
          y="165"
          width="112"
          height="145"
          rx="4"
          fill="url(#reductZoneGrad)"
          className="anim-reduction-zone"
        />

        {/* Reducing Gas Lines (Counter-current upward flow) */}
        <g stroke="#7FA9C0" strokeWidth="2" opacity="0.65" className="anim-gas">
          <line x1="365" y1="330" x2="365" y2="130" />
          <line x1="385" y1="340" x2="385" y2="120" />
          <line x1="400" y1="345" x2="400" y2="115" />
          <line x1="415" y1="340" x2="415" y2="120" />
          <line x1="435" y1="330" x2="435" y2="130" />
        </g>

        {/* Falling Ore Pellets with staggered delays */}
        <g>
          <circle cx="390" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '0.0s' }} />
          <circle cx="410" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '0.6s' }} />
          <circle cx="375" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '1.2s' }} />
          <circle cx="425" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '1.8s' }} />
          <circle cx="395" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '2.4s' }} />
          <circle cx="380" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '3.0s' }} />
          <circle cx="415" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '3.6s' }} />
          <circle cx="400" cy="50" r="4.5" className="anim-pellet" style={{ animationDelay: '4.1s' }} />
        </g>

        {/* REFORMER BOX (Left side) */}
        <g className="anim-reformer">
          <rect
            x="70"
            y="215"
            width="200"
            height="90"
            rx="6"
            fill="#171E24"
            stroke="#ff7a1a"
            strokeWidth="2"
          />
          <text x="170" y="255" fill="#F2F4F6" fontFamily="'Barlow Condensed', sans-serif" fontSize="15" fontWeight="700" textAnchor="middle">
            MIDREX REFORMER
          </text>
          <text x="170" y="278" fill="#ff9e4d" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fontWeight="600" textAnchor="middle">
            ~900°C REDUCING GAS
          </text>
        </g>

        {/* Gas Flow Pipe connecting Reformer to Shaft */}
        <path
          d="M 270 260 L 340 260"
          stroke="#ff9e4d"
          strokeWidth="3"
          fill="none"
          className="anim-flow-gas"
        />
        <polygon points="335,255 345,260 335,265" fill="#ff9e4d" />

        {/* Top Off-gas Exit (Counter-current extraction) */}
        <path
          d="M 435 90 L 520 90 L 520 60"
          stroke="#4A7A96"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />
        <text x="530" y="70" fill="#7FA9C0" fontFamily="'IBM Plex Mono', monospace" fontSize="11">
          TOP GAS RECYCLE
        </text>

        {/* BOTTOM DISCHARGE PATHS */}
        {/* Hot DRI (HDRI) Path toward EAF (Right) */}
        <path
          d="M 410 380 L 410 420 L 540 420"
          stroke="#ff7a1a"
          strokeWidth="3"
          fill="none"
          className="anim-flow-hdri"
        />
        {/* EAF Destination Box */}
        <rect x="540" y="395" width="200" height="50" rx="4" fill="#171E24" stroke="#ff7a1a" strokeWidth="1.5" />
        <text x="640" y="420" fill="#F2F4F6" fontFamily="'Barlow Condensed', sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
          HOT CHARGE TO EAF
        </text>
        <text x="640" y="436" fill="#ff9e4d" fontFamily="'IBM Plex Mono', monospace" fontSize="9" textAnchor="middle">
          650°C - 700°C (HDRI)
        </text>

        {/* Cooled DRI (CDRI) Discharge Path (Left-Down) */}
        <path
          d="M 390 380 L 390 420 L 260 420"
          stroke="#4A7A96"
          strokeWidth="3"
          fill="none"
          className="anim-flow-cdri"
        />
        <rect x="70" y="395" width="190" height="50" rx="4" fill="#171E24" stroke="#4A7A96" strokeWidth="1.5" />
        <text x="165" y="420" fill="#F2F4F6" fontFamily="'Barlow Condensed', sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
          COLD DISCHARGE (CDRI)
        </text>
        <text x="165" y="436" fill="#7FA9C0" fontFamily="'IBM Plex Mono', monospace" fontSize="9" textAnchor="middle">
          AMBIENT / BRIQUETTING
        </text>

        {/* ZONE ANNOTATIONS & LABELS */}
        {/* Top Zone Label */}
        <text x="470" y="55" fill="#A7AFB8" fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="0.05em">
          ORE CHARGE — AMBIENT
        </text>

        {/* Mid Reduction Zone Label */}
        <line x1="465" y1="235" x2="520" y2="235" stroke="#ff7a1a" strokeWidth="1" strokeDasharray="2 2" />
        <text x="530" y="232" fill="#F2F4F6" fontFamily="'Barlow Condensed', sans-serif" fontSize="14" fontWeight="700">
          REDUCTION ZONE
        </text>
        <text x="530" y="248" fill="#ff9e4d" fontFamily="'IBM Plex Mono', monospace" fontSize="11">
          Fe2O3 + 3CO/3H2 → 2Fe + 3CO2/3H2O
        </text>
        <text x="530" y="264" fill="#ff9e4d" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="600">
          800°C – 850°C
        </text>

        {/* Bottom Discharge Temp */}
        <text x="480" y="365" fill="#A7AFB8" fontFamily="'IBM Plex Mono', monospace" fontSize="11">
          DISCHARGE: 600°C – 700°C
        </text>
      </svg>

      <div className="process-explorer" aria-label="MIDREX process stages">
        <div className="process-explorer-heading">
          <span className="eyebrow">Explore the process</span>
          <span className="process-explorer-status">Stage {selectedStage.number} of 04</span>
        </div>
        <div className="process-stage-tabs" role="tablist" aria-label="MIDREX process stages">
          {processStages.map((stage, index) => (
            <button
              key={stage.number}
              type="button"
              className={`process-stage-tab ${activeStage === index ? 'is-active' : ''}`}
              role="tab"
              aria-selected={activeStage === index}
              onClick={() => setActiveStage(index)}
            >
              <span className="process-stage-number">{stage.number}</span>
              <span>{stage.title}</span>
            </button>
          ))}
        </div>
        <div className="process-stage-detail" role="tabpanel">
          <div>
            <h3>{selectedStage.title}</h3>
            <p>{selectedStage.description}</p>
          </div>
          <span className="process-stage-temperature">{selectedStage.temperature}</span>
        </div>
      </div>

      {/* Legend Component */}
      <div className="shaft-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#A7AFB8' }} />
          <span>Iron Ore Pellets (Ambient)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#ff9e4d' }} />
          <span>Metallized DRI (Fe ≥ 93.9%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#7FA9C0' }} />
          <span>Counter-Current Reducing Gas (H2 + CO)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#ff7a1a' }} />
          <span>HDRI Hot Direct Feed (700°C)</span>
        </div>
      </div>
    </div>
  );
};
