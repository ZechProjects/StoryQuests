<?php
define('NAMES_MALE', array('Axel', 'Alex', 'Brandon', 'Charles', 'Daren', 'Francis', 'Gerad', 'Norman', 'Roy'));
define('NAMES_FEMALE', array('Alice', 'Amelia', 'Sophia', 'Evelyn', 'Charlotte', 'Isabella', 'Eliana', 'Scarlett', 'Penelope'));

function createAvatar()
{
    $class = $_GET['class'];

    $result = array();
    if (rand(0, 1) == 1) {
        $result['name'] = NAMES_MALE[array_rand(NAMES_MALE)];
    } else {
        $result['name'] = NAMES_FEMALE[array_rand(NAMES_FEMALE)];
    }
    $result['class'] = $class;
    $result['level'] = rand(1, 10);
    $result['strength'] = rand(1, 100);
    $result['wisdom'] = rand(1, 100);
    $result['agility'] = rand(1, 100);
    $result['luck'] = rand(1, 100);

    $result['health'] = rand(1, 100) * $result['strength'];
    $result['mana'] = rand(1, 100);
    return $result;
}
