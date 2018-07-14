import {Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorGenService implements OnInit {
    get randColor() {
        return this.colorGen();
    }
    private colorGen() {
        let hex = '0123456789abcdef',
            col = '#';
        for (let i = 0; i < 6; i++) {
            let r = hex[Math.floor(Math.random() * (16 - 0) + 0)];
            col += r;
        }
        return col;
    }

    ngOnInit() {
    }

    constructor() {
    }
}
