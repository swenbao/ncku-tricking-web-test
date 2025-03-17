
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Taiwan's First <span className="text-accent">Tricking</span> Club
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Master the art of movement through kicks, flips, and twists.
              </p>
            </div>
            
            <p className="text-foreground/80 max-w-md">
              Join our dynamic community where martial arts meets gymnastics. Learn spectacular aerial maneuvers, spins, and flips in a safe, supportive environment.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group"
                onClick={() => navigate('/booking')}
              >
                Book a Class
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/tricktionary')}
              >
                Explore Tricks
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[500px] bg-gradient-to-br from-accent/30 to-secondary/30 rounded-2xl overflow-hidden shadow-lg animate-fade-in">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/90 backdrop-blur-sm rounded-xl p-8 w-[80%] shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-4">Why Join Us?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-secondary/20 p-1 mr-3">
                      <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    </span>
                    Expert instructors
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-secondary/20 p-1 mr-3">
                      <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    </span>
                    Progressive learning path
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-secondary/20 p-1 mr-3">
                      <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    </span>
                    Safe training environment
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-secondary/20 p-1 mr-3">
                      <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    </span>
                    Supportive community
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
