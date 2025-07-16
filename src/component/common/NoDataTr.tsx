import { FC } from 'react';
import styled from 'styled-components';

interface NoDataTrProps {
  colspan: number;
  text: string;
}

const NoDataTr: FC<NoDataTrProps> = ({ colspan, text }) => {
  return (
    <tr>
      <td colSpan={colspan} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <NoDataBox>{text}</NoDataBox>
      </td>
    </tr>
  );
};

const NoDataBox = styled.div`
  width: 100%;
  padding: 25px 40px;
  text-align: left;

  background: #f6e7c7;
  border-radius: 5px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #b57b00;
`;

export default NoDataTr;
