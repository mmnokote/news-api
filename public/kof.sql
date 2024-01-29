--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Ubuntu 16.1-1.pgdg23.10+1)
-- Dumped by pg_dump version 16.1 (Ubuntu 16.1-1.pgdg23.10+1)

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
-- Name: abstracts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.abstracts (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    email character varying(1000) NOT NULL,
    title character varying(1000) NOT NULL,
    author character varying(1000) NOT NULL,
    affiliation character varying(1000) NOT NULL,
    presenting_author character varying(1000) NOT NULL,
    background character varying(1000) NOT NULL,
    objective character varying(1000) NOT NULL,
    methodology character varying(1000) NOT NULL,
    results character varying(1000) NOT NULL,
    "subTheme" character varying NOT NULL,
    conclusion character varying NOT NULL,
    recommendations character varying NOT NULL,
    inline character varying(1000) NOT NULL
);


ALTER TABLE public.abstracts OWNER TO postgres;

--
-- Name: abstracts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.abstracts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.abstracts_id_seq OWNER TO postgres;

--
-- Name: abstracts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.abstracts_id_seq OWNED BY public.abstracts.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying DEFAULT 'primary'::character varying NOT NULL,
    "parentId" integer
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_closure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_closure (
    id_ancestor integer NOT NULL,
    id_descendant integer NOT NULL
);


ALTER TABLE public.category_closure OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    name character varying(1000) NOT NULL,
    code character varying(1000) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    original_name character varying(1000) NOT NULL,
    current_name character varying(1000) NOT NULL,
    extension character varying(1000) NOT NULL,
    size integer NOT NULL
);


