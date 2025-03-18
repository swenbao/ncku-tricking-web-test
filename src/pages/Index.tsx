
import React from 'react';
import Hero from '@/components/Hero';
import ClassSchedule from '@/components/ClassSchedule';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import WhatIsTricking from '@/components/WhatIsTricking';
import JoinFlow from '@/components/JoinFlow';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* What is Tricking Section */}
      <WhatIsTricking />
      
      {/* Class Schedule */}
      <ClassSchedule />
      
      {/* Progress Flow */}
      <JoinFlow />
      
      {/* How to Join Us Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {language === 'en' ? 'How to Join Us?' : '如何加入我們?'}
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
              {language === 'en' 
                ? 'Join Taiwan\'s first Tricking club and start your journey in movement arts, learning tricks, flips, and kicks.'
                : '加入台灣第一個Tricking社團，開始你的動作藝術之旅，學習特技、翻轉和踢腿技巧。'}
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/signup">
                  {language === 'en' ? 'Sign Up Now' : '立即註冊'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
