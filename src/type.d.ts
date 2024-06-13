declare type Meta = {
  page: number;
  perPage: number;
  lastPage: number;
  count: number;
};
declare type ResAPI<T = null> = {
  status: number;
  data: T;
  message: string;
  meta?: Meta;
};

declare type CountStorage = {
  folder: number;
  document: number;
  image: number;
  video: number;
  audio: number;
};

declare type ListSlider = {
  folder: Folder[];
  document: {
    id: string;
    name: string;
    file: string;
    size: number;
    star: boolean;
    createdAt: string;
  }[];
};

declare type Folder = {
  id: string;
  name: string;
  count: number;
  star: boolean;
};

declare type StorageData = {
  count: CountStorage;
  slider: ListSlider;
  list: {
    params?: Partial<ParamsList>;
    data: List[];
    meta: Meta;
  };
};

declare type ParamsList = {
  filter: string;
  folder: string;
  open: string;
  archived: boolean;
  recent: boolean;
  star: boolean;
  page: number;
  perPage: number;
};

declare type List = {
  id: string;
  file: string;
  name: string;
  type: string;
  size: number;
  folder: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  star: boolean;
};
