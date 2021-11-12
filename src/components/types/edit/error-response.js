export const isDuplicateKeyError = (error) =>
  error.code === 'DuplicateField' &&
  error.field === 'key' &&
  error.action &&
  error.action.type === 'setKey';

export const hasAttributeDefinitionAlreadyExistsError = (error) =>
  error.code === 'AttributeDefinitionAlreadyExists' &&
  error.action &&
  error.action.type === 'addAttributeDefinition';

export const hasAttributeDefinitionTypeConflictError = (error) =>
  error.code === 'AttributeDefinitionTypeConflict' &&
  error.action &&
  error.action.type === 'addAttributeDefinition';

export const hasEnumKeyAlreadyExistsError = (error) =>
  error.code === 'EnumKeyAlreadyExists' &&
  error.action &&
  ['addLocalizedEnumValue', 'addPlainEnumValue', 'changeEnumKey'].includes(
    error.action.type
  );

export const hasEnumKeyUsedByProductsError = (error) =>
  error.code === 'InvalidOperation' &&
  error.action &&
  error.action.type === 'removeEnumValues' &&
  error.message.includes('is used by some products and cannot be deleted');

export const mapEnumKeyAlreadyExistsError = (error) => ({
  failedUpdateAction: error.action.type,
  conflictingKey: error.conflictingEnumKey,
});

export const mapEnumKeyUsedByProductsError = (error) => ({
  failedUpdateAction: error.action.type,
  conflictingKeys: error.action.keys || [],
});
