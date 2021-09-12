import { Component, HostListener, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Candlestick, ChartDimensions } from './candlestick-chart.models';
import { axisBottom, axisLeft, extent, max, min, ScaleLinear, scaleLinear, ScaleTime, scaleTime, select, Selection } from 'd3';

@Component({
  selector: 'iommi-candlestick-chart',
  template: `
    <div [id]="uuid"></div>
  `,
  styles: [ ]
})
export class CandlestickChartComponent {

  @Input() set dataset(dataset: Candlestick[]) {
    this._dataset = dataset;
    this.drawChart();
  }

  @Input() set dimensions(dimensions: ChartDimensions) {
    this._dimensions = dimensions;
    this.drawChart();
  }

  @Input() set responsiveWidth(state: boolean) {
    this._responsiveWidth = state;
    this.drawChart();
  }

  constructor() {
    this._dimensions = {
      width: 1000,
      height: 500
    };
    this._responsiveWidth = false;
    this._dataset = [];
  }

  uuid: string = 'id_' + uuid();

  private _responsiveWidth: boolean;
  private _dimensions: ChartDimensions;
  private _dataset: Candlestick[];
  private _svg: Selection<any, any, any, any>;
  private _container: Selection<any, any, any, any>;

  private readonly DEFAULT_MARGINS = 50;
  private readonly CANDLESTICK_SPACING = 5;
  private readonly Y_AXIS_SPACINC = 10;
  private readonly GAIN_STROKE = '#035305';
  private readonly GAIN_FILL = '#09bb0d';
  private readonly LOSE_STROKE = '#890707';
  private readonly LOSE_FILL = '#d90707';
  private readonly STROKE_WIDTH = 2;
  private readonly BORDER_RADIUS = 2;

  private static _xAccessor(candlestick: Candlestick): Date {
    return candlestick.startTime;
  }

  private static _yAccessor(candlestick: Candlestick) {
    return {
      h: candlestick.high,
      l: candlestick.low,
      o: candlestick.open,
      c: candlestick.close
    };
  }

  private static _isGain(d: Candlestick) {
    return d.open <= d.close;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this._responsiveWidth) {
      this.drawChart();
    }
  }

  private drawChart(): void {
    const parent = select(`#${this.uuid}`);

    if (parent.node() == null) {
      return; // view not ready
    }

    // removing for redraw
    parent.selectChildren().remove();

    if (this._responsiveWidth) {
      this._dimensions.width = Number.parseInt(parent.style('width'), 10);
    }

    this._svg = parent
      .append('svg')
      .attr('width', this._dimensions.width)
      .attr('height', this._dimensions.height);

    this._container = this._svg.append('g')
      .attr('transform', `translate(${this.DEFAULT_MARGINS}, ${this.DEFAULT_MARGINS})`);

    const xScale = this._calculateXScale();
    const yScale = this._calculateYScale();

    const candlesticksGroup = this._container.selectAll('g')
      .data(this._dataset)
      .join('g')
      .classed('candlestick', true);

    this._addCandlesticks(candlesticksGroup, xScale, yScale);
    this._drawXAxis(xScale);
    this._drawYAxis(yScale);
  }

  private _calculateXScale() {
    return scaleTime()
      .domain(extent(this._dataset, CandlestickChartComponent._xAccessor))
      .range([0, this._containerWidth()]);
  }

  private _calculateYScale() {
    return scaleLinear()
      .domain([
        min(this._dataset, (d: Candlestick) => CandlestickChartComponent._yAccessor(d).l - this.Y_AXIS_SPACINC),
        max(this._dataset, (d: Candlestick) => CandlestickChartComponent._yAccessor(d).h + this.Y_AXIS_SPACINC)
      ])
      .range([this._containerHeight(), 0]);
  }

  private _addCandlesticks(candlesticksGroup: Selection<any, Candlestick, any, any>,
                          xScale: ScaleTime<number, number, never>,
                          yScale: ScaleLinear<number, number, never>) {

    const bandwidth = this._calculateCandlestickBandwidth();

    candlesticksGroup
      .append('line')
      .attr('x1', (d: Candlestick) => xScale(CandlestickChartComponent._xAccessor(d)) + bandwidth / 2)
      .attr('y1', (d: Candlestick) => yScale(CandlestickChartComponent._yAccessor(d).l))
      .attr('x2', (d: Candlestick) => xScale(CandlestickChartComponent._xAccessor(d)) + bandwidth / 2)
      .attr('y2', (d: Candlestick) => yScale(CandlestickChartComponent._yAccessor(d).h))
      .attr('stroke', (d: Candlestick) => CandlestickChartComponent._isGain(d) ? this.GAIN_STROKE : this.LOSE_STROKE)
      .attr('stroke-width', this.STROKE_WIDTH);

    candlesticksGroup
      .append('rect')
      .attr('x', (d: Candlestick) => xScale(CandlestickChartComponent._xAccessor(d)))
      .attr('y', (d: Candlestick) => Math.min(
        yScale(CandlestickChartComponent._yAccessor(d).o),
        yScale(CandlestickChartComponent._yAccessor(d).c)
      ))
      .attr('fill', (d: Candlestick) => CandlestickChartComponent._isGain(d) ? this.GAIN_FILL : this.LOSE_FILL)
      .attr('stroke', (d: Candlestick) => CandlestickChartComponent._isGain(d) ? this.GAIN_STROKE : this.LOSE_STROKE)
      .attr('stroke-width', this.STROKE_WIDTH)
      .attr('width', bandwidth)
      .attr('height', (d: Candlestick) => Math.max(
        Math.abs(yScale(CandlestickChartComponent._yAccessor(d).o) - yScale(CandlestickChartComponent._yAccessor(d).c)), 1)
      )
      .attr('rx', this.BORDER_RADIUS);
  }

  private _drawXAxis(xScale: ScaleTime<number, number, never>) {
    const xAxis = axisBottom(xScale)
    this._container.append('g')
      .style('transform', `translateY(${this._containerHeight()}px)`)
      .call(xAxis);
  }

  private _drawYAxis(yScale: ScaleLinear<number, number, never>) {
    const yAxis = axisLeft(yScale)
      .tickFormat(d => d + '$');
    this._container.append('g')
      .call(yAxis);
  }

  private _calculateCandlestickBandwidth(): number {
    if (this._dataset.length === 0) {
      return 0;
    } else {
      return (this._containerWidth() / this._dataset.length) - this.CANDLESTICK_SPACING;
    }
  }

  private _containerWidth(): number {
    return this._dimensions.width - this.DEFAULT_MARGINS * 2;
  }

  private _containerHeight(): number {
    return this._dimensions.height - this.DEFAULT_MARGINS * 2;
  }


}
