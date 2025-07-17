import { render, screen } from '@testing-library/react';
import CalculatorInput from '../CalculatorInput';

test('shows error for out-of-range input', () => {
    render(<CalculatorInput label="Test" value={0} onChange={() => { }} min={1} max={10} error="Out of range" />);
    expect(screen.getByText(/out of range/i)).toBeTruthy();
}); 