import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BarChartIcon from '@material-ui/icons/BarChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import NotificationPopperContainer from '../containers/NotificationPopperContainer';
import DashboardPage from '../pages/DashboardPage';
import ManagementPage from '../pages/ManagementPage';
import NotificationPage from '../pages/NotificationPage';
import HistoryDataPage from '../pages/HistoryDataPage';
import MaterialPage from '../pages/MaterialPage';
import styles from '../assets/jss/components/NavigationBarStyle';

const history = createBrowserHistory();

const useStyles = makeStyles(styles);

export default function NavigationBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flex: '1 1 90% ' }} variant='h6' noWrap>
            Brewguru
          </Typography>
          <NotificationPopperContainer />
        </Toolbar>
      </AppBar>
      <Router history={history}>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to='/dashboard' key={'Dashboard'}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'대시보드'} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/management'
              key={'Management'}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'설정 및 관리'} />
            </ListItem>
            <ListItem button component={Link} to='/history' key={'History'}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={'히스토리 데이터'} />
            </ListItem>
            <ListItem button component={Link} to='/material' key={'Material'}>
              <ListItemIcon>
                <BubbleChartIcon />
              </ListItemIcon>
              <ListItemText primary={'원료 투입 기록'} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/notification'
              key={'Notification'}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary={'알림 기록'} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={DashboardPage} />
            <Route exact path='/dashboard' component={DashboardPage} />
            <Route exact path='/management' component={ManagementPage} />
            <Route exact path='/history' component={HistoryDataPage} />
            <Route exact path='/notification' component={NotificationPage} />
            <Route exact path='/material' component={MaterialPage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
