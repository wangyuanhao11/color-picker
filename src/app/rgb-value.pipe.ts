import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rgbValue'
})
export class RgbValuePipe implements PipeTransform {

  transform(value: number): string {
    let a = `hsl(${value},100%,50%)`;
    
    //let a = "#" + (  (Number(value).toString(16))).slice(-6).toUpperCase();
    console.log(a);
    return a;
  }

}
