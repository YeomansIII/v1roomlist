<?php
$user = "jason";
$pass = "089797";

function execute_query($query) {
	global $conn;
	$data = $conn->query($query);
	return $data;
}

function addToFloor() {
	global $conn;
	if(isset($_POST['name'])) {
		$name = $_POST['name'];
		$floor = $_POST['floor'];
		$building = $_POST['building'];

		$query = "INSERT INTO ".$building." (floor, name) VALUES(:floor, :name)";
		$stmt = $conn->prepare($query);
	    $stmt->execute(array(':floor' => $floor, ':name' => $name));
  }
}

function getRoomNumbers() {
    global $conn;
	$building = $_POST['building'];

	$r = $conn->prepare("SELECT room FROM ".$building);
	$r->execute();
	$list = array();
	$list = $r->fetchAll(PDO::FETCH_COLUMN, 0);
	echo json_encode($list);
}

function getTable() {
    $building = $_POST['building'];
    $query = "SELECT * FROM ".$building." ORDER BY floor";
		$result = execute_query($query);

		$buildingSpace = str_replace('_', ' ', $building);

    echo '<h2>'.$buildingSpace.'</h2> <table class="roomtable">
                <tr>
								<th id="floorCol">Floor</th><th id="nameCol">Name</th>
                </tr>';

	while($row = $result->fetch(PDO::FETCH_OBJ)) {
	    echo "<tr> <td>".$row->floor."</td> <td>".$row->name."</td> </tr>";
	}
	echo "</table>";
}


try {
	global $conn;
	$conn = new PDO("mysql:host=localhost;dbname=quroom", $user, $pass);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}

//addToFloor();
if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'addToFloor' : addToFloor();break;
        case 'getRoomNumbers' : getRoomNumbers();break;
        case 'getTable' : getTable();break;
    }
}

?>
