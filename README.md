## AWS Serverless example

## Development

To start dev env:

```bash
yarn
yarn run dev

# navigate to http://localhost:3000/dev/
```

## Deployment to AWS

`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` envs are needed.

```bash
yarn run deploy:stg

# or..
yarn run deploy:prod
```

##### Destroy stack

```bash
yarn run serverless remove --stage stg

# or..
yarn run serverless remove --stage prod
```
