<?php
header('content-type:text/html;charset=utf-8;');
  $number = $_POST['number'];
  $password = $_POST['password'];

  $hostname = 'localhost';
  $name = 'root';
  $pwd = '123456';
  $db = 'weipinhui';
  
  
  $conn = mysqli_connect($hostname,$name,$pwd,$db);
  mysqli_query($conn,'set name utf8');
  // 查询是否有重复的用户
  $sql1 = "SELECT * FROM `users` WHERE `number` = '$number'";
  $sql2 = "SELECT * FROM `users` WHERE `password` = '$password'";

  $row1 = mysqli_query($conn,$sql1);
  $row2 = mysqli_query($conn,$sql2);

  $res1 = mysqli_fetch_assoc($row1);
  $res2 = mysqli_fetch_assoc($row2);


  if ($res1 && $res2) {
    // 就是可以查找到用户

    echo json_encode(
      [
        'msg' => [
          'status' => 2,
          'message' => '登陆成功!'
        ]
      ]
        );

  }else{
    // 用户不存在的时候
    
    echo json_encode(
      [
        'msg' => [
          'status' => 0,
          'message' => '用户名或者密码错误'
        ]
      ]
        );
  }