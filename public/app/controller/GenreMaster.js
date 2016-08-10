Ext.define('Library.controller.GenreMaster',
    {
        extend : 'Ext.app.Controller',
        models : ['Library.model.Genre'],
        stores : ['Library.store.Genre'],
        views: ['Library.view.GenreGrid'],

        refs : [{
            ref : 'genreGrid',
            selector : 'viewport GenreGrid'
        }],

        init : function(){

            this.control({
                'viewport > GenreGrid button[itemId=btnSave]':
                {
                    click : this.onSaveClick
                },
                'viewport > GenreGrid button[itemId=btnCreate]':
                {
                    click : this.onCreateClick
                },
                'viewport > GenreGrid button[itemId=btnDelete]':
                {
                    click : this.onDeleteClick
                },
                'viewport > GenreGrid button[itemId=btnLoad]' :
                {
                    click : this.onLoadClick
                }
            });
        },

        onSaveClick : function(){


            var genreGrid = this.getGenreGrid();
            var genreStore = genreGrid.getStore();

            //fires create, update and delete request when calling sync and commit changes in the store when autoSync=false
            genreStore.sync({

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

            var genreStore = Ext.create('Library.store.Genre');
            genreStore.load({
                scope : this,
                callback : function(records, operation, success){

                    var genreGrid = this.getGenreGrid();
                    genreGrid.bindStore(genreStore);
                }
            });

        },
        onCreateClick : function(){

            var genreGrid = this.getGenreGrid();
            var genreStore = genreGrid.getStore();

            var genreModel = Ext.create('Library.model.Genre');
            genreModel.set("name", "Название жанра");
            genreStore.add(genreModel);


        },
        onDeleteClick : function(){

            var genreGrid = this.getGenreGrid();
            var genreStore = genreGrid.getStore();

            var selectedRows = genreGrid.getSelectionModel().getSelection();
            if(selectedRows.length)
                genreStore.remove(selectedRows);
            else
                Ext.Msg.alert('Status', 'Please select at least one record to delete!');
        }
    });
