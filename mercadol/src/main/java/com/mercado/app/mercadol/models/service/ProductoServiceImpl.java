package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.dao.IProductoDao;
import com.mercado.app.mercadol.models.entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements IProductoService{

    @Autowired
    private IProductoDao productoDao;


    @Override
    @Transactional(readOnly = true)
    public List<Producto> findProductos() {
        return productoDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Producto> findProduct(Long id) {
        return productoDao.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Producto  findProductName(String nombre) {
        return productoDao.findByNombre(nombre);
    }

    @Override
    public void deleteProduct(Long id) {
        productoDao.deleteById(id);
    }

    @Override
    public Producto updateProduct(Producto producto) {
        return productoDao.save(producto);
    }

    @Override
    public Producto create(Producto producto) {
        return productoDao.save(producto);
    }

    @Override
    public Page<Producto> findAllProduct(Pageable pageable) {
        return  productoDao.findAll(pageable);
    }
}
