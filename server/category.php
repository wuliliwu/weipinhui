<?php
header("content-type:text/html;charset=utf8");

 $hostname = '127.0.0.1';
  $name = 'root';
  $pwd = '123456';
  $db = 'weipinhui';
  
  $conn = mysqli_connect($hostname,$name,$pwd,$db);
  mysqli_query($conn,'set name utf8');
  $res = mysqli_query($conn,"select * from category");
  $arr = [];
  while($row = mysqli_fetch_assoc($res)){
      $arr[] = $row;
  }
  echo json_encode([
      "meta"=>[
          "stauts"=>0,
          "msg"=>"数据获取成功"
      ],
      "data"=>$arr
  ]);