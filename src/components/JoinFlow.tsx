
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

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
        
        <div className="relative max-w-4xl mx-auto">
          {/* Flow line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border/50 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold md:left-1/2 md:-translate-x-1/2">
                1
              </div>
              <Badge variant="outline" className="absolute right-4 top-4 bg-background">入門階段</Badge>
              <div className="h-40 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">初學者訓練</h3>
              <p className="text-muted-foreground">
                學習基礎技巧、安全防護和身體控制，為更高級的技巧打下基礎。
              </p>
              <div className="mt-4 flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
              </div>
            </div>
            
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold md:left-1/2 md:-translate-x-1/2">
                2
              </div>
              <Badge variant="outline" className="absolute right-4 top-4 bg-background">進階評估</Badge>
              <div className="h-40 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-check text-muted-foreground"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="m16 20 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">技巧評估</h3>
              <p className="text-muted-foreground">
                通過教練評估，展示掌握基本技巧的能力，獲得進入高級課程的資格。
              </p>
              <div className="mt-4 flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
              </div>
            </div>
            
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold md:left-1/2 md:-translate-x-1/2">
                3
              </div>
              <Badge variant="outline" className="absolute right-4 top-4 bg-background">精通階段</Badge>
              <div className="h-40 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-muted-foreground"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">高級訓練</h3>
              <p className="text-muted-foreground">
                學習更具挑戰性的技巧組合和進階動作，成為完整的Tricking表演者。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinFlow;
