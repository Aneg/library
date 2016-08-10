Ext.define('Library.store.Genre',
    {
        extend: 'Ext.data.Store',
        model: 'Library.model.Genre',
        autoLoad: true,
        autoSync: false,
        storeId: 'Genre',
        pageSize: 5
    });