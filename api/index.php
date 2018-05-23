<?php
    require 'vendor/autoload.php';

    require_once 'models/Item.class.php';

    Flight::register('pdo', 'PDO', array('mysql:host=localhost;dbname=burch','root',''), 
        function($pdo) {
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
    );
    
    Flight::register('item', 'Item', array(Flight::pdo()));

    Flight::route('GET /items', function() {
        $items = Flight::item()->getAll();
        Flight::json($items);
    });

    Flight::start();