var moreBtn = document.getElementsByClassName('moreBtn')
var prev = document.getElementsByClassName('prev')[0]
var labels = prev.getElementsByClassName('label')

var middle = document.getElementsByClassName('middle')[0]
var shoplist1= ['仅看有货','专柜同步','新款','有毒','仅看有货','专柜同步','新款','有毒','不喜欢','耐克']

for (let i = 0; i < moreBtn.length; i++) {
  moreBtn[i].addEventListener('click',function() {

  // for (let i = 0; i < labels.length; i++) {
  //   labels[i].parentElement.removeChild(labels[i])
  //   i--
  //   console.log(i);
  // }
  middle.innerText = ''

  var btn1 = document.createElement('button')
  btn1.innerHTML = '确定'
  var btn2 = document.createElement('button')
  btn2.innerHTML = '取消'


  for (let i = 0; i < shoplist1.length; i++) {
    var span = document.createElement('span')
    span.setAttribute('class','label')
    span.innerHTML = `
    <a href="javascript:;">
    <input type="checkbox" name="" id="" value=""> ${shoplist1[i]}
    </a>
    `
    middle.appendChild(span)
  }

  var div1 = document.createElement('div')
  div1.setAttribute('class','btnClass')
  div1.appendChild(btn1)
  div1.appendChild(btn2)
  middle.appendChild(div1)
  
  
})

  
}
