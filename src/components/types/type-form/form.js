import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import Card from '@commercetools-uikit/card';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import { SelectField, TextField } from '@commercetools-uikit/fields';
import Spacings from '@commercetools-uikit/spacings';
import messages from './messages';
import styles from './form.mod.css';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { RESOURCE_TYPES } from './constants';

const resourceTypes = RESOURCE_TYPES.map(t => ({label: t, value: t}));

const Form = ({
  values,
  touched,
  errors,
  dirty,
  isValid,
  isSubmitting,
  handleBlur,
  handleChange,
  handleSubmit,
}) => {
  
  const intl = useIntl();
  const { dataLocale } = useApplicationContext();
 
  return (
    <Spacings.Stack scale="m">
      <CollapsiblePanel
        header={
          <CollapsiblePanel.Header>
            <FormattedMessage {...messages.generalInformationTitle} />
          </CollapsiblePanel.Header>
        }
        className={styles.panel}
      >
        <div className={styles.form}>
          <Card type="flat" className={styles['field-card']}>
            <TextField
              name="key"
              value={values.key}
              title={<FormattedMessage {...messages.keyTitle} />}
              isRequired
              errors={errors.key}
              touched={touched.key}
              onBlur={handleBlur}
              onChange={handleChange}
              renderError={(key, error) => error}
            /> 
            <LocalizedTextField
              name="name"
              selectedLanguage={dataLocale}
              value={values.name}
              title={<FormattedMessage {...messages.nameTitle} />}
              isRequired
              errors={errors.name}
              touched={touched.name}
              onBlur={handleBlur}
              onChange={handleChange}
              renderError={(key, error) => error}
            />
            <SelectField
              name="resourceTypeIds"
              title={<FormattedMessage {...messages.resourceTypeIdsTitle} />}              
              isRequired
              isMulti
              value={values.resourceTypeIds}
              options={resourceTypes}
              errors={errors.resourceTypeIds}
              touched={touched.resourceTypeIds}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Card>
        </div>
      </CollapsiblePanel>
      
      <Constraints.Horizontal constraint="scale">
        <PrimaryButton
          label={intl.formatMessage(messages.submitButton)}
          isDisabled={!dirty || !isValid || isSubmitting}
          onClick={handleSubmit}
        />
      </Constraints.Horizontal>
    </Spacings.Stack>
  );
};
Form.displayName = 'Form';
Form.propTypes = {
  values: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.objectOf(PropTypes.string),
    resourceTypeIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  touched: PropTypes.shape({
    key: PropTypes.bool,
    name: PropTypes.objectOf(PropTypes.bool),
    resourceTypeIds: PropTypes.bool
  }),
  errors: PropTypes.shape({
    key: PropTypes.object,
    name: PropTypes.object,
    resourceTypeIds: PropTypes.object
  }),
  dirty: PropTypes.bool,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
