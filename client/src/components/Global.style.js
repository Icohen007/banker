import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      font-family: 'Lato', sans-serif !important;
      font-size: 16px;;
      scroll-behavior: smooth;
    }
    
    *, *:before, *:after {
      box-sizing: inherit;
    }
    
    * {
     font-family: inherit;
    }
    
    body {
      font-family: 'Lato', sans-serif !important;
      font-size: 15px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
      width: 100%;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    
    
    
    #root {
      height: 100%;
      width: 100%;
    }
    
    h1, h2, h3 , h4 ,h5 ,h6 {
    margin: 0;
    }
    
    a, a:hover, a:focus, a:active  {
    text-decoration: none !important;
    }
    
    ul, li {
    margin: 0;
    padding: 0;
    }
    
    li {
    list-style-type: none;
    }
    
    .dropdown-control {
      width: 200px;
    }
    
    .dropdown-menu {
      width: 200px;
    }
`;

export default GlobalStyle;
