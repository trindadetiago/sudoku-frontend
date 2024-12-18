// types/api.ts

// Define types for the request and response
export interface SearchRequest {
    target: string;     // Target number to search for
    algorithms: string[]; // List of algorithms to execute (e.g., ["linear", "binary", "skip_list"])
}

export interface SearchAlgorithmResult {
    index: number;  // The index where the number was found, or -1 if not found
    iterations: number;
    time: string;  // in microseconds
    memory: string; // Memory usage
    output: string;
    result: string;
}

export interface SearchResponse {
    results: { [key: string]: SearchAlgorithmResult }; // Algorithm name mapped to results
}
