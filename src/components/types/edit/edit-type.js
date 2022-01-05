import React from 'react';
import {useParams} from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE
} from '@commercetools-frontend/constants';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import { actions as sdkActions, useAsyncDispatch } from "@commercetools-frontend/sdk";
import { createSyncTypes } from '@commercetools/sync-actions'
import BackToList from '../../core/back-to-list';
import View from '../../core/view';
import ViewHeader from '../../core/view-header';
import { useShowSideNotification } from '../../../hooks';
import TypeForm from '../type-form';
import DeleteType from '../delete';

import messages from './messages';

const EditType = (props) => {
  const { push } = useHistory();
  const intl = useIntl();
  const { project } = useApplicationContext();
  const asyncDispatch = useAsyncDispatch();
  const {id} = useParams()
  const backToList=`/${project.key}/mc-types-editor/types`;
  const showSuccessNotification = useShowSideNotification(
    NOTIFICATION_KINDS_SIDE.success,
    messages.createSuccess
  );
  const showErrorNotification = useShowNotification({
    kind: NOTIFICATION_KINDS_SIDE.error,
    domain: DOMAINS.SIDE,
  });
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState({});
 
  React.useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await asyncDispatch(sdkActions.get({
          service: 'types',
          options: {
            id: id
          }
        }));
        setData(response);
      } catch (error) {
        console.log(error);
        setError(true);
        showApiErrorNotification({ errors: error });
      }
      setLoading(false);
    };
    fetchData()
  }, []);

  async function submitUpdateActions(updateActions) {
    setError(false);
    setLoading(true);
    try {
      const response = await asyncDispatch(sdkActions.post({
        service: 'types',
        options: {
          id: id
        },
        payload: { version: data.version, actions: updateActions },
      }));
      setData(response);
    } catch (error) {
      console.log(error);
      setError(true);
      showApiErrorNotification({ errors: error });
    }
    setLoading(false);
  }
  function onSubmit(values) {
    const { name, description, fieldDefinitions } = values;
    console.log(values);
    const syncTypes = createSyncTypes()
    let newData = {
      ...data,
      name,
      description,
      fieldDefinitions
    }
    const actions = syncTypes.buildActions(newData, data);
    // Submit Updates
    submitUpdateActions(actions);
  }

  return (
    <View>
      {loading && <LoadingSpinner />}
      {error && <div>{JSON.stringify(error)}</div>}
      {data?.id ? (
        <>
          <ViewHeader
            title={<FormattedMessage {...messages.title} />}
            backToList={
              <BackToList
                href={backToList}
                label={intl.formatMessage(messages.backButton)}
              />
            }
            commands={
              <DeleteType typeId={id} typeVersion={data.version} />
            }
          />
          <Spacings.Inset scale="l">
            <Spacings.Stack scale="m">
              <TypeForm onSubmit={onSubmit} type={data} />
            </Spacings.Stack>
          </Spacings.Inset>
        </>
      ) : null}
      
    </View>
  );
};
EditType.displayName = 'EditType';

export default EditType;
