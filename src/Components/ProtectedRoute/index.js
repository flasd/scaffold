import ProtectedRoute from './ProtectedRoute';
import withAuth from '../withAuth/withAuth';

export default withAuth()(ProtectedRoute);
