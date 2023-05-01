FROM openjdk:17-alpine
ADD target/mercadol-0.0.1-SNAPSHOT.jar service.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/service.jar"]