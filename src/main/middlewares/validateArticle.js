import Joi from 'joi';

const validateArticle = (req, res, next) => {
  const schema = Joi.object({
    title1_en: Joi.string().min(5).max(1000).required(),
    title1_es: Joi.string().min(5).max(1000).required(),
    title2_en: Joi.string().min(5).max(1000).required(),
    title2_es: Joi.string().min(5).max(1000).required(),
    category: Joi.string()
      .valid('Technology', 'Lifestyle', 'Education', 'Business', 'Travel')
      .required(),
    date: Joi.date().iso().required(),
    shortdescription_en: Joi.object().required(),
    shortdescription_es: Joi.object().required(),
    bannerUrl: Joi.string().uri().required(),
    bannerAlt_en: Joi.string().min(3).max(255).required(),
    bannerAlt_es: Joi.string().min(3).max(255).required(),
    bannerdescription_en: Joi.string().min(5).max(255).required(),
    bannerdescription_es: Joi.string().min(5).max(255).required(),
    articlesocialmedia: Joi.object().optional(),
    media: Joi.object().optional(),
    subtitle_en: Joi.object().optional(),
    subtitle_es: Joi.object().optional(),
    audiotitle_en: Joi.object().optional(),
    audiotitle_es: Joi.object().optional(),
    audioUrl: Joi.string().uri().optional(),
    titledescription_en: Joi.string().min(5).max(255).required(),
    titledescription_es: Joi.string().min(5).max(255).required(),
    paragraph_en: Joi.object().optional(),
    paragraph_es: Joi.object().optional(),
    videoUrl: Joi.string().uri().optional(),
    videoAlt_en: Joi.string().min(3).max(255).optional(),
    videoAlt_es: Joi.string().min(3).max(255).optional(),
    videodescription_en: Joi.string().min(5).max(255).optional(),
    videodescription_es: Joi.string().min(5).max(255).optional(),
    gallery: Joi.object().optional(),
    iframe: Joi.object().optional(),
    authorId: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

export default validateArticle;
