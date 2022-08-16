import debug from 'debug';

enum Level {
  Debug = 'debug',
  Error = 'error',
  Trace = 'trace',
  Warn = 'warn',
}

// enum LogBackend {
//   Console,
//   Debug,
// }

const getLogger = (namespace: string, level: Level) => {
  return debug(`${namespace}:${level}`);
};

export interface LoggerInterface {
  debug(...msg: unknown[]): void;
  error(...msg: unknown[]): void;
  trace(...msg: unknown[]): void;
  warn(...msg: unknown[]): void;
}

type LogPredicate = (namespace: string, level: Level) => boolean;

class Logger implements LoggerInterface {
  private namespace: string;
  private isVisible: LogPredicate;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.isVisible = () => true;
  }

  /**
   * set the logic to determine whether to log each
   * message to console or not.
  */
  setVisibility(predicate: LogPredicate): void {
    this.isVisible = predicate;
  }

  debug(...msg: unknown[]): void {
    this.logWithLevel(Level.Debug, ...msg);
  }

  trace(...msg: unknown[]): void {
    this.logWithLevel(Level.Trace, ...msg);
  }

  error(...msg: unknown[]): void {
    this.logWithLevel(Level.Error, ...msg);
  }

  warn(...msg: unknown[]): void {
    this.logWithLevel(Level.Warn, ...msg);
  }

  private logWithLevel(level: Level, ...msg: unknown[]): void {
    if (!this.isVisible(this.namespace, level)) return;
    getLogger(this.namespace, level).log(...msg);
  }
}

export default Logger;
