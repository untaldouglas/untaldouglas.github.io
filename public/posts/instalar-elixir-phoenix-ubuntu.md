Esta guía también funciona con Ubuntu 20.04 LTS. No voy a utilizar los repositorios que trae Ubuntu sino los oficiales de Elixir, para lo que tendré que modificar un archivo de configuración.

#### Paso 1 — Configurar el repositorio de Elixir

```bash
wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb
sudo dpkg -i erlang-solutions_2.0_all.deb
```

Modificar `/etc/apt/sources.list.d/erlang-solutions.list`: editar la línea que contiene `deb http://binaries.erlang-solutions.com/debian ulyana contrib` para que use el nombre oficial de Ubuntu 20.04:

```
deb http://binaries.erlang-solutions.com/debian focal contrib
```

Grabar y actualizar el directorio de repositorios:

```bash
sudo apt-get update
```

#### Paso 2 — Instalar Elixir

```bash
sudo apt-get install esl-erlang elixir
elixir --version   # en mi caso, 1.12.2
```

#### Paso 3 — Instalar Phoenix

Identificar la versión más reciente en [hexdocs.pm/phoenix/installation](https://hexdocs.pm/phoenix/installation.html):

```bash
mix archive.install hex phx_new 1.5.12
```

#### Paso 4 — Instalar NodeJS y npm

```bash
sudo apt-get install nodejs npm
sudo apt-get install inotify-tools   # ayuda en development mode
```

#### Paso 5 — Instalar y configurar Postgres

```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres psql
```

Dentro de la consola de Postgres: `\password postgres` para asignar la contraseña (en development mode se sugiere `postgres`), y `\q` para salir. Luego:

```bash
sudo systemctl restart postgresql.service
```

#### Paso final — Probar creando una app Phoenix

```bash
mix phx.new hola
cd hola
mix phx.server
```

Visita [http://localhost:4000](http://localhost:4000) y responde que sí a la pregunta de crear la base de datos. Si usaste la contraseña `postgres`, no tendrás problemas de credenciales en modo developer.

---

*[Publicación original](https://www.untaldouglas.info/2021/09/guia-de-instalacion-y-configuracion-de.html)*
