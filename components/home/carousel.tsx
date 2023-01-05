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
const options = { selected: "home__carousel__slide--active", dragging: "home__carousel__slide--dragging", draggable: "home__carousel__slide--draggable" };

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
      if (embla && embla.clickAllowed()) {
        const currentIndex = embla.selectedScrollSnap();
        if (currentIndex > index) {
          scrollPrev()
        } else {
          scrollNext()
        }
        console.log(index);
      }
    },
    [embla, scrollNext, scrollPrev]
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

  return (
    <div className="p-2 home__carousel">
      <div className="overflow-hidden home__carousel__viewport" ref={viewportRef}>
        <div className="flex flex-1 flex-row h-auto -ml-2 home__carousel__container">
          {slides.map((slide, index) => (
            <Slide active={(embla?.selectedScrollSnap() || 0) === index} item={slide} key={index} onClick={() => onSlideClick(index)} parallaxValues={parallaxValues[index]} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default Carousel;
