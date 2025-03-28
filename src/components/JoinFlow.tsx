
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
import { useTricktionaryData } from '@/hooks/tricktionary/useTricktionaryData';

const JoinFlow = () => {
  const { language } = useLanguage();
  const { tricks, isLoading } = useTricktionaryData();

  // Filter tricks that are explicitly marked as prerequisites
  const prerequisites = tricks.filter(trick => trick.isPrerequisite === true);

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
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-pulse text-muted-foreground">
                {language === 'en' ? 'Loading prerequisites...' : '加載先決條件中...'}
              </div>
            </div>
          ) : prerequisites.length > 0 ? (
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
                  <CarouselItem key={trick.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <Card className="h-full overflow-hidden border-0 shadow-[0_0_15px_5px_rgba(255,255,255,0.07)] hover:shadow-[0_0_20px_8px_rgba(255,255,255,0.1)] transition-all duration-300 transform hover:-translate-y-1 bg-card/30 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="relative aspect-square bg-secondary/10 flex items-center justify-center">
                          <Badge variant="secondary" className="absolute top-2 right-2">#{index + 1}</Badge>
                          {trick.videoUrl ? (
                            <div className="w-full h-full bg-black/20 flex items-center justify-center">
                              <p className="text-xs text-muted-foreground">
                                {language === 'en' ? 'Video available' : '有視頻'}
                              </p>
                            </div>
                          ) : (
                            <div className="bg-red-900/30 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                              GIF
                            </div>
                          )}
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-semibold">{trick.name}</h3>
                          {trick.categories && trick.categories.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {trick.categories.join(', ')}
                            </p>
                          )}
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
          ) : (
            <div className="text-center text-muted-foreground">
              {language === 'en' 
                ? 'No prerequisites found. Please check back later.' 
                : '未找到先決條件。請稍後再查看。'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinFlow;
