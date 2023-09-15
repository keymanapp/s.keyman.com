# syntax=docker/dockerfile:1
FROM php:7.4-apache
RUN chown -R www-data:www-data /var/www/html/

#COPY --chown=www-data --from=builder /var/www/html/vendor /var/www/vendor
RUN a2enmod headers mime rewrite
