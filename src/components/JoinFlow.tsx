
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const JoinFlow = () => {
  const { language } = useLanguage();

  const prerequisites = [
    'Forward Roll',
    'Backward Roll',
    'Wall Handstand',
    'Cartwheel',
    'Scoot',
    'Blaster Scoot',
    'Kaydem',
    'Butterfly Kick',
    'Round Kick',
    'Hook Kick',
    'Tornado Kick',
    'Skip Hook Kick',
    'TD Hook Kick',
    'Pop 180 (Hook Kick)',
    'Pop 360 outside crescent'
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {language === 'en' ? 'Advanced Class Prerequisites' : '進階班先決條件'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? 'You must master these tricks before joining advanced classes'
              : '在加入進階班之前，你必須掌握這些技巧'}
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
            className="w-full touch-pan-y scrollbar-hide"
          >
            <CarouselContent>
              {prerequisites.map((trick, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Card className="h-full overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-secondary/10 flex items-center justify-center">
                        <Badge variant="secondary" className="absolute top-2 right-2">#{index + 1}</Badge>
                        <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                          GIF
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold">{trick}</h3>
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
      </div>
    </section>
  );
};

export default JoinFlow;
