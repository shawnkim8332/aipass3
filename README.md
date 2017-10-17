# aipass3
AIP Assignment 3

# Common Coding Principle

1. Variable Names
    - use camelCase for identifier names (variables and functions).
    - All names start with a letter.

2. Spaces Around Operators
    - Always put spaces around operators ( = + - * / ), and after commas

3. Code Indentation
    - Always use 4 spaces for indentation of code blocks

4. Simple Statement Rules
    - Always end a simple statement with a semicolon

5. Complex Statement Rules
    - Put the opening bracket at the end of the first line.
    - Use one space before the opening bracket.
    - Put the closing bracket on a new line, without leading spaces.
    - Do not end a complex statement with a semicolon.

6. Object Rules
    - Place the opening bracket on the same line as the object name.
    - Use colon plus one space between each property and its value.
    - Use quotes around string values, not around numeric values.
    - Do not add a comma after the last property-value pair.
    - Place the closing bracket on a new line, without leading spaces.
    - Always end an object definition with a semicolon.

7. Line Length
    - For readability, avoid lines longer than 80 characters.
      If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma.

8. Loading JavaScript in HTML
    - Use simple syntax for loading external scripts (the type attribute is not necessary)

9. Use Lower Case File Names

* Source: https://www.w3schools.com/js/js_conventions.asp

# Angular JS Specific Coding Principle 

1.When using a module, avoid using a variable and instead use chaining with the getter syntax.

2.Only set once and get for all other instances.

3.Use named functions instead of passing an anonymous function in as a callback.

4.Use the controllerAs syntax over the classic controller with $scope syntax.

5.Define 1 component per file, recommended to be less than 400 lines of code.

6.Define small functions, no more than 75 LOC (less is better).

7.Use function declarations to hide implementation details. Keep your accessible members of the factory up top. Point those to function declarations that appears later in the file. For more details see this post.


# HTML Coding Principle 

1. ID names should be defined in camelCase

2. class names should be defined in lowercase

3. All html tages should be defined in camel case

4. no use of inline css styles and javascript

5. Html Comments should show the end of html div's

5. Proper html indentation should be applied

6. Non-empty html elements must have corrsponding closing tags

7. html document type must be declared as the first line of html code


# Functionalities 

•	Login 
1.	Email address as Username
2.	Retrieve password through Email link
3.	After login the user can see and edit their reviews

•	Sign up
1.	First name, last name, Email address, and password should be needed to sign up

•	Products List
1.	A list of products would be shown 
2.	User could check description, Ingredients and review of the product
3.	In the review tab, User can add reviews 
4.	Add the product to cart

•	Cart
1.	It will show a list of products which user have added to cart
2.	User can remove the product from list
3.	User can receive an email after clicking Buy button 

•	API
1.	User could search menus from various chain restaurant

•	Admin
1.	If user’s account is admin account, user can access admin page. 
2.	Admin account could modify (delete and save) the product which include product name, price, ingredients, product images and description. 
3.	Add new products to product list 
