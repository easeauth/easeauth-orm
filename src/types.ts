export type Query<T> = {
    [P in keyof T]?: T[P] | undefined;
} & {
    id?: string;
};


export interface BaseModel<T> {
    create(payload: T): Promise<T>;

    // Find Methods
    findById(id: string): Promise<T | null>;
    find(query: Partial<Query<T>>): Promise<T[] | null>;
    findByIdAndDelete(id: string): Promise<T | null>;
    findByIdAndUpdate(id: string, payload: T): Promise<T | null>;

    // Other Methods
    exists(query: Partial<Query<T>>): Promise<{ id: string } | null>;
    isValidDocumentId(id: string): boolean;
};


