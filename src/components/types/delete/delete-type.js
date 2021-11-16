import React from 'react';
import {useParams} from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
  GRAPHQL_TARGETS
} from '@commercetools-frontend/constants';
import {Text} from '@commercetools-frontend/ui-kit';
import IconButton from '@commercetools-uikit/icon-button';
import Spacings from '@commercetools-uikit/spacings';
import { BinLinearIcon } from '@commercetools-uikit/icons';
import { useMcMutation } from '@commercetools-frontend/application-shell';
import { ConfirmationDialog } from '@commercetools-frontend/application-components';
import { useShowSideNotification } from '../../../hooks';
import DeleteTypeMutation from './delete-type.ctp.graphql';

import messages from './messages';

const DeleteType = (props) => {
  const { push } = useHistory();
  const intl = useIntl();
  const { project } = useApplicationContext();
  const {id} = useParams()
  const backToList=`/${project.key}/mc-types-editor/types`;
  const showSuccessNotification = useShowSideNotification(
    NOTIFICATION_KINDS_SIDE.success,
    messages.deleteSuccess
  );
  const showErrorNotification = useShowNotification({
    kind: NOTIFICATION_KINDS_SIDE.error,
    domain: DOMAINS.SIDE,
  });

  const [deleteType] = useMcMutation(DeleteTypeMutation, {    
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
    onCompleted(result) {
      showSuccessNotification();
      push(backToList);
    },
    onError({ message }) {
      showErrorNotification({
        text: (
          <FormattedMessage {...messages.deleteError} values={{ message }} />
        ),
      });
    },
  });
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = React.useState(false);
  let openConfirmationDialog = () => {
    setDeleteConfirmationDialogOpen(true);
  };
  let closeConfirmationDialog = () => {
    setDeleteConfirmationDialogOpen(false);
  };
  function confirmDelete() {
    return deleteType({
      variables: {         
        id: props.typeId,
        version: props.typeVersion
      }
    });
  }

  return (
    <Spacings.Inline alignItems="flexEnd">
        <IconButton
            label={intl.formatMessage(
            messages.confirmDeleteTitle
            )}
            icon={<BinLinearIcon />}
            onClick={openConfirmationDialog}
        />
        <ConfirmationDialog
            title="Confirm Delete Dialog"
            isOpen={deleteConfirmationDialogOpen}
            onClose={closeConfirmationDialog}
            onCancel={closeConfirmationDialog}
            onConfirm={confirmDelete}
        >
            <Spacings.Stack scale="m">
            <Text.Body>
                <FormattedMessage
                {...messages.confirmDeleteMessage} />
            </Text.Body>
            </Spacings.Stack>
        </ConfirmationDialog>
    </Spacings.Inline>
  );
};
DeleteType.displayName = 'DeleteType';

export default DeleteType;
