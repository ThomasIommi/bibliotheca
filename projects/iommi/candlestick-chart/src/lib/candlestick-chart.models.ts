export interface ChartDimensions {
  width: number;
  height: number;
}

export interface Candlestick {
  open: number;
  close: number;
  high: number;
  low: number;
  startTime: Date;
  closeTime: Date;
}
