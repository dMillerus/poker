/**
 * AI Guidance system types for poker education
 */

import type { Street } from './game';

/**
 * Verbosity levels for guidance messages
 */
export const VERBOSITY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  MINIMAL: 'minimal',
} as const;

export type VerbosityLevel = (typeof VERBOSITY_LEVELS)[keyof typeof VERBOSITY_LEVELS];

/** Descriptions for verbosity levels */
export const VERBOSITY_DESCRIPTIONS: Record<VerbosityLevel, string> = {
  beginner: 'Detailed explanations for every concept',
  intermediate: 'Key insights without basic explanations',
  minimal: 'Brief tips only when critical',
} as const;

/**
 * Types of guidance messages
 */
export const GUIDANCE_TYPES = {
  STRENGTH: 'strength',
  DRAW: 'draw',
  CONCEPT: 'concept',
  WARNING: 'warning',
  POSITION: 'position',
  ODDS: 'odds',
  SUMMARY: 'summary',
} as const;

export type GuidanceType = (typeof GUIDANCE_TYPES)[keyof typeof GUIDANCE_TYPES];

/**
 * When guidance is triggered
 */
export const GUIDANCE_TRIGGERS = {
  PREFLOP: 'preflop',
  FLOP: 'flop',
  TURN: 'turn',
  RIVER: 'river',
  SHOWDOWN: 'showdown',
  POST_HAND: 'post_hand',
  ON_DEMAND: 'on_demand',
} as const;

export type GuidanceTrigger = (typeof GUIDANCE_TRIGGERS)[keyof typeof GUIDANCE_TRIGGERS];

/**
 * Teachable poker concepts
 */
export const CONCEPT_TAGS = {
  // Starting hands
  STARTING_HAND_STRENGTH: 'starting_hand_strength',
  PREMIUM_HANDS: 'premium_hands',
  SPECULATIVE_HANDS: 'speculative_hands',
  HAND_SELECTION: 'hand_selection',

  // Position
  POSITION_ADVANTAGE: 'position_advantage',
  LATE_POSITION: 'late_position',
  EARLY_POSITION: 'early_position',
  BLIND_PLAY: 'blind_play',

  // Hand strength
  MADE_HANDS: 'made_hands',
  DRAWING_HANDS: 'drawing_hands',
  BOARD_TEXTURE: 'board_texture',
  RELATIVE_STRENGTH: 'relative_strength',

  // Odds and equity
  POT_ODDS: 'pot_odds',
  IMPLIED_ODDS: 'implied_odds',
  EQUITY: 'equity',
  OUTS: 'outs',
  RULE_OF_2_AND_4: 'rule_of_2_and_4',

  // Hand reading
  KICKER_IMPORTANCE: 'kicker_importance',
  DOMINATED_HANDS: 'dominated_hands',
  BLOCKING: 'blocking',

  // Board analysis
  DRY_BOARD: 'dry_board',
  WET_BOARD: 'wet_board',
  PAIRED_BOARD: 'paired_board',
  COORDINATED_BOARD: 'coordinated_board',

  // Advanced concepts
  RANGE_THINKING: 'range_thinking',
  FOLD_EQUITY: 'fold_equity',
  REVERSE_IMPLIED_ODDS: 'reverse_implied_odds',
} as const;

export type ConceptTag = (typeof CONCEPT_TAGS)[keyof typeof CONCEPT_TAGS];

/**
 * Priority levels for guidance messages
 */
export const GUIDANCE_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export type GuidancePriority = (typeof GUIDANCE_PRIORITIES)[keyof typeof GUIDANCE_PRIORITIES];

/**
 * A guidance message shown to the user
 */
export interface GuidanceMessage {
  /** Unique identifier */
  readonly id: string;

  /** Type of guidance */
  readonly type: GuidanceType;

  /** What triggered this guidance */
  readonly trigger: GuidanceTrigger;

  /** Priority for display ordering */
  readonly priority: GuidancePriority;

  /** Short title/headline */
  readonly title: string;

  /** Main content/explanation */
  readonly content: string;

  /** Optional detailed explanation (for expandable UI) */
  readonly details?: string;

  /** Concepts this message teaches */
  readonly concepts: readonly ConceptTag[];

  /** Whether this is relevant to current verbosity level */
  readonly verbosityLevel: VerbosityLevel;

  /** Timestamp when generated */
  readonly timestamp: number;
}

/**
 * Score for a single concept competency
 */
export interface CompetencyScore {
  /** The concept being tracked */
  readonly concept: ConceptTag;

  /** Number of times demonstrated correctly */
  readonly demonstrated: number;

  /** Number of times shown to user */
  readonly timesShown: number;

  /** Last time this concept was demonstrated */
  readonly lastDemonstrated: number;

  /** Mastery level (0-100) */
  readonly masteryLevel: number;
}

/**
 * Board texture analysis result
 */
export interface BoardTexture {
  /** Whether the board is "wet" (many draws possible) */
  readonly isWet: boolean;

  /** Whether the board is "dry" (few draws possible) */
  readonly isDry: boolean;

  /** Whether the board is paired */
  readonly isPaired: boolean;

  /** Whether the board has straight possibilities */
  readonly hasStraightPossibilities: boolean;

  /** Whether the board has flush possibilities */
  readonly hasFlushPossibilities: boolean;

  /** Whether the board is coordinated (connected cards) */
  readonly isCoordinated: boolean;

  /** Description for display */
  readonly description: string;
}

/**
 * Position-based advice
 */
export interface PositionAdvice {
  /** The position being analyzed */
  readonly position: string;

  /** Whether this is early, middle, or late position */
  readonly positionType: 'early' | 'middle' | 'late' | 'blind';

  /** General advice for this position */
  readonly advice: string;

  /** Whether position is advantageous here */
  readonly isAdvantaged: boolean;
}

/**
 * Key moment in a hand for post-hand review
 */
export interface KeyMoment {
  /** Street where this occurred */
  readonly street: Street;

  /** Description of what happened */
  readonly description: string;

  /** What could have been done differently */
  readonly alternative?: string;

  /** Concepts relevant to this moment */
  readonly concepts: readonly ConceptTag[];

  /** Impact on outcome (positive, negative, neutral) */
  readonly impact: 'positive' | 'negative' | 'neutral';
}
