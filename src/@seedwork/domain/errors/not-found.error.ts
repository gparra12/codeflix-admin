export default class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || "Entity not found error");
    this.name = "NotFoundError";
  }
}
