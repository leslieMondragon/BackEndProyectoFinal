import express from "express"
import request from "supertest";
import { expect } from "chai";
import AuthRouter from "../src/routes/auth.js"
import { authToken } from "../src/utils/jsonwebtoken.js";

describe("API Tests", () => {
  let app;
  before(() => {
    app = express();
    app.use(express.json());
    app.use("/auth/login", AuthRouter(usersServiceMock));
  });

  describe("GET /productos", () => {
    it("Debería obtener todos los productos", (done) => {
      request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${authToken}`) // Agregar el encabezado de autorización con el token
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("GET api/productos/:id", () => {
    it("Debería obtener un producto por su ID", (done) => {
      const id = "640112da42c1aa6555ab82eb"; // Reemplaza con un ID válido

      request(app)
        .get(`/api/products/${id}`)
        .set("Authorization", `Bearer ${authToken}`) // Agregar el encabezado de autorización con el token
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an("object");
          expect(res.body.id).to.equal(id);
          done();
        });
    });
  });

  describe("PUT /productos/:id", () => {
    it("Debería actualizar un producto", (done) => {
      const id = "640112da42c1aa6555ab82eb"; // Reemplaza con un ID válido
      const updatedProduct = {
      };

      request(app)
        .put(`/productos/${id}`)
        .set("Authorization", `Bearer ${authToken}`) // Agregar el encabezado de autorización con el token
        .send(updatedProduct)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an("object");
          expect(res.body.id).to.equal(id);
          done();
        });
    });
  });
});
