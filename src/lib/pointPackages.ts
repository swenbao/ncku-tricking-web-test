
export interface PointPackage {
  id: string;
  name: string;
  points: number;
  price: number;
  description: string;
  popular?: boolean;
}

// Point packages data
export const pointPackages: PointPackage[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    points: 10,
    price: 1000,
    description: 'Good for beginners or occasional participants',
  },
  {
    id: 'standard',
    name: 'Standard Package',
    points: 20,
    price: 1800,
    description: 'Our most popular option for regular participants',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Package',
    points: 40,
    price: 3200,
    description: 'Best value for dedicated trickers',
  },
];
