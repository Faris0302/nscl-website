import { useEffect, useRef, useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

type Id = 'steel' | 'rolling' | 'beam';
type Field = { key: string; label: string; unit: string };

const DENSITY = 7850; // kg/m³
const defs: Record<Id, { label: string; description: string; fields: Field[] }> = {
  steel: { label: 'Steel weight', description: 'Weight of a rectangular steel plate, sheet or flat bar.', fields: [
    { key: 'length', label: 'Length', unit: 'mm' }, { key: 'width', label: 'Width', unit: 'mm' },
    { key: 'thickness', label: 'Thickness', unit: 'mm' }, { key: 'quantity', label: 'Quantity', unit: 'pcs' }] },
  rolling: { label: 'Plate rolling', description: 'Approximate weight and developed length of a rolled plate.', fields: [
    { key: 'diameter', label: 'Finished diameter', unit: 'mm' }, { key: 'width', label: 'Plate width', unit: 'mm' },
    { key: 'thickness', label: 'Plate thickness', unit: 'mm' }, { key: 'quantity', label: 'Quantity', unit: 'pcs' }] },
  beam: { label: 'Beam weight', description: 'Weight of a symmetrical I-beam section for fabrication planning.', fields: [
    { key: 'height', label: 'Overall height', unit: 'mm' }, { key: 'flangeWidth', label: 'Flange width', unit: 'mm' },
    { key: 'webThickness', label: 'Web thickness', unit: 'mm' }, { key: 'flangeThickness', label: 'Flange thickness', unit: 'mm' },
    { key: 'length', label: 'Length', unit: 'm' }, { key: 'quantity', label: 'Quantity', unit: 'pcs' }] },
};
const initial: Record<Id, Record<string, string>> = {
  steel: { length: '6000', width: '1500', thickness: '10', quantity: '1' },
  rolling: { diameter: '2000', width: '1500', thickness: '10', quantity: '1' },
  beam: { height: '300', flangeWidth: '150', webThickness: '8', flangeThickness: '12', length: '6', quantity: '1' },
};

const n = (v: string) => Number.parseFloat(v) || 0;
export function calculate(id: Id, v: Record<string, string>) {
  const qty = Math.max(1, Math.round(n(v.quantity)));
  let each = 0, label = '', value = '';
  if (id === 'steel') {
    const vol = n(v.length) * n(v.width) * n(v.thickness) / 1e9;
    each = vol * DENSITY; label = 'Volume per piece'; value = `${vol.toFixed(4)} m³`;
  } else if (id === 'rolling') {
    const developed = Math.PI * (n(v.diameter) + n(v.thickness));
    each = developed * n(v.width) * n(v.thickness) * DENSITY / 1e9; label = 'Developed length'; value = `${(developed / 1000).toFixed(3)} m`;
  } else {
    const area = 2 * n(v.flangeWidth) * n(v.flangeThickness) + (n(v.height) - 2 * n(v.flangeThickness)) * n(v.webThickness);
    each = area * DENSITY * n(v.length) / 1e6; label = 'Section area'; value = `${(area / 100).toFixed(2)} cm²`;
  }
  return { each, total: each * qty, label, value };
}

export function Calculators() {
  const [active, setActive] = useState<Id>('steel');
  const [values, setValues] = useState(initial);
  const totalEl = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const def = defs[active];
  const r = calculate(active, values[active]);

  // Total weight rolls to the new value instead of jumping
  useEffect(() => {
    const el = totalEl.current;
    if (!el) return;
    const fmt = (x: number) => x.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    if (prefersReducedMotion()) { el.textContent = fmt(r.total); shown.current = r.total; return; }
    const o = { v: shown.current };
    const t = gsap.to(o, { v: r.total, duration: 0.6, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); shown.current = o.v; } });
    return () => { t.kill(); };
  }, [r.total]);

  return (
    <div className="overflow-hidden rounded-2xl border border-sky-light/12 bg-deep-space-300">
      <div role="tablist" aria-label="Engineering calculators" className="flex flex-wrap gap-2 border-b border-sky-light/10 p-3">
        {(Object.keys(defs) as Id[]).map(id => (
          <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => setActive(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${active === id ? 'bg-amber-flame text-deep-space-100' : 'text-sky-light-800/80 hover:bg-sky-light/8'}`}>
            <Calculator size={15} /> {defs[id].label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h3 className="text-3xl">{def.label} calculator</h3>
          <p className="body mt-3">{def.description}</p>
          <p className="mt-4 text-xs text-sky-light-700/60">Uses a steel density of 7,850 kg/m³. Results are estimates for planning; verify against final drawings.</p>
          <div className="mt-8 rounded-xl border border-amber-flame/40 bg-amber-flame/8 p-6" aria-live="polite">
            <div className="mono-label !text-amber-flame">Total weight</div>
            <div className="mt-1 font-mono text-4xl font-semibold tabular-nums"><span ref={totalEl}>{r.total.toFixed(2)}</span> <span className="text-xl text-sky-light-700/70">kg</span></div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-sky-light/10 pt-4 text-sm">
              <div><div className="mono-label">Per piece</div><div className="mt-1 font-mono tabular-nums">{r.each.toFixed(2)} kg</div></div>
              <div><div className="mono-label">{r.label}</div><div className="mt-1 font-mono tabular-nums">{r.value}</div></div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {def.fields.map(f => (
              <label key={f.key} htmlFor={`calc-${active}-${f.key}`} className="block">
                <span className="mono-label">{f.label}</span>
                <span className="mt-2 flex items-center overflow-hidden rounded-lg border border-sky-light/15 bg-deep-space-200 focus-within:border-amber-flame">
                  <input id={`calc-${active}-${f.key}`} type="number" inputMode="decimal" min="0" step={f.key === 'quantity' ? '1' : 'any'}
                    value={values[active][f.key]} onChange={e => setValues(c => ({ ...c, [active]: { ...c[active], [f.key]: e.target.value } }))}
                    className="w-full min-w-0 bg-transparent px-4 py-3 font-mono tabular-nums outline-none" />
                  <span className="px-3 font-mono text-xs text-sky-light-700/60">{f.unit}</span>
                </span>
              </label>
            ))}
          </div>
          <button type="button" onClick={() => setValues(c => ({ ...c, [active]: initial[active] }))} className="btn btn-line mt-6 !py-2.5"><RotateCcw size={14} /> Reset values</button>
        </div>
      </div>
    </div>
  );
}
