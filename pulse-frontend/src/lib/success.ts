export class SuccessResponse<T = any> {
  public message: string;
  public statusCode: number;
  public data?: T;

  constructor(message: string, statusCode: number, data?: T) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  serialize() {
    return {
      success: true,
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}
