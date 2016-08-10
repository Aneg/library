Ext.define('Library.model.Genre',
    {
        extend : 'Ext.data.Model',
        idProperty : 'Id',
        fields: [
            { name: 'Id', type: 'int', defaultValue: 0 },
            { name: 'name', type: 'string' }
        ],
        validations : [{
            type : 'presence',
            field : 'name'
        }],
        proxy :
        {
            type : 'ajax',

            api :
            {
                read: '/library/genre',
                create: '/library/genre/update',
                update : '/library/genre/update',
                destroy : '/library/genre/destroy'
            },
            reader :
            {
                type : 'json',
                root : 'data',
                totalProperty : 'TotalCount'
            },
            actionMethods :
            {
                destroy : 'POST',
                read : 'GET',
                create : 'POST',
                update : 'POST'
            },
            writer: {
                type : 'json',
                allowSingle : false // set false to send a single record in array
            }
        }
    });