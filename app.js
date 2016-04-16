var Vue      = require('vue');
var HexTable = require('./src/component.js');

new Vue({
  el: 'body',

  components: {
    HexSuperTable:       HexTable.HexSuperTable,
    HexSuperTableFilter: HexTable.HexSuperTableFilter,
    HexTable:            HexTable.HexTable,
    HexTableToJson:      HexTable.HexTableToJson,
  },
});
