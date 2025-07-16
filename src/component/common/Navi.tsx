import { Slant as Hamburger } from 'hamburger-react';
import { FC, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SearchBoxHome from './SearchBoxHome';

import { Mobile, PC } from './MediaQuery';

const Navi: FC = () => {
  const [sideMenuState, setSideMenuState] = useState(false);

  const locale = useLocation();
  useEffect(() => {
    setSideMenuState(false);
    document.body.style.overflow = 'auto';
  }, [locale.pathname]);
  return (
    <Header>
      <div className="top">
        <Link to={'/'} className="logo">
          <img src="/images/img_logo.svg" alt="icoLogo" />
        </Link>
        <PC>{locale.pathname !== '/' ? <SearchBoxHome /> : <NaviComponent />}</PC>

        <Mobile>
          <div className="side-menu">
            <Hamburger
              toggled={sideMenuState}
              onToggle={(toggled) => {
                if (toggled) {
                  setSideMenuState(!sideMenuState);
                  document.body.style.overflow = 'hidden';
                } else {
                  setSideMenuState(!sideMenuState);
                  document.body.style.overflow = 'auto';
                }
              }}
              color={'#fff'}
              size={20}
            />
          </div>
        </Mobile>
      </div>
      {locale.pathname !== '/' && (
        <div className="nav">
          <Mobile>
            {' '}
            <SearchBoxHome />
          </Mobile>
          <PC>
            <ul>
              <NaviComponent />
              {/* <Mobile>
          <button
            onClick={() => setSideMenuState(!sideMenuState)}
            type="button"
            className="btn-sidemenu"
          />
        </Mobile> */}
            </ul>
          </PC>
        </div>
      )}
      <Mobile>
        <SideMenu className={sideMenuState ? 'active' : ''}>
          <h3 className="title">Menu</h3>
          <ul>
            <NaviComponent />
          </ul>
        </SideMenu>
      </Mobile>
    </Header>
  );
};

const NaviComponent = () => {
  return (
    <>
      <NaviDropdownComponent link=""></NaviDropdownComponent>
      <NaviDropdownComponent
        link="transactions"
        menu={[
          { link: 'tx/txns', title: 'View Txns' },
          {
            link: 'tx/internal',
            title: 'View Contract Internal Txns',
          },
          { link: 'tx/pending', title: 'View Pending Txns' },
        ]}
      ></NaviDropdownComponent>
      <NaviDropdownComponent link="blocks"></NaviDropdownComponent>
      {/* <NaviDropdownComponent
  link="validators"
  menu={[
    {
      link: 'validators',
      title: 'Validators Leaderboard',
    },
    {
      link: 'validators/setinfo',
      title: 'Validators Set Info',
    },
  ]}
></NaviDropdownComponent>
<NaviDropdownComponent
  link="accounts"
  menu={[
    { link: 'accounts', title: 'Top Accounts' },
    {
      link: 'accounts/contracts',
      title: 'Verified contracts',
    },
  ]}
></NaviDropdownComponent> */}
      <NaviDropdownComponent
        link="tokens"
        menu={[
          // { link: 'tokens', title: 'BEP-20 Tokens By MarketCap' },
          {
            link: 'tokens/rank20',
            title: 'BEP-20 Top Tokens',
          },
          {
            link: 'tokens/transfers20',
            title: 'BEP-20 Token Transfers',
            border: true,
          },
          {
            link: 'tokens/rank721',
            title: 'ERC-721 Top Tokens',
          },
          {
            link: 'tokens/transfers721',
            title: 'ERC-721 Token Transfers',
            border: true,
          },
          {
            link: 'tokens/rank1155',
            title: 'ERC-1155 Top Tokens',
          },
          {
            link: 'tokens/transfers1155',
            title: 'ERC-1155 Token Transfers',
          },
        ]}
      ></NaviDropdownComponent>
    </>
  );
};

const SideMenu = styled.div`
  position: fixed;
  left: 0;
  z-index: 3000;
  width: 100%;
  height: 100vh;
  top: 0px;
  background-color: ${({ theme }) => theme.colors.primary.primary9_bg};
  padding: 80px 24px 0 24px;
  transform: translateX(100%);
  transition: 300ms transform;
  &.active {
    transform: translateX(0%);
    transition: 300ms transform;
  }
  > .title {
    font-weight: 800;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray3};
  }
  ul {
    width: 100%;
    padding: 32px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 24px;
  }
`;

interface NaviDropdownComponentProps {
  link: string;
  menu?: Array<{ link: string; title: string; border?: boolean }>;
}

const NaviDropdownComponent: FC<NaviDropdownComponentProps> = ({ link, menu }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const locale = useLocation();
  useEffect(() => {
    setDropdownState(false);
  }, [locale.pathname]);
  return (
    <Li dropdownState={dropdownState}>
      <NavLink
        to={`/${link}`}
        className={({ isActive }) => {
          return isActive ? 'active' : undefined;
        }}
        onClick={(e) => {
          if (menu) {
            e.preventDefault();
            setDropdownState(!dropdownState);
            return false;
          }
        }}
      >
        <span className="link-title">{link || 'Home'}</span>
        {menu && <div className="dropdown-arrow"></div>}
      </NavLink>
      <PC>
        {menu && (
          <div className="dropdown-box pc">
            {menu.map((c, i) => {
              return (
                <NavLink
                  key={i}
                  to={'/' + c.link}
                  // className={c.border ? 'border' : undefined}
                  className={({ isActive }) => {
                    let str = '';

                    if (c.border) {
                      str += 'border ';
                    }

                    if (isActive) {
                      str += 'active';
                    }

                    return str;
                  }}
                >
                  <span>{c.title}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </PC>
      <Mobile>
        {menu && (
          <div className="dropdown-box">
            {menu.map((c, i) => {
              return (
                <NavLink
                  key={i}
                  to={'/' + c.link}
                  // className={c.border ? 'border' : undefined}
                  className={({ isActive }) => {
                    let str = '';

                    if (c.border) {
                      str += 'border ';
                    }
                    if (isActive) {
                      str += 'active';
                    }

                    return str;
                  }}
                >
                  <span>{c.title}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </Mobile>
    </Li>
  );
};

interface LiProps {
  dropdownState: boolean;
}

const Li = styled.li<LiProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ theme }) => theme.media.tablet`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `}

  span.link-title {
    ${(props) =>
      props.dropdownState &&
      css`
        ${({ theme }) => theme.media.tablet`
              color: #fff !important;
        `}
      `}
  }

  .dropdown-arrow {
    ${(props) =>
      props.dropdownState &&
      css`
        ${({ theme }) => theme.media.tablet`
          background-size: cover;
          transform: rotate(180deg);
          background-image: url(/images/icon/ico_dropdown_navi_w.svg) !important;
        `}
      `}
  }
  .dropdown-box {
    position: absolute;
    z-index: 100;
    right: 0;
    top: calc(100%);
    background: ${({ theme }) => theme.colors.primary.primary9_bg};
    border-radius: 8px;
    width: 248px;
    padding: 8px 16px;
    /* display: flex; */
    display: none;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    ${({ theme, dropdownState }) =>
      dropdownState &&
      theme.media.tablet`
      position:relative;
      display: flex;
      width:100%;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 16px 0;
      padding-left:32px;
    `}
    > a {
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray3};
      text-decoration: none;
      width: 100%;
      text-align: right;
      span {
        padding: 4px 8px;
        width: 100%;
        height: 100%;
        display: block;
      }
      &.active {
        color: #fff;
      }
      ${({ theme }) => theme.media.tablet`
        text-align:left;
          padding:6px 0;
          font-size: 16px;
          // color: ${theme.colors.primary.primary1};
        `}
      &:hover {
        span {
          background: ${({ theme }) => theme.colors.primary.primary10};
          border-radius: 4px;
        }
      }

      &.border {
        padding-bottom: 20px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray5};
        margin-bottom: 12px;

        &::after {
          content: '';
          width: 12px;
          height: 2px;
          background: ${({ theme }) => theme.colors.gray.gray4};
          margin-top: 16px;
          margin-bottom: 4px;
          margin-left: 8px;
          display: none;
        }

        ${({ theme }) => theme.media.tablet`
          padding-bottom: 0px;
          border-bottom: none;
          margin-bottom: 0px;
          display:flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction:column;
          &::after {
          display: block;
        }
        `}
      }
    }
  }

  &:hover {
    .dropdown-box.pc {
      display: flex;
    }
    span.link-title {
      color: #fff;
      border-bottom: 2px solid #fff;
      font-weight: 600;
      ${({ theme }) => theme.media.tablet`
      border-bottom: none;
        `}
    }
    .dropdown-arrow {
      background-size: cover;
      transform: rotate(180deg);
      background-image: url(/images/icon/ico_dropdown_navi_w.svg);
    }
  }

  > a,
  button {
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    font-weight: 400;
    ${({ theme }) => theme.media.tablet`
      width:100%;
      justify-content: space-between;
      padding: 0;
    `}

    > span.link-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray3};
      padding-top: 2px;
      text-transform: capitalize;
      ${({ theme }) => theme.media.desktop`
        border-bottom: 2px solid ${theme.colors.primary.primary9_bg}
      `};
      ${({ theme }) => theme.media.tablet`
        font-weight: 800;
        font-size: 24px;
      `};
    }

    > .dropdown-arrow {
      width: 16px;
      height: 16px;
      background-image: url(/images/icon/ico_dropdown_navi.svg);
      background-size: cover;
    }

    &.active {
      span.link-title {
        ${({ theme }) => theme.media.desktop`
        border-bottom: 2px solid #fff;
        color: #fff;
        font-weight: 600;
      `}
      }
    }
  }

  button {
    padding: 0;
  }
`;

const Header = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary.primary9_bg};
  .side-menu {
    position: absolute;
    top: -4px;
    right: 4px;
  }
  > .top {
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray5};
    position: relative;
    z-index: 3500;
    padding: 0 24px;
    ${({ theme }) => theme.media.tablet`
    height: 40px;
      padding:0 16px;
  `}
    > a.logo {
      width: 133px;
      margin-right: auto;

      ${({ theme }) => theme.media.tablet`
        width: 85px;
    `}
      > img {
        width: 100%;
      }
    }
  }
  > .nav {
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${({ theme }) => theme.media.tablet`
    height: 40px;
  `}
    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;

      button.btn-sidemenu {
        width: 24px;
        height: 24px;
        background-image: url(/images/icon/ico_sidemenu.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 16px;
        ${({ theme }) => theme.media.tablet`
        width: 16px;
        height: 16px;
  `}
      }
    }
  }
`;

export default Navi;
