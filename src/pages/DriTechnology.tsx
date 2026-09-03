import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Flame, Atom, Cpu, Gauge, Layers, Sparkles } from 'lucide-react';
import { MidrexShaftDiagram } from '../components/MidrexShaftDiagram';
import { Spotlight } from '../components/Spotlight';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export const DriTechnology: React.FC = () => {
  useRevealOnScroll();

  return (
    <div className="dri-technology-page">
      {/* Page Hero Header */}
      <section className="hero-page">
        <img
          src="/driTech.jpg"
          alt="MIDREX DRI Technology"
          className="hero-page-bg"
        />
        <div className="hero-page-overlay" />

        <div className="container hero-page-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Technology</span>
            <span>/</span>
            <span style={{ color: 'var(--ember-bright)' }}>DRI Technology</span>
          </div>
          <div className="eyebrow">The MIDREX Process</div>
          <h1>World-Class Direct Reduction Technology</h1>
          <p className="lead">
            Harnessing proprietary Japanese MIDREX gas-based metallurgy to convert raw iron ore oxide pellets into ultra-high-purity solid metallics with industry-leading thermal and environmental efficiency.
          </p>
        </div>
      </section>

      {/* #technology: Two-Column Shaft Furnace vs Blast Furnace */}
      <section id="technology" className="section">
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="eyebrow">Solid-State Metallurgy</div>
              <h2 className="section-title">A Shaft Furnace, Not A Blast Furnace</h2>
              <p className="lead">
                The defining hallmark of Direct Reduced Iron (DRI) is that reduction occurs completely in the solid state. Unlike conventional blast furnaces that burn metallurgical coke to melt iron ore at 1,500°C+, the MIDREX shaft furnace operates below the melting point of iron (~800°C–850°C).
              </p>
              <p>
                Inside our vertical shaft reactor, oxygen is stripped away from iron oxide pellets (Fe₂O₃) by a counter-current flow of high-temperature reducing gas (a stoichiometric blend of Hydrogen H₂ and Carbon Monoxide CO). The result is pristine metallic iron (Fe) that retains its original pellet geometry while gaining a porous, sponge-like internal micro-structure.
              </p>
              <p>
                This elegant thermodynamic route eliminates coke ovens, sinter plants, and slag-heavy emissions—slashing capital footprint, operational energy requirements, and environmental impact.
              </p>
            </div>

            <div className="reveal">
              <Spotlight>
                <div className="eyebrow" style={{ color: 'var(--steel-light)' }}>Process Comparison</div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>MIDREX Shaft vs. Blast Furnace</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase' }}>
                      Primary Reducing Fuel
                    </div>
                    <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '0.95rem' }}>
                      Clean Natural Gas (H₂ + CO) vs. Metallurgical Coal & Coke
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase' }}>
                      Physical State During Reduction
                    </div>
                    <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '0.95rem' }}>
                      Solid-State (No Melting) vs. Liquid Molten Pig Iron
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase' }}>
                      Reaction Temperature Zone
                    </div>
                    <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '0.95rem' }}>
                      800°C – 850°C vs. 1,450°C – 1,600°C Blast Smelting
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 122, 26, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--ember-bright)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ember-bright)', textTransform: 'uppercase' }}>
                      Hydrogen Transition Capability
                    </div>
                    <div style={{ color: '#FFF', fontWeight: 600, fontSize: '0.95rem' }}>
                      100% Green H₂ Ready Architecture for Net-Zero Steel
                    </div>
                  </div>
                </div>
              </Spotlight>
            </div>
          </div>
        </div>
      </section>

      {/* #significance: Why DRI Matters + 3-card Value Grid */}
      <section id="significance" className="section section-bg">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Strategic Value Proposition</div>
            <h2 className="section-title">Why DRI Matters to Pakistan's Economy</h2>
            <p className="section-subtitle">
              Empowering downstream steelmakers with consistent metallurgy, scrap independence, and environmental superiority.
            </p>
          </div>

          <div className="three-col dri-values-grid">
            <Spotlight className="reveal">
              <div className="value-icon">
                <Atom size={24} />
              </div>
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Purity & Strength</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Consistent Chemistry</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Virgin iron free of residual tramp elements (Copper, Tin, Lead &lt; 0.005%) ensures high-yield ductile rebar, seismic wire rod, and critical automotive-grade alloy steels.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon value-icon-steel">
                <ShieldCheck size={24} />
              </div>
              <div className="eyebrow eyebrow-steel" style={{ marginBottom: '0.25rem' }}>Supply Security</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Scrap Independence</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Shields Pakistan’s re-rolling mills from volatile global scrap prices and foreign exchange fluctuations, ensuring guaranteed, continuous domestic metallic supply.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="value-icon">
                <Flame size={24} />
              </div>
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Decarbonization</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Lower Emissions Route</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                Delivers 55% to 60% lower carbon footprint per ton compared to coal-fired blast furnaces, establishing the cornerstone of Pakistan’s green industrial transition.
              </p>
            </Spotlight>
          </div>
        </div>
      </section>

      {/* #process: MIDREX Process Flow & Animated Shaft Diagram */}
      <section id="process" className="section">
        <div className="container">
          <div className="section-header centered reveal">
            <div className="eyebrow">Thermodynamic Precision</div>
            <h2 className="section-title">Most Efficient Use of Gas</h2>
            <p className="section-subtitle">
              Interactive process flow of the MIDREX shaft reactor and catalytic reformer loop at Port Bin Qasim.
            </p>
          </div>

          {/* 1. Animated MIDREX SVG Diagram */}
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <MidrexShaftDiagram />
          </div>

          {/* 2. 4-Column Process Step Grid */}
          <div className="four-col">
            <Spotlight className="reveal">
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Step 01</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Ore Charging</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                Ambient Temperature
              </div>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                High-grade oxide iron ore pellets (67%+ Fe) are conveyed into the top seal hopper and gravitate smoothly downward through the vertical shaft furnace.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="eyebrow eyebrow-steel" style={{ marginBottom: '0.25rem' }}>Step 02</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Gas Reforming</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--steel-light)', marginBottom: '0.75rem' }}>
                ~900°C Catalytic Reactor
              </div>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Natural gas (CH₄) and recycled off-gas are catalytically reformed into high-purity reducing gas (H₂ + CO) with zero external steam addition.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Step 03</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Reduction Zone</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ember-bright)', marginBottom: '0.75rem' }}>
                800°C – 850°C Reaction Bed
              </div>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                Hot reducing gas flows counter-currently upward through the descending pellet bed, stripping away oxygen in an endothermic/exothermic thermodynamic balance.
              </p>
            </Spotlight>

            <Spotlight className="reveal">
              <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>Step 04</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Cooling / Hot Discharge</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ember)', marginBottom: '0.75rem' }}>
                600°C – 700°C (HDRI / CDRI)
              </div>
              <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                The fully metallized DRI is either cooled for ambient merchant shipment (CDRI) or discharged hot at 700°C for direct transfer into adjacent EAF melt shops.
              </p>
            </Spotlight>
          </div>

          {/* Horizontal Gradient Rule Bar with Periodic Shimmer Sweep */}
          <div className="gradient-shimmer-bar reveal" />
        </div>
      </section>

      {/* #plant: Plant Demonstration Test & Results Table */}
      <section id="plant" className="section section-bg">
        <div className="container">
          <div className="reveal">
            <div className="badge-verified">
              <span className="pulsing-dot" />
              <span>Verified by Midrex Technologies, Inc.</span>
            </div>

            <h2 className="section-title">Plant Demonstration Test & Verified Results</h2>
            <p className="lead" style={{ maxWidth: '880px' }}>
              Following commercial start-up on May 25, 2013 (executed pursuant to the landmark December 2011 licensing and technical assistance covenants), the Bin Qasim plant completed its official 72-hour continuous Demonstration Test under full supervision of Midrex Technologies, Inc. (USA) and Kobe Steel, Ltd. (Japan) engineers.
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-dark)', fontStyle: 'italic', marginBottom: '2rem' }}>
              *Note: The facility was formerly founded and commissioned under Tuwairqi Steel Mills Limited (TSML), currently restructured and operating as National Steel Complex Limited (NSCL).
            </p>
          </div>

          {/* Results Table */}
          <div className="table-container reveal">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Performance Item</th>
                  <th>MIDREX Guaranteed Parameter</th>
                  <th>Actual Plant Test Result</th>
                  <th style={{ textAlign: 'center' }}>Remarks / Engineering Formula</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Average Adjusted Production Rate (AP)</strong>
                  </td>
                  <td>160.0 t/h minimum</td>
                  <td className="val-highlight">163.6 t/h</td>
                  <td rowSpan={5} className="remarks-cell">
                    <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#FFF' }}>
                      Performance Formula:
                    </div>
                    <code style={{ color: 'var(--ember-bright)', fontSize: '0.95rem' }}>
                      AP = P × &#123;1 + 0.025 × (M − 93)&#125;
                    </code>
                    <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
                      Where P = Measured Hourly Output, M = Metallization Percentage.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Average Metallization (M)</strong>
                  </td>
                  <td>93.0% minimum</td>
                  <td className="val-highlight">93.9%</td>
                </tr>
                <tr>
                  <td>
                    <strong>Average Carbon Content</strong>
                  </td>
                  <td>1.2% – 1.8% controlled</td>
                  <td className="val-highlight">1.78%</td>
                </tr>
                <tr>
                  <td>
                    <strong>Average Net Natural Gas Consumption</strong>
                  </td>
                  <td>10.5 mm Btu (2.65 Gcal) max / ton</td>
                  <td className="val-highlight">9.8 mm Btu (2.47 Gcal) / ton</td>
                </tr>
                <tr>
                  <td>
                    <strong>Average Electricity Consumption</strong>
                  </td>
                  <td>125.0 kWh / ton maximum</td>
                  <td className="val-highlight">120.0 kWh / ton</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Bar Citing Certification + Dates */}
          <div
            className="reveal"
            style={{
              padding: '1.25rem 1.75rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
            }}
          >
            <div>
              <span style={{ color: 'var(--ember-bright)', fontWeight: 600 }}>OFFICIAL VERIFICATION: </span>
              Demonstration Test Certificate issued by Midrex Technologies, Inc. (Charlotte, NC, USA) & Kobe Steel, Ltd. (Tokyo, Japan).
            </div>
            <div style={{ color: 'var(--steel-light)' }}>
              Commercial Start-up: May 25, 2013
            </div>
          </div>

          <figure
            className="reveal"
            style={{
              margin: '2rem auto 0',
              maxWidth: '900px',
              padding: '1rem',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <img
              src="/MIDREX-certificate.jpg"
              alt="MIDREX Demonstration Test Certificate"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <figcaption
              style={{
                paddingTop: '0.75rem',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textAlign: 'center',
              }}
            >
              MIDREX Demonstration Test Certificate
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section">
        <div className="container">
          <div className="band-cta reveal">
            <div className="band-cta-content">
              <div className="eyebrow">Product Offerings</div>
              <h2 style={{ marginBottom: '1rem' }}>Explore Our DRI & HBI Specifications</h2>
              <p>
                From cold merchant pellets (CDRI) to direct hot-discharge (HDRI) and export-grade briquettes (HBI).
              </p>
              <div className="band-cta-buttons">
                <Link to="/products" className="btn btn-solid btn-lg">
                  <span>View Product Catalog</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="btn btn-outline btn-lg">
                  <span>Inquire with Sales</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
