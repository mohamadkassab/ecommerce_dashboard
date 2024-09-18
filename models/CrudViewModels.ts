import { KpiModel } from "./KpiModels";

type items = KpiModel ;

export interface CrudViewModel{
    items?: items[],
    onAdd?: () => void, 
}
