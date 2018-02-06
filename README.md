Introduction

This is begining of a react/d3/leaflet oriented analyitics tool - the backend is still undecided, so there is a mocked api to get going. 

Instructions

in the hurricane root directory :

- sudo npm install (not sure why it needs sudo but it is required on my machine)
- npm start

THis will run a dev version / live reloading version of the app hosted on port 8000 that has the mocked api.

If you wish to run the real api you must follow the instructions in api/README.md, execute `node proxy.js` and access app via port 3000. 



Structure

Navigation defined in `src/common/store_nav.js`

Routes/pages are defined in `src/routes`

Components are defined in `src/components`





