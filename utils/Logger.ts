enum Level {
  Debug = 'debug',
  Error = 'error',
  Trace = 'trace',
  Warn = 'warn',
}

export interface LoggerInterface {
  debug(msg: unknown): void;
  error(msg: unknown): void;
  trace(msg: unknown): void;
  warn(msg: unknown): void;
}

class Logger implements LoggerInterface {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  debug(msg: unknown): void {
    this.logWithLevel(Level.Debug, msg);
  }

  trace(msg: unknown): void {
    this.logWithLevel(Level.Trace, msg);
  }

  error(msg: unknown): void {
    this.logWithLevel(Level.Error, msg);
  }

  warn(msg: unknown): void {
    this.logWithLevel(Level.Warn, msg);
  }

  private logWithLevel(level: Level, msg: unknown): void {
    /* eslint-disable-next-line no-console */
    console[level](`[${this.namespace}]`, msg);
  }
}

export default Logger;
