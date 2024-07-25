import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function useResizeObserver(): [
  MutableRefObject<HTMLDivElement | null>,
  number,
  number
] {
  const refElem = useRef<HTMLDivElement | null>(null);
  const [widthElem, setWidthElem] = useState(0);
  const [heightElem, setHeightElem] = useState(0);

  useEffect(() => {
    if (!refElem.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setHeightElem(refElem.current?.offsetHeight ?? 0);
      setWidthElem(refElem.current?.offsetWidth ?? 0);
    });

    resizeObserver.observe(refElem.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [refElem, widthElem, heightElem];
}
