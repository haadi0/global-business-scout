import { motion } from "framer-motion";

interface GearIconProps {
  size?: number;
  className?: string;
  reverse?: boolean;
  speed?: number;
}

export const GearIcon = ({ 
  size = 100, 
  className = "", 
  reverse = false,
  speed = 10 
}: GearIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <path
        fill="currentColor"
        d="M97.6,55.7V44.3l-11.4-2.4c-0.8-3.1-2-6-3.5-8.7l6.5-9.8l-8.1-8.1l-9.8,6.5c-2.7-1.5-5.6-2.7-8.7-3.5L60.3,7h-11.4
        l-2.4,11.4c-3.1,0.8-6,2-8.7,3.5l-9.8-6.5l-8.1,8.1l6.5,9.8c-1.5,2.7-2.7,5.6-3.5,8.7L11.4,44.3v11.4l11.4,2.4
        c0.8,3.1,2,6,3.5,8.7l-6.5,9.8l8.1,8.1l9.8-6.5c2.7,1.5,5.6,2.7,8.7,3.5l2.4,11.4h11.4l2.4-11.4c3.1-0.8,6-2,8.7-3.5l9.8,6.5
        l8.1-8.1l-6.5-9.8c1.5-2.7,2.7-5.6,3.5-8.7L97.6,55.7z M54.5,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15
        C69.5,58.3,62.8,65,54.5,65z"
      />
    </motion.svg>
  );
};
