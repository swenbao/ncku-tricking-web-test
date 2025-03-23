
import { useState, useEffect } from 'react';

export const useNavbarScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Make navbar visible when scrolling down past 10px
      if (currentScrollY > 10) {
        setScrolled(true);
        setVisible(true);
      } else {
        // At the top of the page
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return {
    scrolled,
    visible
  };
};
