# syntax=docker/dockerfile:1
# Site
FROM php:8.4-apache@sha256:51da594c844a97f31b1cd6b1ac6660982f40788f4fe13e75f7fd39e2f9b58651

# Install jq
RUN apt-get update && apt-get install -y \
  jq
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN chown -R www-data:www-data /var/www/html/

RUN a2enmod headers mime rewrite
