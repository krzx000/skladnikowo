import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({ children }: { children: string }) => {
  const letters = children.split("");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden"
      style={{ lineHeight: 0.95 }}
      aria-label={children}
    >
      {/* Warstwa początkowa */}
      <div aria-hidden="true">
        {letters.map((letter, index) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: letter === " " ? 0 : "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * index,
            }}
            className="inline-block"
            key={`initial-${index}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      {/* Warstwa hover */}
      <div className="absolute inset-0" aria-hidden="true">
        {letters.map((letter, index) => (
          <motion.span
            variants={{
              initial: { y: letter === " " ? 0 : "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * index,
            }}
            className="inline-block"
            key={`hover-${index}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};
