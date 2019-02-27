<?php

	require "conn.php";
	
	if(isset($_POST['tel']) && isset($_POST['password']) && isset($_POST['location'])){
		$tel=$_POST['tel'];
		$pass=sha1($_POST['password']);
		$result=mysql_query("select * from user where tel='$tel' and password='$pass'");
		if(mysql_fetch_array($result)){
			echo true;//登陆成功
		}else{
			echo false;//登陆失败
		} 
	}
	/* if(isset($_POST['tel'])){
		$tel=$_POST['tel'];
		$password=$_POST['password'];
		INSERT INTO users () VALUES ();
	}else{
		
	} */
if(isset($_POST['tel']) && isset($_POST['password'])){
		//1.接收前端表单提交过来的数据,加入数据库。
		$tel=$_POST['tel'];
		$pass=sha1($_POST['password']);
		//2.将数据通过insert语句插入数据库中
		$query="insert user values('$tel','$pass',NULL,NOW())";
		mysql_query($query);
		
		
	}

?>