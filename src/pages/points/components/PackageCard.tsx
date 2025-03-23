
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PointPackage } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

interface PackageCardProps {
  packageData: PointPackage;
  onPurchase: (pkg: PointPackage) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData, onPurchase }) => {
  const { language } = useLanguage();
  
  return (
    <Card 
      className={`relative overflow-hidden ${packageData.popular ? 'border-2 border-accent' : ''}`}
    >
      {packageData.popular && (
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
          <Badge className="bg-accent text-accent-foreground">
            {language === 'en' ? 'Popular' : '熱門'}
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle>{packageData.name}</CardTitle>
        <CardDescription>{packageData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <span className="text-4xl font-bold">${packageData.price}</span>
          <span className="text-muted-foreground ml-1">NTD</span>
        </div>
        
        <ul className="space-y-2">
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <span>
              {language === 'en' 
                ? `${packageData.points} points` 
                : `${packageData.points} 點數`}
            </span>
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <span>
              {language === 'en' 
                ? 'Valid for 6 months' 
                : '有效期限：6個月'}
            </span>
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <span>
              {language === 'en' 
                ? `Access to ${packageData.id > 1 ? 'all class types' : 'beginner classes'}` 
                : `可參加${packageData.id > 1 ? '所有類型課程' : '初學者課程'}`}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onPurchase(packageData)}
        >
          {language === 'en' ? 'Purchase' : '購買'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
