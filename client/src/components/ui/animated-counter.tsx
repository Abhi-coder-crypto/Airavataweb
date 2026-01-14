import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ target, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCount(Math.floor(current));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, hasAnimated, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
