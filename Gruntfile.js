module.exports = function(grunt) {
  // Configure default settings.
  var settings = {
    browser: 'Google Chrome Canary',

    browserify: {
      options: {
        transform: [
          ['vueify', {
            global: true
          }]
        ]
      }
    },

    pkg: grunt.file.readJSON('package.json'),
  };

  // Load preferences and merge into settings.
  var prefs = grunt.file.readYAML('grunt/preferences.yaml');
  settings  = mergeObjects(settings, prefs);

  // Set the component name to in `package.json`'s `name`, less the first 4 chars (vue-).
  settings.componentName = settings.pkg.name.substring(4);


  // Load the tasks.
  require('load-grunt-config')(grunt, {
    configPath: 'grunt/tasks',
    config: {
      s: settings
    }
  });
};


// ------------------------------------------------------------------------------------------------



// HELPERS
/**
 * Recursively merge the properties of two objects into the first, then return the object.
 *
 * @param {object} obj1 The first object.
 * @param {object} obj2 The second object.
 */
function mergeObjects(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      obj1[p] = obj2[p].constructor == Object ? mergeObjects(obj1[p], obj2[p]) : obj2[p];

    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }


  return obj1;
}
