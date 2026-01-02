# Portfolio Website

## Overview
A personal portfolio website for Ankit Kumar Srivastava - a Software Developer. This is a static HTML/CSS website showcasing skills, experience, projects, and education.

## Project Structure
- `index.html` - Main portfolio page
- `assets/` - Static assets directory
  - `css/style.css` - Custom styles
  - `img/` - Images including favicon, project screenshots, and profile pictures
  - `resume/` - PDF resume
  - `vendor/` - Third-party JavaScript libraries (typed.js)
- `robots.txt` - Search engine crawling rules

## Technologies
- HTML5
- CSS3
- Materialize CSS (CDN)
- Font Awesome Icons (CDN)
- jQuery (CDN)
- Typed.js (local vendor file)

## Running Locally
The site is served using Python's built-in HTTP server on port 5000:
```bash
python -m http.server 5000 --bind 0.0.0.0
```

## Deployment
This is a static site deployment. The entire root directory (`.`) is served as the public directory.

## Recent Changes (2025)
- Added comprehensive responsive CSS for all sections (projects, experience, education, about, contact)
- Fixed typos: explaination→explanation, serparately→separately, SprinBoot→SpringBoot, fronted→frontend, resposnse→response, @@ankitviddya→@ankitviddya
- Added smooth scrolling behavior
- Added professional footer with copyright
- Added hover effects for cards and buttons
- Cleaned up commented-out code
