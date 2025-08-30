export class ErrorHandler extends Error {
  public statusCode: string;
  public details?: string;

  constructor(message: string, statusCode: string, details?: string) {
    super(message);
    this.name = "ErrorHandler";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function standardizeApiError(error: any): any {
  if (error instanceof ErrorHandler) {
    return error;
  }
  return new ErrorHandler(
    "An unexpected error occurred",
    "INTERNAL_SERVER_ERROR",
    error.message,
  );
}
