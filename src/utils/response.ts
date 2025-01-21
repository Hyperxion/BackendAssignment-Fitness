export const successResponse = (data: any, message: string) => {
  return {
    data,
    message,
  };
};

export const errorResponse = (message: string, statusCode: number = 400) => {
  return {
    data: null as any,
    message,
    statusCode,
  };
};
