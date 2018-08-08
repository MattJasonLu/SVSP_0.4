function edit() {
    var input = document.createElement('input');  //创建input节点
    input.setAttribute('type', 'text');  //定义类型是文本输入
    document.getElementsByClassName('billDate').appendChild(input); //添加到form中显示
    document.getElementsByClassName('billNumber').appendChild(input); //添加到form中显示
}
