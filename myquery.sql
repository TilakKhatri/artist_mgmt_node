--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: tilakkhatri
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.admin OWNER TO tilakkhatri;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: tilakkhatri
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO tilakkhatri;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tilakkhatri
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: artists; Type: TABLE; Schema: public; Owner: tilakkhatri
--

CREATE TABLE public.artists (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    address text,
    first_release_year text NOT NULL,
    no_of_album_release integer NOT NULL,
    dob date,
    gender character(1),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT artists_gender_check CHECK ((gender = ANY (ARRAY['m'::bpchar, 'f'::bpchar, 'o'::bpchar])))
);


ALTER TABLE public.artists OWNER TO tilakkhatri;

--
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: tilakkhatri
--

CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.artists_id_seq OWNER TO tilakkhatri;

--
-- Name: artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tilakkhatri
--

ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;


--
-- Name: music; Type: TABLE; Schema: public; Owner: tilakkhatri
--

CREATE TABLE public.music (
    id integer NOT NULL,
    artist_id integer NOT NULL,
    title character varying(255) NOT NULL,
    album_name character varying(255) NOT NULL,
    genre character(15),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT music_genre_check CHECK ((genre = ANY (ARRAY['rnb'::bpchar, 'country'::bpchar, 'classic'::bpchar, 'rock'::bpchar, 'jazz'::bpchar])))
);


ALTER TABLE public.music OWNER TO tilakkhatri;

--
-- Name: music_id_seq; Type: SEQUENCE; Schema: public; Owner: tilakkhatri
--

CREATE SEQUENCE public.music_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.music_id_seq OWNER TO tilakkhatri;

--
-- Name: music_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tilakkhatri
--

ALTER SEQUENCE public.music_id_seq OWNED BY public.music.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tilakkhatri
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(15),
    dob date,
    gender character(1),
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_gender_check CHECK ((gender = ANY (ARRAY['m'::bpchar, 'f'::bpchar, 'o'::bpchar])))
);


ALTER TABLE public.users OWNER TO tilakkhatri;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tilakkhatri
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tilakkhatri;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tilakkhatri
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: artists id; Type: DEFAULT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);


