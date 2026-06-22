# README

Este es un artefacto cuyo único objetivo es socializar el conocimiento; lo producido **NO DEBE USARSE TAL CUAL EN UN AMBIENTE DE PRODUCCIÓN**. No soy responsable por ningún daño o perjuicio ocasionado por el uso del contenido de esta publicación.

## Necesidad

Agilizar el proceso de configuración de entorno de desarrollo para hacer aplicaciones en Django utilizando Docker como herramienta para configurar la arquitectura de desarrollo que facilite de manera segura el deployment a producción de soluciones informáticas usando containers como infraestructura.

## Hipótesis de solución

Usar las funcionalidades que provee Visual Studio Code para programar aplicaciones basadas en Django sin tener que instalar Python y sus librerías necesarias en la computadora de trabajo del desarrollador, sino usar el entorno ofrecido por Docker images.

## Objetivo de aprendizaje

Al finalizar esta guía el participante deberá haber adquirido las referencias sobre herramientas y métodos para implementar desde cero un entorno de desarrollo virtualizado en Python, específicamente usando Django. El entregable es tener la app Django operable y editable usando Docker para proveer todas las librerías necesarias sin tener que instalarlas en la estación de trabajo del desarrollador.

**Está fuera del alcance de esta guía:** enseñar cómo usar Docker, Git, Visual Studio o cualquiera de las herramientas o librerías que se mencionan; tener un producto de software listo para producción (no se contemplan las buenas prácticas de seguridad digital necesarias); enseñar a hacer una app usando Django.

## Requisitos

- Haber instalado Docker, Git y Visual Studio Code en tu computadora
- Tener conocimientos para operar con efectividad cada una de las 3 herramientas
- Tener cuenta activa y funcional en GitHub y Docker Hub

## Software y plugins necesarios en VS Code

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VSCode](https://code.visualstudio.com/)
- [VSCode Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [VSCode Docker extension](https://code.visualstudio.com/docs/containers/overview)
- [VSCode Python Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

La idea central: muchos tutoriales explican cómo *dockerizar* un proyecto existente, asumiendo que ya tienes un entorno local configurado. Otra vía es usar Docker desde el inicio, evitando instalar Python y otras dependencias en tu máquina local. La extensión Docker de VSCode genera mediante la paleta de comandos los archivos y carpetas necesarias para trabajar Django en una image/container.

> 📷 **La guía completa, con cada paso ilustrado en capturas de pantalla, está en el [post original](https://www.untaldouglas.info/2023/02/configurar-entorno-de-desarrollo-para.html).**

**Referencia:** [Django development environment using VSCode Remote Containers — BackendClub.com](https://backendclub.com/articles/django-dev-environment-vscode-remote-containers/)
