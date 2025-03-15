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
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none mb-[400px]">
          <AnimatePresence mode="wait">
            {index < texts.length && (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{
                  scale: isCarouselVisible ? 0.8 : 1,
                  opacity: isCarouselVisible ? 0 : 1,
                  y: isCarouselVisible ? -20 : 0
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                  mass: 1
                }}
                className="
                  gradient-text 
                  text-[58px] leading-[83%] 
                  md:text-[96px] md:leading-[83%] 
                  font-medium font-host text-center 
                  break-words 
                  w-full md:max-w-[1369px] max-w-[350px]
                  min-h-[384px] md:min-h-[240px]
                  px-8 md:px-0
                "
                style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
              >
                {texts[index]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Отступ сверху у карусели теперь 400px */}
      <div id="carousel-section" className="h-max w-full snap-start pb-20 pt-[400px]">
        <ImageCarousel />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;