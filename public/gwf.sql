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
-- Name: attachment_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attachment_types (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer
);


ALTER TABLE public.attachment_types OWNER TO postgres;

--
-- Name: attachment_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attachment_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attachment_types_id_seq OWNER TO postgres;

--
-- Name: attachment_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attachment_types_id_seq OWNED BY public.attachment_types.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    name character varying(1000) NOT NULL,
    author character varying(1000) NOT NULL,
    "releaseYear" integer NOT NULL,
    sbn character varying NOT NULL,
    description character varying(1000) NOT NULL,
    "readerId" integer,
    "createdBy" integer
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying DEFAULT 'primary'::character varying NOT NULL,
    "parentId" integer,
    "levelId" integer
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
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    email character varying(1000) NOT NULL,
    phone character varying NOT NULL,
    "readerId" integer NOT NULL
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contacts_id_seq OWNER TO postgres;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


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
    size integer NOT NULL,
    extension character varying(1000) NOT NULL
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
-- Name: levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.levels (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    name character varying NOT NULL,
    description character varying,
    code character varying,
    "createdBy" integer
);


ALTER TABLE public.levels OWNER TO postgres;

--
-- Name: levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.levels_id_seq OWNER TO postgres;

--
-- Name: levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.levels_id_seq OWNED BY public.levels.id;


--
-- Name: meetings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetings (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    email character varying(1000) NOT NULL,
    "zoomUrl" character varying NOT NULL,
    "createdBy" integer
);


ALTER TABLE public.meetings OWNER TO postgres;

--
-- Name: meetings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meetings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.meetings_id_seq OWNER TO postgres;

--
-- Name: meetings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meetings_id_seq OWNED BY public.meetings.id;


