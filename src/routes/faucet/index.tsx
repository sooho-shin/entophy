import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import faucetApi from '@/api/faucet';

const Faucet = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const successToast = (massage: string) => {
    toast.success(massage, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const dangerToast = (massage: string) => {
    toast.error(massage, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const getFaucet = useCallback(async () => {
    // notify;
    let address = inputRef.current?.value;
    if (!address) {
      dangerToast('invalid address');
      return false;
    }
    // 한글 이면 막음
    if (!/^[A-Za-z0-9+]*$/.test(address)) {
      dangerToast('invalid address');
      return false;
    }
    // 40자리이면 0x추가
    if (!/^[0-9]*$/.test(address) && address.length === 40) {
      address = '0x' + address;
    }
    if (!(address.length === 42)) {
      dangerToast('invalid address');
      return false;
    }
    // 0xEa26ABcF9A7d1d851745AF1aeF707BAC02dA0bEB
    const str = address.substr(0, 2);
    if (str !== '0x') {
      dangerToast('invalid address');
      return false;
    }

    const res = await faucetApi.faucet({ address });
    if (res.status === 400 && res.data.status === 'success') {
      dangerToast(res.data.result);
      return false;
    }
    if (res.status === 200 && res.data.status === 'success') {
      successToast(res.data.result);
    } else {
      dangerToast('invalid address');
    }
  }, []);
  return (
    <Wrapper>
      <h1>ENTROPY Smart Chain Faucet</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="input your Entropy Smart Chain address.."
          ref={inputRef}
        />
        <div className="ent-info">0.5 ENT</div>
        <button type="button" onClick={() => getFaucet()}>
          SEND
        </button>
      </div>
      <ToastContainer
        style={{ width: 'auto', textAlign: 'center', whiteSpace: 'break-spaces' }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-weight: 500;
    font-size: 2em;
  }
  .input-box {
    max-width: 800px;
    width: 90%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 100px;
    input {
      flex: 1;
      border: 1px solid #848484;
      height: 100%;
      padding: 0 10px;
    }
    div.ent-info {
      padding: 0 10px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #848484;
    }
    button {
      padding: 0 10px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #848484;
      font-size: 16px;
    }
  }
`;
export default Faucet;
