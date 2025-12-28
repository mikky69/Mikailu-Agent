import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  color?: 'primary' | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4';
}

export default function StatsCard({ title, value, icon, trend, color = 'primary' }: StatsCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    'chart-1': 'bg-chart-1/10 text-chart-1',
    'chart-2': 'bg-chart-2/10 text-chart-2',
    'chart-3': 'bg-chart-3/10 text-chart-3',
    'chart-4': 'bg-chart-4/10 text-chart-4',
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 text-sm text-chart-1">
                <TrendingUp className="w-4 h-4" />
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