--
-- Name: menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menus (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    description character varying(1000) NOT NULL,
    uid character varying(1000) NOT NULL,
    name character varying(1000),
    state character varying(1000),
    url character varying(1000),
    icon character varying(1000),
    code character varying(1000)
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
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: queries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.queries (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    description character varying(1000),
    "createdBy" integer,
    uid character varying(1000),
    "queryCategoryId" integer,
    "queryStatusId" integer,
    "userId" integer,
    feedbackdescription character varying(1000),
    "closedAt" timestamp without time zone,
    tracknumber character varying,
    "queryofUserId" integer,
    usersource character varying,
    "queryPriorityId" integer
);


ALTER TABLE public.queries OWNER TO postgres;

--
-- Name: queries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.queries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.queries_id_seq OWNER TO postgres;

--
-- Name: queries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.queries_id_seq OWNED BY public.queries.id;


--
-- Name: queries_statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.queries_statuses (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    description character varying(1000) NOT NULL,
    name character varying(1000) NOT NULL,
    code character varying(1000)
);


ALTER TABLE public.queries_statuses OWNER TO postgres;

--
-- Name: queries_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.queries_statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.queries_statuses_id_seq OWNER TO postgres;

--
-- Name: queries_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.queries_statuses_id_seq OWNED BY public.queries_statuses.id;


--
-- Name: query_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.query_categories (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    description character varying(1000) NOT NULL,
    name character varying(1000) NOT NULL
);


ALTER TABLE public.query_categories OWNER TO postgres;

--
-- Name: query_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.query_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.query_categories_id_seq OWNER TO postgres;

--
-- Name: query_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.query_categories_id_seq OWNED BY public.query_categories.id;


--
-- Name: query_claim_attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.query_claim_attachments (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    "queryDocumentTypeId" integer,
    "queryId" integer,
    file_name character varying NOT NULL,
    file_path character varying NOT NULL
);


ALTER TABLE public.query_claim_attachments OWNER TO postgres;

--
-- Name: query_claim_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.query_claim_attachments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.query_claim_attachments_id_seq OWNER TO postgres;

--
-- Name: query_claim_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.query_claim_attachments_id_seq OWNED BY public.query_claim_attachments.id;


--
-- Name: query_document_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.query_document_types (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    "queryCategoryId" integer,
    name character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL,
    is_claim boolean NOT NULL
);


ALTER TABLE public.query_document_types OWNER TO postgres;

--
-- Name: query_document_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.query_document_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.query_document_types_id_seq OWNER TO postgres;

--
-- Name: query_document_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.query_document_types_id_seq OWNED BY public.query_document_types.id;


--
-- Name: query_feedback_attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.query_feedback_attachments (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    "queryId" integer,
    "queryDocumentTypeId" integer,
    file_path character varying NOT NULL,
    file_name character varying NOT NULL
);


ALTER TABLE public.query_feedback_attachments OWNER TO postgres;

--
-- Name: query_feedback_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.query_feedback_attachments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.query_feedback_attachments_id_seq OWNER TO postgres;

--
-- Name: query_feedback_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.query_feedback_attachments_id_seq OWNED BY public.query_feedback_attachments.id;


--
-- Name: query_priority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.query_priority (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "createdBy" integer,
    name character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL
);


ALTER TABLE public.query_priority OWNER TO postgres;

--
-- Name: query_priority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.query_priority_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.query_priority_id_seq OWNER TO postgres;

--
-- Name: query_priority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.query_priority_id_seq OWNED BY public.query_priority.id;


--
-- Name: readers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.readers (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    name character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL,
    "managerId" integer,
    "createdBy" integer
);


ALTER TABLE public.readers OWNER TO postgres;

--
-- Name: readers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.readers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.readers_id_seq OWNER TO postgres;

--
-- Name: readers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.readers_id_seq OWNED BY public.readers.id;


--
-- Name: readers_meetings_meetings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.readers_meetings_meetings (
    "readersId" integer NOT NULL,
    "meetingsId" integer NOT NULL
);


ALTER TABLE public.readers_meetings_meetings OWNER TO postgres;

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
    first_name character varying(1000) NOT NULL,
    middle_name character varying(1000) NOT NULL,
    last_name character varying(1000) NOT NULL,
    sex character varying(1000) NOT NULL,
    username character varying(1000),
    password character varying DEFAULT 'Evlina@1990'::character varying,
    email character varying(1000) NOT NULL,
    "createdBy" integer,
    phone_number character varying(1000),
    nin_number character varying(1000),
    user_identification character varying(1000),
    active boolean DEFAULT false NOT NULL
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
-- Name: attachment_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachment_types ALTER COLUMN id SET DEFAULT nextval('public.attachment_types_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.levels ALTER COLUMN id SET DEFAULT nextval('public.levels_id_seq'::regclass);


--
-- Name: meetings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings ALTER COLUMN id SET DEFAULT nextval('public.meetings_id_seq'::regclass);


--
-- Name: menus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: queries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries ALTER COLUMN id SET DEFAULT nextval('public.queries_id_seq'::regclass);


--
-- Name: queries_statuses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries_statuses ALTER COLUMN id SET DEFAULT nextval('public.queries_statuses_id_seq'::regclass);


--
-- Name: query_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_categories ALTER COLUMN id SET DEFAULT nextval('public.query_categories_id_seq'::regclass);


--
-- Name: query_claim_attachments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_claim_attachments ALTER COLUMN id SET DEFAULT nextval('public.query_claim_attachments_id_seq'::regclass);


--
-- Name: query_document_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_document_types ALTER COLUMN id SET DEFAULT nextval('public.query_document_types_id_seq'::regclass);


--
-- Name: query_feedback_attachments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_feedback_attachments ALTER COLUMN id SET DEFAULT nextval('public.query_feedback_attachments_id_seq'::regclass);


--
-- Name: query_priority id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_priority ALTER COLUMN id SET DEFAULT nextval('public.query_priority_id_seq'::regclass);


--
-- Name: readers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readers ALTER COLUMN id SET DEFAULT nextval('public.readers_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: attachment_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attachment_types (id, "createdAt", "updatedAt", "createdBy") FROM stdin;
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, "createdAt", "updatedAt", name, author, "releaseYear", sbn, description, "readerId", "createdBy") FROM stdin;
3	2023-06-07 17:40:51.754423	2023-06-07 17:40:51.754423	xx	xxx	200	2000	Desc	3	\N
4	2023-06-12 09:33:27.856799	2023-06-12 09:33:27.856799	xx	xxx	200	2000	Desc	3	\N
5	2023-06-13 15:37:08.623567	2023-06-13 15:37:08.623567	xx	xxx	200	2000	Desc	3	\N
6	2023-06-14 09:32:45.69798	2023-06-14 09:32:45.69798	xx	xxx	200	2000	Desc	3	\N
7	2023-06-14 09:34:19.610442	2023-06-14 09:34:19.610442	xx	xxx	200	2000	Desc	3	\N
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, type, "parentId", "levelId") FROM stdin;
\.


--
-- Data for Name: category_closure; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_closure (id_ancestor, id_descendant) FROM stdin;
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts (id, "createdAt", "updatedAt", email, phone, "readerId") FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (id, "createdAt", "updatedAt", "createdBy", original_name, current_name, size, extension) FROM stdin;
1	2023-09-17 15:46:16.792001	2023-09-17 15:46:16.792001	\N	X.jpg	9ca3428b-2459-4d93-9f3b-1422aa440efe.jpeg	92243	jpeg
2	2023-09-17 16:59:24.463098	2023-09-17 16:59:24.463098	\N	X.jpg	27afcb06-87a0-45c6-97b4-e9e8973b59d5.jpeg	92243	jpeg
3	2023-09-17 17:01:23.510371	2023-09-17 17:01:23.510371	\N	V.jpeg	6d452eb2-53ce-488e-b4f1-acbdb4430116.jpeg	15438	jpeg
4	2023-09-17 17:06:40.523748	2023-09-17 17:06:40.523748	\N	X.jpg	71b5b063-b565-4b83-b70b-8b08f54ec89e.jpeg	92243	jpeg
5	2023-09-17 17:08:38.167124	2023-09-17 17:08:38.167124	\N	V.jpeg	231a1cd5-64a1-421e-a8ad-d5887752c523.jpeg	15438	jpeg
6	2023-09-17 17:09:26.348518	2023-09-17 17:09:26.348518	\N	X.jpg	d9246bdd-0320-45c6-819b-609426cab35a.jpeg	92243	jpeg
7	2023-09-17 17:11:37.322406	2023-09-17 17:11:37.322406	\N	V.jpeg	2c5ccd64-64e9-4abe-a45f-b2ec6583086e.jpeg	15438	jpeg
8	2023-09-17 17:12:52.339177	2023-09-17 17:12:52.339177	\N	Attendance sheet.pdf	47a0a837-969e-4c43-8182-4f7a7a7c74a7.pdf	157166	pdf
9	2023-09-17 17:13:53.086494	2023-09-17 17:13:53.086494	\N	V.jpg	7fa6b085-e3fe-4cef-8fe6-7379ff431ca2.jpeg	274394	jpeg
10	2023-09-17 17:19:41.361208	2023-09-17 17:19:41.361208	\N	X.jpg	16a23724-0d7a-4bd1-ae87-f1d1e3113cab.jpeg	92243	jpeg
11	2023-09-17 17:21:33.431168	2023-09-17 17:21:33.431168	\N	X.jpg	328806cf-762f-4ede-a435-74cb845b1f97.jpeg	92243	jpeg
12	2023-09-17 17:22:44.945427	2023-09-17 17:22:44.945427	\N	V.jpg	ac2076a2-e10a-49c2-986b-40c8a3159e48.jpeg	274394	jpeg
13	2023-09-17 17:26:06.420459	2023-09-17 17:26:06.420459	\N	X.jpg	1d22b91c-9a4c-4915-aa22-fd23bfc8e1b7.jpeg	92243	jpeg
14	2023-09-17 17:27:19.962866	2023-09-17 17:27:19.962866	\N	V.jpg	8b613810-d39e-41fa-a652-84ec664a477f.jpeg	274394	jpeg
15	2023-09-17 17:28:48.152975	2023-09-17 17:28:48.152975	\N	V.jpg	a1e0262d-6225-4267-ba1c-4797d06757c6.jpeg	274394	jpeg
16	2023-09-17 17:29:39.340931	2023-09-17 17:29:39.340931	\N	X.jpg	c1adbaac-6f3f-436f-a150-2f3bef7cbd30.jpeg	92243	jpeg
17	2023-09-17 17:32:00.685908	2023-09-17 17:32:00.685908	\N	X.jpg	c551526c-4df1-491d-9c0f-2e523e266f8d.jpeg	92243	jpeg
18	2023-09-17 17:32:56.177913	2023-09-17 17:32:56.177913	\N	X.jpg	633c7a73-349b-494c-9913-8d69680cbf15.jpeg	92243	jpeg
19	2023-09-17 17:33:56.275204	2023-09-17 17:33:56.275204	\N	X.jpg	1430a384-0f6b-4353-9aef-a3b66e6e3a9a.jpeg	92243	jpeg
20	2023-09-17 17:34:51.28414	2023-09-17 17:34:51.28414	\N	V.jpg	9a74b0bc-81e7-4890-9ca7-123de163ef2e.jpeg	274394	jpeg
21	2023-09-17 17:35:45.023324	2023-09-17 17:35:45.023324	\N	X.jpg	319d2bdb-9fd9-4abf-aaae-8cad6ca21d26.jpeg	92243	jpeg
22	2023-09-17 17:43:34.030526	2023-09-17 17:43:34.030526	\N	X.jpg	e6084d95-e3da-41c4-b81b-1bc53748433a.jpeg	92243	jpeg
23	2023-09-17 17:43:42.029373	2023-09-17 17:43:42.029373	\N	V.jpeg	c23c6abc-1efc-47dd-8a4f-83938e3feb92.jpeg	15438	jpeg
24	2023-09-17 17:43:58.155241	2023-09-17 17:43:58.155241	\N	X.jpg	6926b6ba-99ed-4374-addd-da2bfde61e25.jpeg	92243	jpeg
25	2023-09-17 17:50:59.683894	2023-09-17 17:50:59.683894	\N	X.jpg	fef57cec-40a7-42c7-a428-ebfa203c8a60.jpeg	92243	jpeg
26	2023-09-17 17:52:41.363923	2023-09-17 17:52:41.363923	\N	V.jpeg	4522cc37-638a-4e45-8f6d-b07f6c6f461c.jpeg	15438	jpeg
27	2023-09-17 17:53:11.683697	2023-09-17 17:53:11.683697	\N	X.jpg	4c67eb3b-72eb-4a8b-8505-70f88132d809.jpeg	92243	jpeg
28	2023-09-17 17:53:56.139881	2023-09-17 17:53:56.139881	\N	X.jpg	95ab4428-d84e-4f40-917c-1c39c6761222.jpeg	92243	jpeg
29	2023-09-17 17:54:37.482613	2023-09-17 17:54:37.482613	\N	V.jpg	c68b2f13-0c2c-4faa-b106-0f4b81c34b9a.jpeg	274394	jpeg
30	2023-09-17 17:54:55.921165	2023-09-17 17:54:55.921165	\N	X.jpg	dd36e420-4a24-42a6-be41-4347c1c57405.jpeg	92243	jpeg
31	2023-09-17 17:59:06.18671	2023-09-17 17:59:06.18671	\N	V.jpeg	20fc483a-2b9c-45d0-a16f-3bc92a9a9dcf.jpeg	15438	jpeg
32	2023-09-17 18:03:34.607806	2023-09-17 18:03:34.607806	\N	X.jpg	a239fdbb-4ce4-4657-9b7c-dcef5f27aa8f.jpeg	92243	jpeg
33	2023-09-17 18:15:49.83878	2023-09-17 18:15:49.83878	\N	X.jpg	c5c7012a-13a4-4237-9943-8cfd6f7abf74.jpeg	92243	jpeg
34	2023-09-17 18:20:28.203196	2023-09-17 18:20:28.203196	\N	X.jpg	c2aa2fc5-bf4f-4fb6-9a04-c4f43ec9dfc0.jpeg	92243	jpeg
35	2023-09-17 19:37:03.893316	2023-09-17 19:37:03.893316	\N	V.jpeg	59ed71b3-1327-47ff-a0af-89f5c19f90a9.jpeg	15438	jpeg
36	2023-09-17 19:52:09.700404	2023-09-17 19:52:09.700404	\N	Screenshot from 2023-09-17 18-35-25.png	11029365-e47b-4e4f-a75d-374eda373e50.png	168308	png
37	2023-09-17 21:41:32.036098	2023-09-17 21:41:32.036098	\N	Screenshot from 2023-09-17 18-34-14.png	47dce7fd-bb06-4fd6-bfc8-45a275a40898.png	184369	png
38	2023-09-17 22:54:30.618767	2023-09-17 22:54:30.618767	\N	Screenshot from 2023-09-17 18-36-43.png	98d71f1d-3d07-4b44-9fd6-c2c2b3ba3234.png	168269	png
39	2023-09-17 23:00:48.872046	2023-09-17 23:00:48.872046	\N	Attendance sheet.pdf	25e7cf5a-09fa-4993-b694-21d9e655f71c.pdf	157166	pdf
40	2023-09-17 23:08:19.330197	2023-09-17 23:08:19.330197	\N	Screenshot from 2023-09-17 18-03-08.png	d897d1fd-f791-45bb-8281-c19ef704ba10.png	256184	png
41	2023-09-17 23:20:30.925533	2023-09-17 23:20:30.925533	\N	Screenshot from 2023-09-17 18-36-43.png	2fe637b5-d1eb-40d0-8526-85fb2bf101dd.png	168269	png
42	2023-09-17 23:20:37.327586	2023-09-17 23:20:37.327586	\N	Screenshot from 2023-09-17 18-32-50.png	cbacca4e-48aa-4dea-ae15-159570fafa02.png	137710	png
43	2023-09-17 23:46:24.149164	2023-09-17 23:46:24.149164	\N	Screenshot from 2023-09-17 18-23-15.png	38df0e41-9c82-4f78-9c00-7292fb5d4d4d.png	60054	png
44	2023-09-17 23:47:31.277322	2023-09-17 23:47:31.277322	\N	Screenshot from 2023-09-17 18-32-50.png	308be892-d646-417c-bf35-6f95bdc10c64.png	137710	png
45	2023-09-17 23:47:38.767123	2023-09-17 23:47:38.767123	\N	Screenshot from 2023-09-17 18-22-38.png	b535b2c2-abaa-4700-b3fb-2d5c0702c6ec.png	692772	png
46	2023-09-18 11:19:34.489887	2023-09-18 11:19:34.489887	\N	Screenshot from 2023-09-17 18-34-04.png	d86dde8c-d1d2-48b0-a2e8-59a64bb6697e.png	164451	png
47	2023-09-18 11:19:37.920505	2023-09-18 11:19:37.920505	\N	Screenshot from 2023-09-17 18-22-38.png	4516f316-cca1-4d85-b59f-048fec82d0bb.png	692772	png
48	2023-09-18 11:19:46.139275	2023-09-18 11:19:46.139275	\N	Screenshot from 2023-09-17 18-22-38.png	62c0a313-0b8b-48af-9320-e3e4e31beea2.png	692772	png
49	2023-09-18 11:32:00.788788	2023-09-18 11:32:00.788788	\N	Screenshot from 2023-09-17 18-23-15.png	56b37590-c938-40dc-9dc2-198ff0100d79.png	60054	png
50	2023-09-18 11:34:38.914753	2023-09-18 11:34:38.914753	\N	Screenshot from 2023-09-17 18-34-04.png	8b6a0359-e93c-4004-8562-b717233f7051.png	164451	png
51	2023-09-18 11:36:47.856914	2023-09-18 11:36:47.856914	\N	Screenshot from 2023-09-17 18-34-04.png	1b5897c8-5639-4506-bb9b-62c90d7705d2.png	164451	png
52	2023-09-18 22:27:40.185356	2023-09-18 22:27:40.185356	\N	NEW OR - TAMISEMI SP REVIEW JUNI 2023 (2).doc	9ad2ac1a-b7fe-4fdd-a3b4-f74853d6f1f2.wps-office.doc	1028608	wps-office.doc
53	2023-09-18 22:27:44.045074	2023-09-18 22:27:44.045074	\N	Screenshot from 2023-09-17 18-34-04.png	2b0226c1-e3b7-4440-a1ef-8a5ed639edbf.png	164451	png
54	2023-09-18 22:27:47.400688	2023-09-18 22:27:47.400688	\N	Screenshot from 2023-09-17 18-22-38.png	f4e1cb80-c3e4-4105-9237-602a9c6ccf4e.png	692772	png
55	2023-09-19 19:20:35.184109	2023-09-19 19:20:35.184109	\N	Screenshot from 2023-09-18 22-27-55.png	7cc4bc5f-ab7c-43b7-901f-6146a458554b.png	167775	png
56	2023-09-19 19:20:37.629079	2023-09-19 19:20:37.629079	\N	Screenshot from 2023-09-18 22-26-44.png	5be2fa7e-ab56-4846-9e5f-8b5abf4baeb3.png	206217	png
57	2023-09-19 19:20:40.321258	2023-09-19 19:20:40.321258	\N	Screenshot from 2023-09-17 18-34-04.png	c6ac1664-2050-47f4-887d-87c1423bbc93.png	164451	png
58	2023-09-19 21:30:00.580012	2023-09-19 21:30:00.580012	\N	NEW OR - TAMISEMI SP REVIEW JUNI 2023 (2).doc	64c5763e-3e31-4c61-b00c-6adb097c5f14.wps-office.doc	1028608	wps-office.doc
59	2023-09-20 15:02:28.623549	2023-09-20 15:02:28.623549	\N	Screenshot from 2023-09-18 22-27-55.png	6966eb85-6d78-423e-9503-cc21dbfefcb9.png	167775	png
60	2023-09-20 15:07:15.163396	2023-09-20 15:07:15.163396	\N	V.jpeg	0836c34b-17ee-4731-a96f-a3015f938e70.jpeg	15438	jpeg
61	2023-09-20 21:15:06.894438	2023-09-20 21:15:06.894438	\N	Attendance sheet.pdf	194f3fe5-29ec-4c83-8777-3801efa03087.pdf	157166	pdf
62	2023-09-20 21:17:37.49549	2023-09-20 21:17:37.49549	\N	Screenshot from 2023-09-20 00-26-43.png	268ac5da-b7ea-4bb6-a05c-646d8f8a7522.png	203975	png
118	2024-01-23 09:15:36.464253	2024-01-23 09:15:36.464253	\N	claim.jpg	a9b39690-9825-4315-aa6d-23dda597b03e.jpeg	14842	jpeg
63	2023-09-20 21:30:25.242768	2023-09-20 21:30:25.242768	\N	Screenshot from 2023-09-18 22-27-04.png	96cc71a0-da7f-4e28-9e74-20f006a46eb8.png	203811	png
64	2023-09-20 21:34:04.194244	2023-09-20 21:34:04.194244	\N	mnokote.sublime-workspace	7fcb01a7-7382-4292-81d2-4d8bf62d38bd.octet-stream	390447	octet-stream
65	2023-09-20 21:40:24.315706	2023-09-20 21:40:24.315706	\N	Screenshot from 2023-09-20 00-27-07.png	eb613168-aceb-44b9-8d23-1dc97315c167.png	210713	png
66	2023-09-20 21:42:43.743916	2023-09-20 21:42:43.743916	\N	Screenshot from 2023-09-18 22-26-44.png	48f439bd-a752-4ea0-966b-502bc16032ea.png	206217	png
67	2023-09-20 21:51:12.843997	2023-09-20 21:51:12.843997	\N	Screenshot from 2023-09-17 18-03-08.png	de43c31e-320d-461d-8180-9d2739edcc9b.png	256184	png
68	2023-09-20 21:56:46.769911	2023-09-20 21:56:46.769911	\N	Screenshot from 2023-09-17 18-22-38.png	1d72c61d-7217-4c45-9149-e60bb08e1b45.png	692772	png
69	2023-09-20 21:58:13.243854	2023-09-20 21:58:13.243854	\N	Screenshot from 2023-09-17 18-34-04.png	76acbbff-0686-45b8-9433-bb580e3b3fc9.png	164451	png
70	2023-09-20 22:15:53.231056	2023-09-20 22:15:53.231056	\N	Screenshot from 2023-09-17 18-36-43.png	5488dffe-2c82-4ee0-837e-510ca073f0c9.png	168269	png
71	2023-09-20 22:18:32.103694	2023-09-20 22:18:32.103694	\N	Screenshot from 2023-09-18 22-27-55.png	7f0e4e93-c682-4d9b-a5b6-bc3ea7a939bf.png	167775	png
72	2023-09-20 22:20:23.519182	2023-09-20 22:20:23.519182	\N	Screenshot from 2023-09-20 00-26-43.png	34d88c39-c245-4304-bcfd-af6b7d450071.png	203975	png
73	2023-09-20 22:20:49.186092	2023-09-20 22:20:49.186092	\N	Screenshot from 2023-09-20 00-26-43.png	eb27593b-3deb-4f4f-836e-df4446a3e89e.png	203975	png
74	2023-09-20 22:32:14.992684	2023-09-20 22:32:14.992684	\N	Screenshot from 2023-09-20 00-26-43.png	f70ce00a-5f0f-45f5-9158-9f38fcfc8ea7.png	203975	png
75	2023-09-20 23:46:17.420103	2023-09-20 23:46:17.420103	\N	Screenshot from 2023-09-20 00-26-43.png	51ec6f90-7194-4ec5-a564-8277555a79a6.png	203975	png
76	2023-09-20 23:49:43.037871	2023-09-20 23:49:43.037871	\N	Screenshot from 2023-09-17 18-03-08.png	dd422c38-679e-48c1-acc1-e056cedef6ab.png	256184	png
77	2023-09-20 23:51:09.193508	2023-09-20 23:51:09.193508	\N	Screenshot from 2023-09-18 22-27-04.png	94c01828-6616-4f7d-9ee5-eb990914a025.png	203811	png
78	2023-09-20 23:54:01.106667	2023-09-20 23:54:01.106667	\N	Screenshot from 2023-09-17 18-36-43.png	5364f743-692b-417a-9b76-20dc0a10c170.png	168269	png
79	2023-09-21 00:01:00.031211	2023-09-21 00:01:00.031211	\N	mnokote.sublime-workspace	4f07be4c-ada1-4df2-a23a-0263877444f1.octet-stream	390447	octet-stream
80	2023-09-21 00:03:24.837411	2023-09-21 00:03:24.837411	\N	Screenshot from 2023-09-18 22-27-04.png	e224cdc2-7601-4a8e-a6fe-2ba088730646.png	203811	png
81	2023-09-21 00:07:35.879473	2023-09-21 00:07:35.879473	\N	Screenshot from 2023-09-18 22-27-04.png	3765ce15-b64f-451b-9eb3-b880f180e110.png	203811	png
82	2023-09-21 00:10:34.177187	2023-09-21 00:10:34.177187	\N	Screenshot from 2023-09-17 18-03-08.png	5f88c767-6c87-4a70-9b48-12fe83b4db7f.png	256184	png
83	2023-09-21 00:13:51.892426	2023-09-21 00:13:51.892426	\N	Screenshot from 2023-09-17 18-22-38.png	44438bc0-53a3-4630-aafc-80ea6413e9a1.png	692772	png
84	2023-09-21 01:20:35.566818	2023-09-21 01:20:35.566818	\N	Screenshot from 2023-09-18 22-27-04.png	53504664-c80f-48f9-a214-855567974bb8.png	203811	png
85	2023-09-21 01:20:39.092135	2023-09-21 01:20:39.092135	\N	Screenshot from 2023-09-20 00-27-07.png	d1cd3e7e-7619-4871-b051-bacd5185f19a.png	210713	png
86	2023-09-21 01:24:20.534661	2023-09-21 01:24:20.534661	\N	Screenshot from 2023-09-17 18-03-08.png	6ff0eeda-0097-4778-861b-308fd463a99a.png	256184	png
87	2023-09-21 01:24:24.241658	2023-09-21 01:24:24.241658	\N	Screenshot from 2023-09-18 22-26-44.png	41458208-f1fa-4964-8f44-03f4933f6221.png	206217	png
88	2023-09-21 11:16:23.887398	2023-09-21 11:16:23.887398	\N	Screenshot from 2023-09-17 18-34-04.png	596bdb8a-8c4e-4108-871c-adc515640110.png	164451	png
89	2023-09-21 11:34:16.437627	2023-09-21 11:34:16.437627	\N	Screenshot from 2023-09-17 18-22-38.png	f29a9750-e24e-457c-b5cf-d23f6dca7edd.png	692772	png
90	2023-09-21 12:36:15.33625	2023-09-21 12:36:15.33625	\N	Screenshot from 2023-09-17 18-03-08.png	b0752da0-1210-42b5-b644-5b6cebe91f16.png	256184	png
91	2023-09-22 16:48:24.593185	2023-09-22 16:48:24.593185	\N	Screenshot from 2023-09-21 22-39-31.png	35eba00b-c67b-4f1e-8602-a2590aae2a78.png	2183747	png
92	2023-09-22 16:48:27.281372	2023-09-22 16:48:27.281372	\N	Screenshot from 2023-09-17 18-23-15.png	3a5ee097-e591-486d-b745-f14f2ba7f69d.png	60054	png
93	2023-09-22 16:49:46.415415	2023-09-22 16:49:46.415415	\N	Screenshot from 2023-09-17 18-32-50.png	71d64c25-da78-46f2-ab27-7178392e785a.png	137710	png
94	2023-09-22 20:02:15.446548	2023-09-22 20:02:15.446548	\N	Screenshot from 2023-09-17 18-29-30.png	dbd27b37-da92-4577-b6e5-3dd1e515f582.png	144628	png
95	2023-09-22 20:04:38.550415	2023-09-22 20:04:38.550415	\N	Screenshot from 2023-09-21 22-38-52.png	752a8291-a3d3-4d8f-8f2d-5e28fe673da0.png	151558	png
96	2023-09-22 21:41:38.962044	2023-09-22 21:41:38.962044	\N	Screenshot from 2023-09-21 22-39-31.png	25a0a260-46d7-4428-89b5-3e34c88c75c2.png	2183747	png
97	2023-09-22 21:41:41.171324	2023-09-22 21:41:41.171324	\N	Screenshot from 2023-09-17 18-23-15.png	c8c1e87c-a66d-4c66-9206-7ab2de255b90.png	60054	png
98	2023-09-24 11:49:26.249813	2023-09-24 11:49:26.249813	\N	MABADILIKO YA TAREHE YA MAFUNZO YA MFUMO WA TOVUTI (GWF).pdf	d5a57b36-9e46-4965-a19b-8799b4782186.pdf	252348	pdf
99	2023-09-24 11:49:34.55684	2023-09-24 11:49:34.55684	\N	MABADILIKO YA TAREHE YA MAFUNZO YA MFUMO WA TOVUTI (GWF).pdf	8d548daf-4ac9-401d-931b-11b81f69bb2c.pdf	252348	pdf
100	2023-09-24 11:50:31.443144	2023-09-24 11:50:31.443144	\N	Screenshot from 2023-09-17 18-34-14.png	a8373b23-dcba-4b9c-9f77-fbb537789ea5.png	184369	png
101	2023-09-24 11:53:45.873349	2023-09-24 11:53:45.873349	\N	Screenshot from 2023-09-21 22-38-41.png	a51d74d1-a56b-4ccd-bccc-1759ca284681.png	2784211	png
102	2023-09-24 11:53:49.410042	2023-09-24 11:53:49.410042	\N	Screenshot from 2023-09-17 18-23-15.png	25130c48-9d8e-4e2b-b671-c734da3053e0.png	60054	png
103	2023-09-24 21:39:23.730809	2023-09-24 21:39:23.730809	\N	Screenshot from 2023-09-21 22-38-41.png	5c46b349-6844-4abb-8058-183a22ff44ed.png	2784211	png
104	2023-09-24 21:42:34.529477	2023-09-24 21:42:34.529477	\N	Screenshot from 2023-09-21 22-38-52.png	0a1b5ce2-c6fa-42c3-b516-36a74ae77fca.png	151558	png
105	2023-09-24 21:45:40.439995	2023-09-24 21:45:40.439995	\N	Screenshot from 2023-09-17 18-34-04.png	20eba54a-937d-4c43-9d4b-588f4628e16b.png	164451	png
106	2023-09-24 21:52:27.907255	2023-09-24 21:52:27.907255	\N	Screenshot from 2023-09-17 18-34-14.png	1338f631-63c8-4e61-a8b9-bdcf78ab8d0e.png	184369	png
107	2023-09-24 21:55:05.077027	2023-09-24 21:55:05.077027	\N	Screenshot from 2023-09-17 18-32-50.png	af63c083-350b-4913-b55c-e59add771a73.png	137710	png
108	2023-09-24 21:56:51.817886	2023-09-24 21:56:51.817886	\N	Screenshot from 2023-09-23 18-54-24.png	83d9aaf0-b186-4301-b67d-0a469e66bd1e.png	189344	png
109	2023-09-24 21:57:16.152874	2023-09-24 21:57:16.152874	\N	Screenshot from 2023-09-23 22-00-42.png	524c6963-e730-4b9e-b05d-7877ec54ee0a.png	180855	png
110	2023-09-24 22:00:01.344346	2023-09-24 22:00:01.344346	\N	Screenshot from 2023-09-21 22-38-41.png	93389f29-8703-412e-b41e-bd5df60169c9.png	2784211	png
111	2023-09-27 15:27:19.461573	2023-09-27 15:27:19.461573	\N	Screenshot from 2023-09-25 19-16-54.png	4c64713e-0d46-4e4d-934b-dca54755d781.png	167448	png
112	2023-09-27 15:27:24.070442	2023-09-27 15:27:24.070442	\N	Screenshot from 2023-09-25 19-03-39.png	260c4132-d461-4c00-9be3-6610f40ffe5c.png	182804	png
113	2023-09-27 15:44:10.676753	2023-09-27 15:44:10.676753	\N	Screenshot from 2023-09-21 22-38-41.png	ddfebc03-de02-48dd-8390-b8668aead8ba.png	2784211	png
114	2023-09-27 15:44:25.090606	2023-09-27 15:44:25.090606	\N	Screenshot from 2023-09-21 22-38-52.png	a5ae593d-6ffc-419d-a4f3-efb8d0a118b7.png	151558	png
115	2023-09-29 09:19:18.426349	2023-09-29 09:19:18.426349	\N	Screenshot from 2023-09-25 19-02-35.png	5ba6595b-e893-4c38-ac85-7ba8a3e9f963.png	2781392	png
116	2023-09-29 09:20:35.140568	2023-09-29 09:20:35.140568	\N	Screenshot from 2023-09-17 18-34-14.png	af864529-97a6-4ad8-866b-db8c3f978e79.png	184369	png
117	2024-01-23 09:14:48.573517	2024-01-23 09:14:48.573517	\N	claim.jpg	24c0cd5b-12b6-483b-b6a8-0000f3962a87.jpeg	2980	jpeg
119	2024-01-23 09:15:47.683105	2024-01-23 09:15:47.683105	\N	Screenshot from 2024-01-09 18-37-14.png	a70d0c3a-765a-4783-8c6e-c425cc420675.png	2724	png
120	2024-01-23 10:34:57.631206	2024-01-23 10:34:57.631206	\N	claim.jpg	15821362-c959-4e7f-920c-4b6f340833f0.jpeg	14842	jpeg
121	2024-01-23 10:40:47.262487	2024-01-23 10:40:47.262487	\N	claim.jpg	f1b42667-b694-4c00-8bc5-b4e6342abfa7.jpeg	14842	jpeg
122	2024-01-23 10:41:25.043643	2024-01-23 10:41:25.043643	\N	follow.png	c24ee5ea-634d-40c5-a831-a6fb48aa7353.png	3362	png
123	2024-01-23 10:43:09.587281	2024-01-23 10:43:09.587281	\N	follow.png	c9ecd5c2-c781-4caa-ac34-e93686d7917c.png	3362	png
124	2024-01-23 10:44:13.677129	2024-01-23 10:44:13.677129	\N	follow.png	8d81156a-3443-43f7-8264-bd0d33d060ff.png	3362	png
125	2024-01-23 10:45:57.065997	2024-01-23 10:45:57.065997	\N	follow.png	ca8a49b8-8843-490d-9789-10da36b166b2.png	3362	png
126	2024-01-23 10:46:53.74657	2024-01-23 10:46:53.74657	\N	follow.png	5710436f-a340-4d1a-a280-098747806abd.png	3362	png
\.


--
-- Data for Name: levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.levels (id, "createdAt", "updatedAt", name, description, code, "createdBy") FROM stdin;
\.


--
-- Data for Name: meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meetings (id, "createdAt", "updatedAt", email, "zoomUrl", "createdBy") FROM stdin;
\.


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menus (id, "createdAt", "updatedAt", "createdBy", description, uid, name, state, url, icon, code) FROM stdin;
2	2023-09-15 14:55:00.887447	2023-09-15 14:55:00.887447	\N	x	x	\N	\N	\N	\N	\N
3	2023-09-15 15:11:43.18289	2023-09-15 15:11:43.18289	\N	x	x	Query Category	query-category	query-category	mdi-format-list-bulleted	\N
4	2023-09-16 12:07:45.124935	2023-09-16 12:07:45.124935	\N	query-document-type	05cf7fb9-b68d-45e8-88ea-62758d4df25a	Query Document Type	query-document-type	query-document-type	mdi-file-document-edit-outline	query-document-type
5	2023-09-16 12:09:38.180854	2023-09-16 12:09:38.180854	\N	query-document-type	05cf7fb9-b68d-45e8-88ea-62758d4df25a	Query Status	query-status	query-status	mdi-list-status	query-document-type
6	2023-09-18 23:26:33.079784	2023-09-18 23:26:33.079784	\N	query	05cf7fb9-b68d-45e8-88ea-62758d4df25a	Query	query	query	mdi-view-list	query
7	2023-09-20 18:59:07.512311	2023-09-20 18:59:07.512311	\N	query	05cf7fb9-b68d-45e8-88ea-62758d4df25a	Assigned Queries	queryuser	queryuser	mdi-account-plus	query
8	2023-09-23 12:48:52.521429	2023-09-23 12:48:52.521429	\N	users	05cf7fb9-b68d-45e8-88ea-62758d4df25a	Manage users	manage-users	manage-users	mdi-account	manageusers
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: queries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.queries (id, "createdAt", "updatedAt", description, "createdBy", uid, "queryCategoryId", "queryStatusId", "userId", feedbackdescription, "closedAt", tracknumber, "queryofUserId", usersource, "queryPriorityId") FROM stdin;
76	2023-09-27 15:27:51.33313	2023-09-27 15:27:51.33313	Sample details	\N	\N	53	3	28	Kwa mujibu wa ......	2023-09-27 15:44:33.915	MSIMBAZI1364	30	\N	\N
77	2023-09-29 09:19:29.625855	2023-09-29 09:19:29.625855	Test	\N	\N	53	3	28	Test	2023-09-29 09:20:49.877	MSIMBAZI5476	30	\N	\N
80	2023-10-16 16:49:20.288652	2023-10-16 16:49:20.288652	Nalalamikia madam yangu ya fidia za kuhamishwa katika bonded la mto msimbazi	\N	\N	53	2	1	\N	\N	MSIMBAZI6193	\N	Anonymous	\N
81	2023-10-17 12:44:51.482215	2023-10-17 12:44:51.482215	Test claim	\N	\N	53	2	1	\N	\N	MSIMBAZI6115	31	Known	\N
79	2023-10-11 10:17:39.272754	2023-10-11 10:17:39.272754	fidia 	\N	\N	53	2	1	\N	\N	MSIMBAZI6380	\N	Anonymous	3
82	2024-01-23 10:35:05.743575	2024-01-23 10:35:05.743575	maelezo	\N	\N	\N	1	\N	\N	\N	MSIMBAZI2067	32	Known	\N
83	2024-01-23 10:47:09.366501	2024-01-23 10:47:09.366501	Maelezo	\N	\N	\N	1	\N	\N	\N	MSIMBAZI5520	32	Known	\N
\.


--
-- Data for Name: queries_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.queries_statuses (id, "createdAt", "updatedAt", "createdBy", description, name, code) FROM stdin;
3	2023-09-16 10:17:47.811	2023-09-16 10:17:47.811	\N	Taarifa uliyotuma imeshafanyiwa kazi na kujiwa	Imejibiwa	END
1	2023-06-15 15:24:59.915	2023-06-15 15:24:59.915	\N	Statustus inayotumika kuonesha kupokelewa kwa ujumbe kutoka kwa mwananchi	Imepokelewa	START
2	2023-06-15 14:50:42.111	2023-06-15 14:50:42.111	\N	Malalamiko kwa ajili ya bonde la mto msimbazi	Inashughulikiwa	CONTINUE
\.


--
-- Data for Name: query_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_categories (id, "createdAt", "updatedAt", "createdBy", description, name) FROM stdin;
53	2023-09-15 22:11:27.677	2023-09-15 22:11:27.677	\N	Malalamiko yanayohusu madai ya aina yote	Madai
1	2023-06-15 15:07:57.912	2023-06-15 15:07:57.912	\N	Pongezi zinazotumwa kutoka kwa wananchi	Pongezi
\.


--
-- Data for Name: query_claim_attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_claim_attachments (id, "createdAt", "updatedAt", "createdBy", "queryDocumentTypeId", "queryId", file_name, file_path) FROM stdin;
54	2023-09-27 15:27:51.367096	2023-09-27 15:27:51.367096	\N	5	76	4c64713e-0d46-4e4d-934b-dca54755d781.png	4c64713e-0d46-4e4d-934b-dca54755d781.png
55	2023-09-27 15:27:51.382317	2023-09-27 15:27:51.382317	\N	7	76	260c4132-d461-4c00-9be3-6610f40ffe5c.png	260c4132-d461-4c00-9be3-6610f40ffe5c.png
56	2023-09-29 09:19:29.631475	2023-09-29 09:19:29.631475	\N	7	77	5ba6595b-e893-4c38-ac85-7ba8a3e9f963.png	5ba6595b-e893-4c38-ac85-7ba8a3e9f963.png
57	2024-01-23 10:47:09.377348	2024-01-23 10:47:09.377348	\N	7	83	ca8a49b8-8843-490d-9789-10da36b166b2.png	ca8a49b8-8843-490d-9789-10da36b166b2.png
58	2024-01-23 10:47:09.389616	2024-01-23 10:47:09.389616	\N	7	83	5710436f-a340-4d1a-a280-098747806abd.png	5710436f-a340-4d1a-a280-098747806abd.png
\.


--
-- Data for Name: query_document_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_document_types (id, "createdAt", "updatedAt", "createdBy", "queryCategoryId", name, description, is_claim) FROM stdin;
7	2023-09-19 08:50:21.364569	2023-09-19 08:50:21.364569	\N	53	Hati ya Nyumba	Hati	t
9	2023-09-20 20:23:16.933	2023-09-20 20:23:16.933	\N	53	Kiambatanisho 1	Kiambatanisho 1	f
3	2023-09-16 12:13:26.287	2023-09-16 12:13:26.287	\N	53	Nakala ya madai	Nakala ya madai	t
5	2023-09-18 11:19:10.697	2023-09-18 11:19:10.697	\N	53	Nakala ya NIDA	Mfano	t
2	2023-09-16 11:27:10.755	2023-09-16 11:27:10.755	\N	53	Barua ya Uthibitisho wa madai ya fidia	Kiambatanisho cha barua kutoka kwa mwenyekiti	t
6	2023-09-19 08:48:37.073	2023-09-19 08:48:37.073	\N	1	Hati ya Nyumba	Hati	t
\.


--
-- Data for Name: query_feedback_attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_feedback_attachments (id, "createdAt", "updatedAt", "createdBy", "queryId", "queryDocumentTypeId", file_path, file_name) FROM stdin;
17	2023-09-27 15:44:33.943073	2023-09-27 15:44:33.943073	\N	76	9	ddfebc03-de02-48dd-8390-b8668aead8ba.png	ddfebc03-de02-48dd-8390-b8668aead8ba.png
19	2023-09-29 09:20:49.895617	2023-09-29 09:20:49.895617	\N	77	9	af864529-97a6-4ad8-866b-db8c3f978e79.png	af864529-97a6-4ad8-866b-db8c3f978e79.png
\.


--
-- Data for Name: query_priority; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_priority (id, "createdAt", "updatedAt", "createdBy", name, description) FROM stdin;
2	2023-11-16 19:28:03.511884	2023-11-16 19:28:03.511884	\N	Low	LOW
3	2023-11-16 19:28:37.791907	2023-11-16 19:28:37.791907	\N	High	HIGH
\.


--
-- Data for Name: readers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.readers (id, "createdAt", "updatedAt", name, description, "managerId", "createdBy") FROM stdin;
3	2023-06-07 17:40:35.261177	2023-06-07 17:40:35.261177	xx	xxx	\N	\N
4	2023-06-12 09:33:06.406568	2023-06-12 09:33:06.406568	xx	xxx	\N	\N
5	2023-06-15 14:28:46.427033	2023-06-15 14:28:46.427033	xx	xxx	\N	\N
\.


--
-- Data for Name: readers_meetings_meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.readers_meetings_meetings ("readersId", "meetingsId") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, "createdAt", "updatedAt", "createdBy", name, description) FROM stdin;
1	2023-10-09 09:00:16.15292	2023-10-09 09:00:16.15292	\N	atendee	User attending queries
2	2023-10-09 09:02:19.514447	2023-10-09 09:02:19.514447	\N	admin	system admin
3	2023-10-09 09:02:33.369376	2023-10-09 09:02:33.369376	\N	user	system user
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "createdAt", "updatedAt", first_name, middle_name, last_name, sex, username, password, email, "createdBy", phone_number, nin_number, user_identification, active) FROM stdin;
32	2023-10-25 15:33:25.063325	2023-10-25 15:33:25.063325	Lawrance	J.	Massanja	Me	massanjal4@gmail.com	9@ssw0rd	massanjal4@gmail.com	\N	0754690060	199999999999	MS8021	f
1	2023-06-08 15:49:42.192	2023-06-08 15:49:42.192	Mfaume	Mnokote	Saidi	Me	mmnokote	Evlina@1990	m@gmail.com	\N	0766148716	UEYR77 E8786	\N	f
31	2023-10-17 12:43:35.091671	2023-10-17 12:43:35.091671	Amani	Edwin	Mtae	Me	amtae	p@ssw0rd	amanmtae@gmail.com	\N	0654157307	19881110411020000122	MS5716	f
30	2023-09-27 15:23:12.867202	2023-09-27 15:23:12.867202	Rafael	Msimazi	Claimer	M	grm1	grm1	mmnokote@gmail.com	\N	00766148716	111111	MS4922	t
28	2023-09-27 14:19:39.39	2023-09-27 14:19:39.39	Attendeee	User	GRM	Ke	grm	grm	attendee@gmail.com	\N	0752955281	111111	MS5627	f
\.


