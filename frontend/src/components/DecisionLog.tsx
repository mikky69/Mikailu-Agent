import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';
import { TradeDecision, TradeAction, DecisionStatus, ChainType } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';

interface DecisionLogProps {
  decisions: TradeDecision[];
  isLoading?: boolean;
  compact?: boolean;
}

export default function DecisionLog({ decisions, isLoading, compact }: DecisionLogProps) {
  const getActionIcon = (action: TradeAction) => {
    switch (action) {
      case TradeAction.Buy:
        return <TrendingUp className="w-4 h-4" />;
      case TradeAction.Sell:
        return <TrendingDown className="w-4 h-4" />;
      case TradeAction.Hodl:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: TradeAction) => {
    switch (action) {
      case TradeAction.Buy:
        return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
      case TradeAction.Sell:
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case TradeAction.Hodl:
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
  };

  const getStatusBadge = (status: DecisionStatus) => {
    switch (status) {
      case DecisionStatus.Pending:
        return <Badge variant="outline">Pending</Badge>;
      case DecisionStatus.Executed:
        return <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20">Executed</Badge>;
      case DecisionStatus.Failed:
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  const getChainBadge = (chain: ChainType) => {
    const colors = {
      [ChainType.ICP]: 'bg-primary/10 text-primary border-primary/20',
      [ChainType.Ethereum]: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
      [ChainType.Bitcoin]: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
      [ChainType.Solana]: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
    };
    return <Badge className={colors[chain]}>{chain}</Badge>;
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Decision Log</CardTitle>
          <CardDescription>Loading AI decisions...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Decision Log</CardTitle>
        <CardDescription>
          {compact 
            ? 'Recent autonomous trading decisions with chain context'
            : 'Complete history of AI trading decisions, reasoning, and blockchain targets'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className={compact ? 'h-[400px]' : 'h-[600px]'}>
          <div className="space-y-4">
            {decisions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No decisions yet. Start auto-trading to see AI in action!</p>
              </div>
            ) : (
              decisions.map((decision) => (
                <div
                  key={decision.id.toString()}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:border-border transition-all hover:shadow-md"
                >
                  <div className={`p-3 rounded-lg ${getActionColor(decision.action)}`}>
                    {getActionIcon(decision.action)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h4 className="font-semibold">
                          {decision.action} Decision #{decision.id.toString()}
                        </h4>
                        <p className="text-sm text-muted-foreground">{decision.reason}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getChainBadge(decision.chain)}
                        {getStatusBadge(decision.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(decision.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
