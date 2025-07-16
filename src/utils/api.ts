import axios from 'axios';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
interface axiosFetchInterface {
  url: string;
  method: string;
  data?: object;
}

interface sendOptionInterface {
  method: string;
  url: string;
  params?: object;
  data?: object;
}

const axiosFetch = async ({ url, method, data }: axiosFetchInterface) => {
  const sendOption: sendOptionInterface = {
    method,
    url: import.meta.env.VITE_API_SERVER + url,
    // headers: {
    //   Authorization: token ? `Bearer ${token}` : '',
    //   'x-locale': '',
    // },
  };

  if (method === 'get') {
    sendOption.params = data;
  } else {
    sendOption.data = data;
  }
  if (import.meta.env.MODE === 'development') {
    console.log(`sendOption ${sendOption}`);
  }

  try {
    const result = await axios(sendOption);
    if (import.meta.env.MODE === 'development') {
      console.log(result);
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    if (err?.response.status === 429) {
      history.push('/trafficError');
      history.go(0);
      return false;
    } else {
      return err;
    }
  }
};

export default axiosFetch;
