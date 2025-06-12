# News Website

This project contains legacy PHP code for a basic news site. The code has been partially modernized to use PDO and namespaces.

## Installation

1. Ensure PHP 8+ and Composer are installed.
2. Clone the repository.
3. Configure database credentials using environment variables:
   - `DB_DSN` – e.g. `mysql:host=localhost;dbname=master_news;charset=utf8`
   - `DB_USER`
   - `DB_PASS`
4. Point the web root to this directory.
5. Make sure the `xdata/` and `cookiefile/` directories are writable by the web server.

Google AdSense is integrated via a script tag in `templates/tpl.header.php`. Replace `ca-pub-XXXXXXXX` with your publisher ID.

## Security Notes

The project now uses prepared statements to mitigate SQL injection. User input is cast or sanitized before use.

## Further Improvements

This codebase is still largely legacy. Consider migrating templates to a modern framework and introducing automated tests.
