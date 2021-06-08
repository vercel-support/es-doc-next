import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { resolve } from 'path'

import { description } from '../../package.json'

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

  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: resolve('./src/.vuepress/components'),
      },
    ],
  ],
})
