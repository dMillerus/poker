/**
 * Statistics and tracking types for player performance
 */

import type { Card } from './card';
import type { HandRank, HoleCards } from './hand';
import type { GameConfig, GameStateSnapshot, Street, Position } from './game';
import type { GuidanceMessage, ConceptTag } from './guidance';

/**
 * Outcome of a completed hand
 */
export interface HandOutcome {
  /** Whether the hero won the hand */
  readonly winner: boolean;

  /** Final hand rank achieved */
  readonly handRank: HandRank;

  /** Pot size (in abstract units) */
  readonly potSize: number;

  /** Whether hero went to showdown */
  readonly wentToShowdown: boolean;

  /** Street where hero exited (if folded) */
  readonly exitStreet?: Street;
}

/**
 * Complete record of a played hand
 */
export interface HandRecord {
  /** Unique identifier */
  readonly id: string;

  /** When the hand was played */
  readonly timestamp: Date;

  /** Session this hand belongs to */
  readonly sessionId: string;

  /** Game configuration */
  readonly config: GameConfig;

  /** Hero's hole cards */
  readonly holeCards: HoleCards;

  /** Final community cards */
  readonly communityCards: readonly Card[];

  /** State snapshots at each street */
  readonly snapshots: readonly GameStateSnapshot[];

  /** Final outcome */
  readonly outcome: HandOutcome;

  /** Guidance shown during this hand */
  readonly guidanceShown: readonly GuidanceMessage[];

  /** Duration from deal to conclusion (ms) */
  readonly duration: number;

  /** Hero's position */
  readonly heroPosition: Position;
}

/**
 * Statistics for a specific starting hand
 */
export interface StartingHandStats {
  /** Canonical representation (e.g., "AKs", "QQ") */
  readonly notation: string;

  /** Sample hole cards */
  readonly sampleCards: HoleCards;

  /** Number of times dealt this hand */
  readonly timesDealt: number;

  /** Number of times won */
  readonly timesWon: number;

  /** Win rate percentage */
  readonly winRate: number;

  /** Average final hand rank when won */
  readonly averageWinningRank: number;

  /** Average showdown rate */
  readonly showdownRate: number;
}

/**
 * Statistics by position
 */
export interface PositionStats {
  /** The position */
  readonly position: Position;

  /** Number of hands played from this position */
  readonly handsPlayed: number;

  /** Win rate from this position */
  readonly winRate: number;

  /** Showdown rate from this position */
  readonly showdownRate: number;

  /** Most profitable starting hands from this position */
  readonly bestHands: readonly string[];
}

/**
 * Statistics by street
 */
export interface StreetStats {
  /** The street */
  readonly street: Street;

  /** Number of times reached this street */
  readonly timesReached: number;

  /** Win rate when reaching this street */
  readonly winRateWhenReached: number;

  /** Fold rate at this street */
  readonly foldRate: number;
}

/**
 * Date range for filtering
 */
export interface DateRange {
  readonly start: Date;
  readonly end: Date;
}

/**
 * Filter for querying hand records
 */
export interface HandFilter {
  /** Filter by date range */
  readonly dateRange?: DateRange;

  /** Filter by position */
  readonly position?: Position;

  /** Filter by outcome (wins only, losses only) */
  readonly outcome?: 'win' | 'lose';

  /** Filter by minimum hand rank */
  readonly minHandRank?: HandRank;

  /** Filter by session */
  readonly sessionId?: string;

  /** Filter by specific starting hand notation */
  readonly startingHand?: string;
}

/**
 * Detected behavioral patterns
 */
export const PATTERN_TYPES = {
  FOLDS_DRAWS: 'folds_draws',
  OVERPLAYS_WEAK: 'overplays_weak',
  POSITION_BLIND: 'position_blind',
  RESULT_ORIENTED: 'result_oriented',
  PREMIUM_ONLY: 'premium_only',
  TOO_PASSIVE: 'too_passive',
  FOLD_TO_AGGRESSION: 'fold_to_aggression',
  CHASING_DRAWS: 'chasing_draws',
} as const;

export type PatternType = (typeof PATTERN_TYPES)[keyof typeof PATTERN_TYPES];

/**
 * A detected pattern in player behavior
 */
export interface Pattern {
  /** Type of pattern detected */
  readonly type: PatternType;

  /** Confidence level (0-100) */
  readonly confidence: number;

  /** Number of hands supporting this pattern */
  readonly sampleSize: number;

  /** Description for display */
  readonly description: string;

  /** Suggested improvement */
  readonly suggestion: string;

  /** Related concepts to study */
  readonly relatedConcepts: readonly ConceptTag[];
}

/**
 * Progress metrics over time
 */
export interface ProgressMetrics {
  /** Number of hands played in period */
  readonly handsPlayed: number;

  /** Win rate for period */
  readonly winRate: number;

  /** Concepts mastered in period */
  readonly conceptsMastered: readonly ConceptTag[];

  /** Current win streak */
  readonly currentStreak: number;

  /** Best streak achieved */
  readonly bestStreak: number;

  /** Average session length (hands) */
  readonly avgSessionLength: number;
}

/**
 * Comparison between two time periods
 */
export interface ImprovementReport {
  /** Win rate change */
  readonly winRateChange: number;

  /** New concepts mastered */
  readonly newConcepts: readonly ConceptTag[];

  /** Patterns that improved */
  readonly improvedPatterns: readonly PatternType[];

  /** Overall trend (improving, steady, declining) */
  readonly trend: 'improving' | 'steady' | 'declining';

  /** Summary message */
  readonly summary: string;
}

/**
 * Data point for learning curve visualization
 */
export interface DataPoint {
  /** Date or hand number */
  readonly x: number;

  /** Win rate or other metric */
  readonly y: number;

  /** Label for display */
  readonly label?: string;
}

/**
 * A play session
 */
export interface Session {
  /** Unique identifier */
  readonly id: string;

  /** When session started */
  readonly startTime: Date;

  /** When session ended (null if ongoing) */
  readonly endTime: Date | null;

  /** Session statistics */
  readonly stats: SessionStats;

  /** Whether this is the current active session */
  readonly isActive: boolean;
}

/**
 * Statistics for a single session
 */
export interface SessionStats {
  /** Duration in milliseconds */
  readonly duration: number;

  /** Number of hands played */
  readonly handsPlayed: number;

  /** Number of hands won */
  readonly handsWon: number;

  /** Win rate for session */
  readonly winRate: number;

  /** Best hand rank achieved */
  readonly peakHandRank: HandRank;

  /** Starting hands played */
  readonly uniqueStartingHands: number;
}

/**
 * Lifetime aggregate statistics
 */
export interface LifetimeStats {
  /** Total hands ever played */
  readonly totalHands: number;

  /** Overall win rate */
  readonly overallWinRate: number;

  /** Total sessions */
  readonly totalSessions: number;

  /** Total time played (ms) */
  readonly totalTimePlayed: number;

  /** Favorite starting hand (most played) */
  readonly favoriteHand: string;

  /** Most successful starting hand */
  readonly mostSuccessfulHand: string;

  /** Concepts mastered */
  readonly masteredConcepts: readonly ConceptTag[];

  /** Current skill rating (1-10) */
  readonly skillRating: number;
}
