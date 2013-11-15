<?php

/*
	fake request handling for the app
*/
require('list-data.php');

$verb = $_SERVER['REQUEST_METHOD'];
$url_elements = explode('/', $_SERVER['PATH_INFO']);
$body = json_decode(file_get_contents("php://input"), true);

$body['method'] = $verb;
$data_function = array_pop($url_elements);

$response = json_encode($data_function($list_data, $body));

echo $response;

// =============
// = functions =
// =============

function GetList($data, $params)
{		
	for ($i=0; $i < count($data); $i++) { 
		if ($data[$i]['id'] == $params['list_id']) {
			return $data[$i];
		}
	}
	return false;
}


function GetUserLists($data, $params=null)
{
	// reutrn list of user lists
	/*
		format:
		{
		   "d":{
		      "__type":"UserListsResult",
		      "lists":[
		         {
		            "list_id":"c420c604-a5f6-49dd-b769-7827478c9979",
		            "name":"Christmas List"
		         }
		      ]
		   }
		}
	*/
	$d = array(
		"__type" => "UserListsResult",
		"lists" => array()
		);

	for ($i=0; $i < count($data); $i++) { 
		array_push($d['lists'], array("list_id"=>$data[$i]['id'], "name"=>$data[$i]['name']));
	}
	
	return $d;
}
?>