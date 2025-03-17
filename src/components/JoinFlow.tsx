
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, ClipboardCheck, Star, CircleChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const JoinFlow = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">進階之路</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            從初學者到高級技巧的進階路徑
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                    1
                  </div>
                  <Badge variant="outline" className="absolute right-4 top-4 bg-background">入門階段</Badge>
                  <div className="h-40 flex items-center justify-center">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">初學者訓練</h3>
                  <p className="text-muted-foreground">
                    學習基礎技巧、安全防護和身體控制，為更高級的技巧打下基礎。
                  </p>
                  <div className="mt-6 flex justify-center">
                    <CircleChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                    2
                  </div>
                  <Badge variant="outline" className="absolute right-4 top-4 bg-background">進階評估</Badge>
                  <div className="h-40 flex items-center justify-center">
                    <ClipboardCheck className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">技巧評估</h3>
                  <p className="text-muted-foreground">
                    通過教練評估，展示掌握基本技巧的能力，獲得進入高級課程的資格。
                  </p>
                  <div className="mt-6 flex justify-center">
                    <CircleChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                    3
                  </div>
                  <Badge variant="outline" className="absolute right-4 top-4 bg-background">精通階段</Badge>
                  <div className="h-40 flex items-center justify-center">
                    <Star className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">高級訓練</h3>
                  <p className="text-muted-foreground">
                    學習更具挑戰性的技巧組合和進階動作，成為完整的Tricking表演者。
                  </p>
                </div>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                    4
                  </div>
                  <Badge variant="outline" className="absolute right-4 top-4 bg-background">表演階段</Badge>
                  <div className="h-40 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-muted-foreground"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                  </div>
                  <h3 className="text-xl font-medium mb-3">競技與表演</h3>
                  <p className="text-muted-foreground">
                    參與各種表演和比賽，成為專業的Tricking藝術家。
                  </p>
                </div>
              </CarouselItem>
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
