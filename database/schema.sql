PGDMP                      |            d13l548q93ocs2     15.6 (Ubuntu 15.6-1.pgdg20.04+1)    16.0 4    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262 
   1053576206    d13l548q93ocs2    DATABASE     z   CREATE DATABASE d13l548q93ocs2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE d13l548q93ocs2;
                zgrydqsgrahtvg    false            4           0    0    DATABASE d13l548q93ocs2    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE d13l548q93ocs2 FROM PUBLIC;
                   zgrydqsgrahtvg    false    4403            5           0    0    d13l548q93ocs2    DATABASE PROPERTIES     R   ALTER DATABASE d13l548q93ocs2 SET search_path TO '$user', 'public', 'heroku_ext';
                     zgrydqsgrahtvg    false                        2615 
   1053576241 
   heroku_ext    SCHEMA        CREATE SCHEMA heroku_ext;
    DROP SCHEMA heroku_ext;
                u5r3an66jk23sf    false            6           0    0    SCHEMA heroku_ext    ACL     4   GRANT USAGE ON SCHEMA heroku_ext TO zgrydqsgrahtvg;
                   u5r3an66jk23sf    false    8                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                zgrydqsgrahtvg    false            7           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO zgrydqsgrahtvg;
                   postgres    false    887                        3079 
   1053576242    pg_stat_statements 	   EXTENSION     J   CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA heroku_ext;
 #   DROP EXTENSION pg_stat_statements;
                   false    8            8           0    0    EXTENSION pg_stat_statements    COMMENT     u   COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';
                        false    3                        3079 
   1053576512    unaccent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
    DROP EXTENSION unaccent;
                   false    7            9           0    0    EXTENSION unaccent    COMMENT     P   COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';
                        false    2            �            1259 
   1053576519    label    TABLE     `   CREATE TABLE public.label (
    id integer NOT NULL,
    name character varying(32) NOT NULL
);
    DROP TABLE public.label;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576522    label_id_seq    SEQUENCE     �   ALTER TABLE public.label ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.label_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          zgrydqsgrahtvg    false    219    7            �            1259 
   1053576523    labelled_thread    TABLE     g   CREATE TABLE public.labelled_thread (
    thread_id integer NOT NULL,
    label_id integer NOT NULL
);
 #   DROP TABLE public.labelled_thread;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576526    saved_thread    TABLE     c   CREATE TABLE public.saved_thread (
    user_id integer NOT NULL,
    thread_id integer NOT NULL
);
     DROP TABLE public.saved_thread;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576529    thread    TABLE     Y  CREATE TABLE public.thread (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(256) NOT NULL,
    content character varying(4096),
    deleted boolean DEFAULT false NOT NULL,
    responds_to integer,
    publication_datetime timestamp with time zone DEFAULT now() NOT NULL,
    university_id integer NOT NULL
);
    DROP TABLE public.thread;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576536    thread_id_seq    SEQUENCE     �   ALTER TABLE public.thread ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.thread_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          zgrydqsgrahtvg    false    223    7            �            1259 
   1053576537    thread_report    TABLE     �   CREATE TABLE public.thread_report (
    id integer NOT NULL,
    thread_id integer NOT NULL,
    user_id integer NOT NULL,
    content character varying(512) NOT NULL,
    admitted boolean DEFAULT false NOT NULL
);
 !   DROP TABLE public.thread_report;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576543    thread_report_id_seq    SEQUENCE     �   ALTER TABLE public.thread_report ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.thread_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          zgrydqsgrahtvg    false    225    7            �            1259 
   1053576544 
   university    TABLE     �   CREATE TABLE public.university (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    short_name character varying(16) NOT NULL,
    domain character varying(16),
    related_term character varying(256)
);
    DROP TABLE public.university;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576547    university_id_seq    SEQUENCE     �   ALTER TABLE public.university ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.university_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          zgrydqsgrahtvg    false    7    227            �            1259 
   1053576548    user_account    TABLE     �  CREATE TABLE public.user_account (
    id integer NOT NULL,
    email character varying(256) NOT NULL,
    name character varying(32) NOT NULL,
    password character varying(64) NOT NULL,
    university_id integer NOT NULL,
    verification_code character varying(32),
    banned boolean DEFAULT false NOT NULL,
    registration_datetime timestamp with time zone DEFAULT now() NOT NULL,
    verified_info character varying(128)
);
     DROP TABLE public.user_account;
       public         heap    zgrydqsgrahtvg    false    7            �            1259 
   1053576554    user_account_id_seq    SEQUENCE     �   ALTER TABLE public.user_account ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          zgrydqsgrahtvg    false    229    7            �           2606 
   1053576556    university domain_uni 
   CONSTRAINT     R   ALTER TABLE ONLY public.university
    ADD CONSTRAINT domain_uni UNIQUE (domain);
 ?   ALTER TABLE ONLY public.university DROP CONSTRAINT domain_uni;
       public            zgrydqsgrahtvg    false    227            �           2606 
   1053576558    user_account email_user 
   CONSTRAINT     S   ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT email_user UNIQUE (email);
 A   ALTER TABLE ONLY public.user_account DROP CONSTRAINT email_user;
       public            zgrydqsgrahtvg    false    229            w           2606 
   1053576560    label label_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.label
    ADD CONSTRAINT label_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.label DROP CONSTRAINT label_pkey;
       public            zgrydqsgrahtvg    false    219            y           2606 
   1053576562    label name_label 
   CONSTRAINT     K   ALTER TABLE ONLY public.label
    ADD CONSTRAINT name_label UNIQUE (name);
 :   ALTER TABLE ONLY public.label DROP CONSTRAINT name_label;
       public            zgrydqsgrahtvg    false    219            �           2606 
   1053576564    university name_uni 
   CONSTRAINT     N   ALTER TABLE ONLY public.university
    ADD CONSTRAINT name_uni UNIQUE (name);
 =   ALTER TABLE ONLY public.university DROP CONSTRAINT name_uni;
       public            zgrydqsgrahtvg    false    227            �           2606 
   1053576566    user_account name_user 
   CONSTRAINT     Q   ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT name_user UNIQUE (name);
 @   ALTER TABLE ONLY public.user_account DROP CONSTRAINT name_user;
       public            zgrydqsgrahtvg    false    229            u           2606 
   1053576567    thread responds_to<>id    CHECK CONSTRAINT     f   ALTER TABLE public.thread
    ADD CONSTRAINT "responds_to<>id" CHECK ((responds_to <> id)) NOT VALID;
 =   ALTER TABLE public.thread DROP CONSTRAINT "responds_to<>id";
       public          zgrydqsgrahtvg    false    223    223    223    223            {           2606 
   1053576569 !   labelled_thread saved_thread_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.labelled_thread
    ADD CONSTRAINT saved_thread_pkey PRIMARY KEY (thread_id, label_id);
 K   ALTER TABLE ONLY public.labelled_thread DROP CONSTRAINT saved_thread_pkey;
       public            zgrydqsgrahtvg    false    221    221            }           2606 
   1053576571    saved_thread saved_thread_pkey1 
   CONSTRAINT     m   ALTER TABLE ONLY public.saved_thread
    ADD CONSTRAINT saved_thread_pkey1 PRIMARY KEY (user_id, thread_id);
 I   ALTER TABLE ONLY public.saved_thread DROP CONSTRAINT saved_thread_pkey1;
       public            zgrydqsgrahtvg    false    222    222            �           2606 
   1053576573    university short_name_uni 
   CONSTRAINT     Z   ALTER TABLE ONLY public.university
    ADD CONSTRAINT short_name_uni UNIQUE (short_name);
 C   ALTER TABLE ONLY public.university DROP CONSTRAINT short_name_uni;
       public            zgrydqsgrahtvg    false    227            �           2606 
   1053576575 -   thread_report thread_id_user_id_thread_report 
   CONSTRAINT     v   ALTER TABLE ONLY public.thread_report
    ADD CONSTRAINT thread_id_user_id_thread_report UNIQUE (thread_id, user_id);
 W   ALTER TABLE ONLY public.thread_report DROP CONSTRAINT thread_id_user_id_thread_report;
       public            zgrydqsgrahtvg    false    225    225                       2606 
   1053576577    thread thread_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.thread DROP CONSTRAINT thread_pkey;
       public            zgrydqsgrahtvg    false    223            �           2606 
   1053576579     thread_report thread_report_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.thread_report
    ADD CONSTRAINT thread_report_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.thread_report DROP CONSTRAINT thread_report_pkey;
       public            zgrydqsgrahtvg    false    225            �           2606 
   1053576581    university university_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.university
    ADD CONSTRAINT university_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.university DROP CONSTRAINT university_pkey;
       public            zgrydqsgrahtvg    false    227            �           2606 
   1053576583    user_account user_account_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.user_account DROP CONSTRAINT user_account_pkey;
       public            zgrydqsgrahtvg    false    229            �           2606 
   1053615880    user_account verified_info_user 
   CONSTRAINT     c   ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT verified_info_user UNIQUE (verified_info);
 I   ALTER TABLE ONLY public.user_account DROP CONSTRAINT verified_info_user;
       public            zgrydqsgrahtvg    false    229            �           2606 
   1053576584 (   labelled_thread label_id_labelled_thread    FK CONSTRAINT     �   ALTER TABLE ONLY public.labelled_thread
    ADD CONSTRAINT label_id_labelled_thread FOREIGN KEY (label_id) REFERENCES public.label(id);
 R   ALTER TABLE ONLY public.labelled_thread DROP CONSTRAINT label_id_labelled_thread;
       public          zgrydqsgrahtvg    false    221    219    4215            �           2606 
   1053576589    thread responds_to_thread    FK CONSTRAINT     �   ALTER TABLE ONLY public.thread
    ADD CONSTRAINT responds_to_thread FOREIGN KEY (responds_to) REFERENCES public.thread(id) NOT VALID;
 C   ALTER TABLE ONLY public.thread DROP CONSTRAINT responds_to_thread;
       public          zgrydqsgrahtvg    false    223    4223    223            �           2606 
   1053576594 )   labelled_thread thread_id_labelled_thread    FK CONSTRAINT     �   ALTER TABLE ONLY public.labelled_thread
    ADD CONSTRAINT thread_id_labelled_thread FOREIGN KEY (thread_id) REFERENCES public.thread(id);
 S   ALTER TABLE ONLY public.labelled_thread DROP CONSTRAINT thread_id_labelled_thread;
       public          zgrydqsgrahtvg    false    4223    223    221            �           2606 
   1053576599 #   saved_thread thread_id_saved_thread    FK CONSTRAINT     �   ALTER TABLE ONLY public.saved_thread
    ADD CONSTRAINT thread_id_saved_thread FOREIGN KEY (thread_id) REFERENCES public.thread(id);
 M   ALTER TABLE ONLY public.saved_thread DROP CONSTRAINT thread_id_saved_thread;
       public          zgrydqsgrahtvg    false    4223    223    222            �           2606 
   1053576604 %   thread_report thread_id_thread_report    FK CONSTRAINT     �   ALTER TABLE ONLY public.thread_report
    ADD CONSTRAINT thread_id_thread_report FOREIGN KEY (thread_id) REFERENCES public.thread(id);
 O   ALTER TABLE ONLY public.thread_report DROP CONSTRAINT thread_id_thread_report;
       public          zgrydqsgrahtvg    false    225    4223    223            �           2606 
   1053576609    thread university_id_thread    FK CONSTRAINT     �   ALTER TABLE ONLY public.thread
    ADD CONSTRAINT university_id_thread FOREIGN KEY (university_id) REFERENCES public.university(id) NOT VALID;
 E   ALTER TABLE ONLY public.thread DROP CONSTRAINT university_id_thread;
       public          zgrydqsgrahtvg    false    4235    223    227            �           2606 
   1053576614    user_account university_id_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT university_id_user FOREIGN KEY (university_id) REFERENCES public.university(id);
 I   ALTER TABLE ONLY public.user_account DROP CONSTRAINT university_id_user;
       public          zgrydqsgrahtvg    false    227    4235    229            �           2606 
   1053576619 !   saved_thread user_id_saved_thread    FK CONSTRAINT     �   ALTER TABLE ONLY public.saved_thread
    ADD CONSTRAINT user_id_saved_thread FOREIGN KEY (user_id) REFERENCES public.user_account(id);
 K   ALTER TABLE ONLY public.saved_thread DROP CONSTRAINT user_id_saved_thread;
       public          zgrydqsgrahtvg    false    229    4241    222            �           2606 
   1053576624    thread user_id_thread    FK CONSTRAINT     {   ALTER TABLE ONLY public.thread
    ADD CONSTRAINT user_id_thread FOREIGN KEY (user_id) REFERENCES public.user_account(id);
 ?   ALTER TABLE ONLY public.thread DROP CONSTRAINT user_id_thread;
       public          zgrydqsgrahtvg    false    4241    223    229            �           2606 
   1053576629 #   thread_report user_id_thread_report    FK CONSTRAINT     �   ALTER TABLE ONLY public.thread_report
    ADD CONSTRAINT user_id_thread_report FOREIGN KEY (user_id) REFERENCES public.user_account(id);
 M   ALTER TABLE ONLY public.thread_report DROP CONSTRAINT user_id_thread_report;
       public          zgrydqsgrahtvg    false    229    225    4241           