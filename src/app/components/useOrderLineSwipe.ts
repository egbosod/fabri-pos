import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import {
  CANCELS_TO,
  CONFIRMS_TO,
  PANEL_WIDTH,
  SETTLES_TO,
  SUCCESS_FLASH_MS,
  armedBySwipe,
  isArmed,
  isFlashing,
  panelFor,
  panelSide,
  restOffset,
  type OrderLineState,
} from './orderLineState';

/** Drag distance that arms a return (right) or a delete (left). */
const RETURN_THRESHOLD = 100;
const DELETE_THRESHOLD = 150;
const MAX_DRAG = 300;

/**
 * Swipe gesture and state transitions for one order line. A swipe arms an
 * action panel and the row rests open; tapping the panel confirms, which
 * flashes the success panel and then settles; tapping the row or swiping
 * back closes an armed panel without confirming.
 */
export function useOrderLineSwipe(
  state: OrderLineState,
  onStateChange?: (newState: OrderLineState) => void,
  {
    locked = false,
    commitOnRelease = false,
  }: {
    /** A locked line shows its state but cannot be swiped (its state is owned elsewhere). */
    locked?: boolean;
    /** Releasing past the threshold performs the action; otherwise it only arms the panel, and tapping the panel confirms. */
    commitOnRelease?: boolean;
  } = {},
) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const originRef = useRef(0);
  const movedRef = useRef(false);
  const changeRef = useRef(onStateChange);
  changeRef.current = onStateChange;

  const armed = isArmed(state);
  const flashing = isFlashing(state);

  const change = (next: OrderLineState | undefined) => {
    if (next) changeRef.current?.(next);
  };

  // A confirmed panel stays up briefly, then the line settles on its resting state.
  useEffect(() => {
    const next = SETTLES_TO[state];
    if (!next) return;
    const timer = setTimeout(() => change(next), SUCCESS_FLASH_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const handleStart = (clientX: number) => {
    if (flashing || locked) return;
    setIsDragging(true);
    movedRef.current = false;
    startXRef.current = clientX;
    originRef.current = restOffset(state);
    setSwipeOffset(restOffset(state));
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    if (Math.abs(diff) > 4) movedRef.current = true;

    // Only drag towards a panel this line can actually show.
    let min = armedBySwipe(state, 'left') ? -MAX_DRAG : 0;
    let max = armedBySwipe(state, 'right') ? MAX_DRAG : 0;
    const panel = panelFor(state);
    if (armed && panel) {
      if (panelSide(panel.kind) === 'left') { min = 0; max = MAX_DRAG; }
      else { min = -MAX_DRAG; max = 0; }
    }
    setSwipeOffset(Math.max(min, Math.min(max, originRef.current + diff)));
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const panel = panelFor(state);
    if (armed && panel) {
      const closed = panelSide(panel.kind) === 'left'
        ? swipeOffset < PANEL_WIDTH / 2
        : swipeOffset > -PANEL_WIDTH / 2;
      if (closed && movedRef.current) change(CANCELS_TO[state]);
      return;
    }

    const armedState = swipeOffset > RETURN_THRESHOLD ? armedBySwipe(state, 'right')
      : swipeOffset < -DELETE_THRESHOLD ? armedBySwipe(state, 'left')
      : null;
    if (armedState) change(commitOnRelease ? CONFIRMS_TO[armedState] : armedState);
  };

  // Mouse drags keep tracking after the pointer leaves the row.
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onUp = () => handleEnd();
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, swipeOffset]);

  const offset = isDragging ? swipeOffset : restOffset(state);

  return {
    /** Tapping an armed panel confirms it. */
    confirm: () => change(CONFIRMS_TO[state]),
    /** True when the last pointer gesture was a drag rather than a tap. */
    wasDragged: () => movedRef.current,
    rowStyle: {
      transform: `translateX(${offset}px)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    } as React.CSSProperties,
    rowHandlers: {
      onMouseDown: (e: React.MouseEvent) => { e.preventDefault(); handleStart(e.clientX); },
      onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX),
      onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX),
      onTouchEnd: () => handleEnd(),
      onClick: () => { if (armed && !movedRef.current) change(CANCELS_TO[state]); },
    },
  };
}
