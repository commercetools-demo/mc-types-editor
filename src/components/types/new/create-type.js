import React from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormattedMessage, useIntl } from 'react-intl';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
  GRAPHQL_TARGETS
} from '@commercetools-frontend/constants';
import Spacings from '@commercetools-uikit/spacings';
import BackToList from '../../core/back-to-list';
import TabContainer from '../../core/tab-container';
import View from '../../core/view';
import ViewHeader from '../../core/view-header';
import { useShowSideNotification } from '../../../hooks';
import TypeForm from '../type-form';
import CreateTypeMutation from '../create-type.ctp.graphql';
import { useMcMutation } from '@commercetools-frontend/application-shell';
import { useHistory } from 'react-router-dom';

import messages from './messages';

const CreateType = () => {
  const { push } = useHistory();
  const intl = useIntl();
  const { project } = useApplicationContext();
  const backToList=`/${project.key}/mc-types-editor/types`;
  const showSuccessNotification = useShowSideNotification(
    NOTIFICATION_KINDS_SIDE.success,
    messages.createSuccess
  );
  const showErrorNotification = useShowNotification({
    kind: NOTIFICATION_KINDS_SIDE.error,
    domain: DOMAINS.SIDE,
  });
  const [createType] = useMcMutation(CreateTypeMutation, {    
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    onCompleted() {
      showSuccessNotification();
      push(backToList);
    },
    onError({ message }) {
      showErrorNotification({
        text: (
          <FormattedMessage {...messages.createError} values={{ message }} />
        ),
      });
    },
  });

  function onSubmit(values) {
    const { key, name, resourceTypeIds } = values;

    console.log('submit',key,name,resourceTypeIds);
    // Convert name from the format created by the text field to the format required by GraphQL
    let names=[];
    for(const k in name) {
      names.push({"locale":k,"value":name[k]})
    }

    return createType({
      variables: {         
        key,
        name: names,
        resourceTypeIds: resourceTypeIds
      }
    });
  }

  return (
    <View>
      <ViewHeader
        title={<FormattedMessage {...messages.title} />}
        backToList={
          <BackToList
            href={backToList}
            label={intl.formatMessage(messages.backButton)}
          />
        }
      />
      <TabContainer>
        <Spacings.Stack scale="m">
          <TypeForm onSubmit={onSubmit} />
        </Spacings.Stack>
      </TabContainer>
    </View>
  );
};
CreateType.displayName = 'CreateType';

export default CreateType;