ALTER TABLE public.files OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_id_seq OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: jisajilis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jisajilis (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    status character varying(1000) DEFAULT false NOT NULL,
    path_file character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.jisajilis OWNER TO postgres;

--
-- Name: jisajilis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jisajilis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jisajilis_id_seq OWNER TO postgres;

--
-- Name: jisajilis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jisajilis_id_seq OWNED BY public.jisajilis.id;


--
-- Name: menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menus (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    description character varying(1000) NOT NULL,
    name character varying(1000),
    state character varying(1000),
    url character varying(1000),
    icon character varying(1000),
    code character varying(1000),
    uid character varying(1000) NOT NULL
);


ALTER TABLE public.menus OWNER TO postgres;

--
-- Name: menus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menus_id_seq OWNER TO postgres;

--
-- Name: menus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;


--
-- Name: registrationcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registrationcategories (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    name character varying(1000) NOT NULL,
    code character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL
);


ALTER TABLE public.registrationcategories OWNER TO postgres;

--
-- Name: registrationcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registrationcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registrationcategories_id_seq OWNER TO postgres;

--
-- Name: registrationcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registrationcategories_id_seq OWNED BY public.registrationcategories.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    name character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    first_name character varying(1000) NOT NULL,
    middle_name character varying(1000) NOT NULL,
    last_name character varying(1000) NOT NULL,
    phone_number character varying(1000),
    user_identification character varying(1000),
    sex character varying(1000) NOT NULL,
    username character varying(1000),
    password character varying DEFAULT 'Evlina@1990'::character varying,
    email character varying(1000) NOT NULL,
    salutation character varying(1000) NOT NULL,
    organization character varying(1000) NOT NULL,
    "countryId" integer,
    "registationcategoryId" integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_menus_menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_menus_menus (
    "usersId" integer NOT NULL,
    "menusId" integer NOT NULL
);


ALTER TABLE public.users_menus_menus OWNER TO postgres;

--
-- Name: users_roles_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_roles_roles (
    "usersId" integer NOT NULL,
    "rolesId" integer NOT NULL
);


ALTER TABLE public.users_roles_roles OWNER TO postgres;

--
-- Name: abstracts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abstracts ALTER COLUMN id SET DEFAULT nextval('public.abstracts_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: jisajilis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jisajilis ALTER COLUMN id SET DEFAULT nextval('public.jisajilis_id_seq'::regclass);


--
-- Name: menus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);


--
-- Name: registrationcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrationcategories ALTER COLUMN id SET DEFAULT nextval('public.registrationcategories_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: abstracts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.abstracts (id, "createdAt", "updatedAt", "createdBy", email, title, author, affiliation, presenting_author, background, objective, methodology, results, "subTheme", conclusion, recommendations, inline) FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, type, "parentId") FROM stdin;
\.


--
-- Data for Name: category_closure; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_closure (id_ancestor, id_descendant) FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, "createdAt", "updatedAt", "createdBy", name, code) FROM stdin;
1	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Afghanistan	AF
2	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	land Islands	AX
3	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Albania	AL
4	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Algeria	DZ
5	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	American Samoa	AS
6	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	AndorrA	AD
7	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Angola	AO
8	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Anguilla	AI
9	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Antarctica	AQ
10	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Antigua and Barbuda	AG
11	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Argentina	AR
12	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Armenia	AM
13	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Aruba	AW
14	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Australia	AU
15	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Austria	AT
16	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Azerbaijan	AZ
17	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bahamas	BS
18	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bahrain	BH
19	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bangladesh	BD
20	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Barbados	BB
21	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Belarus	BY
22	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Belgium	BE
23	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Belize	BZ
24	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Benin	BJ
25	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bermuda	BM
26	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bhutan	BT
27	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bolivia	BO
28	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bosnia and Herzegovina	BA
29	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Botswana	BW
30	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bouvet Island	BV
31	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Brazil	BR
32	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	British Indian Ocean Territory	IO
33	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Brunei Darussalam	BN
34	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Bulgaria	BG
35	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Burkina Faso	BF
36	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Burundi	BI
37	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cambodia	KH
38	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cameroon	CM
39	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Canada	CA
40	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cape Verde	CV
41	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cayman Islands	KY
42	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Central African Republic	CF
43	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Chad	TD
44	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Chile	CL
45	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	China	CN
46	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Christmas Island	CX
47	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cocos (Keeling) Islands	CC
48	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Colombia	CO
49	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Comoros	KM
50	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Congo	CG
51	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Congo, The Democratic Republic of the	CD
52	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cook Islands	CK
53	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Costa Rica	CR
54	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cote D'Ivoire	CI
55	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Croatia	HR
56	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cuba	CU
57	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Cyprus	CY
58	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Czech Republic	CZ
59	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Denmark	DK
60	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Djibouti	DJ
61	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Dominica	DM
62	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Dominican Republic	DO
63	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Ecuador	EC
64	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Egypt	EG
65	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	El Salvador	SV
66	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Equatorial Guinea	GQ
67	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Eritrea	ER
68	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Estonia	EE
69	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Ethiopia	ET
70	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Falkland Islands (Malvinas)	FK
71	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Faroe Islands	FO
72	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Fiji	FJ
73	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Finland	FI
74	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	France	FR
75	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	French Guiana	GF
76	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	French Polynesia	PF
77	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	French Southern Territories	TF
78	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Gabon	GA
79	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Gambia	GM
80	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Georgia	GE
81	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Germany	DE
82	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Ghana	GH
83	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Gibraltar	GI
84	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Greece	GR
85	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Greenland	GL
86	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Grenada	GD
87	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guadeloupe	GP
88	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guam	GU
89	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guatemala	GT
90	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guernsey	GG
91	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guinea	GN
92	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guinea-Bissau	GW
93	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Guyana	GY
94	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Haiti	HT
95	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Heard Island and Mcdonald Islands	HM
96	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Holy See (Vatican City State)	VA
97	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Honduras	HN
98	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Hong Kong	HK
99	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Hungary	HU
100	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Iceland	IS
101	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	India	IN
102	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Indonesia	ID
103	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Iran, Islamic Republic Of	IR
104	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Iraq	IQ
105	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Ireland	IE
106	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Isle of Man	IM
107	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Israel	IL
108	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Italy	IT
109	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Jamaica	JM
110	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Japan	JP
111	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Jersey	JE
112	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Jordan	JO
113	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Kazakhstan	KZ
114	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Kenya	KE
115	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Kiribati	KI
116	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Korea, Democratic People'S Republic of	KP
117	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Korea, Republic of	KR
118	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Kuwait	KW
119	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Kyrgyzstan	KG
120	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Lao People'S Democratic Republic	LA
121	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Latvia	LV
122	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Lebanon	LB
123	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Lesotho	LS
124	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Liberia	LR
125	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Libyan Arab Jamahiriya	LY
126	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Liechtenstein	LI
127	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Lithuania	LT
128	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Luxembourg	LU
129	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Macao	MO
130	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Macedonia, The Former Yugoslav Republic of	MK
131	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Madagascar	MG
132	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Malawi	MW
133	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Malaysia	MY
134	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Maldives	MV
135	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mali	ML
136	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Malta	MT
137	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Marshall Islands	MH
138	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Martinique	MQ
139	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mauritania	MR
140	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mauritius	MU
141	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mayotte	YT
142	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mexico	MX
143	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Micronesia, Federated States of	FM
144	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Moldova, Republic of	MD
145	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Monaco	MC
146	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mongolia	MN
147	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Montenegro	ME
148	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Montserrat	MS
149	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Morocco	MA
150	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Mozambique	MZ
151	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Myanmar	MM
152	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Namibia	NA
153	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Nauru	NR
154	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Nepal	NP
155	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Netherlands	NL
156	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Netherlands Antilles	AN
157	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	New Caledonia	NC
158	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	New Zealand	NZ
159	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Nicaragua	NI
160	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Niger	NE
161	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Nigeria	NG
162	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Niue	NU
163	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Norfolk Island	NF
164	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Northern Mariana Islands	MP
165	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Norway	NO
166	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Oman	OM
167	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Pakistan	PK
168	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Palau	PW
169	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Palestinian Territory, Occupied	PS
170	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Panama	PA
171	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Papua New Guinea	PG
172	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Paraguay	PY
173	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Peru	PE
174	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Philippines	PH
175	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Pitcairn	PN
176	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Poland	PL
177	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Portugal	PT
178	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Puerto Rico	PR
179	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Qatar	QA
180	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Reunion	RE
181	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Romania	RO
182	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Russian Federation	RU
183	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	RWANDA	RW
184	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Saint Helena	SH
185	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Saint Kitts and Nevis	KN
186	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Saint Lucia	LC
187	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Saint Pierre and Miquelon	PM
188	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Saint Vincent and the Grenadines	VC
189	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Samoa	WS
190	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	San Marino	SM
191	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Sao Tome and Principe	ST
192	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Saudi Arabia	SA
193	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Senegal	SN
194	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Serbia	RS
195	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Seychelles	SC
196	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Sierra Leone	SL
197	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Singapore	SG
198	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Slovakia	SK
199	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Slovenia	SI
200	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Solomon Islands	SB
201	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Somalia	SO
202	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	South Africa	ZA
203	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	South Georgia and the South Sandwich Islands	GS
204	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Spain	ES
205	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Sri Lanka	LK
206	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Sudan	SD
207	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Suriname	SR
208	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Svalbard and Jan Mayen	SJ
209	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Swaziland	SZ
210	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Sweden	SE
211	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Switzerland	CH
212	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Syrian Arab Republic	SY
213	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Taiwan, Province of China	TW
214	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Tajikistan	TJ
215	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Tanzania, United Republic of	TZ
216	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Thailand	TH
217	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Timor-Leste	TL
218	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Togo	TG
219	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Tokelau	TK
220	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Tonga	TO
221	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Trinidad and Tobago	TT
222	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Tunisia	TN
223	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Turkey	TR
224	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Turkmenistan	TM
225	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Turks and Caicos Islands	TC
226	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Tuvalu	TV
227	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Uganda	UG
228	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Ukraine	UA
229	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	United Arab Emirates	AE
230	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	United Kingdom	GB
231	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	United States	US
232	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	United States Minor Outlying Islands	UM
233	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Uruguay	UY
234	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Uzbekistan	UZ
235	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Vanuatu	VU
236	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Venezuela	VE
237	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Viet Nam	VN
238	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Virgin Islands, British	VG
239	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Virgin Islands, U.S.	VI
240	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Wallis and Futuna	WF
241	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Western Sahara	EH
242	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Yemen	YE
243	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Zambia	ZM
244	2024-01-28 13:59:19.121552	2024-01-28 13:59:19.121552	\N	Zimbabwe	ZW
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (id, "createdAt", "updatedAt", "createdBy", original_name, current_name, extension, size) FROM stdin;
1	2024-01-28 15:14:21.258631	2024-01-28 15:14:21.258631	\N	CamScanner 01-05-2024 09.28(1).pdf	686ffe81-8174-4cfc-a814-aafedebaedaf.pdf	pdf	388434
2	2024-01-29 00:10:16.644589	2024-01-29 00:10:16.644589	\N	CamScanner 01-05-2024 09.28(1).pdf	cdef5bbc-2d41-4d37-9303-3854c72f31f6.pdf	pdf	388434
\.


--
-- Data for Name: jisajilis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jisajilis (id, "createdAt", "updatedAt", "createdBy", status, path_file, "userId") FROM stdin;
\.


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menus (id, "createdAt", "updatedAt", "createdBy", description, name, state, url, icon, code, uid) FROM stdin;
\.


--
-- Data for Name: registrationcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registrationcategories (id, "createdAt", "updatedAt", "createdBy", name, code, description) FROM stdin;
2	2024-01-28 14:15:02.485063	2024-01-28 14:15:02.485063	\N	Student	ST	Student
3	2024-01-28 14:15:02.485063	2024-01-28 14:15:02.485063	\N	Health Expert	HEXP	Health Expert
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, "createdAt", "updatedAt", "createdBy", name, description) FROM stdin;
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "createdAt", "updatedAt", "createdBy", first_name, middle_name, last_name, phone_number, user_identification, sex, username, password, email, salutation, organization, "countryId", "registationcategoryId") FROM stdin;
26	2024-01-28 14:59:38.78145	2024-01-28 14:59:38.78145	\N	Admin	Admin	HQ	0766148716	CFN8824	Male	mnokote	superUser.	admin@gmail.com	Mr	PORALG	215	3
\.


