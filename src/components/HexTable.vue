<template>
  <div class="hex-table" :class="sortable ? 'v-sortable' : ''">
    <slot name="loadingIndicator" v-if="loading"></slot>

    <slot name="empty" v-if="!loading && !items.length">
      <div class="message v-info">
        <p>Sorry, but the table has no data.</p>
      </div>
    </slot>

    <template v-if="items.length">
      <input v-model="filter" v-if="filterable" type="search" class="text-like" :placeholder="placeholder">

      <table>
        <thead>
          <tr>
            <template v-if="sortable">
              <th
                v-for  = "column in columns"
                @click = "sortBy(column)"
                :class = "sortColumn === column ? 'active' : ''"
              >
                {{ startCase(column) }}
                <span class="sort-indicator" :class="sortOrders[column] > 0 ? 'asc' : 'desc'"></span>
              </th>
            </template>

            <template v-else>
              <th v-for="column in columns" v-text="startCase(column)"></th>
            </template>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredItems">
            <td v-for="column in columns" :class="item[column].class" v-html="item[column].value"></td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>




<script>
  import {startCase} from 'lodash';
  import Mixins      from 'vue-hex-mixins';

  export default {
    name:   'HexTable',
    mixins: [Mixins.Hydratable],


    props: {
      filterable: {
        type:    Boolean,
        default: true,
      },

      // Custom filter method. Default shows only rows containing `filter` (case-insensitive).
      filterMethod: {
        type:    Function,
        default: (data, filter) => {
          return data.filter((row) => {
            return Object.keys(row).some((column) => {
              return String(row[column].value).toLowerCase().indexOf(filter) > -1;
            });
          });
        },
      },

      placeholder: String,

      sortable: {
        type:    Boolean,
        default: true,
      }
    },


    data() {
      return {
        columns:    [],
        filter:     '',
        sortColumn: '',
        sortOrders: {},
        unwatch:    false,
      };
    },


    computed: {
      /**
       * Filter and sort data.
       *
       * @return {Array}
       */
      filteredItems() {
        let sortColumn = this.sortColumn;
        let filter     = this.filter && this.filter.toLowerCase();
        let order      = this.sortOrders[sortColumn] || 1;
        let data       = this.items;

        // Filter data.
        if (filter) {
          data = this.filterMethod(data, filter);
        }

        // Sort data.
        if (sortColumn) {
          data = data.slice().sort((a, b) => {
            a = a[sortColumn].sort || a[sortColumn].value;
            b = b[sortColumn].sort || b[sortColumn].value;

            a = typeof a === 'string' ? a.toLowerCase() : a;
            b = typeof b === 'string' ? b.toLowerCase() : b;

            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }

        return data;
      },
    },


    methods: {
      setUp() {
        // Figure the columns out based on hydrated data.
        this.columns = Object.keys(this.items[0]);

        // Set sort orders for each column.
        let sortOrders = {};
        this.columns.forEach((key) => {
          sortOrders[key] = 1;
        });
        this.sortOrders = sortOrders;

        // Prevent re-running this method.
        if (this.unwatch) {
          this.unwatch();
        }
      },

      /**
       * Invert the sort order for the specified column.
       *
       * @param {String} column Column to sort by.
       */
      sortBy(column) {
        this.sortColumn         = column;
        this.sortOrders[column] = this.sortOrders[column] * -1;
      },

      /**
       * Convert a string to start case.
       *
       * @author Curtis Blackwell
       * @param  {string} string
       * @return {string}
       */
      startCase(string) {
        return startCase(string);
      },
    },


    created() {
      if (this.items.length) {
        this.setUp();
        return;
      }

      // Set a watcher and unwatcher in case items are hydrated later.
      this.unwatch = this.$watch('items', () => {
        this.setUp();
      });
    },
  };
</script>
