Package.describe({
  name: 'changelog',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('standard-app-packages');

  api.use('matb33:collection-hooks');

  api.addFiles('changelog.html', 'client');
  api.addFiles('setup.js');
  api.addFiles('server.js', 'server');
  api.addFiles('changelog.js', 'client');

  api.export('ChangeLogFuncs', 'server');
  api.export('ChangeLog', 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('changelog');
  api.addFiles('changelog-tests.js');
});
