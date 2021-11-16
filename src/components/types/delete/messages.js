import { defineMessages } from 'react-intl';

export default defineMessages({
  confirmDeleteTitle: {
    id: 'DeleteType.message.delete.title',
    description: 'Confirm Delete',
    defaultMessage: 'Delete Type',
  },
  confirmDeleteMessage: {
    id: 'DeleteType.message.delete.confirm',
    description: 'Message of the confirmation dialog for deleting product type',
    defaultMessage:
      'Are you sure you want to delete this type? This action cannot be undone.',
  },
  deleteSuccess: {
    id: 'DeleteType.form.message.success',
    description: 'Success message for delete',
    defaultMessage: 'Your Type has been deleted.',
  },
  deleteError: {
    id: 'DeleteType.message.delete.error',
    description: 'Error message for creating type',
    defaultMessage:
      'Something went wrong. The Type was not deleted. {message}',
  },
});
