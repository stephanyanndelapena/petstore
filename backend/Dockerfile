# Multi-stage build for backend
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY backend /app
RUN mvn -f /app -DskipTests package

FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy built jar(s)
COPY --from=build /app/backend/target/*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=local
ENV JAVA_OPTS="-Xms256m -Xmx512m"
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]