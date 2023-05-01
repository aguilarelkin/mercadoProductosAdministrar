package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IProductoService {

    public List<Producto> findProductos();
    public Optional<Producto> findProduct(Long id);
    public Producto findProductName(String nombre);
    public void deleteProduct(Long id);
    public Producto updateProduct(Producto producto);
    public Producto create(Producto producto);

    public Page<Producto> findAllProduct(Pageable pageable);



}
