CREATE DATABASE example_test;

GRANT ALL ON DATABASE example_test TO example;

ALTER DATABASE example_test
SET log_statement = 'all';