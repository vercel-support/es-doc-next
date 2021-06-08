<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    descriptions: {
      type: Object,
      required: false,
    },
    codeTemplate: {
      type: String,
      required: false,
    },
    nsfw: {
      type: Array,
      required: false,
    },
    file: {
      type: String,
      required: false,
    },
  },
}
</script>

<template>
  <details class="custom-container details">
    <summary>Оглавление</summary>
    <nav class="table-of-contents">
      <ul>
        <li v-for="{ name } in data" :key="name">
          <a
            :href="'#' + name"
            class="router-link-active router-link-exact-active"
            aria-current="page"
          >
            {{ name }} {{ descriptions ? `- ${descriptions[name]}` : '' }}
          </a>
        </li>
      </ul>
    </nav>
  </details>

  <table>
    <thead>
      <tr>
        <th>Код</th>
        <th>Предпросмотр</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="{ name, path } in data"
        class="scroll-margin"
        :key="name"
        :id="name"
      >
        <td>
          <a :href="'#' + name">#</a>
          <code>{{ codeTemplate.replace('%', name) }}</code>
          <p v-if="descriptions && descriptions[name]">
            {{ descriptions[name] }}
          </p>
        </td>
        <td>
          <img
            v-if="type === 'img'"
            :alt="name"
            :src="path"
            :class="{ nsfw: nsfw && nsfw.includes(name) }"
          />
          <audio
            v-else-if="type === 'audio'"
            :src="path"
            :type="`audio/${path.split('/').pop().split('.').pop()}`"
            preload="auto"
            controls
          ></audio>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.scroll-margin {
  scroll-margin-top: 5rem;
}
</style>
