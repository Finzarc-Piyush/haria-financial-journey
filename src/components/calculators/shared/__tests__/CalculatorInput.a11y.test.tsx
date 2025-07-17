import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import CalculatorInput from '../CalculatorInput';

test('CalculatorInput is accessible', async () => {
    const { container } = render(<CalculatorInput label="Amount" value={1000} onChange={() => { }} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
}); 