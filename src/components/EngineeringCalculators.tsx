import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

type CalculatorId = 'steel' | 'rolling' | 'beam';

type CalculatorField = {
  key: string;
  label: string;
  unit: string;
  step?: string;
};

const density = 7850;

const calculators: Record<CalculatorId, { label: string; description: string; fields: CalculatorField[] }> = {
  steel: {
    label: 'Steel Weight',
    description: 'Estimate the weight of a rectangular steel plate, sheet, or flat bar.',
    fields: [
      { key: 'length', label: 'Length', unit: 'mm' },
      { key: 'width', label: 'Width', unit: 'mm' },
      { key: 'thickness', label: 'Thickness', unit: 'mm' },
      { key: 'quantity', label: 'Quantity', unit: 'pcs', step: '1' },
    ],
  },
  rolling: {
    label: 'Plate Rolling',
    description: 'Calculate the approximate weight and developed length of a rolled plate.',
    fields: [
      { key: 'diameter', label: 'Finished Diameter', unit: 'mm' },
      { key: 'width', label: 'Plate Width', unit: 'mm' },
      { key: 'thickness', label: 'Plate Thickness', unit: 'mm' },
      { key: 'quantity', label: 'Quantity', unit: 'pcs', step: '1' },
    ],
  },
  beam: {
    label: 'Beam Weight',
    description: 'Estimate the weight of a symmetrical I-beam section for fabrication planning.',
    fields: [
      { key: 'height', label: 'Overall Height', unit: 'mm' },
      { key: 'flangeWidth', label: 'Flange Width', unit: 'mm' },
      { key: 'webThickness', label: 'Web Thickness', unit: 'mm' },
      { key: 'flangeThickness', label: 'Flange Thickness', unit: 'mm' },
      { key: 'length', label: 'Length', unit: 'm' },
      { key: 'quantity', label: 'Quantity', unit: 'pcs', step: '1' },
    ],
  },
};

const initialValues: Record<CalculatorId, Record<string, string>> = {
  steel: { length: '6000', width: '1500', thickness: '10', quantity: '1' },
  rolling: { diameter: '2000', width: '1500', thickness: '10', quantity: '1' },
  beam: { height: '300', flangeWidth: '150', webThickness: '8', flangeThickness: '12', length: '6', quantity: '1' },
};

const toNumber = (value: string) => Number.parseFloat(value) || 0;

const calculateResult = (calculatorId: CalculatorId, values: Record<string, string>) => {
  const quantity = Math.max(1, toNumber(values.quantity));
  let weightPerPiece = 0;
  let secondaryLabel = '';
  let secondaryValue = '';

  if (calculatorId === 'steel') {
    weightPerPiece = (toNumber(values.length) * toNumber(values.width) * toNumber(values.thickness) * density) / 1_000_000_000;
    secondaryLabel = 'Volume per piece';
    secondaryValue = `${((toNumber(values.length) * toNumber(values.width) * toNumber(values.thickness)) / 1_000_000_000).toFixed(4)} m³`;
  }

  if (calculatorId === 'rolling') {
    const meanDiameter = toNumber(values.diameter) + toNumber(values.thickness);
    const developedLength = Math.PI * meanDiameter;
    weightPerPiece = (developedLength * toNumber(values.width) * toNumber(values.thickness) * density) / 1_000_000_000;
    secondaryLabel = 'Developed length';
    secondaryValue = `${(developedLength / 1000).toFixed(3)} m`;
  }

  if (calculatorId === 'beam') {
    const area = (2 * toNumber(values.flangeWidth) * toNumber(values.flangeThickness)) + ((toNumber(values.height) - (2 * toNumber(values.flangeThickness))) * toNumber(values.webThickness));
    weightPerPiece = (area * density * toNumber(values.length)) / 1_000;
    secondaryLabel = 'Section area';
    secondaryValue = `${(area / 100).toFixed(2)} cm²`;
  }

  return { weightPerPiece, totalWeight: weightPerPiece * quantity, secondaryLabel, secondaryValue };
};

export const EngineeringCalculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>('steel');
  const [values, setValues] = useState(initialValues);
  const activeDefinition = calculators[activeCalculator];
  const result = calculateResult(activeCalculator, values[activeCalculator]);

  const updateValue = (key: string, value: string) => {
    setValues((current) => ({
      ...current,
      [activeCalculator]: { ...current[activeCalculator], [key]: value },
    }));
  };

  const resetCalculator = () => {
    setValues((current) => ({ ...current, [activeCalculator]: initialValues[activeCalculator] }));
  };

  return (
    <div className="engineering-tools-panel">
      <div className="engineering-tool-tabs" role="tablist" aria-label="Engineering calculators">
        {(Object.keys(calculators) as CalculatorId[]).map((calculatorId) => (
          <button
            key={calculatorId}
            type="button"
            role="tab"
            aria-selected={activeCalculator === calculatorId}
            className={`engineering-tool-tab ${activeCalculator === calculatorId ? 'is-active' : ''}`}
            onClick={() => setActiveCalculator(calculatorId)}
          >
            <Calculator size={17} />
            <span>{calculators[calculatorId].label}</span>
          </button>
        ))}
      </div>

      <div className="engineering-tool-content" role="tabpanel">
        <div className="engineering-tool-copy">
          <div className="eyebrow">{activeDefinition.label}</div>
          <h3>{activeDefinition.label} Calculator</h3>
          <p>{activeDefinition.description}</p>
          <p className="calculator-note">Uses steel density of 7,850 kg/m³. Results are estimates for planning and should be verified against final drawings.</p>
        </div>

        <div className="calculator-workspace">
          <div className="calculator-fields">
            {activeDefinition.fields.map((field) => (
              <label key={field.key} className="calculator-field">
                <span>{field.label}</span>
                <div className="calculator-input-wrap">
                  <input
                    type="number"
                    min="0"
                    step={field.step || 'any'}
                    value={values[activeCalculator][field.key]}
                    onChange={(event) => updateValue(field.key, event.target.value)}
                  />
                  <span>{field.unit}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="calculator-result">
            <span className="calculator-result-label">Estimated total weight</span>
            <strong>{result.totalWeight.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
            <span className="calculator-result-unit">kg</span>
            <div className="calculator-result-meta">
              <span>Per piece: {result.weightPerPiece.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg</span>
              <span>{result.secondaryLabel}: {result.secondaryValue}</span>
            </div>
          </div>
        </div>

        <button type="button" className="calculator-reset" onClick={resetCalculator}>
          <RotateCcw size={14} />
          <span>Reset values</span>
        </button>
      </div>
    </div>
  );
};
