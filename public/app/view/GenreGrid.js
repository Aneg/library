Ext.define('Library.view.GenreGrid',
    {

        extend: 'Ext.grid.Panel',
        alias: 'widget.GenreGrid',
        id: 'genreGrid',
        config: {},
        constructor : function(config){
            this.initConfig(config);
            return this.callParent(arguments);
        },
        width : '100%',
        height : 300,
        selType : 'checkboxmodel',
        selModel :
        {
            mode : 'MULTI'
        },
        viewConfig :
        {
            stripeRows : true
        },
        initComponent: function () {
            Ext.apply(this,
                {
                    store: 'Library.store.Genre',

                    plugins : [Ext.create('Ext.grid.plugin.RowEditing',
                        {
                            clicksToEdit : 2
                            //if you have checkbox in first row then take clicksToEdit=2 otherwise it will go on edit mode
                        })],

                    columns : [{
                        text : "Id",
                        dataIndex : 'Id',
                        hidden : false,
                        width : 35
                    },
                        {
                            text: "Name",
                            flex: 1,
                            dataIndex: 'name',
                            editor:
                            {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: false
                            }
                        }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout:
                        {
                            pack: 'center'
                        },
                        defaults:
                        {
                            minWidth: 80
                        },
                        items: [
                            {
                                text: 'Добавиь',
                                itemId: 'btnCreate'
                            },
                            {
                                text: 'Обновить',
                                itemId: 'btnLoad'
                            },

                            {
                                text: 'Сохранить',
                                itemId: 'btnSave'
                            },
                            {
                                text: 'Удалить',
                                itemId: 'btnDelete'
                            }]
                    }]
                });
            this.callParent(arguments);
        }

    });