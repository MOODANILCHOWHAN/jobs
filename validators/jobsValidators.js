import Joi from 'joi';

export const jobsValidator= Joi.object({
    jobName:Joi.string().required(),
    jobType:Joi.string().required(),
    industryType:Joi.string().required(),
    city:Joi.string().required(),
    skils:Joi.array().items(Joi.string()).required(),
    jobExperience: Joi.number().min(0).max(30).required(),
    company: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    interviewType: Joi.string().required(),
    link:Joi.string().uri().required()
})