--
-- Data for Name: users_menus_menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_menus_menus ("usersId", "menusId") FROM stdin;
\.


--
-- Data for Name: users_roles_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles_roles ("usersId", "rolesId") FROM stdin;
\.


--
-- Name: abstracts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.abstracts_id_seq', 3, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 244, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 2, true);


--
-- Name: jisajilis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jisajilis_id_seq', 2, true);


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menus_id_seq', 1, false);


--
-- Name: registrationcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registrationcategories_id_seq', 3, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 26, true);


--
-- Name: registrationcategories PK_3bb024e0b103c109c8a3448e773; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrationcategories
    ADD CONSTRAINT "PK_3bb024e0b103c109c8a3448e773" PRIMARY KEY (id);


--
-- Name: menus PK_3fec3d93327f4538e0cbd4349c4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY (id);


--
-- Name: files PK_6c16b9093a142e0e7613b04a3d9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY (id);


--
-- Name: users_roles_roles PK_6c1a055682c229f5a865f2080c1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles_roles
    ADD CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId");


--
-- Name: category_closure PK_8da8666fc72217687e9b4f4c7e9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_closure
    ADD CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY (id_ancestor, id_descendant);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: countries PK_b2d7006793e8697ab3ae2deff18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: jisajilis PK_c9c7fefc07580f822d75dc67241; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jisajilis
    ADD CONSTRAINT "PK_c9c7fefc07580f822d75dc67241" PRIMARY KEY (id);


