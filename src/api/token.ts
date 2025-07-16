import axiosFetch from '../utils/api';

const token = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: `/token`,
    data: data,
  });
  return res;
};

const detail = async (hash: string) => {
  const res = await axiosFetch({
    method: 'get',
    url: `/token/${hash}`,
  });
  return res;
};

const transfer = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: `/token_transfer`,
    data: data,
  });
  return res;
};

const holder = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: `/token_holder`,
    data: data,
  });
  return res;
};

const inven = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: `/token_inven`,
    data: data,
  });
  return res;
};

export default { token, detail, transfer, holder, inven };
