
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, ArrowRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatIsTricking = () => {
  const { language } = useLanguage();

  const trickingElements = [
    {
      title: language === 'en' ? 'Flips' : '空翻',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17"/><path d="M14.53 8.06A6.07 6.07 0 1 1 2.77 5.93a6.07 6.07 0 0 1 11.76 2.13Z"/></svg>
      ),
      color: 'bg-blue-900',
    },
    {
      title: language === 'en' ? 'Kicks' : '踢技',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M2 12h3"/><path d="M13 5c4.3 0 7.3 2 9 6"/><path d="M13 19c4.3 0 7.3-2 9-6"/><path d="M5 19c-2.2 0-3.7-1.9-3-4l4-14c.5-1.5 3.3-1.7 4.9-.3C13.7 3.3 15.2 6.7 15 11c-.1 2-1 3.4-2 4"/><path d="M5 5c-2.2 0-3.7 1.9-3 4l4 14c.5 1.5 3.3 1.7 4.9.3C13.7 20.7 15.2 17.3 15 13c-.1-2-1-3.4-2-4"/><path d="M8 21h0"/></svg>
      ),
      color: 'bg-sky-500',
    },
    {
      title: language === 'en' ? 'Twists' : '轉體',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93A10 10 0 1 1 19.07 19.07A10 10 0 0 1 4.93 4.93"/><path d="M9 13.73v-3.46"/><path d="M12 16v-8"/><path d="M15 13.73v-3.46"/></svg>
      ),
      color: 'bg-blue-500',
    },
    {
      title: language === 'en' ? 'Ground Techniques' : '地板技',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M7 3h.01"/><path d="M11 3h.01"/><path d="M15 3h.01"/><path d="M19 3h.01"/><path d="M3 7h.01"/><path d="M7 7h.01"/><path d="M11 7h.01"/><path d="M15 7h.01"/><path d="M19 7h.01"/><path d="M3 11h.01"/><path d="M7 11h.01"/><path d="M11 11h.01"/><path d="M15 11h.01"/><path d="M19 11h.01"/><path d="M3 15h.01"/><path d="M7 15h.01"/><path d="M11 15h.01"/><path d="M15 15h.01"/><path d="M19 15h.01"/><path d="M3 19h.01"/><path d="M7 19h.01"/><path d="M11 19h.01"/><path d="M15 19h.01"/><path d="M19 19h.01"/></svg>
      ),
      color: 'bg-green-500',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'What is Tricking?' : '什麼是Tricking？'}
          </h2>
          <Button variant="outline" size="sm" asChild className="rounded-full px-4">
            <Link to="/tricktionary">
              {language === 'en' ? 'View All' : '查看全部'} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-8">
          {language === 'en' 
            ? 'Tricking is an extreme sport that combines flips, kicks, twists, and ground techniques. Think of it as gymnastics + taekwondo.' 
            : 'Tricking 是一個結合了空翻、踢技、轉體、地板技的極限運動，如果你聽不懂，可以把它想像成是體操+跆拳道。'}
        </p>
        
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full touch-pan-y scrollbar-hide"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {trickingElements.map((element, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-2xl font-bold mb-2 text-black">{element.title}</h3>
                      <div className={`w-40 h-48 ${element.color} rounded-lg flex items-center justify-center mb-4`}>
                        {element.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default WhatIsTricking;
