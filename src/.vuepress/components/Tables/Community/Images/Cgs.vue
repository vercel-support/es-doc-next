<script setup>
import { communityCgs } from '@temp/resources'

const cgs = communityCgs
</script>

<template>
  <Tables-Base
    type="img"
    :data="cgs"
    codeTemplate="scene %"
    file="community_cgs_list"
  />
</template>
