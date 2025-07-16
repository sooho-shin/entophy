import axiosFetch from '../utils/api';

const block = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/block',
    data: data,
  });
  return res;
};

const detail = async (block: string) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/block/' + block,
  });
  return res;
};

export default { block, detail };
