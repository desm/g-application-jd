Functional Tests for Your Controllers

In Rails, testing the various actions of a controller is a form of writing 
functional tests. Remember your controllers handle the incoming web requests 
to your application and eventually respond with a rendered view. When writing 
functional tests, you are testing how your actions handle the requests and 
the expected result or response, in some cases an HTML view.

What to Include in Your Functional Tests
You should test for things such as:

- was the web request successful?
- was the user redirected to the right page?
- was the user successfully authenticated?
- was the appropriate message displayed to the user in the view?
- was the correct information displayed in the response?

Functional tests include:

- Testing Routes
- Testing Views


Generate a controller using the scaffold generator:

$ bin/rails generate scaffold_controller article title:string body:text
...
create  app/controllers/articles_controller.rb
...
invoke  test_unit
create    test/controllers/articles_controller_test.rb
...


If you already have a controller and just want to generate the 
test scaffold code for each of the seven default actions, 
you can use the following command:

$ bin/rails generate test_unit:scaffold article
...
invoke  test_unit
create    test/controllers/articles_controller_test.rb
...


The get method kicks off the web request and populates the results 
into the @response. It can accept up to 6 arguments:

- The URI of the controller action you are requesting. This can be in the form of a string or a route helper (e.g. articles_url).
- params: option with a hash of request parameters to pass into the action (e.g. query string parameters or article variables).
- headers: for setting the headers that will be passed with the request.
- env: for customizing the request environment as needed.
- xhr: whether the request is Ajax request or not. Can be set to true for marking the request as Ajax.
- as: for encoding the request with different content type.


Example: Calling the :show action for the first Article, passing in an HTTP_REFERER header:

get article_url(Article.first), headers: { "HTTP_REFERER" => "http://example.com/home" }


Another example: Calling the :update action for the last Article, passing in new text for the title in params, as an Ajax request:

patch article_url(Article.last), params: { article: { title: "updated" } }, xhr: true


One more example: Calling the :create action to create a new article, passing in text for the title in params, as JSON request:

post articles_path, params: { article: { title: "Ahoy!" } }, as: :json