--
-- Name: users_menus_menus PK_e7d73a1a95b3c44d31cd93e04b7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_menus_menus
    ADD CONSTRAINT "PK_e7d73a1a95b3c44d31cd93e04b7" PRIMARY KEY ("usersId", "menusId");


--
-- Name: abstracts PK_f78ff02f3549b2a3ec00348675b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abstracts
    ADD CONSTRAINT "PK_f78ff02f3549b2a3ec00348675b" PRIMARY KEY (id);


--
-- Name: abstracts UQ_0437d838fc4d9fc5a755631c405; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abstracts
    ADD CONSTRAINT "UQ_0437d838fc4d9fc5a755631c405" UNIQUE (email);


--
-- Name: users UQ_17d1817f241f10a3dbafb169fd2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE (phone_number);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: users UQ_9ba5ad47c9b7d6dbbd251a373d2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_9ba5ad47c9b7d6dbbd251a373d2" UNIQUE ("registationcategoryId");


--
-- Name: users UQ_cc0dc7234854a65964f1a268275; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_cc0dc7234854a65964f1a268275" UNIQUE ("countryId");


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: IDX_4aa1348fc4b7da9bef0fae8ff4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4" ON public.category_closure USING btree (id_ancestor);


--
-- Name: IDX_673ff63f1585fd65c31984912e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_673ff63f1585fd65c31984912e" ON public.users_menus_menus USING btree ("menusId");


