import { Work } from "../../types/work";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  active: boolean;
  item: Work;
  onClick: () => void;
  parallaxValues: any;
};

const titleVariants = {
  hidden: {
    x: -100,
    opacity: 0,
    y: "-50%"
  },
  animate: {
    x: "-50%",
    y: "-50%",
    opacity: 1
  }
}

const letterVariants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const Slide = ({ active, item, onClick, parallaxValues }: Props): JSX.Element => {
  console.log(`slide ${item.title} active ? `, active)
  useEffect(() => {
    if (active) {

    }
  }, [active])

  return (
    <div className="relative pl-2 min-w-0 embla__slide transition-transform duration-500" onClick={onClick}>
      <div className="embla__parallax">
        <div
          className="embla__parallax__layer"
          style={{
            ...(parallaxValues && {
              transform: `translateX(${parallaxValues}%)`,
            }),
          }}
        >
          <motion.h2 animate={active ? "animate" : "hidden"} className="dark:text-white text-8xl font-bold uppercase text-center text-shadow tracking-widest absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" variants={titleVariants}>
            {item.title.split('').map((letter, index) => {
              return <motion.span animate={active ? "animate" : "hidden"} variants={letterVariants} key={index}>{letter}</motion.span>
            })}
          </motion.h2>
          <Image
            className="block w-full object-cover embla__slide__img embla__parallax__img"
            src={item.mainImg}
            alt={item.title}
            width="1600"
            height="679"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
