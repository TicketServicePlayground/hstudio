'use client'
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageCarousel from '@/components/image-carousel';
import Footer from "@/components/footer";
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const [index, setIndex] = useState(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);

  const t = useTranslations('about.lyrics');

  const texts = [
    t('l1'),
    t('l2'),
    t('l3'),
    t('l4')
  ];

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.8;
    setIndex(Math.min(Math.floor(scrollY / threshold), texts.length - 1));

    const carouselElement = document.getElementById("carousel-section");
    if (carouselElement) {
      const rect = carouselElement.getBoundingClientRect();
      setIsCarouselVisible(rect.top < windowHeight * 0.5);
    }
  }, [texts.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-full overflow-y-auto relative" style={{ minHeight: `${texts.length * 100}vh` }}>
      <div className="relative w-full flex flex-col items-center justify-center" style={{ height: `${texts.length * 100}vh` }}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none">
          <AnimatePresence mode="wait">
            {index < texts.length && (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: isCarouselVisible ? 0 : 1, y: isCarouselVisible ? -20 : 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  mass: 1
                }}
                className="gradient-text text-[50px] leading-[79.68px] md:text-[86px] font-medium font-host font-extrabold text-center"
              >
                {texts[index]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div id="carousel-section" className="h-max w-full snap-start pb-20 pt-28 lg:pt-22 md:pt-24 2xl:pt-20">
        <ImageCarousel />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;