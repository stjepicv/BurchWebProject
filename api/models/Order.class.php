<?php
    class Order {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function create($userId, $itemIds) {
            $this->pdo->beginTransaction();
            $sql = 'INSERT INTO cart_order(user_id) VALUES(:user_id)';
            $statement = $this->pdo->prepare($sql);
            $statement->execute([':user_id' => $userId]);

            $orderId = $this->pdo->lastInsertId();
            $sql = 'INSERT INTO cart_order_item(cart_order_id, item_id) VALUES(:order_id, :item_id)';
            $statement = $this->pdo->prepare($sql);
            
            foreach($itemIds as $itemId) {
                $statement->execute([':order_id' => $orderId, ':item_id' => $itemId]);
            }

            $this->pdo->commit();
        }

        public function getByUserId($userId) {
            $sql = 'SELECT id, time FROM cart_order WHERE user_id = :user_id';
            $statement = $this->pdo->prepare($sql);
            $statement->execute([':user_id' => $userId]);
            $orders = $statement->fetchAll();

            $sql = 'SELECT * FROM item WHERE id IN (SELECT item_id FROM cart_order_item WHERE cart_order_id = :order_id)';
            $statement = $this->pdo->prepare($sql);
            foreach($orders as $i => $order) {
                $statement->execute([':order_id' => $order['id']]);
                $orders[$i]['items'] = $statement->fetchAll();
            }

            return $orders;
        }
    }