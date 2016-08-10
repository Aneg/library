Ext.define('Library.view.BookGrid',
    {

        extend: 'Ext.grid.Panel',
        alias: 'widget.BookGrid',
        id: 'bookGrid',
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
                    store: 'Library.store.Book',

                    plugins : [Ext.create('Ext.grid.plugin.RowEditing',
                        {
                            clicksToEdit : 2
                            //if you have checkbox in first row then take clicksToEdit=2 otherwise it will go on edit mode
                        })],

                    columns : [
                        {
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
                        },
                        {
                            text: "Author",
                            flex: 1,
                            dataIndex: 'author',
                            editor:
                            {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: false
                            }
                        },
                        {
                            text: "About",
                            flex: 1,
                            dataIndex: 'about',
                            editor:
                            {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: false
                            }
                        },
                        {
                            text: "Genre",
                            flex: 1,
                            dataIndex: 'genre_id',
                            editor:
                            {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: false
                            }
                        },
                    ],
                    selType: 'cellmodel',
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1
                        })
                    ],
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