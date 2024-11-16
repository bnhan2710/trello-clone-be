import Joi from 'joi'
export const NewBoardValidation = Joi.object({
    title: Joi.string().max(255).required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Username is required'
    }),
    description: Joi.string().max(255).messages({
        'string.base': 'Description must be a string',
    }),
    workspaceId: Joi.number().required().messages({
        'number.base': 'WorkspaceId must be a number',
        'any.required': 'WorkspaceId is required'
    })
});

