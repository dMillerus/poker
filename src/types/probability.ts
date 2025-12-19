/**
 * Probability calculation types for poker analysis
 */

import type { Card, Rank } from './card';
import type { HandRank } from './hand';

/**
 * Types of drawing hands
 */
export const DRAW_TYPES = {
  FLUSH_DRAW: 'flush_draw',
  OPEN_ENDED_STRAIGHT: 'open_ended_straight',
  GUTSHOT: 'gutshot',
  DOUBLE_GUTSHOT: 'double_gutshot',
  OVERCARDS: 'overcards',
  BACKDOOR_FLUSH: 'backdoor_flush',
  BACKDOOR_STRAIGHT: 'backdoor_straight',
  SET_DRAW: 'set_draw',
  TWO_PAIR_DRAW: 'two_pair_draw',
  COMBO_DRAW: 'combo_draw',
} as const;

export type DrawType = (typeof DRAW_TYPES)[keyof typeof DRAW_TYPES];

/**
 * Outs calculation result
 */
export interface Outs {
  /** Total number of outs */
  readonly count: number;

  /** The specific cards that are outs */
  readonly cards: readonly Card[];

  /** What hand ranking these outs would achieve */
  readonly targetHand: HandRank;

  /** Description of the draw (e.g., "Flush draw") */
  readonly description: string;
}

/**
 * Detailed outs breakdown by target hand
 */
export interface OutsBreakdown {
  /** Total unique outs (avoiding double-counting) */
  readonly totalOuts: number;

  /** Outs grouped by what they improve to */
  readonly byTargetHand: readonly {
    readonly targetHand: HandRank;
    readonly outs: readonly Card[];
    readonly count: number;
  }[];

  /** Cards that are already used (visible cards) */
  readonly deadCards: readonly Card[];

  /** Number of unknown cards remaining */
  readonly remainingCards: number;
}

/**
 * Equity calculation result
 */
export interface Equity {
  /** Win percentage (0-100) */
  readonly win: number;

  /** Lose percentage (0-100) */
  readonly lose: number;

  /** Tie percentage (0-100) */
  readonly tie: number;

  /** Number of simulations run */
  readonly sampleSize: number;

  /** Confidence interval (if applicable) */
  readonly confidence?: {
    readonly low: number;
    readonly high: number;
  };
}

/**
 * Odds representation in multiple formats
 */
export interface Odds {
  /** Percentage form (e.g., 25 for 25%) */
  readonly percentage: number;

  /** Ratio form as string (e.g., "3:1") */
  readonly ratio: string;

  /** Fractional form as string (e.g., "1/4") */
  readonly fractional: string;

  /** Decimal odds (e.g., 4.0 for 3:1) */
  readonly decimal: number;
}

/**
 * Pot odds calculation
 */
export interface PotOdds {
  /** The pot odds as a percentage */
  readonly percentage: number;

  /** Whether calling is mathematically correct based on outs */
  readonly isCorrectCall: boolean;

  /** The current pot size */
  readonly potSize: number;

  /** The bet amount to call */
  readonly betToCall: number;

  /** Ratio representation (e.g., "3:1") */
  readonly ratio: string;
}

/**
 * Implied odds calculation
 */
export interface ImpliedOdds {
  /** The implied odds as a percentage */
  readonly percentage: number;

  /** Current pot size */
  readonly currentPot: number;

  /** Bet amount to call */
  readonly betToCall: number;

  /** Expected future winnings if hand improves */
  readonly expectedFutureBets: number;

  /** Effective pot (current pot + expected future bets) */
  readonly effectivePot: number;
}

/**
 * Combined probability analysis result
 */
export interface ProbabilityResult {
  /** Outs analysis */
  readonly outs: OutsBreakdown;

  /** Equity vs opponents */
  readonly equity: Equity;

  /** Current drawing hand types */
  readonly draws: readonly DrawType[];

  /** Odds of improving (one card to come) */
  readonly oddsToImprove: Odds;

  /** Odds of improving (two cards to come, if applicable) */
  readonly oddsTwoCards?: Odds;
}

/**
 * Configuration for equity calculation
 */
export interface EquityConfig {
  /** Number of Monte Carlo iterations */
  readonly iterations: number;

  /** Number of opponent hands to consider */
  readonly opponentCount: number;

  /** Whether to use exhaustive enumeration (if feasible) */
  readonly useExhaustive: boolean;

  /** Opponent range (if known) */
  readonly opponentRange?: OpponentRange;
}

/**
 * Opponent hand range
 */
export interface OpponentRange {
  /** Description of the range (e.g., "Top 20%") */
  readonly description: string;

  /** Specific hands in the range */
  readonly hands: readonly {
    readonly ranks: readonly [Rank, Rank];
    readonly suited: boolean;
    readonly weight: number;
  }[];
}

/**
 * Standard outs reference for common draws
 */
export const STANDARD_OUTS: Record<DrawType, number> = {
  flush_draw: 9,
  open_ended_straight: 8,
  gutshot: 4,
  double_gutshot: 8,
  overcards: 6,
  backdoor_flush: 10,
  backdoor_straight: 8,
  set_draw: 2,
  two_pair_draw: 4,
  combo_draw: 15,
} as const;
