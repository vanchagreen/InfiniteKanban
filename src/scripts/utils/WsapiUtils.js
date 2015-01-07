var $ = require('jquery');
var hostname = 'https://rally1.rallydev.com';
var _ = require('lodash');

function getJson(url, data) {
    return $.ajax({
        url: url,
        dataType: 'json',
        data: data,
        xhrFields: {
            withCredentials: true
        }
    });
}

module.exports = {
    getWsapiVersion: function () {
        return 'v2.0';
    },

    getRelativeRef: function(ref) {
        var wsapiVersion = this.getWsapiVersion();
        return ref.substr(ref.indexOf(wsapiVersion) + wsapiVersion.length);
    },

    getSchema: function(options) {
        return getJson(hostname + '/slm/schema/' + this.getWsapiVersion() + '/project/' + options.project.OID + '/' + options.project.SchemaVersion).then(function(results) {
            return results.QueryResult.Results;
        });
    },

    getRecords: function(options) {
        var params = {
            start: 1,
            pagesize: options.pageSize || 50,
            fetch: options.fields.join(',')
        };

        if (options.project) {
            params.project = this.getRelativeRef(options.project._ref);
            params.projectScopeUp = false;
            params.projectScopeDown = true;
        } else {
            params.workspace = options.workspace;
        }

        if (options.query) {
            params.query = options.query;
        }
        if (options.types) {
            params.types = options.types.join(',');
        }
        return getJson(hostname + '/slm/webservice/' + this.getWsapiVersion() + '/' + options.typeName, params).then(function(results) {
            _.each(results.QueryResult.Errors, function (error) {
                throw error;
            });
            return {
                typeName: options.typeName,
                records: _.map(results.QueryResult.Results, this.relativizeRefs, this),
                totalRecordCount: results.QueryResult.TotalRecordCount,
                pageSize: results.QueryResult.PageSize
            }
        }.bind(this));
    },

    relativizeRefs: function (record) {
        if (record._ref) {
            record._ref = this.getRelativeRef(record._ref);
        }
        _.forOwn(record, function (value) {
            if (_.isObject(value)) {
                this.relativizeRefs(value);
            }
        }, this);
        return record;
    },

    getPreferences: function(options) {
        // fake the wsapi call, just use the defaults
        var deferred = new $.Deferred();

        deferred.resolve({
            fields: options.defaultFields
        });
        
        return deferred.promise();
    }
};