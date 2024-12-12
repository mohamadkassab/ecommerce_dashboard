export interface KpiModel {
    id: number;
    name: string;
    description: string;
}

export interface CreateKpiModel {
    label: string;
    query: string;
    chartType:string;
    chartProperties: {
        propertyName : string,
        propertyValue: string
    }[];
}

export interface KpiDetailsModel {
    id: number;
    label: string;
    query: string;
    chartType:string;
    chartProperties: {
        propertyName : string,
        propertyValue: string
    }[];
}
