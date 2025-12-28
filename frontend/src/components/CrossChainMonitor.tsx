import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SiBitcoin, SiEthereum, SiSolana } from 'react-icons/si';
import { Activity, TrendingUp } from 'lucide-react';
import { ChainType } from '../backend';

interface CrossChainMonitorProps {
  compact?: boolean;
  currentChain?: ChainType;
}

export default function CrossChainMonitor({ compact, currentChain }: CrossChainMonitorProps) {
  const chains = [
    {
      name: 'Internet Computer',
      symbol: 'ICP',
      type: ChainType.ICP,
      balance: '1,234.56',
      usdValue: '$12,345.67',
      change: '+5.2%',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      type: ChainType.Ethereum,
      balance: '2.45',
      usdValue: '$8,234.50',
      change: '+2.1%',
      icon: <SiEthereum className="w-6 h-6" />,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      type: ChainType.Bitcoin,
      balance: '0.125',
      usdValue: '$5,432.10',
      change: '+1.8%',
      icon: <SiBitcoin className="w-6 h-6" />,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      type: ChainType.Solana,
      balance: '45.78',
      usdValue: '$3,210.45',
      change: '+3.5%',
      icon: <SiSolana className="w-6 h-6" />,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Chain Monitor</CardTitle>
        <CardDescription>
          {compact 
            ? 'Multi-chain wallet balances'
            : 'Simulated cross-chain wallet balances via ICP Chain Fusion'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chains.map((chain) => (
            <div
              key={chain.symbol}
              className={`
                flex items-center justify-between p-4 rounded-lg border transition-all
                ${currentChain === chain.type 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-border/50 hover:border-border hover:shadow-md'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${chain.bgColor} ${chain.color}`}>
                  {chain.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{chain.name}</h4>
                    {currentChain === chain.type && (
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {chain.balance} {chain.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{chain.usdValue}</p>
                <div className="flex items-center gap-1 text-sm text-chart-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{chain.change}</span>
                </div>
              </div>
            </div>
          ))}
          
          {!compact && (
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">Demo</Badge>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Chain Fusion Integration</p>
                  <p>
                    This demonstrates how Mikailu Agent could interact with multiple blockchains
                    using ICP's Chain Fusion technology. In production, this would enable real
                    cross-chain transactions and balance tracking. The active chain shows where
                    the AI is currently focusing its trading decisions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
