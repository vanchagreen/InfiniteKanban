/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var _ = require('lodash');

var TypeStore = require('../stores/TypeStore');
var StateStore = require('../stores/StateStore');
var RecordStore = require('../stores/RecordStore');

var WsapiActionCreators = require('../actions/WsapiActionCreators');

var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var ParentChildMapper = require('../utils/ParentChildMapper');

var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');


var KanbanView = React.createClass({
  mixins: [authenticationMixin, Router.State],

  componentWillReceiveProps: function () {
    if (!_.isEqual(this._prevParams, this.getParams())) {
      this._prevParams = _.clone(this.getParams());
    }
    WsapiActionCreators.loadRecords(this.getParams());

  },

  getInitialState: function() {
    return {
      types: TypeStore.getTypes(),
      states: StateStore.getStates()
    };
  },

  _onTypeChange: function() {
    this.setState({
      types: TypeStore.getTypes(),
    });

    WsapiActionCreators.loadRecords(this.getParams());
  },

  _onStateChange: function() {
    this.setState({
      states: StateStore.getStates()
    });
  },

  _onRecordChange: function() {
    this.setState({
      records: RecordStore.getRecords()
    })
  },

  componentWillMount: function(){
    TypeStore.addChangeListener(this._onTypeChange);
    WsapiActionCreators.loadTypes();

    StateStore.addChangeListener(this._onStateChange);
    WsapiActionCreators.loadStates();

    RecordStore.addChangeListener(this._onRecordChange);
  },

  render: function() {
    var type = this.getParams().type;
    var states = this.state.states[type] || [];
    var records = this.state.records || {};
    var groupedRecords = _.groupBy(records, function(record) {
      return record.State ? record.State._refObjectName : states[0];
    });

    var maxRecords = _.max(groupedRecords, function(records) {return records.length}).length;

    return (
      <Grid fluid={true}>
        {states.map(function(state) {
          return (
            <Col xs={Math.floor(12 / states.length)} key={state}>
              <p>{state}</p>
              {
                groupedRecords[state] ?
                  groupedRecords[state].map(function(record) {
                    return (
                      <Row>
                        <Link to={'/' + record.PortfolioItemTypeName + '/' + record.ObjectID}>{record.Name}</Link>
                      </Row>
                    )
                  })
                :
                  <p></p>
              }
            </Col>
          )
        })}
      </Grid>
    );
  }
});

module.exports = KanbanView;