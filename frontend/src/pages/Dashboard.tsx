import { useState } from 'react';
import { Activity, Brain, TrendingUp, Zap, Play, Pause } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsCard from '../components/StatsCard';
import DecisionLog from '../components/DecisionLog';
import CrossChainMonitor from '../components/CrossChainMonitor';
import ControlPanel from '../components/ControlPanel';
import AIInsights from '../components/AIInsights';
import ProjectExport from '../components/ProjectExport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useGetTradeDecisions, useStartAutoTrading, useDescribeCurrentActivity, useGetCurrentActivity } from '../hooks/useQueries';
import { TradeAction, ChainType } from '../backend';

export default function Dashboard() {
  const [isAutoTrading, setIsAutoTrading] = useState(false);
  const { data: decisions = [], isLoading } = useGetTradeDecisions();
  const { data: activityDescription } = useDescribeCurrentActivity();
  const { data: currentActivity } = useGetCurrentActivity();
  const startAutoTrading = useStartAutoTrading();

  const handleToggleAutoTrading = async () => {
    if (!isAutoTrading) {
      await startAutoTrading.mutateAsync();
      setIsAutoTrading(true);
    } else {
      setIsAutoTrading(false);
    }
  };

  // Calculate stats from decisions
  const totalDecisions = decisions.length;
  const buyDecisions = decisions.filter(d => d.action === TradeAction.Buy).length;
  const sellDecisions = decisions.filter(d => d.action === TradeAction.Sell).length;
  const hodlDecisions = decisions.filter(d => d.action === TradeAction.Hodl).length;
  const successRate = totalDecisions > 0 
    ? Math.round((decisions.filter(d => d.status !== 'Failed').length / totalDecisions) * 100)
    : 0;

  const getChainBadgeColor = (chain: ChainType) => {
    switch (chain) {
      case ChainType.ICP:
        return 'bg-primary/10 text-primary border-primary/20';
      case ChainType.Ethereum:
        return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
      case ChainType.Bitcoin:
        return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
      case ChainType.Solana:
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/generated/mikailu-agent-logo.dim_200x200.png" 
              alt="Mikailu Agent Logo"
              className="w-24 h-24 rounded-2xl shadow-2xl ring-4 ring-primary/20"
            />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
            Mikailu Agent
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Autonomous On-Chain AI Trading Agent with Cross-Chain Intelligence
          </p>

          {/* Current Activity Status */}
          {currentActivity && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <Badge className={getChainBadgeColor(currentActivity.activeChain)}>
                {currentActivity.activeChain}
              </Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">
                {activityDescription || 'Loading...'}
              </p>
            </div>
          )}
          
          {/* Auto Trading Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleToggleAutoTrading}
              disabled={startAutoTrading.isPending}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                transition-all duration-300 shadow-lg hover:shadow-xl
                ${isAutoTrading 
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isAutoTrading ? (
                <>
                  <Pause className="w-5 h-5" />
                  Stop Auto-Trading
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Auto-Trading
                </>
              )}
            </button>
            {isAutoTrading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                <Activity className="w-4 h-4" />
                AI Active
              </div>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Decisions"
            value={totalDecisions.toString()}
            icon={<Brain className="w-6 h-6" />}
            trend={isAutoTrading ? '+12%' : undefined}
            color="primary"
          />
          <StatsCard
            title="Success Rate"
            value={`${successRate}%`}
            icon={<TrendingUp className="w-6 h-6" />}
            trend="+5%"
            color="chart-1"
          />
          <StatsCard
            title="Buy Signals"
            value={buyDecisions.toString()}
            icon={<Zap className="w-6 h-6" />}
            color="chart-2"
          />
          <StatsCard
            title="Active Chains"
            value="4"
            icon={<Activity className="w-6 h-6" />}
            color="chart-3"
          />
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="decisions">Decision Log</TabsTrigger>
            <TabsTrigger value="chains">Cross-Chain</TabsTrigger>
            <TabsTrigger value="control">Control Panel</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIInsights 
                decisions={decisions}
                isAutoTrading={isAutoTrading}
              />
              <CrossChainMonitor compact currentChain={currentActivity?.activeChain} />
            </div>
            <DecisionLog decisions={decisions.slice(0, 5)} isLoading={isLoading} compact />
          </TabsContent>

          <TabsContent value="decisions">
            <DecisionLog decisions={decisions} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="chains">
            <CrossChainMonitor currentChain={currentActivity?.activeChain} />
          </TabsContent>

          <TabsContent value="control">
            <ControlPanel 
              isAutoTrading={isAutoTrading}
              onToggleAutoTrading={handleToggleAutoTrading}
              currentChain={currentActivity?.activeChain}
            />
          </TabsContent>

          <TabsContent value="export">
            <ProjectExport />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
