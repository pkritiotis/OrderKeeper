import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() {
    }

    public retrieve(key: string, is_persistent: boolean = false): any {
        const storage = (is_persistent) ? localStorage : sessionStorage;
        const item = storage.getItem(key);
        if (item && item !== 'undefined') {
            return JSON.parse(storage.getItem(key));
        }
        return;
    }

    public store(key: string, value: any, is_persistent: boolean = false) {
        const storage = (is_persistent) ? localStorage : sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    }
}
