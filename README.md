# Roblox Group Auto-Moderator

> A simple, lightweight group wall auto-moderator which checks posts periodically and deletes them automatically - this uses your .ROBLOXSECURITY cookie for authentication.

## Configuration

Update the `.env.example` filename to `.env` after cloning this repository and then edit the contents of the file.

```
# This is your .ROBLOXSECURITY cookie which can be found in your browser developer tools under "Application" > "Cookie"
COOKIE=""

# This is the ID of the roblox group you want to configure auto-moderation within
GROUP_ID=""

# This is a comma-seperated list of bad phrases you want to find in posts and automatically delete (e.g. robux)
BAD_PHRASES="free,robux,scam"
```

## Building

To build the application, run the following commands (this also assumes you do not have SWC installed)

```
npm i -g @swc/core @swc/cli
npm i
npm run build
node .
```

## Docker

I have also included a Dockerfile and docker-compose.yaml for those who wish to use docker for running the application
