        ```
        $ pip install virtualenv
        $ virtualenv -p python3 venv
        $ pip install autoenv
        ```

* #### Environment Variables
    Create a .env file and add the following:
    ```
    source venv/bin/activate
    export APP_SETTINGS="development"
    export DATABASE_URL="postgresql://postgres:postgres@localhost/hurricane"
    ```
  
* #### Install your requirements
    ```
    (venv)$ pip install -r requirements.txt
    ```

    Then, make and apply your Migrations
    ```
    (venv)$ python manage.py db init

    (venv)$ python manage.py db migrate
    ```

    And finally, migrate your migrations to persist on the DB
    ```
    (venv)$ python manage.py db upgrade
    ```

    ```
    (venv)$ flask run
    ```
