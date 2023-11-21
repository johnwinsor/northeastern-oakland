import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import { PropsWithChildren } from "react";

const autoplayOptions = {
  delay: 4000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
}

// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  return (
    <div className="mx-auto embla" ref={emblaRef}>
      <div className="flex h-full">{children}</div>
    </div>
  );
};
export default Carousel;