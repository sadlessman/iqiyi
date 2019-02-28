<?php

	require "conn.php";
	
	if(isset($_POST['tel']) && isset($_POST['password']) && isset($_POST['location'])){
		$tel=$_POST['tel'];
		$pass=sha1($_POST['password']);
		$result=mysql_query("select * from user where tel='$tel' and password='$pass'");
		if(mysql_fetch_array($result)){
			echo true;
		}else{
			echo false;
		} 
	}
	if(isset($_POST['tel'])){
		$tel=$_POST['tel'];
		$result=mysql_query("select * from user where tel='$tel'");
		if(mysql_fetch_array($result)){
			echo true;
		}else{
			echo false;
		} 
	}
if(isset($_POST['tel']) && isset($_POST['password'])){
		$tel=$_POST['tel'];
		$pass=sha1($_POST['password']);
		$query="insert user values('$tel','$pass',NULL,NOW())";
		mysql_query($query);
		
		
	}

?>