--
-- Data for Name: users_menus_menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_menus_menus ("usersId", "menusId") FROM stdin;
1	3
1	4
1	5
1	6
1	7
1	8
30	7
28	3
28	5
28	6
\.


--
-- Data for Name: users_roles_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles_roles ("usersId", "rolesId") FROM stdin;
30	1
30	3
1	2
28	1
28	2
\.


--
-- Name: attachment_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attachment_types_id_seq', 1, false);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 7, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 126, true);


--
-- Name: levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.levels_id_seq', 1, false);


--
-- Name: meetings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meetings_id_seq', 1, false);


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menus_id_seq', 8, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: queries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.queries_id_seq', 83, true);


--
-- Name: queries_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.queries_statuses_id_seq', 5, true);


--
-- Name: query_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_categories_id_seq', 55, true);


--
-- Name: query_claim_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_claim_attachments_id_seq', 58, true);


--
-- Name: query_document_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_document_types_id_seq', 10, true);


--
-- Name: query_feedback_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_feedback_attachments_id_seq', 19, true);


--
-- Name: query_priority_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_priority_id_seq', 3, true);


--
-- Name: readers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.readers_id_seq', 5, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 32, true);


--
-- Name: levels PK_05f8dd8f715793c64d49e3f1901; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.levels
    ADD CONSTRAINT "PK_05f8dd8f715793c64d49e3f1901" PRIMARY KEY (id);


