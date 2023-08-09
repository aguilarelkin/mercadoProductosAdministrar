package com.mercado.app.mercadol.controllers;

import com.mercado.app.mercadol.models.entity.Producto;
import com.mercado.app.mercadol.models.service.IProductoService;

import com.mercado.app.mercadol.models.service.IUploadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

//import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;
import java.util.stream.Collectors;

//      @CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/v1")
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @Autowired
    private IUploadService uploadService;

    @PreAuthorize("hasAuthority({'ROLE_ADMIN', 'ROLE_USER'})")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("/products/page/{page}")
    public Page<Producto> getProductoPage(@PathVariable Integer page) {

        return productoService.findAllProduct(PageRequest.of(page, 2));
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN', 'ROLE_USER'})")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("/products")
    public ResponseEntity<?> getProductos() {

        List<Producto> producto;

        Map<String, Object> response = new HashMap<>();

        try {
            producto = productoService.findProductos();


        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (producto.isEmpty()) {
            response.put("mensaje", "No existe Productos en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Producto>>(producto, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN'})")
    @Secured({"ROLE_ADMIN"})
    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        Optional<Producto> producto;
        Map<String, Object> response = new HashMap<>();
        try {
            producto = productoService.findProduct(id);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (producto.isEmpty()) {
            response.put("mensaje", "No existe el Producto ".concat(id.toString()) + " en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Optional<Producto>>(producto, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN'})")
    @Secured({"ROLE_ADMIN"})
    @GetMapping("/product/p/{nombre}")
    public ResponseEntity<?> getProductName(@PathVariable String nombre) {
        Producto producto;
        Map<String, Object> response = new HashMap<>();
        try {
            producto = productoService.findProductName(nombre);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (producto == null) {
            response.put("mensaje", "No existe el Producto ".concat(nombre) + " en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Producto>(producto, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN'})")
    @Secured({"ROLE_ADMIN"})
    @PostMapping("/product/c")
    public ResponseEntity<?> createProduct(@Valid @RequestBody Producto producto, BindingResult result) {
        Producto productoCreate = null;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {

            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            productoCreate = productoService.create(producto);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El producto ha sido creado con éxito!");
        response.put("cliente", productoCreate);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN'})")
    @Secured({"ROLE_ADMIN"})
    @PutMapping("/product/u/{id}")
    public ResponseEntity<?> updateProduct(@Valid @RequestBody Producto producto, BindingResult result, @PathVariable Long id) {

        Optional<Producto> productoActual = productoService.findProduct(id);

        Producto productoUpdate = null;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {

            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (productoActual.isEmpty()) {
            response.put("mensaje", "Error: no se pudo editar, el cliente ID: "
                    .concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        try {
            productoActual.get().setNombre(producto.getNombre());
            productoActual.get().setPrecio(producto.getPrecio());
            productoActual.get().setImagen(producto.getImagen());
            productoActual.get().setCantidad(producto.getCantidad());
            productoActual.get().setCantidadReal(producto.getCantidadReal());

            productoUpdate = productoService.updateProduct(productoActual.get());
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar el producto en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El cliente ha sido actualizado con éxito!");
        response.put("cliente", productoUpdate);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN'})")
    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/product/d/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Producto> producto = productoService.findProduct(id);

            String nombrFotoAnterior = producto.get().getImagen();

            uploadService.eliminar(nombrFotoAnterior);


            productoService.deleteProduct(id);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el producto de la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El cliente eliminado con éxito!");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority({'ROLE_ADMIN'})")
    @Secured({"ROLE_ADMIN"})
    @PostMapping("/product/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Producto> producto = productoService.findProduct(id);

        if (!archivo.isEmpty()) {
            String nombreArchivo = null;

            try {
                nombreArchivo = uploadService.copiar(archivo);
            } catch (IOException e) {
                response.put("mensaje", "Error al subir la imagen del producto");
                response.put("error", e.getMessage().concat(": "));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String nombrFotoAnterior = producto.get().getImagen();//delete imagen si existe para crear la nueva

            uploadService.eliminar(nombrFotoAnterior);

            producto.get().setImagen(nombreArchivo);
            productoService.updateProduct(producto.get());
            response.put("mensaje", "Has subido correctamente la imagen");
            response.put("producto", producto.get());

        }


        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    // @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("/uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

        Resource recurso = null;

        try {
            recurso = uploadService.cargar(nombreFoto);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
        return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
    }

}
