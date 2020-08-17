// Redux interfaces
export interface Storage {
  data: object | any[];
}

export interface Network {
  fetching: boolean;
  success: boolean;
  error: object | any[];
  type: string;
}

export interface StoreAction {
  type: string;
  name: string;
  data?: object | any[];
  error?: object | any[];
}

// Common interfaces

export interface NameValue {
  name: string;
  value: string;
}

export interface LabelValue {
  label: string;
  value: any;
}
