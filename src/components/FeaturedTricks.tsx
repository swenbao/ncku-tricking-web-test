
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const FeaturedTricks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">精選招式</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            探索令人驚嘆的Tricking招式
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-card/50 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-secondary/10 flex items-center justify-center">
                    <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                      GIF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Hook Kick</h3>
                    <p className="text-sm text-muted-foreground">基礎踢腿技巧</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-card/50 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-secondary/10 flex items-center justify-center">
                    <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                      GIF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Round Kick</h3>
                    <p className="text-sm text-muted-foreground">基礎踢腿技巧</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-card/50 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-secondary/10 flex items-center justify-center">
                    <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                      GIF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Tornado Kick</h3>
                    <p className="text-sm text-muted-foreground">進階踢腿技巧</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-card/50 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-secondary/10 flex items-center justify-center">
                    <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                      GIF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">540 Kick</h3>
                    <p className="text-sm text-muted-foreground">進階踢腿技巧</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-card/50 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-secondary/10 flex items-center justify-center">
                    <div className="bg-yellow-300 w-3/4 h-3/4 flex items-center justify-center font-bold text-lg">
                      GIF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">Butterfly Kick</h3>
                    <p className="text-sm text-muted-foreground">中級踢腿技巧</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            
            <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden bg-card/50 border border-border/50 shadow-md hover:shadow-lg flex flex-col justify-center items-center">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="mb-4">
                    <PlusCircle className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">探索更多招式</h3>
                  <Button asChild variant="outline">
                    <Link to="/tricktionary">
                      查看招式庫
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
    </section>
  );
};

export default FeaturedTricks;
