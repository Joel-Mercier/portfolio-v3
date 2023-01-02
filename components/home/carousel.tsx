import { Work } from "../../types/work";
import Slide from "./slide";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ClassNames from "embla-carousel-class-names";

type Props = {
  slides: Work[];
};

const PARALLAX_FACTOR = 1.2;
const options = { selected: "embla__slide--active" };

const Carousel = ({ slides }: Props): JSX.Element => {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState<boolean>(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState<boolean>(false);
  const [parallaxValues, setParallaxValues] = useState<number[]>([]);

  const wheelGestures = WheelGesturesPlugin({
    forceWheelAxis: "y",
  });

  const [viewportRef, embla] = useEmblaCarousel(
    {
      align: "center",
      skipSnaps: false,
      inViewThreshold: 0.5
    },
    [wheelGestures, ClassNames(options)]
  );

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);
  const onSlideClick = useCallback(
    (index: number) => {
      if (embla && embla.clickAllowed()) console.log(index);
    },
    [embla]
  );
  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target().get();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
    });
    setParallaxValues(styles);
  }, [embla, setParallaxValues]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    onScroll();
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
  }, [embla, onSelect, onScroll]);

  // return (
  //   <div className="relative w-full ml-auto mr-auto h-full">
  //     <div className="overflow-hidden w-full h-full" ref={viewportRef}>
  //       <div className="flex select-none -ml-2 w-full h-full">
  //         {slides.map((slide, index) => (
  //           <Slide
  //             item={slide}
  //             key={index}
  //             onClick={() => onSlideClick(index)}
  //             parallaxValues={parallaxValues[index]}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="p-2 embla">
      <div className="overflow-hidden embla__viewport" ref={viewportRef}>
        <div className="flex flex-1 flex-row h-auto -ml-2 embla__container">
          {slides.map((slide, index) => (
            <div className="relative pl-2 min-w-0 embla__slide transition-transform duration-500" key={index}>
              <div className="embla__parallax">
                <div
                  className="embla__parallax__layer"
                  style={{
                    ...(parallaxValues.length && {
                      transform: `translateX(${parallaxValues[index]}%)`,
                    }),
                  }}
                >
                  <img
                    className="block w-full object-cover embla__slide__img embla__parallax__img"
                    src={slide.mainImg}
                    alt="Your alt text"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Carousel;
