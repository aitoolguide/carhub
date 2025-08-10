// src/lib/api-client.ts
import { ApiErrorResponse, ApiResponse } from '../types/api';

/**
 * A generic API fetcher function for SWR.
 * @param url The URL to fetch.
 * @returns The JSON data.
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as Error & { info: any; status: number };
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

/**
 * A wrapper for the native fetch API to handle JSON responses and errors.
 * @param url The URL to fetch.
 * @param options Fetch options.
 * @returns A promise that resolves to the API response.
 */
export async function apiClient<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.message || 'An unknown error occurred.',
      error: data.error,
    } as ApiErrorResponse;
  }

  return {
    success: true,
    data: data,
  } as ApiResponse<T>;
}
