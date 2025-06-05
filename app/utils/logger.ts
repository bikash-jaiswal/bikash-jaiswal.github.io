// Simple logger utility for Next.js

// Configure log levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Environment detection
const isServer = typeof window === 'undefined';
const isProduction = process.env.NODE_ENV === 'production';
const defaultLevel: LogLevel = isProduction ? 'info' : 'debug';

// Force logging even in production for testing (set this to true temporarily if needed)
const FORCE_LOGGING = true;

// Configure which log levels are enabled
const enabledLevels: Record<LogLevel, boolean> = {
  debug: !isProduction || FORCE_LOGGING,
  info: true,
  warn: true,
  error: true
};

// Color codes for better visibility
const colors = {
    debug: '\x1b[36m', // cyan
    info: '\x1b[32m',  // green
    warn: '\x1b[33m',  // yellow
    error: '\x1b[31m', // red
    reset: '\x1b[0m'   // reset
  };

// Timestamp generator
const timestamp = () => new Date().toISOString();

// Performance timing
const timers: Record<string, number> = {};

// Helper to format console output to be more visible
const formatMessage = (level: LogLevel, message: string): string => {
  const prefix = `[${timestamp()}] ${level.toUpperCase()}:`;
  
  if (isServer) {
    // Server-side with colors
    return `${colors[level]}${prefix} ${message}${colors.reset}`;
  } else {
    // Client-side (browser doesn't support ANSI colors the same way)
    return `${prefix} ${message}`;
  }
};

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (enabledLevels.debug) {
      console.debug(`[${timestamp()}] DEBUG: ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]) => {
    if (enabledLevels.info) {
      console.info(`[${timestamp()}] INFO: ${message}`, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    if (enabledLevels.warn) {
      console.warn(`[${timestamp()}] WARN: ${message}`, ...args);
    }
  },
  
  error: (message: string, ...args: any[]) => {
    if (enabledLevels.error) {
      console.error(`[${timestamp()}] ERROR: ${message}`, ...args);
    }
  },
  
  // Performance measurement
  startTimer: (label: string) => {
    timers[label] = performance.now();
    logger.debug(`Timer started: ${label}`);
  },
  
  endTimer: (label: string) => {
    if (!timers[label]) {
      logger.warn(`Timer "${label}" does not exist`);
      return;
    }
    
    const duration = performance.now() - timers[label];
    logger.info(`Timer "${label}" completed in ${duration.toFixed(2)}ms`);
    delete timers[label];
    return duration;
  },

    // For temporary visual logging to debug in production
    visualLog: (message: string) => {
        // This will show up in both dev and production
        // Use this sparingly for debugging
        if (isServer) {
        console.log('\n\n');
        console.log('='.repeat(50));
        console.log(message);
        console.log('='.repeat(50));
        console.log('\n\n');
        } else {
        console.log('%c' + message, 'background: #222; color: #bada55; padding: 10px; font-size: 16px;');
        }
    }
};


export default logger;
