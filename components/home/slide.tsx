import { Work } from "../../types/work";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import classNames from "classnames";

type Props = {
  active: boolean;
  item: Work;
  onClick: () => void;
  parallaxValues: any;
};

const titleVariants = {
  hidden: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const letterVariants = {
  hidden: {
    x: -10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  }
}

const Slide = ({ active, item, onClick, parallaxValues }: Props): JSX.Element => {

  const gradientStopClasses = `from-[${item.colors[0]}] to-[${item.colors[1]}]`
  return (
    <div className="relative pl-2 min-w-0 home__carousel__slide transition-transform duration-500" onClick={onClick}>
      <div className="home__carousel__parallax">
        <div
          className="home__carousel__parallax__layer"
          style={{
            ...(parallaxValues && {
              transform: `translateX(${parallaxValues}%)`,
            }),
          }}
        >
          <div className="relative">
            <motion.h2 animate={active ? "animate" : "hidden"} initial="hidden" className="dark:text-white text-8xl font-bold uppercase text-center text-shadow tracking-widest absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" variants={titleVariants}>
              {item.title.split('').map((letter, index) => {
                return <motion.span variants={letterVariants} key={index} className={letter === " " ? "block" : "inline-block"}>{letter}</motion.span>
              })}
            </motion.h2>
            <Image
              className="block w-full object-cover home__carousel__slide__img home__carousel__parallax__img"
              src={item.mainImg}
              alt={item.title}
              width="1600"
              height="679"
              priority
            />
          </div>
          <div className="home__carousel__infos mt-8">
            <Link href={`/works/${item.slug}`} className={classNames(gradientStopClasses, "text-base text-center mx-auto bg-gradient-to-r bg-no-repeat [background-position:0_88%] [background-size:100%_0.2em] motion-safe:transition-all motion-safe:duration-200 hover:[background-size:100%_100%] focus:[background-size:100%_100%]")}>
              {"Découvrir".toUpperCase()}
            </Link>
            <div className="container flex my-4 text-xs">
              <div className="w-1/2 flex justify-between pr-8">
                <ul>
                  <li>{"Client".toUpperCase()}</li>
                  <li>{"Rôle".toUpperCase()}</li>
                  <li>{"Date".toUpperCase()}</li>
                </ul>
                <ul>
                  <li>{item.client.toUpperCase()}</li>
                  <li>{item.role.toUpperCase()}</li>
                  <li>{item.date.toUpperCase()}</li>
                </ul>
              </div>
              <div className="w-1/2 pl-8">
                <p>{item.short.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
