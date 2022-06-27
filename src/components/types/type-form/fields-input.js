import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DataTable from '@commercetools-uikit/data-table';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { CheckActiveIcon, CheckInactiveIcon, BinFilledIcon, PlusBoldIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import { FocusEventHandler, ChangeEventHandler } from 'react';
import { filterDataFields, warning } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import Text from '@commercetools-uikit/text';
import FieldDefinitionInput from '../field-definition-input';
import createColumnDefinitions from './field-column-definitions';
import messages from './field-messages';

const FieldInput = (props) => {
    const intl = useIntl();
    let fields = props.value;
    let editField = null;
    let addField = null;

    const [FieldDefinitionInputOpen, setFieldDefinitionInputOpen] = useState(false);
    
    const [FieldDefinitionInputData, setFieldDefinitionInputData] = useState();

    const deleteItem = (name) => {
        let newSet = fields.filter((item) => item.name !== name);
        props.onChange("fieldDefinitions", newSet);
    }
    const updateFieldDefinition = (FieldDefinition) => {
        let newSet = fields.concat([FieldDefinition]);
        setFieldDefinitionInputOpen(false)
        props.onChange("fieldDefinitions", newSet);
    }

    const rowClick = (row, rowIndex, columnKey) => {
        if (columnKey === 'delete') {
            deleteItem(row.name);
        }
        return;
    }

    const itemRendered = (item, column) => {
        switch (column.key) {
            case 'name':
                return item.name;
            case 'label':
                return item.label.en;
            case 'required':
                if (item.required) {
                    return <CheckActiveIcon />;
                }
                else {
                    return <CheckInactiveIcon />;
                }
            case 'type':
                if (item.type.referenceTypeId) {
                    return `${item.type.name} (${item.type.referenceTypeId})`;
                }
                if (item.type.elementType) {
                    return `${item.type.name} (${item.type.elementType.name})`;
                }
                return item.type.name;
            case 'delete':
                return <IconButton label="" icon={<BinFilledIcon />} />;
            default:
                return item[column.key] || '';
        }
      };
    return (
        <>
            <div style={{ display: 'block', width: '100%' }}>
            <FieldDefinitionInput
                isOpen={FieldDefinitionInputOpen}
                onClose={() => {setFieldDefinitionInputOpen(false)}}
                onSubmit={updateFieldDefinition}
                existingFieldDefinition={ FieldDefinitionInputData} />
            <Spacings.Stack scale="m">
                <Spacings.Inline justifyContent="space-between">
                <Text.Headline as="h3" intlMessage={messages.fieldHeaderTitle} />
                <SecondaryButton
                    onClick={() => {setFieldDefinitionInputOpen(true)}}
                    iconLeft={<PlusBoldIcon />}
                    label={intl.formatMessage(messages.addField)}
                />
                </Spacings.Inline>
                <DataTable
                    columns={createColumnDefinitions(intl.formatMessage)}
                    isCondensed={false}
                    rows={fields}
                    itemRenderer={itemRendered}
                    onRowClick={rowClick}
                />
                </Spacings.Stack>
            </div>
        </>
    );
};

FieldInput.displayName = 'FieldInput';
FieldInput.propTypes = {
    id: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
};

export default FieldInput;