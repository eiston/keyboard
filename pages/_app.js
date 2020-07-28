/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function App({Component, pageProps}) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return ( <React.Fragment>
    <Head>
      <title>KEYSCONSTENT</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="heart">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1}}>
          </Typography>
          <Button color="inherit">Issues</Button>
          <IconButton
            color="inherit"
            aria-label="cart">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="profile">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Component {...pageProps} />
    </ThemeProvider>
  </React.Fragment>);
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
