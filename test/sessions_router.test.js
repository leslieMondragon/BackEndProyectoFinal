import { expect } from "chai"
import supertest from "supertest";
import jwt from "jsonwebtoken";
import express from "express"

// const jwt = require('jsonwebtoken');
// const express = require('express');
// import 
// const sessionsRouter = require('../src/routes/sessions.router');
// const sessionsController = require('../src/controllers/sessions.controller');

    describe('test de session', ()=>{
        let cookie
        it('Debe registrar un usuario correctamente', async ()=>{
            const userMock = {
                first_name: 'Leslie',
                last_name: 'Mondragón',
                email: 'leslie@gmail.com',
                password: 'test123'
            }

            const {
                _body
            } = await requester.post('/api/sessions/register').send(userMock)

            expect(_body.payload).to.be.ok
        })

        it('Se debe loguear un usuario correctamente y devolver una cookie', async ()=>{
            const userMock = {
                email: 'leslie@gmail.com',
                password: 'test123'
            }

            const result       = await requester.post('/api/sessions/login').send(userMock)
            const cookieResult = result.headers['set-cookie'][0]
            // console.log(cookieResult)
            expect(cookieResult).to.be.ok

            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            expect(cookie.name).to.be.ok.and.equal('coderCookie')
            expect(cookie.value).to.be.ok
        })

        it('Debe enviar la cookie que contiene un user y extraer los datos correctamente', async ()=>{
            const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.payload.email).to.be.eql('f@gmail.com')
        })


    })
