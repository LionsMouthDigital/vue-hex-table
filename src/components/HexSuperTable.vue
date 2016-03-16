<template>
  <!-- Wrap in a div to prevent fragmentation. -->
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // This gets used in the templates of `super-table-filter.vue` and `table.vue`.
        query: '',
      }
    },
  }
</script>
