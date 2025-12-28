import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ChainType } from '../backend';
import { useSetGlobalPreferences } from '../hooks/useQueries';

interface ControlPanelProps {
  isAutoTrading: boolean;
  onToggleAutoTrading: () => void;
  currentChain?: ChainType;
}

export default function ControlPanel({ isAutoTrading, onToggleAutoTrading, currentChain }: ControlPanelProps) {
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [tradeFrequency, setTradeFrequency] = useState([5]);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableStopLoss, setEnableStopLoss] = useState(true);
  const [preferredChain, setPreferredChain] = useState<ChainType>(currentChain || ChainType.ICP);
  
  const setGlobalPreferences = useSetGlobalPreferences();

  useEffect(() => {
    if (currentChain) {
      setPreferredChain(currentChain);
    }
  }, [currentChain]);

  const handleChainChange = async (value: string) => {
    const newChain = value as ChainType;
    setPreferredChain(newChain);
    
    // Update backend preferences
    await setGlobalPreferences.mutateAsync({
      riskTolerance: BigInt(riskTolerance[0]),
      tradeFrequency: BigInt(tradeFrequency[0]),
      autoTrading: isAutoTrading,
      preferredChain: newChain,
    });
  };

  const handleResetDefaults = () => {
    setRiskTolerance([5]);
    setTradeFrequency([5]);
    setEnableNotifications(true);
    setEnableStopLoss(true);
    setPreferredChain(ChainType.ICP);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Control Panel
        </CardTitle>
        <CardDescription>Configure AI trading parameters and automation settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Auto Trading Control */}
        <div className="p-6 rounded-lg border-2 border-dashed border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Autonomous Trading</h3>
              <p className="text-sm text-muted-foreground">
                {isAutoTrading ? 'AI is actively making decisions' : 'AI is currently paused'}
              </p>
            </div>
            <Button
              onClick={onToggleAutoTrading}
              size="lg"
              variant={isAutoTrading ? 'destructive' : 'default'}
            >
              {isAutoTrading ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Preferred Chain Selection */}
        <div className="space-y-3">
          <Label htmlFor="preferred-chain">Preferred Trading Chain</Label>
          <Select value={preferredChain} onValueChange={handleChainChange}>
            <SelectTrigger id="preferred-chain">
              <SelectValue placeholder="Select a blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ChainType.ICP}>Internet Computer (ICP)</SelectItem>
              <SelectItem value={ChainType.Ethereum}>Ethereum</SelectItem>
              <SelectItem value={ChainType.Bitcoin}>Bitcoin</SelectItem>
              <SelectItem value={ChainType.Solana}>Solana</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Select which blockchain the AI agent should focus on for trading decisions
          </p>
        </div>

        {/* Risk Tolerance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
            <span className="text-sm font-medium">{riskTolerance[0]}/10</span>
          </div>
          <Slider
            id="risk-tolerance"
            min={1}
            max={10}
            step={1}
            value={riskTolerance}
            onValueChange={setRiskTolerance}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Higher values allow more aggressive trading strategies
          </p>
        </div>

        {/* Trade Frequency */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="trade-frequency">Trade Frequency</Label>
            <span className="text-sm font-medium">{tradeFrequency[0]} min</span>
          </div>
          <Slider
            id="trade-frequency"
            min={1}
            max={60}
            step={1}
            value={tradeFrequency}
            onValueChange={setTradeFrequency}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Minimum time between automated trade decisions
          </p>
        </div>

        {/* Additional Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Get alerts for important trade decisions
              </p>
            </div>
            <Switch
              id="notifications"
              checked={enableNotifications}
              onCheckedChange={setEnableNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="stop-loss">Automatic Stop Loss</Label>
              <p className="text-xs text-muted-foreground">
                Protect against significant losses
              </p>
            </div>
            <Switch
              id="stop-loss"
              checked={enableStopLoss}
              onCheckedChange={setEnableStopLoss}
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleResetDefaults}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>

        {/* Educational Note */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Educational Demo:</strong> These controls simulate
            AI trading parameters. In a production environment, these would directly influence
            the autonomous agent's decision-making algorithms and risk management strategies.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
