

class changePic {
  constructor(id) {
    this.box = document.getElementById(id)
    this.init()
  }
  init() {
    this.box_ul = this.box.getElementsByClassName('box_ul')[0]
    this.liImgs = this.box.getElementsByClassName('box_ul')[0].children

    // console.log(this.box_ul);
    this.left = this.box.getElementsByClassName('arrow')[0].children[0]
    this.right = this.box.getElementsByClassName('arrow')[0].children[1]
    this.box_ol = this.box.getElementsByClassName('box_ol')[0]
    this.flag = true
    this.index = 0
    this.num = 0
    this.circle = 0
    this.flag = true
    this.width = this.liImgs[0].offsetWidth
    this.create()
    this.righttBtn()
    this.leftBtn()
    this.autoPlay()
    this.stopPlay()
  }
  create() {
    for (let i = 0; i < this.liImgs.length; i++) {
      var _this = this
      var li = document.createElement('li')
      li.setAttribute('index', i) //添加个自定义属性
      li.innerHTML = '春季上新'
      this.box_ol.appendChild(li)
      li.onmouseenter = function () {
        for (let i = 0; i < _this.liImgs.length - 1; i++) {
          // console.log(_this.box_ol.children[i]);
          _this.box_ol.children[i].className = ''
        }
        this.className = 'current'
        // 点击小圆圈,移动图片
        var index = this.getAttribute('index')
        _this.num = index
        _this.circle = index
        move(_this.box_ul, {
          left: -index * _this.width
        })
      }
    }

    this.box_ol.children[0].className = 'current'
    var first = this.box_ul.children[0].cloneNode(true)
    this.box_ul.appendChild(first)
  }
  righttBtn() {
    this.Play()
  }
  leftBtn() {


    var _this = this
    this.left.onclick = function () {
      // if (_this.flag) {
      // _this.flag = false
      if (_this.num == 0) {
        _this.box_ul.style.left = -(_this.liImgs.length - 1) * _this.width + 'px'
        _this.num = _this.liImgs.length - 1
      }
      _this.num--
      _this.circle--
      move(_this.box_ul, {
        left: -_this.num * _this.width
      }, function () {
        // _this.flag = true
      })
      // console.log(_this.circle);
      if (_this.circle < 0) {
        _this.circle = _this.liImgs.length - 2
      }
      for (let i = 0; i < _this.box_ol.children.length; i++) {
        _this.box_ol.children[i].className = ''
      }
      _this.box_ol.children[_this.circle].className = 'current'
      // }
    }

  }
  Play() {
    var _this = this
    this.right.onclick = function () {

      if (_this.num == _this.liImgs.length - 1) {
        // 如果达到最后一张,直接跳回第一张并重置num
        _this.box_ul.style.left = 0
        _this.num = 0
      }
      _this.num++
      _this.circle++
      move(_this.box_ul, {
        left: -_this.num * _this.width
      }, function () {
        // _this.flag = true
      })
      if (_this.circle == _this.liImgs.length - 1) {
        _this.circle = 0
      }
      for (let i = 0; i < _this.box_ol.children.length; i++) {
        // console.log(i);
        _this.box_ol.children[i].className = ''

      }
      _this.box_ol.children[_this.circle].className = 'current'
      // }
    }
  }
  autoPlay() {
    var _this = this
    this.timer = setInterval(function () {
      _this.right.click()
    }, 3000)
  }
  stopPlay() {
    var _this = this
    this.box.onmouseenter = function () {
      clearInterval(_this.timer)
    }
    this.box.onmouseleave = function () {
      _this.timer = setInterval(function () {
        _this.right.click()
      }, 3000)
    }
  }

}

var c = new changePic('lunbo')





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



// 侧边栏
$('.nav_link>ul>li:first').mouseenter(function() {
  $('.slide').stop().slideDown()
})
$('.nav_link>ul>li:first').mouseleave(function() {
  $('.slide').stop().slideUp()
})
$('.slide').mouseenter(function() {
  $('.slide').stop().show()
})
$('.slide').mouseleave(function() {
  $('.slide').stop().slideUp()
})

// 发送请求

$.ajax({
  url:"../server/category.php",
  dataType:'json',

}).then(function(res) {
  // console.log(res);
  const {data} = res
  // console.log(data);
  // 找到所有一级分类
  var firstCat = data.filter(item => {
    return item.pid == 0
  })
  // console.log(data);
  handlerData(data,firstCat)
  var html = render(firstCat)
  $('.slideleft').html(html)
  // 侧边栏完了
  return $.ajax({
    url:"../server/goods.php",
    data:{pid:1191},
    dataType:"json",
  })
}).then(res => {

  // 在这里处理3折疯抢那里

  // console.log(res);
  const {data} = res
  // console.log(data);
  var str = ''
  data.forEach((item,index) => {
    // console.log(item);
    str += `
    <a href="../detail/detail.html?id=${item.id}">
        <div class="goods-item" style="background-image:url('${item.img}')">
          <span class="cover">
            <img
              src="//h2.appsimg.com/a.appsimg.com/upload/brandcool/0/a43cef865b2944f8b4f8bebf7ae94c99/10003640/primary_136x68_90.png"
              alt="">
            <p>共${item.price}款</p>
          </span>
          <div class="price">
            <span>立即购买</span> <i>¥${item.price}</i>
          </div>
        </div>
       </a>
    `
    //  console.log($(this));
  })
 
  $('.lightart-wrap-box-top .left').html(str)

  // 继续发送请求 ,唯品快抢
  return $.ajax({
    url:"../server/goods.php",
    data:{pid:1212},
    dataType:"json",

  })
}).then(res => {
  console.log(res);
  const {data} = res
  // console.log(data);
  var str = ''
  data.forEach((item,index) => {
    str += `
    <a href="../detail/detail.html?id=${item.id}">
        <div class="goods-item" style="background-image:url('${item.img}')">
          <span class="cover">
            <img
              src="//h2.appsimg.com/a.appsimg.com/upload/brandcool/0/a43cef865b2944f8b4f8bebf7ae94c99/10003640/primary_136x68_90.png"
              alt="">
            <p>共222款</p>
          </span>
          <div class="price">
            <span>立即购买</span> <i>¥${item.price}</i>
          </div>
        </div>
       </a>
    `
  })
  $('.lightart-wrap-box-bottom .cnt').html(str)

})







function render(firstCat){
  var str = '<ul id="lul">';
  for(var i=0;i<firstCat.length/3;i++){
      str += `
      <li><a href="javascript:;">${firstCat[i].name}</a></li>
      `
  }
  str += ' </ul>'
  return str;
}

// 递归处理函数
function handlerData(data,firstCat) {
  // 直接循环找出目标
  for (let i = 0; i < firstCat.length; i++) {
    var cat = data.filter(item => {
      return item.pid == firstCat[i].id
    })
    if (cat.length) {
      firstCat[i].children = cat
      handlerData(data,firstCat[i].children)
    }
    
  }

}



// 电梯导航部分
$('.lift li:last').click(function() {
  $('html,body').animate({
    scrollTop:0
  })
})
function tiaozhuan(attr,clickTarget) {
  $(attr).click(function() {
    console.log(111);
    var topnum = $(clickTarget).offset().top
    $('html,body').animate({
      scrollTop:topnum
    })
  })
}
tiaozhuan('.lift li:eq(2)','.wrap-box')
tiaozhuan('.lift li:eq(1)','.lightart-wrap-box-bottom')
tiaozhuan('.lift li:first','.lightart-wrap-box')
