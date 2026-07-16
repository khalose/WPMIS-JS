# Wajir Water Point Management Information System

This is a non-PHP JavaScript prototype built from the APT3065 concept paper for Wajir County.

## Features

- Role-based login for Admin and Field Officer users
- First-time sign-up for Admin or Field Officer accounts
- Dashboard with water point and maintenance KPIs
- Water point CRUD with GPS coordinates, type, ward, installation year, and status
- Breakdown reporting, technician assignment, progress tracking, and resolution workflow
- Leaflet.js map using OpenStreetMap tiles with colour-coded status markers
- Search and filters by status, type, and sub-county
- Reports for status totals, maintenance KPIs, and sub-county distribution
- 30 synthetic Wajir County water point records for testing

## How to Run

Open `index.html` in a browser, or serve the folder with any static file server.

Demo accounts:

- Admin: `admin@wajir.go.ke` / `password`
- Field Officer: `officer@wajir.go.ke` / `password`

New users can also choose **Create account** on the first screen and select either Admin or Field Officer. Sign-up accounts are saved in browser storage.

The app stores demo data in browser `localStorage`. Use **Reset demo data** in the app to restore the original synthetic dataset.

## Notes

This version avoids PHP completely. It is designed as a coursework prototype that can demonstrate the required workflows without installing XAMPP or configuring MySQL. A production version should replace browser storage with a real backend API and database.
