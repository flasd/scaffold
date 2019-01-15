import Scaffold from './Scaffold';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import withAuth from './Components/withAuth';
import withTheme from './Components/withTheme';
import history from './Services/history';

export {
  history,
  ProtectedRoute,
  PublicRoute,
  withAuth,
  withTheme,
};

export default Scaffold;
