<?php
    class Item {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getAll() {
            $sql = 'SELECT * FROM item';
            $items = $this->pdo->query($sql)->fetchAll();
            
            for($i = 0; $i < count($items); $i++) {
                $items[$i]['images'] = $this->getImages($items[$i]['id']);
            }

            return $items;
        }

        private function getImages($itemId) {
            $sql = 'SELECT filename FROM item_image WHERE item_id = :item_id';
            $statement = $this->pdo->prepare($sql);
            $statement->execute(['item_id' => $itemId]);
            
            return $statement->fetchAll();
        }
    }