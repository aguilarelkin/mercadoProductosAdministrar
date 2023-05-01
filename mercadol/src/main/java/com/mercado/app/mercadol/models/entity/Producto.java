package com.mercado.app.mercadol.models.entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "productos")
@Getter@Setter
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "no puede estar vacio")
    @Size(min = 4, message = "Mínimo de cuatro números")
    @Column(nullable = false, unique = true)
    private String nombre;

    @NotNull(message = "no puede estar vacio")
    @Column(nullable = false)
    private Long precio;

    @NotNull(message = "no puede estar vacio")
    @Column(nullable = false)
    private Integer cantidad;

    @NotNull(message = "no puede estar vacio")
    @Column(nullable = false)
    private Integer cantidadReal;

    @NotEmpty(message = "no puede estar vacio")
    @Column(nullable = false)
    private String imagen;
}
