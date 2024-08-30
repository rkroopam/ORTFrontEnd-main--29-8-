import { renderHook, act } from '@testing-library/react';
import useCountdownTimer from './useSetTimer';

jest.useFakeTimers();

describe('useCountdownTimer', () => {
  test('should initialize with the correct initial time', () => {
    const initialTime = 10;
    const { result } = renderHook(() => useCountdownTimer(initialTime, jest.fn()));

    expect(result.current).toBe(initialTime);
  });

  test('should decrement time every second', () => {
    const initialTime = 10;
    const { result } = renderHook(() => useCountdownTimer(initialTime, jest.fn()));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(9);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current).toBe(7);
  });

  test('should call onComplete when time reaches 0', () => {
    const initialTime = 3;
    const onComplete = jest.fn();
    const { result } = renderHook(() => useCountdownTimer(initialTime, onComplete));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test('should not decrement time below 0', () => {
    const initialTime = 2;
    const { result } = renderHook(() => useCountdownTimer(initialTime, jest.fn()));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current).toBe(0);
  });

  test('should clear interval on unmount', () => {
    const initialTime = 10;
    const { result, unmount } = renderHook(() => useCountdownTimer(initialTime, jest.fn()));

    unmount();
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // The time should remain the same since the component is unmounted and the interval is cleared.
    expect(result.current).toBe(10);
  });
});
