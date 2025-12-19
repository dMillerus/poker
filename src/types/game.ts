/**
 * Game state types for Texas Hold'em poker
 */

import type { Deck } from './card';
import type { HoleCards, CommunityCardsArray, EvaluatedHand } from './hand';

/**
 * Streets (betting rounds) in Texas Hold'em
 */
export const STREETS = {
  PREFLOP: 'preflop',
  FLOP: 'flop',
  TURN: 'turn',
  RIVER: 'river',
  SHOWDOWN: 'showdown',
} as const;

export type Street = (typeof STREETS)[keyof typeof STREETS];

/** Order of streets for progression */
export const STREET_ORDER: readonly Street[] = [
  'preflop',
  'flop',
  'turn',
  'river',
  'showdown',
] as const;

/**
 * Player positions for 6-max Texas Hold'em
 */
export const POSITIONS = {
  UTG: 'UTG',
  HJ: 'HJ',
  CO: 'CO',
  BTN: 'BTN',
  SB: 'SB',
  BB: 'BB',
} as const;

export type Position = (typeof POSITIONS)[keyof typeof POSITIONS];

/** Position order from earliest to latest (for action order) */
export const POSITION_ORDER: readonly Position[] = [
  'SB',
  'BB',
  'UTG',
  'HJ',
  'CO',
  'BTN',
] as const;

/** Position descriptions for guidance */
export const POSITION_DESCRIPTIONS: Record<Position, string> = {
  UTG: 'Under the Gun - First to act preflop',
  HJ: 'Hijack - Two seats before the button',
  CO: 'Cutoff - One seat before the button',
  BTN: 'Button - Last to act postflop, best position',
  SB: 'Small Blind - Forced half bet, first to act postflop',
  BB: 'Big Blind - Forced full bet, last to act preflop',
} as const;

/**
 * Player actions in the game
 */
export const ACTIONS = {
  FOLD: 'fold',
  CHECK: 'check',
  CALL: 'call',
  BET: 'bet',
  RAISE: 'raise',
  ALL_IN: 'all_in',
} as const;

export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];

/**
 * A single player in the game
 */
export interface Player {
  /** Unique identifier for this player */
  readonly id: string;

  /** Player's hole cards (only visible if hero or at showdown) */
  readonly holeCards: HoleCards | null;

  /** Whether this player is the user */
  readonly isHero: boolean;

  /** Player's position at the table */
  readonly position: Position;

  /** Whether the player is still in the hand (hasn't folded) */
  readonly isActive: boolean;

  /** Display name */
  readonly name: string;
}

/**
 * Game configuration settings
 */
export interface GameConfig {
  /** Number of players at the table (2-9) */
  readonly playerCount: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  /** Hero's position at the table */
  readonly heroPosition: Position;

  /** Optional: Specific hole cards for hero (for practice scenarios) */
  readonly forcedHoleCards?: HoleCards;

  /** Optional: Forced community cards (for practice scenarios) */
  readonly forcedCommunityCards?: CommunityCardsArray;
}

/**
 * Current state of a poker hand
 */
export interface GameState {
  /** Unique identifier for this hand */
  readonly handId: string;

  /** Current street */
  readonly street: Street;

  /** Remaining deck after dealing */
  readonly deck: Deck;

  /** Community cards on the board */
  readonly communityCards: CommunityCardsArray;

  /** All players in the hand */
  readonly players: readonly Player[];

  /** Game configuration */
  readonly config: GameConfig;

  /** Timestamp when hand started */
  readonly startedAt: number;

  /** History of states for replay */
  readonly stateHistory?: readonly GameStateSnapshot[];
}

/**
 * Snapshot of game state for history/replay
 */
export interface GameStateSnapshot {
  /** Street at this snapshot */
  readonly street: Street;

  /** Community cards at this snapshot */
  readonly communityCards: CommunityCardsArray;

  /** Timestamp of this snapshot */
  readonly timestamp: number;
}

/**
 * Result of a completed hand
 */
export interface HandResult {
  /** The winning player(s) */
  readonly winners: readonly {
    readonly player: Player;
    readonly hand: EvaluatedHand;
  }[];

  /** Whether it was a split pot */
  readonly isSplitPot: boolean;

  /** All players' final hands at showdown */
  readonly showdownHands: readonly {
    readonly player: Player;
    readonly hand: EvaluatedHand | null;
  }[];
}

/**
 * Available actions at any point
 */
export interface AvailableActions {
  readonly canFold: boolean;
  readonly canCheck: boolean;
  readonly canCall: boolean;
  readonly canBet: boolean;
  readonly canRaise: boolean;
}
