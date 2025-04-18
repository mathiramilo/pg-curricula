import { useCallback, useEffect } from "react";

import { useBoolean } from "./useBoolean";

const FIVE_MINUTES = 5 * 60 * 1000;

export function useFeedbackTimer(delay: number = FIVE_MINUTES) {
  const { value: show, setTrue: open, setFalse: close } = useBoolean(false);

  const hasShownAlready = () =>
    Boolean(localStorage.getItem("askForFeedbackShown"));

  const openModal = useCallback(() => {
    if (!hasShownAlready()) {
      open();
    }
  }, [open]);

  const closeModal = useCallback(() => {
    close();
    localStorage.setItem("askForFeedbackShown", "true");
  }, [close]);

  useEffect(() => {
    if (hasShownAlready()) return;
    const timerId = window.setTimeout(openModal, delay);
    return () => window.clearTimeout(timerId);
  }, [delay, open, openModal]);

  return { showModal: show, closeModal };
}
