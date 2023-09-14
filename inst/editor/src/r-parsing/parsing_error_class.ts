export class ParsingError extends Error {
  name: "AST_PARSING_ERROR";
  message: string;
  cause: any;

  constructor({ message, cause }: { message: string; cause?: any }) {
    super();
    this.name = "AST_PARSING_ERROR";
    this.message = message;
    this.cause = cause;
  }
}
