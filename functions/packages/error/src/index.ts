/**
 * Base class of RuntimeError.
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

/**
 * RuntimeError for invalid pub sub message.
 *
 * @export
 * @class InvalidPubSubMessageError
 * @extends {RuntimeError}
 */
export class InvalidPubSubMessageError extends RuntimeError {}

/**
 * RuntimeError for DOM element not exsits.
 *
 * @export
 * @class DomElementNotExistsError
 * @extends {RuntimeError}
 */
export class DomElementNotExistsError extends RuntimeError {}

/**
 * RuntimeError for not implemented code.
 * @see https://docs.python.org/3/library/exceptions.html#NotImplementedError
 *
 * @export
 * @class NotImplementedError
 * @extends {RuntimeError}
 */
export class NotImplementedError extends RuntimeError {}

/**
 * Base class of FirestoreError.
 * @see @see https://modularfirebase.web.app/reference/firestore_.firestoreerror
 *
 * @class RuntimeError
 * @extends {Error}
 */
class FirestoreError extends Error {}

/**
 * FirestoreError for document already exists.
 *
 * @export
 * @class DocumentAlreadyExists
 * @extends {RuntimeError}
 */
export class DocumentAlreadyExists extends FirestoreError {}
