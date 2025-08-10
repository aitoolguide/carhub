// src/types/api.ts

/**
 * Generic API response for successful requests.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

/**
 * Generic API response for failed requests.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

/**
 * A combined type for all API responses.
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
