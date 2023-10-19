
interface ApiResponse<T> {
  meta: {
    code: number;
    message: string;
  };
  data?: T;
  errors?: T;
}

export default ApiResponse;
