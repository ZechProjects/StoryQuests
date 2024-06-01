<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods (GET, POST, OPTIONS, PUT, DELETE)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Define result
$result = array();

//TODO Avatar generation
$avatar = array();

$ENVIRONMENTS_1 = array('forest', 'mountain', 'town');
$MONSTERS_1 = array('Goblin', 'Bandit', 'Slime');
$TREASURES_1 = array('Short Sword', 'Leather Armor', 'Buckler');

$phase = array(
    "environment" => $ENVIRONMENTS_1[array_rand($ENVIRONMENTS_1)],
    "encounters" => $MONSTERS_1[array_rand($MONSTERS_1)],
    "treasures" => $TREASURES_1[array_rand($TREASURES_1)],
    "image" => 'http://localhost/StoryQuests/app/web/html/assets/cache/ninja-town-slime.png'
);

$result[] = $phase;

$ENVIRONMENTS_2 = array('cave', 'dungeon', 'jungle');
$MONSTERS_2 = array('Orc', 'Serpent', 'Zombie');
$TREASURES_2 = array('Longsword', 'Iron Armor', 'Gauntlets');

$phase = array(
    "environment" => $ENVIRONMENTS_2[array_rand($ENVIRONMENTS_2)],
    "encounters" => $MONSTERS_2[array_rand($MONSTERS_2)],
    "treasures" => $TREASURES_2[array_rand($TREASURES_2)],
    "image" => 'http://localhost/StoryQuests/app/web/html/assets/cache/necromancer-dungeon-serpent.png'
);

$result[] = $phase;

$ENVIRONMENTS_3 = array('castle', 'volcano', 'demon realm');
$MONSTERS_3 = array('Vampire Lord', 'Elder Dragon', 'Demon', 'Beholder');
$TREASURES_3 = array('Excalibur', 'Mithril Armor', 'Wish Stone');

$phase = array(
    "environment" => $ENVIRONMENTS_3[array_rand($ENVIRONMENTS_3)],
    "encounters" => $MONSTERS_3[array_rand($MONSTERS_3)],
    "treasures" => $TREASURES_3[array_rand($TREASURES_3)],
    "image" => 'http://localhost/StoryQuests/app/web/html/assets/cache/paladin-volcano-beholder.png'
);

$result[] = $phase;

// Create an associative array to hold the data
$data = array(
    "result" => $result
);

// Encode the data to JSON format
$json_data = json_encode($data);

// Print the JSON data
echo $json_data;
