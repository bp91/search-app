FROM haproxy:1.8.9

ADD rsyslog /tmp/rsyslog

RUN apt-get update && apt-get install rsyslog -y

RUN cp -r /tmp/rsyslog/haproxy.conf /etc/rsyslog.d/
RUN cp -r /tmp/rsyslog/rsyslog.conf /etc/rsyslog.conf

RUN touch /var/log/haproxy.log

# ADD haproxy.service /usr/lib/systemd/system/

# ADD haproxy.service /lib/systemd/system/

# ADD haproxy.service /etc/init.d/

# RUN chmod +x /usr/lib/systemd/system/haproxy.service

# RUN chmod +x /lib/systemd/system/haproxy.service

# RUN chmod +x /etc/init.d/haproxy.service

# CMD service rsyslog start && service haproxy start && tail -f /usr/local/etc/haproxy/haproxy.cfg

CMD service rsyslog start && haproxy -f /usr/local/etc/haproxy/haproxy.cfg && tail -f /var/log/haproxy.log