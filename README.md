# Softtek Angular Basics Edición 2

Curso de introducción a Angular moderno para Softtek. Edición2. Octubre 24

> [Laboratorio de ejemplo](https://github.com/TrainingITCourses/softtek_angular_basics_2) del curso de [Angular Basics para Softtek Oct 24](https://cursos.trainingit.es/course/view.php?id=1761) impartido por [Alberto Basalo](https://albertobasalo.dev) con TrainingIT.

> [!NOTE]
> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version _18.2.8._

## Requisitos para el laboratorio

Comprobar [versión de Node.js](https://angular.dev/reference/versions#) y npm.

```bash
# Check Node.js and npm versions
node -v
npm -v
# Install Angular CLI
npm i -g @angular/cli@latest
```

> [!NOTE]
> La aplicación de ejemplo estará en la carpeta [AstroBookings](./AstroBookings)

## Iniciar a partir del laboratorio

El código fuente de la aplicación de ejemplo se encuentra en el repositorio de GitHub [softtek_angular_basics_2](https://github.com/TrainingITCourses/softtek_angular_basics_2).

```bash
# Clone lab from github
git clone https://github.com/TrainingITCourses/softtek_angular_basics_2.git
# Install and run
cd softtek_angular_basics_2/AstroBookings
npm install
# Start Angular server
npm start
# Run a fake API server
[APIbun](https://github.com/AlbertoBasalo/api_bun)
```

## Replicar desde cero

Instalar **Angular CLI** y generar aplicación de ejemplo.

```bash
# Generate new Angular project
ng new AstroBookings --inline-style --inline-template --prefix=lab --ssr --style=css
# Or run with npx and options with aliases (- instead of --)
npx ng new AstroBookings -s -t -p=lab --ssr --style=css
```

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
