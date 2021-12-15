import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class UtilDateService {
    
    formatCurrentDate(): string {
        return format(new Date(), 'yyyy-MM-dd')
    }

    compareDates(date: string) {
        const parts = date.split('-').map(item => Number(item))
        const today = new Date()
        const dateCovert = new Date(parts[0], parts[1] - 1, parts[2])
        return dateCovert > today
    }
}