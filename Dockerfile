# syntax=docker/dockerfile:1
# Site
FROM php:7.4-apache
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN chown -R www-data:www-data /var/www/html/

RUN a2enmod headers mime rewrite
