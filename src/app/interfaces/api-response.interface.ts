export interface APIResponse<T>{
    message: string;
    data:T;
    error: string[] | string | object[];
}