import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import sizes from '@/config/breakpoint';

const GlobalStyle = createGlobalStyle`
    
    ${reset}


body{
  font-family: 'Inter', sans-serif;
  background-color:#f1f1f1;
  -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
  @media only screen and (min-width: ${sizes.tablet}px) {
    overflow:auto !important ;
  }
  >#root{
  min-height:100vh;
  padding-bottom:100px;
  position: relative;
  
  }
}

*{
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

button{
  cursor:pointer;
  padding: 0;
  font-family: 'Inter', sans-serif;
  &:active,&:focus{
    outline:none;
  }
    background-color:transparent;
    border:none;
}

input{
  background-color: transparent;
    border: none;
    outline: none;
    &::placeholder{
  font-family: 'Inter', sans-serif;
    }
}

a{
  text-decoration:none ;
}
`;

export default GlobalStyle;
