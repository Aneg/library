<?php
namespace Library\Model;

use Zend\Db\TableGateway\TableGateway;

class BookTable
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function getModel($id)
    {
        $id  = (int) $id;
        $rowset = $this->tableGateway->select(array('id' => $id));
        $row = $rowset->current();
        if (!$row) {
            throw new \Exception("Could not find row $id");
        }
        return $row;
    }

    public function fetchAll()
    {
        $resultSet = $this->tableGateway->select();
        return $resultSet;
    }

    public function saveModel(Book $book)
    {
        $data = array(
            'name' => $book->name,
            'author' => $book->author,
            'about' => $book->about,
            'genre_id' => (int) $book->genre_id,
        );

        $id = (int) $book->id;
        if ($id == 0) {
            $this->tableGateway->insert($data);
        } else {
            if ($this->getModel($id)) {
                $this->tableGateway->update($data, array('id' => $id));
            } else {
                throw new \Exception('Model id does not exist');
            }
        }
    }

    public function deleteModel($id)
    {
        $this->tableGateway->delete(array('id' => (int) $id));
    }
}