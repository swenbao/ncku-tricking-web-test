
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Trophy, Dumbbell, Sparkles } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';

const WhatIsTricking = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">What is Tricking?</h2>
            <div className="prose prose-lg text-foreground/80 max-w-none">
              <p>
                Tricking是一種結合了武術、體操和街舞元素的運動藝術形式。
              </p>
              <p>
                它包含優美的踢腿、翻轉和旋轉動作，讓參與者可以自由表達自我，並挑戰身體的極限。
              </p>
              <p>
                在NCKU Tricking，我們致力於提供一個安全、支持性的環境，讓所有技能水平的人都能學習和成長。
              </p>
            </div>
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
                containScroll: "trimSnaps",
              }}
              className="w-full touch-pan-y"
            >
              <CarouselContent>
                <CarouselItem>
                  <Card className="overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center text-muted-foreground">
                        <Flame className="h-12 w-12 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">武術技巧</h3>
                      <p className="text-muted-foreground">結合武術中的踢腿技巧和身體控制，創造出流暢而動態的動作。</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center text-muted-foreground">
                        <Trophy className="h-12 w-12 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">翻滾與空翻</h3>
                      <p className="text-muted-foreground">融合體操和特技元素，實現令人驚嘆的翻滾和空中動作。</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center text-muted-foreground">
                        <Dumbbell className="h-12 w-12 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">翻演與空翻</h3>
                      <p className="text-muted-foreground">融合體操和特技元素，實現令人驚嘆的翻滾和空中動作。</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center text-muted-foreground">
                        <Sparkles className="h-12 w-12 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">身體控制</h3>
                      <p className="text-muted-foreground">學習掌握精確的身體控制技巧，為高級動作打下堅實基礎。</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTricking;
