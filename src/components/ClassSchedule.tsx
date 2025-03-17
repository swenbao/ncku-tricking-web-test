
import React from 'react';
import { classSchedule } from '@/lib/data';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ClassSchedule = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Class Schedule</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All classes require advance booking and are subject to availability.
            Everyone must start with beginner classes before advancing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {classSchedule.map((day, index) => (
            <Card key={index} className="overflow-hidden animate-fade-in">
              <CardHeader className="bg-accent text-accent-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <CardTitle>{day.day}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {day.sessions.map((session, sessionIndex) => (
                    <div 
                      key={sessionIndex} 
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">{session.name}</h3>
                        <Badge 
                          variant={session.level === 'Beginner' ? 'default' : 'secondary'}
                        >
                          {session.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{session.time}</span>
                        <span className="mx-2">•</span>
                        <Users className="h-4 w-4 mr-1" />
                        <span>{session.pointsCost} points</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{session.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
