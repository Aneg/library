<?php
namespace Application\Form;

use Zend\Form\Form;

class GenreForm extends Form
{
    public function __construct($name = null)
    {
        parent::__construct('book');
        $this->setAttribute('method', 'post');
        $this->add(array(
            'name' => 'id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'name',
            'type' => 'Text',
            'options' => array(
                'label' => 'Жанр',
            ),
        ));
    }
}