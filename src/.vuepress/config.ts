import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import { description } from '../../package.json'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'ru',
  title: 'ES Doc',
  description,

  bundler: isProd ? '@vuepress/webpack' : '@vuepress/vite',

  themeConfig: {
    navbar: ['/guide/'],

    // Пока что не работает
    // https://github.com/vuepress/vuepress-next/issues/175
    tip: 'Tip',
    warning: 'Warning',
    danger: 'Danger',
  },
})
