import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import TypesList from './components/types/list';
import CreateType from './components/types/new';
import EditType from './components/types/edit';
import { PERMISSIONS } from './constants/constants';

const ApplicationRoutes = () => {
  const match = useRouteMatch();

  // We can evaluate the user permissions and use the information to restrict
  // certain parts of the application.
  // For example, we can show an unauthorized page if the user does not have
  // the permission to `view` products.
  const canViewChannels = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.View],
  });

  return (
      <Switch>        
        <Route path={`${match.path}/types/new`}>
          {canViewChannels ? (
            <CreateType />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route path={`${match.path}/types/:id`}>
          {canViewChannels ? (
            <EditType />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
        <Route >
          {canViewChannels ? (
            <TypesList />
          ) : (
            <PageUnauthorized />
          )}
        </Route>
      </Switch>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
