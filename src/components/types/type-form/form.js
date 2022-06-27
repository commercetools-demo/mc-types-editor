import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Constraints,
  ErrorMessage,
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
import FieldInput from './fields-input';

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
  setFieldValue,
  editMode,
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
              touched={touched.name?true:false}
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
              touched={touched.description?true:false}
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
              hint={<FormattedMessage {...messages.keyHint} />}
              isRequired
              errors={errors.key}
              touched={touched.key?true:false}
              onBlur={handleBlur}
              onChange={handleChange}
              renderError={(key, error) => error}
              isDisabled={editMode}
            /> 
            {errors.key && touched.key ? (
              <ErrorMessage>{errors.key}</ErrorMessage>
              ) : null
            }
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
              isDisabled={editMode}
            />
          </Card>
        </Grid.Item>
      </Grid>
      </CollapsiblePanel>
      {editMode && <CollapsiblePanel
        header={
          <CollapsiblePanel.Header>
            <FormattedMessage {...messages.typeInformationTitle} />
          </CollapsiblePanel.Header>
        }
        className={styles.panel}
      >
        <FieldInput
          value={values.fieldDefinitions} 
          onBlur={handleBlur}
          onChange={setFieldValue}
        />
      </CollapsiblePanel>
      }
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
  editMode: PropTypes.bool,
};

export default Form;