--
-- Name: menus PK_3fec3d93327f4538e0cbd4349c4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY (id);


--
-- Name: readers PK_4564309186c3e23496d65a80b4d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readers
    ADD CONSTRAINT "PK_4564309186c3e23496d65a80b4d" PRIMARY KEY (id);


--
-- Name: attachment_types PK_6173db982bf71fa7e6374908328; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachment_types
    ADD CONSTRAINT "PK_6173db982bf71fa7e6374908328" PRIMARY KEY (id);


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
-- Name: query_claim_attachments PK_6febb36ab0df31049ddd8717ddc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_claim_attachments
    ADD CONSTRAINT "PK_6febb36ab0df31049ddd8717ddc" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: queries_statuses PK_8d4967a189869925c909b92e948; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries_statuses
    ADD CONSTRAINT "PK_8d4967a189869925c909b92e948" PRIMARY KEY (id);


--
-- Name: category_closure PK_8da8666fc72217687e9b4f4c7e9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_closure
    ADD CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY (id_ancestor, id_descendant);


--
-- Name: query_document_types PK_940427c1b53f0d96c7abfd86c02; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_document_types
    ADD CONSTRAINT "PK_940427c1b53f0d96c7abfd86c02" PRIMARY KEY (id);


--
-- Name: query_priority PK_9534b2be95c5f637fa8691fe625; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_priority
    ADD CONSTRAINT "PK_9534b2be95c5f637fa8691fe625" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: query_feedback_attachments PK_9e9daa22d19bf6d67de146aa5b1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_feedback_attachments
    ADD CONSTRAINT "PK_9e9daa22d19bf6d67de146aa5b1" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: meetings PK_aa73be861afa77eb4ed31f3ed57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings
    ADD CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY (id);


