import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import { description } from '../../package.json'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'ru',
  title: 'ES Doc',
  description,
})
