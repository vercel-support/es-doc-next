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
    navbar: ['/guide/'],

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
