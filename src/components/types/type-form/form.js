import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Constraints,
  CollapsiblePanel,
  TextField,
  LocalizedTextField,
  Card,
  Grid,
  customProperties,
  SelectField,
  Spacings
} from '@commercetools-frontend/ui-kit';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import messages from './messages';
import styles from './form.mod.css';
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
      <Grid
        gridTemplateColumns={`repeat(2, ${customProperties.constraint11})`}
        gridGap={customProperties.spacingM}
      >
          <Grid.Item>
            <Card type="flat" className={styles['field-card']}>
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
            </Card>
          </Grid.Item>
          <Grid.Item>
            <Card type="flat" className={styles['field-card']}>
            <LocalizedTextField
              name="description"
              selectedLanguage={dataLocale}
              value={values.description}
              title={<FormattedMessage {...messages.descriptionTitle} />}
              isRequired
              errors={errors.description}
              touched={touched.description}
              onBlur={handleBlur}
              onChange={handleChange}
              renderError={(key, error) => error}
            />
            </Card>
          </Grid.Item>
        <Grid.Item>
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
            </Card>
          </Grid.Item>
          <Grid.Item>
            <Card type="flat" className={styles['field-card']}>
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
        </Grid.Item>
      </Grid>
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
    description: PropTypes.objectOf(PropTypes.bool),
    resourceTypeIds: PropTypes.bool
  }).isRequired,
  errors: PropTypes.shape({
    key: PropTypes.object,
    name: PropTypes.object,
    description: PropTypes.object,
    resourceTypeIds: PropTypes.object
  }).isRequired,
  dirty: PropTypes.bool,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
