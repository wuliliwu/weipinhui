$('#small').hover((function() {   
  $('#mask').css('display','block')
  $('#big').css('display','block')
  $(this).css('opacity',0)
  // $('#box').css('opacity',0)
  $('#small').mousemove(function(e) {
    var x = e.pageX
    var y = e.pageY
    var Left = x - $('#small').offset().left - $('#mask').width()/2
    var Top = y - $('#small').offset().top-$('#mask').height()/2
    if (Left >= $('#small').height() - $('#mask').height()) {
      Left =  $('#small').height() - $('#mask').height()
    }
    if (Top >= $('#small').height() - $('#mask').height()) {
      Top =  $('#small').height() - $('#mask').height()
    }
  
    if (Left <= 0) {
      Left = 0
    }
     if (Top <= 0) {
      Top = 0
    }

    $('#mask').css({
      left:Left+ 'px',
      top:Top+ 'px',
    }) 
    // console.log($('#mask').position())
    // console.log(-$('#mask')[0].offsetLeft);
    // 大图片的位置
    // 小图的距离/小图的宽度 = 大图的距离/大图的宽度
    $('#big>img').css({
      left:-$('#mask')[0].offsetLeft / $('#small').width() * $('#big>img').width()+ 'px',
      top:-$('#mask')[0].offsetTop / $('#small').height() * $('#big>img').height()+ 'px',
    })
  })

}),function() {
  $('#mask').css('display','none')
  $('#big').css('display','none')
  $(this).css('opacity',1)

})

$('.btmImg').on('click','img',function() {    

  $('#small > img').prop('src',$(this).prop('src'))
  $('#big > img').prop('src',$(this).prop('src'))
})



var username = getCookie('username')
// console.log(username);
if (username) {
  // console.log(12345);
  // console.log($('.nav-title>li:first>a')[0].innerText)
  $('.nav-title>li:first>a')[0].innerText = username.slice(0,4) +'****'+ username.slice(-2)
  var span = document.createElement('span')
  span.innerHTML = '<a href="" class="exit">退出</a>'
  $('.nav-title>li:first')[0].appendChild(span)
}

$('.exit').click(function() {
  
  var conindex = layer.confirm('你确定要退出吗？',{
    btn:['残忍离开','依依不舍']
    },function(){
    removeCookie('username')
    window.location.reload()
    layer.close(conindex)
},function(){
    layer.msg('又留下来了',{
        icon:1,
        time:1000
    })
})
  return false
})


// 获取商品id
var arr = location.search.match(/id=(\d+)/)
if(!arr){
    layer.msg('非法访问',{
        icon:2,
        time:2000
    },function(){
        location.href = "../index/shouye.html"
    })
}

var id = arr[1]

// console.log(id);
// 获取数据
$.ajax({
  url:"../server/detail.php",
  data:{
    id
  },
  dataType:"json",
  success:res=>{
      var {data} = res;
      console.log(data);

    $('#small > img').prop('src',`${data.img}`)
    $('#big > img').prop('src',`${data.img}`)
    $('.btmImg ul').append(`
    <li>
        <img src="${data.img}" alt="">
        </li>
    `)
    $('.currentprice').html(`¥${data.price}`)
    $('.titleName').html(`${data.name}`)
    $('.good-detail ol li:first').html(`${data.introduce}`)
    // tab切换
    tab()

      // 多了几个小图，小图应该循环
      // var smallImgs = data.manyImg.split('==========')
      // var str = '';
      // smallImgs.forEach(item=>{
      //     str += `
      //         <img src="${item}">
      //     `
      // })
      // $('.small').html(str)
      // $('.middle>img').attr('src',smallImgs[0])
      // $('.big>img').attr('src',smallImgs[0])
      // // $('.small>img').attr('src',data.img)
      // $('.info h2 small').text(data.name)
      // $('.info p.price span').text(data.price)
      // $('.tab ol li').eq(0).html(data.introduce)
      // enlarge()
      // tab()
  }
})


function tab(){
  $('.good-detail ul li').click(function(){
      $(this).addClass('active').siblings().removeClass('active').parent().next().children().eq($(this).index()).addClass('active').siblings().removeClass('active')
  })
}