import { useEffect } from "react";

export function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  eventHandler: (event?: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      eventHandler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, eventHandler]);
}