--
-- Name: music id; Type: DEFAULT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.music ALTER COLUMN id SET DEFAULT nextval('public.music_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: tilakkhatri
--

COPY public.admin (id, username, email, password) FROM stdin;
2	Tilak0001	echeck1900@gmail.com	$2b$10$IHctnh7pMMcOrEROaN.6RuLg3olSbVXqWRX5r9x7.4vZur2jgL6nq
3	Tom	tester1001@gmail.com	$2b$10$Hlsdxe2BPURpwtD3w7bU9OC9oeeFUWonkxh.ntMObatAVF0T3ePle
4	Tilak0001	tester12@gmail.com	$2b$10$oWeE6bahNJq84gbadhh1JuQZGRYhMXWEkbPXtAwDUzjJsefblf1Ny
5	Tom2	tester100@gmail.com	$2b$10$vOhJiYbEOs24jnucafyfvu6nLaWl0GV0Y3C.075kodQ02oL2hL5cu
6	henry	tester2@gmail.com	$2b$10$0eNm3kqwT24m6RUBk94uBuVMRgPuxGr8QWdePsFAndR.WaYQIllcu
7	sagar01	tester@gmail.com	$2b$10$BE1YzAdCWURkcZiNn38Vh.k9FGrrLETeYE7Kvo2s3OxjsoiVT8yTO
9	Tilak0002	echeck1901@gmail.com	$2b$10$BP3E0bKhA60FSrp9FIrzNe7bpGEzuHiDpsBIhnOrkdz4eTpuDxkMi
10	IAM	tilakkhatri0001@gmail.com	$2b$10$DhXLKscK7Y1duD8Ts1m7qu4Fp4epVgN/jlVdOvfOLEE/lyBxWxoRG
\.


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: tilakkhatri
--

COPY public.artists (id, name, address, first_release_year, no_of_album_release, dob, gender, created_at, updated_at) FROM stdin;
2	Jane Smith	456 Oak Ave	2002	3	1982-02-02	f	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
3	Mike Johnson	789 Pine Rd	1998	7	1979-03-03	m	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
4	Emily Davis	321 Maple Dr	2005	4	1985-04-04	f	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
5	Chris Brown	654 Cedar Ln	2010	2	1990-05-05	m	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
7	David Taylor	159 Birch Blvd	1995	6	1975-07-07	m	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
8	Sophia Martinez	753 Spruce Ct	2008	5	1988-08-08	f	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
9	Michael Lee	357 Fir Pl	2015	3	1995-09-09	m	2024-08-17 07:58:18.001537	2024-08-17 07:58:18.001537
12	Bob marly	12,st,ma	2018-08-09	4	2000-06-04	m	2024-08-17 10:53:41.339256	2024-08-18 09:51:41.706
13	Testing 	california, usa	2001-07-30	2	1980-08-19	f	2024-08-18 09:51:25.648426	2024-08-18 15:46:23.633
15	Ragav	456 Oak Ave	2002	3	1982-02-01	f	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
16	Tammy	789 Pine Rd	1998	7	1979-03-02	m	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
17	Karan	321 Maple Dr	2005	4	1985-04-03	f	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
18	Arjit	654 Cedar Ln	2010	2	1990-05-04	m	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
19	Meena	159 Birch Blvd	1995	6	1975-07-06	m	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
20	Tarak	753 Spruce Ct	2008	5	1988-08-07	f	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
21	Megna	357 Fir Pl	2015	3	1995-09-08	m	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
22	Atif	12,st,ma	2018-08-09	4	2000-06-03	m	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
23	Reena	california, usa	2001-07-30	2	1980-08-18	f	2024-08-18 20:17:48.499513	2024-08-18 20:17:48.499513
38	Jane Doe	Los Angeles	2001	4	2024-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
39	John Smith	London	2005	2	2025-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
40	Alice Johnson	New York	2000	6	2026-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
41	Michael Brown	Tokyo	2003	3	2027-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
42	David Wilson	Shanghai	2010	1	2029-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
43	Laura Martinez	Berlin	2004	7	2030-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
44	James Anderson	Barcelona	2011	4	2031-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
45	Olivia Thompson	Rome	2002	6	2032-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
46	William Harris	Sydney	2012	3	2033-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
48	Daniel Lewis	Seoul	2007	2	2035-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
49	Isabella Robinson	San Francisco	2009	4	2036-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
50	Ethan Walker	Moscow	2001	7	2037-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
51	Charlotte Hall	Amsterdam	2003	3	2038-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
52	Joshua Young	Sao Paulo	2015	1	2039-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
53	Ava King	Hong Kong	2014	2	2040-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
54	Oliver Wright	Zurich	2018	5	2041-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
55	Mia Scott	New Delhi	2000	6	2042-08-17	f	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
56	Henry Green	Istanbul	2011	3	2043-08-17	m	2024-08-18 23:59:41.755592	2024-08-18 23:59:41.755592
\.


--
-- Data for Name: music; Type: TABLE DATA; Schema: public; Owner: tilakkhatri
--

COPY public.music (id, artist_id, title, album_name, genre, created_at, updated_at) FROM stdin;
2	2	Country Roads	Backroads Journey	country        	2024-08-17 09:10:00.427059	2024-08-17 09:10:00.427059
7	3	Beethoven’s Moonlight	Piano Classics	classic        	2024-08-17 09:10:00.427059	2024-08-17 09:10:00.427059
8	2	Southern Comfort	Country Classics	country        	2024-08-17 09:10:00.427059	2024-08-17 09:10:00.427059
9	4	Electric Pulse	Rock Revolution	rock           	2024-08-17 09:10:00.427059	2024-08-17 09:10:00.427059
10	5	Evening Chill	Jazz Essentials	jazz           	2024-08-17 09:10:00.427059	2024-08-17 09:10:00.427059
3	4	I miss you	Late Night Vibes	country        	2024-08-17 09:10:00.427059	2024-08-17 14:54:59.115
11	8	test this is title	Late Night Vibes	country        	2024-08-17 14:56:47.994167	2024-08-17 14:56:47.994167
12	8	test this is title	Late Night Vibes	country        	2024-08-18 13:57:03.867058	2024-08-18 13:57:03.867058
5	5	I love you	Smooth Sounds	classic        	2024-08-17 09:10:00.427059	2024-08-18 14:51:39.399
13	5	sdfdsfsdfsdfsdf	dsfds	rnb            	2024-08-18 14:56:13.289166	2024-08-18 14:56:13.289166
14	5	jskjslsfdsfdsfdsfdf	ksdjdsfj	classic        	2024-08-18 14:58:38.215107	2024-08-18 14:58:38.215107
16	7	Testing music update	Test Album	rock           	2024-08-18 15:45:25.231229	2024-08-18 15:45:53.877
18	43	Testing one update	UIkjdkfjdkjfk	country        	2024-08-19 08:27:56.599943	2024-08-19 08:56:03.617
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tilakkhatri
--

COPY public.users (id, first_name, last_name, email, password, phone, dob, gender, address, created_at, updated_at) FROM stdin;
10	sifjd	skdjfd	sjfksW@gma.com	$2b$10$uAbt0IT.HaREJFNelJy0hemoWy2SXHa0IMZCwCkDsLPyvfrk2uUc6	\N	2024-08-16	o	\N	2024-08-17 18:37:46.10348	2024-08-17 18:37:46.10348
11	firstname2	Lastname2	email2@mail.com	$2b$10$gv.3ova5r3cbetVDPWSC8OmGew1fOkUEkl6sfkHGRupT4r164ppwm		2021-09-01	f	124 st,oh,usa	2024-08-17 18:46:43.984832	2024-08-17 18:46:43.984832
12	fsafsdf	asfddsf	testerwee@gmail.com	$2b$10$I7Ru0WHBMtouIDcEYzYI3u1cJgzLawKy9Ffw99VyoupM/YZ7Zw5mm	+977 9841084694	2024-08-01	o	asfsdafsdf	2024-08-17 19:43:30.112035	2024-08-17 19:43:30.112035
13	skdflsdflsdf	ksjdflksdajfla	jasfsdj@dev.com	$2b$10$rwfCNeSJwBRe4sT6cKTNFeysiE8Of9q72ugQZHxrq9ymLYZ51hUNK	23526757575045	1990-08-14	f	asjflkdjsfljasdflkjdsf	2024-08-17 19:44:01.021025	2024-08-17 19:44:01.021025
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tilakkhatri
--

SELECT pg_catalog.setval('public.admin_id_seq', 10, true);


--
-- Name: artists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tilakkhatri
--

SELECT pg_catalog.setval('public.artists_id_seq', 56, true);


--
-- Name: music_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tilakkhatri
--

SELECT pg_catalog.setval('public.music_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tilakkhatri
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: music music_pkey; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_pkey PRIMARY KEY (id);


--
-- Name: artists unique_name; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: music music_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tilakkhatri
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

