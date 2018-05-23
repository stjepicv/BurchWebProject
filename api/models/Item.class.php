<?php
    class Item {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getAll() {
            $sql = 'SELECT * FROM item';
            return $this->pdo->query($sql)->fetchAll();
        }
    }