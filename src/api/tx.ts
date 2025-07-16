import axiosFetch from '../utils/api';

const tx = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/tx',
    data: data,
  });
  return res;
};

const detail = async (txid: string) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/tx/' + txid,
  });
  return res;
};

const txInternal = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/txInternal',
    data: data,
  });
  return res;
};

const txPending = async (data: object) => {
  const res = await axiosFetch({
    method: 'get',
    url: '/txPending',
    data: data,
  });
  return res;
};
export default { tx, detail, txInternal, txPending };
