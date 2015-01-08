var parentChildTypeMap = {
    hierarchicalrequirement: [
        {typePath: 'defect', collectionName: 'Defects', parentField: 'Requirement'},
        {typePath: 'task', collectionName: 'Tasks', parentField: 'WorkProduct'},
        {typePath: 'testcase', collectionName: 'TestCases', parentField: 'WorkProduct'}
    ],
    defect: [
        {typePath: 'task', collectionName: 'Tasks', parentField: 'WorkProduct'},
        {typePath: 'testcase', collectionName: 'TestCases', parentField: 'WorkProduct'}
    ],
    defectsuite: [
        {typePath: 'defect', collectionName: 'Defects', parentField: 'DefectSuite'},
        {typePath: 'task', collectionName: 'Tasks', parentField: 'WorkProduct'},
        {typePath: 'testcase', collectionName: 'TestCases', parentField: 'WorkProduct'}
    ],
    testset: [
        {typePath: 'task', collectionName: 'Tasks', parentField: 'WorkProduct'},
        {typePath: 'testcase', collectionName: 'TestCases', customTraversal: 'TestSet'}
    ]
};

_getChildTypes = function (parentType, property) {
    parentType = parentType.toLowerCase();
    var childTypes;

    if (parentType.indexOf('portfolioitem') === 0) {
        childTypes = _.contains(parentType, 'feature') ? 
            [{typePath: 'hierarchicalrequirement', collectionName: 'UserStories', parentField: 'PortfolioItem'}] :
            [{typePath: 'portfolioitem', collectionName: 'Children', parentField: 'Parent'}]
    } else {
        childTypes = parentChildTypeMap[parentType];    
    }

    return _.pluck(childTypes, property);
};

module.exports = {
    generateUrlLink: function(){
        // debugger;
    },

    getChildTypes: function (parentType) {
        return _getChildTypes(parentType, 'typePath');
    },

    getChildFields: function (parentType) {
        return _getChildTypes(parentType, 'collectionName');
    },

    getParentFields: function (parentType) {
        return _.uniq(_getChildTypes(parentType, 'parentField'));
    }
}