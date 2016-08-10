Ext.define('Library.controller.BookMaster',
    {
        extend : 'Ext.app.Controller',
        models : ['Library.model.Book'],
        stores : ['Library.store.Book'],
        views: ['Library.view.BookGrid'],

        refs : [{
            ref : 'bookGrid',
            selector : 'viewport BookGrid'
        }],

        init : function(){

            this.control({
                'viewport > BookGrid button[itemId=btnSave]':
                {
                    click : this.onSaveClick
                },
                'viewport > BookGrid button[itemId=btnCreate]':
                {
                    click : this.onCreateClick
                },
                'viewport > BookGrid button[itemId=btnDelete]':
                {
                    click : this.onDeleteClick
                },
                'viewport > BookGrid button[itemId=btnLoad]' :
                {
                    click : this.onLoadClick
                }
            });
        },

        onSaveClick : function(){


            var bookGrid = this.getBookGrid();
            var bookStore = bookGrid.getStore();

            //fires create, update and delete request when calling sync and commit changes in the store when autoSync=false
            bookStore.sync({

                success : function(batch, opt){
                    Ext.Msg.alert('Status', 'Данные успешно изменены.');
                },
                failure : function(batch, opt){
                    var msg = '';

                    if(batch.hasException){

                        for(var i = 0; i < batch.exceptions.length; i ++ ){
                            switch(batch.exceptions[i].action){
                                case "destroy" :
                                    msg = msg + batch.exceptions[i].records.length + " Удалить, ";
                                    break;
                                case "update" :
                                    msg = msg + batch.exceptions[i].records.length + " Обновить, ";
                                    break;
                                case "create" :
                                    msg = msg + batch.exceptions[i].records.length + " Добавить, ";
                                    break;
                            }
                        }

                        Ext.Msg.alert("Status", msg + " operation failed!");
                    }
                    else
                        Ext.Msg.alert('Status', 'Changes failed.');
                }
            });


        },

        onLoadClick : function(){

            var bookStore = Ext.create('Library.store.Book');
            bookStore.load({
                scope : this,
                callback : function(records, operation, success){

                    var bookGrid = this.getBookGrid();
                    bookGrid.bindStore(bookStore);
                }
            });

        },
        onCreateClick : function(){

            var bookGrid = this.getBookGrid();
            var bookStore = bookGrid.getStore();

            var bookModel = Ext.create('Library.model.Book');
            bookModel.set("name", "Название жанра");
            bookStore.add(bookModel);


        },
        onDeleteClick : function(){

            var bookGrid = this.getBookGrid();
            var bookStore = bookGrid.getStore();

            var selectedRows = bookGrid.getSelectionModel().getSelection();
            if(selectedRows.length)
                bookStore.remove(selectedRows);
            else
                Ext.Msg.alert('Status', 'Please select at least one record to delete!');
        }
    });
