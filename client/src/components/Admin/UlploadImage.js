import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';

class UploadImage extends Component {
  render() {
    const uploadFileMutation = gql`
      mutation($file: Upload!) {
        uploadFile(file: $file)
      }
    `;
    return (
      <Mutation mutation={uploadFileMutation}>
        {mutate => (
          <Dropzone
            onDrop={([file]) => {
              mutate({ variables: { file } });
              this.props.getFileName(file.name);
            }}
          >
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        )}
      </Mutation>
    );
  }
}

export default UploadImage;
