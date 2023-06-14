import { authorization, authorizationCreate, credentialsLogin, paramLogin } from "./authorization";
import { enviroments } from "./enviroments";

let url = process.env.REACT_APP_API;
const API_SERVER = url + "/api/v1";
//const API_SERVER_LOGIN = url;
const API_LOGIN = enviroments.token_url;

export const findAllProductPage = async (page) => {
    try {
        let response = await fetch(API_SERVER + "/products/page/" + page, {
            method: "GET",
            headers: authorization()
        })
        return response;
    } catch (error) {

    }
}

export const findAllProduct = async () => {

    try {
        let response = await fetch(API_SERVER + "/products", {
            method: "GET",
            headers: authorization()
        })

        return response;
    } catch (error) {

    }

}
export const deleteProductId = async (id) => {
    try {
        let response = await fetch(API_SERVER + "/product/d/" + id, {
            method: "DELETE",
            headers: authorization()
        })
        return response;
    } catch (error) {

    }
}

export const findByProductId = async (dato) => {
    try {
        let response = await fetch(API_SERVER + "/product/" + dato, {
            method: "GET",
            headers: authorization()
        })
        return response;
    } catch (error) {

    }
}

export const createProduct = async (datosPost) => {
    try {
        let response = await fetch(API_SERVER + "/product/c", {
            method: "POST",
            body: datosPost,
            headers: authorizationCreate()
        })

        return response;
    } catch (error) {

    }
}

export const updateProduct = async (id, datos) => {
    try {
        let response = await fetch(API_SERVER + "/product/u/" + id, {
            method: "PUT",
            body: datos,
            headers: authorizationCreate()
        })
        return response;
    } catch (error) {

    }
}

/*export const loginData = async (username, password) => {
    console.log(API_SERVER_LOGIN)
    try {
        let response = await fetch(API_SERVER_LOGIN + "/oauth/token", {
            method: "POST",
            body: paramsLogin(username, password),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentialsLogin()
            }
        })

        return response;
    } catch (error) {

    }
}*/

export const loginToken = async (code) => {

    try {
        let response = await fetch(API_LOGIN, {
            method: "POST",
            body: paramLogin(code),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentialsLogin()
            }
        })
        console.log(paramLogin(response))

        return response;

    } catch (error) {

    }
}

export const createProductImage = async (dato) => {

    try {
        let response = await fetch(API_SERVER + "/product/upload", {
            method: "POST",
            body: dato,
            headers: authorization()
        })

        return response;
    } catch (error) {

    }
}