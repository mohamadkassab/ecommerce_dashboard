import Cookies from 'js-cookie';
import { AUTHTOKEN } from '../constants';
interface Property {
    id: number;
    propertyName: string;
    propertyValue: string;
  }

export const FindPropertyValueByKey = (
    key: string, 
    properties: Property[]
  ): string | undefined => {
    const property = properties.find(item => item.propertyName === key);
    return property ? property.propertyValue : undefined;
  };

  export const GetMinMaxDates = (dates: Date[]): { minDate: Date; maxDate: Date } => {
    if (dates.length === 0) return { minDate: new Date(), maxDate: new Date() };
    const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
    return { minDate, maxDate };
  };

  export const GetToken = () => {
    return Cookies.get(`${AUTHTOKEN}`);
  }
