# syntax=docker/dockerfile:1
# Site
FROM php:7.4-apache@sha256:c9d7e608f73832673479770d66aacc8100011ec751d1905ff63fae3fe2e0ca6d

# Install jq
RUN apt-get update && apt-get install -y \
  jq
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN chown -R www-data:www-data /var/www/html/

RUN a2enmod headers mime rewrite
