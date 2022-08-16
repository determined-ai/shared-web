import { debug } from 'debug';

/** eslint-disable-next-line: no-console */
const LIB_NAME = 'det';

enum Level {
  Debug = 'debug',
  Error = 'error',
  Info = 'info',
  Trace = 'trace',
  Warn = 'warn',
}

// enum LogBackend {
//   Console,
//   Debug,
// }

const getLogger = (namespace: string, level: Level) => {
  const logger = debug(`${namespace}:${level}`);
  // debug doesn't seem to match the advertised type definition.
  return logger as (...args: unknown[]) => void;
};

export interface LoggerInterface {
  debug(...msg: unknown[]): void;
  error(...msg: unknown[]): void;
  info(...msg: unknown[]): void;
  trace(...msg: unknown[]): void;
  warn(...msg: unknown[]): void;
}

type LogPredicate = (namespace: string, level: Level) => boolean;

/**
 * log filtering is controlled by localStorage.debug.
 * read more on: https://github.com/debug-js/debug#usage
 */
class Logger implements LoggerInterface {
  private namespace: string;
  private isVisible: LogPredicate;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.isVisible = () => true;
    // debugger;
  }

  extend(namespace: string): Logger {
    return new Logger(`${this.namespace}/${namespace}`);
  }

  /**
   * set the logic to determine whether to log each
   * message to console or not.
  */
  setVisibility(predicate: LogPredicate): void { // TODO remove me?
    this.isVisible = predicate;
  }

  debug(...msg: unknown[]): void {
    this.logWithLevel(Level.Debug, ...msg);
  }

  trace(...msg: unknown[]): void {
    this.logWithLevel(Level.Trace, ...msg);
  }

  info(...msg: unknown[]): void {
    this.logWithLevel(Level.Info, ...msg);
  }

  error(...msg: unknown[]): void {
    this.logWithLevel(Level.Error, ...msg);
  }

  warn(...msg: unknown[]): void {
    this.logWithLevel(Level.Warn, ...msg);
  }

  private logWithLevel(level: Level, ...msg: unknown[]): void {
    if (!this.isVisible(this.namespace, level)) return;
    // TODO: set up and persist loggers.
    // log(`${LIB_NAME}/${this.namespace}:${level}`, ...msg);
    getLogger(this.namespace, level)(...msg);
  }
}

const rootLogger = new Logger(LIB_NAME);

export default rootLogger;
