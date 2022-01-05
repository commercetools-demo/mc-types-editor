import { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CustomFormModalPage } from '@commercetools-frontend/application-components';
import {
  BinLinearIcon,
  IconButton,
  Spacings,
  SecondaryButton,
  RevertIcon,
} from '@commercetools-frontend/ui-kit';
import LabelRequired from '../../core/fields/label-required';
import PageBottomSpacer from '../../core/page-bottom-spacer';
import AttributeDefinitionForm from '../attribute-definition-form';
import messages from './messages';


const initializeEmptyValues = () => ({
    type: {
        name: 'String'
    },
    name:  '',
    label: {
      en: ''
    },
    required: false,
    inputHint: 'SingleLine',
  });
  
const initializeAttributeValues = (attribute) => ({
});
const AttributeDefinitionInput = (props) => {
    const intl = useIntl();
    const initialValues = props.existingAttributeDefinition
      ? initializeAttributeValues(props.existingAttributeDefinition)
      : initializeEmptyValues();
      const stringSchema = yup
        .string()
        .required(<FormattedMessage {...messages.requiredFieldError} />);
      
      const validationSchema = yup.object({
        type: stringSchema,
        name: stringSchema,
        label: stringSchema,
        required: yup.boolean(),
        type: yup.object(),
        inputHint: stringSchema,
      });
      const formRef = useRef()
      
      const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (formRef.current) {
          formRef.current.handleSubmit()
        }
      }
      return (
            <CustomFormModalPage
              isOpen={props.isOpen}
              title={intl.formatMessage(messages.modalTitle)}
              subtitle= {<LabelRequired />}
              onClose={props.onClose}
              topBarCurrentPathLabel={intl.formatMessage(messages.modalTitle)}
              formControls={
                <>
                    <SecondaryButton
                      label={intl.formatMessage(messages.revert)}
                      iconLeft={<RevertIcon />}
                      onClick={props.onClose}
                    />
                    <CustomFormModalPage.FormPrimaryButton
                      label={messages.updateButton}
                      onClick={handleSubmit}
                    />
                </>
              }
            >
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => props.onSubmit(values)}
                    innerRef={formRef}
                    >
                    {(props) => <AttributeDefinitionForm {...props} />}
                </Formik>
                <PageBottomSpacer />
            </CustomFormModalPage>
      );
  };

  AttributeDefinitionInput.displayName = 'AttributeDefinitionInput';
  AttributeDefinitionInput.propTypes = {
      isOpen: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    existingAttributeDefinition: PropTypes.object,
    intl: PropTypes.object,
    languages: PropTypes.arrayOf(PropTypes.string)
  };
  
  export default AttributeDefinitionInput;