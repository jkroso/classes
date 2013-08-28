
var assert = require('assert')

var el
beforeEach(function(){
	el = document.createElement('div')
})

describe('modern', function(){
	test(require('../modern'))
})

describe('fallback', function(){
	test(require('../fallback'))
})

function test(classes){
	describe('add(el, class)', function(){
		it('should add a class', function(){
			classes.add('foo', el)
			assert('foo' == el.className)
		})

		it('should not add the same class twice', function(){
			classes.add('foo', el)
			classes.add('foo', el)
			classes.add('bar', el)
			assert('foo bar' == el.className)
		})
	})

	describe('.remove(class)', function(){
		it('should remove a class from the beginning', function(){
			el.className = 'foo bar baz'
			classes.remove('foo', el)
			assert('bar baz' == el.className)
		})

		it('should remove a class from the middle', function(){
			el.className = 'foo bar baz'
			classes.remove('bar', el)
			assert('foo baz' == el.className)
		})

		it('should remove a class from the end', function(){
			el.className = 'foo bar baz'
			classes.remove('baz', el)
			assert('foo bar' == el.className)
		})
	})

	describe('.remove(regexp)', function(){
		it('should act like .removeMatching()', function(){
			el.className = 'foo item-1 item-2 bar'
			classes.removeMatching(/^item-/, el)
			assert('foo bar' == el.className)
		})
	})

	describe('.removeMatching(regexp)', function(){
		it('should remove matching classes', function(){
			el.className = 'foo item-1 item-2 bar'
			classes.removeMatching(/^item-/, el)
			assert('foo bar' == el.className)
		})
	})

	describe('.toggle(class)', function(){
		describe('when present', function(){
			it('should remove the class', function(){
				el.className = 'foo bar hidden'
				classes.toggle('hidden', el)
				assert('foo bar' == el.className)
			})
		})

		describe('when not present', function(){
			it('should add the class', function(){
				el.className = 'foo bar'
				classes.toggle('hidden', el)
				assert('foo bar hidden' == el.className)
			})
		})
	})

	describe('.array()', function(){
		it('should return an array of classes', function(){
			el.className = 'foo bar baz'
			var ret = classes.array(el)
			assert('foo' == ret[0])
			assert('bar' == ret[1])
			assert('baz' == ret[2])
		})

		it('should return an empty array when no className is defined', function(){
			var ret = classes.array(el)
			assert(0 == ret.length)
		})

		it('should ignore leading whitespace', function(){
			el.className = '  foo bar    baz'
			var ret = classes.array(el)
			assert('foo' == ret[0])
			assert('bar' == ret[1])
			assert('baz' == ret[2])
			assert(3 == ret.length)
		})

		it('should ignore trailing whitespace', function(){
			el.className = 'foo bar   baz     '
			var ret = classes.array(el)
			assert('foo' == ret[0])
			assert('bar' == ret[1])
			assert('baz' == ret[2])
			assert(3 == ret.length)
		})
	})

	describe('.has(class)', function(){
		it('should check if the class is present', function(){
			el.className = 'hey there'
			assert(false === classes.has('foo', el))
			assert(true === classes.has('hey', el))
			assert(true === classes.has('there', el))
		})
	})
}