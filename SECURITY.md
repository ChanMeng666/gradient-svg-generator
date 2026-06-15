# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| Latest  | :white_check_mark: |

We provide security updates for the latest released version on the `main` branch.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email **ChanMeng666@outlook.com** with:

- A description of the vulnerability
- Steps to reproduce or a proof of concept
- The potential impact
- A suggested fix, if you have one

## Response Timeline

- **Acknowledgment**: within 48 hours of receiving your report
- **Assessment**: within 7 days we will confirm the issue and assess severity
- **Resolution**: we aim to release a fix within 30 days for confirmed vulnerabilities

## Scope

This project is a Node.js / Next.js service that generates SVGs from user-supplied parameters.
Security concerns most likely to apply include:

- Injection via unsanitized text or parameters rendered into the SVG/HTTP response
- Denial of service through expensive or malformed render requests
- Dependencies with known vulnerabilities

## Attribution

We appreciate responsible disclosure. With your permission, contributors who report valid security
issues will be acknowledged in the project.
