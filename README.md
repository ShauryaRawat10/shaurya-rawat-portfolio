# Personal website

Frontend-only portfolio. No frameworks, no APIs, no build step — drop it on Vercel.

## Preview locally

From this folder, start a local server:

```powershell
py -m http.server 5500
```

Then open [http://localhost:5500](http://localhost:5500) in your browser. Stop the server with `Ctrl+C`.

Run this if not working in terminal: python -m http.server 5500

If you have Node.js installed, this also works:

```bash
npx serve .
```

You can also open `index.html` directly in a browser, but localhost is closer to how the live site is served.

## Edit your content

Name, role, projects, experience, and links live in `index.html`. The contact email is in both `index.html` and `script.js`.

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Other** (static files).
4. Leave build command empty. Output directory can stay blank.
5. Deploy.

Or drag this folder onto [vercel.com/new](https://vercel.com/new).


## Convert images to webp before using:
1. Check if Pillow is installed: python -m pip install Pillow
1. python -c "from PIL import Image; Image.open('logos/EY logo.png').save('logos/ey logo.webp','WEBP',quality=88,method=6)" 
