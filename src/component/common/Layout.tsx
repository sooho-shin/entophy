import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Scroll from 'react-scroll';
import styled from 'styled-components';

import Footer from './Footer';
import Navi from './Navi';

const Layout = () => {
  const location = useLocation();
  const scroll = Scroll.animateScroll;
  const [ScrollY, setScrollY] = useState(0);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  }, []);

  useEffect(() => {
    scroll.scrollToTop({
      duration: 0,
    });
  }, [location.pathname]);
  return (
    <>
      <Navi />
      <Outlet />
      <Footer />
      {ScrollY !== 0 && (
        <ScrollTopButton
          type="button"
          onClick={() =>
            scroll.scrollToTop({
              duration: 500,
            })
          }
        />
      )}
    </>
  );
};

const ScrollTopButton = styled.button`
  width: 48px;
  height: 48px;

  position: fixed;
  font-size: 0;
  background-image: url(/images/icon/ico_scroll_up.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  right: 40px;
  bottom: 78px;
  ${({ theme }) => theme.media.tablet`
    left:calc(100% - 58px);
    top:calc(100% - 155px - 58px);
    bottom:unset;
    
  `}
`;

export default Layout;