--
-- Name: contacts PK_b99cd40cfd66a99f1571f4f72e6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: query_categories PK_c822d1edb5e03710607fdbb485c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_categories
    ADD CONSTRAINT "PK_c822d1edb5e03710607fdbb485c" PRIMARY KEY (id);


--
-- Name: queries PK_e212c03c614452a1d1f8699d2ae; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT "PK_e212c03c614452a1d1f8699d2ae" PRIMARY KEY (id);


--
-- Name: users_menus_menus PK_e7d73a1a95b3c44d31cd93e04b7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_menus_menus
    ADD CONSTRAINT "PK_e7d73a1a95b3c44d31cd93e04b7" PRIMARY KEY ("usersId", "menusId");


--
-- Name: readers_meetings_meetings PK_e9bee733e6f32dc613131af85c1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readers_meetings_meetings
    ADD CONSTRAINT "PK_e9bee733e6f32dc613131af85c1" PRIMARY KEY ("readersId", "meetingsId");


--
-- Name: books PK_f3f2f25a099d24e12545b70b022; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY (id);


--
-- Name: contacts REL_8864a3631809fed1aec8fa5ca8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT "REL_8864a3631809fed1aec8fa5ca8" UNIQUE ("readerId");


--
-- Name: category REL_ef7ee0f35bf4bd231fae7c6399; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "REL_ef7ee0f35bf4bd231fae7c6399" UNIQUE ("levelId");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: IDX_492a0147d9d5e4a255b808e3b4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_492a0147d9d5e4a255b808e3b4" ON public.readers_meetings_meetings USING btree ("meetingsId");


