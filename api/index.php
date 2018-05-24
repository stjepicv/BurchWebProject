<?php
    require 'vendor/autoload.php';

    require_once 'models/Item.class.php';
    require_once 'models/User.class.php';

    Flight::register('pdo', 'PDO', array('mysql:host=localhost;dbname=burch','root',''), 
        function($pdo) {
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
    );
    
    Flight::register('item', 'Item', array(Flight::pdo()));
    Flight::register('user', 'User', array(Flight::pdo()));

    Flight::route('GET /items', function() {
        $items = Flight::item()->getAll();
        Flight::json($items);
    });

    Flight::route('POST /user/register', function() {
        $post = Flight::request()->data;
        $email = $post->email;
        $username = $post->username;
        $password = $post->password;

        $pw_hash = password_hash($password, PASSWORD_DEFAULT);

        Flight::user()->create($email, $username, $pw_hash);
    });

    Flight::start();