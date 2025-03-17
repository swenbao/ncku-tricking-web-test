
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
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WhatIsTricking = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">What is Tricking?</h2>
          <Button variant="outline" size="sm" asChild className="rounded-full px-4">
            <Link to="/tricktionary">
              查看全部 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full touch-pan-y"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-black">武術技巧</h3>
                    <p className="text-black/70 mb-6">能量飲料</p>
                    <div className="w-40 h-48 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Flame className="h-16 w-16 text-white/80" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-black">翻滾技巧</h3>
                    <p className="text-black/70 mb-6">無糖能量飲料</p>
                    <div className="w-40 h-48 bg-sky-500 rounded-lg flex items-center justify-center mb-4">
                      <Trophy className="h-16 w-16 text-white/80" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-black">空翻技巧</h3>
                    <p className="text-black/70 mb-6 flex flex-col">
                      <span>Summer Edition</span>
                    </p>
                    <div className="w-40 h-48 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Dumbbell className="h-16 w-16 text-white/80" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-black">身體控制</h3>
                    <p className="text-black/70 mb-6 flex flex-col">
                      <span>Green Edition</span>
                    </p>
                    <div className="w-40 h-48 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Sparkles className="h-16 w-16 text-white/80" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-black">流暢連接</h3>
                    <p className="text-black/70 mb-6 flex flex-col">
                      <span>Purple Edition</span>
                    </p>
                    <div className="w-40 h-48 bg-purple-700 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default WhatIsTricking;
