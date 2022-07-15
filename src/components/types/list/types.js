import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { useShowApiErrorNotification } from '@commercetools-frontend/actions-global';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import Link from '@commercetools-uikit/link';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import FetchTypesQuery from './fetch-types.ctp.graphql';
import messages from './messages';
import createColumnDefinitions from './column-definitions';

const Types = (props) => {
  const intl = useIntl();
  const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const showApiErrorNotification = useShowApiErrorNotification();
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const { project } = useApplicationContext();
  const { data, error, loading } = useMcQuery(FetchTypesQuery, {
    variables: {
      locale: dataLocale,
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  
  useEffect(() => {
    if (error) {
      showApiErrorNotification({
        errors:
          error.graphQLErrors.length > 0
            ? error.graphQLErrors
            : [{ message: error.message }],
      });
    }
  }, [error, showApiErrorNotification]);

  const [tableData, setTableData] = useState({
    columns: createColumnDefinitions(intl.formatMessage),
    visibleColumns: createColumnDefinitions(intl.formatMessage),
    visibleColumnKeys: createColumnDefinitions(intl.formatMessage).map((column) => column.key)
  });

  const itemRendered = (item, column) => {
    switch (column.key) {
      case 'resourceTypeIds':
        return item.resourceTypeIds.join(', ');
      case 'fieldCount':
        return item.fieldDefinitions.length;
      case 'createdAt':
        return `${intl.formatDate(item.createdAt)} ${intl.formatTime(item.createdAt)}`;
      case 'lastModifiedAt':
        return `${intl.formatDate(item.lastModifiedAt)} ${intl.formatTime(item.lastModifiedAt)}`;
      default:
        return item[column.key] || '';
    }
  };
  const tableSettingsChangeHandler = {
    ["columnsUpdate"]: (visibleColumnKeys) =>
      setTableData({
        ...tableData,
        visibleColumns: tableData.columns.filter((column) => visibleColumnKeys.includes(column.key)),
        visibleColumnKeys,
      })
  };

  // visibleColumnKeys: tableData.visibleColumnKeys,
  let columnManager = {
    disableColumnManager: false,
    hideableColumns: tableData.columns,
    visibleColumnKeys: tableData.visibleColumnKeys,
  };
  return (
    <Spacings.Inset scale="l">
      <Spacings.Stack scale="xl">
        <Spacings.Inline justifyContent="space-between">
          <Text.Headline as="h2" intlMessage={messages.title} />
          <SecondaryButton
            onClick={() => {
              push(`/${project.key}/mc-types-editor/types/new`);
            }}
            iconLeft={<PlusBoldIcon />}
            label={intl.formatMessage(messages.addType)}
          />
        </Spacings.Inline>

        {loading && <LoadingSpinner />}

        {data?.typeDefinitions && data?.typeDefinitions?.total == 0 ? (
          <Spacings.Stack scale="l">
            <div>
              <Text.Body intlMessage={messages.noResults} />
                <Link to='types/new'>
                  <FormattedMessage {...messages.addType} />
                </Link>
            </div>
          </Spacings.Stack>
        ) : null}

        {data?.typeDefinitions && data?.typeDefinitions?.total > 0 ? (
          <Spacings.Stack scale="l">
            
            <DataTableManager 
              columns={tableData.visibleColumns}
              columnManager={columnManager}
              onSettingsChange={(action, nextValue) => {
                tableSettingsChangeHandler[action](nextValue);
              }}
            >
              <DataTable
                isCondensed
                rows={data.typeDefinitions.results}
                itemRenderer={itemRendered}
                sortedBy={tableSorting.value.key}
                sortDirection={tableSorting.value.order}
                onSortChange={tableSorting.onChange}
                onRowClick={(row) => {
                  push(`/${project.key}/mc-types-editor/types/${row.id}`);
                }}
              />
            </DataTableManager>
            <Pagination
              page={page.value}
              onPageChange={page.onChange}
              perPage={perPage.value}
              onPerPageChange={perPage.onChange}
              totalItems={data.typeDefinitions.total}
            />
          </Spacings.Stack>
        ) : null}
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
Types.displayName = 'Types';

export default Types;
