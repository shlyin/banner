// 辅助
const log = console.log.bind(console)
const e = sel => document.querySelector(sel)
const es = sel => document.querySelectorAll(sel)
const bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.addEventListener(eventName, callback)
    }
}
const removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

//通用
const tong = function(newIndex, index) {
		var newId = '#id-img-photo-'+ String(newIndex)
        var className = 'active'
		removeClassAll(className)
        var c = e(newId)
        c.classList.add(className)
        var offset = newIndex - 3
        var n = (-200) * (offset)
        e('.box-reflect').style.transform = `translateX(${n}px)`
}

//点击模式
const clickMode = function(){
    var selector = '.photo'
    bindAll(selector, 'click', function(event){
		var self = event.target
		var newIndex = parseInt(self.dataset.id)
		var father = self.closest('.all')
    	var index = parseInt(father.dataset.active)
        tong(newIndex, index)
        father.dataset.active = newIndex
	})
}

//上一张模式
const prevMode = function() {
    var sel = '.prev'
	e(sel).addEventListener('click', function(event){
    var father = e('.all')
	var index = parseInt(father.dataset.active)
    var sum = parseInt(father.dataset.imgs)
	var newIndex = (index + sum - 1) % sum
    tong(newIndex, index)
	father.dataset.active = newIndex
    })
}

//下一张模式
const nextMode = function() {
    var sel = '.next'
    e(sel).addEventListener('click', function(event){
        var father = e('.all')
        var index = parseInt(father.dataset.active)
        var sum = parseInt(father.dataset.imgs)
        var newIndex = (index + 1) % sum
        tong(newIndex, index)
        father.dataset.active = newIndex
    })
}

// 随机模式
const randomMode = function() {
    setInterval(function(){
        var father = e('.all')
        var index = parseInt(father.dataset.active)
        var s = father.dataset.imgs
        var sum = parseInt(s)
        var n = Math.floor(Math.random() * sum)
        var newIndex = n
        tong(newIndex, index)
        father.dataset.active = newIndex
    }, 2000)

}
const playModes =function() {
    clickMode()
    prevMode()
    nextMode()
    randomMode()
}

const __main = function() {
    playModes()
}
 __main()