--
-- Name: IDX_4aa1348fc4b7da9bef0fae8ff4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4" ON public.category_closure USING btree (id_ancestor);


--
-- Name: IDX_61ecbd00b6712a4194c2db6106; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_61ecbd00b6712a4194c2db6106" ON public.readers_meetings_meetings USING btree ("readersId");


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
-- Name: query_feedback_attachments FK_0e723a7f69361d2c3e8441901ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_feedback_attachments
    ADD CONSTRAINT "FK_0e723a7f69361d2c3e8441901ec" FOREIGN KEY ("queryId") REFERENCES public.queries(id);


--
-- Name: query_feedback_attachments FK_3b4bda9fc1b2687869163e473f2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_feedback_attachments
    ADD CONSTRAINT "FK_3b4bda9fc1b2687869163e473f2" FOREIGN KEY ("queryDocumentTypeId") REFERENCES public.query_document_types(id) ON DELETE CASCADE;


--
-- Name: readers_meetings_meetings FK_492a0147d9d5e4a255b808e3b4f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readers_meetings_meetings
    ADD CONSTRAINT "FK_492a0147d9d5e4a255b808e3b4f" FOREIGN KEY ("meetingsId") REFERENCES public.meetings(id);


--
-- Name: category_closure FK_4aa1348fc4b7da9bef0fae8ff48; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_closure
    ADD CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48" FOREIGN KEY (id_ancestor) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- Name: books FK_584dff0f6fb295c42a3e4b63a40; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "FK_584dff0f6fb295c42a3e4b63a40" FOREIGN KEY ("readerId") REFERENCES public.readers(id) ON DELETE CASCADE;


