
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame text-secondary"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">武術技巧</h3>
                <p className="text-muted-foreground">結合武術中的踢腿技巧和身體控制，創造出流暢而動態的動作。</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="aspect-square rounded-md bg-muted mb-4 flex items-center justify-center text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-secondary"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">翻滾與空翻</h3>
                <p className="text-muted-foreground">融合體操和特技元素，實現令人驚嘆的翻滾和空中動作。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTricking;
