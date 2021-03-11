
var changeBtn = document.getElementsByClassName('top')[0].children
var qcr_login = document.getElementsByClassName('qcr_login')[0]
var contact_login = document.getElementsByClassName('contact_login')[0]
var qcr_inner = document.getElementsByClassName('qcr_inner')[0]
var login_middle = qcr_inner.parentNode
console.log(qcr_inner,login_middle.children);


// 点击切换登陆方式
for (let i = 0; i < changeBtn.length; i++) {
  changeBtn[i].onclick = function(e) {
    // e = window.event || e
    // target = e.target || e.srcElement
    console.log(i);
    
    if (i%2) {
      contact_login.style.display = 'block'
      qcr_login.style.display = 'none'
      changeBtn[i].className = 'active'  
      changeBtn[0].className = ''  

    }else {
      qcr_login.style.display = 'block'
      contact_login.style.display = 'none'
      changeBtn[i].className = 'active' 
      changeBtn[1].className = ''  
    }
  }
}
// 鼠标移入二维码左移,并显示图片
qcr_inner.onmouseenter = function(e)  {
  move(qcr_inner.children[0],{left:20}, move(qcr_inner.children[1],{opacity:100}))
  e.stopPropagation();

}

qcr_inner.onmouseleave = function(e) {
  console.log('111');
  move(qcr_inner.children[1],{opacity:0},move(qcr_inner.children[0],{left:94}))
  e.stopPropagation();
  
  }