'use strict';

describe('Main', function () {
  var InfiniteKanbanApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    InfiniteKanbanApp = require('../../../src/scripts/components/InfiniteKanbanApp.jsx');
    component = InfiniteKanbanApp();
  });

  it('should create a new instance of InfiniteKanbanApp', function () {
    expect(component).toBeDefined();
  });
});
