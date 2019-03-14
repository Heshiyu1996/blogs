var sale = {}

sale.clientList = {}

sale.listen = function(key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
}

sale.trigger = function() {
    console.log(arguments)
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key]
        console.log(key)
        console.log(arguments)
    if (!fns || fns.listen === 0) return false
    for(var i=0, fn; fn = fns[i++];) {
        fn.apply(this, arguments)
    }
}

sale.listen('meter88', function(price) {
    console.log('价格:' + price)
})
sale.listen('meter110', function(price) {
    console.log('价格:' + price)
})

sale.trigger('meter88', 888888)
sale.trigger('meter110', 110000000)