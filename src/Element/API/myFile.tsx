import httpService from '../../helpers/httpService';

export const apiCount = async () => {
  try {
    type Rest = ResAPI<CountStorage>;
    const { data } = (await httpService.get<Rest>('/count')).data;
    return {
      audio: data.audio,
      document: data.document,
      folder: data.folder,
      image: data.image,
      video: data.video,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
export const apiSlider = async () => {
  try {
    type Rest = ResAPI<ListSlider>;
    const { data } = (await httpService.get<Rest>('/list/slider')).data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apilist = async (params?: Partial<ParamsList>): Promise<StorageData['list']> => {
  try {
    type Rest = ResAPI<List[]>;
    const { data, meta } = (
      await httpService.get<Rest>('/list', {
        params,
      })
    ).data;
    return { data, meta: meta as Meta, params: params as Partial<ParamsList> };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apiSumFile = async (): Promise<number> => {
  try {
    type Rest = ResAPI<number>;
    const { data } = (await httpService.get<Rest>('/sum-file')).data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