--
-- Name: IDX_6a22002acac4976977b1efd114; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_6a22002acac4976977b1efd114" ON public.category_closure USING btree (id_descendant);


--
-- Name: IDX_9c20d9636927fc68327c6b387a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_9c20d9636927fc68327c6b387a" ON public.users_menus_menus USING btree ("usersId");


--
-- Name: IDX_b2f0366aa9349789527e0c36d9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON public.users_roles_roles USING btree ("rolesId");


--
-- Name: IDX_df951a64f09865171d2d7a502b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON public.users_roles_roles USING btree ("usersId");


--
-- Name: category_closure FK_4aa1348fc4b7da9bef0fae8ff48; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_closure
    ADD CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48" FOREIGN KEY (id_ancestor) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- Name: users_menus_menus FK_673ff63f1585fd65c31984912e4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_menus_menus
    ADD CONSTRAINT "FK_673ff63f1585fd65c31984912e4" FOREIGN KEY ("menusId") REFERENCES public.menus(id);


--
-- Name: category_closure FK_6a22002acac4976977b1efd114a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_closure
    ADD CONSTRAINT "FK_6a22002acac4976977b1efd114a" FOREIGN KEY (id_descendant) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- Name: users FK_9ba5ad47c9b7d6dbbd251a373d2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_9ba5ad47c9b7d6dbbd251a373d2" FOREIGN KEY ("registationcategoryId") REFERENCES public.registrationcategories(id) ON DELETE CASCADE;


--
-- Name: users_menus_menus FK_9c20d9636927fc68327c6b387a7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_menus_menus
    ADD CONSTRAINT "FK_9c20d9636927fc68327c6b387a7" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_roles_roles FK_b2f0366aa9349789527e0c36d97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles_roles
    ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES public.roles(id);


--
-- Name: users FK_cc0dc7234854a65964f1a268275; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_cc0dc7234854a65964f1a268275" FOREIGN KEY ("countryId") REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: category FK_d5456fd7e4c4866fec8ada1fa10; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES public.category(id);


--
-- Name: jisajilis FK_d8e311fbddd437bef657140e3ef; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jisajilis
    ADD CONSTRAINT "FK_d8e311fbddd437bef657140e3ef" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: users_roles_roles FK_df951a64f09865171d2d7a502b1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles_roles
    ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

