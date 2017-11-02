<?php
require_once("../php/global.php");
?>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width = device-width, initial-scale = 1">
<title>Bootstrap Tutorial</title>
<link type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" href="../css/bootstrap-table.css" rel="stylesheet">
<style>
		/* Set height of the grid so .sidenav can be 100% (adjust as needed) */
		.row.content {height: 100%}
		
		/* Set gray background color and 100% height */
		.sidenav {
		  background-color: #f1f1f1;
		  height: 100%;
		}
			
		/* On small screens, set height to 'auto' for the grid */
		@media screen and (max-width: 767px) {
		  .row.content {height: auto;} 
		}
		</style>
		
</head>
<body>
		<nav class="navbar navbar-inverse visible-xs">
				<div class="container-fluid">
				  <div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					  <span class="icon-bar"></span>
					  <span class="icon-bar"></span>
					  <span class="icon-bar"></span>                        
					</button>
				  </div>
				  <div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav">
					  <li class="active"><a href="#">Dashboard</a></li>
					  <li><a href="#">Age</a></li>
					  <li><a href="#">Gender</a></li>
					  <li><a href="#">Geo</a></li>
					</ul>
				  </div>
				</div>
			  </nav>
			  <div class="container-fluid">
					<div class="row content">
					  <div class="col-sm-3 sidenav hidden-xs">
						<h2><img class="img-thumbnail" src="logo.png"></h2>
						<ul class="nav nav-pills nav-stacked">
						  <li class="active"><a href="#section1">Dashboard</a></li>
						  <li><a href="#section2">Age</a></li>
						  <li><a href="#section3">Gender</a></li>
						  <li><a href="#section3">Geo</a></li>
						</ul><br>
					  </div>
						<br>
						<div class="col-md-9">
							<div class="page-header">
								<h1>
									Table with Buttons
								</h1>
							<table 	id="table" class="display"
								data-show-columns="true"
								data-height="600">
							</table>
						
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
		<script src="../js/bootmysql.js"></script>
</body>
</html>