@Library API:

=> Structure :
    -> Packages used    : Express, Mongoose, Bcrypt
    -> Dev Dependencies : Nodemon

    >> API Endpoints and file description :

    -> Root Folder:
        app.js : root/main file having all the necessary connections
        
        -> routes (dir) :
            1. auth.js : User Registration (with password encryption) and Login

                > Registration (POST) : localhost:5000/api/auth/register

                    * In Body:
                        "userId": "",
                        "pass": ""

                > Login (POST) : localhost:5000/api/auth/login

                    * In Body:
                        "userId": "",
                        "pass": ""


            2. library.js : CRUD operation routes
            [ NOTE:
                - ONLY REGISTERED USER CAN CREATE, UPDATE OR DELETE THE LIST, WHILE BOOK LIST CAN BE FETCHED WITHOUT ANY VERIFICATION.

                - 'USER_ID' is being passed as a URL Parameter.
                ( for eg. 'localhost:5000/api/library/add-book/user001' )
            ]
            

                > Adding a book to the 'books' collection (POST) :
                    ( 'localhost:5000/api/library/add-book/:user' )
                    
                    * In Body:
                        "id": "",
                        "title": "",
                        "author": "",
                        "summary": ""   // this can be empty


                > Viewing books list or searching a book using certain queries (GET) :

                    1. TO FETCH WHOLE LIST:         // it'll fetch ( id, book-name, author )
                    ( 'localhost:5000/api/library/view-book' )

                    2. TO FETCH AS PER BOOK_ID:     // it'll fetch ( id, book-name, author, summary )
                    ( eg. 'localhost:5000/api/library/view-book?bookId=DBN003' )

                    *3. TO FETCH AS PER NAME:               // fetch same as #2
                    ( eg. 'localhost:5000/api/library/view-book?bookName=harry' )

                    *4. TO FETCH AS PER AUTHOR:             // fetch same as #2
                    ( eg. 'localhost:5000/api/library/view-book?author=rowling' )

                    *5. TO FETCH AS PER NAME & AUTHOR:      // fetch same as #2
                    ( eg. 'localhost:5000/api/library/view-book?bookName=animal farm&author=george orwell' )

                    (*) means we may add only keywords of the author and/or book name and it'll fetch all the related books.


                > Updating the book information (PUT) :
                ( eg. 'localhost:5000/api/library/update-book/user001?bookId=DBN003' )

                    // This URL will verify user001, and book with id DBN003, and whatever is passed in body will be updated in the database.
                        
                        * In Body:      // We can add any one or more of these updated entries in body.
                            "id": "",
                            "title": "",
                            "author": "",
                            "summary": ""


                > Deleting the book record (DELETE) :
                ( eg. 'localhost:5000/api/library/delete-book/user001?bookId=DBN002' )

                    // This URL will verify user001, then check if DBN002 exists in 'books' collection, if yes, it'll delete that record and return the deleted entry.
                    
 
        
        -> database (dir) :
            dbConnect.js     : connection to mongoDB
            UserModel.js    : schema for the 'users' collection ( userId, pass )
            LibraryModel.js : schema for the 'books' collection ( bookId, title, author, summary )

        -> controller (dir) :
            userAuth.js : middleware for user verification in 'users' collection.


=> Instructions to deploy in your local machine :

    * MAKE SURE YOU HAVE VS CODE, NODEMON AND MONGODB INSTALLED ON YOUR LOCAL MACHINE.

    * Clone the repository into the local machine.
        ( 'git clone https://github.com/rigs05/LibraryCRUD.git' )

    * Open the repository in VS Code by right-clicking on the folder.

    * Open Terminal, and type "npm install" or "yarn install" (All the Packages will be installed).

    * Start your MongoDB server (type 'mongod' in terminal).

    * Use ("nodemon" or "node app.js" in terminal) to run the localhost (PORT is 5000).

    * Use POSTMAN application, put the URL based on above to perform required task.

    * DO VERIFY THAT THE METHODS (GET, POST etc.) ARE CORRECT WHEN MAKING URL REQUEST.