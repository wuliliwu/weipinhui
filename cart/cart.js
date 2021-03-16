var username = getCookie('username')

if (username) {

  $('.user').children().html(username.slice(0,4) +'****'+ username.slice(-2))
}else {

  $('.exit').remove()
  $('.cart-tab ').empty()
  var div = document.createElement('div')
  div.setAttribute('class','cart-kong')
  div.innerHTML = ` 
  <button><a href="../index.html">请先登陆</a></button>
  `
  $('.cart-tab').append(div)
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
// 移除购物车商品
$('.del-good').click(function() {
  var that= this
  layer.confirm('您确定要删除这个商品吗？', {
    btn: ['确定','再想一下'] //按钮
  }, function(){
    layer.msg('删除成功', {icon: 2,time:800}); 
    
    // $($(that).parent().parent().get(0).getElementsByClassName('itemcheck')).prop('checked',false)
    // console.log($($(that).parent().parent().get(0).getElementsByClassName('itemcheck')).prop('checked'));
    var bool = $($(that).parent().parent().get(0).getElementsByClassName('itemcheck')).prop('checked')

    // 删除之前拿到商品的的数量和价格,用总价格总数量减去,然后重新赋值
    // console.log()
    if (bool) {
       var currentcount = parseInt($($(that).parent().parent().get(0).getElementsByClassName('count')).val())
      var currentprice = parseInt($($(that).parent().parent().get(0).getElementsByClassName('dan-price')).children().html())
      totalCount -= currentcount
      totalprice -=currentcount*currentprice
      $('.total-count').html(totalCount)
      $('.total-count').next().next().html(totalprice.toFixed(2))
      $('.finalPrice').html(totalprice.toFixed(2))
    }
    $(that).parent().parent().remove()
    // checkBox()
  },function(){
    layer.msg('很幸运,我被主人留下啦(*￣︶￣)',{icon:1});
  });
 
})
var totalprice = 0
var totalCount = 0
var checkthis
function checkBox(){
  $('input[name="itemcheck"]').bind('input propertychange',function(){
    checkthis = this
    if ($(this).prop('checked')) {
      // 这是当前价格
      var p = parseFloat($(this).parent().parent().next().children().children().html())
      // 这是当前商品的数量
      var count = parseFloat($(this).parent().parent().next().next().children().children().next().val())
      var total = p*count
      // price += (p*count).toFixed(2)
      totalprice += total
      // 计算选中的数量
      totalCount += count
      // console.log(totalCount);
      $('.total-count').html(totalCount)
      $('.total-count').next().next().html(totalprice.toFixed(2))
      $('.finalPrice').html(totalprice.toFixed(2))
    }else{
       // 这是当前价格
       var p = parseFloat($(this).parent().parent().next().children().children().html())
       // 这是当前商品的数量
       var count = parseFloat($(this).parent().parent().next().next().children().children().next().val())
       var total = p*count
      totalprice -= total
      // 计算选中的数量
      totalCount -= count
      // console.log(totalCount);
      $('.total-count').html(totalCount)
      $('.total-count').next().next().html(totalprice.toFixed(2))
      $('.finalPrice').html(totalprice.toFixed(2))
    }
    
  })
}
checkBox()

// 按钮--
$('.sub').click(function(){
    var bool = $($(this).parent().parent().parent().children().get(0).getElementsByClassName('itemcheck')).prop('checked')
  var a
  if (bool) {
    // count原始数量
    a = parseInt($(this).next().val())
    a--

    if (a <= 1) {
      $(this).prop('disabled','disabled')
      a=1
      $(this).next().val(a)

    }else {
      // a-- 
      $(this).next().val(a)
      
    }
    if (a<99) {
      $('.add').removeAttr('disabled')
    }

    var p = parseInt($(this).parent().parent().prev().children().children().html())
    // 当前价格
    dangqian = a*p
    // 总价格
    totalCount --
    totalprice = totalprice + ((a-1)*p) - (a*p)
    $('.total-count').html(totalCount)
    $('.total-count').next().next().html(totalprice.toFixed(2))
    $('.finalPrice').html(totalprice.toFixed(2))

  }else {
    a = parseInt($(this).next().val())
    a--

    if (a <= 1) {
    $(this).prop('disabled','disabled')
    a=1
    $(this).next().val(a)
    }else {
      // a--
      $(this).next().val(a)
      
    }
    if (a<99) {
      $('.add').removeAttr('disabled')
      
    }
  }

})

// 按钮++
$('.add').click(function(){
  var a = parseInt($(this).prev().val())
  var bool = $($(this).parent().parent().parent().children().get(0).getElementsByClassName('itemcheck')).prop('checked')
  if (bool) {
    // count原始数量
    a++
    $(this).prev().val(a)
    if (a>1) {
      $('.sub').removeAttr('disabled')
    }
    if (a >= 99) {
      $(this).prop('disabled','disabled')
    }  
    // var p = parseFloat($(checkthis).parent().parent().next().children().children().html())
    var p = parseInt($(this).parent().parent().prev().children().children().html())
    // console.log(p);
    // 当前价格
    dangqian = a*p
    // 总价格
    totalCount ++

    totalprice = totalprice - ((a-1)*p) + (a*p)
    $('.total-count').html(totalCount)
    $('.total-count').next().next().html(totalprice.toFixed(2))
    $('.finalPrice').html(totalprice.toFixed(2))
  }else {
    a++
    $(this).prev().val(a)
    if (a>1) {
      $('.sub').removeAttr('disabled')
    }
    if (a >= 99) {
      $(this).prop('disabled','disabled')
    }
  }
  
})









