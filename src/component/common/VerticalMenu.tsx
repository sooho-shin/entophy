import { useMemo, useState } from 'react';
import styled from 'styled-components';
import button from '/images/icon/ico_menu_vertical.svg';
import balance from '/images/icon/ico_balance.svg';
import add from '/images/icon/ico_plus.svg';
import tag from '/images/icon/ico_tagname.svg';
import label from '/images/icon/ico_label.svg';
import report from '/images/icon/ico_report.svg';
import approval from '/images/icon/ico_token_approval.svg';

type MenuProps = {
  except: string;
};

const VerticalMenu = ({ except }: MenuProps) => {
  const [isOpened, setOpened] = useState(false);
  const menuList: (
    | {
        lined: { id: string; img: string; title: string; lined: boolean }[];
        default?: undefined;
      }
    | { default: { id: string; img: string; title: string }[]; lined?: undefined }
  )[] = useMemo(
    () => [
      {
        lined: [
          { id: 'c', img: balance, title: 'Check Previous Balance', lined: true },
          { id: 'a', img: add, title: 'Add token to web3 wallet', lined: true },
        ],
      },
      {
        default: [
          { id: 'u', img: tag, title: 'Update Name Tag' },
          { id: 's', img: label, title: 'Submit Label' },
          { id: 'r', img: report, title: 'Report/Flag Address' },
          { id: 't', img: approval, title: 'Token Approvals' },
        ],
      },
    ],
    [],
  );

  const makeListItem = (
    item:
      | { id: string; img: string; title: string; lined: boolean }
      | { id: string; img: string; title: string },
  ) => {
    return (
      item.id !== except && (
        <li>
          <button type="button">
            <img src={item.img} alt="icon" />
            <span>{item.title}</span>
          </button>
        </li>
      )
    );
  };

  return (
    <VerticalMenuButtonBox>
      <Button onClick={() => setOpened(!isOpened)} />
      {isOpened && (
        <MenuBox>
          <div className="lined">
            {menuList[0].lined &&
              menuList[0].lined.map(
                (v: { id: string; img: string; title: string; lined: boolean }) =>
                  makeListItem(v),
              )}
          </div>
          {menuList[1].default &&
            menuList[1].default.map((v: { id: string; img: string; title: string }) =>
              makeListItem(v),
            )}
        </MenuBox>
      )}
    </VerticalMenuButtonBox>
  );
};

const VerticalMenuButtonBox = styled.div`
  position: relative;
  justify-self: flex-end;
  margin-left: auto;
`;
const Button = styled.button`
  width: 16px;
  height: 16px;
  background: url(${button}) center no-repeat;
  background-size: contain;
`;

const MenuBox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 4px;
  position: absolute;
  width: 240px;
  height: auto;
  top: 25px;
  right: -30px;
  background: ${({ theme }) => theme.colors.gray.white};
  box-shadow: 0px 1px 12px rgba(28, 13, 44, 0.15);
  border-radius: 8px;
  li {
    button {
      display: flex;
      align-items: center;
      padding: 8px;
      font-weight: 400;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray.gray3};
      img {
        margin-right: 5px;
      }
    }
  }
  .lined {
    li {
      &:last-of-type {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray1};
      }
    }
  }
`;

export default VerticalMenu;
