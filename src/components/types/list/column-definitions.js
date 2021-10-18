import memoize from 'memoize-one';
import messages from './messages';

export default memoize(formatMessage => [
  {
    key: 'name',
    label: formatMessage(messages.columnTypeName),
    isSortable: true,
  },
  {
    key: 'description',
    label: formatMessage(messages.columnTypeDescription),
    isSortable: true,
    width: 'minmax(150px, auto)',
  },
  {
    key: 'key',
    label: formatMessage(messages.columnTypeKey),
    flexGrow: 1,
    isSortable: true,
  },
  {
    key: 'resourceTypeIds',
    label: formatMessage(messages.columnResourceTypeIds),
    flexGrow: 1,
  },
  {
    key: 'fieldCount',
    label: formatMessage(messages.columnFieldCount),
    flexGrow: 1,
    align: 'center',
  },
  {
    key: 'createdAt',
    label: formatMessage(messages.columnCreatedAt),
    flexGrow: 1,
    isSortable: true,
  },
  {
    key: 'lastModifiedAt',
    label: formatMessage(messages.columnLastModifiedAt),
    flexGrow: 1,
    isSortable: true,
  },
]);
