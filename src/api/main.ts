import axiosFetch from '../utils/api';

const main = async () => {
  const res = await axiosFetch({
    method: 'get',
    url: '/',
  });
  return res;
};

export default { main };
