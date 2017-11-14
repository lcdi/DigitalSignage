<?php

require_once("../php/global.php");
if(!isset($_SESSION['user']))
{
	redirect_to("../../index.php?to=src/html/tables.php");
}

?>

<html lang="en">
<head>

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width = device-width, initial-scale = 1">
<title>Tables</title>
<link type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" rel="stylesheet" href="../css/general.css">
<link type="text/css" rel="stylesheet" href="../css/bootstrap-table.css">

</head>
<body>

    <div class="container-fluid">
        <div class="row content">
            <div class="col-sm-2 sidenav hidden-xs">
                <h2><img class="img-thumbnail" src="https://lcdiblog.champlain.edu/wp-content/uploads/sites/11/2013/11/LCDI.png"></h2>
                <ul class="nav nav-pills nav-stacked">
                    <li><a href="adminlanding.php">Dashboard</a></li>
                    <li class="active"><a href="#">View Tables</a></li>
                    <li><a href="user_page.php">Manage Users</a></li>
                    <!-- Add to sidebar here -->
                </ul><br>
            </div><br>
            <div class="col-md-9">
                <nav class="navbar navbar-default">
                    <ul class="nav navbar-nav">
                    <li><a class="tablebar" href="javascript:void(0)" id="weather">Weather</a></li>
                    <li><a class="tablebar" href="javascript:void(0)" id="project_hours">Project Hours</a></li>
                    <li><a class="tablebar" href="javascript:void(0)" id="student">Student Spotlight</a></li>
                    <!-- Add more buttons for tables here and add the table info into the js file -->
                    </ul>
                </nav>
                <div class="page-header">
                    <h1 id="table_head">Data Table</h1>
					    <button class="btn glyphicon glyphicon-plus add"></button>
                    <table 	id="table" class="display" data-show-columns="true" data-height="600"></table>

                </div>
            </div>
        </div>
    </div>
					<!-- Modal -->
    <div class="modal fade" id="message" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title"></h4>
					</div>
					<div class="modal-body">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>


		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="../js/bootstrap-table.js"></script>
		<script src="../js/tables.js"></script>
</body>
</html>
