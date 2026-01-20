# Drupal 11 Learning, Experimentation, and Testing Site

This repository contains a Drupal 11 site set up for learning, experimentation, and testing purposes. It uses [DDEV](https://ddev.readthedocs.io/en/stable/) to manage the local development environment, ensuring consistency across setups.

## Project Overview

- **Purpose**: This project is intended for learning Drupal 11 development, experimenting with new features, and conducting tests.
- **Technology Stack**:
  - **Drupal 11**
  - **DDEV (Docker Development Environment)**
  - **MySQL/MariaDB** (as the database)
  - **Composer** (for dependency management)
  - **Drush** (for command-line operations)

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/products/docker-desktop)
- [DDEV](https://ddev.readthedocs.io/en/stable/users/install/)
- [Composer](https://getcomposer.org/download/)

## Initial Setup

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/drupal11-learning.git
cd drupal11-learning
```

### 2. Initialize DDEV

Run the following command to initialize DDEV in your project directory:

```````bash
ddev config --project-type=drupal11 --docroot=web --create-docroot
```

- `--project-type=drupal11`: Specifies that this is a Drupal 11 project.
- `--docroot=web`: Sets the document root to web.
- `--create-docroot`: Creates the web directory if it does not exist.

### 3. Start DDEV

Start the DDEV environment:

``````bash
ddev start
```

This command will download the necessary Docker images, create containers, and set up your local environment with Apache/Nginx, PHP, MySQL/MariaDB, and more.

### 4. Install Drupal

With the DDEV environment running, you can now install Drupal using Composer:

``````bash
ddev composer create drupal/recommended-project --no-install
```

Navigate to the web directory:

```bash
cd web
```

Then, run the following command to install Drupal:

```bash
ddev composer install
```

### 5. Install Drush (Optional)

If you prefer using Drush for command-line operations, ensure it is installed globally or via Composer in your project:

``````bash
ddev composer require drush/drush
```

### 6. Configure Database and Install Site

You can configure your database and install Drupal either via the web interface or using Drush.

**Using Web Interface:**

- Open a browser and go to `http://drupal11-learning.ddev.site` (or the URL provided by DDEV).
- Follow the on-screen instructions to complete the installation, selecting MySQL/MariaDB as the database type during setup.

**Using Drush:**

``````bash
ddev drush site-install --db-url=mysql://db:db@db/drupal -y
```

This command installs Drupal using MySQL/MariaDB as the database.

## Additional Configuration

### Custom Domains

Modify `.ddev/config.yaml` to set custom domains if needed:

``````yaml
additional_hostnames:
  - drupal.local
```

### Environment Variables

You can manage environment variables in `.ddev/config.yaml` or use a separate `.env` file for sensitive data like API keys.

### Xdebug and Other Tools

DDEV supports Xdebug, Mailhog (for email testing), and other tools that can be enabled in the `config.yaml`.

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Open a pull request with a detailed description of your changes.

## License
This project is licensed under the GPLv2 license, which is used by Drupal core.

Contact
For any questions or issues, please contact the maintainers:

Maintainer: Your Name
Email: your.email@example.com
```
```````
