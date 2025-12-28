import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { TradeDecision, TradeAction } from '../backend';
import { Progress } from '@/components/ui/progress';

interface AIInsightsProps {
  decisions: TradeDecision[];
  isAutoTrading: boolean;
}

export default function AIInsights({ decisions, isAutoTrading }: AIInsightsProps) {
  const recentDecisions = decisions.slice(0, 10);
  const buyCount = recentDecisions.filter(d => d.action === TradeAction.Buy).length;
  const sellCount = recentDecisions.filter(d => d.action === TradeAction.Sell).length;
  const hodlCount = recentDecisions.filter(d => d.action === TradeAction.Hodl).length;
  
  const buyPercentage = recentDecisions.length > 0 ? (buyCount / recentDecisions.length) * 100 : 0;
  const sellPercentage = recentDecisions.length > 0 ? (sellCount / recentDecisions.length) * 100 : 0;
  const hodlPercentage = recentDecisions.length > 0 ? (hodlCount / recentDecisions.length) * 100 : 0;

  const insights = [
    {
      title: 'Market Sentiment',
      value: buyCount > sellCount ? 'Bullish' : sellCount > buyCount ? 'Bearish' : 'Neutral',
      icon: <TrendingUp className="w-5 h-5" />,
      color: buyCount > sellCount ? 'text-chart-1' : sellCount > buyCount ? 'text-destructive' : 'text-chart-3',
    },
    {
      title: 'AI Confidence',
      value: '87%',
      icon: <Brain className="w-5 h-5" />,
      color: 'text-primary',
    },
    {
      title: 'Risk Level',
      value: 'Moderate',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-chart-3',
    },
    {
      title: 'Status',
      value: isAutoTrading ? 'Active' : 'Idle',
      icon: <CheckCircle className="w-5 h-5" />,
      color: isAutoTrading ? 'text-chart-1' : 'text-muted-foreground',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img 
            src="/assets/generated/ai-brain-icon-transparent.dim_64x64.png" 
            alt="AI Brain"
            className="w-6 h-6"
          />
          AI Insights
        </CardTitle>
        <CardDescription>Real-time analysis and decision patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="p-3 rounded-lg border border-border/50 hover:border-border transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={insight.color}>{insight.icon}</span>
                <span className="text-xs text-muted-foreground">{insight.title}</span>
              </div>
              <p className={`font-semibold ${insight.color}`}>{insight.value}</p>
            </div>
          ))}
        </div>

        {/* Action Distribution */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Action Distribution</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Buy Signals</span>
              <span className="font-medium">{buyCount} ({Math.round(buyPercentage)}%)</span>
            </div>
            <Progress value={buyPercentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sell Signals</span>
              <span className="font-medium">{sellCount} ({Math.round(sellPercentage)}%)</span>
            </div>
            <Progress value={sellPercentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Hold Signals</span>
              <span className="font-medium">{hodlCount} ({Math.round(hodlPercentage)}%)</span>
            </div>
            <Progress value={hodlPercentage} className="h-2" />
          </div>
        </div>

        {/* AI Reasoning Preview */}
        {recentDecisions.length > 0 && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Latest AI Reasoning</p>
            <p className="text-sm">{recentDecisions[0].reason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
