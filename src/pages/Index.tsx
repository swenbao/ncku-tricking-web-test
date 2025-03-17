
import React from 'react';
import Hero from '@/components/Hero';
import ClassSchedule from '@/components/ClassSchedule';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Hero />
      
      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome to Tricktopia
            </h2>
            <p className="text-xl text-muted-foreground">
              The first dedicated Tricking Club in Taiwan.
            </p>
            <p className="text-foreground/80">
              Tricking is a spectacular movement discipline that combines martial arts kicks, flips, and twists with elements of gymnastics, breakdancing, and other movement arts. Our club provides a structured approach to learning these dynamic movements in a safe, supportive environment.
            </p>
            <p className="text-foreground/80">
              Whether you're a complete beginner or an experienced athlete, our progressive curriculum will help you build the skills, strength, and confidence to perform amazing tricks.
            </p>
          </div>
        </div>
      </section>
      
      <ClassSchedule />
      
      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our simple process gets you from sign-up to mastering tricks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                1
              </div>
              <h3 className="text-xl font-medium mb-3">Purchase Points</h3>
              <p className="text-muted-foreground">
                Buy points from our website that you'll use to book classes. Choose from different packages based on your training frequency.
              </p>
            </div>
            
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                2
              </div>
              <h3 className="text-xl font-medium mb-3">Book Classes</h3>
              <p className="text-muted-foreground">
                Use your points to reserve spots in our classes. New members start with beginner classes to build fundamentals.
              </p>
            </div>
            
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-border/50 text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                3
              </div>
              <h3 className="text-xl font-medium mb-3">Train & Progress</h3>
              <p className="text-muted-foreground">
                Attend classes, learn tricks, and pass assessments to access more advanced training sessions as you improve.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="group">
              <Link to="/points">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
