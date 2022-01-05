import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DataTable from '@commercetools-uikit/data-table';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { CheckActiveIcon, CheckInactiveIcon, BinFilledIcon, PlusBoldIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import { FocusEventHandler, ChangeEventHandler } from 'react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '@commercetools-uikit/input-utils';
import Text from '@commercetools-uikit/text';
import AttributeDefinitionInput from '../attribute-definition-input';
import createColumnDefinitions from './attribute-column-definitions';
import messages from './attribute-messages';

const AttributeInput = (props) => {
    const intl = useIntl();
    let attributes = props.value;
    let editAttribute = null;
    let addAttribute = null;

    const [attributeDefinitionInputOpen, setAttributeDefinitionInputOpen] = useState(false);
    
    const [attributeDefinitionInputData, setAttributeDefinitionInputData] = useState();

    const deleteItem = (name) => {
        let newSet = attributes.filter((item) => item.name !== name);
        props.onChange("fieldDefinitions", newSet);
    }
    const updateAttributeDefinition = (attributeDefinition) => {
        let newSet = attributes.concat([attributeDefinition]);
        setAttributeDefinitionInputOpen(false)
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
            <AttributeDefinitionInput
                isOpen={attributeDefinitionInputOpen}
                onClose={() => {setAttributeDefinitionInputOpen(false)}}
                onSubmit={updateAttributeDefinition}
                existingAttributeDefinition={ attributeDefinitionInputData} />
            <Spacings.Stack scale="m">
                <Spacings.Inline justifyContent="space-between">
                <Text.Headline as="h3" intlMessage={messages.attributeHeaderTitle} />
                <SecondaryButton
                    onClick={() => {setAttributeDefinitionInputOpen(true)}}
                    iconLeft={<PlusBoldIcon />}
                    label={intl.formatMessage(messages.addAttribute)}
                />
                </Spacings.Inline>
                <DataTable
                    columns={createColumnDefinitions(intl.formatMessage)}
                    isCondensed={false}
                    rows={attributes}
                    columns={createColumnDefinitions(intl.formatMessage)}
                    itemRenderer={itemRendered}
                    onRowClick={rowClick}
                />
                </Spacings.Stack>
            </div>
        </>
    );
};

AttributeInput.displayName = 'AttributeInput';
AttributeInput.propTypes = {
    id: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
};

export default AttributeInput;