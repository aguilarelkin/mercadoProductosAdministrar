package com.mercado.app.mercadol.models.dao;

import com.mercado.app.mercadol.models.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IProductoDao extends JpaRepository<Producto, Long> {
   // @Query("select p from Producto p where p.nombre=?1")
    public Producto findByNombre(String nombre);

   // @Query("select u from Usuario u where u.username=?1")
    //public Usuario findByUsername2(String username);
}
