import { renderHook, act } from '@testing-library/react';
import { useSequence, useCounter } from '../useAnimation';

jest.useFakeTimers();

test('useSequence triggers steps at correct times', () => {
    const { result } = renderHook(() => useSequence(3, [100, 200, 300]));
    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe(1);
    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe(2);
    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe(3);
});

test('useCounter animates to target', () => {
    const { result } = renderHook(() => useCounter(100, 300));
    act(() => { jest.advanceTimersByTime(300); });
    expect(result.current).toBe(100);
}); 