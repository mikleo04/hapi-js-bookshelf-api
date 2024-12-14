import Joi from '@hapi/joi';

const createBookSchema = (customMessages) => Joi.object({
  name: Joi.string().required().messages({
    'any.required': customMessages.nameRequiredMessage,
    'string.empty': customMessages.nameEmptyMessage
  }),
  year: Joi.number().allow(null),
  author: Joi.string().allow(null),
  summary: Joi.string().allow(null),
  publisher: Joi.string().allow(null),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required().max(Joi.ref('pageCount')).messages({
    'number.max': customMessages.readPageMaxMessage
  }),
  reading: Joi.boolean().allow(null),
});

const validateBookPayload = (payload, customMessages) => {
  const schema = createBookSchema(customMessages);
  const { error } = schema.validate(payload);
  if (error) {
    return {
      isValid: false,
      message: error.details[0].message
    };
  }
  return { isValid: true };
};

export { validateBookPayload };