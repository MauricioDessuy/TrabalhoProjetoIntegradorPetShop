CREATE TABLE pessoas
(
    id SERIAL NOT NULL PRIMARY KEY,
    cpf VARCHAR(255),
    data_nascimento DATE,
    email VARCHAR(255),
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    sexo INTEGER NOT NULL,
    telefone VARCHAR(255),
    usuario VARCHAR(255) NOT NULL
);

CREATE TABLE produtos
(
    id SERIAL NOT NULL PRIMARY KEY,
    marca VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    valor_unitario REAL NOT NULL,
    tipo_produto INTEGER NOT NULL DEFAULT 0
)

CREATE TABLE public.fornecedores
(
    id SERIAL NOT NULL,
    cnpj VARCHAR(255)   ,
    email character varying(255) COLLATE pg_catalog."default",
    nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
    telefone character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT fornecedores_pkey PRIMARY KEY (id)
)

CREATE TABLE animals
(
    id SERIAL NOT NULL primary key,
    data_nascimento date,
    data_obito date,
    nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
    raca character varying(255) COLLATE pg_catalog."default" NOT NULL,
    id_pessoa bigint NOT NULL
)

create table animal_vacina(
    id SERIAL NOT NULL primary key,
    id_produto INTEGER NOT NULL,
    data_vacinacao date,
    id_animal INTEGER NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produtos(id),
    FOREIGN KEY (id_animal) REFERENCES animals(id)
)