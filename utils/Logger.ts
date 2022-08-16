import debug from 'debug';

/** eslint-disable-next-line: no-console */
// debug.log = console.log.bind(console);
debug.enable('*');
debug.log('hello world');

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
  const logger = debug(`${namespace}:${level}`);
  logger.log.bind(console);
  return logger;
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
    // if (!this.isVisible(this.namespace, level)) return;
    // TODO: set up and persist loggers.
    console.log('logger', this.namespace, level, msg);
    getLogger(this.namespace, level)
      // .bind(console)
      .log(...msg);
  }
}

export default Logger;
