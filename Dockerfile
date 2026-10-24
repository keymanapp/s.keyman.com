# syntax=docker/dockerfile:1
# Site
FROM php:8.4-apache@sha256:56e7dab56ae21ec10aae951f93cbe7069c1ca68a714dd22ca78724268c78f5de

# Install jq
RUN apt-get update && apt-get install -y \
  jq
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN chown -R www-data:www-data /var/www/html/

RUN a2enmod headers mime rewrite
