<?
$user = "jason";
$pass = "089797";

function execute_query($query) {
	global $conn;
	$data = $conn->query($query);
	return $data;
}

function addToRoom() {
	global $conn;
	if(isset($_POST['name'])) {
	$name = $_POST['name'];
	$bed = $_POST['bed'];
	$building = $_POST['building'];
	$room = $_POST['room'];
	
	echo "".$name." ".$bed." ".$building." ".$room;
	
	if(strcmp($bed, "A")==0) {
	$query = "UPDATE ".$building." SET name1=:name WHERE room=:room";
	$stmt = $conn->prepare($query);
    $stmt->execute(array(':name' => $name, ':room' => $room));
	}
	elseif(strcmp($bed, "B")==0) {
	$query = "UPDATE ".$building." SET name2=:name WHERE room=:room";
	$stmt = $conn->prepare($query);
    $stmt->execute(array(':name' => $name, ':room' => $room));
	}
	elseif(strcmp($bed, "C")==0) {
	$query = "UPDATE ".$building." SET name3=:name WHERE room=:room";
	$stmt = $conn->prepare($query);
    $stmt->execute(array(':name' => $name, ':room' => $room));
	}
	elseif(strcmp($bed, "D")==0) {
	$query = "UPDATE ".$building." SET name4=:name WHERE room=:room";
	$stmt = $conn->prepare($query);
    $stmt->execute(array(':name' => $name, ':room' => $room));
	}
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
    $query = "SELECT * FROM ".$building;
	$result = execute_query($query);

    echo '<h2>'.$building.'</h2> <h4 id="floorplans">Floorplans: <a href="http://housing.gmu.edu/halls/traditional/upload/Commons2.swf">Commons</a>  <a href="http://housing.gmu.edu/halls/traditional/upload/Presidents_Park_CS5_v2-31.swf">Presidents Park</a>  <a href="http://housing.gmu.edu/halls/suites/upload/Dominion-and-Commonwealth.swf">CO-DO</a></h4><table class="roomtable">
                <tr>
                    <th class="bedCol">Bed A</th>
                    <th class="bedCol">Bed B</th>
                    <th class="bedCol">(Bed C)</th>
                    <th class="bedCol">(Bed D)</th>
                    <th id="floorCol">Floor</th> 
                    <th id="roomCol">Room</th>
                </tr>';

	while($row = $result->fetch(PDO::FETCH_OBJ)) {
	    echo "<tr> <td>".$row->name1."</td> <td>".$row->name2."</td> <td>".$row->name3."</td> <td>".$row->name4."</td> <td>".$row->floor."</td> <td>".$row->room."</td> </tr>";
	}
	echo "</table>";
}


try {
global $conn;
$conn = new PDO("mysql:host=localhost;dbname=gmuroom", $user, $pass);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}

addToRoom();
if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'addToRoom' : addToRoom();break;
        case 'getRoomNumbers' : getRoomNumbers();break;
        case 'getTable' : getTable();break;
    }
}

?>