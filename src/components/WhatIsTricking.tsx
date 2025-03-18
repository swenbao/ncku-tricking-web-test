
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const WhatIsTricking = () => {
  const { language } = useLanguage();
  
  const trickCategories = [
    { title: language === 'en' ? 'Flips' : '空翻', color: 'bg-muted/80' },
    { title: language === 'en' ? 'Kicks' : '踢技', color: 'bg-muted/80' },
    { title: language === 'en' ? 'Twists' : '轉體', color: 'bg-muted/80' },
    { title: language === 'en' ? 'Ground Moves' : '地板技', color: 'bg-muted/80' }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {language === 'en' ? 'What is Tricking?' : '什麼是Tricking?'}
          </h2>
          <p className="text-foreground/80 mb-6">
            {language === 'en' 
              ? 'Tricking is an extreme sport that combines flips, kicks, twists, and ground movements. Think of it as gymnastics + taekwondo.'
              : 'Tricking 是一個結合了空翻、踢技、轉體、地板技的極限運動，如果你聽不懂，可以把它想像成是體操+跆拳道。'}
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: "trimSnaps",
            }}
            className="w-full touch-pan-y"
          >
            <CarouselContent>
              {trickCategories.map((category, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card className="h-full shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-all duration-300 overflow-hidden border-0 bg-card/30 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className={`aspect-square ${category.color} flex items-center justify-center`}>
                        <div className="bg-white/5 backdrop-blur w-3/4 h-3/4 flex items-center justify-center font-semibold text-foreground/80 text-xl">
                          GIF
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/tricktionary">
              {language === 'en' ? 'Explore All Tricks' : '探索所有招式'}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTricking;
