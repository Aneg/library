<?php
namespace Library\Controller;

use Library\Model\Book;
use Library\Model\Genre;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class BookController extends AbstractActionController
{
    protected $bookTable;

    public function indexAction()
    {
        $em = $this->getModelTable();
        $models = $em->fetchAll();

        $ajax = [];
        /** @var Book $model */
        foreach ($models as $model) {
            $ajax[] = [
                'Id' => $model->id,
                'name' => $model->name,
                'author' => $model->author,
                'about' => $model->about,
                'genre_id' => $model->genre_id
            ];
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
            $book = new Book();
            $book->exchangeArray([
                'id' => $row->Id,
                'name' => $row->name,
                'author' => $row->author,
                'about' => $row->about,
                'genre_id' => $row->genre_id
            ]);
            try {
                $em->saveModel($book);
            } catch (\Exception $e) {
                return new JsonModel(['status' => 'error']);
            }
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
        if (!$this->bookTable) {
            $sm = $this->getServiceLocator();
            $this->bookTable = $sm->get('Library\Model\BookTable');
        }
        return $this->bookTable;
    }
}
