import { expect } from "chai"
import supertest from "supertest";
import jwt from "jsonwebtoken";
import express from "express"
import cartController from "../src/controllers/cart.js"
import cartRouter from "../src/routes/carts.js"

// Mock del servicio de usuarios
// const usersServiceMock = {
//   getUserByEmail: (email) => {
//     // Implementa aquí la lógica para obtener un usuario por email desde el mock de la base de datos
//     // Puedes devolver un usuario de prueba para el propósito del test
//     const user = {
//       first_name: 'adminCoder',
//       last_name: 'adminCoder',
//       email: 'adminCoder@coder.com',
//       password: 'AdM1nC0od3R2023',
//     };
//     return Promise.resolve(user);
//   },
// };

describe('Cart Router', () => {
  let app;
  before(() => {
    app = express();
    app.use(express.json());
    app.post('/auth/login', async (req, res)=>{
        
    })
    app.use('/api/carts', cartRouter);
  });

  describe('POST /api/carts', () => {
    it('should create a new cart', (done) => {
      supertest(app)
        .post('/api/carts')
        // .send({ email: 'test@example.com', password: 'password' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

        //   const cookieHeader = res.headers['set-cookie'];
        //   expect(cookieHeader).to.be.an('array').that.is.not.empty;
        //   expect(cookieHeader[0]).to.include('unprotectedCookie');

          done();
        });
    });
  });

//   describe('GET /api/carts/unprotectedCurrent', () => {
//     it('should return the complete user object stored in the database', (done) => {
//       // Simulamos la creación de un token JWT para el usuario
//       const token = jwt.sign({ email: 'test@example.com' }, 'tokenSecretJWT');
//       const cookie = `unprotectedCookie=${token}`;

//       supertest(app)
//         .get('/api/sessions/unprotectedCurrent')
//         .set('Cookie', [cookie])
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);

//           const user = res.body;
//           expect(user).to.have.property('first_name', 'Test');
//           expect(user).to.have.property('last_name', 'User');
//           expect(user).to.have.property('email', 'test@example.com');

//           done();
//         });
//     });
//   });
});