Ext.define('Library.model.Book',
    {
        extend : 'Ext.data.Model',
        idProperty : 'Id',
        fields: [
            { name: 'Id', type: 'int', defaultValue: 0 },
            { name: 'name', type: 'string' },
            { name: 'author', type: 'string' },
            { name: 'about', type: 'string' },
            { name: 'genre_id', type: 'string' }
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
                read: '/library/book',
                create: '/library/book/update',
                update : '/library/book/update',
                destroy : '/library/book/destroy'
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
