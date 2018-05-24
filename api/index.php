<?php
    require 'vendor/autoload.php';

    require_once 'models/Item.class.php';
    require_once 'models/User.class.php';

    use \Firebase\JWT\JWT;

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


    Flight::route('POST /user/login', function() {
        $post = Flight::request()->data;
        $username = $post->username;
        $password = $post->password;

        $user = Flight::user()->getByUsername($username);
        if(!$user) {
            Flight::halt(400);
        }
        else if(!password_verify($password, $user['password_hash'])) {
            Flight::halt(400);
        }
        else {
            unset($user['password_hash']);
            $token = JWT::encode($user, 'test_key');
            $user['token'] = $token;
    
            Flight::json($user);
        }
    });

    Flight::start();