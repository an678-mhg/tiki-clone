import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Slide } from "../../../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface BannerProps {
  slides: Slide[];
}

const Banner: FC<BannerProps> = ({ slides }) => {
  return (
    <Swiper slidesPerView={1.3}>
      {slides.map((slide) => (
        <SwiperSlide key={slide._id}>
          <div className="aspect-auto inline-block">
            <LazyLoadImage src={slide.image} effect="opacity" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
