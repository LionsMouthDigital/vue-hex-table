<template>
  <div id="app">
    <input type="search" v-model="tableOneQuery">
    <hex-table
      :filter-key = "tableOneQuery"
      :columns    = "['Name', 'Location']"
      :data       = "[
                      {
                        'Name':     'James Blair',
                        'Location': 'Dallas, TX',
                      },
                      {
                        'Name':     'Curtis Blackwell',
                        'Location': 'Busan, KR',
                      },
                      {
                        'Name':     'Andrew Pennington',
                        'Location': 'Kansas City, MO',
                      },
                    ]"
      sortable
    ></hex-table>


    <hr>


    <!-- JSON example -->
    <input type="search" v-model="tableTwoQuery">
    <hex-table
      :filter-key    = "tableTwoQuery"
      :filter-method = "(data, filterKey) => {
                          // Filter out rows containing `filterKey` (limited browser support).
                          return data.filter((row) => {
                            // Concatenate all column values into a string.
                            let rowStr = Object.values(row).reduce((a, b) => {
                              return a + ' ' + b;
                            });

                            // Check the row for the `filterKey`.
                            return rowStr.toLowerCase().indexOf(filterKey) == -1;
                          });
                        }"

      :columns = "['Name', 'Location']"
      data     = '[
                      {
                        "Name":     "James Blair",
                        "Location": "Dallas, TX"
                      },
                      {
                        "Name":     "Curtis Blackwell",
                        "Location": "Busan, KR"
                      },
                      {
                        "Name":     "Andrew Pennington",
                        "Location": "Kansas City, MO"
                      }
                    ]'
    ></hex-table>
  </div>
</template>

<script>
  import HexTable from './components/HexTable.vue';

  export default {
    name: 'app',

    components: {
      HexTable,
    },

    data() {
      return {
        tableOneQuery: 'bla',
        tableTwoQuery: 'bla',
      };
    },
  }
</script>
