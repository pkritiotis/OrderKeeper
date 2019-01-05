import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
@Injectable()
export class SessionStorageService implements StorageService {

    public retrieve(key: string): any {
        const item = sessionStorage.getItem(key);
        if (item && item !== 'undefined') {
            return JSON.parse(sessionStorage.getItem(key));
        }
        return;
    }

    public store(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    delete(key: string) {
        sessionStorage.removeItem(key);
    }
}
