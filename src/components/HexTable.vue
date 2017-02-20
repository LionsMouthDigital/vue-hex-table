<template>
  <table>
    <thead>
      <tr>
        <template v-if="sortable">
          <!-- Show sort indicators and add appropriate classes if sortable. -->
          <th
            v-for  = "column in columns"
            :class = "{ active: sortColumn == column }"
            @click = "sortBy(column)"
          >
            {{ column | capitalize }}
            <span class="sort-indicator" :class="sortOrders[column] > 0 ? 'asc' : 'desc'"></span>
          </th>
        </template>

        <template v-else>
          <th v-for="column in columns">{{ column | capitalize }}</th>
        </template>
      </tr>
    </thead>

    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="column in columns" v-html="entry[column]"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'HexTable',


    props: {
      // Data to populate the table with. Accepts JavaScript array or JSON.
      data: {
        type:     [Array, String],
        required: true,
      },

      // Keys to pull from the data. Only data with keys specified here are displayed.
      columns: {
        type:     Array,
        required: true,
      },

      // Key from the Vue object's data to filter by.
      filterKey: String,

      // Custom filter method. Default shows only rows containing `filterKey` (case-insensitive).
      filterMethod: {
        type:    Function,
        default: (data, filterKey) => {
          return data.filter((row) => {
            return Object.keys(row).some((key) => {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            });
          });
        },
      },

      // Whether to make the table sortable.
      sortable: Boolean,
    },


    data() {
      let sortOrders = {};

      this.columns.forEach((key) => {
        sortOrders[key] = 1;
      });

      return {
        sortColumn: '',
        sortOrders: sortOrders
      };
    },


    computed: {
      /**
       * Filter and sort data.
       *
       * @return {Array}
       */
      filteredData() {
        let sortColumn = this.sortColumn;
        let filterKey  = this.filterKey && this.filterKey.toLowerCase();
        let order      = this.sortOrders[sortColumn] || 1;
        let data       = typeof this.data === 'string' ? JSON.parse(this.data) : this.data;

        // Filter data.
        if (filterKey) {
          data = this.filterMethod(data, filterKey);
        }

        // Sort data.
        if (sortColumn) {
          data = data.slice().sort((a, b) => {
            a = a[sortColumn];
            b = b[sortColumn];

            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }

        return data;
      }
    },


    methods: {
      /**
       * Invert the sort order for the specified column.
       *
       * @param {String} column Column to sort by.
       */
      sortBy(column) {
        this.sortColumn         = column;
        this.sortOrders[column] = this.sortOrders[column] * -1;
      },
    },


    filters: {
      /**
       * Capitalize the first character in a string.
       *
       * @param  {String} str
       * @return {String}
       */
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
  }
</script>
