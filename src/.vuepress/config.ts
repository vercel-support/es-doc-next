import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { request } from '@octokit/request'
import { resolve } from 'path'

import resources from './assets/resources.json'
import { description } from '../../package.json'

import type { Resource } from './types/resources'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'ru',
  title: 'ES Doc',
  description,

  alias: {
    '@': resolve('./src/.vuepress'),
  },

  bundler: isProd ? '@vuepress/webpack' : '@vuepress/vite',

  themeConfig: {
    navbar: [
      {
        text: 'Руководство',
        link: '/guide/',
      },
      {
        text: 'Таблицы ресурсов',
        children: [
          {
            text: 'Ресурсы игры',
            link: '/resources/default/',
          },
          {
            text: 'Ресурсы сообщества',
            link: '/resources/community/',
          },
        ],
      },
      {
        text: 'Разное',
        link: '/misc/',
      },
    ],
    sidebar: {
      '/guide/': [
        '',
        'advanced.md',
        'videos.md',
        'errors.md',
        'code-examples.md',
      ],
      '/resources/': [
        {
          text: 'Ресурсы игры',
          // link: '/resources/default/',
          isGroup: true,
          children: [
            'default/characters.md',
            {
              text: 'Изображения',
              isGroup: true,
              children: ['default/images/bgs.md', 'default/images/cgs.md'],
            },
            {
              text: 'Звуки',
              isGroup: true,
              children: [
                'default/sounds/ambiences.md',
                'default/sounds/music.md',
                'default/sounds/sfx.md',
              ],
            },
          ],
        },
        {
          text: 'Ресурсы сообщества',
          // link: '/resources/community/',
          isGroup: true,
          children: [
            {
              text: 'Изображения',
              isGroup: true,
              children: ['community/images/bgs.md', 'community/images/cgs.md'],
            },
            {
              text: 'Звуки',
              isGroup: true,
              children: ['community/sounds/music.md'],
            },
          ],
        },
      ],
      '/misc/': [
        {
          text: 'Разное',
          link: '/misc/',
          children: ['news-sources.md', 'artists.md', 'literature.md'],
        },
      ],
    },
    sidebarDepth: 3,

    tip: 'Совет',
    warning: 'Внимание!',
    danger: 'Особое внимание!',
  },

  async onPrepared(app) {
    let content = ''

    for (const { name, path } of resources as Resource[]) {
      const { data } = await request(
        `GET /repos/sovue/es-doc-assets/contents/${path}`
      )
      content += `export const ${name}=${JSON.stringify(
        data.map(({ name, download_url }) => ({
          name: name.split('.')[0],
          path: download_url,
        }))
      )};`
    }

    app.writeTemp('resources.js', content)
  },

  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: resolve('./src/.vuepress/components'),
      },
    ],
  ],
})
