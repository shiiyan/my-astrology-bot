/**
 * Base class of RuntimeError
 *
 * @class RuntimeError
 * @extends {Error}
 */
class RuntimeError extends Error {}

/**
 * RuntimeError for an invalid argument.
 *
 * @export
 * @class InvalidArgumentError
 * @extends {Error}
 */
export class InvalidArgumentError extends RuntimeError {}
