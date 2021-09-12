import { NgModule } from '@angular/core';
import { CandlestickChartComponent } from './candlestick-chart.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CandlestickChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CandlestickChartComponent
  ]
})
export class CandlestickChartModule { }
