import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import WorkspacesScreen from './Screens/WorkspacesScreen';
import WorkspaceScreen from './Screens/WorkspaceScreen';
import JobsScreen from './Screens/JobsScreen';
import JobScreen from './Screens/JobScreen';
import WorkspaceCreateScreen from './Screens/WorkspaceCreateScreen';
import JobCreateScreen from './Screens/JobCreateScreen';
import MainScreen from './Screens/MainScreen';
import SettingsScreen from './Screens/SettingsScreen';
import UsersScreen from './Screens/UsersScreen';
import RolesScreen from './Screens/RolesScreen';
import UserAnalyticsScreen from './Screens/UserAnalyticsScreen';
import TrendsScreen from './Screens/TrendsScreen';
import Layout from './Components/Layout';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path={"/"} component= {MainScreen} />
        <Route path={"/login"} component = {LoginScreen} />
        <Route path={"/register"} component = {RegisterScreen} />
        <Layout>
          <Route path={"/workspaces"} component = {WorkspacesScreen} />
          <Route path={"/workspace/:workspaceId"} component = {WorkspaceScreen} />
          <Route path={"/workspacecreate"} component = {WorkspaceCreateScreen} />
          <Route path={"/jobs/:workspaceId"} component = {JobsScreen} />
          <Route path={"/job/:jobId"} component = {JobScreen} />
          <Route path={"/jobcreate/:workspaceId"} component = {JobCreateScreen} />
          <Route path={"/settings"} component = {SettingsScreen} />
          <Route path={"/users"} component = {UsersScreen} />
          <Route path={"/setRole/:userId"} component = {RolesScreen} />
          <Route path={"/analytics"} component = {UserAnalyticsScreen} />
          <Route path={"/trends/:workspaceId"} component = {TrendsScreen} />
        </Layout>
      </Switch>
    </HashRouter>
  );
}

export default App;
