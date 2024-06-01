<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods (GET, POST, OPTIONS, PUT, DELETE)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Define result
$result = array();
require_once __DIR__ . '/../../../inc/lib/game/avatar.php';
$result = createAvatar();
// Create an associative array to hold the data
$data = array(
    "result" => $result
);

// Encode the data to JSON format
$json_data = json_encode($data);

// Print the JSON data
echo $json_data;
