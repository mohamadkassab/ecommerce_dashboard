import { ChartPropertyModel } from "./ChartPropertyModel";

export interface ChartModel {
    id: number;
    label: string;
    chartType: string;
    query?: string;
    chartProperties?: ChartPropertyModel[];
  }