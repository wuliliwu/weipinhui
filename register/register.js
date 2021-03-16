 // 定义一个装手机号和密码验证通过的数组
 var boolArr = []
 var bool1, bool2, bool3;
 // 正则验证函数
 function validate(str, reg) {
   if (reg.test(str)) {
     return true
   } else {
     return false
   }
 }

 //  传入Boolean值来判断是否显示提示
 function showTip(bool, attr) {
   if (bool) {
     // boolArr.push(bool) 
     attr.css('border', '1px solid #0f0')
     attr.next().css('display', 'none')
   } else {
     attr.css('border', '1px solid #f00')
     attr.next().css('display', 'block')
   }
 }

 function show(attr) {
   attr.css('border', '1px solid #f00')
   attr.next().css('display', 'block')
 }

 function hide(attr) {
   attr.css('border', '1px solid #ccc')
   attr.next().css('display', 'none')
 }
 var number, password


 //  手机号验证
 $('input:text').bind('input propertychange', function () {
   var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
   var str = $(this).val().replace(/[, ]/g, '')
   bool1 = validate(str, reg)
   showTip(bool1, $(this).parent())

 });
 $('input:text').blur(function () {
   var str = $(this).val().replace(/[, ]/g, '')
   if (str == '') {
     hide($(this).parent())
   } else if (bool1) {
     number = str
     $(this).parent().css('border', '1px solid #0f0')
     $(this).parent().next().css('display', 'none')
   } else {
     show($(this).parent())
   }
   // boolArr.splice(0,1)
 })


 //  密码验证规则
 // console.log(boolArr);

 $('.onepwd').bind('input propertychange', function () {
   // 强密码正则的要求是只能由数字，字母组成，不能有特殊符号,并且长度限制在6-16位
   var reg = /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,16}$/
   var str = $(this).val().replace(/[, ]/g, '')
   bool2 = validate(str, reg)
   showTip(bool2, $(this).parent())
   if ($('.oncepwd').val().replace(/[, ]/g, '') === '') {
     hide($('.oncepwd').parent())
   } else {
     bool3 = Boolean($('.onepwd').val().replace(/[, ]/g, '') === $('.oncepwd').val().replace(/[, ]/g, ''))
     showTip(bool3, $('.oncepwd').parent())
   }
 })

 $('.onepwd').blur(function () {
   var str = $(this).val().replace(/[, ]/g, '')
   if (str == '') {
     hide($(this).parent())
   } else if (bool2) {
     password = str
     $(this).parent().css('border', '1px solid #0f0')
     $(this).parent().next().css('display', 'none')
   } else {
     show($(this).parent())
   }


 })
 //  重复密码验证

 $('.oncepwd').bind('input propertychange', function () {
   bool3 = Boolean($('.onepwd').val().replace(/[, ]/g, '') === $('.oncepwd').val().replace(/[, ]/g, ''))
   showTip(bool3, $(this).parent())

 })

 $('.oncepwd').blur(function () {
   var str = $(this).val().replace(/[, ]/g, '')
   if (str == '') {
     hide($(this).parent())
   } else if (bool3) {
     $(this).parent().css('border', '1px solid #0f0')
     $(this).parent().next().css('display', 'none')
   } else {
     show($(this).parent())
   }
   // boolArr.pop()

 })
 //  是否同意条款
 $(':checkbox').change(function () {
   if ($(this).prop('checked')) {
     $('.agree').css('display', 'none')
   } else {
     $('.agree').css('display', 'block')
   }
 })

 //  点击注册的时候进行的事件
 $('.register').click(function () {
   if (bool1 && bool2 & bool3) {

     if ($(':checkbox').prop('checked')) {
       // 在这里进行注册的逻辑
       $.ajax({
         type: "post",
         url: "../server/register.php",
         data: {
           number: number,
           password: password
         },
         dataType: "json",
         success: function (res) {
           console.log(res);
           const {
             status,
             message
           } = res.msg
           if (status === 2) {
            layer.msg(message);
            setTimeout(() => {
              window.location.href = '../index.html'
            },1500)
           }
           if (status === 0) {
             //提示层

             layer.msg(message);
             //墨绿深蓝风);
           }
         }
       });

     } else {
       $('.agree').css('display', 'block')
     }
   } else {
    layer.msg('您输入的信息有误,请重新输入');
     console.log('您输入的信息有误,请重新输入');
   }

 })