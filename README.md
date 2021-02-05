# OmnIS UI

Omnis Web Interface is part of the OmnIS project.

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/omnis-org/omnis-ui/CI)
[![CodeFactor](https://www.codefactor.io/repository/github/omnis-org/omnis-ui/badge)](https://www.codefactor.io/repository/github/omnis-org/omnis-ui)
[![Depfu](https://badges.depfu.com/badges/ea9ecbbec184051b4a1857946670e77d/overview.svg)](https://depfu.com/github/omnis-org/omnis-ui?project_id=18604)
![GitHub](https://img.shields.io/github/license/omnis-org/omnis-ui)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.


## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Production

For this example, omnis-server and omnis-ui are on the same server.

We use apache to serve the web interface as well as establish the connection between ui and api.

### Apache

Install apache2

We need to activate some modules :

#### Debian / Ubuntu

```bash
sudo a2enmod ssl
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
```


#### Arch / Fedora

Uncomment lines :

```bash
# vim /etc/httpd/httpd.conf

LoadModule xml2enc_module modules/mod_xml2enc.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule ssl_module modules/mod_ssl.so
LoadModule rewrite_module modules/mod_rewrite.so

Include conf/extra/httpd-vhosts.conf
```

### Build

Change the file `omnis-ui/src/environments/environment.prod.ts` if omnis-server has another url location or if you change api endpoints.

Build UI in your served web directory :

```bash
sudo ng build --prod --output-path /var/www/omnis # Debian / Ubuntu
sudo ng build --prod --output-path /srv/http/omnis # Fedora / Arch
```

Create the file `.htaccess` in the created served web directory :

```bash
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
```

Now let's create a new virtualhost entry in apache config directory.

```bash
sudo vim /etc/apache2/sites-available/001-omnis.conf # Debian / Ubuntu
sudo vim /etc/httpd/conf/extra/httpd-vhosts.conf # Arch / Fedora
```

```bash
Define OMNIS_APP_DIR /var/www/omnis # Debian / Ubuntu # Remove line if not good distribution
Define OMNIS_APP_DIR /srv/http/omnis # Fedora / Arch # Remove line if not good distribution

<VirtualHost *:80>
        ServerName 127.0.0.1
        ServerAdmin webmaster@localhost
        DocumentRoot ${OMNIS_APP_DIR}
        <Directory ${OMNIS_APP_DIR}>
                RewriteEngine on
                RewriteCond %{REQUEST_FILENAME} -f [OR]
                RewriteCond %{REQUEST_FILENAME} -d
                RewriteRule ^ - [L]
                RewriteRule ^ index.html [L]
        </Directory>

        <IfModule mod_proxy.c>
                SSLProxyEngine on
                SSLProxyVerify none
                # SSLProxyCheckPeerCN off
                SSLProxyCheckPeerName off
                <Location "/api">
                        ProxyPass https://localhost:4320/api
                        ProxyPassReverse https://localhost:4320/api
                        Order allow,deny
                        Satisfy any
                </Location>
        </IfModule>

        ErrorLog /var/log/omnis/error.log
        CustomLog /var/log/omnis/access.log combined
</VirtualHost>
```



#### Debian / Ubuntu

```bash
sudo chown www-data:<your-user> -R /var/www/omnis
a2ensite omnis
sudo mkdir /var/log/omnis/
sudo systemctl restart apache2
```


#### Arch

```bash
sudo chown http:<your-user> -R /srv/http/omnis
sudo mkdir /var/log/omnis/
sudo systemctl restart httpd
```


