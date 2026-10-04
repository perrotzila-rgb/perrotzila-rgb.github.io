# Perrotzila Studios · web lista para publicar

La carpeta está preparada como sitio estático para GitHub Pages.

## Opción recomendada para AdMob: sitio de usuario de GitHub Pages

Para que `app-ads.txt` quede en la raíz del dominio, usa un repositorio de sitio de usuario:

1. Crea o usa una cuenta de GitHub.
2. Crea un repositorio público llamado exactamente `TUUSUARIO.github.io`.
3. Sube **el contenido de esta carpeta a la raíz** del repositorio (no la carpeta contenedora).
4. En GitHub ve a `Settings > Pages`.
5. En `Build and deployment`, elige `Deploy from a branch`.
6. Selecciona la rama `main` y la carpeta `/ (root)`.
7. Espera unos minutos y abre `https://TUUSUARIO.github.io/`.
8. Comprueba también:
   - `https://TUUSUARIO.github.io/privacy.html`
   - `https://TUUSUARIO.github.io/app-ads.txt`
   - `https://TUUSUARIO.github.io/merge-factory/`

## Después, en Google Play
Cuando Play Console esté verificado y hayas creado la ficha de Merge Factory:
- Sitio web del desarrollador: `https://TUUSUARIO.github.io/`
- Política de privacidad: `https://TUUSUARIO.github.io/privacy.html`

AdMob tomará el **host** del sitio del desarrollador y buscará `https://TUUSUARIO.github.io/app-ads.txt`.

## Contenido
- `index.html`: web de Perrotzila Studios.
- `merge-factory/index.html`: versión web de Merge Factory.
- `privacy.html`: política de privacidad.
- `app-ads.txt`: autorización de AdMob; debe permanecer en la raíz.
- `assets/`: iconos y recursos.
- `.nojekyll`: evita procesamiento innecesario de Jekyll.

No publiques el archivo `.jks` ni contraseñas de firma en GitHub.
