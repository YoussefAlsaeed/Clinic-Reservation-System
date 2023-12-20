FROM mysql:5.7

CMD ["/bin/sh", "-c", "printenv && docker-entrypoint.sh mysqld"]