--
-- Name: readers_meetings_meetings FK_61ecbd00b6712a4194c2db61065; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readers_meetings_meetings
    ADD CONSTRAINT "FK_61ecbd00b6712a4194c2db61065" FOREIGN KEY ("readersId") REFERENCES public.readers(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: contacts FK_8864a3631809fed1aec8fa5ca8a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT "FK_8864a3631809fed1aec8fa5ca8a" FOREIGN KEY ("readerId") REFERENCES public.readers(id) ON DELETE CASCADE;


--
-- Name: queries FK_8a5e6a450a86770efe6a7eca28d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT "FK_8a5e6a450a86770efe6a7eca28d" FOREIGN KEY ("queryPriorityId") REFERENCES public.query_priority(id) ON DELETE CASCADE;


--
-- Name: users_menus_menus FK_9c20d9636927fc68327c6b387a7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_menus_menus
    ADD CONSTRAINT "FK_9c20d9636927fc68327c6b387a7" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: query_claim_attachments FK_a0f8eb2847b6333fa33635811ed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_claim_attachments
    ADD CONSTRAINT "FK_a0f8eb2847b6333fa33635811ed" FOREIGN KEY ("queryId") REFERENCES public.queries(id) ON DELETE CASCADE;


--
-- Name: query_document_types FK_a7749cac0b0bb09ad51571a9f70; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_document_types
    ADD CONSTRAINT "FK_a7749cac0b0bb09ad51571a9f70" FOREIGN KEY ("queryCategoryId") REFERENCES public.query_categories(id) ON DELETE CASCADE;


--
-- Name: queries FK_a930728fbb0fdd4350f31aff175; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT "FK_a930728fbb0fdd4350f31aff175" FOREIGN KEY ("queryCategoryId") REFERENCES public.query_categories(id) ON DELETE CASCADE;


--
-- Name: query_claim_attachments FK_ac499d26be810b080d9ba7b75b0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_claim_attachments
    ADD CONSTRAINT "FK_ac499d26be810b080d9ba7b75b0" FOREIGN KEY ("queryDocumentTypeId") REFERENCES public.query_document_types(id) ON DELETE CASCADE;


--
-- Name: users_roles_roles FK_b2f0366aa9349789527e0c36d97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles_roles
    ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES public.roles(id);


--
-- Name: readers FK_c34e20cc67a973b92062697ba4b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readers
    ADD CONSTRAINT "FK_c34e20cc67a973b92062697ba4b" FOREIGN KEY ("managerId") REFERENCES public.readers(id) ON DELETE SET NULL;


--
-- Name: queries FK_ce472fa6fb8a1aef46ed79761c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT "FK_ce472fa6fb8a1aef46ed79761c4" FOREIGN KEY ("queryStatusId") REFERENCES public.queries_statuses(id) ON DELETE CASCADE;


--
-- Name: category FK_d5456fd7e4c4866fec8ada1fa10; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES public.category(id);


--
-- Name: users_roles_roles FK_df951a64f09865171d2d7a502b1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles_roles
    ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: queries FK_e83034a291126b19e15e455961a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT "FK_e83034a291126b19e15e455961a" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: category FK_ef7ee0f35bf4bd231fae7c63998; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "FK_ef7ee0f35bf4bd231fae7c63998" FOREIGN KEY ("levelId") REFERENCES public.levels(id);


--
-- PostgreSQL database dump complete
--

