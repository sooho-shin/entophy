import axiosFetch from '../utils/api';

const address = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/address',
    data: data,
  });
  return res;
};

const detail = async (address: string) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/address/' + address,
  });
  return res;
};

export default { address, detail };
