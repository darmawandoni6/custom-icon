import { type FC, type ReactNode, useEffect, useRef } from 'react';

import Swiper from 'swiper/bundle';
import 'swiper/css';

const SwiperComponent: FC<{ children: ReactNode; type: string }> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const nextEl = `.swiper-button-next-${props.type}`;
      const prevEl = `.swiper-button-prev-${props.type}`;
      const swiper = new Swiper(ref.current, {
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
          nextEl,
          prevEl,
        },
        breakpoints: {
          640: {
            slidesPerView: 3,
          },
        },
        on: {
          slideChange: (val: Swiper) => {
            const prevButton = document.querySelector(prevEl) as HTMLDivElement;
            if (val.activeIndex === 0) prevButton.classList.add('opacity-5');
            else prevButton.classList.remove('opacity-5');

            const nextButton = document.querySelector(nextEl) as HTMLDivElement;
            if (val.activeIndex === val.slides.length - 3) nextButton.classList.add('opacity-5');
            else nextButton.classList.remove('opacity-5');
          },
        },
      });
      return () => {
        swiper.destroy();
      };
    }
  }, [ref.current]);

  return (
    <div ref={ref} className="swiper">
      <div className="swiper-wrapper">{props.children}</div>
    </div>
  );
};

export default SwiperComponent;
