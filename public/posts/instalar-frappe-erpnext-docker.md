Tutorial oficial de referencia: [github.com/frappe/frappe_docker — development](https://github.com/frappe/frappe_docker/tree/develop/development)

Instalado en laptop Mac con Linux Pop 21.04 (basado en Ubuntu 20.04 LTS). Siguiendo el tutorial al pie de la letra he podido repetir la instalación en otros equipos. Validado también en macOS 10.13.6.

```bash
git clone https://github.com/frappe/frappe_docker.git
cd frappe_docker
cp -R devcontainer-example .devcontainer   # carpeta de configuración editable
```

Asegúrate de haber instalado en VS Code la extensión [Remote Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Inicia VS Code desde la carpeta recién clonada (`code .`), da clic en *Reopen in Container* y *View Logs*. La descarga de imágenes e inicio de containers tarda según tu red y equipo; verifica con `docker ps`.

### Inicializar Frappe

Desde una terminal dentro del container en VS Code:

```bash
bench init --skip-redis-config-generation --frappe-branch version-13 frappe-bench
cd frappe-bench
```

Configurar los hosts para usar los containers correctos en lugar de localhost:

```bash
bench set-mariadb-host mariadb
bench set-redis-cache-host redis-cache:6379
bench set-redis-queue-host redis-queue:6379
bench set-redis-socketio-host redis-socketio:6379
```

### Crear el site

```bash
bench new-site admision.localhost --mariadb-root-password <tu-pwd-mariadb> --admin-password <tu-pwd-admin> --no-mariadb-socket
```

Activar el developer mode en el nuevo site:

```bash
bench --site admision.localhost set-config developer_mode 1
bench --site admision.localhost clear-cache
```

### Instalar ERPNext

```bash
bench get-app --branch version-13 erpnext https://github.com/frappe/erpnext.git
bench --site admision.localhost install-app erpnext
bench start
```

Visita [http://admision.localhost:8000](http://admision.localhost:8000) e inicia sesión como Administrator. ¡Instalas ERPNext a tu gusto!

### Edición bidireccional host ⇄ container

Creé un archivo desde la carpeta del host, lo vi en el directorio de VS Code dentro del container, lo edité — y funciona en ambos sentidos. Edité un formulario de appointment booking para quitar el campo de Skype, apagué VS Code, reinicié desde el container... **y el cambio se mantiene.** Éxito.

### Sin VS Code

Puedes iniciar los containers manualmente:

```bash
docker-compose -f .devcontainer/docker-compose.yml up -d
docker exec -e "TERM=xterm-256color" -w /workspace/development -it devcontainer_frappe_1 bash
```

---

*[Publicación original](https://www.untaldouglas.info/2021/09/instalar-frappe-y-erpnext-usando-docker.html)*
