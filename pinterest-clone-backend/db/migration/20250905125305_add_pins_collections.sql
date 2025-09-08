-- +goose Up
-- +goose StatementBegin
CREATE TABLE pins (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    source_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE collections (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE collection_pins (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    collection_id BIGINT NOT NULL REFERENCES collections (id) ON DELETE CASCADE,
    pin_id BIGINT NOT NULL REFERENCES pins (id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (collection_id, pin_id)
);

CREATE INDEX idx_pins_user_id ON pins (user_id);

CREATE INDEX idx_collections_user_id ON collections (user_id);

CREATE INDEX idx_collection_pins_collection_id ON collection_pins (collection_id);

CREATE INDEX idx_collection_pins_pin_id ON collection_pins (pin_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE collection_pins;

DROP TABLE collections;

DROP TABLE pins;
-- +goose StatementEnd