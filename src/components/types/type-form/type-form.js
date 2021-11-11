import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from './form';
import messages from './messages';

const initializeEmptyValues = () => ({
  key: '',
  name: {
    en: ''
  },
  description: {
    en: ''
  },
  resourceTypeIds: [],
});

const initializeTypeValues = (type) => ({
  key: type.key,
  name: type.name,
  description: type.description,
  label: type.label,
  resourceTypeIds: type.resourceTypeIds
});

const TypeForm = ({ type, onSubmit }) => {
  
  const initialValues = type
    ? initializeTypeValues(type)
    : initializeEmptyValues();

  const stringSchema = yup
    .string()
    .required(<FormattedMessage {...messages.requiredFieldError} />);
  
  const validationSchema = yup.object({
    key: stringSchema,
    name: stringSchema,
    description: stringSchema,
    resourceTypeIds: yup.array().of(yup.string())
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {(props) => <Form {...props} />}
    </Formik>
  );
};
TypeForm.displayName = 'TypeForm';
TypeForm.propTypes = {
  type: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default TypeForm;
