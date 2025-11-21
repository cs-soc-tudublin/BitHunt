# BitHunt

BitHunt is a Treasure Hunt application.
BitHunt is designed to help First Year Students in University learn about the campus.

## Setup:

1. Clone the repository

```bash
git clone https://github.com/cs-soc-tudublin/BitHunt-New.git
```

2. Install the dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

You are now ready to develop!

# Deploying

The best way to deploy is through Docker.
A premade `docker-compose.yml` file exists.
Once the environment variables have been edited, you can bring the system online through `docker compose up -d`.

# Administrating a Game

Navigate to the `/admin` route and log in with the password as set in the Environment Variables.
Games can be active or inactive. **ONLY ONE GAME SHOULD BE ACTIVE AT A TIME!!!**
Locations are tied to games. The QR code used by players to scan the location are accesible by pressing the QR Code Icon and saving the image.
