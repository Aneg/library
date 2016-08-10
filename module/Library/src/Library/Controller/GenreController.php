<?php
namespace Library\Controller;


use Library\Model\Genre;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class GenreController extends AbstractActionController
{
    protected $genreTable;

    public function indexAction()
    {
        $em = $this->getModelTable();
        $models = $em->fetchAll();

        $ajax = [];
        /** @var Genre $model */
        foreach ($models as $model) {
            $ajax[] = ['Id' => $model->id, 'name' => $model->name];
        }
        return new JsonModel($ajax);
    }

    public function updateAction()
    {
        $em = $this->getModelTable();
        $body = $this->getRequest()->getContent();
        $data = json_decode($body);
        /** @var \stdClass $row */
        foreach ($data as $row) {
            $genre = new Genre();
            $genre->exchangeArray([
                'id' => $row->Id,
                'name' => $row->name,
            ]);
            $em->saveModel($genre);
        }
        return new JsonModel();
    }

    public function destroyAction()
    {
        $em = $this->getModelTable();
        $body = $this->getRequest()->getContent();
        $data = json_decode($body);
        /** @var \stdClass $row */
        foreach ($data as $row) {
            if ($row->Id)
                $em->deleteModel($row->Id);
        }
        return new JsonModel();
    }

    public function getModelTable()
    {
        if (!$this->genreTable) {
            $sm = $this->getServiceLocator();
            $this->genreTable = $sm->get('Library\Model\GenreTable');
        }
        return $this->genreTable;
    }
}