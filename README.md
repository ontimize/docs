# [Ontimize Boot v1.X.X - Documentation](https://ontimize.github.io/docs/v1)

## ✍ Use

### v1.X.X documentation:

- [Check this link](https://ontimize.github.io/docs/v1/index.html)

### v1.X.X-develop documentation:

- Download this branch: https://github.com/ontimize/docs/tree/1.x.x-develop

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
  bundle exec jekyll serve --config _config.yml,_config.deploy.yml
  ```

### Deploy v1.X.X documentation:

- Upload all the changes you want to deploy in version 1.x.x to the 1.x.x-develop branch. Make a pull request from version 1.x.x-develop to version 1.x.x and merge it.
