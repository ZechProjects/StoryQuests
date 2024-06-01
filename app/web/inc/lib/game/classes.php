<?php
define('CLASSES', array('Ninja', 'Paladin', 'Gunslinger', 'Fire Mage', 'Barbarian', 'Necromancer', 'Summoner', 'Hero', 'Dark Knight'));

function getClasses($count = 3)
{
    $copy = CLASSES;
    shuffle($copy);
    return array_slice($copy, 0, $count);
}
