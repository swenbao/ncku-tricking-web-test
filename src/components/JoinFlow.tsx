
import React, { useState, useEffect } from 'react';
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
import { tricks } from '@/lib/data';

const JoinFlow = () => {
  const { language } = useLanguage();
  const [prerequisites, setPrerequisites] = useState<typeof tricks>([]);

  // In a real app, this would fetch from the database
  // For now, we'll use the first 15 tricks from our data
  useEffect(() => {
    // This simulates fetching the configured prerequisites from the database
    // In a real app with Supabase, this would be a database query
    setPrerequisites(tricks.slice(0, 15));
  }, []);

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
                <CarouselItem key={trick.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Card className="h-full overflow-hidden border-0 shadow-[0_0_15px_5px_rgba(255,255,255,0.07)] hover:shadow-[0_0_20px_8px_rgba(255,255,255,0.1)] transition-all duration-300 transform hover:-translate-y-1 bg-card/30 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-secondary/10 flex items-center justify-center">
                        <Badge variant="secondary" className="absolute top-2 right-2">#{index + 1}</Badge>
                        <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                          GIF
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold">{trick.name}</h3>
                        <div className="mt-2 flex flex-wrap justify-center gap-1">
                          {trick.categories.map((category, catIndex) => (
                            <Badge key={catIndex} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
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
