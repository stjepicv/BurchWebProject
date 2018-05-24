<?php
    class User {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function create($email, $username, $pw_hash) {
            $sql = 'INSERT INTO user(email, username, password_hash) VALUES(:email, :username, :pw_hash)';
            $statement = $this->pdo->prepare($sql);
            return $statement->execute([
                ':email' => $email,
                ':username' => $username,
                ':pw_hash' => $pw_hash
            ]);
        }

        public function getByUsername($username) {
            $sql = 'SELECT * FROM user WHERE username = :username';
            $statement = $this->pdo->prepare($sql);
            $statement->execute([':username' => $username]);

            return $statement->fetch();
        }
    }