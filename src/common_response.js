class CommonResponse {
  constructor(status, message, data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(message, data = null) {
    return new CommonResponse('success', message, data);
  }

  static error(message, data = null) {
    return new CommonResponse('error', message, data);
  }
}

export default CommonResponse;