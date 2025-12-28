import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { TradeDecision, TradeAction, ChainType, UserPreferences, ActivityType } from '../backend';
import { toast } from 'sonner';

export function useGetTradeDecisions() {
  const { actor, isFetching } = useActor();

  return useQuery<TradeDecision[]>({
    queryKey: ['tradeDecisions'],
    queryFn: async () => {
      if (!actor) return [];
      const decisions = await actor.getTradeDecisions();
      return decisions.sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });
}

export function useGetCurrentActivity() {
  const { actor, isFetching } = useActor();

  return useQuery<{ activity: ActivityType; activeChain: ChainType }>({
    queryKey: ['currentActivity'],
    queryFn: async () => {
      if (!actor) return { activity: ActivityType.Waiting, activeChain: ChainType.ICP };
      return await actor.getCurrentActivity();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000, // Refetch every 3 seconds for real-time status
  });
}

export function useDescribeCurrentActivity() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['activityDescription'],
    queryFn: async () => {
      if (!actor) return 'Mikailu Agent is idle';
      return await actor.describeCurrentActivity();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000, // Refetch every 3 seconds for real-time description
  });
}

export function useStartAutoTrading() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.startAutoTrading();
    },
    onSuccess: () => {
      toast.success('Auto-trading started successfully');
      queryClient.invalidateQueries({ queryKey: ['tradeDecisions'] });
      queryClient.invalidateQueries({ queryKey: ['currentActivity'] });
      queryClient.invalidateQueries({ queryKey: ['activityDescription'] });
    },
    onError: (error) => {
      toast.error(`Failed to start auto-trading: ${error}`);
    },
  });
}

export function useSetGlobalPreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: UserPreferences) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setGlobalPreferences(preferences);
    },
    onSuccess: () => {
      toast.success('Preferences updated successfully');
      queryClient.invalidateQueries({ queryKey: ['currentActivity'] });
      queryClient.invalidateQueries({ queryKey: ['activityDescription'] });
    },
    onError: (error) => {
      toast.error(`Failed to update preferences: ${error}`);
    },
  });
}

export function useSwitchChain() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chain: ChainType) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.switchChain(chain);
    },
    onSuccess: () => {
      toast.success('Chain switched successfully');
      queryClient.invalidateQueries({ queryKey: ['currentActivity'] });
      queryClient.invalidateQueries({ queryKey: ['activityDescription'] });
    },
    onError: (error) => {
      toast.error(`Failed to switch chain: ${error}`);
    },
  });
}

export function useAddTradeDecision() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      action,
      chain,
      reason,
    }: {
      action: TradeAction;
      chain: ChainType;
      reason: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      // Use anonymous principal for manual trades
      const principal = await actor.getTradeDecisions().then(() => 
        actor as any
      );
      await actor.addTradeDecision(
        principal,
        action,
        chain,
        reason
      );
    },
    onSuccess: () => {
      toast.success('Trade decision added');
      queryClient.invalidateQueries({ queryKey: ['tradeDecisions'] });
    },
    onError: (error) => {
      toast.error(`Failed to add decision: ${error}`);
    },
  });
}
