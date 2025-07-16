import axiosFetch from '../utils/api';

const faucet = async (data: object) => {
  const res = await axiosFetch({
    method: 'post',
    url: '/faucet',
    data: data,
  });
  return res;
};

export default { faucet };
