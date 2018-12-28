<?php
# TODO 20181228 - some security checks !!
$datasetFileContent = file_get_contents('php://input');
$dataset = json_decode($datasetFileContent, true);

// TODO : create a folder a day ?
$path = '../data/contribs/' . date('Y-m-d') . '-' . substr($dataset['@id'], 2) . '.json';

#$path = '../../00c61e116a8800a4c1d6ea6314fec2c1/' . 'tracesusage_' . date('Y-m-d') . '.txt';
file_put_contents($path, $datasetFileContent, LOCK_EX);

$contribItemsPath = '../data/contrib_items.json';
$contribItems = json_decode(file_get_contents($contribItemsPath), true);
$contribItems[$dataset['@id']] = $dataset;

file_put_contents($contribItemsPath, json_encode($contribItems), LOCK_EX);
echo '"done"';
?>
