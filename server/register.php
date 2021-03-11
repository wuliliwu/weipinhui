<?php
header('content-type:text/html;charset=utf-8;');
  $number = $_POST['number'];
  $password = $_POST['password'];

  $hostname = 'localhost';
  $name = 'weipinhui';
  $pwd = 'weipinhui';
  $db = 'weipinhui';
  
  $conn = mysqli_connect($hostname,$name,$pwd,$db);
  mysqli_query($conn,'set name utf8');
  // 查询是否有重复的用户
  $sql1 = "SELECT * FROM `users` WHERE `number` = '$number'";
  $row = mysqli_query($conn,$sql1);
  // mysqli_query($conn,"INSERT INTO `users` VALUES(null,'$number','$password')");

  
  // echo json_encode($row);

  $res = mysqli_fetch_assoc($row);

  // echo $number.$password;

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