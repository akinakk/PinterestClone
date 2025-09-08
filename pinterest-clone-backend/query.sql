-- name: CreateUser :one
insert into
    users (
        first_name,
        last_name,
        email,
        password
    )
values ($1, $2, $3, $4)
returning
    id;

-- name: CreateSession :exec
insert into
    sessions (
        sid,
        user_id,
        expires_at,
        ip,
        user_agent
    )
values ($1, $2, $3, $4, $5);

-- name: DestroySession :exec
delete from sessions where sid = $1;

-- name: DestroyAllSessions :many
delete from sessions where user_id = $1 returning sid;

-- name: UpdateSessionExpiration :exec
update sessions set expires_at = $1 where sid = $2;

-- name: GetUserIDBySession :one
select user_id from sessions where sid = $1 and ip = $2;

-- name: GetUserByID :one
select id, first_name, last_name, email from users where id = $1;

-- name: GetUserEmailByID :one
select email from users where id = $1;

-- name: GetUserByEmail :one
select id, password from users where email = $1;

-- name: CreatePin :one
INSERT INTO
    pins (
        user_id,
        title,
        description,
        image_url,
        source_url
    )
VALUES ($1, $2, $3, $4, $5)
RETURNING
    id,
    user_id,
    title,
    description,
    image_url,
    source_url,
    created_at;

-- name: GetAllPins :many
SELECT
    id,
    user_id,
    title,
    description,
    image_url,
    source_url,
    created_at
FROM pins
ORDER BY created_at DESC;

-- name: GetPinByID :one
SELECT
    id,
    user_id,
    title,
    description,
    image_url,
    source_url,
    created_at
FROM pins
WHERE
    id = $1;

-- name: GetUserPins :many
SELECT
    id,
    user_id,
    title,
    description,
    image_url,
    source_url,
    created_at
FROM pins
WHERE
    user_id = $1
ORDER BY created_at DESC;

-- name: CreateCollection :one
INSERT INTO
    collections (
        user_id,
        name,
        description,
        is_private
    )
VALUES ($1, $2, $3, $4)
RETURNING
    id,
    user_id,
    name,
    description,
    is_private,
    created_at,
    updated_at;

-- name: GetUserCollections :many
SELECT
    id,
    user_id,
    name,
    description,
    is_private,
    created_at,
    updated_at
FROM collections
WHERE
    user_id = $1
ORDER BY created_at DESC;

-- name: GetCollection :one
SELECT
    id,
    user_id,
    name,
    description,
    is_private,
    created_at,
    updated_at
FROM collections
WHERE
    id = $1;

-- name: AddPinToCollection :exec
INSERT INTO
    collection_pins (collection_id, pin_id)
VALUES ($1, $2)
ON CONFLICT (collection_id, pin_id) DO NOTHING;

-- name: RemovePinFromCollection :exec
DELETE FROM collection_pins
WHERE
    collection_id = $1
    AND pin_id = $2;

-- name: GetCollectionPins :many
SELECT p.id, p.user_id, p.title, p.description, p.image_url, p.source_url, p.created_at
FROM pins p
    JOIN collection_pins cp ON p.id = cp.pin_id
WHERE
    cp.collection_id = $1
ORDER BY cp.added_at DESC;