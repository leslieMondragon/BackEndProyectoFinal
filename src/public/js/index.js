import axios from "axios";
const url = "http://localhost:8080"

function addToCart(comp) {
    let id = comp.id
    axios({
        method: 'post',
        url: `${url}/api/carts/${id}`,
        data: {
            id
        }
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}

function addQuantity(comp) {
    let id = comp.id
    axios({
        method: 'put',
        url: `${url}/api/carts/${id}`,
        data: {
            id,
            quantity: 1
        }
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}

function remove(comp) {
    let id = comp.id
    axios({
        method: 'delete',
        url: `${url}/api/carts/${id}`,
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}

function changeRole(comp) {
    let id = comp.id
    axios({
        method: 'get',
        url: `${url}/api/users/premium/${id}`
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}

function deleteUser(comp) {
    let id = comp.id
    axios({
        method: 'delete',
        url: `${url}/api/users/delete/${id}`,
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}

function finish(comp) {
    let id = comp.id
    axios({
        method: 'get',
        url: `${url}/api/carts/purchase`,
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}