import { KpiModel } from "./KpiModel";

type items = KpiModel ;

export interface CrudViewModel{
    items?: items[],
    onAdd?: () => void, 
}
