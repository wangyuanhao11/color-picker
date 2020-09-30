import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RgbValuePipe } from './rgb-value.pipe';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from './color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    RgbValuePipe,
    ColorPicker,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
