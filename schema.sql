CREATE TABLE events (
    id serial PRIMARY KEY,
    title text,
    date_start timestamp,
    date_stop timestamp,
    location text,
    description text,
    headcount_served_potential integer,
    signup_deadline timestamp,
    age_min integer,
    min_participants integer,
    max_participants integer,
    adults_needed boolean,
    num_adults integer,
    alerts text
);

CREATE TABLE volunteers (
    id serial PRIMARY KEY,
    username varchar(20),
    password password,
    first_name text,
    last_name text,
    date_of_birth timestamp,
    phone varchar(12),
    email varchar(50),
    zip_code varchar(5),
    emergency_name text,
    emergency_phone varchar(12),
    sign_up_message text,
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_guardian boolean DEFAULT false,
    is_minor boolean DEFAULT true,
    is_ambassador boolean
);

CREATE TABLE admins (
    id serial PRIMARY KEY,
    username varchar(20),
    password password,
    first_name text,
    last_name text,
    phone varchar(12),
    email varchar(30),
    address text,
    sign_up_message text
)

CREATE TABLE guardian_child_link (
    id serial PRIMARY KEY,
    volunteer_id REFERENCES volunteers (id),
    guardian_id REFERENCES volunteers (id)
)

CREATE TABLE volunteer_activities (
    id serial PRIMARY KEY,
    check_in_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_out_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_id integer REFERENCES events (id),
    volunteer_id integer REFERENCES volunteers (id),
    guardian_approval boolean DEFAULT false,
    manually_checked_in boolean DEFAULT false,
    manually_checked_out boolean DEFAULT false
)

CREATE TABLE special_skills (
    id serial PRIMARY KEY,
    skill text,
    volunteer_id integer REFERENCES volunteers (id), 
    guardian_id integer REFERENCES volunteers (id)
)

CREATE TABLE admin_notes (
    id serial PRIMARY KEY,
    volunteer_id integer REFERENCES volunteers (id), 
    guardian_id integer REFERENCES volunteers (id), 
    notes text
)

CREATE TABLE hours (
    id serial PRIMARY KEY,
    hours integer,
    volunteer_activities_id REFERENCES volunteer_activities (id)
)