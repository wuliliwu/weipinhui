var moreBtn = document.getElementsByClassName('moreBtn')
var prev = document.getElementsByClassName('prev')[0]
var labels = prev.getElementsByClassName('label')
var middle = document.getElementsByClassName('middle')
var shoplist1= ['仅看有货','专柜同步','新款','有毒','仅看有货','专柜同步','新款','有毒','不喜欢','耐克']

var cancleList = []

for (let i = 0; i < moreBtn.length; i++) {
  moreBtn[i].addEventListener('click',function() {
    
    // console.log();
    var x = i
    for (let i = 0; i < middle[x].children.length; i++) {
      // console.log(middle[x].children[i].children[x].innerText);
      cancleList.push(middle[x].children[i].children[0].innerText)
      
    }


    middle[i].innerText = ''

    console.log(cancleList);
    var btn1 = document.createElement('button')
    btn1.innerHTML = '确定'
    var btn2 = document.createElement('button')
    btn2.setAttribute('class','cancle')
    btn2.innerHTML = '取消'
    var num = i
    for (let i = 0; i < shoplist1.length; i++) {
    var span = document.createElement('span')
    span.setAttribute('class','label')
    span.innerHTML = `
    <a href="javascript:;">
    <input type="checkbox" name="" id="" value=""> ${shoplist1[i]}
    </a>
    `
    middle[num].appendChild(span)
  }
    var div1 = document.createElement('div')
    div1.setAttribute('class','btnClass')
    div1.appendChild(btn1)
    div1.appendChild(btn2)
    middle[i].appendChild(div1)    
    var cancleBtn = this.parentElement.previousSibling.getElementsByClassName('cancle')[0]

    console.log(cancleBtn);

    cancleBtn.onclick = function() {
      middle[i].innerText = ''
      console.log(cancleList);
      for (let i = 0; i < cancleList.length; i++) {
        var span = document.createElement('span')
        span.setAttribute('class','label')
        span.innerHTML = `
        <a href="javascript:;">${cancleList[i]}</a>
        `
        middle[num].appendChild(span)
      }
      cancleList = []
    }
  
})


} 



// for (let i = 0; i < moreBtn.length; i++) {


  
// }