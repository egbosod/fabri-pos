import { useSearchParams } from 'react-router';
import { useCallback } from 'react';
import type { ModalName } from '../types/pos';

/**
 * Hook for URL-addressable modal management.
 * Modals are controlled via the `?modal=<name>` search param.
 * All other search params (kunde, prosjekt, sok) are preserved.
 */
export function useModalParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeModal = searchParams.get('modal') as ModalName | null;

  const openModal = useCallback(
    (name: ModalName) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('modal', name);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const closeModal = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('modal');
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const isModalOpen = useCallback(
    (name: ModalName) => activeModal === name,
    [activeModal],
  );

  return { activeModal, openModal, closeModal, isModalOpen };
}

/**
 * Hook to read & write page-level URL state (kunde, prosjekt, sok).
 */
export function useURLState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const kundeParam = searchParams.get('kunde');
  const prosjektParam = searchParams.get('prosjekt');
  const sokParam = searchParams.get('sok') || '';

  const setURLState = useCallback(
    (key: 'kunde' | 'prosjekt' | 'sok', value: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) {
            next.set(key, value);
          } else {
            next.delete(key);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { kundeParam, prosjektParam, sokParam, setURLState };
}
