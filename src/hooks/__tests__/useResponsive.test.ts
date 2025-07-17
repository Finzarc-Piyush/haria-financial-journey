import { renderHook, act } from '@testing-library/react';
import { useResponsive } from '../useResponsive';

test('detects mobile/tablet/desktop breakpoints', () => {
    global.innerWidth = 500;
    const { result, rerender } = renderHook(() => useResponsive());
    act(() => { global.innerWidth = 800; window.dispatchEvent(new Event('resize')); });
    rerender();
    expect(result.current.isTablet).toBe(true);
    act(() => { global.innerWidth = 1200; window.dispatchEvent(new Event('resize')); });
    rerender();
    expect(result.current.isDesktop).toBe(true);
}); 