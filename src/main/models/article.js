import { Sequelize } from 'sequelize';
import { sequelize } from '~/configs/dbConfig.js';

const Article = sequelize.define(
  'Article',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title1_en: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title1_es: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title2_en: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title2_es: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    shortdescription_en: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    shortdescription_es: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    bannerUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bannerAlt_en: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bannerAlt_es: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bannerdescription_en: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bannerdescription_es: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    articlesocialmedia: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    media: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    subtitle_en: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    subtitle_es: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    audiotitle_en: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    audiotitle_es: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    audioUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    titledescription_en: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    titledescription_es: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paragraph_en: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    paragraph_es: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    videoAlt_en: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    videoAlt_es: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    videodescription_en: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    videodescription_es: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    gallery: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    iframe: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'articles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Asociaciones

export default Article;
