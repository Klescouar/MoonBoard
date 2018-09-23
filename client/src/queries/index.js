import gql from 'graphql-tag';

export const UploadImageMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;
