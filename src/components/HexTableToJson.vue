<template>
  <div v-show="false">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    ready() {
      // Read the manually-typed table and add its data to the related `hex-table`.
      // Loop through children (There SHOULD only be one...) and snag and work with the first
      // `table` (see prev parenthetical comment).
      var tableWrapper = this.$el.children;
      for (var i = 0; i < tableWrapper.length; i++) {
        if (tableWrapper[i].nodeName === 'TABLE') {
          var table   = tableWrapper[i];
          var rows    = table.rows;
          // If lacking a `thead`, I can't properly format JSON from the markup.
          var headers = (table.tHead && table.tHead.rows.length)
            ? table.tHead.rows[0].children
            : {};
          var columns = [];

          // Figure out the columns and add them to the component's data.
          for (var i = 0; i < headers.length; i++) {
            columns.push(headers[i].textContent);
          }
          this.columns = columns;

          // Loop through the rows and create an object for each.
          // Variable names ending in `Data` indicate data that ends up in the component's data.
          var tableData = [];
          for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            // Only add data within the `tbody`.
            if (row.parentNode.nodeName === 'TBODY') {
              var rowData = {};
              var cells   = row.children;
              for (var j = 0; j < cells.length; j++) {
                var header      = columns[j];
                var cell        = cells[j];
                // Add the cell to the row.
                rowData[header] = cell.innerHTML;
              }
              // Add the row to the table.
              tableData.push(rowData);
            }
          }

          // Set the `tableData` for the `hex-table`.
          for (var i = 0; i < this.$parent.$children.length; i++) {
            var child = this.$parent.$children[i];
            if (child.$options.name === 'hex-table') {
              child.tableData = tableData;
              continue;
            }
          }

          // Only one `table` per `hex-table`!
          this.$remove()
          continue;
        }
      }
    },
  }
</script>
