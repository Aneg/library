Ext.onReady(function() {
    Ext.application({
        requires: ['Ext.container.Viewport'],
        name : 'Library',
        controllers: ['BookMaster'],

        launch : function(){
            Ext.create('Ext.container.Viewport',
                {
                    layout : 'fit',
                    items : [{
                        xtype : 'BookGrid'
                    }]
                });
        }
    });
});