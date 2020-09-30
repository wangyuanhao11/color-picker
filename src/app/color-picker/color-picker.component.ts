import { OnInit, Component, Output, Input, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Observable, fromEvent, Subject } from 'rxjs';
@Component({
    selector: 'color-picker',
    styleUrls: ['./color-picker.component.scss'],
    templateUrl: './color-picker.component.html'
})
export class ColorPicker implements OnInit {
    a = 0;
    //  elem = document.getElementById("mo-color-thumb");
    //  target = document.querySelector('.value');
    colorthumbX = null;
    colorthumbY = null;
    R = null;
    R1 = new Subject<number>();
    @Input() set rgbr(a: number) {
        this.R = a;
        this.R1.next(a);
    }

    G = null;
    B = null;
    H = null;
    S = null;
    V = null;
    HSL_H = null;
    HSL_S = null;
    HSL_L = null;


    move?: Observable<Event>;
    movealpha?: Observable<Event>;
    ngOnInit() {

        let showelem = document.getElementById("mo-color-sat-val1");
        let canvaselem = document.getElementById("mo-color-sat-val");
        let elem = document.getElementById("mo-color-thumb");


        this.R1.asObservable().subscribe(

            x => {
                let ss = x + 1;

                elem.style.transform = `translate( ${x - (-2)}px, ${70}px)`;
                console.log(x);
                console.log(ss);
            },
            e => console.error(e)
        );


        let b = elem.getBoundingClientRect();
        canvaselem.style.opacity = `0.8`;
        console.log(elem.style.left);
        this.move =
            fromEvent(canvaselem, 'mousedown');
        this.move.subscribe(x => {
            let x1 = null;
            let y1 = null;
            x1 = (x as MouseEvent).clientX;
            y1 = (x as MouseEvent).clientY;
            this.colorthumbX = canvaselem.getBoundingClientRect().right - canvaselem.getBoundingClientRect().left;
            this.colorthumbY = canvaselem.getBoundingClientRect().bottom - canvaselem.getBoundingClientRect().top;
            this.S = Math.round((x1 - canvaselem.getBoundingClientRect().left) / this.colorthumbX * 100) / 100;
            this.V = Math.round((canvaselem.getBoundingClientRect().bottom - y1) / this.colorthumbY * 100) / 100;


            const i = ~~(this.H * 6)
            const f = this.H * 6 - i
            const p = this.V * (1 - this.S)
            const q = this.V * (1 - f * this.S)
            const t = this.V * (1 - (1 - f) * this.S)
            let r = 0, g = 0, b1 = 0;
            switch (i % 6) {
                case 0: r = this.V; g = t; b1 = p; break;
                case 1: r = q; g = this.V; b1 = p; break;
                case 2: r = p; g = this.V; b1 = t; break;
                case 3: r = p; g = q; b1 = this.V; break;
                case 4: r = t; g = p; b1 = this.V; break;
                case 5: r = this.V, g = p, b1 = q; break;
            }


            //h,s,v 转h,s,l
            let h1 = this.H;
            this.HSL_H = this.H;
            this.HSL_S = (this.S * this.V / ((h1 = (2 - this.S) * this.V) < 1 ? h1 : 2 - h1)) || 0,
                this.HSL_L = h1 / 2;
            console.log("H:", this.HSL_H, "S:", this.HSL_S, "L:", this.HSL_L);

            this.R = Math.round(r * 255); this.G = Math.round(g * 255); this.B = Math.round(b1 * 255);
            // console.log(r,g,b1);
            showelem.style.background = `hsl(${this.HSL_H},${this.HSL_S * 100}%,${this.HSL_L * 100}%)`;
            // console.log(elem.getBoundingClientRect());
            // console.log(x1,y1);
            console.log("R:", this.R, "G:", this.G, "B:", this.B);
            console.log("H:", this.H, "S:", this.S, "V:", this.V);
            elem.style.transform = `translate(${x1 - b.left - 7}px, ${y1 - b.top - 7}px)`;
        })
        // canvaselem.style.background = `hsl(120,100%,50%)`;






        let pickcolorelem = document.getElementById("mo-color-hue");
        let colorlength = pickcolorelem.getBoundingClientRect().right - pickcolorelem.getBoundingClientRect().left;
        let elem1 = document.getElementById("mo-color-thumb1");
        let b1 = elem1.getBoundingClientRect();
        this.move =
            fromEvent(pickcolorelem, 'mousedown');
        this.move.subscribe(x => {
            let x1 = null;
            let y1 = null;
            x1 = (x as MouseEvent).clientX;
            y1 = (x as MouseEvent).clientY;
            let last = Math.round((x1 - pickcolorelem.getBoundingClientRect().left) / colorlength * 360);
            this.H = last;
            canvaselem.style.background = `hsl(${last},100%,50%)`;
            // console.log(x1,y1);
            elem1.style.transform = `translate(${x1 - b1.left - 7}px, 0px)`;

        })



        let alphaelem = document.getElementById("mo-color-alpha");
        let alphalength = alphaelem.getBoundingClientRect().right - alphaelem.getBoundingClientRect().left;
        let elem2 = document.getElementById("mo-color-thumb2");
        let b2 = elem2.getBoundingClientRect();
        this.movealpha =
            fromEvent(alphaelem, 'mousedown');
        this.movealpha.subscribe(x => {
            let x1 = null;
            let y1 = null;
            x1 = (x as MouseEvent).clientX;
            y1 = (x as MouseEvent).clientY;
            let alpha = (x1 - alphaelem.getBoundingClientRect().left) / alphalength;

            console.log("opacity:", alpha);
            // console.log(x1,y1);
            elem2.style.transform = `translate(${x1 - b2.left - 7}px, 0px)`;
            canvaselem.style.opacity = `${alpha}`;
        })

    }


    change() {
        // const value = ((document.getElementById('range')) as ).value ;
        // document.getElementById('value').innerHTML = value;
    }


}