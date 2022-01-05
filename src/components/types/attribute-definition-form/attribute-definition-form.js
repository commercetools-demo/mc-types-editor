import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Constraints,
  CollapsiblePanel,
  CheckboxInput,
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
import { RESOURCE_TYPES, FIELD_TYPES, INPUT_HINTS } from './constants';

const resourceTypes = RESOURCE_TYPES.map(t => ({ label: t, value: t }));
const fieldTypes = Object.keys(FIELD_TYPES).map(t => ({ label: t, value: FIELD_TYPES[t] }));
const inputHints = Object.keys(INPUT_HINTS).map(t => ({ label: t, value: INPUT_HINTS[t] }));

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
      <Grid
        gridTemplateColumns={`repeat(1, ${customProperties.constraint11})`}
        gridGap={customProperties.spacingM}
      >
        <Grid.Item>
          <Card type="flat">
            <TextField
              name="name"
              value={values.name}
              title={<FormattedMessage {...messages.nameTitle} />}
              isRequired
              touched={touched.name?true:false}
              onBlur={handleBlur}
              onChange={handleChange}
              renderError={(key, error) => error}
            /> 
            </Card>
          </Grid.Item>
        <Grid.Item>
          <Card type="flat">
            <LocalizedTextField
              name="label"
              selectedLanguage={dataLocale}
              value={values.label}
              title={<FormattedMessage {...messages.labelTitle} />}
              isRequired
              touched={touched.label ? true : false}
              onBlur={handleBlur}
              onChange={handleChange}
              renderError={(key, error) => error}
            />
          </Card>
        </Grid.Item>
          <Grid.Item>
            <Card type="flat">
            <SelectField
              name="inputHint"
              title={<FormattedMessage {...messages.inputHintTitle} />}              
              isRequired
              value={values.inputHint}
              options={inputHints}
              touched={touched.inputHint}
              onBlur={handleBlur}
              onChange={handleChange}
              isDisabled={editMode}
            />
          </Card>
        </Grid.Item>
          <Grid.Item>
            <Card type="flat">
            <CheckboxInput
              name="required"
              onChange={handleChange}
              isChecked={values.required}
            >
              <FormattedMessage {...messages.requiredTitle} />
            </CheckboxInput>
          </Card>
        </Grid.Item>
          <Grid.Item>
            <Card type="flat">
            <SelectField
              name="type.name"
              title={<FormattedMessage {...messages.typeTitle} />}              
              isRequired
              value={values.type.name}
              options={fieldTypes}
              touched={touched.type && touched.type.name}
              onBlur={handleBlur}
              onChange={handleChange}
              isDisabled={editMode}
            />
          </Card>
        </Grid.Item>

      </Grid>
    </Spacings.Stack>
  );
};
Form.displayName = 'Form';
Form.propTypes = {
  values: PropTypes.object,
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
