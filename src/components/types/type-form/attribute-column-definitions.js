import memoize from 'memoize-one';
import messages from './attribute-messages';

export default memoize(formatMessage => [
  {
    key: 'name',
    label: formatMessage(messages.columnAttributeName),
    isSortable: false,
  },
  {
    key: 'label',
    label: formatMessage(messages.columnAttributeLabel),
    isSortable: false,
    width: 'minmax(150px, auto)',
  },
  {
    key: 'required',
    label: formatMessage(messages.columnAttributeRequired),
    flexGrow: 1,
    isSortable: false,
  },
  {
    key: 'type',
    label: formatMessage(messages.columnAttributeType),
    flexGrow: 1,
    isSortable: false,
  },
  {
    key: 'delete',
    label: '',
    flexGrow: 1,
    isSortable: false,
  },
]);
