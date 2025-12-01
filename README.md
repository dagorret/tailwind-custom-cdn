# Automatic Tailwind CSS CDN Builds For Rapid Prototyping

A simple, automated tool for creating custom Tailwind CSS builds for CDN access. Use this for development when you don't want to deal with setting up a builder right away.

**Now updated for Tailwind CSS v4!** 🎉

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/KevinBatdorf/tailwind-custom-cdn?label=version&style=flat-square)

## What's New in v4

- **Updated to Tailwind CSS 4.1.17** - Latest stable version
- **New CSS-based configuration** - v4 uses `@theme` directive in CSS
- **Backwards compatible** - Still supports legacy JS config files
- **Faster builds** - New Oxide engine for improved performance
- **Node.js 20** - Updated GitHub Actions workflows

## How it works
1. Press "Use this template"
1. On the "Actions" tab, enable actions for your repo
1. Create a [personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) named `PA_TOKEN` and add it as a [secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) to your new repository.
1. Commit to master a Tailwind CSS config file placed inside the `configs/` directory.
1. That's it! The CSS file is processed and built with GitHub Actions automatically.

## How to use
The system will auto release on any push to master. After a few minutes, you should be able to use your script in the following way:

> Finding this project useful? Support it by [sponsoring me](https://github.com/sponsors/KevinBatdorf).

```html
<!-- Always keep your build current against the most recent Tailwind CSS version -->
<script src="https://cdn.jsdelivr.net/gh/{#USERNAME#}/tailwind-custom-cdn/builds/example.min.css"></script>

<!-- Tie to the current version (use the tag that was created during the build) -->
<script src="https://cdn.jsdelivr.net/gh/{#USERNAME#}/tailwind-custom-cdn@{#TAG#}/builds/example.min.css"></script>
<!-- Replace {#USERNAME#} and {#TAG#} accordingly For example, -->
<script src="https://cdn.jsdelivr.net/gh/KevinBatdorf/tailwind-custom-cdn@v1.8.10-0-1-0-282636193-24/builds/example.min.css"></script>
```

See it in use: https://github.com/KevinBatdorf/tailwind-css-cdn

## FAQ
**Question:** What else should I know?

**Answer:** Editing a config file is also OK. You can also namespace your configs into separate directories. Delete the examples, or any config too if you'd like. If you only commit a single file, the repo will compile that one config. If you commit multiple files anywhere, then the entire config folder will be rebuilt.

##
**Question:** Can I use this in production?

**Answer:** I wouldn't. For production you will want to use a build tool so that you can purge your unused CSS.

##
**Question:** A config file didn't build or something went wrong. What do I do?

**Answer:** You should just make some trivial changes and commit again. That will rebuild all the configs. I would just bump the version number in the package.json file, for example.

##
**Question:** What permissions do I need for the access token?

**Answer:** I'm not entirely sure, but I used `admin:repo_hook, repo, workflow`

##
**Question:** Do I commit to your repo?

**Answer:** Only if you spot a bug or have an improvement. Otherwise you should generate from the template (or fork it) and use it on your own account.

##
**Question:** What about plugins?

**Answer:** Tailwind CSS v4 has a new plugin system. For now, basic builds are supported. Custom plugins can be added to your config files as needed.

##
**Question:** How do I migrate from v1/v2/v3 configs?

**Answer:** The system is backwards compatible with legacy JS config files. However, for new configs, consider using the v4 CSS-based configuration with `@theme` directive in your CSS files. See [Tailwind CSS v4 documentation](https://tailwindcss.com/docs/v4-beta) for migration guides.

##
**Question:** If I update Tailwind CSS version locally, does the CDN auto-recompile?

**Answer:** **NO.** The CDN only recompiles when you **push changes to the GitHub repository**. Aquí está cómo funciona:

- ✅ **Recompila automáticamente:** Cuando haces `git push` con cambios en `configs/` o `package.json`
- ❌ **NO recompila:** Si solo modificas Tailwind localmente en tu máquina

**Flujo correcto para actualizar el CDN:**

```bash
# 1. Modifica tu config o actualiza package.json
vim configs/example.js
# O actualiza la versión de Tailwind:
vim package.json  # Cambiar "tailwindcss": "^4.1.17" a nueva versión

# 2. Commit y push al repositorio
git add .
git commit -m "Actualizar configuración de Tailwind"
git push origin master

# 3. GitHub Actions detecta el cambio automáticamente
# 4. Compila el CSS en la nube
# 5. Crea un nuevo tag/release
# 6. El CDN se actualiza automáticamente

# Para forzar recompilación sin cambios reales:
echo "# Build $(date)" >> package.json
git add package.json
git commit -m "Force rebuild"
git push origin master
```

**Importante:**
- El repo `tailwind-custom-cdn` es para **generar CDN en GitHub**
- Compilar localmente (`npx tailwindcss`) es solo para **testing/desarrollo**
- El CDN público se actualiza **solo con git push al repo**

##
**Question:** Can others use my config file?

**Answer:** The repo needs to be public, so yes. If you're using this you should be aware of that and not include anything private in your config file.

##
**Question:** Is the cache working?

**Answer:** Sometimes jsDelivr will keep the cache longer depending on when the previous tag was made. So usually you just need to wait a short while longer.
