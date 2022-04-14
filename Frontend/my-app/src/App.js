import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import WorkspacesScreen from './Screens/WorkspacesScreen';
import MainScreen from './Screens/MainScreen';
import SettingsScreen from './Screens/SettingsScreen';
import UsersScreen from './Screens/UsersScreen';
import RolesScreen from './Screens/RolesScreen';
import UserAnalyticsScreen from './Screens/UserAnalyticsScreen';
import Layout from './Components/Layout';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path={"/"} component= {MainScreen} />
        <Layout>
          <Route path={"/login"} component = {LoginScreen} />
          <Route path={"/register"} component = {RegisterScreen} />
          <Route path={"/workspaces"} component = {WorkspacesScreen} />
          <Route path={"/settings"} component = {SettingsScreen} />
          <Route path={"/users"} component = {UsersScreen} />
          <Route path={"/setRole/:userId"} component = {RolesScreen} />
          <Route path={"/analytics"} component = {UserAnalyticsScreen} />
        </Layout>
      </Switch>
    </HashRouter>
  );
}

export default App;
