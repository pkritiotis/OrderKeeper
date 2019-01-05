import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
@Injectable()
export class LocalStorageService implements StorageService {

    public retrieve(key: string): any {
        const item = localStorage.getItem(key);
        if (item && item !== 'undefined') {
            return JSON.parse(localStorage.getItem(key));
        }
        return;
    }

    public store(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    delete(key: string) {
        localStorage.removeItem(key);
    }
}
