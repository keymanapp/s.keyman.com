# syntax=docker/dockerfile:1
FROM php:7.4-apache
COPY resources/keyman-site.conf /etc/apache2/conf-available/
RUN chown -R www-data:www-data /var/www/html/

#COPY --chown=www-data --from=builder /var/www/html/vendor /var/www/vendor
RUN a2enmod headers mime rewrite; a2enconf keyman-site
