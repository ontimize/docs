# [Ontimize Boot v3.X.X - Documentation](https://ontimize.github.io/docs/v3/index.html)

## ✍ Use

### v3.X.X documentation:

- [Check this link](https://ontimize.github.io/docs/v3/index.html)

### v3.X.X-develop documentation:

- Download this branch: https://github.com/ontimize/docs/tree/3.x.x-develop

  > **IMPORTANT**  
  > If this is the first time you are working with this documentation, run this command before continue.
  >
  > ```
  > bundle install
  > ```
  >
  > This will install the necessary Ruby gems. Please, if the installation modifies your **_Gemfile.lock_** file, **DO NOT UPLOAD IT**.

- Run the following command to launch a local Jekyll server and check the documentation

  ```
  bundle exec jekyll serve --baseurl /docs/v3 --config _config.yml,_config.deploy.yml
  ```

### Deploy v3.X.X documentation:

- Upload all the changes you want to deploy in version 3.x.x to the 3.x.x-develop branch. Make a pull request from version 3.x.x-develop to version 3.x.x and merge it.
