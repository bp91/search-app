--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE converter;
ALTER ROLE converter WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'converter';
-- CREATE ROLE postgres;
-- ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Database creation
--

CREATE DATABASE converter WITH TEMPLATE = template0 OWNER = converter;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect converter

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3 (Debian 10.3-1.pgdg90+1)
-- Dumped by pg_dump version 10.3 (Debian 10.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: instr(character varying, character varying); Type: FUNCTION; Schema: public; Owner: converter
--

CREATE FUNCTION public.instr(character varying, character varying) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
DECLARE
  pos integer;
BEGIN
  pos:= instr($1, $2, 1);
  RETURN pos;
END;
$_$;


ALTER FUNCTION public.instr(character varying, character varying) OWNER TO converter;

--
-- Name: instr(character varying, character varying, integer); Type: FUNCTION; Schema: public; Owner: converter
--

CREATE FUNCTION public.instr(string character varying, string_to_search character varying, beg_index integer) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
  pos integer NOT NULL DEFAULT 0;
  temp_str varchar;
  beg integer;
  length integer;
  ss_length integer;
BEGIN
  IF beg_index > 0 THEN
    temp_str := substring(string FROM beg_index);
    pos := position(string_to_search IN temp_str);

    IF pos = 0 THEN
      RETURN 0;
    ELSE
      RETURN pos + beg_index - 1;
    END IF;
  ELSE
    ss_length := char_length(string_to_search);
    length := char_length(string);
    beg := length + beg_index - ss_length + 2;

    WHILE beg > 0 LOOP
      temp_str := substring(string FROM beg FOR ss_length);
      pos := position(string_to_search IN temp_str);

      IF pos > 0 THEN
        RETURN beg;
      END IF;

      beg := beg - 1;
    END LOOP;

    RETURN 0;
  END IF;
END;
$$;


ALTER FUNCTION public.instr(string character varying, string_to_search character varying, beg_index integer) OWNER TO converter;

--
-- Name: instr(character varying, character varying, integer, integer); Type: FUNCTION; Schema: public; Owner: converter
--

CREATE FUNCTION public.instr(string character varying, string_to_search character varying, beg_index integer, occur_index integer) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
  pos integer NOT NULL DEFAULT 0;
  occur_number integer NOT NULL DEFAULT 0;
  temp_str varchar;
  beg integer;
  i integer;
  length integer;
  ss_length integer;
BEGIN
  IF beg_index > 0 THEN
    beg := beg_index;
    temp_str := substring(string FROM beg_index);

    FOR i IN 1..occur_index LOOP
      pos := position(string_to_search IN temp_str);

      IF i = 1 THEN
        beg := beg + pos - 1;
      ELSE
        beg := beg + pos;
      END IF;

      temp_str := substring(string FROM beg + 1);
    END LOOP;

    IF pos = 0 THEN
      RETURN 0;
    ELSE
      RETURN beg;
    END IF;
  ELSE
    ss_length := char_length(string_to_search);
    length := char_length(string);
    beg := length + beg_index - ss_length + 2;

    WHILE beg > 0 LOOP
      temp_str := substring(string FROM beg FOR ss_length);
      pos := position(string_to_search IN temp_str);

      IF pos > 0 THEN
        occur_number := occur_number + 1;

        IF occur_number = occur_index THEN
          RETURN beg;
        END IF;
      END IF;

      beg := beg - 1;
    END LOOP;

    RETURN 0;
  END IF;
END;
$$;


ALTER FUNCTION public.instr(string character varying, string_to_search character varying, beg_index integer, occur_index integer) OWNER TO converter;

--
-- Name: currency; Type: TABLE; Schema: public; Owner: converter
--

CREATE TABLE public.currency (
  id serial NOT NULL,
  name character varying(255),
  value character varying(255),

  CONSTRAINT currency_pk PRIMARY KEY (name)
);

INSERT INTO public.currency(
  name, value) 
  VALUES ('EUR', 'EUR'), 
  ('USD', 'USD'), 
  ('JPY', 'JPY'), 
  ('BGN', 'BGN'), 
  ('CZK', 'CZK'), 
  ('DKK', 'DKK'), 
  ('GBP', 'GBP'),
  ('HUF', 'HUF'),
  ('PLN', 'PLN'),
  ('RON', 'RON'),
  ('SEK', 'SEK'),
  ('CHF', 'CHF'),
  ('ISK', 'ISK'),
  ('NOK', 'NOK'),
  ('HRK', 'HRK'),
  ('RUB', 'RUB'),
  ('TRY', 'TRY'),
  ('AUD', 'AUD'),
  ('BRL', 'BRL'),
  ('CAD', 'CAD'),
  ('CNY', 'CNY'),
  ('HKD', 'HKD'),
  ('IDR', 'IDR'),
  ('ILS', 'ILS'),
  ('INR', 'INR'),
  ('KRW', 'KRW'),
  ('MXN', 'MXN'),
  ('MYR', 'MYR'),
  ('NZD', 'NZD'),
  ('PHP', 'PHP'),
  ('SGD', 'SGD'),
  ('THB', 'THB'),
  ('ZAR', 'ZAR');

ALTER TABLE public.currency OWNER TO converter;

GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-09-17 23:33:02 CEST

--
-- PostgreSQL database dump complete
--