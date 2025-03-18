
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 -z-10" />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-white block">
              {language === 'en' ? 'NCKU' : '成功大學'}
            </span>
            <span className="text-secondary block">TRICKING</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'en' ? 'Taiwan\'s first Tricking club' : '台灣第一個tricking社'}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="group"
              onClick={() => navigate('/booking')}
            >
              {language === 'en' ? 'Book Classes' : '預約課程'}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/tricktionary')}
            >
              {language === 'en' ? 'Explore Tricks' : '探索招式'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
