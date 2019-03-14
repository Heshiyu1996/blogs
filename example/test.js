var sale = {}
sale.clientList = []
sale.listen = function(fn) {
    this.clientList.push(fn)
}

sale.trigger = function() {
    for(var i=0, fn; fn = this.clientList[i++];) {
        fn.apply(this, arguments)
    }
}

sale.listen(function(price, meter) {
    console.log('价格:' + price)
    console.log('价格:' + meter)
})
sale.listen(function(price, meter) {
    console.log('价格:' + price)
    console.log('价格:' + meter)
})

sale.trigger(200000, 88)