Se debe tener instalado **Docker**. Instalación hecha en laptop MacBook Air con Linux Mint 20.3, 4 procesadores y 3.7 GB de RAM.

### Instalar minikube

Preferí instalar minikube en lugar de kind k8s en mi estación de trabajo: [minikube.sigs.k8s.io/docs/start](https://minikube.sigs.k8s.io/docs/start/)

Comandos importantes:

```bash
minikube dashboard  # inicializa una GUI para ver tu entorno de minikube
minikube tunnel     # permite acceder a las apps instaladas desde tu desktop
```

### Instalar Helm

Helm es el package manager de apps k8s (llamadas Charts): [helm.sh/docs/intro/install](https://helm.sh/docs/intro/install/). Repositorios de Charts: [artifacthub.io](https://artifacthub.io/) y [bitnami.com/stacks/helm](https://bitnami.com/stacks/helm).

### Instalar Kubeapps

Kubeapps es una aplicación web in-cluster que permite, con una instalación única, desplegar, gestionar y actualizar aplicaciones en un clúster de Kubernetes: [kubeapps.dev](https://kubeapps.dev/)

### Instalar Moodle y Postgres

Desde Kubeapps se despliegan ambos Charts.

**Tips:**

- Cuando se haya iniciado el deployment de una app (Chart) desde Kubeapps, se recomienda apagar el servicio Kubeapps para dar mejor rendimiento a minikube.
- Para monitorear el proceso de deployment del Chart es mejor usar `minikube dashboard`.

Lo más importante: hay que habilitar la salida de los puertos del clúster hacia tu entorno de trabajo (localhost):

```bash
kubectl port-forward --namespace default svc/fenix-postgresql 5432:5432
```

Luego configuras en DBeaver: localhost, puerto 5432, y el usuario y contraseña definidos en el deployment.

**OJO:** si cancelas `minikube tunnel`, Conscius seguirá funcionando pero no será accesible desde tu laptop.

---

*[Publicación original con capturas de cada paso](https://www.untaldouglas.info/2022/07/instalar-moodle-3117-con-kubeapps.html)*
