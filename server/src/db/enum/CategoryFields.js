const CategoryFields = {
    'id': {
        'value' : 'id',
        'type' : 'int'
    },
    'name': {
        'value' : 'name',
        'type' : 'string'
    },
    'level': {
        'value' : 'level',
        'type' : 'int'
    },
    'l1': {
        'value' : 'l1',
        'type' : 'int'
    },
    'l2': {
        'value' : 'l2',
        'type' : 'int'
    },
    'children' : {
        'value' : 'id',
        'type' : 'object'
    },
    'operator' : ["AND", "OR"]
};

module.exports = {
    CategoryFields
};