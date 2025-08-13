FROM golang:1.23.0 AS build-stage

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download


COPY . .

# Build the backend binary as pinterest-clone
RUN CGO_ENABLED=0 GOOS=linux go build -o /pinterest-clone

FROM alpine:3.21 AS build-release-stage

WORKDIR /


COPY --from=build-stage /pinterest-clone /pinterest-clone

EXPOSE 8080

ENV REDIS_URL=redis://redis:6379/0
ENV ADDR=:8080

ENTRYPOINT ["/pinterest-clone"]
