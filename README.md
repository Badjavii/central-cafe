# Cafetín Central

A frontend prototype simulation developed as part of the **Introduction to Computer Science** course at the **Central University of Venezuela (UCV)**.

## About

This project simulates the main digital interactions of a cafeteria management system called "Cafetín Central". It was built using only HTML5, CSS3, and JavaScript — no backend, no database, no frameworks.

All data is static and simulated. The goal is to prototype the client-side interfaces and interactions of the system.

## Modules

- **Login** — simulated authentication with predefined accounts and role-based redirect.
- **Catalog & Orders** — product catalog with a shopping cart and purchase history.
- **Point of Sale** — simplified sales interface with receipt simulation for cashier staff.
- **Administration** — menu management panel to add and remove products.

## Test Accounts

| Username | Password | Role |
|---|---|---|
| ClienteUCV | Central_123 | Client |
| caja_01 | Cajero#123 | Cashier |
| adminRoot | cafetinAdmin | Admin |

## How to run

Open `index.html` in any modern browser or serve it locally:
```bash
python3 -m http.server 8000
```

## Tech stack

- HTML5
- CSS3
- JavaScript (vanilla)
