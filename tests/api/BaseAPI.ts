import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class BaseAPI {
    private apiContext: APIRequestContext;
    protected baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * Initialize the API context
     */
    async init(): Promise<void> {
        this.apiContext = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Make a GET request
     * @param endpoint - The API endpoint
     * @param headers - Optional additional headers
     */
    async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.apiContext.get(endpoint, { headers });
    }

    /**
     * Make a POST request
     * @param endpoint - The API endpoint
     * @param data - The request body
     * @param headers - Optional additional headers
     */
    async post(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.apiContext.post(endpoint, {
            data,
            headers
        });
    }

    /**
     * Make a PUT request
     * @param endpoint - The API endpoint
     * @param data - The request body
     * @param headers - Optional additional headers
     */
    async put(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.apiContext.put(endpoint, {
            data,
            headers
        });
    }

    /**
     * Make a DELETE request
     * @param endpoint - The API endpoint
     * @param headers - Optional additional headers
     */
    async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.apiContext.delete(endpoint, { headers });
    }

    /**
     * Dispose of the API context
     */
    async dispose(): Promise<void> {
        await this.apiContext.dispose();
    }
} 