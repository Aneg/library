Ext.define('Library.store.Book',
    {
        extend: 'Ext.data.Store',
        model: 'Library.model.Book',
        autoLoad: true,
        autoSync: false,
        storeId: 'Book',
        pageSize: 5
    });