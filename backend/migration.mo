import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Timer "mo:core/Timer";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Time "mo:core/Time";

module {
  type TradeAction = {
    #Buy;
    #Sell;
    #Hodl;
  };

  type ChainType = {
    #Ethereum;
    #Bitcoin;
    #ICP;
    #Solana;
  };

  type TransactionStatus = {
    #Pending;
    #Completed;
    #Failed;
  };

  type UserPreferences = {
    riskTolerance : Nat;
    tradeFrequency : Nat;
    autoTrading : Bool;
    preferredChain : ChainType;
  };

  type DecisionStatus = {
    #Pending;
    #Executed;
    #Failed;
  };

  type ActivityType = {
    #Monitoring;
    #Trading;
    #Waiting;
  };

  type ConfiguredTimer = {
    timerId : Nat;
    sourcePrincipal : Principal.Principal;
    createdAt : Time.Time;
  };

  type TradeDecision = {
    id : Nat;
    action : TradeAction;
    chain : ChainType;
    reason : Text;
    timestamp : Time.Time;
    status : DecisionStatus;
  };

  module ConfiguredTimer {
    public func compare(a : ConfiguredTimer, b : ConfiguredTimer) : Order.Order {
      Nat.compare(a.timerId, b.timerId);
    };
  };

  type OldActor = {
    nextTradeId : Nat;
    nextTimerId : Nat;
    globalPreferences : UserPreferences;
    currentChain : ChainType;
    currentActivity : ActivityType;
    notificationsEnabled : Bool;
    tradeDecisions : Map.Map<Nat, TradeDecision>;
    transactions : Map.Map<Nat, (TradeAction, TransactionStatus, ChainType)>;
    configuredTimers : Set.Set<ConfiguredTimer>;
  };

  type NewActor = {
    nextTradeId : Nat;
    nextTimerId : Nat;
    globalPreferences : UserPreferences;
    currentChain : ChainType;
    currentActivity : ActivityType;
    notificationsEnabled : Bool;
    tradeDecisions : Map.Map<Nat, TradeDecision>;
    transactions : Map.Map<Nat, (TradeAction, TransactionStatus, ChainType)>;
    configuredTimers : Set.Set<ConfiguredTimer>;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
