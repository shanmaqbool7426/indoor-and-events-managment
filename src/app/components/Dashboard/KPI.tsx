import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../ui/utils";
import { motion } from "motion/react";

interface KPIProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  index?: number;
}

export default function KPI({ title, value, change, trend, icon: Icon, index = 0 }: KPIProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400';
      case 'down':
        return 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400';
      default:
        return 'text-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{title}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{value}</p>
              <div className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", getTrendColor())}>
                {getTrendIcon()}
                <span>{Math.abs(change)}% vs last period</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
