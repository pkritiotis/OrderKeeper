
export interface StorageService {
    retrieve(key: string): any;
    store(key: string, value: any);
    delete(key: string);
}
