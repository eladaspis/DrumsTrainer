// import React, {Component} from 'react';

import {
  Col,
  Row,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";


// import Dropzone from "react-dropzone";
// import "./upload.module.scss";

// import UploadService from "./services/upload-files.service";



// class UploadFiles extends Component {
//   constructor(props) {
//     super(props);
//     this.upload = this.upload.bind(this);
//     this.onDrop = this.onDrop.bind(this);

//     this.state = {
//       selectedFiles: undefined,
//       currentFile: undefined,
//       progress: 0,
//       message: "",
//       fileInfos: [],
//     };
//   }

//   componentDidMount() {
//     UploadService.getFiles().then((response) => {
//       this.setState({
//         fileInfos: response.data,
//       });
//     });
//   }

//   upload() {
//     let currentFile = this.state.selectedFiles[0];

//     this.setState({
//       progress: 0,
//       currentFile: currentFile,
//     });

//     UploadService.upload(currentFile, (event) => {
//       this.setState({
//         progress: Math.round((100 * event.loaded) / event.total),
//       });
//     })
//       .then((response) => {
//         this.setState({
//           message: response.data.message,
//         });
//         return UploadService.getFiles();
//       })
//       .then((files) => {
//         this.setState({
//           fileInfos: files.data,
//         });
//       })
//       .catch(() => {
//         this.setState({
//           progress: 0,
//           message: "Could not upload the file!",
//           currentFile: undefined,
//         });
//       });

//     this.setState({
//       selectedFiles: undefined,
//     });
//   }

//   onDrop(files) {
//     if (files.length > 0) {
//       this.setState({ selectedFiles: files });
//     }
//   }

//   render() {
//     const { selectedFiles, currentFile, progress, message, fileInfos } = this.state;

//     return (
//       <div>
//         {currentFile && (
//           <div className="progress mb-3">
//             <div
//               className="progress-bar progress-bar-info progress-bar-striped"
//               role="progressbar"
//               aria-valuenow={progress}
//               aria-valuemin="0"
//               aria-valuemax="100"
//               style={{ width: progress + "%" }}
//             >
//               {progress}%
//             </div>
//           </div>
//         )}

//         <Dropzone onDrop={this.onDrop} multiple={false}>
//           {({ getRootProps, getInputProps }) => (
//             <section>
//               <div {...getRootProps({ className: "dropzone" })}>
//                 <input {...getInputProps()} />
//                 {selectedFiles && selectedFiles[0].name ? (
//                   <div className="selected-file">
//                     {selectedFiles && selectedFiles[0].name}
//                   </div>
//                 ) : (
//                   "Drag and drop file here, or click to select file"
//                 )}
//               </div>
//               <aside className="selected-file-wrapper">
//                 <button
//                   className="btn btn-success"
//                   disabled={!selectedFiles}
//                   onClick={this.upload}
//                 >
//                   Upload
//                 </button>
//               </aside>
//             </section>
//           )}
//         </Dropzone>

//         <div className="alert alert-light" role="alert">
//           {message}
//         </div>

//         {fileInfos.length > 0 && (
//           <div className="card">
//             <div className="card-header">List of Files</div>
//             <ul className="list-group list-group-flush">
//               {fileInfos.map((file, index) => (
//                 <li className="list-group-item" key={index}>
//                   <a href={file.url}>{file.name}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   }
// }






import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': []}});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag Files or Click to Browse</p>
      </div>
    </div>
  );
}





// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'

// const MyUploader = () => {
//   // specify upload params and url for your files
//   const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
//   // called every time a file's `status` changes
//   const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
//   // receives array of files that are done uploading when submit button is clicked
//   const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }

//   return (
//     <Dropzone
//       getUploadParams={getUploadParams}
//       onChangeStatus={handleChangeStatus}
//       onSubmit={handleSubmit}
//       // accept="image/*,audio/*,video/*"
//     />
//   )
// }


const Upload = () => {
  return (

    <Row>
    <Col className="pr-grid-col" xs={12} lg={12}>
      <Row className="gutter mb-4">
        <Col>
        <Widget className="widget-p-md">
          <StyledDropzone/>
        </Widget>
        </Col>
      </Row>
    </Col>
    </Row>
  );
}


export default Upload;
