create table greeted_users(
	id serial not null primary key,
	names text not null,
	times_greeted int not null
);