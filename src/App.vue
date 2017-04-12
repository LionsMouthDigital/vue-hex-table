<template>
  <div id="app">
    <hex-table hydrate-key="one"></hex-table>
    <hex-table hydrate-key="empty">
      <div slot="empty">
        <h1>Sorry, but&hellip;</h1>
        <p>
          No results.
        </p>
      </div>
    </hex-table>
  </div>
</template>

<script>
  import HexTable from './components/HexTable.vue';

  window.hexHydrant = {
    one: [
      {
        shape: {
          value: '<a href="https://en.wikipedia.org/wiki/Circle">Circle</a>',
          sort:  'circle',
        },
        sides: {
          value: 0,
          class: 'text-right',
        },
      },
      {
        shape: {
          value: '<a href="https://en.wikipedia.org/wiki/Square">Square</a>',
          class: 'text-warn'
        },
        sides: {
          value: 4,
          class: 'text-right',
        },
      },
      {
        shape: {
          value: '<a href="https://en.wikipedia.org/wiki/Triangle">Triangle</a>',
          class: 'text-warn'
        },
        sides: {
          value: 3,
          class: 'text-right',
        },
      },
      {
        shape: {
          value: '<a href="https://en.wikipedia.org/wiki/Hexagon">Hexagon</a>',
          class: 'text-warn'
        },
        sides: {
          value: 6,
          class: 'text-right',
        },
      },
      {
        shape: {
          value: '<a href="https://en.wikipedia.org/wiki/Pentagon">Pentagon</a>',
          class: 'text-warn'
        },
        sides: {
          value: 5,
          class: 'text-right',
        },
      },
    ],

    empty: [],
  };

  export default {
    name: 'app',

    components: {
      HexTable,
    },
  }
</script>
