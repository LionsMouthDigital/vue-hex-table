<template>
  <table :class="{ sortable: sortable }">
    <thead>
      <tr>
        <template v-if="sortable">
          <!-- Show sort indicators and add appropriate classes if sortable. -->
          <th
            v-for  = "key in columns"
            :class = "{ active: sortKey === key }"
            @click = "sortBy(key)"
          >
            {{ key }}
            <span class="sort-indicator" :class="sortOrders[key] > 0 ? 'asc' : 'desc'"></span>
          </th>
        </template>

        <template v-else>
          <th v-for="key in columns">{{ key }}</th>
        </template>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in tableData | filterBy $parent.query | orderBy sortKey sortOrders[sortKey]">
        <td v-for="column in columns">
          {{{ row[column] }}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    data() {
      return {
        sortOrders: {},
        tableData: this.json ? JSON.parse(this.json) : [],
      }
    },

    ready() {
      this.setSortOrders();
    },

    props: {
      json:      String,
      sortable:  Boolean,
      sortKey:   String,
    },

    computed: {
      columns() {
        // Snag the keys from the first row (index) of `tableData`
        return this.tableData.length ? Object.keys(this.tableData[0]) : [];
      },
    },

    watch: {
      // We can't set `sortOrders` until after setting `tableData` when using `hex-table-to-json`.
      columns() {
        this.setSortOrders();
      },
    },

    methods: {
      /**
       * Sort table rows.
       *
       * @author Curtis Blackwell
       * @param  {string} key The column to sort by.
       * @return {void}
       */
      sortBy(key) {
        this.sortKey         = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },

      setSortOrders() {
        if (this.columns.length) {
          var sortOrders = {};
          this.columns.forEach(function(key) {
            sortOrders[key] = 1;
          });

          this.sortOrders = sortOrders;
        }
      },
    },
  }
</script>
