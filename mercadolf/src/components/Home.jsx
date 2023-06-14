import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { hasRole, isAutenticated } from "../auth/auth.authenticated";
import { getUsuario } from "../auth/auth.token.user";
import { deleteProductId, findAllProductPage } from "../services/productApi";
import { logout } from "../session/operation.login";
import Navigation from "./auxiliarcomponent/Navigation";
import Paginator from "./Paginator";

function Home() {
    const { page } = useParams();

    const [product, setProduct] = useState([]);
    const [mensaje, setMensaje] = useState([]);
    const [sesion, setSesion] = useState(false);
    const [control, setControl] = useState(true);
    const [user, setUser] = useState("");

    const [pagePro, setPagePro] = useState(page);
    const [pageTotal, setPageTotal] = useState([]);
    const [total, setTotal] = useState([]);

    const history = useNavigate();

    //buscar actualizar cada vez que se genere un cambio de url
    useEffect(
        () => {
            createValor()
            if (!pagePro) {
                setPagePro(0);
            }
            if (control) {
                data();
            }


        }, [mensaje, sesion, pagePro]
    );
    const update = (a) => {
        history(`/create/${a}`);
    }
    const calcularPage = (total, totalEl) => {
        let pag;
        let desde = 0;
        let hasta = 0;

        if (Math.floor(pagePro) + 5 <= total) {
            desde = Math.floor(pagePro) + 1;//= total.slice(pagePro-1*5,pagePro*5)// Math.min(Math.max(1, pagePro -3 ), total - 4);
            hasta = Math.floor(pagePro) + 5;//= Math.max(Math.min(total, pagePro  + 3), 5);      
        } else {
            console.log(Math.floor(pagePro) + (total - (Math.floor(pagePro))))
            desde = Math.floor(pagePro) + 1;
            hasta = Math.floor(pagePro) + (total - (Math.floor(pagePro)));//= Math.max(Math.min(total, pagePro  + 3), 5);
        }

        if (total > 4) {
            pag = new Array(hasta - desde + 1).fill(0).map((valor, indice) => indice + desde);
        } else {
            pag = new Array(total).fill(0).map((valor, indice) => indice + 1);
        }
        setPageTotal(pag);
    }

    const createValor = () => {
        const da = isAutenticated();
        if (da) {
            setSesion(da);
            userData();
        } else {
            Swal.fire('Login', `No estás autenticado`, 'warning')
            history("/")
        }

    }
    const userData = () => {
        if (sesion) {
            setUser(getUsuario().username);
        }
    }

    async function data() {
        try {

            let response = await findAllProductPage(pagePro);

            let json;
            if (response.status === 200) {
                json = await response.json()

                setControl(true)
                setProduct(json.content);
                calcularPage(json.totalPages, json.totalElements);

                //let pag = new Array(json.totalPages).fill(0).map((valor, indice)=>indice+1);

                setTotal(json.totalPages);
                return json;
            }

            //  let response = await findAllProduct();

            //let json;
            //     if (response.status === 200) {
            //       json = await response.json()
            //     setControl(true)
            //   setProduct(json);
            // return json;
            // }
            if (response.status === 500) {
                json = await response.json()
                setMensaje(json);
                return json;
            }
            if (response.status === 404) {

                json = await response.json()
                Swal.fire('DDBB', 'No existe datos', 'warning')
                setControl(false);
                setProduct([])
                setMensaje(json)
                return;
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
    }

    const create = () => {
        history('/create/new')
    }
    const deleteProduct = async (id) => {
        try {
            let response = await deleteProductId(id);

            let json;
            if (response.status === 200) {
                json = await response.json()
                Swal.fire('Producto Eliminado', 'Producto eliminado correctamente', 'success')
                setMensaje(json);
                return json;
            }
            if (response.status === 500) {

                json = await response.json()
                setMensaje(json);
                return json;

            }
            if (response.status === 403) {
                Swal.fire('Acceso denegado', 'No tines permisos', 'warning')
                history("/")
            }
            if (response.status === 404) {
                Swal.fire('DDBB', 'No existe datos', 'warning')
                history("/home")
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

    }

    return (
        <>
            {sesion ?
                <>
                    <Navigation user={sesion ? user : ""} sesion={sesion} roles={sesion ? hasRole() : []} />

                    {mensaje !== null ? <h1>{mensaje.mensaje}</h1> : <></>}
                    {/*hasRole().length > 0 && hasRole().indexOf('ROLE_ADMIN') !== -1 ?
                        <div>
                            <button onClick={() => create()} >Crear</button>
                        </div>
                        :
                        <></>
                        */
                    }

                    {product.length > 0 ? (
                        <center>
                            <div class="container relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                                <table class="table-auto w-4/5 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Producto
                                            </th>

                                            <th scope="col" class="px-6 py-3">
                                                Precio
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                imagen
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                cantidad
                                            </th>
                                            {hasRole().length > 0 && hasRole().indexOf('ROLE_ADMIN') !== -1 ?
                                                <>
                                                    <th scope="col" class="px-6 py-3 text-center">
                                                        Operaciones
                                                    </th>

                                                </>
                                                :
                                                <></>
                                            }

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map(
                                            (prod) => (
                                                <tr key={prod.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {prod.nombre}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {prod.precio}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <img class="p-8 rounded-t-lg" src={"http://localhost:8080/api/v1/uploads/img/" + prod.imagen} alt="product image" />
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {prod.cantidad}
                                                    </td>
                                                    <td class="px-6 py-4 text-right">

                                                        {hasRole().length > 0 && hasRole().indexOf('ROLE_ADMIN') !== -1 ?
                                                            <>
                                                                <th className="justify-items-center ">
                                                                    <button onClick={() => update(prod.id)} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Actualizar</button>
                                                                    <button onClick={() => deleteProduct(prod.id)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button></th>
                                                            </>
                                                            :
                                                            <></>
                                                        }
                                                    </td>
                                                </tr>

                                            )
                                        )
                                        }
                                    </tbody>
                                </table>

                            </div>
                            <div className="m-12">
                                <Paginator pageTotal={pageTotal} pagePro={pagePro} total={total} />
                            </div>
                        </center>

                    ) : (
                        <div> </div>
                    )}


                    { /*
                    product.length > 0 ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>nombre</th>
                                        <th>precio</th>
                                        <th>imagen</th>
                                        <th>cantidad</th>
                                        {hasRole().length > 0 && hasRole().indexOf('ROLE_ADMIN') !== -1 ?
                                            <>
                                                <th>actualizar</th>
                                                <th>eliminar</th>
                                            </>
                                            :
                                            <></>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map(
                                        (prod) => (
                                            <tr key={prod.id}>
                                                <th> {prod.id}</th>
                                                <th> {prod.nombre}</th>
                                                <th> {prod.precio}</th>
                                                <th> {prod.imagen}</th>
                                                <th>{prod.cantidad}</th>
                                                {hasRole().length > 0 && hasRole().indexOf('ROLE_ADMIN') !== -1 ?
                                                    <>
                                                        <th><button onClick={() => update(prod.id)}>actualizar</button></th>
                                                        <th><button onClick={() => deleteProduct(prod.id)}>eliminar</button></th>
                                                    </>
                                                    :
                                                    <></>
                                                }
                                            </tr>
                                        )
                                    )
                                    }
                                </tbody>
                            </table>
                            <Paginator pageTotal={pageTotal} pagePro={pagePro} total={total} />
                        </>

                    ) : (
                        <div> </div>
                    )
                    */}
                </>
                :
                <div>Cargando...</div>
            }
        </>
    );
}

export default Home;