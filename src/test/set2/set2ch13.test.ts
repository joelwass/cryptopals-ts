import * as ava from 'ava'
import {
    parseCookie,
    profileFor
} from '../../set2/set2ch13'

ava.test('should parse cookie', t => {
    const expectedReturn = {
        foo: 'bar',
        baz: 'qux',
        zap: 'zazzle'
    }
    t.true(parseCookie('foo=bar&baz=qux&zap=zazzle').zap === expectedReturn.zap)
    t.true(parseCookie('foo=bar&baz=qux&zap=zazzle').foo === expectedReturn.foo)
    t.true(parseCookie('foo=bar&baz=qux&zap=zazzle').baz === expectedReturn.baz)
})

ava.test('should create user profile from email', t => {
    const expectedReturn = {
        email: 'foo@bar.com',
        uid: 10,
        role: 'user'
    }   
    t.true(profileFor('foo@bar.com').email === expectedReturn.email)
    t.true(profileFor('foo@bar.com').role === expectedReturn.role)
})