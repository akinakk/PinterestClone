-- +goose Up
-- +goose StatementBegin

-- Таблица для коллекций (досок)
CREATE TABLE collections (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица для пинов
CREATE TABLE pins (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    source_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица для связи пинов и коллекций (many-to-many)
CREATE TABLE collection_pins (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    collection_id BIGINT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    pin_id BIGINT NOT NULL REFERENCES pins(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(collection_id, pin_id)
);

-- Индексы для производительности
CREATE INDEX idx_collections_user_id ON collections(user_id);
CREATE INDEX idx_pins_user_id ON pins(user_id);
CREATE INDEX idx_collection_pins_collection_id ON collection_pins(collection_id);
CREATE INDEX idx_collection_pins_pin_id ON collection_pins(pin_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE collection_pins;
DROP TABLE pins;
DROP TABLE collections;
-- +goose StatementEnd
