package com.mercado.app.mercadol.models.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadFileServiceImpl implements IUploadService{

    private final Logger logger = LoggerFactory.getLogger(UploadFileServiceImpl.class);

    @Override
    public Resource cargar(String nombreFoto) throws MalformedURLException {

        Path rutaArchivo = getPath(nombreFoto);
        logger.info(rutaArchivo.toString());
        Resource recurso = new UrlResource(rutaArchivo.toUri());

        if (!recurso.exists() && !recurso.isReadable()) {
            rutaArchivo = Paths.get("src/main/resources/static/images").resolve("image.png").toAbsolutePath();

                recurso = new UrlResource(rutaArchivo.toUri());

            logger.error("Error no se puede cargar la imagen" + nombreFoto);
        }
        return recurso;
    }

    @Override
    public String copiar(MultipartFile archivo) throws IOException {
        String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename().replace(" ", "");
        Path rutaArchivo = getPath(nombreArchivo);
        logger.info(rutaArchivo.toString());

            Files.copy(archivo.getInputStream(), rutaArchivo);

        return nombreArchivo;
    }

    @Override
    public boolean eliminar(String nombreFoto) {
        if (nombreFoto != null && nombreFoto.length() > 0) {

            Path rutaFotoAnterior = Paths.get("/uploads").resolve(nombreFoto).toAbsolutePath();
            //Path rutaFotoAnterior = Paths.get("E:/Proyectos/mercadolibreProductos/uploads").resolve(nombreFoto).toAbsolutePath();
           // Path rutaFotoAnterior = Paths.get("/home/mercadosshh/uploads").resolve(nombreFoto).toAbsolutePath();

            File archivoFotoAnterior = rutaFotoAnterior.toFile();
            if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
                archivoFotoAnterior.delete();
                return true;
            }
        }
        return false;
    }

    @Override
    public Path getPath(String nombreFoto) {
        // "/home/mercadosshh/uploads"

        return Paths.get("uploads").resolve(nombreFoto). toAbsolutePath();
       // return Paths.get("E:/Proyectos/mercadolibreProductos/uploads").resolve(nombreFoto). toAbsolutePath();
       // return Paths.get("/home/mercadosshh/uploads").resolve(nombreFoto). toAbsolutePath();
    }
}
