<?php
header('content-type:text/html;charset=utf-8;');
  $number = $_POST['number'];
  $password = $_POST['password'];

  // echo $number;
  $hostname = 'localhost';
  $name = 'root';
  $pwd = '123456';
  $db = 'weipinhui';
  
  
  $conn = mysqli_connect($hostname,$name,$pwd,$db);
  mysqli_query($conn,'set name utf8');
  // 查询是否有重复的用户
  $sql1 = "SELECT * FROM `users` WHERE `number` = '$number'";
  $row = mysqli_query($conn,$sql1);
  $res = mysqli_fetch_assoc($row);

  if ($res) {
    echo json_encode(
      [
        'msg' => [
          'status' => 0,
          'message' => '该用户已经存在。'
        ]
      ]
        );
  }else{
    mysqli_query($conn,"INSERT INTO `users` VALUES(null,'$number','$password')");
    echo json_encode(
      [
        'msg' => [
          'status' => 2,
          'message' => '注册成功。'
        ]
      ]
        );
  }