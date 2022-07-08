import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify, Auth, Storage } from 'aws-amplify';
import config from './aws-exports';

// Amplify.configure(config);

Amplify.configure({
  Auth: {
      identityPoolId: 'us-east-1:2ddf3f6b-1ad2-4304-843c-cf5a25dc9761', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'us-east-1', // REQUIRED - Amazon Cognito Region
      userPoolId: 'us-east-1_IJT2shorA', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: '5e1m8pb9md3qvkc35tn074did4', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
      AWSS3: {
          bucket: 'rotarydatamain171248-dev', //REQUIRED -  Amazon S3 bucket name
          region: 'us-east-1', //OPTIONAL -  Amazon service region
      }
  },
  API: {
    graphql_endpoint: 'https://jln3qk76wza2xjqz35onprvg64.appsync-api.us-east-1.amazonaws.com/graphql',
    graphql_headers: async () => ({
      'x-api-key': 'da2-i6z7itgq3vgmhfmc27ekue2ewy',
    })
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
