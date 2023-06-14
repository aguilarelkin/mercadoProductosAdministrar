import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { hasRole, isAutenticated } from "../auth/auth.authenticated";
import { getUsuario } from "../auth/auth.token.user";
import { createProduct, createProductImage, findByProductId, updateProduct } from "../services/productApi";
import { logout } from "../session/operation.login";
import Navigation from "./auxiliarcomponent/Navigation";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

function Create() {
    const { dato } = useParams();

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("image.png");
    const [cantidad, setCantidad] = useState("");
    const [cantidadReal, setCantidadReal] = useState("");
    const [control, setControl] = useState(false);
    const [mensaje, setMensaje] = useState([]);
    const [progres, setProgres] = useState(0);
    const [sesion, setSesion] = useState(false);

    const [user, setUser] = useState("");

    const history = useNavigate();

    useEffect(
        () => {
            getDatos();

            if (dato !== ":dato") {
                setSesion(isAutenticated());
                if (hasRole().length > 0 && hasRole().indexOf('ROLE_ADMIN') !== -1) {
                    userData();

                } else {
                    Swal.fire('Acceso denegado', 'No tienes permisos', 'warning')
                    history("/home")
                }
            }

        }, [sesion, dato]
    );

    //36:53
    const userData = () => {
        if (sesion) {
            setUser(getUsuario().username);

        }
    }
    const getDatos = async () => {

        if (dato === 'new') {

            setId("")
            setNombre("")
            setPrecio("")
            setImagen("")
            setCantidad("")
            setCantidadReal("")
            setControl(false);

        }

        if (dato !== ":dato") {
            if (dato !== 'new') {

                try {

                    let response = await findByProductId(dato);

                    let json;

                    if (response.status === 200) {
                        json = await response.json()
                        setId(json.id)
                        setNombre(json.nombre)
                        setPrecio(json.precio)

                        setImagen(json.imagen)

                        setCantidad(json.cantidad)
                        setCantidadReal(json.cantidadReal)

                        return json;

                    }
                    if (response.status === 500) {

                        json = await response.json()
                        setMensaje(json);
                        return json;

                    }
                    if (response.status === 404) {

                        json = await response.json()
                        Swal.fire('Error', 'No existe el producto', 'error')
                        setMensaje(json);
                        history('/home')
                        return json;
                    }
                    if (response.status === 403) {
                        Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                        history("/")
                    }
                    if (response.status === 401) {
                        if (sesion) {
                            logout();
                            history("/")
                        }
                        history("/")
                    }

                } catch (error) {
                    console.log(error)
                }

            } else {
                setId("")
                setNombre("")
                setPrecio("")
                setImagen("")
                setCantidad("")
                setCantidadReal("")
                setControl(false);
            }
        } else {
            history("/")
        }
    }

    const seleccionarFoto = (event) => {
        if (event.target.files) {
            console.log(event.target.files[0].type.indexOf("image") >= 0)
            if (event.target.files[0].type.indexOf("image") >= 0) {
                setImagen(event.target.files[0])
            } else {
                setImagen(null);
                Swal.fire('Error', 'Seleccinar una imagen', 'error');
            }

        }
    }

    const enviarImagen = async (event) => {
        event.preventDefault();

        let progress = 0;

        if (!imagen) {
            Swal.fire('Error', 'Seleccinar foto', 'error');
        } else {

            let formData = new FormData();
            formData.append("archivo", imagen);
            formData.append("id", id);

            try {

                const inter = setInterval(async () => {
                    progress += 5;
                    if (progress > 100) {
                        clearInterval(inter);
                        let response = await createProductImage(formData);
                        let json;

                        if (response.status === 200 || response.status === 201) {
                            json = await response.json()
                            setMensaje(json);
                            setControl(false);
                            Swal.fire('Imagen', 'Imagen Agregada', 'success')
                            history("/home")
                            return json;

                        }
                        if (response.status === 500) {
                            json = await response.json()
                            setMensaje(json);
                            return json;

                        }
                        if (response.status === 400) {

                            json = await response.json()

                            Swal.fire('Error', 'Seleccinar foto', 'error')

                            setMensaje(json);
                            return json;
                        }
                        if (response.status === 403) {
                            Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                            history("/")
                        }
                        if (response.status === 401) {
                            if (sesion) {
                                logout();
                            }
                            history("/")
                        }
                    } else {
                        setProgres(progress);
                    }

                }, 50);


            } catch (error) {
                console.log(error);
            }

        }

    }
    const enviar = async (event) => {
        event.preventDefault();

        const datos = JSON.stringify(
            {
                id,
                nombre,
                precio,
                imagen,
                cantidad,
                cantidadReal
            }

        );
        const datosPost = JSON.stringify(
            {

                nombre,
                precio,
                "imagen": "image.png",
                cantidad,
                cantidadReal
            }

        );
        // "Content-Type": "application/json"
        if (dato === 'new') {
            try {

                let response = await createProduct(datosPost);

                let json;

                if (response.status === 200) {
                    json = await response.json()
                    setMensaje(json);
                    setControl(true);
                    setId(json.cliente.id);
                    Swal.fire('Producto', 'Producto creado', 'success')
                    // history("/home")
                    return json;

                }
                if (response.status === 500) {
                    json = await response.json()
                    setMensaje(json);
                    return json;

                }
                if (response.status === 400) {

                    json = await response.json()

                    Swal.fire('Datos requeridos', 'Ingresar campos vacios o datos correctos', 'info')

                    setMensaje(json);
                    return json;
                }
                if (response.status === 403) {
                    Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                    history("/")
                }
                if (response.status === 401) {
                    if (sesion) {
                        logout();
                    }
                    history("/")
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            if (id !== "") {
                try {
                    let response = await updateProduct(id, datos);

                    let json;
                    if (response.status === 200) {
                        json = await response.json()
                        setMensaje(json);
                        Swal.fire('Producto', 'Producto actualizado', 'success')
                        history("/home")
                        return json;

                    }
                    if (response.status === 500) {

                        json = await response.json()
                        setMensaje(json);
                        return json;

                    }
                    if (response.status === 404) {

                        json = await response.json()
                        setMensaje(json);
                        return json;
                    }
                    if (response.status === 400) {

                        json = await response.json()
                        Swal.fire('Datos requeridos', 'Ingresar campos vacios o datos correctos', 'info')
                        setMensaje(json);
                        return json;
                    }
                    if (response.status === 403) {
                        Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                        history("/")
                    }
                    if (response.status === 401) {
                        if (sesion) {
                            logout();
                        }
                        history("/")
                    }
                } catch (error) {
                    const datoError = "campos vacios";
                    setMensaje(datoError)
                    // console.log(error);
                }
            } else {
                Swal.fire('Campos', 'Campos vacios', 'info')
                setMensaje("Campos vacios")
                history("/home")
            }
        }
    }


    return (
        <>
            {sesion ?
                <>
                    <Navigation user={sesion ? user : ""} sesion={sesion} roles={sesion ? hasRole() : []} />

                    <div>
                        {mensaje !== null ? <h1 >{mensaje.mensaje}</h1> : <></>}
                        {mensaje.length ? <h1>{mensaje}</h1> : <></>}
                        {dato === 'new' ? <h1 className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 ">Crear </h1> : <h1 className="uppercase text-center text-black truncate text-7xl font-mono font-black m-12 ">Actualizar </h1>}
                    </div>

                    {
                        !control ?
                            <>
                                <center>
                                    <div className="container  text-left lg:px-96 lg:w-4/5 sm:p-6 md:p-8 ">
                                        <form onSubmit={enviar} >
                                            {
                                                dato !== 'new' ?
                                                    <div class="relative z-0 w-full mb-6 group">
                                                        <input onChange={(e) => { setId(e.target.value) }} value={id} type="text" disabled name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ID</label>
                                                    </div>

                                                    :
                                                    <></>
                                            }

                                            <div class="relative z-0 w-full mb-6 group">
                                                <input onChange={(e) => { setNombre(e.target.value) }} value={nombre} type="text" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                                            </div>
                                            <div class="relative z-0 w-full mb-6 group">
                                                <input onChange={(e) => { setPrecio(e.target.value) }} value={precio} type="number" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
                                            </div>
                                            <div class="relative z-0 w-full mb-6 group">
                                                <input onChange={(e) => { setCantidad(e.target.value); setCantidadReal(e.target.value) }} value={cantidad} type="number" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cantidad</label>
                                            </div>
                                            <center>
                                                <button type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</button>
                                            </center>
                                        </form>
                                    </div>
                                </center>

                                {
                                    /*
                                                                    <form onSubmit={enviar} >
                                                                    {
                                                                        dato !== 'new' ?
                                                                            <div >
                                                                                <div>
                                                                                    <label>id</label>
                                                                                </div>
                                                                                <div>
                                                                                    <input onChange={(e) => { setId(e.target.value) }} value={id} type="text" disabled />
                                                                                </div>
                                
                                                                            </div>
                                
                                                                            :
                                                                            <></>
                                                                    }
                                                                    <div>
                                                                        <div>
                                                                            <label>Nombre</label>
                                                                        </div>
                                                                        <div>
                                                                            <input onChange={(e) => { setNombre(e.target.value) }} value={nombre} type="text" />
                                                                        </div>
                                
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <label >Precio</label>
                                                                        </div>
                                                                        <div>
                                                                            <input onChange={(e) => { setPrecio(e.target.value) }} value={precio} type="text" />
                                                                        </div>
                                
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <label>Cantidad</label>
                                                                        </div>
                                                                        <div>
                                                                            <input onChange={(e) => { setCantidad(e.target.value); setCantidadReal(e.target.value) }} value={cantidad} type="text" />
                                                                        </div>
                                
                                                                    </div>
                                
                                                                    <div>
                                                                        <div>
                                                                            <button>Enviar</button>
                                                                        </div>
                                
                                                                    </div>
                                
                                                                </form>
                                    */
                                }
                            </>
                            :
                            <></>

                    }

                    {
                        id !== "" ?
                            <center>
                                <div className="container  text-left lg:px-96 lg:w-4/5 sm:p-6 md:p-8">
                                    <form onSubmit={enviarImagen}>
                                        <div className="h-48 mt-12 bg-no-repeat flex justify-center bg-right">
                                            <img src={"http://localhost:8080/api/v1/uploads/img/" + imagen} alt="" />
                                        </div>
                                        <label class="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white" for="file_input">Subir archivo</label>
                                        <input onChange={(e) => { seleccionarFoto(e) }} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                        <div className="m-6 text-center">
                                            <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                                        </div>
                                    </form>
                                    <div>
                                        <Progress percent={progres} status="active" />
                                    </div>
                                </div>
                            </center>
                            :
                            <></>
                    }
                </>
                :
                <div>Cargando...</div>
            }
        </>
    );
}

export default Create;