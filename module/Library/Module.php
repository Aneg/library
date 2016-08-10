<?php
namespace Library;

use Library\Model\Book;
use Library\Model\BookTable;
use Library\Model\Genre;
use Library\Model\GenreTable;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

class Module
{
    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'Library\Model\GenreTable' =>  function($sm) {
                    $tableGateway = $sm->get('GenreTableGateway');
                    $table = new GenreTable($tableGateway);
                    return $table;
                },
                'GenreTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Genre());
                    return new TableGateway('genre', $dbAdapter, null, $resultSetPrototype);
                },

                'Library\Model\BookTable' =>  function($sm) {
                    $tableGateway = $sm->get('BookTableGateway');
                    $table = new BookTable($tableGateway);
                    return $table;
                },
                'BookTableGateway' => function ($sm) {
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Book());
                    return new TableGateway('book', $dbAdapter, null, $resultSetPrototype);
                },
            ),
        );
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
}