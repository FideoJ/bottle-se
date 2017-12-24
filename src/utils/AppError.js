class AppError extends Error {
  /**
   * 构造 App 异常
   * @param  {string}        status
   * @param  {string}        msg
   * @param  {Error|string}  [e]
   * @param  {number}        [code]
   * @param  {any}           [data]
   */
  constructor(status, msg, code = undefined, e = undefined, data = undefined) {
    let stack = null;
    const was = typeof e === 'object' ? 'error' : typeof e;
    if (e instanceof Error) {
      stack = e.stack.split('\n');
      stack[0] = '--------------------';
      stack = stack.join('\n');
    } else {
      e = e || msg;
    }
    super(e);
    Object.keys(e).forEach((key) => {
      this[key] = e[key];
    });
    this.was = was;
    this.name = Reflect.getPrototypeOf(this).constructor.name;
    this.info = { status, msg };
    if (code !== undefined) Object.assign(this.info, { code });
    if (data !== undefined) Object.assign(this.info, { data });
    this.stack += `\n${stack}\nInfo: ${JSON.stringify(this.info)}`;
    delete this.name;
  }

  /**
   * 若不是实例，则抛出
   * @param {Error} e
   */
  static throwIfNotInstance(e) {
    if (!(e instanceof AppError)) throw e;
  }
}

class SoftError extends AppError {
  /**
   * 构造 App 软异常
   * @param  {string}        status
   * @param  {string}        msg
   * @param  {Error|string}  [e]
   * @param  {number}        [code]
   * @param  {any}           [data]
   */
  constructor(status, msg, code = getCode(status), e = undefined, data = undefined) {
    super(status, msg, code, e, data);
  }
  /**
   * 若不是实例，则抛出
   * @param {Error} e
   */
  static throwIfNotInstance(e) {
    if (!(e instanceof SoftError)) throw e;
  }
}
class HardError extends AppError {
  /**
   * 若不是实例，则抛出
   * @param {Error} e
   */
  static throwIfNotInstance(e) {
    if (!(e instanceof HardError)) throw e;
  }
}

const map = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT_USERNAME: 409,
  UNKNOWN_ERROR: 500,
  INTERNAL_ERROR: 500,
};

function getCode(status) {
  return map[status] || 400;
}

exports = module.exports = {
  AppError,
  SoftError,
  HardError,
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT_USERNAME: 'CONFLICT_USERNAME',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};
