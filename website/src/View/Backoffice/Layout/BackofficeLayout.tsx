import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { IBackofficeLayoutProps } from './IBackofficeLayoutProps';
import { IBackofficeLayoutState } from './IBackofficeLayoutState';
import { BackofficeLayoutStyles } from './Styles/BackofficeLayoutStyles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter, Link } from 'react-router-dom';

class BackofficeLayout extends React.Component<IBackofficeLayoutProps, IBackofficeLayoutState> {
  private settingsAnchorRef?: HTMLElement;

  public constructor(props: IBackofficeLayoutProps) {
    super(props);

    this.state = {
      menuSettingsOpen: false
    }
  }

  private handleAccountClick(e: React.MouseEvent<HTMLElement>): void {
    this.settingsAnchorRef = e.currentTarget;

    this.setState({
      menuSettingsOpen: true,
    });
  }

  private handleSettingsMenuClose(): void {
    this.settingsAnchorRef = undefined;

    this.setState({
      menuSettingsOpen: false,
    });
  }

  private handleEditRestaurantClick(): void {
    this.props.history.push('/backoffice/restaurant/edit');
  }

  private handleSignout(): void {
    this.props.history.push('/backoffice/login');
  }

  public render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                <Link to="/backoffice" className={classes.linkTitle}>Backoffice</Link>
            </Typography>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={(e) => this.handleAccountClick(e) }
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
          <Menu
              anchorEl={this.settingsAnchorRef}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id="primary-search-account-menu"
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={this.state.menuSettingsOpen}
              onClose={() => this.handleSettingsMenuClose()}
            >
              <MenuItem onClick={() => this.handleEditRestaurantClick()}>Restaurant Settings</MenuItem>
              <MenuItem onClick={() => this.handleSignout()}>Sign out</MenuItem>
            </Menu>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles(BackofficeLayoutStyles)(BackofficeLayout));
