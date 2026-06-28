// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: '1 Peter — A Devotional Series',
          defaultLocale: 'root',
          locales: {
              root: { label: '简体中文', lang: 'zh-CN' },
              en: {
                  label: 'English',
                  lang: 'en',
                  // English sidebar (unchanged from original)
                  sidebar: [
                      {
                          label: 'Start Here',
                          items: [
                              { slug: '0001-a-living-hope-for-sojourners', label: 'Lesson 1 — Overview' },
                          ],
                      },
                      {
                          label: '1 · Priestly Identity — A Chosen People',
                          collapsed: true,
                          items: [
                              { slug: '0002-priests-sojourning-in-the-world' },
                              { slug: '0003-a-living-hope' },
                              { slug: '0004-faith-in-the-midst-of-trials' },
                          ],
                      },
                      {
                          label: '2 · Priestly Life — The Call to Holiness',
                          collapsed: true,
                          items: [
                              { slug: '0005-prepare-your-minds' },
                              { slug: '0006-because-i-am-holy' },
                              { slug: '0007-love-one-another-earnestly' },
                          ],
                      },
                      {
                          label: '3 · Priestly Community — Spiritual Building',
                          collapsed: true,
                          items: [
                              { slug: '0008-a-royal-priesthood' },
                          ],
                      },
                      {
                          label: '4 · Priestly Witness — Living Out Christ',
                          collapsed: true,
                          items: [
                              { slug: '0009-as-sojourners-in-the-world' },
                              { slug: '0010-submission-and-witness' },
                              { slug: '0011-following-the-suffering-christ' },
                          ],
                      },
                      {
                          label: '5 · Priestly Family — Glorifying God in Relationships',
                          collapsed: true,
                          items: [
                              { slug: '0012-christ-centered-marital-witness' },
                              { slug: '0013-unity-and-blessing' },
                          ],
                      },
                      {
                          label: '6 · Priestly Mission — Always Be Prepared',
                          collapsed: true,
                          items: [
                              { slug: '0014-suffer-for-righteousness' },
                              { slug: '0015-christs-victorious-proclamation' },
                          ],
                      },
                      {
                          label: '7 · Priestly Life — Living for God',
                          collapsed: true,
                          items: [
                              { slug: '0016-have-the-mind-of-christ' },
                              { slug: '0017-the-end-of-all-things' },
                              { slug: '0018-serve-with-the-gifts' },
                          ],
                      },
                      {
                          label: '8 · Priestly Suffering — In the Fiery Trial',
                          collapsed: true,
                          items: [
                              { slug: '0019-do-not-be-surprised' },
                              { slug: '0020-blessed-are-those-who-suffer' },
                              { slug: '0021-entrust-yourself' },
                          ],
                      },
                      {
                          label: '9 · Priestly Leaders — Shepherding God’s Flock',
                          collapsed: true,
                          items: [
                              { slug: '0022-shepherds-of-gods-flock' },
                          ],
                      },
                      {
                          label: '10 · Priestly Community — Serving One Another',
                          collapsed: true,
                          items: [
                              { slug: '0023-clothe-with-humility' },
                              { slug: '0024-god-opposes-the-proud' },
                              { slug: '0025-cast-your-anxiety' },
                          ],
                      },
                      {
                          label: '11 · Priestly Warfare — Stand Firm',
                          collapsed: true,
                          items: [
                              { slug: '0026-be-alert-and-resist' },
                              { slug: '0027-suffering-not-the-final-word' },
                              { slug: '0028-final-greetings' },
                          ],
                      },
                      {
                          label: '12 · Priestly Mission — Proclaim God’s Excellencies',
                          collapsed: true,
                          items: [
                              { slug: '0029-from-sojourners-to-priests' },
                              { slug: '0030-become-a-blessing' },
                              { slug: '0031-from-suffering-to-glory' },
                          ],
                      },
                      {
                          label: 'Reference',
                          items: [
                              { slug: '1-peter-at-a-glance', label: '1 Peter at a Glance' },
                              { slug: 'glossary', label: 'Key Terms (Glossary)' },
                          ],
                      },
                  ],
              },
          },
          customCss: ['./src/styles/global.css'],
          // Chinese (root / default) sidebar
          sidebar: [
              {
                  label: '从这里开始',
                  items: [
                      { slug: '0001-a-living-hope-for-sojourners', label: '第 1 课 —— 全书概览' },
                  ],
              },
              {
                  label: '1 · 祭司身份 —— 蒙拣选的子民',
                  collapsed: true,
                  items: [
                      { slug: '0002-priests-sojourning-in-the-world' },
                      { slug: '0003-a-living-hope' },
                      { slug: '0004-faith-in-the-midst-of-trials' },
                  ],
              },
              {
                  label: '2 · 祭司生活 —— 圣洁的呼召',
                  collapsed: true,
                  items: [
                      { slug: '0005-prepare-your-minds' },
                      { slug: '0006-because-i-am-holy' },
                      { slug: '0007-love-one-another-earnestly' },
                  ],
              },
              {
                  label: '3 · 祭司群体 —— 属灵的建造',
                  collapsed: true,
                  items: [
                      { slug: '0008-a-royal-priesthood' },
                  ],
              },
              {
                  label: '4 · 祭司见证 —— 活出基督',
                  collapsed: true,
                  items: [
                      { slug: '0009-as-sojourners-in-the-world' },
                      { slug: '0010-submission-and-witness' },
                      { slug: '0011-following-the-suffering-christ' },
                  ],
              },
              {
                  label: '5 · 祭司家庭 —— 在关系中荣耀神',
                  collapsed: true,
                  items: [
                      { slug: '0012-christ-centered-marital-witness' },
                      { slug: '0013-unity-and-blessing' },
                  ],
              },
              {
                  label: '6 · 祭司使命 —— 常作准备',
                  collapsed: true,
                  items: [
                      { slug: '0014-suffer-for-righteousness' },
                      { slug: '0015-christs-victorious-proclamation' },
                  ],
              },
              {
                  label: '7 · 祭司生活 —— 为神而活',
                  collapsed: true,
                  items: [
                      { slug: '0016-have-the-mind-of-christ' },
                      { slug: '0017-the-end-of-all-things' },
                      { slug: '0018-serve-with-the-gifts' },
                  ],
              },
              {
                  label: '8 · 祭司受苦 —— 在火炼之中',
                  collapsed: true,
                  items: [
                      { slug: '0019-do-not-be-surprised' },
                      { slug: '0020-blessed-are-those-who-suffer' },
                      { slug: '0021-entrust-yourself' },
                  ],
              },
              {
                  label: '9 · 祭司领袖 —— 牧养神的羊群',
                  collapsed: true,
                  items: [
                      { slug: '0022-shepherds-of-gods-flock' },
                  ],
              },
              {
                  label: '10 · 祭司群体 —— 彼此服侍',
                  collapsed: true,
                  items: [
                      { slug: '0023-clothe-with-humility' },
                      { slug: '0024-god-opposes-the-proud' },
                      { slug: '0025-cast-your-anxiety' },
                  ],
              },
              {
                  label: '11 · 祭司争战 —— 站立得稳',
                  collapsed: true,
                  items: [
                      { slug: '0026-be-alert-and-resist' },
                      { slug: '0027-suffering-not-the-final-word' },
                      { slug: '0028-final-greetings' },
                  ],
              },
              {
                  label: '12 · 祭司使命 —— 宣扬神的美德',
                  collapsed: true,
                  items: [
                      { slug: '0029-from-sojourners-to-priests' },
                      { slug: '0030-become-a-blessing' },
                      { slug: '0031-from-suffering-to-glory' },
                  ],
              },
              {
                  label: '参考',
                  items: [
                      { slug: '1-peter-at-a-glance', label: '彼得前书一目了然' },
                      { slug: 'glossary', label: '关键词（词汇表）' },
                  ],
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});
