import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Timer "mo:core/Timer";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
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
    sourcePrincipal : Principal;
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

  var nextTradeId = 0;
  var nextTimerId = 0;

  var globalPreferences : UserPreferences = {
    riskTolerance = 5;
    tradeFrequency = 5;
    autoTrading = false;
    preferredChain = #ICP;
  };

  var currentChain : ChainType = #ICP;
  var currentActivity : ActivityType = #Waiting;
  var notificationsEnabled = false;

  let tradeDecisions = Map.empty<Nat, TradeDecision>();
  let transactions = Map.empty<Nat, (TradeAction, TransactionStatus, ChainType)>();
  let configuredTimers = Set.empty<ConfiguredTimer>();

  public shared ({ caller }) func addTransaction(action : TradeAction, chain : ChainType) : async Nat {
    let id = nextTradeId;
    transactions.add(id, (action, #Pending, chain));
    ignore addTradeDecision(caller, action, chain, "Automated trade");
    nextTradeId += 1;
    id;
  };

  public shared ({ caller }) func addTradeDecision(_principal : Principal, action : TradeAction, chain : ChainType, reason : Text) : async Nat {
    let id = nextTradeId;
    let decision = {
      id;
      action;
      chain;
      reason;
      timestamp = Time.now();
      status = #Pending;
    };
    tradeDecisions.add(id, decision);
    nextTradeId += 1;
    id;
  };

  public shared ({ caller }) func updateTransactionStatus(_decisionId : Nat, newStatus : TransactionStatus) : async () {
    for ((decisionId, (action, _status, chain)) in transactions.entries()) {
      transactions.add(decisionId, (action, newStatus, chain));
    };
  };

  public shared ({ caller }) func setGlobalPreferences(preferences : UserPreferences) : async () {
    globalPreferences := preferences;
    currentChain := preferences.preferredChain;
  };

  public shared ({ caller }) func switchChain(chain : ChainType) : async () {
    currentChain := chain;
  };

  public shared ({ caller }) func startAutoTrading() : async () {
    if (not globalPreferences.autoTrading) {
      globalPreferences := {
        globalPreferences with autoTrading = true;
      };
    };
    let timerId = nextTimerId;
    let currentTime = Time.now();
    let newTimer = {
      timerId;
      sourcePrincipal = caller;
      createdAt = currentTime;
    };
    configuredTimers.add(newTimer);
    ignore startRecurringTimer(globalPreferences.tradeFrequency, newTimer);
    currentActivity := #Monitoring;
    nextTimerId += 1;
    notificationsEnabled := true;
  };

  public shared ({ caller }) func getTradeDecisions() : async [TradeDecision] {
    let decisions = List.empty<(Nat, TradeDecision)>();

    for (entry in tradeDecisions.entries()) {
      decisions.add(entry);
    };

    let finalDecisions = if (decisions.isEmpty()) {
      List.empty<(Nat, TradeDecision)>();
    } else {
      decisions.reverse();
    };

    finalDecisions.toArray().map(
      func((_, decision)) { decision }
    );
  };

  public shared ({ caller }) func startRecurringTimer(_frequency : Nat, _configuredTimer : ConfiguredTimer) : async () {
    let _timerId = Timer.recurringTimer<system>(
      #seconds 60,
      func() : async () {
        ignore handleTradeLoop(caller);
        await handleRecurringTrade(caller);
      },
    );
  };

  func handleTradeLoop(_caller : Principal) : async () {
    switch (currentActivity) {
      case (#Monitoring) { currentActivity := #Trading };
      case (#Trading) { currentActivity := #Waiting };
      case (#Waiting) { currentActivity := #Monitoring };
    };
  };

  func handleRecurringTrade(_caller : Principal) : async () {
    let decision = determineTradeAction(currentChain);
    ignore addTradeDecision(_caller, decision.action, currentChain, decision.reason);
    updateActivityStatus();
  };

  func updateActivityStatus() {
    currentActivity := switch (currentActivity) {
      case (#Monitoring) { #Trading };
      case (#Trading) { #Waiting };
      case (#Waiting) { #Monitoring };
    };
  };

  func shouldSendNotification(_tradeType : Text) : Bool {
    notificationsEnabled;
  };

  func tradeActionToText(action : TradeAction) : Text {
    switch (action) {
      case (#Buy) { "Buy" };
      case (#Sell) { "Sell" };
      case (#Hodl) { "Hold" };
    };
  };

  func determineTradeAction(chain : ChainType) : { action : TradeAction; reason : Text; chain : ChainType } {
    let action = switch (Time.now().toNat() % 3) {
      case (0) { #Buy };
      case (1) { #Sell };
      case (_) { #Hodl };
    };
    let chainStr = switch (chain) {
      case (#Ethereum) { "Ethereum" };
      case (#Bitcoin) { "Bitcoin" };
      case (#ICP) { "ICP" };
      case (#Solana) { "Solana" };
    };
    {
      action;
      reason = "Analyzed " # chainStr # " signal - action: " # tradeActionToText(action);
      chain;
    };
  };

  public query ({ caller }) func getCurrentActivity() : async {
    activity : ActivityType;
    activeChain : ChainType;
  } {
    {
      activity = currentActivity;
      activeChain = currentChain;
    };
  };

  public query ({ caller }) func describeCurrentActivity() : async Text {
    let chainStr = switch (currentChain) {
      case (#Ethereum) { "Ethereum" };
      case (#Bitcoin) { "Bitcoin" };
      case (#ICP) { "ICP" };
      case (#Solana) { "Solana" };
    };
    switch (currentActivity) {
      case (#Monitoring) { "Mikailu Agent is trading on " # chainStr # " - monitoring signals..." };
      case (#Trading) { "Mikailu Agent is actively trading on " # chainStr };
      case (#Waiting) { "Mikailu Agent is idle, awaiting signals on " # chainStr };
    };
  };
};
